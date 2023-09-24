'use strict';
HTMLElement.prototype.wrap = function (n) {
    this.parentNode.insertBefore(n, this), this.parentNode.removeChild(this), n.appendChild(this);
}, Fluid.events = {
    registerNavbarEvent: function () {
        var n = jQuery('#navbar'), o = jQuery('#navbar .dropdown-menu');
        0 < n.offset().top && (n.removeClass('navbar-dark'), o.removeClass('navbar-dark')), Fluid.utils.listenScroll(function () {
            n[50 < n.offset().top ? 'addClass' : 'removeClass']('top-nav-collapse'), o[50 < n.offset().top ? 'addClass' : 'removeClass']('dropdown-collapse'), 0 < n.offset().top ? n.removeClass('navbar-dark') : n.addClass('navbar-dark'), o.removeClass('navbar-dark');
        }), jQuery('#navbar-toggler-btn').on('click', function () {
            jQuery('.animated-icon').toggleClass('open'), jQuery('#navbar').toggleClass('navbar-col-show');
        });
    },
    registerParallaxEvent: function () {
        var e, r = jQuery('#banner[parallax="true"]');
        0 !== r.length && 0 !== (e = jQuery('#board')).length && Fluid.utils.listenScroll(function () {
            var n = jQuery(window).scrollTop() / 5, o = 96 + parseInt(e.css('margin-top'), 0);
            r.css({
                transform: 'translate3d(0,' + (n = o < n ? o : n) + 'px,0)',
                '-webkit-transform': 'translate3d(0,' + n + 'px,0)',
                '-ms-transform': 'translate3d(0,' + n + 'px,0)',
                '-o-transform': 'translate3d(0,' + n + 'px,0)'
            }), jQuery('#toc') && jQuery('#toc-ctn').css({ 'padding-top': n + 'px' });
        });
    },
    registerScrollDownArrowEvent: function () {
        var n = jQuery('.scroll-down-bar');
        0 !== n.length && n.on('click', function () {
            Fluid.utils.scrollToElement('#board', -jQuery('#navbar').height());
        });
    },
    registerScrollTopArrowEvent: function () {
        var o, e, r, n, t, a = jQuery('#scroll-top-button');
        0 !== a.length && 0 !== (o = jQuery('#board')).length && (r = e = !1, (n = function () {
            var n = o[0].getClientRects()[0].right, n = document.body.offsetWidth - n;
            e = 50 <= n, a.css({
                bottom: e && r ? '20px' : '-60px',
                right: n - 64 + 'px'
            });
        })(), jQuery(window).resize(n), t = o.offset().top, Fluid.utils.listenScroll(function () {
            var n = document.body.scrollTop + document.documentElement.scrollTop;
            r = t <= n, a.css({ bottom: e && r ? '20px' : '-60px' });
        }), a.on('click', function () {
            jQuery('body,html').animate({
                scrollTop: 0,
                easing: 'swing'
            });
        }));
    },
    registerImageLoadedEvent: function () {
        if ('NProgress' in window) {
            var n = document.getElementById('banner'), n = (n && (n = n.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/(['"])/g, ''), (r = new Image()).onload = function () {
                    window.NProgress && window.NProgress.inc(0.2);
                }, r.src = n, r.complete && r.onload()), jQuery('main img:not([lazyload])')), e = n.length, o = !0, r = !1, t = void 0;
            try {
                for (var a, l = n[Symbol.iterator](); !(o = (a = l.next()).done); o = !0)
                    !function () {
                        var n = a.value, o = n.onload;
                        n.onload = function () {
                            o && o(), window.NProgress && window.NProgress.inc(0.5 / e);
                        }, n.complete && n.onload();
                    }();
            } catch (n) {
                r = !0, t = n;
            } finally {
                try {
                    !o && l.return && l.return();
                } finally {
                    if (r)
                        throw t;
                }
            }
        }
    },
    billboard: function () {
        'console' in window && console.log('\n------------------------------------------------\n|                                              |\n|     ________  __            _        __      |\n|    |_   __  |[  |          (_)      |  ]     |\n|      | |_ \\_| | | __   _   __   .--.| |      |\n|      |  _|    | |[  | | | [  |/ /\'`\\\' |      |\n|     _| |_     | | | \\_/ |, | || \\__/  |      |\n|    |_____|   [___]\'.__.\'_/[___]\'.__.;__]     |\n|                                              |\n|           Powered by Hexo x Fluid            |\n|         GitHub: https://git.io/JqpVD         |\n|                                              |\n------------------------------------------------\n    ');
    }
};