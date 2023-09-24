'use strict';
HTMLElement.prototype.wrap = function (t) {
    this.parentNode.insertBefore(t, this), this.parentNode.removeChild(this), t.appendChild(this);
}, Fluid.plugins = {
    typing: function (t) {
        var e;
        'Typed' in window && ((e = new window.Typed('#subtitle', {
            strings: ["  ",t+"&nbsp;"],
            cursorChar: CONFIG.typing.cursorChar,
            typeSpeed: CONFIG.typing.typeSpeed,
            loop: CONFIG.typing.loop
        })).stop(), (t = document.getElementById('subtitle')) && (t.innerText = ''), jQuery(document).ready(function () {
            jQuery('.typed-cursor').addClass('h2'), e.start();
        }));
    },
    initTocBot: function () {
        var t, e = jQuery('#toc');
        0 !== e.length && window.tocbot && (t = jQuery('#board-ctn').offset().top, window.tocbot.init({
            tocSelector: '#toc-body',
            contentSelector: '.markdown-body',
            headingSelector: CONFIG.toc.headingSelector || 'h1,h2,h3,h4,h5,h6',
            linkClass: 'tocbot-link',
            activeLinkClass: 'tocbot-active-link',
            listClass: 'tocbot-list',
            isCollapsedClass: 'tocbot-is-collapsed',
            collapsibleClass: 'tocbot-is-collapsible',
            collapseDepth: CONFIG.toc.collapseDepth || 0,
            scrollSmooth: !0,
            headingsOffset: -t
        }), 0 < jQuery('.toc-list-item').length && e.css('visibility', 'visible'));
    },
    initFancyBox: function () {
        $.fancybox && (jQuery('.markdown-body :not(a) > img, .markdown-body > img').each(function () {
            var t, e = jQuery(this), o = e.attr('data-src') || e.attr('src') || '', n = (CONFIG.image_zoom.img_url_replace && (i = (t = CONFIG.image_zoom.img_url_replace)[0] || '', t = t[1] || '', i && (o = /^re:/.test(i) ? (i = i.replace(/^re:/, ''), n = new RegExp(i, 'gi'), o.replace(n, t)) : o.replace(i, t))), e.wrap('\n        <a class="fancybox fancybox.image" href="' + o + '"\n          itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>').parent('a')), i = (e.is('.group-image-container img') ? n.attr('data-fancybox', 'group').attr('rel', 'group') : n.attr('data-fancybox', 'default').attr('rel', 'default'), e.attr('title') || e.attr('alt'));
            i && (n.append('<p class="image-caption">' + i + '</p>'), n.attr('title', i).attr('data-caption', i));
        }), $.fancybox.defaults.hash = !1, jQuery('.fancybox').fancybox({
            loop: !0,
            helpers: { overlay: { locked: !1 } }
        }));
    },
    initAnchor: function () {
        if ('anchors' in window) {
            window.anchors.options = {
                placement: CONFIG.anchorjs.placement,
                visible: CONFIG.anchorjs.visible
            }, CONFIG.anchorjs.icon && (window.anchors.options.icon = CONFIG.anchorjs.icon);
            var t = (CONFIG.anchorjs.element || 'h1,h2,h3,h4,h5,h6').split(','), e = [], o = !0, n = !1, i = void 0;
            try {
                for (var a, r = t[Symbol.iterator](); !(o = (a = r.next()).done); o = !0) {
                    var c = a.value;
                    e.push('.markdown-body > ' + c);
                }
            } catch (t) {
                n = !0, i = t;
            } finally {
                try {
                    !o && r.return && r.return();
                } finally {
                    if (n)
                        throw i;
                }
            }
            window.anchors.add(e.join(', '));
        }
    },
    initCopyCode: function () {
        var t, e;
        'ClipboardJS' in window && ((e = jQuery('.markdown-body pre')).each(function () {
            var t = jQuery(this);
            0 < t.find('code.mermaid').length || 0 < t.find('span.line').length || t.append('<button class="copy-btn" data-clipboard-snippet=""><i class="iconfont icon-copy"></i><span>Copy</span></button>');
        }), t = new window.ClipboardJS('.copy-btn', {
            target: function (t) {
                return t.previousElementSibling;
            }
        }), jQuery('.copy-btn').addClass(0 === (e = e).length || 127.5 < 0.213 * (e = e.css('background-color').replace(/rgba*\(/, '').replace(')', '').split(','))[0] + 0.715 * e[1] + 0.072 * e[2] ? 'copy-btn-dark' : 'copy-btn-light'), t.on('success', function (t) {
            t.clearSelection();
            var e = t.trigger.outerHTML;
            t.trigger.innerHTML = 'Success', setTimeout(function () {
                t.trigger.outerHTML = e;
            }, 2000);
        }));
    }
};