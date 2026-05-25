import { a as C, b as v, c as P } from "@nf-internal/chunk-2TRNGCRW";
import { c as f } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as $ } from "@angular/elements";
import { computed as c, inject as x, input as I } from "@angular/core";
import { param as G } from "@ng-internal/url";
import { resource as h } from "@angular/core";
function _(e) { return { id: e.id, name: e.name, image: e.image, startPrice: e.startPrice, link: e.link }; }
function u(e) { return { key: e.key, name: e.name, products: e.products.map(_) }; }
function b(e) { return e.map(u); }
var g = [{ key: "classic", name: "Classics", products: [{ name: "Heritage Workhorse", id: "CL-01", image: "/cdn/img/product/[size]/CL-01-GR.webp", startPrice: 5700, link: { intent: "decide.product", params: { id: "CL-01" } } }, { name: "Falcon Crest Farm", id: "CL-02", image: "/cdn/img/product/[size]/CL-02-BL.webp", startPrice: 2600, link: { intent: "decide.product", params: { id: "CL-02" } } }, { name: "Falcon Crest Work", id: "CL-03", image: "/cdn/img/product/[size]/CL-03-GR.webp", startPrice: 2300, link: { intent: "decide.product", params: { id: "CL-03" } } }, { name: "Broadfield Majestic", id: "CL-04", image: "/cdn/img/product/[size]/CL-04-BL.webp", startPrice: 2200, link: { intent: "decide.product", params: { id: "CL-04" } } }, { name: "Countryside Commander", id: "CL-05", image: "/cdn/img/product/[size]/CL-05-PT.webp", startPrice: 2700, link: { intent: "decide.product", params: { id: "CL-05" } } }, { name: "Danamark Steadfast", id: "CL-06", image: "/cdn/img/product/[size]/CL-06-MT.webp", startPrice: 2800, link: { intent: "decide.product", params: { id: "CL-06" } } }, { name: "Greenland Rover", id: "CL-07", image: "/cdn/img/product/[size]/CL-07-GR.webp", startPrice: 2900, link: { intent: "decide.product", params: { id: "CL-07" } } }, { name: "Holland Hamster", id: "CL-08", image: "/cdn/img/product/[size]/CL-08-GR.webp", startPrice: 7750, link: { intent: "decide.product", params: { id: "CL-08" } } }, { name: "TerraFirma Veneto", id: "CL-09", image: "/cdn/img/product/[size]/CL-09-BL.webp", startPrice: 2950, link: { intent: "decide.product", params: { id: "CL-09" } } }, { name: "Global Gallant", id: "CL-10", image: "/cdn/img/product/[size]/CL-10-SD.webp", startPrice: 2600, link: { intent: "decide.product", params: { id: "CL-10" } } }, { name: "Scandinavia Sower", id: "CL-11", image: "/cdn/img/product/[size]/CL-11-SK.webp", startPrice: 3100, link: { intent: "decide.product", params: { id: "CL-11" } } }, { name: "Celerity Cruiser", id: "CL-12", image: "/cdn/img/product/[size]/CL-12-BL.webp", startPrice: 3200, link: { intent: "decide.product", params: { id: "CL-12" } } }, { name: "Rapid Racer", id: "CL-13", image: "/cdn/img/product/[size]/CL-13-BL.webp", startPrice: 7500, link: { intent: "decide.product", params: { id: "CL-13" } } }, { name: "Caribbean Cruiser", id: "CL-14", image: "/cdn/img/product/[size]/CL-14-GR.webp", startPrice: 2300, link: { intent: "decide.product", params: { id: "CL-14" } } }, { name: "Fieldmaster Classic", id: "CL-15", image: "/cdn/img/product/[size]/CL-15-PI.webp", startPrice: 6200, link: { intent: "decide.product", params: { id: "CL-15" } } }] }, { key: "autonomous", name: "Autonomous", products: [{ name: "TerraFirma AutoCultivator T-300", id: "AU-01", image: "/cdn/img/product/[size]/AU-01-SI.webp", startPrice: 1e3, link: { intent: "decide.product", params: { id: "AU-01" } } }, { name: "SmartFarm Titan", id: "AU-02", image: "/cdn/img/product/[size]/AU-02-OG.webp", startPrice: 4e3, link: { intent: "decide.product", params: { id: "AU-02" } } }, { name: "FutureHarvest Navigator", id: "AU-03", image: "/cdn/img/product/[size]/AU-03-TQ.webp", startPrice: 1600, link: { intent: "decide.product", params: { id: "AU-03" } } }, { name: "Sapphire Sunworker 460R", id: "AU-04", image: "/cdn/img/product/[size]/AU-04-RD.webp", startPrice: 8500, link: { intent: "decide.product", params: { id: "AU-04" } } }, { name: "EcoGrow Crop Commander", id: "AU-05", image: "/cdn/img/product/[size]/AU-05-ZH.webp", startPrice: 3400, link: { intent: "decide.product", params: { id: "AU-05" } } }, { name: "FarmFleet Sovereign", id: "AU-06", image: "/cdn/img/product/[size]/AU-06-CZ.webp", startPrice: 2100, link: { intent: "decide.product", params: { id: "AU-06" } } }, { name: "Verde Voyager", id: "AU-07", image: "/cdn/img/product/[size]/AU-07-MT.webp", startPrice: 4e3, link: { intent: "decide.product", params: { id: "AU-07" } } }, { name: "Field Pioneer", id: "AU-08", image: "/cdn/img/product/[size]/AU-08-WH.webp", startPrice: 4500, link: { intent: "decide.product", params: { id: "AU-08" } } }] }];
import * as L from "@angular/core";
var d = class e {
    list() { return h({ loader: () => Promise.resolve(b(g)) }); }
    byKey(a) { return h({ params: () => a() ?? void 0, loader: ({ params: r }) => { let n = g.find(l => l.key === r); return Promise.resolve(n ? u(n) : void 0); } }); }
    static \u0275fac = function (r) { return new (r || e); };
    static \u0275prov = L.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
};
import { computed as y, inject as F, input as S } from "@angular/core";
import { NavigateToDirective as w } from "@ng-internal/navigation";
function k(e) { return `${e},00 \xD8`; }
import * as o from "@angular/core";
var D = () => ({}), s = class e {
    image = F(P);
    product = S.required();
    imgSrc = y(() => this.image.imgSrc(this.product().image, 200));
    imgSrcset = y(() => this.image.imgSrcset(this.product().image, [200, 400, 800]));
    price = y(() => k(this.product().startPrice));
    static \u0275fac = function (r) { return new (r || e); };
    static \u0275cmp = o.\u0275\u0275defineComponent({ type: e, selectors: [["app-product-tile"]], inputs: { product: [1, "product"] }, decls: 7, vars: 7, consts: [[1, "e_Product"], [1, "e_Product_link", 3, "appNavigateTo", "navPayload"], ["sizes", "300px", "width", "200", "height", "200", "alt", "", 1, "e_Product_image", 3, "src", "srcset"], [1, "e_Product_name"], [1, "e_Product_price"]], template: function (r, n) { r & 1 && (o.\u0275\u0275elementStart(0, "li", 0)(1, "a", 1), o.\u0275\u0275element(2, "img", 2), o.\u0275\u0275elementStart(3, "span", 3), o.\u0275\u0275text(4), o.\u0275\u0275elementEnd(), o.\u0275\u0275elementStart(5, "span", 4), o.\u0275\u0275text(6), o.\u0275\u0275elementEnd()()()), r & 2 && (o.\u0275\u0275advance(), o.\u0275\u0275property("appNavigateTo", n.product().link.intent)("navPayload", n.product().link.params ?? o.\u0275\u0275pureFunction0(6, D)), o.\u0275\u0275advance(), o.\u0275\u0275property("src", n.imgSrc(), o.\u0275\u0275sanitizeUrl)("srcset", n.imgSrcset()), o.\u0275\u0275advance(2), o.\u0275\u0275textInterpolate(n.product().name), o.\u0275\u0275advance(2), o.\u0275\u0275textInterpolate(n.price())); }, dependencies: [w], styles: [`:host{display:contents}.e_Product{margin:0}.e_Product_link{text-decoration:none;color:#000}.e_Product_image{width:100%;height:auto;aspect-ratio:1/1;display:block}.e_Product_name{margin:12px 0 8px;color:#000;text-align:center;display:block}.e_Product_price{margin:8px 0;color:#000;text-align:center;display:block}
`], encapsulation: 3, changeDetection: 0 });
};
import { input as A } from "@angular/core";
import { NavigateToDirective as R } from "@ng-internal/navigation";
import * as t from "@angular/core";
var T = () => ({}), N = (e, a) => a.name;
function U(e, a) { if (e & 1 && (t.\u0275\u0275elementStart(0, "li", 1), t.\u0275\u0275text(1), t.\u0275\u0275elementEnd()), e & 2) {
    let r = t.\u0275\u0275nextContext().$implicit;
    t.\u0275\u0275advance(), t.\u0275\u0275textInterpolate(r.name);
} }
function z(e, a) { if (e & 1 && (t.\u0275\u0275elementStart(0, "li")(1, "a", 2), t.\u0275\u0275text(2), t.\u0275\u0275elementEnd()()), e & 2) {
    let r = t.\u0275\u0275nextContext().$implicit;
    t.\u0275\u0275advance(), t.\u0275\u0275property("appNavigateTo", r.link.intent)("navPayload", r.link.params ?? t.\u0275\u0275pureFunction0(3, T)), t.\u0275\u0275advance(), t.\u0275\u0275textInterpolate(r.name);
} }
function E(e, a) { if (e & 1 && t.\u0275\u0275conditionalCreate(0, U, 2, 1, "li", 1)(1, z, 3, 4, "li"), e & 2) {
    let r = a.$implicit;
    t.\u0275\u0275conditional(r.active ? 0 : 1);
} }
var p = class e {
    filters = A.required();
    static \u0275fac = function (r) { return new (r || e); };
    static \u0275cmp = t.\u0275\u0275defineComponent({ type: e, selectors: [["app-filter"]], inputs: { filters: [1, "filters"] }, decls: 5, vars: 0, consts: [[1, "e_Filter"], [1, "e_Filter__filter--active"], [3, "appNavigateTo", "navPayload"]], template: function (r, n) { r & 1 && (t.\u0275\u0275elementStart(0, "div", 0), t.\u0275\u0275text(1, " Filter: "), t.\u0275\u0275elementStart(2, "ul"), t.\u0275\u0275repeaterCreate(3, E, 2, 1, null, null, N), t.\u0275\u0275elementEnd()()), r & 2 && (t.\u0275\u0275advance(3), t.\u0275\u0275repeater(n.filters())); }, dependencies: [R], styles: [`:host{display:contents}.e_Filter{display:flex;justify-content:flex-end;margin-bottom:var(--outer-space);gap:1rem}.e_Filter ul{display:flex;list-style:none;gap:.8rem;padding:0;margin:0}.e_Filter li{position:relative}.e_Filter a{color:inherit;text-decoration:none}.e_Filter__filter--active:before,.e_Filter a:hover:before{content:"";display:block;width:100%;height:2px;bottom:-2px;position:absolute}.e_Filter__filter--active:before{background-color:#000}.e_Filter a:hover:before{background-color:#ff5a55}
`], encapsulation: 3, changeDetection: 0 });
};
import * as i from "@angular/core";
var j = (e, a) => a.id;
function H(e, a) { if (e & 1 && i.\u0275\u0275element(0, "app-product-tile", 4), e & 2) {
    let r = a.$implicit;
    i.\u0275\u0275property("product", r);
} }
var m = class e {
    categoryHttp = x(d);
    loader = x(C);
    constructor() { this.loader("@tractor-store/explore", "mfe-header"), this.loader("@tractor-store/explore", "mfe-footer"); }
    routeParams = I({});
    category = c(() => G(this.routeParams(), "category"));
    categoriesResource = this.categoryHttp.list();
    categories = c(() => this.categoriesResource.value() ?? []);
    activeCategory = c(() => { let a = this.category(); return a ? this.categories().find(r => r.key === a) : void 0; });
    title = c(() => this.activeCategory()?.name ?? "All Machines");
    products = c(() => { let a = this.activeCategory(); return (a ? [...a.products] : this.categories().flatMap(n => n.products)).sort((n, l) => l.startPrice - n.startPrice); });
    filters = c(() => { let a = this.category(), r = this.activeCategory(); return [{ link: { intent: "explore.products" }, name: "All", active: !r }, ...this.categories().map(n => ({ link: { intent: "explore.products.category", params: { category: n.key } }, name: n.name, active: n.key === a }))]; });
    static \u0275fac = function (r) { return new (r || e); };
    static \u0275cmp = i.\u0275\u0275defineComponent({ type: e, selectors: [["app-category"]], hostAttrs: ["data-boundary-page", "explore"], inputs: { routeParams: [1, "routeParams"] }, decls: 12, vars: 3, consts: [[1, "e_CategoryPage"], [1, "e_CategoryPage__subline"], [3, "filters"], [1, "e_CategoryPage_list"], [3, "product"]], template: function (r, n) { r & 1 && (i.\u0275\u0275element(0, "mfe-header"), i.\u0275\u0275elementStart(1, "main", 0)(2, "h2"), i.\u0275\u0275text(3), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(4, "div", 1)(5, "p"), i.\u0275\u0275text(6), i.\u0275\u0275elementEnd(), i.\u0275\u0275element(7, "app-filter", 2), i.\u0275\u0275elementEnd(), i.\u0275\u0275elementStart(8, "ul", 3), i.\u0275\u0275repeaterCreate(9, H, 1, 1, "app-product-tile", 4, j), i.\u0275\u0275elementEnd()(), i.\u0275\u0275element(11, "mfe-footer")), r & 2 && (i.\u0275\u0275advance(3), i.\u0275\u0275textInterpolate(n.title()), i.\u0275\u0275advance(3), i.\u0275\u0275textInterpolate1("", n.products().length, " products"), i.\u0275\u0275advance(), i.\u0275\u0275property("filters", n.filters()), i.\u0275\u0275advance(2), i.\u0275\u0275repeater(n.products())); }, dependencies: [s, p], styles: [`:host{display:block}.e_CategoryPage{max-width:calc(1000px + var(--outer-space) * 2);padding:0 var(--outer-space);margin:0 auto}.e_CategoryPage_list{display:grid;grid-gap:40px;padding:0;list-style-type:none}@media(max-width:499px){.e_CategoryPage_list{grid-template-columns:1fr}}@media(min-width:500px)and (max-width:999px){.e_CategoryPage_list{grid-template-columns:1fr 1fr}}@media(min-width:1000px){.e_CategoryPage_list{grid-template-columns:1fr 1fr 1fr}}.e_CategoryPage__subline{display:flex;flex-wrap:wrap;gap:1em;justify-content:space-between}.e_CategoryPage__subline *{margin:0;line-height:1.5}
`], encapsulation: 3, changeDetection: 0 });
};
var M = "mfe-category";
function De(e, a) { return f(this, null, function* () { let r = yield v(e, a); customElements.get(M) || customElements.define(M, $(m, { injector: r })); }); }
export { De as bootstrap };
