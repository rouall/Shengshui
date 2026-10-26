/* ============================================
 * SHENGSHUI i18n 引擎（与词库 i18n-locales.js 配合使用）
 *
 * 语言优先级：localStorage 手动选择 > 浏览器语言 > 中文（默认）
 * 支持语言：中 / 英 / 西 / 德 / 阿 / 俄 / 韩 / 葡 / 法 / 日
 *
 * 用法：
 *   1. 静态文案：元素加 data-i18n="key"（替换 textContent）
 *   2. 无障碍标签：元素加 data-i18n-aria="key"（替换 aria-label）
 *   3. 图片描述：元素加 data-i18n-alt="key"（替换 alt）
 *   4. 页面标题：<html data-i18n-title="meta.xxx">（替换 document.title）
 *   5. JS 动态文案：window.I18N.t('key.path')，可为字符串或对象
 *   6. 模板占位符：window.I18N.t.format('key', { n: 1, m: 2 })
 *   7. 切换菜单：容器加 data-lang-switch，菜单由本模块自动生成
 *   8. 监听切换：document.addEventListener('languagechange', fn)
 *
 * 注意：本文件依赖 i18n-locales.js 先加载。
 * ============================================ */
(function () {
    'use strict';

    var LANGS = window.I18N_LANGS || [];
    var DICT = window.I18N_LOCALES || {};
    var STORAGE_KEY = 'shengshui_lang';
    var DEFAULT_LANG = 'zh';

    var current = detect();

    function isSupported(code) {
        return !!(code && DICT[code]);
    }

    /* 浏览器语言标签归一化：zh-CN / zh_TW / pt-BR → zh / zh / pt */
    function baseLang(tag) {
        return String(tag || '').toLowerCase().split(/[-_]/)[0];
    }

    function getMeta(code) {
        for (var i = 0; i < LANGS.length; i++) {
            if (LANGS[i].code === code) return LANGS[i];
        }
        return { code: DEFAULT_LANG, htmlLang: 'zh-CN', native: '中文', short: '中', dir: 'ltr' };
    }

    /* 语言检测：手动选择 > 浏览器语言列表 > 中文（默认） */
    function detect() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (isSupported(saved)) return saved;
        } catch (e) { /* 隐私模式下忽略 */ }

        var list = [];
        if (navigator.languages && navigator.languages.length) {
            list = navigator.languages;
        } else if (navigator.language) {
            list = [navigator.language];
        }

        for (var i = 0; i < list.length; i++) {
            var code = baseLang(list[i]);
            if (isSupported(code)) return code;
        }
        return DEFAULT_LANG;
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

    /* 回退顺序：当前语言 → 英文 → 中文 → key 本身 */
    function t(key) {
        var val = resolve(DICT[current], key);
        if (val == null && current !== 'en') val = resolve(DICT.en, key);
        if (val == null) val = resolve(DICT.zh, key);
        return val == null ? key : val;
    }

    /* 模板占位符：t.format('productsPage.status', { n: 9, m: 9 }) */
    t.format = function (key, params) {
        var str = t(key);
        if (typeof str !== 'string') return str;
        Object.keys(params || {}).forEach(function (k) {
            str = str.split('{' + k + '}').join(params[k]);
        });
        return str;
    };

    function syncDocumentLang() {
        var meta = getMeta(current);
        document.documentElement.lang = meta.htmlLang || current;
        document.documentElement.dir = meta.dir || 'ltr';
    }

    function apply() {
        /* 词库缺失时保持页面原文案，避免把 key 直接渲染出来 */
        if (!isSupported(current)) return;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var val = t(el.getAttribute('data-i18n'));
            if (typeof val === 'string') el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var val = t(el.getAttribute('data-i18n-aria'));
            if (typeof val === 'string') el.setAttribute('aria-label', val);
        });
        document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
            var val = t(el.getAttribute('data-i18n-alt'));
            if (typeof val === 'string') el.setAttribute('alt', val);
        });
        var titleEl = document.querySelector('[data-i18n-title]');
        if (titleEl) {
            var title = t(titleEl.getAttribute('data-i18n-title'));
            if (typeof title === 'string') document.title = title;
        }
        syncDocumentLang();
    }

    /* ---------------- 语言切换菜单 ---------------- */

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null) node.textContent = text;
        return node;
    }

    function renderSwitchers() {
        document.querySelectorAll('[data-lang-switch]').forEach(function (host) {
            if (host.getAttribute('data-rendered') === '1') return;
            host.setAttribute('data-rendered', '1');
            host.setAttribute('role', 'group');
            host.innerHTML = '';

            var trigger = el('button', 'lang-trigger');
            trigger.type = 'button';
            trigger.setAttribute('aria-haspopup', 'listbox');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.appendChild(el('span', 'lang-current'));

            var menu = el('div', 'lang-menu');
            menu.setAttribute('role', 'listbox');

            LANGS.forEach(function (lang) {
                var option = el('button', 'lang-option');
                option.type = 'button';
                option.setAttribute('role', 'option');
                option.setAttribute('data-set-lang', lang.code);
                option.appendChild(el('span', 'lang-name', lang.native));
                option.appendChild(el('span', 'lang-check', '✓'));
                menu.appendChild(option);
            });

            host.appendChild(trigger);
            host.appendChild(menu);
        });
    }

    function updateSwitchers() {
        var meta = getMeta(current);
        var label = t('lang.label');
        if (typeof label !== 'string') label = 'Language';

        document.querySelectorAll('[data-lang-switch]').forEach(function (host) {
            var trigger = host.querySelector('.lang-trigger');
            var currentEl = host.querySelector('.lang-current');
            var menu = host.querySelector('.lang-menu');

            if (currentEl) currentEl.textContent = meta.short || meta.native;
            if (trigger) trigger.setAttribute('aria-label', label + ': ' + meta.native);
            if (menu) menu.setAttribute('aria-label', label);

            host.querySelectorAll('.lang-option').forEach(function (option) {
                var on = option.getAttribute('data-set-lang') === current;
                option.classList.toggle('active', on);
                option.setAttribute('aria-selected', on ? 'true' : 'false');
            });
        });
    }

    function closeSwitchers(except) {
        document.querySelectorAll('[data-lang-switch].open').forEach(function (host) {
            if (host === except) return;
            host.classList.remove('open');
            var trigger = host.querySelector('.lang-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    }

    function openSwitcher(host) {
        var trigger = host.querySelector('.lang-trigger');
        closeSwitchers(host);
        host.classList.add('open');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }

    function bindSwitchers() {
        document.addEventListener('click', function (e) {
            var target = e.target;
            if (!target || !target.closest) return;

            var langBtn = target.closest('[data-set-lang]');
            if (langBtn) {
                setLang(langBtn.getAttribute('data-set-lang'));
                return;
            }

            var trigger = target.closest('.lang-trigger');
            if (trigger) {
                var host = trigger.closest('[data-lang-switch]');
                if (host) {
                    if (host.classList.contains('open')) closeSwitchers();
                    else openSwitcher(host);
                }
                return;
            }

            if (!target.closest('[data-lang-switch]')) closeSwitchers();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var openHost = document.querySelector('[data-lang-switch].open');
            if (!openHost) return;
            closeSwitchers();
            var trigger = openHost.querySelector('.lang-trigger');
            if (trigger) trigger.focus();
        });
    }

    function setLang(lang) {
        if (!isSupported(lang)) return;
        if (lang !== current) {
            current = lang;
            try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* 忽略 */ }
            apply();
            updateSwitchers();
            document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
        }
        closeSwitchers();
    }

    /* 尽早同步 html lang/dir，避免首屏字体与方向错位 */
    try {
        var initialMeta = getMeta(current);
        document.documentElement.lang = initialMeta.htmlLang || current;
        document.documentElement.dir = initialMeta.dir || 'ltr';
    } catch (e) { /* 忽略 */ }

    document.addEventListener('DOMContentLoaded', function () {
        renderSwitchers();
        apply();
        updateSwitchers();
        bindSwitchers();
    });

    window.I18N = {
        t: t,
        setLang: setLang,
        getLang: function () { return current; },
        apply: apply,
        languages: LANGS.slice()
    };
})();
