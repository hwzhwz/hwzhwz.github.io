'use strict';
!function (o, i) {
    var l = i.documentElement, c = 'Fluid_Color_Scheme', e = '--color-mode', u = 'data-user-color-scheme', r = 'data-default-color-scheme', n = 'color-toggle-btn', s = 'color-toggle-icon';
    function d(t) {
        try {
            return localStorage.getItem(t);
        } catch (t) {
            return null;
        }
    }
    function a() {
        var t = getComputedStyle(l).getPropertyValue(e);
        return 'string' == typeof t ? t.replace(/["'\s]/g, '') : null;
    }
    function g() {
        l.setAttribute(u, f());
        var t = c;
        try {
            localStorage.removeItem(t);
        } catch (t) {
        }
    }
    var m = {
        dark: !0,
        light: !0
    };
    function f() {
        var t = 'string' == typeof (t = l.getAttribute(r)) ? t.replace(/["'\s]/g, '') : null;
        if (m[t])
            return t;
        if (t = a(), m[t])
            return t;
        t = new Date().getHours();
        return 18 <= t || 0 <= t && t <= 6 ? 'dark' : 'light';
    }
    function h(t) {
        var e, r, t = t || d(c) || f();
        if (t === f())
            g();
        else {
            if (!m[t])
                return void g();
            l.setAttribute(u, t);
        }
        var n = t, a = (m[n] && (e = 'icon-dark', n && (e = 'icon-' + v[n]), (a = i.getElementById(s)) ? (a.setAttribute('class', 'iconfont ' + e), a.setAttribute('data', v[n])) : Fluid.utils.waitElementLoaded(s, function () {
                var t = i.getElementById(s);
                t && (t.setAttribute('class', 'iconfont ' + e), t.setAttribute('data', v[n]));
            })), t), t = (o.REMARK42 && o.REMARK42.changeTheme(a), o.CUSDIS && o.CUSDIS.setTheme(a), i.querySelector('iframe'));
        t && (r = o.UtterancesThemeLight, a = {
            type: 'set-theme',
            theme: r = 'dark' === a ? o.UtterancesThemeDark : r
        }, t.contentWindow.postMessage(a, 'https://utteranc.es'));
    }
    var v = {
        dark: 'light',
        light: 'dark'
    };
    function y() {
        var t = d(c);
        if (m[t])
            t = v[t];
        else {
            if (null !== t)
                return;
            var e = i.getElementById(s);
            e && (t = e.getAttribute('data')), e && m[t] || (t = v[a()]);
        }
        var e = c, r = t;
        try {
            localStorage.setItem(e, r);
        } catch (t) {
        }
        return t;
    }
    h(), Fluid.utils.waitElementLoaded(n, function () {
        h();
        var t = i.getElementById(n);
        t && t.addEventListener('click', function () {
            h(y());
        });
    });
}(window, document);