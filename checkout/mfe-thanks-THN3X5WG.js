import { b as l, c as f } from "@nf-internal/chunk-SA4XMAC3";
import { a as i, b as s, c as p } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as T } from "@angular/elements";
import { PLATFORM_ID as g, afterNextRender as k, inject as d } from "@angular/core";
import { isPlatformBrowser as v } from "@angular/common";
import { ButtonComponent as y } from "@ng-internal/ui";
import * as e from "@angular/core";
var r = class n {
    platformId = d(g);
    loader = d(l);
    constructor() { this.loader("@tractor-store/explore", "mfe-header"), this.loader("@tractor-store/explore", "mfe-footer"), k(() => { if (!v(this.platformId))
        return; new Function("u", "return import(u)")("https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm").then(t => { let a = t.default, h = Date.now() + 1e3, m = { particleCount: 3, scalar: 1.5, colors: ["#FFDE54", "#FF5A54", "#54FF90"], spread: 70 }, c = () => { a(s(i({}, m), { angle: 60, origin: { x: 0 } })), a(s(i({}, m), { angle: 120, origin: { x: 1 } })), Date.now() < h && requestAnimationFrame(c); }; c(); }).catch(() => { }); }); }
    static \u0275fac = function (t) { return new (t || n); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: n, selectors: [["app-thanks"]], hostAttrs: ["data-boundary-page", "checkout"], decls: 9, vars: 1, consts: [[1, "c_Thanks"], [1, "c_Thanks__title"], [1, "c_Thanks__text"], ["variant", "secondary", 3, "appNavigateTo"]], template: function (t, a) { t & 1 && (e.\u0275\u0275element(0, "mfe-header"), e.\u0275\u0275elementStart(1, "main", 0)(2, "h2", 1), e.\u0275\u0275text(3, "Thanks for your order!"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(4, "p", 2), e.\u0275\u0275text(5, "We'll notify you, when its ready for pickup."), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(6, "ts-button", 3), e.\u0275\u0275text(7, "Continue Shopping"), e.\u0275\u0275elementEnd()(), e.\u0275\u0275element(8, "mfe-footer")), t & 2 && (e.\u0275\u0275advance(6), e.\u0275\u0275property("appNavigateTo", "explore.home")); }, dependencies: [y], styles: [`:host{display:block}.c_Thanks{margin:0 auto;max-width:calc(500px + var(--outer-space) * 2);padding:0 var(--outer-space);min-height:50vh}.c_Thanks__title{margin:4rem 0;font-size:40px}.c_Thanks__text{margin:4rem 0}
`], encapsulation: 3, changeDetection: 0 });
};
var u = "mfe-thanks";
function R(n, o) { return p(this, null, function* () { let t = yield f(n, o); customElements.get(u) || customElements.define(u, T(r, { injector: t })); }); }
export { R as bootstrap };
