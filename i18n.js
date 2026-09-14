/* ============================================
 * SHENGSHUI i18n 共享模块（中 / 英）
 *
 * 语言优先级：localStorage 手动选择 > 浏览器语言 > 中文
 *
 * 用法：
 *   1. 静态文案：元素加 data-i18n="key"（替换 textContent）
 *   2. 无障碍标签：元素加 data-i18n-aria="key"（替换 aria-label）
 *   3. 页面标题：<html data-i18n-title="meta.xxx">（替换 document.title）
 *   4. JS 动态文案：window.I18N.t('key.path')，支持 {n} 占位符（t 后自行 replace）
 *   5. 切换按钮：元素加 data-set-lang="zh|en"，激活态自动加 .active class
 *   6. 监听切换：document.addEventListener('languagechange', fn)
 * ============================================ */
(function () {
    'use strict';

    var DICT = {
        zh: {
            meta: {
                home: 'SHENGSHUI | 发现每一滴的价值',
                products: 'SHENGSHUI | 产品'
            },
            nav: {
                backHome: '返回首页',
                coop: '合作'
            },
            hero: {
                desc: '发现每一滴的价值。'
            },
            modes: {
                desert: { sub: '· 感受生命的极度渴望 ·', desc: '当世界干涸，唯有一滴纯净，值得你不远万里。' },
                dew: { sub: '· 沉浸自然的极致滋养 ·', desc: '源自晨曦微露的刹那，让每一个细胞重新呼吸。' },
                ice: { sub: '· 体验极地的纯净力量 ·', desc: '来自冰原深处的馈赠，历经千年淬炼的极致纯净。' },
                water: { sub: '· 源自自然的圣水 ·', desc: '以矿物与时间雕刻的层次感，入口即是高级的宁静。' },
                star: { sub: '· 汲取星辰的永恒之水 ·', desc: '如同夜空中的璀璨星河，每一滴都承载着宇宙的深邃与神秘。' }
            },
            featured: {
                name: '百岁山天然矿泉水',
                desc: '1L × 30瓶 整箱装 · 天然好水',
                cta: '去看看'
            },
            coop: {
                title: '域名合作',
                text1: '域名有自身价值，此域名可租用也可出售，有意向直接报价，真诚，互不墨迹。',
                text2: '如果您对域名合作、品牌联名或投资意向感兴趣，请通过以下邮箱与我们建立连接。',
                copy: '复制邮箱',
                close: '关闭',
                copied: '邮箱已复制',
                copyFail: '复制失败，请手动复制'
            },
            productsPage: {
                heading: '发现每一滴的价值',
                status: '共 {n} 条精选，展示前 {m} 条。'
            }
        },
        en: {
            meta: {
                home: 'SHENGSHUI | Discover the Value in Every Drop',
                products: 'SHENGSHUI | Products'
            },
            nav: {
                backHome: 'Home',
                coop: 'PARTNER'
            },
            hero: {
                desc: 'Discover the value in every drop.'
            },
            modes: {
                desert: { sub: "· FEEL LIFE'S DEEPEST LONGING ·", desc: 'When the world runs dry, one pure drop is worth the journey.' },
                dew: { sub: "· IMMERSE IN NATURE'S FINEST NOURISHMENT ·", desc: 'Born from the first light of dawn, every cell breathes anew.' },
                ice: { sub: '· THE PURE POWER OF THE POLAR ·', desc: 'A gift from the heart of ancient ice, refined over a thousand years.' },
                water: { sub: '· HOLY WATER, GIFTED BY NATURE ·', desc: 'Minerals and time carve its layers — serenity from the first sip.' },
                star: { sub: '· ETERNAL WATER, DRAWN FROM THE STARS ·', desc: 'Like a galaxy across the night sky, each drop holds the depth of the cosmos.' }
            },
            featured: {
                name: 'Ganten Natural Mineral Water',
                desc: '1L × 30 Bottles · Naturally Pure',
                cta: 'View'
            },
            coop: {
                title: 'Domain Partnership',
                text1: 'This domain carries intrinsic value and is available for lease or purchase. If interested, make your offer directly — sincerity over small talk.',
                text2: 'For domain partnerships, brand collaborations, or investment inquiries, please connect with us via the email below.',
                copy: 'Copy Email',
                close: 'Close',
                copied: 'Email copied',
                copyFail: 'Copy failed — please copy manually'
            },
            productsPage: {
                heading: 'Discover the Value in Every Drop',
                status: 'Showing {m} of {n} curated products.'
            }
        }
    };

    var STORAGE_KEY = 'shengshui_lang';
    var current = detect();

    /* 语言检测：手动选择 > 浏览器语言 > 中文（默认） */
    function detect() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'zh' || saved === 'en') return saved;
        } catch (e) { /* 隐私模式下忽略 */ }
        var nav = String(navigator.language || 'zh-CN').toLowerCase();
        return nav.indexOf('zh') === 0 ? 'zh' : 'en';
    }

    /* 支持点路径取值：t('modes.desert.sub')，缺失时回退中文 */
    function t(key) {
        var val = resolve(DICT[current], key);
        if (val == null) val = resolve(DICT.zh, key);
        return val == null ? key : val;
    }

    function resolve(obj, key) {
        var val = obj;
        var parts = key.split('.');
        for (var i = 0; i < parts.length; i++) {
            if (val == null) return null;
            val = val[parts[i]];
        }
        return val;
    }

    /* 模板占位符：t('productsPage.status').replace('{n}', 9) */
    t.format = function (key, params) {
        var str = t(key);
        Object.keys(params || {}).forEach(function (k) {
            str = str.split('{' + k + '}').join(params[k]);
        });
        return str;
    };

    function apply() {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var val = t(el.getAttribute('data-i18n'));
            if (typeof val === 'string') el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var val = t(el.getAttribute('data-i18n-aria'));
            if (typeof val === 'string') el.setAttribute('aria-label', val);
        });
        var titleEl = document.querySelector('[data-i18n-title]');
        if (titleEl) {
            var title = t(titleEl.getAttribute('data-i18n-title'));
            if (typeof title === 'string') document.title = title;
        }
        document.documentElement.lang = current === 'zh' ? 'zh-CN' : 'en';
    }

    function updateSwitcher() {
        document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-set-lang') === current);
        });
    }

    function setLang(lang) {
        if (lang !== 'zh' && lang !== 'en' || lang === current) return;
        current = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* 忽略 */ }
        apply();
        updateSwitcher();
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setLang(btn.getAttribute('data-set-lang'));
            });
        });
        apply();
        updateSwitcher();
    });

    window.I18N = {
        t: t,
        setLang: setLang,
        getLang: function () { return current; }
    };
})();
