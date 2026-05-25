import { a as p } from "@nf-internal/chunk-OZQ6JKLG";
import { b as d, c as m } from "@nf-internal/chunk-2TRNGCRW";
import { a as l, b as c, c as s } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as b } from "@angular/elements";
import { computed as _, inject as u, signal as f, viewChild as k } from "@angular/core";
import { storeSelected as y } from "@ng-internal/event-bus";
import { ButtonComponent as v } from "@ng-internal/ui";
import * as e from "@angular/core";
var x = ["dialog"], h = (r, i) => i.id;
function w(r, i) { if (r & 1 && (e.\u0275\u0275elementStart(0, "div", 3), e.\u0275\u0275element(1, "img", 9), e.\u0275\u0275elementStart(2, "p", 10), e.\u0275\u0275text(3), e.\u0275\u0275element(4, "br"), e.\u0275\u0275text(5), e.\u0275\u0275element(6, "br"), e.\u0275\u0275text(7), e.\u0275\u0275elementEnd()()), r & 2) {
    let t = i;
    e.\u0275\u0275advance(), e.\u0275\u0275property("src", t.src, e.\u0275\u0275sanitizeUrl)("srcset", t.srcset), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", t.name), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", t.street), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", t.city, " ");
} }
function P(r, i) { if (r & 1) {
    let t = e.\u0275\u0275getCurrentView();
    e.\u0275\u0275elementStart(0, "li", 8)(1, "div", 11), e.\u0275\u0275element(2, "img", 9), e.\u0275\u0275elementStart(3, "p", 10), e.\u0275\u0275text(4), e.\u0275\u0275element(5, "br"), e.\u0275\u0275text(6), e.\u0275\u0275element(7, "br"), e.\u0275\u0275text(8), e.\u0275\u0275elementEnd()(), e.\u0275\u0275elementStart(9, "ts-button", 12), e.\u0275\u0275listener("click", function () { let n = e.\u0275\u0275restoreView(t).$implicit, g = e.\u0275\u0275nextContext(); return e.\u0275\u0275resetView(g.select(n)); }), e.\u0275\u0275text(10, " select "), e.\u0275\u0275elementEnd()();
} if (r & 2) {
    let t = i.$implicit;
    e.\u0275\u0275advance(2), e.\u0275\u0275property("src", t.src, e.\u0275\u0275sanitizeUrl)("srcset", t.srcset), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", t.name), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", t.street), e.\u0275\u0275advance(2), e.\u0275\u0275textInterpolate1(" ", t.city, " "), e.\u0275\u0275advance(), e.\u0275\u0275property("dataId", t.id);
} }
var a = class r {
    storeHttp = u(p);
    image = u(m);
    selected = f(null);
    storesResource = this.storeHttp.list();
    stores = _(() => (this.storesResource.value() ?? []).map(i => this.toView(i)));
    selectedView = _(() => { let i = this.selected(); return i ? this.toView(i) : null; });
    dialogRef = k.required("dialog");
    open() { let i = this.dialogRef().nativeElement; typeof i.showModal == "function" && i.showModal(); }
    select(i) { this.selected.set(i); let t = this.dialogRef().nativeElement; typeof t.close == "function" && t.close(), y.emit({ id: i.id }); }
    toView(i) { return c(l({}, i), { src: this.image.imgSrc(i.image, 200), srcset: this.image.imgSrcset(i.image, [200, 400]) }); }
    static \u0275fac = function (t) { return new (t || r); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: r, selectors: [["app-store-picker"]], viewQuery: function (t, o) { t & 1 && e.\u0275\u0275viewQuerySignal(o.dialogRef, x, 5), t & 2 && e.\u0275\u0275queryAdvance(); }, decls: 13, vars: 1, consts: [["dialog", ""], [1, "e_StorePicker"], ["data-boundary", "explore", 1, "e_StorePicker_control"], [1, "e_StorePicker_selected"], ["extraClass", "e_StorePicker_choose", "type", "button", 3, "click"], ["data-boundary", "explore", 1, "e_StorePicker_dialog"], [1, "e_StorePicker_wrapper"], [1, "e_StorePicker_list"], [1, "e_StorePicker_entry"], ["width", "200", "height", "200", "alt", "", 1, "e_StorePicker_image", 3, "src", "srcset"], [1, "e_StorePicker_address"], [1, "e_StorePicker_content"], ["extraClass", "e_StorePicker_select", "type", "button", 3, "click", "dataId"]], template: function (t, o) { if (t & 1 && (e.\u0275\u0275elementStart(0, "div", 1)(1, "div", 2), e.\u0275\u0275conditionalCreate(2, w, 8, 5, "div", 3), e.\u0275\u0275elementStart(3, "ts-button", 4), e.\u0275\u0275listener("click", function () { return o.open(); }), e.\u0275\u0275text(4, " choose a store "), e.\u0275\u0275elementEnd()(), e.\u0275\u0275elementStart(5, "dialog", 5, 0)(7, "div", 6)(8, "h2"), e.\u0275\u0275text(9, "Stores"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(10, "ul", 7), e.\u0275\u0275repeaterCreate(11, P, 11, 6, "li", 8, h), e.\u0275\u0275elementEnd()()()()), t & 2) {
            let n;
            e.\u0275\u0275advance(2), e.\u0275\u0275conditional((n = o.selectedView()) ? 2 : -1, n), e.\u0275\u0275advance(9), e.\u0275\u0275repeater(o.stores());
        } }, dependencies: [v], styles: [`:host{display:block}.e_StorePicker_control{padding:2rem;margin:0 0 0 -1rem;display:flex;flex-wrap:wrap;gap:1rem;max-width:500px}.e_StorePicker_dialog::backdrop{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.e_StorePicker_dialog{border:none;padding:1rem 2rem;max-height:90vh;border-radius:1rem;overflow:visible}.e_StorePicker_wrapper{display:block;max-height:calc(90vh - 2rem);max-width:100%;padding:0 5px;overflow:scroll}@media(max-width:499px){.e_StorePicker_list{grid-template-columns:1fr;gap:1rem}}@media(min-width:500px)and (max-width:999px){.e_StorePicker_list{grid-template-columns:repeat(2,1fr);gap:2rem}}@media(min-width:1000px){.e_StorePicker_list{grid-template-columns:repeat(4,1fr);gap:3rem}}.e_StorePicker_list{display:grid;list-style-type:none;padding:0}.e_StorePicker_content{position:relative}.e_StorePicker_image{display:block;max-width:200px;width:100%;height:auto}.e_StorePicker_address{margin:1rem 0}.e_StorePicker_selected{display:flex;flex-wrap:wrap;gap:1rem}.e_StorePicker_selected:empty{display:none}
`], encapsulation: 3, changeDetection: 0 });
};
var S = "mfe-store-picker";
function $(r, i) { return s(this, null, function* () { let t = yield d(r, i); customElements.get(S) || customElements.define(S, b(a, { injector: t })); }); }
export { $ as bootstrap };
