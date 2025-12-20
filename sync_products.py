from __future__ import annotations

import json
from pathlib import Path


START = "// PRODUCTS_DATA_START"
END = "// PRODUCTS_DATA_END"


def main() -> None:
    root = Path(__file__).resolve().parent
    json_path = root / "products.json"
    html_path = root / "products.html"

    if not json_path.exists():
        raise SystemExit("products.json not found")
    if not html_path.exists():
        raise SystemExit("products.html not found")

    data = json.loads(json_path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise SystemExit("products.json must be a JSON array")

    for i, item in enumerate(data):
        if not isinstance(item, dict):
            raise SystemExit(f"products.json item #{i} must be an object")

    pretty = json.dumps(data, ensure_ascii=False, indent=2)

    html_text = html_path.read_text(encoding="utf-8")

    start_idx = html_text.find(START)
    end_idx = html_text.find(END)

    if start_idx == -1 or end_idx == -1 or end_idx < start_idx:
        raise SystemExit("Could not find PRODUCTS_DATA_START/END markers in products.html")

    # Keep everything before START line, and everything after END line
    before = html_text[: start_idx + len(START)]
    after = html_text[end_idx:]

    replacement = f"\n    const PRODUCTS = {pretty};\n    "

    new_html = before + replacement + after
    html_path.write_text(new_html, encoding="utf-8")

    print("Synced products.json -> products.html")


if __name__ == "__main__":
    main()
