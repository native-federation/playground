import { a as d } from "@nf-internal/chunk-OZQ6JKLG";
import { a as p, b as l, c } from "@nf-internal/chunk-2TRNGCRW";
import { c as m } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as E } from "@angular/elements";
import { computed as h, inject as u } from "@angular/core";
import { computed as g, inject as S, input as y } from "@angular/core";
import * as e from "@angular/core";
var n = class r {
    image = S(c);
    store = y.required();
    imgSrc = g(() => this.image.imgSrc(this.store().image, 200));
    imgSrcset = g(() => this.image.imgSrcset(this.store().image, [200, 400]));
    static \u0275fac = function (o) { return new (o || r); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: r, selectors: [["app-store-tile"]], inputs: { store: [1, "store"] }, decls: 9, vars: 5, consts: [[1, "e_Store"], [1, "e_Store_content"], ["width", "200", "height", "200", "alt", "", 1, "e_Store_image", 3, "src", "srcset"], [1, "e_Store_address"]], template: function (o, s) { o & 1 && (e.\u0275\u0275domElementStart(0, "li", 0)(1, "div", 1), e.\u0275\u0275domElement(2, "img", 2), e.\u0275\u0275domElementStart(3, "p", 3), e.\u0275\u0275text(4), e.\u0275\u0275domElement(5, "br"), e.\u0275\u0275text(6), e.\u0275\u0275domElement(7, "br"), e.\u0275\u0275text(8), e.\u0275\u0275domElementEnd()()()), o & 2 && (e.\u0275\u0275advance(2), e.\u0275\u0275domProperty("src", s.imgSrc(), e.\u0275\u0275sanitizeUrl)("srcset", s.imgSrcset()), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", s.store().name), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", s.store().street), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", s.store().city, " ")); }, styles: [`:host{display:contents}.e_Store{margin:0}.e_Store_image{display:block;max-width:200px;width:100%;height:auto}.e_Store_address{margin:1rem 0}
`], encapsulation: 3, changeDetection: 0 });
};
import * as t from "@angular/core";
var v = (r, i) => i.id;
function _(r, i) { if (r & 1 && t.\u0275\u0275element(0, "app-store-tile", 2), r & 2) {
    let o = i.$implicit;
    t.\u0275\u0275property("store", o);
} }
var a = class r {
    storeHttp = u(d);
    storesResource = this.storeHttp.list();
    stores = h(() => this.storesResource.value() ?? []);
    loader = u(p);
    constructor() { this.loader("@tractor-store/explore", "mfe-header"), this.loader("@tractor-store/explore", "mfe-footer"); }
    static \u0275fac = function (o) { return new (o || r); };
    static \u0275cmp = t.\u0275\u0275defineComponent({ type: r, selectors: [["app-stores"]], hostAttrs: ["data-boundary-page", "explore"], decls: 10, vars: 0, consts: [[1, "e_StoresPage"], [1, "e_StoresPage_list"], [3, "store"]], template: function (o, s) { o & 1 && (t.\u0275\u0275element(0, "mfe-header"), t.\u0275\u0275elementStart(1, "main", 0)(2, "h2"), t.\u0275\u0275text(3, "Our Stores"), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(4, "p"), t.\u0275\u0275text(5, " Want to see our products in person? Visit one of our stores to see our products up close and talk to our experts. We have stores in the following locations: "), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(6, "ul", 1), t.\u0275\u0275repeaterCreate(7, _, 1, 1, "app-store-tile", 2, v), t.\u0275\u0275elementEnd()(), t.\u0275\u0275element(9, "mfe-footer")), o & 2 && (t.\u0275\u0275advance(7), t.\u0275\u0275repeater(s.stores())); }, dependencies: [n], styles: [`:host{display:block}.e_StoresPage{max-width:calc(1000px + var(--outer-space) * 2);padding:0 var(--outer-space);margin:0 auto}.e_StoresPage_list{list-style:none;padding:0;margin:5em 0 4em;display:flex;justify-content:space-between;gap:2em;flex-wrap:wrap}.e_StoresPage p{max-width:80ch}
`], encapsulation: 3, changeDetection: 0 });
};
var f = "mfe-stores";
function V(r, i) { return m(this, null, function* () { let o = yield l(r, i); customElements.get(f) || customElements.define(f, E(a, { injector: o })); }); }
export { V as bootstrap };
