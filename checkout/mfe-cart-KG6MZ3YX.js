import { a as h } from "@nf-internal/chunk-HAURFVXL";
import { a as y } from "@nf-internal/chunk-IXVRQ3XI";
import { a as l } from "@nf-internal/chunk-DDWWMX3L";
import { b as f, c as _ } from "@nf-internal/chunk-SA4XMAC3";
import { c as v } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as E } from "@angular/elements";
import { computed as c, inject as g } from "@angular/core";
import { ButtonComponent as w } from "@ng-internal/ui";
import { computed as u, inject as b, input as x, output as I } from "@angular/core";
import { NavigateToDirective as k } from "@ng-internal/navigation";
import { ButtonComponent as L } from "@ng-internal/ui";
import * as e from "@angular/core";
var p = class r {
    cart = b(l);
    image = b(y);
    item = x.required();
    removed = I();
    linkParams = u(() => ({ id: this.item().id, sku: this.item().sku }));
    smallSrc = u(() => this.image.imgSrc(this.item().image, 200));
    srcset = u(() => this.image.imgSrcset(this.item().image, [200, 400]));
    onRemove(i) { i.preventDefault(); let a = this.item().sku; this.cart.remove(a), this.removed.emit(a); }
    static \u0275fac = function (a) { return new (a || r); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: r, selectors: [["app-line-item"]], hostAttrs: ["role", "listitem", 1, "c_LineItem"], inputs: { item: [1, "item"] }, outputs: { removed: "removed" }, decls: 18, vars: 14, consts: [[1, "c_LineItem__image", 3, "appNavigateTo", "navPayload"], ["sizes", "200px", "width", "200", "height", "200", 3, "src", "srcset", "alt"], [1, "c_LineItem__details"], [1, "c_LineItem__name", 3, "appNavigateTo", "navPayload"], [1, "c_LineItem__quantity"], [3, "submit"], ["type", "hidden", "name", "sku", 3, "value"], ["type", "submit", "value", "remove", "variant", "secondary", "size", "small", 3, "rounded", "title"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "height", "20", "width", "20", "viewBox", "0 0 48 48", "aria-hidden", "true"], ["fill", "#000", "d", "m40 5.172-16 16-16-16L5.171 8l16.001 16L5.171 40 8 42.828l16-16 16 16L42.828 40l-16-16 16-16L40 5.172Z"], [1, "c_LineItem__price"]], template: function (a, n) { if (a & 1 && (e.\u0275\u0275elementStart(0, "a", 0), e.\u0275\u0275element(1, "img", 1), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(2, "div", 2)(3, "a", 3)(4, "strong"), e.\u0275\u0275text(5), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(6, "br"), e.\u0275\u0275text(7), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(8, "div", 4)(9, "span"), e.\u0275\u0275text(10), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(11, "form", 5), e.\u0275\u0275listener("submit", function (s) { return n.onRemove(s); }), e.\u0275\u0275element(12, "input", 6), e.\u0275\u0275elementStart(13, "ts-button", 7), e.\u0275\u0275namespaceSVG(), e.\u0275\u0275elementStart(14, "svg", 8), e.\u0275\u0275element(15, "path", 9), e.\u0275\u0275elementEnd()()()(), e.\u0275\u0275namespaceHTML(), e.\u0275\u0275elementStart(16, "div", 10), e.\u0275\u0275text(17), e.\u0275\u0275elementEnd()()), a & 2) {
            let o = n.item();
            e.\u0275\u0275property("appNavigateTo", "decide.product")("navPayload", n.linkParams()), e.\u0275\u0275advance(), e.\u0275\u0275property("src", n.smallSrc(), e.\u0275\u0275sanitizeUrl)("srcset", n.srcset())("alt", o.name), e.\u0275\u0275advance(2), e.\u0275\u0275property("appNavigateTo", "decide.product")("navPayload", n.linkParams()), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate(o.name), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1("", o.sku, " "), e.\u0275\u0275advance(3), e.\u0275\u0275textInterpolate(o.quantity), e.\u0275\u0275advance(2), e.\u0275\u0275property("value", o.sku), e.\u0275\u0275advance(), e.\u0275\u0275property("rounded", !0)("title", "Remove " + o.name + " from cart"), e.\u0275\u0275advance(4), e.\u0275\u0275textInterpolate1("", o.total, " \xD8");
        } }, dependencies: [k, L], styles: [`:host{display:flex;margin-bottom:2rem;flex-wrap:wrap;gap:2rem;align-items:center}.c_LineItem__image{flex-basis:150px;padding-right:2rem}.c_LineItem__image img{display:block;aspect-ratio:1/1;width:100%;height:auto;object-fit:contain}.c_LineItem__details{flex-grow:1;display:flex;gap:1rem;flex-wrap:wrap;align-items:center;justify-content:flex-end}.c_LineItem__name{padding-right:2rem;flex-grow:1;color:inherit;text-decoration:none;min-width:300px}.c_LineItem__quantity{display:flex;gap:1rem;align-items:center}.c_LineItem__price{flex-basis:100px;text-align:end}
`], encapsulation: 3, changeDetection: 0 });
};
import * as t from "@angular/core";
var S = (r, i) => i.sku;
function P(r, i) { if (r & 1 && t.\u0275\u0275element(0, "app-line-item", 2), r & 2) {
    let a = i.$implicit;
    t.\u0275\u0275property("item", a);
} }
var d = class r {
    cart = g(l);
    variantHttp = g(h);
    loader = g(f);
    constructor() { this.loader("@tractor-store/explore", "mfe-header"), this.loader("@tractor-store/explore", "mfe-footer"), this.loader("@tractor-store/explore", "mfe-recommendations"); }
    skus = c(() => this.cart.lineItems().map(i => i.sku));
    variantsResource = this.variantHttp.getBySkus(this.skus);
    isLoading = this.variantsResource.isLoading;
    lineItems = c(() => { let i = this.variantsResource.value() ?? []; if (i.length === 0)
        return []; let a = new Map(i.map(n => [n.sku, n])); return this.cart.lineItems().reduce((n, { sku: o, quantity: s }) => { let m = a.get(o); return m && n.push({ id: m.id, name: m.name, sku: m.sku, image: m.image, quantity: s, total: m.price * s }), n; }, []); });
    total = c(() => this.lineItems().reduce((i, a) => i + a.total, 0));
    skusCsv = c(() => this.lineItems().map(i => i.sku).join(","));
    static \u0275fac = function (a) { return new (a || r); };
    static \u0275cmp = t.\u0275\u0275defineComponent({ type: r, selectors: [["app-cart"]], hostAttrs: ["data-boundary-page", "checkout"], decls: 17, vars: 4, consts: [[1, "c_CartPage"], ["role", "list", 1, "c_CartPage__lineItems"], [3, "item"], [1, "c_CartPage__total"], [1, "c_CartPage__buttons"], ["variant", "primary", 3, "appNavigateTo"], ["variant", "secondary", 3, "appNavigateTo"]], template: function (a, n) { a & 1 && (t.\u0275\u0275element(0, "mfe-header"), t.\u0275\u0275elementStart(1, "main", 0)(2, "h2"), t.\u0275\u0275text(3, "Basket"), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(4, "ul", 1), t.\u0275\u0275repeaterCreate(5, P, 1, 1, "app-line-item", 2, S), t.\u0275\u0275elementEnd(), t.\u0275\u0275element(7, "hr"), t.\u0275\u0275elementStart(8, "p", 3), t.\u0275\u0275text(9), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(10, "div", 4)(11, "ts-button", 5), t.\u0275\u0275text(12, "Checkout"), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(13, "ts-button", 6), t.\u0275\u0275text(14, "Continue Shopping"), t.\u0275\u0275elementEnd()(), t.\u0275\u0275element(15, "mfe-recommendations"), t.\u0275\u0275elementEnd(), t.\u0275\u0275element(16, "mfe-footer")), a & 2 && (t.\u0275\u0275advance(5), t.\u0275\u0275repeater(n.lineItems()), t.\u0275\u0275advance(4), t.\u0275\u0275textInterpolate1("Total: ", n.total(), " \xD8"), t.\u0275\u0275advance(2), t.\u0275\u0275property("appNavigateTo", "checkout.checkout"), t.\u0275\u0275advance(2), t.\u0275\u0275property("appNavigateTo", "explore.home"), t.\u0275\u0275advance(2), t.\u0275\u0275attribute("skus", n.skusCsv())); }, dependencies: [w, p], styles: [`:host{display:block}.c_CartPage{margin:0 auto;max-width:calc(1000px + var(--outer-space) * 2);padding:0 var(--outer-space)}.c_CartPage__lineItems{list-style:none;padding:0}.c_CartPage hr{border:0;height:2px;background-color:#000}.c_CartPage__total{margin:2rem 0 3rem;text-align:right;font-weight:700}.c_CartPage__buttons{display:flex;flex-direction:row-reverse;flex-wrap:wrap;justify-content:space-between;margin-bottom:4rem;gap:2rem}.c_CartPage__buttons>*{flex:0}
`], encapsulation: 3, changeDetection: 0 });
};
var C = "mfe-cart";
function ee(r, i) { return v(this, null, function* () { let a = yield _(r, i); customElements.get(C) || customElements.define(C, E(d, { injector: a })); }); }
export { ee as bootstrap };
