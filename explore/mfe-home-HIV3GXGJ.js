import { a as l, b as d, c as g } from "@nf-internal/chunk-2TRNGCRW";
import { a as m, b as c, c as p } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as H } from "@angular/elements";
import { computed as h, inject as s } from "@angular/core";
import { NavigateToDirective as T } from "@ng-internal/navigation";
import { resource as v } from "@angular/core";
function f(o) { return o.map(t => ({ title: t.title, image: t.image, link: t.link })); }
import * as u from "@angular/core";
var _ = [{ title: "Classic Tractors", image: "/cdn/img/scene/[size]/classics.webp", link: { intent: "explore.products.category", params: { category: "classic" } } }, { title: "Autonomous Tractors", image: "/cdn/img/scene/[size]/autonomous.webp", link: { intent: "explore.products.category", params: { category: "autonomous" } } }], a = class o {
    list() { return v({ loader: () => Promise.resolve(f(_)) }); }
    static \u0275fac = function (r) { return new (r || o); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: o, factory: o.\u0275fac, providedIn: "root" });
};
import * as e from "@angular/core";
var x = () => ({}), P = (o, t) => t.title;
function k(o, t) { if (o & 1 && (e.\u0275\u0275elementStart(0, "a", 1), e.\u0275\u0275element(1, "img", 4), e.\u0275\u0275text(2), e.\u0275\u0275elementEnd()), o & 2) {
    let r = t.$implicit;
    e.\u0275\u0275property("appNavigateTo", r.link.intent)("navPayload", r.link.params ?? e.\u0275\u0275pureFunction0(5, x)), e.\u0275\u0275advance(), e.\u0275\u0275property("src", r.src, e.\u0275\u0275sanitizeUrl)("srcset", r.srcset), e.\u0275\u0275advance(), e.\u0275\u0275textInterpolate1(" ", r.title, " ");
} }
var i = class o {
    teaserHttp = s(a);
    image = s(g);
    loader = s(l);
    constructor() { this.loader("@tractor-store/explore", "mfe-header"), this.loader("@tractor-store/explore", "mfe-footer"), this.loader("@tractor-store/explore", "mfe-recommendations"); }
    teaserResource = this.teaserHttp.list();
    teasers = h(() => (this.teaserResource.value() ?? []).map(t => c(m({}, t), { src: this.image.imgSrc(t.image, 500), srcset: this.image.imgSrcset(t.image, [500, 1e3]) })));
    seedSkus = ["CL-01-GY", "AU-07-MT"];
    static \u0275fac = function (r) { return new (r || o); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: o, selectors: [["app-home"]], hostAttrs: ["data-boundary-page", "explore"], decls: 7, vars: 1, consts: [[1, "e_HomePage"], [1, "e_HomePage__categoryLink", 3, "appNavigateTo", "navPayload"], [1, "e_HomePage__recommendations"], [3, "skus"], ["sizes", "100vw, (min-width: 500px) 50vw", "alt", "", 3, "src", "srcset"]], template: function (r, n) { r & 1 && (e.\u0275\u0275element(0, "mfe-header"), e.\u0275\u0275elementStart(1, "main", 0), e.\u0275\u0275repeaterCreate(2, k, 3, 6, "a", 1, P), e.\u0275\u0275elementStart(4, "div", 2), e.\u0275\u0275element(5, "mfe-recommendations", 3), e.\u0275\u0275elementEnd()(), e.\u0275\u0275element(6, "mfe-footer")), r & 2 && (e.\u0275\u0275advance(2), e.\u0275\u0275repeater(n.teasers()), e.\u0275\u0275advance(3), e.\u0275\u0275property("skus", n.seedSkus)); }, dependencies: [T], styles: [`:host{display:block}@media(min-width:500px){.e_HomePage{grid-template-columns:1fr 1fr;display:grid;gap:1rem}}.e_HomePage{max-width:calc(1000px + var(--outer-space) * 2);padding:0 var(--outer-space);margin:3rem auto 0}.e_HomePage__categoryLink{display:block;position:relative;margin-bottom:2rem;color:inherit;text-align:center;text-decoration:none}.e_HomePage__categoryLink:hover,.e_HomePage__categoryLink:focus{text-decoration:underline}.e_HomePage__categoryLink img{width:100%;aspect-ratio:1000/560;margin-bottom:.75rem}.e_HomePage__recommendations{grid-column:span 2}
`], encapsulation: 3, changeDetection: 0 });
};
var y = "mfe-home";
function V(o, t) { return p(this, null, function* () { let r = yield d(o, t); customElements.get(y) || customElements.define(y, H(i, { injector: r })); }); }
export { V as bootstrap };
