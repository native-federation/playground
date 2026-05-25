var y = Object.defineProperty, I = Object.defineProperties;
var D = Object.getOwnPropertyDescriptors;
var a = Object.getOwnPropertySymbols;
var u = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
var p = (e, n, t) => n in e ? y(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, b = (e, n) => { for (var t in n ||= {})
    u.call(n, t) && p(e, t, n[t]); if (a)
    for (var t of a(n))
        f.call(n, t) && p(e, t, n[t]); return e; }, O = (e, n) => I(e, D(n));
var C = (e, n) => { var t = {}; for (var o in e)
    u.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]); if (e != null && a)
    for (var o of a(e))
        n.indexOf(o) < 0 && f.call(e, o) && (t[o] = e[o]); return t; };
var S = (e, n, t) => new Promise((o, r) => { var s = i => { try {
    c(t.next(i));
}
catch (h) {
    r(h);
} }, w = i => { try {
    c(t.throw(i));
}
catch (h) {
    r(h);
} }, c = i => i.done ? o(i.value) : Promise.resolve(i.value).then(s, w); c((t = t.apply(e, n)).next()); });
import * as d from "@angular/core";
import { InjectionToken as M, inject as v, DOCUMENT as k } from "@angular/core";
var _ = null;
function l() { return _; }
function N(e) { _ ??= e; }
var g = class {
}, E = (() => { class e {
    historyGo(t) { throw new Error(""); }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: e, factory: () => v(L), providedIn: "platform" });
} return e; })(), G = new M(""), L = (() => { class e extends E {
    _location;
    _history;
    _doc = v(k);
    constructor() { super(), this._location = window.location, this._history = window.history; }
    getBaseHrefFromDOM() { return l().getBaseHref(this._doc); }
    onPopState(t) { let o = l().getGlobalEventTarget(this._doc, "window"); return o.addEventListener("popstate", t, !1), () => o.removeEventListener("popstate", t); }
    onHashChange(t) { let o = l().getGlobalEventTarget(this._doc, "window"); return o.addEventListener("hashchange", t, !1), () => o.removeEventListener("hashchange", t); }
    get href() { return this._location.href; }
    get protocol() { return this._location.protocol; }
    get hostname() { return this._location.hostname; }
    get port() { return this._location.port; }
    get pathname() { return this._location.pathname; }
    get search() { return this._location.search; }
    get hash() { return this._location.hash; }
    set pathname(t) { this._location.pathname = t; }
    pushState(t, o, r) { this._history.pushState(t, o, r); }
    replaceState(t, o, r) { this._history.replaceState(t, o, r); }
    forward() { this._history.forward(); }
    back() { this._history.back(); }
    historyGo(t = 0) { this._history.go(t); }
    getState() { return this._history.state; }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: e, factory: () => new e, providedIn: "platform" });
} return e; })();
function P(e, n) { n = encodeURIComponent(n); for (let t of e.split(";")) {
    let o = t.indexOf("="), [r, s] = o == -1 ? [t, ""] : [t.slice(0, o), t.slice(o + 1)];
    if (r.trim() === n)
        return decodeURIComponent(s);
} return null; }
var m = class {
};
export { b as a, O as b, C as c, S as d, l as e, N as f, g, E as h, G as i, L as j, P as k, m as l };
/*! Bundled license information:

@angular/common/fesm2022/_platform_location-chunk.mjs:
@angular/common/fesm2022/_xhr-chunk.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
