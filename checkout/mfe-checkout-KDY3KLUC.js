import { a as _ } from "@nf-internal/chunk-IXVRQ3XI";
import { a as f } from "@nf-internal/chunk-DDWWMX3L";
import { b as d, c as u } from "@nf-internal/chunk-SA4XMAC3";
import { c as p } from "@nf-internal/chunk-2VMXMS7J";
import { createCustomElement as N } from "@angular/elements";
import { DestroyRef as y, inject as m, signal as v } from "@angular/core";
import { FormBuilder as k, ReactiveFormsModule as x, Validators as l } from "@angular/forms";
import { navigateTo as S, storeSelected as E } from "@ng-internal/event-bus";
import { ButtonComponent as D } from "@ng-internal/ui";
import { inject as C } from "@angular/core";
import { NavigateToDirective as b } from "@ng-internal/navigation";
import * as t from "@angular/core";
var c = class i {
    image = C(_);
    logoUrl = this.image.cdnUrl("/cdn/img/logo.svg");
    static \u0275fac = function (o) { return new (o || i); };
    static \u0275cmp = t.\u0275\u0275defineComponent({ type: i, selectors: [["app-compact-header"]], hostAttrs: ["role", "banner", 1, "c_CompactHeader"], decls: 3, vars: 2, consts: [[1, "c_CompactHeader__inner"], [1, "c_CompactHeader__link", 3, "appNavigateTo"], ["alt", "Micro Frontends - Tractor Store", 1, "c_CompactHeader__logo", 3, "src"]], template: function (o, n) { o & 1 && (t.\u0275\u0275elementStart(0, "div", 0)(1, "a", 1), t.\u0275\u0275element(2, "img", 2), t.\u0275\u0275elementEnd()()), o & 2 && (t.\u0275\u0275advance(), t.\u0275\u0275property("appNavigateTo", "explore.home"), t.\u0275\u0275advance(), t.\u0275\u0275property("src", n.logoUrl, t.\u0275\u0275sanitizeUrl)); }, dependencies: [b], styles: [`:host{height:80px;display:flex;margin:1rem 0 2rem;border-bottom:1px solid #eeebe2;align-items:center}.c_CompactHeader__inner{display:flex;max-width:calc(1000px + 2 * var(--outer-space));padding:0 var(--outer-space);margin:0 auto;align-items:center;flex:1}.c_CompactHeader__logo{display:block;width:175px;aspect-ratio:3.5}
`], encapsulation: 3, changeDetection: 0 });
};
import * as e from "@angular/core";
import * as a from "@angular/forms";
var s = class i {
    fb = m(k);
    cart = m(f);
    loader = m(d);
    constructor() { this.loader("@tractor-store/explore", "mfe-store-picker"), this.loader("@tractor-store/explore", "mfe-footer"); let r = E.on(({ id: o }) => this.applyStoreId(o)); m(y).onDestroy(r); }
    storeId = v("");
    form = this.fb.nonNullable.group({ firstname: ["", l.required], lastname: ["", l.required], storeId: [{ value: "", disabled: !1 }, l.required] });
    isReady() { let { firstname: r, lastname: o, storeId: n } = this.form.getRawValue(); return !!r && !!o && !!n; }
    onSubmit(r) { r.preventDefault(), this.isReady() && (this.cart.clear(), S.emit({ id: "checkout.thanks" })); }
    applyStoreId(r) { this.storeId.set(r), this.form.controls.storeId.setValue(r); }
    static \u0275fac = function (o) { return new (o || i); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: i, selectors: [["app-checkout"]], hostAttrs: ["data-boundary-page", "checkout"], decls: 30, vars: 3, consts: [[1, "c_Checkout"], [1, "c_Checkout__form", 3, "submit", "formGroup"], [1, "c_Checkout__name"], ["for", "c_firstname", 1, "c_Checkout__label"], ["type", "text", "id", "c_firstname", "formControlName", "firstname", "required", "", 1, "c_Checkout__input"], ["for", "c_lastname", 1, "c_Checkout__label"], ["type", "text", "id", "c_lastname", "formControlName", "lastname", "required", "", 1, "c_Checkout__input"], [1, "c_Checkout__store"], ["for", "c_storeId", 1, "c_Checkout__label"], ["type", "text", "id", "c_storeId", "formControlName", "storeId", "readonly", "", "required", "", 1, "c_Checkout__input"], [1, "c_Checkout__buttons"], ["type", "submit", "variant", "primary", 3, "disabled"], ["variant", "secondary", 3, "appNavigateTo"]], template: function (o, n) { o & 1 && (e.\u0275\u0275element(0, "app-compact-header"), e.\u0275\u0275elementStart(1, "main", 0)(2, "h2"), e.\u0275\u0275text(3, "Checkout"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(4, "form", 1), e.\u0275\u0275listener("submit", function (g) { return n.onSubmit(g); }), e.\u0275\u0275elementStart(5, "h3"), e.\u0275\u0275text(6, "Personal Data"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(7, "fieldset", 2)(8, "div")(9, "label", 3), e.\u0275\u0275text(10, "First name"), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(11, "input", 4), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(12, "div")(13, "label", 5), e.\u0275\u0275text(14, "Last name"), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(15, "input", 6), e.\u0275\u0275elementEnd()(), e.\u0275\u0275elementStart(16, "h3"), e.\u0275\u0275text(17, "Store Pickup"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(18, "fieldset")(19, "div", 7), e.\u0275\u0275element(20, "mfe-store-picker"), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(21, "label", 8), e.\u0275\u0275text(22, "Store ID"), e.\u0275\u0275elementEnd(), e.\u0275\u0275element(23, "input", 9), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(24, "div", 10)(25, "ts-button", 11), e.\u0275\u0275text(26, " place order "), e.\u0275\u0275elementEnd(), e.\u0275\u0275elementStart(27, "ts-button", 12), e.\u0275\u0275text(28, "back to cart"), e.\u0275\u0275elementEnd()()()(), e.\u0275\u0275element(29, "mfe-footer")), o & 2 && (e.\u0275\u0275advance(4), e.\u0275\u0275property("formGroup", n.form), e.\u0275\u0275advance(21), e.\u0275\u0275property("disabled", !n.isReady()), e.\u0275\u0275advance(2), e.\u0275\u0275property("appNavigateTo", "checkout.cart")); }, dependencies: [D, c, x, a.\u0275NgNoValidate, a.DefaultValueAccessor, a.NgControlStatus, a.NgControlStatusGroup, a.RequiredValidator, a.FormGroupDirective, a.FormControlName], styles: [`:host{display:block}.c_Checkout{margin:0 auto;max-width:calc(1000px + var(--outer-space) * 2);padding:0 var(--outer-space)}.c_Checkout fieldset{border:0;border-bottom:2px solid black;padding:0 0 2rem;margin:0}.c_Checkout__name{display:flex;gap:0 4rem;flex-wrap:wrap}.c_Checkout__buttons{margin:3rem 0 4rem;display:flex;flex-wrap:wrap;gap:2rem;justify-content:space-between;flex-direction:row-reverse}.c_Checkout__buttons>*{flex:0}.c_Checkout__label{width:100px;display:inline-block}.c_Checkout__input{height:40px;padding:5px 10px;font-size:16px;border-radius:8px;margin:1rem 0;border:1px solid rgba(0,0,0,.2);box-shadow:0 2px 4px #0000001a inset}.c_Checkout__input:read-only{background-color:#0000000d}
`], encapsulation: 3, changeDetection: 0 });
};
var h = "mfe-checkout";
function Y(i, r) { return p(this, null, function* () { let o = yield u(i, r); customElements.get(h) || customElements.define(h, N(s, { injector: o })); }); }
export { Y as bootstrap };
