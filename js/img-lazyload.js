'use strict';
!function (t) {
    var e = !0, r = !1, l = void 0;
    try {
        for (var o, i = t.querySelectorAll('img[lazyload]')[Symbol.iterator](); !(e = (o = i.next()).done); e = !0)
            !function () {
                var t = o.value;
                Fluid.utils.waitElementVisible(t, function () {
                    t.removeAttribute('srcset'), t.removeAttribute('lazyload');
                }, CONFIG.lazyload.offset_factor);
            }();
    } catch (t) {
        r = !0, l = t;
    } finally {
        try {
            !e && i.return && i.return();
        } finally {
            if (r)
                throw l;
        }
    }
}((window, document));