import "@nf-internal/chunk-2VMXMS7J";
import { NgTemplateOutlet as p } from "@angular/common";
import { computed as u, input as i } from "@angular/core";
import { NavigateToDirective as m } from "@ng-internal/navigation";
import * as e from "@angular/core";
var g = ["*"];
function b(a, o) { a & 1 && e.\u0275\u0275elementContainer(0); }
function f(a, o) { if (a & 1 && (e.\u0275\u0275elementStart(0, "a", 3), e.\u0275\u0275template(1, b, 1, 0, "ng-container", 4), e.\u0275\u0275elementEnd()), a & 2) {
    let t = e.\u0275\u0275nextContext(), r = e.\u0275\u0275reference(3);
    e.\u0275\u0275classMap(t.buttonClass()), e.\u0275\u0275property("appNavigateTo", o)("navPayload", t.navPayload()), e.\u0275\u0275attribute("data-id", t.dataId())("title", t.title()), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", r);
} }
function _(a, o) { a & 1 && e.\u0275\u0275elementContainer(0); }
function h(a, o) { if (a & 1 && (e.\u0275\u0275elementStart(0, "button", 5), e.\u0275\u0275template(1, _, 1, 0, "ng-container", 4), e.\u0275\u0275elementEnd()), a & 2) {
    let t = e.\u0275\u0275nextContext(), r = e.\u0275\u0275reference(3);
    e.\u0275\u0275classMap(t.buttonClass()), e.\u0275\u0275property("disabled", t.disabled()), e.\u0275\u0275attribute("type", t.type() ?? "button")("data-id", t.dataId())("value", t.value())("title", t.title()), e.\u0275\u0275advance(), e.\u0275\u0275property("ngTemplateOutlet", r);
} }
function v(a, o) { a & 1 && (e.\u0275\u0275elementStart(0, "div", 6), e.\u0275\u0275projection(1), e.\u0275\u0275elementEnd()); }
var s = class a {
    type = i(null);
    value = i(null);
    disabled = i(!1, { transform: Boolean });
    rounded = i(!1, { transform: Boolean });
    variant = i("secondary");
    size = i("normal");
    dataId = i(null);
    title = i(null);
    extraClass = i("");
    appNavigateTo = i(null);
    navPayload = i({});
    buttonClass = u(() => { let o = ["c_Button", `c_Button--${this.variant()}`, `c_Button--size-${this.size()}`]; return this.rounded() && o.push("c_Button--rounded"), this.extraClass() && o.push(this.extraClass()), o.join(" "); });
    onHostClick(o) { if (this.type() !== "submit" || this.disabled())
        return; o.currentTarget.closest("form")?.requestSubmit(); }
    static \u0275fac = function (t) { return new (t || a); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: a, selectors: [["ts-button"]], hostBindings: function (t, r) { t & 1 && e.\u0275\u0275listener("click", function (c) { return r.onHostClick(c); }); }, inputs: { type: [1, "type"], value: [1, "value"], disabled: [1, "disabled"], rounded: [1, "rounded"], variant: [1, "variant"], size: [1, "size"], dataId: [1, "dataId"], title: [1, "title"], extraClass: [1, "extraClass"], appNavigateTo: [1, "appNavigateTo"], navPayload: [1, "navPayload"] }, ngContentSelectors: g, decls: 4, vars: 1, consts: [["inner", ""], [3, "class", "appNavigateTo", "navPayload"], [3, "class", "disabled"], [3, "appNavigateTo", "navPayload"], [4, "ngTemplateOutlet"], [3, "disabled"], [1, "c_Button__inner"]], template: function (t, r) { if (t & 1 && (e.\u0275\u0275projectionDef(), e.\u0275\u0275conditionalCreate(0, f, 2, 7, "a", 1)(1, h, 2, 8, "button", 2), e.\u0275\u0275template(2, v, 2, 0, "ng-template", null, 0, e.\u0275\u0275templateRefExtractor)), t & 2) {
            let l;
            e.\u0275\u0275conditional((l = r.appNavigateTo()) ? 0 : 1, l);
        } }, dependencies: [p, m], styles: [`.c_Button--size-normal{--button-height: 50px}.c_Button--size-small{--button-height: 40px}.c_Button{display:block;height:var(--button-height);width:100%;border-radius:calc(var(--button-height) / 2);padding:2px;border:0;background:linear-gradient(180deg,#a8a8a8,#fff),var(--accent-color);box-shadow:0 -2px 3px #e5e5e5,0 2px 3px 2px #fff,0 0 25px #0000000d,0 -10px 5px #fff inset;position:relative;text-transform:uppercase;letter-spacing:.3em;-webkit-tap-highlight-color:rgba(0,0,0,0);text-decoration:none;font-size:16px;cursor:pointer;font-family:inherit;color:inherit}.c_Button--primary{--accent-color: #333;color:#fff}.c_Button--secondary{--accent-color: #fff;color:#000}@media(width<=499px){.c_Button--rounded.c_Button--size-normal{--button-height: 40px}}@media(width>=500px){.c_Button--rounded.c_Button--size-normal{--button-height: 66px}}.c_Button--rounded.c_Button--size-normal{width:var(--button-height)}.c_Button--rounded.c_Button--size-small{--button-height: 40px;width:var(--button-height)}.c_Button--rounded .c_Button__inner{padding:0}@media(width<=499px){.c_Button--rounded svg{width:20px;height:20px}}.c_Button[disabled]{--accent-color: #d3d3d3;pointer-events:none}.c_Button:before{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(0deg,#00000030,#ffffff4d),var(--accent-color);content:"";box-shadow:0 2px 1px -1px #0000001a;display:block;transition:transform .3s,box-shadow .3s,background .1s .2s}.c_Button__inner{position:relative;padding-left:20px;padding-right:20px;background-color:var(--accent-color);height:calc(var(--button-height) - 4px);border-radius:inherit;display:grid;place-content:center;transition:transform .3s,background .3s,box-shadow .3s;-webkit-user-select:none;user-select:none;white-space:nowrap}.c_Button:hover .c_Button__inner,.c_Button:focus .c_Button__inner{background:linear-gradient(0deg,#0000000d,#0000000d),var(--accent-color)}.c_Button:active:before{background:linear-gradient(0deg,#00000017,#00000029),var(--accent-color);box-shadow:0 0 3px #0009 inset,0 2px 1px -1px #0000001a;transform:scale(.97);transition:all .1s,background .05s}.c_Button:active .c_Button__inner{transform:scale(.97);background:linear-gradient(0deg,#0000001a,#0000001a),var(--accent-color);transition:all .1s;box-shadow:0 5px 5px #0003 inset,0 -3px 3px #fff3 inset}:host{display:block}
`], encapsulation: 3, changeDetection: 0 });
};
import { input as x } from "@angular/core";
import * as n from "@angular/core";
var d = class a {
    label = x("Loading\u2026");
    static \u0275fac = function (t) { return new (t || a); };
    static \u0275cmp = n.\u0275\u0275defineComponent({ type: a, selectors: [["ts-spinner"]], inputs: { label: [1, "label"] }, decls: 4, vars: 2, consts: [["role", "status", 1, "c_Spinner"], ["aria-hidden", "true", 1, "c_Spinner__circle"], [1, "c_Spinner__label"]], template: function (t, r) { t & 1 && (n.\u0275\u0275domElementStart(0, "div", 0), n.\u0275\u0275domElement(1, "span", 1), n.\u0275\u0275domElementStart(2, "span", 2), n.\u0275\u0275text(3), n.\u0275\u0275domElementEnd()()), t & 2 && (n.\u0275\u0275attribute("aria-label", r.label()), n.\u0275\u0275advance(3), n.\u0275\u0275textInterpolate(r.label())); }, styles: [`:host{display:block}.c_Spinner{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:4rem 1rem;min-height:50vh;color:#ff5a55}.c_Spinner__circle{width:48px;height:48px;border:4px solid rgba(255,90,85,.15);border-top-color:#ff5a55;border-radius:50%;animation:c_Spinner__spin .8s linear infinite}.c_Spinner__label{font-size:.85rem;letter-spacing:.08em;text-transform:uppercase;opacity:.85}@keyframes c_Spinner__spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.c_Spinner__circle{animation-duration:2.4s}}
`], encapsulation: 3, changeDetection: 0 });
};
export { s as ButtonComponent, d as SpinnerComponent };
