'use strict';
!function (l, s) {
    function u(i, c) {
        return new Promise(function (o, r) {
            i('get', '/classes/Counter?where=' + encodeURIComponent(JSON.stringify({ target: c }))).then(function (e) {
                return e.json();
            }).then(function (e) {
                var t = e.results, n = e.code, e = e.error;
                if (401 === n)
                    throw e;
                t && 0 < t.length ? (n = t[0], o(n)) : i('post', '/classes/Counter', {
                    target: c,
                    time: 0
                }).then(function (e) {
                    return e.json();
                }).then(function (e, t) {
                    if (t)
                        throw t;
                    o(e);
                }).catch(function (e) {
                    console.error('Failed to create', e), r(e);
                });
            }).catch(function (e) {
                console.error('LeanCloud Counter Error:', e), r(e);
            });
        });
    }
    function p(e) {
        return {
            method: 'PUT',
            path: '/1.1/classes/Counter/' + e,
            body: {
                time: {
                    __op: 'Increment',
                    amount: 1
                }
            }
        };
    }
    function e(t) {
        var e, o = !0 === CONFIG.web_analytics.enable, n = [], r = [], i = s.querySelector('#leancloud-site-pv-container'), c = (i && (e = u(t, 'site-pv').then(function (e) {
                o && r.push(p(e.objectId));
                var t = s.querySelector('#leancloud-site-pv');
                t && (t.innerText = e.time + 1, i && (i.style.display = 'inline'));
            }), n.push(e)), s.querySelector('#leancloud-site-uv-container')), a = (c && (e = u(t, 'site-uv').then(function (e) {
                n = 'LeanCloud_UV_Flag';
                var t = !((t = localStorage.getItem(n)) && new Date().getTime() - parseInt(t, 10) <= 86400000) && (localStorage.setItem(n, new Date().getTime().toString()), !0), n = (t && o && r.push(p(e.objectId)), s.querySelector('#leancloud-site-uv'));
                n && (n.innerText = e.time + (t ? 1 : 0), c && (c.style.display = 'inline'));
            }), n.push(e)), s.querySelector('#leancloud-page-views-container'));
        a && (e = decodeURI(l.location.pathname.replace(/(?<!\/)\/*(index.html)*$/, '/')), e = u(t, e).then(function (e) {
            var t;
            o && r.push(p(e.objectId)), a && (t = s.querySelector('#leancloud-page-views')) && (t.innerText = (e.time || 0) + 1, a.style.display = 'inline');
        }), n.push(e)), o && Promise.all(n).then(function () {
            var e, o;
            0 < r.length && (e = t, o = r, new Promise(function (t, n) {
                e('post', '/batch', { requests: o }).then(function (e) {
                    if ((e = e.json()).error)
                        throw e.error;
                    t(e);
                }).catch(function (e) {
                    console.error('Failed to save visitor count', e), n(e);
                });
            }));
        });
    }
    var r = CONFIG.web_analytics.leancloud.app_id, i = CONFIG.web_analytics.leancloud.app_key, t = CONFIG.web_analytics.leancloud.server_url;
    function n(o) {
        e(function (e, t, n) {
            return fetch(o + '/1.1' + t, {
                method: e,
                headers: {
                    'X-LC-Id': r,
                    'X-LC-Key': i,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(n)
            });
        });
    }
    t = '-MdYXbMMI' !== r.slice(-9) ? t : 'https://' + r.slice(0, 8).toLowerCase() + '.api.lncldglobal.com';
    t ? n(t) : fetch('https://app-router.leancloud.cn/2/route?appId=' + r).then(function (e) {
        return e.json();
    }).then(function (e) {
        e.api_server && n('https://' + e.api_server);
    });
}(window, document);