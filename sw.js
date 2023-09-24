'use strict';
var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (e) {
        return typeof e;
    } : function (e) {
        return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
    }, precacheConfig = [["/index.html","d9c8f0258bfbfa0be2d8385bb10eb81c"]], cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : ''), firstRegister = 1, ignoreUrlParametersMatching = [/^utm_/], addDirectoryIndex = function (e, t) {
        e = new URL(e);
        return '/' === e.pathname.slice(-1) && (e.pathname += t), e.toString();
    }, cleanResponse = function (t) {
        return t.redirected ? ('body' in t ? Promise.resolve(t.body) : t.blob()).then(function (e) {
            return new Response(e, {
                headers: t.headers,
                status: t.status,
                statusText: t.statusText
            });
        }) : Promise.resolve(t);
    }, createCacheKey = function (e, t, n, r) {
        e = new URL(e);
        return r && e.pathname.match(r) || (e.search += (e.search ? '&' : '') + encodeURIComponent(t) + '=' + encodeURIComponent(n)), e.toString();
    }, isPathWhitelisted = function (e, t) {
        if (0 === e.length)
            return !0;
        var n = new URL(t).pathname;
        return e.some(function (e) {
            return n.match(e);
        });
    }, stripIgnoredUrlParameters = function (e, n) {
        e = new URL(e);
        return e.hash = '', e.search = e.search.slice(1).split('&').map(function (e) {
            return e.split('=');
        }).filter(function (t) {
            return n.every(function (e) {
                return !e.test(t[0]);
            });
        }).map(function (e) {
            return e.join('=');
        }).join('&'), e.toString();
    }, addDirectoryIndex = function (e, t) {
        e = new URL(e);
        return '/' === e.pathname.slice(-1) && (e.pathname += t), e.toString();
    }, hashParamName = '_sw-precache', urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
        var t = e[0], e = e[1], t = new URL(t, self.location), e = createCacheKey(t, hashParamName, e, !1);
        return [t.toString(),e];
    }));
function setOfCachedUrls(e) {
    return e.keys().then(function (e) {
        return e && 0 < e.length && (firstRegister = 0), e.map(function (e) {
            return e.url;
        });
    }).then(function (e) {
        return new Set(e);
    });
}
self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(cacheName).then(function (r) {
        return setOfCachedUrls(r).then(function (n) {
            return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (t) {
                var e;
                if (!n.has(t))
                    return e = new Request(t, { credentials: 'same-origin' }), fetch(e).then(function (e) {
                        if (e.ok)
                            return cleanResponse(e).then(function (e) {
                                return r.put(t, e);
                            });
                        throw new Error('Request for ' + t + ' returned a response with status ' + e.status);
                    });
            }));
        });
    }).then(function () {
        return self.skipWaiting();
    }));
}), self.addEventListener('activate', function (e) {
    var n = new Set(urlsToCacheKeys.values());
    e.waitUntil(caches.open(cacheName).then(function (t) {
        return t.keys().then(function (e) {
            return Promise.all(e.map(function (e) {
                if (!n.has(e.url))
                    return t.delete(e);
            }));
        });
    }).then(function () {
        return self.clients.claim();
    }).then(function () {
        if (!firstRegister)
            return self.clients.matchAll().then(function (e) {
                e && e.length && e.forEach(function (e) {
                    e.postMessage('sw.update');
                });
            });
    }));
}), self.addEventListener('fetch', function (t) {
    var n, e, r;
    'GET' === t.request.method && (n = stripIgnoredUrlParameters(t.request.url, ignoreUrlParametersMatching), r = 'index.html', (e = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, r), e = urlsToCacheKeys.has(n)), e && t.respondWith(caches.open(cacheName).then(function (e) {
        return e.match(urlsToCacheKeys.get(n)).then(function (e) {
            if (e)
                return e;
            throw Error('The cached response that was expected is missing.');
        });
    }).catch(function (e) {
        return console.warn('Couldn\'t serve response for "%s" from cache: %O', t.request.url, e), fetch(t.request);
    })));
}), function (e) {
    'object' == ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) && 'undefined' != typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define([], e) : ('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this).toolbox = e();
}(function () {
    return function r(o, i, s) {
        function c(n, e) {
            if (!i[n]) {
                if (!o[n]) {
                    var t = 'function' == typeof require && require;
                    if (!e && t)
                        return t(n, !0);
                    if (a)
                        return a(n, !0);
                    e = new Error('Cannot find module \'' + n + '\'');
                    throw e.code = 'MODULE_NOT_FOUND', e;
                }
                t = i[n] = { exports: {} };
                o[n][0].call(t.exports, function (e) {
                    var t = o[n][1][e];
                    return c(t || e);
                }, t, t.exports, r, o, i, s);
            }
            return i[n].exports;
        }
        for (var a = 'function' == typeof require && require, e = 0; e < s.length; e++)
            c(s[e]);
        return c;
    }({
        1: [function(e,t,n){function c(e,t){((t=t||{}).debug||a.debug)&&console.log("[sw-toolbox] "+e)}function i(e){var t=(t=e&&e.cache?e.cache.name:t)||a.cache.name;return caches.open(t)}function r(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),t)return e;throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.")}var s,a=e("./options"),u=e("./idb-cache-expiration");t.exports={debug:c,fetchAndCache:function(r,o){var t=(o=o||{}).successResponses||a.successResponses;return fetch(r.clone()).then(function(e){return"GET"===r.method&&t.test(e.status)&&i(o).then(function(n){n.put(r,e).then(function(){var e,t=o.cache||a.cache;(t.maxEntries||t.maxAgeSeconds)&&t.name&&(e=function(e,t,n){var r=e.url,o=n.maxAgeSeconds,i=n.maxEntries,e=n.name,s=Date.now();return c("Updating LRU order for "+r+". Max entries is "+i+", max age is "+o),u.getDb(e).then(function(e){return u.setTimestampForUrl(e,r,s)}).then(function(e){return u.expireEntries(e,i,o,s)}).then(function(e){c("Successfully updated IDB.");e=e.map(function(e){return t.delete(e)});return Promise.all(e).then(function(){c("Done with cache cleanup.")})}).catch(function(e){c(e)})}.bind(null,e=r,n,t),s=s?s.then(e):e())})}),e.clone()})},openCache:i,renameCache:function(t,e,n){return c("Renaming cache: ["+t+"] to ["+e+"]",n),caches.delete(e).then(function(){return Promise.all([caches.open(t),caches.open(e)]).then(function(e){var n=e[0],r=e[1];return n.keys().then(function(e){return Promise.all(e.map(function(t){return n.match(t).then(function(e){return r.put(t,e)})}))}).then(function(){return caches.delete(t)})})})},cache:function(t,e){return i(e).then(function(e){return e.add(t)})},uncache:function(t,e){return i(e).then(function(e){return e.delete(t)})},precache:function(e){e instanceof Promise||r(e),a.preCacheItems=a.preCacheItems.concat(e)},validatePrecacheInput:r,isResponseFresh:function(e,t,n){if(!e)return!1;if(t){e=e.headers.get("date");if(e)if(new Date(e).getTime()+1e3*t<n)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],
        2: [function(e,t,n){var o="sw-toolbox-",i=1,u="store",h="url",f="timestamp",s={};t.exports={getDb:function(e){return e in s||(s[e]=(r=e,new Promise(function(e,t){var n=indexedDB.open(o+r,i);n.onupgradeneeded=function(){n.result.createObjectStore(u,{keyPath:h}).createIndex(f,f,{unique:!1})},n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}}))),s[e];var r},setTimestampForUrl:function(r,o,i){return new Promise(function(e,t){var n=r.transaction(u,"readwrite");n.objectStore(u).put({url:o,timestamp:i}),n.oncomplete=function(){e(r)},n.onabort=function(){t(n.error)}})},expireEntries:function(e,n,t,r){return s=e,a=r,((c=t)?new Promise(function(e,t){var n=1e3*c,r=[],o=s.transaction(u,"readwrite"),i=o.objectStore(u);i.index(f).openCursor().onsuccess=function(e){var t,e=e.target.result;e&&a-n>e.value[f]&&(t=e.value[h],r.push(t),i.delete(t),e.continue())},o.oncomplete=function(){e(r)},o.onabort=t}):Promise.resolve([])).then(function(t){return c=e,((a=n)?new Promise(function(e,t){var r=[],n=c.transaction(u,"readwrite"),o=n.objectStore(u),i=o.index(f),s=i.count();i.count().onsuccess=function(){var n=s.result;a<n&&(i.openCursor().onsuccess=function(e){var t,e=e.target.result;e&&(t=e.value[h],r.push(t),o.delete(t),n-r.length>a&&e.continue())})},n.oncomplete=function(){e(r)},n.onabort=t}):Promise.resolve([])).then(function(e){return t.concat(e)});var c,a});var s,c,a}}},{}],
        3: [function(e,t,n){function r(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var o=e("./helpers"),i=e("./router"),s=e("./options");t.exports={fetchListener:function(e){var t=i.match(e.request);t?e.respondWith(t(e.request)):i.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(i.default(e.request))},activateListener:function(e){o.debug("activate event fired");var t=s.cache.name+"$$$inactive$$$";e.waitUntil(o.renameCache(t,s.cache.name))},installListener:function(e){var t=s.cache.name+"$$$inactive$$$";o.debug("install event fired"),o.debug("creating cache ["+t+"]"),e.waitUntil(o.openCache({cache:{name:t}}).then(function(t){return Promise.all(s.preCacheItems).then(r).then(o.validatePrecacheInput).then(function(e){return o.debug("preCache list: "+(e.join(", ")||"(none)")),t.addAll(e)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],
        4: [function(e,t,n){var r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href;t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],
        5: [function(e,t,n){function r(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n}var o=new URL("./",self.location).pathname,i=e("path-to-regexp");r.prototype.makeHandler=function(e){var n,r;return this.regexp&&(n=this.regexp.exec(e),r={},this.keys.forEach(function(e,t){r[e.name]=n[t+1]})),function(e){return this.handler(e,r,this.options)}.bind(this)},t.exports=r},{"path-to-regexp":15}],
        6: [function(e,t,n){function i(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;)new RegExp(r.value[0]).test(t)&&o.push(r.value[1]),r=n.next();return o}function o(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null}var s=e("./route"),c=e("./helpers");["get","post","put","delete","head","any"].forEach(function(r){o.prototype[r]=function(e,t,n){return this.add(r,e,t,n)}}),o.prototype.add=function(e,t,n,r){r=r||{},o=t instanceof RegExp?RegExp:(o=r.origin||self.location.origin)instanceof RegExp?o.source:o.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),e=e.toLowerCase();var n=new s(e,t,n,r),r=(this.routes.has(o)||this.routes.set(o,new Map),this.routes.get(o)),o=(r.has(e)||r.set(e,new Map),r.get(e)),r=n.regexp||n.fullUrlRegExp;o.has(r.source)&&c.debug('"'+t+'" resolves to same regex as existing route.'),o.set(r.source,n)},o.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,n=n.pathname;return this._match(e,i(this.routes,r),n)||this._match(e,[this.routes.get(RegExp)],t)},o.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],o=o&&o.get(e.toLowerCase());if(o){o=i(o,n);if(0<o.length)return o[0].makeHandler(n)}}return null},o.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new o},{"./helpers":1,"./route":5}],
        7: [function(e,t,n){var i=e("../options"),s=e("../helpers");t.exports=function(r,e,o){return o=o||{},s.debug("Strategy: cache first ["+r.url+"]",o),s.openCache(o).then(function(e){return e.match(r).then(function(e){var t=o.cache||i.cache,n=Date.now();return s.isResponseFresh(e,t.maxAgeSeconds,n)?e:s.fetchAndCache(r,o)})})}},{"../helpers":1,"../options":4}],
        8: [function(e,t,n){var o=e("../options"),i=e("../helpers");t.exports=function(t,e,r){return r=r||{},i.debug("Strategy: cache only ["+t.url+"]",r),i.openCache(r).then(function(e){return e.match(t).then(function(e){var t=r.cache||o.cache,n=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,n))return e})})}},{"../helpers":1,"../options":4}],
        9: [function(e,t,n){var u=e("../helpers"),h=e("./cacheOnly");t.exports=function(s,c,a){return u.debug("Strategy: fastest ["+s.url+"]",a),new Promise(function(t,n){function e(e){e instanceof Response?t(e):i("No result returned")}var r=!1,o=[],i=function(e){o.push(e.toString()),r?n(new Error('Both cache and network failed: "'+o.join('", "')+'"')):r=!0};u.fetchAndCache(s.clone(),a).then(e,i),h(s,c,a).then(e,i)})}},{"../helpers":1,"./cacheOnly":8}],
        10: [function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],
        11: [function(e,t,n){var u=e("../options"),h=e("../helpers");t.exports=function(i,e,s){var c=(s=s||{}).successResponses||u.successResponses,a=s.networkTimeoutSeconds||u.networkTimeoutSeconds;return h.debug("Strategy: network first ["+i.url+"]",s),h.openCache(s).then(function(e){var t,n,r=[],o=(a&&(o=new Promise(function(r){t=setTimeout(function(){e.match(i).then(function(e){var t=s.cache||u.cache,n=Date.now(),t=t.maxAgeSeconds;h.isResponseFresh(e,t,n)&&r(e)})},1e3*a)}),r.push(o)),h.fetchAndCache(i,s).then(function(e){if(t&&clearTimeout(t),c.test(e.status))return e;throw h.debug("Response was an HTTP error: "+e.statusText,s),n=e,new Error("Bad response")}).catch(function(t){return h.debug("Network or response error, fallback to cache ["+i.url+"]",s),e.match(i).then(function(e){if(e)return e;if(n)return n;throw t})}));return r.push(o),Promise.race(r)})}},{"../helpers":1,"../options":4}],
        12: [function(e,t,n){var r=e("../helpers");t.exports=function(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}},{"../helpers":1}],
        13: [function(e,t,n){var r=e("./options"),o=e("./router"),i=e("./helpers"),s=e("./strategies"),e=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",e.installListener),self.addEventListener("activate",e.activateListener),self.addEventListener("fetch",e.fetchListener),t.exports={networkOnly:s.networkOnly,networkFirst:s.networkFirst,cacheOnly:s.cacheOnly,cacheFirst:s.cacheFirst,fastest:s.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],
        14: [function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],
        15: [function(e,t,n){function l(e,t){for(var n=[],r=0,o=0,i="",s=t&&t.delimiter||"/";null!=(f=x.exec(e));){var c,a,u,h,f,l=f[0],p=f[1],d=f.index;i+=e.slice(o,d),o=d+l.length,p?i+=p[1]:(d=e[o],l=f[2],p=f[3],c=f[4],a=f[5],u=f[6],h=f[7],i&&(n.push(i),i=""),f=f[2]||s,n.push({name:p||r++,prefix:l||"",delimiter:f,optional:"?"===u||"*"===u,repeat:"+"===u||"*"===u,partial:null!=l&&null!=d&&d!==l,asterisk:!!h,pattern:(p=c||a)?p.replace(/([=!:$\/()])/g,"\\$1"):h?".*":"[^"+m(f)+"]+?"}))}return o<e.length&&(i+=e.substr(o)),i&&n.push(i),n}function p(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function r(h){for(var f=new Array(h.length),e=0;e<h.length;e++)"object"==_typeof(h[e])&&(f[e]=new RegExp("^(?:"+h[e].pattern+")$"));return function(e,t){for(var n="",r=e||{},o=(t||{}).pretty?p:encodeURIComponent,i=0;i<h.length;i++){var s=h[i];if("string"!=typeof s){var c,a=r[s.name];if(null==a){if(s.optional){s.partial&&(n+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be defined')}if(y(a)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received `'+JSON.stringify(a)+"`");if(0===a.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var u=0;u<a.length;u++){if(c=o(a[u]),!f[i].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received `'+JSON.stringify(c)+"`");n+=(0===u?s.prefix:s.delimiter)+c}}else{if(c=s.asterisk?encodeURI(a).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}):o(a),!f[i].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+c+'"');n+=s.prefix+c}}else n+=s}return n}}function m(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function d(e,t){return e.keys=t,e}function g(e){return e.sensitive?"":"i"}function v(e,t,n){y(t)||(n=t||n,t=[]);for(var r=(n=n||{}).strict,o=!1!==n.end,i="",s=0;s<e.length;s++){var c,a,u=e[s];"string"==typeof u?i+=m(u):(c=m(u.prefix),a="(?:"+u.pattern+")",t.push(u),u.repeat&&(a+="(?:"+c+a+")*"),i+=a=u.optional?u.partial?c+"("+a+")?":"(?:"+c+"("+a+"))?":c+"("+a+")")}var h=m(n.delimiter||"/"),f=i.slice(-h.length)===h;return r||(i=(f?i.slice(0,-h.length):i)+"(?:"+h+"(?=$))?"),i+=o?"$":r&&f?"":"(?="+h+"|$)",d(new RegExp("^"+i,g(n)),t)}function w(e,t,n){if(y(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp){var r=e,o=t,i=r.source.match(/\((?!\?)/g);if(i)for(var s=0;s<i.length;s++)o.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return d(r,o)}if(y(e)){for(var c=e,a=t,u=n,h=[],f=0;f<c.length;f++)h.push(w(c[f],a,u).source);return d(new RegExp("(?:"+h.join("|")+")",g(u)),a)}return r=t,v(l(e,t=n),r,t)}var y=e("isarray"),x=(t.exports=w,t.exports.parse=l,t.exports.compile=function(e,t){return r(l(e,t))},t.exports.tokensToFunction=r,t.exports.tokensToRegExp=v,new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g"))},{isarray:14}],
        16: [function(e,t,n){var r,o,i,s;i=Cache.prototype.addAll,(s=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/))&&(r=s[1],o=parseInt(s[2])),i&&(!s||"Firefox"===r&&46<=o||"Chrome"===r&&50<=o)||(Cache.prototype.addAll=function(n){function r(e){this.name="NetworkError",this.code=19,this.message=e}var o=this;return r.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return n=n.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(n.map(function(e){"string"==typeof e&&(e=new Request(e));var t=new URL(e.url).protocol;if("http:"!==t&&"https:"!==t)throw new r("Invalid scheme");return fetch(e.clone())}))}).then(function(e){if(e.some(function(e){return!e.ok}))throw new r("Incorrect response status");return Promise.all(e.map(function(e,t){return o.put(n[t],e)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})},{}]
    }, {}, [13])(13);
}), toolbox.router.get('/**/*', toolbox.cacheFirst, { origin: 'ssrv2ray.xyz' });