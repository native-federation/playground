import { a as u } from "@nf-internal/chunk-HAURFVXL";
import { a as f } from "@nf-internal/chunk-DDWWMX3L";
import { c as p } from "@nf-internal/chunk-SA4XMAC3";
import { c as l } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as V } from "@angular/elements";
import { input as D } from "@angular/core";
import { computed as C, effect as g, inject as s, input as y, signal as v } from "@angular/core";
import { NonNullableFormBuilder as T, ReactiveFormsModule as k, Validators as b } from "@angular/forms";
import { NavigateToDirective as A } from "@ng-internal/navigation";
import { ButtonComponent as h } from "@ng-internal/ui";
import * as t from "@angular/core";
import * as i from "@angular/forms";
function S(e, n) { if (e & 1 && (t.\u0275\u0275elementStart(0, "p", 5), t.\u0275\u0275text(1), t.\u0275\u0275elementEnd()), e & 2) {
    let o = t.\u0275\u0275nextContext();
    t.\u0275\u0275advance(), t.\u0275\u0275textInterpolate1(" ", o.inventory, " in stock, free shipping ");
} }
function x(e, n) { e & 1 && (t.\u0275\u0275elementStart(0, "p", 6), t.\u0275\u0275text(1, "out of stock"), t.\u0275\u0275elementEnd()); }
function E(e, n) { if (e & 1) {
    let o = t.\u0275\u0275getCurrentView();
    t.\u0275\u0275elementStart(0, "form", 2), t.\u0275\u0275listener("ngSubmit", function () { t.\u0275\u0275restoreView(o); let d = t.\u0275\u0275nextContext(); return t.\u0275\u0275resetView(d.onSubmit()); }), t.\u0275\u0275element(1, "input", 3), t.\u0275\u0275elementStart(2, "div", 4)(3, "p"), t.\u0275\u0275text(4), t.\u0275\u0275elementEnd(), t.\u0275\u0275conditionalCreate(5, S, 2, 1, "p", 5)(6, x, 2, 0, "p", 6), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(7, "ts-button", 7), t.\u0275\u0275text(8, " add to basket "), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(9, "div", 8)(10, "p"), t.\u0275\u0275text(11, "Tractor was added."), t.\u0275\u0275elementEnd(), t.\u0275\u0275elementStart(12, "a", 9), t.\u0275\u0275text(13, "View in basket."), t.\u0275\u0275elementEnd()()();
} if (e & 2) {
    let o = n, r = t.\u0275\u0275nextContext();
    t.\u0275\u0275property("formGroup", r.form), t.\u0275\u0275advance(4), t.\u0275\u0275textInterpolate1("", o.price, " \xD8"), t.\u0275\u0275advance(), t.\u0275\u0275conditional(o.inventory > 0 ? 5 : 6), t.\u0275\u0275advance(2), t.\u0275\u0275property("disabled", r.outOfStock()), t.\u0275\u0275advance(2), t.\u0275\u0275classProp("c_AddToCart__confirmed--hidden", !r.confirmed()), t.\u0275\u0275advance(3), t.\u0275\u0275property("appNavigateTo", "checkout.cart");
} }
function N(e, n) { e & 1 && (t.\u0275\u0275elementStart(0, "p", 1), t.\u0275\u0275text(1, "Loading\u2026"), t.\u0275\u0275elementEnd()); }
var c = class e {
    cart = s(f);
    variantHttp = s(u);
    fb = s(T);
    sku = y.required();
    form = this.fb.group({ sku: this.fb.control("", b.required) });
    variantResource = this.variantHttp.getBySku(this.sku);
    variant = this.variantResource.value;
    isLoading = this.variantResource.isLoading;
    outOfStock = C(() => (this.variant()?.inventory ?? 0) === 0);
    confirmed = v(!1);
    constructor() { g(() => this.form.controls.sku.setValue(this.sku())); }
    onSubmit() { if (this.outOfStock() || this.form.invalid)
        return; let { sku: n } = this.form.getRawValue(); this.cart.add(n), this.confirmed.set(!0); }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275cmp = t.\u0275\u0275defineComponent({ type: e, selectors: [["app-add-to-cart"]], hostAttrs: ["data-boundary", "checkout"], inputs: { sku: [1, "sku"] }, decls: 2, vars: 1, consts: [[1, "c_AddToCart", 3, "formGroup"], ["aria-live", "polite", 1, "c_AddToCart__loading"], [1, "c_AddToCart", 3, "ngSubmit", "formGroup"], ["type", "hidden", "formControlName", "sku"], [1, "c_AddToCart__information"], [1, "c_AddToCart__stock", "c_AddToCart__stock--ok"], [1, "c_AddToCart__stock", "c_AddToCart__stock--empty"], ["type", "submit", "variant", "primary", "extraClass", "c_AddToCart__button", 3, "disabled"], ["aria-live", "polite", 1, "c_AddToCart__confirmed"], [1, "c_AddToCart__link", 3, "appNavigateTo"]], template: function (o, r) { if (o & 1 && t.\u0275\u0275conditionalCreate(0, E, 14, 7, "form", 0)(1, N, 2, 0, "p", 1), o & 2) {
            let d;
            t.\u0275\u0275conditional((d = r.variant()) ? 0 : r.isLoading() ? 1 : -1, d);
        } }, dependencies: [h, A, k, i.\u0275NgNoValidate, i.DefaultValueAccessor, i.NgControlStatus, i.NgControlStatusGroup, i.FormGroupDirective, i.FormControlName], styles: [`:host{display:block;padding:1rem;margin:0 -1rem 1rem}.c_AddToCart__information{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.c_AddToCart__stock{display:block}.c_AddToCart__stock--ok{color:green}.c_AddToCart__stock--empty{color:red}.c_AddToCart__confirmed{display:flex;align-items:baseline;gap:.75ch}.c_AddToCart__confirmed a{color:inherit}.c_AddToCart__confirmed--hidden{visibility:hidden}
`], encapsulation: 3, changeDetection: 0 });
};
import * as a from "@angular/core";
function w(e, n) { e & 1 && a.\u0275\u0275element(0, "app-add-to-cart", 0), e & 2 && a.\u0275\u0275property("sku", n); }
var m = class e {
    sku = D();
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275cmp = a.\u0275\u0275defineComponent({ type: e, selectors: [["app-add-to-cart-element"]], hostAttrs: [2, "display", "contents"], inputs: { sku: [1, "sku"] }, decls: 1, vars: 1, consts: [[3, "sku"]], template: function (o, r) { if (o & 1 && a.\u0275\u0275conditionalCreate(0, w, 1, 1, "app-add-to-cart", 0), o & 2) {
            let d;
            a.\u0275\u0275conditional((d = r.sku()) ? 0 : -1, d);
        } }, dependencies: [c], encapsulation: 2, changeDetection: 0 });
};
var _ = "mfe-add-to-cart";
function X(e, n) { return l(this, null, function* () { let o = yield p(e, n); customElements.get(_) || customElements.define(_, V(m, { injector: o })); }); }
export { X as bootstrap };
