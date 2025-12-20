from __future__ import annotations

import html
import json
import re
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET


NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def col_to_index(col: str) -> int:
    n = 0
    for c in col:
        n = n * 26 + (ord(c) - 64)
    return n - 1


def read_shared_strings(z: zipfile.ZipFile) -> list[str]:
    try:
        sst_xml = z.read("xl/sharedStrings.xml")
    except KeyError:
        return []

    root = ET.fromstring(sst_xml)
    out: list[str] = []
    for si in root.findall("main:si", NS):
        # A shared string can have multiple <t> nodes
        parts = [t.text or "" for t in si.findall(".//main:t", NS)]
        out.append("".join(parts))
    return out


def get_first_sheet_path(z: zipfile.ZipFile) -> tuple[str, str]:
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    sheet = wb.find("main:sheets/main:sheet", NS)
    if sheet is None:
        raise ValueError("No sheet found in workbook")

    name = sheet.attrib.get("name", "Sheet1")
    rid = sheet.attrib.get(f"{{{NS['r']}}}id")
    if not rid:
        raise ValueError("Sheet relationship id not found")

    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    target = None
    for rel in rels.findall("rel:Relationship", NS):
        if rel.attrib.get("Id") == rid:
            target = rel.attrib.get("Target")
            break

    if not target:
        raise ValueError("Sheet relationship target not found")

    sheet_path = target.lstrip("/")
    if not sheet_path.startswith("xl/"):
        sheet_path = "xl/" + sheet_path

    return name, sheet_path


def read_sheet_rows(z: zipfile.ZipFile, sheet_path: str, shared: list[str]) -> list[list[str]]:
    ws = ET.fromstring(z.read(sheet_path))

    rows: list[dict[int, str]] = []
    for row in ws.findall("main:sheetData/main:row", NS):
        r: dict[int, str] = {}
        for c in row.findall("main:c", NS):
            ref = c.attrib.get("r", "")
            m = re.match(r"([A-Z]+)(\d+)$", ref)
            if not m:
                continue
            col = m.group(1)
            idx = col_to_index(col)
            v = c.find("main:v", NS)
            raw = "" if v is None else (v.text or "")
            t = c.attrib.get("t")
            if t == "s":
                try:
                    raw = shared[int(raw)]
                except Exception:
                    pass
            r[idx] = raw
        if r:
            rows.append(r)

    if not rows:
        return []

    max_col = max(max(r.keys()) for r in rows)
    out: list[list[str]] = []
    for r in rows:
        out.append([r.get(i, "") for i in range(max_col + 1)])
    return out


def normalize_header(s: str) -> str:
    return str(s or "").strip().lower()


def build_products(xlsx_path: Path) -> list[dict[str, str]]:
    with zipfile.ZipFile(xlsx_path) as z:
        shared = read_shared_strings(z)
        _sheet_name, sheet_path = get_first_sheet_path(z)
        table = read_sheet_rows(z, sheet_path, shared)

    if not table:
        return []

    headers = [normalize_header(h) for h in table[0]]
    wanted = {"name", "image", "desc", "url"}

    idx: dict[str, int] = {}
    for i, h in enumerate(headers):
        if h in wanted and h not in idx:
            idx[h] = i

    missing = sorted(list(wanted - set(idx.keys())))
    if missing:
        raise ValueError(f"products.xlsx missing headers: {', '.join(missing)} (need name/image/desc/url)")

    products: list[dict[str, str]] = []
    for row in table[1:]:
        name = str(row[idx["name"]]).strip()
        image = str(row[idx["image"]]).strip()
        desc = str(row[idx["desc"]]).strip()
        url = str(row[idx["url"]]).strip()

        if not (name or image or url or desc):
            continue

        products.append({
            "name": name,
            "image": image,
            "desc": desc,
            "url": url,
        })

    return products


def render_products_html(products: list[dict[str, str]]) -> str:
    def safe_url(u: str) -> str:
        u = (u or "").strip()
        if not u:
            return ""
        if re.match(r"^https?://", u, flags=re.I):
            return u
        if u.startswith("./") or u.startswith("/"):
            return u
        if re.match(r"^[\w.-]+\.[a-z]{2,}", u, flags=re.I):
            return "https://" + u
        return u

    cards = []
    for p in products[:9]:
        name = html.escape(p.get("name", "") or "")
        desc = html.escape(p.get("desc", "") or "")
        img = html.escape(safe_url(p.get("image", "") or ""))
        url = html.escape(safe_url(p.get("url", "") or ""))

        img_html = (
            f'<img src="{img}" alt="{name}" class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition duration-700" loading="lazy" />'
            if img
            else '<div class="w-full h-full flex items-center justify-center text-white/35 text-xs tracking-[0.25em] uppercase">No Image</div>'
        )

        href = url if url else "#"
        cursor = "" if url else "style=\"cursor:default\""
        rel = 'rel="noopener noreferrer" target="_blank"' if url else ""

        cards.append(
            f"""<a href=\"{href}\" {rel} {cursor} class=\"lux-card group rounded-3xl overflow-hidden transition duration-500 hover:-translate-y-1\">\n"
            f"  <div class=\"relative aspect-[4/3] img-shell\">\n"
            f"    <div class=\"absolute inset-0\">{img_html}</div>\n"
            f"    <div class=\"absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent\"></div>\n"
            f"  </div>\n"
            f"  <div class=\"p-7\">\n"
            f"    <div class=\"text-[11px] tracking-[0.45em] uppercase text-white/45\">Collection</div>\n"
            f"    <div class=\"mt-3 text-xl tracking-wide text-white/95\">{name or 'Untitled'}</div>\n"
            f"    <div class=\"mt-3 text-sm text-white/55 leading-relaxed line-clamp-2\">{desc if desc else '&nbsp;'}</div>\n"
            f"    <div class=\"mt-6 flex items-center justify-end\">\n"
            f"      <div class=\"text-[11px] tracking-[0.35em] uppercase text-white/55 group-hover:text-white/85 transition\">View</div>\n"
            f"    </div>\n"
            f"  </div>\n"
            f"</a>"""
        )

    cards_html = "\n".join(cards) if cards else ""

    products_json = json.dumps(products, ensure_ascii=False)

    return f"""<!DOCTYPE html>
<html lang=\"zh-CN\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>SHENGSHUI | 产品</title>
  <script src=\"https://cdn.tailwindcss.com\"></script>
  <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Cinzel:wght@400;700&display=swap\" rel=\"stylesheet\">
  <link rel=\"icon\" type=\"image/png\" href=\"./favicon.png\">
  <style>
    body {{ font-family: 'Noto Sans SC', sans-serif; background:#050607; }}
    .hero-title {{ font-family:'Cinzel', serif; letter-spacing: 0.18em; }}
    .lux-card {{
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      box-shadow: 0 40px 120px rgba(0,0,0,0.55);
    }}
    .lux-card:hover {{ border-color: rgba(255,255,255,0.18); }}
    .img-shell {{
      background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0));
    }}
    .subtle-grid {{
      background-image:
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 42%),
        radial-gradient(circle at 80% 10%, rgba(0, 210, 255, 0.06), transparent 40%),
        radial-gradient(circle at 60% 80%, rgba(255, 189, 89, 0.05), transparent 48%);
    }}
    .hairline {{ border-top: 1px solid rgba(255,255,255,0.06); }}
  </style>
</head>
<body class=\"min-h-screen text-white\">
  <div class=\"fixed inset-0 -z-10 subtle-grid\"></div>

  <header class=\"sticky top-0 z-30\">
    <div class=\"px-6 md:px-10 py-6 flex items-center justify-between\">
      <a href=\"./index.html\" class=\"hero-title text-sm md:text-base tracking-[0.35em] text-white/90 hover:text-white transition\">SHENGSHUI</a>
      <div class=\"text-[11px] tracking-[0.35em] uppercase text-white/50 hidden md:block\">Discover The Value In Every Drop</div>
      <a href=\"./index.html\" class=\"text-xs tracking-[0.25em] text-white/60 hover:text-white transition\">返回首页</a>
    </div>
    <div class=\"hairline\"></div>
  </header>

  <main class=\"px-6 md:px-10 py-14 md:py-16 max-w-7xl mx-auto\">
    <div class=\"flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10\">
      <div>
        <div class=\"text-[11px] tracking-[0.55em] uppercase text-white/55 mb-4\">Products</div>
        <h1 class=\"hero-title text-3xl md:text-5xl leading-tight\">发现每一滴的价值</h1>
        <p class=\"mt-4 text-white/60 max-w-2xl\">基于 <span class=\"text-white/80\">products.xlsx</span> 生成的产品陈列。点击任意产品，将跳转至该行提供的链接。</p>
      </div>
      <div class=\"flex items-center gap-3\">
        <a href=\"./products.xlsx\" class=\"px-5 py-3 rounded-full text-xs tracking-[0.25em] uppercase border border-white/15 hover:border-white/30 hover:text-white transition\">下载XLSX</a>
      </div>
    </div>

    <section>
      <div class=\"text-sm text-white/60\">共 {len(products)} 条数据，展示前 {min(len(products), 9)} 条。</div>
      <div class=\"mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">
        {cards_html}
      </div>
    </section>
  </main>

  <footer class=\"px-6 md:px-10 py-10 text-center text-xs tracking-widest text-white/35\">
    Copyright ©2025 Shengshui All Rights Reserved.
  </footer>

  <script>
    window.__PRODUCTS__ = {products_json};
  </script>
</body>
</html>
"""


def main() -> None:
    root = Path(__file__).resolve().parent
    xlsx_path = root / "products.xlsx"
    out_path = root / "products.html"

    if not xlsx_path.exists():
        raise SystemExit("products.xlsx not found")

    products = build_products(xlsx_path)
    html_text = render_products_html(products)
    out_path.write_text(html_text, encoding="utf-8")

    print(f"Generated: {out_path}")


if __name__ == "__main__":
    main()
