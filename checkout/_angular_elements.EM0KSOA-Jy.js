import { ComponentFactoryResolver as d, NgZone as E, ApplicationRef as b, \u0275ChangeDetectionScheduler as I, \u0275isViewDirty as S, \u0275markForRefresh as v, Injector as R, isSignal as F, Version as V } from "@angular/core";
import { ReplaySubject as w, merge as j, Observable as Z } from "rxjs";
import { switchMap as D } from "rxjs/operators";
var M = { schedule(n, t) { let e = setTimeout(n, t); return () => clearTimeout(e); } };
function T(n) { return n.replace(/[A-Z]/g, t => `-${t.toLowerCase()}`); }
function C(n) { return !!n && n.nodeType === Node.ELEMENT_NODE; }
var l;
function _(n, t) { if (!l) {
    let e = Element.prototype;
    l = e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
} return n.nodeType === Node.ELEMENT_NODE ? l.call(n, t) : !1; }
function x(n) { let t = {}; return n.forEach(({ propName: e, templateName: s, transform: r }) => { t[T(s)] = [e, r]; }), t; }
function O(n, t) { return t.get(d).resolveComponentFactory(n).inputs; }
function N(n, t) { let e = n.childNodes, s = t.map(() => []), r = -1; t.some((c, u) => c === "*" ? (r = u, !0) : !1); for (let c = 0, u = e.length; c < u; ++c) {
    let i = e[c], o = k(i, t, r);
    o !== -1 && s[o].push(i);
} return s; }
function k(n, t, e) { let s = e; return C(n) && t.some((r, c) => r !== "*" && _(n, r) ? (s = c, !0) : !1), s; }
var z = 10, h = class {
    componentFactory;
    inputMap = new Map;
    constructor(t, e) { this.componentFactory = e.get(d).resolveComponentFactory(t); for (let s of this.componentFactory.inputs)
        this.inputMap.set(s.propName, s.templateName); }
    create(t) { return new p(this.componentFactory, t, this.inputMap); }
}, p = class {
    componentFactory;
    injector;
    inputMap;
    eventEmitters = new w(1);
    events = this.eventEmitters.pipe(D(t => j(...t)));
    componentRef = null;
    scheduledDestroyFn = null;
    initialInputValues = new Map;
    ngZone;
    elementZone;
    appRef;
    cdScheduler;
    constructor(t, e, s) { this.componentFactory = t, this.injector = e, this.inputMap = s, this.ngZone = this.injector.get(E), this.appRef = this.injector.get(b), this.cdScheduler = e.get(I), this.elementZone = typeof Zone > "u" ? null : this.ngZone.run(() => Zone.current); }
    connect(t) { this.runInZone(() => { if (this.scheduledDestroyFn !== null) {
        this.scheduledDestroyFn(), this.scheduledDestroyFn = null;
        return;
    } this.componentRef === null && this.initializeComponent(t); }); }
    disconnect() { this.runInZone(() => { this.componentRef === null || this.scheduledDestroyFn !== null || (this.scheduledDestroyFn = M.schedule(() => { this.componentRef !== null && (this.componentRef.destroy(), this.componentRef = null); }, z)); }); }
    getInputValue(t) { return this.runInZone(() => this.componentRef === null ? this.initialInputValues.get(t) : this.componentRef.instance[t]); }
    setInputValue(t, e) { if (this.componentRef === null) {
        this.initialInputValues.set(t, e);
        return;
    } this.runInZone(() => { this.componentRef.setInput(this.inputMap.get(t) ?? t, e), S(this.componentRef.hostView) && (v(this.componentRef.changeDetectorRef), this.cdScheduler.notify(6)); }); }
    initializeComponent(t) { let e = R.create({ providers: [], parent: this.injector }), s = N(t, this.componentFactory.ngContentSelectors); this.componentRef = this.componentFactory.create(e, s, t), this.initializeInputs(), this.initializeOutputs(this.componentRef), this.appRef.attachView(this.componentRef.hostView), this.componentRef.hostView.detectChanges(); }
    initializeInputs() { for (let [t, e] of this.initialInputValues)
        this.setInputValue(t, e); this.initialInputValues.clear(); }
    initializeOutputs(t) { let e = this.componentFactory.outputs.map(({ propName: s, templateName: r }) => { let c = t.instance[s]; return new Z(u => { let i = c.subscribe(o => u.next({ name: r, value: o })); return () => i.unsubscribe(); }); }); this.eventEmitters.next(e); }
    runInZone(t) { return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(t) : t(); }
}, m = class extends HTMLElement {
    ngElementEventsSubscription = null;
};
function Y(n, t) { let e = O(n, t.injector), s = t.strategyFactory || new h(n, t.injector), r = x(e); class c extends m {
    injector;
    static observedAttributes = Object.keys(r);
    get ngElementStrategy() { if (!this._ngElementStrategy) {
        let i = this._ngElementStrategy = s.create(this.injector || t.injector);
        e.forEach(({ propName: o, transform: a }) => { if (!this.hasOwnProperty(o))
            return; let f = this[o]; delete this[o], i.setInputValue(o, f, a); });
    } return this._ngElementStrategy; }
    _ngElementStrategy;
    constructor(i) { super(), this.injector = i; }
    attributeChangedCallback(i, o, a, f) { let [g, y] = r[i]; this.ngElementStrategy.setInputValue(g, a, y); }
    connectedCallback() { let i = !1; this.ngElementStrategy.events && (this.subscribeToEvents(), i = !0), this.ngElementStrategy.connect(this), i || this.subscribeToEvents(); }
    disconnectedCallback() { this._ngElementStrategy && this._ngElementStrategy.disconnect(), this.ngElementEventsSubscription && (this.ngElementEventsSubscription.unsubscribe(), this.ngElementEventsSubscription = null); }
    subscribeToEvents() { this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(i => { let o = new CustomEvent(i.name, { detail: i.value }); this.dispatchEvent(o); }); }
} return e.forEach(({ propName: u, transform: i, isSignal: o }) => { Object.defineProperty(c.prototype, u, { get() { let a = this.ngElementStrategy.getInputValue(u); return o && F(a) ? a() : a; }, set(a) { this.ngElementStrategy.setInputValue(u, a, i); }, configurable: !0, enumerable: !0 }); }), c; }
var H = new V("21.2.14");
export { m as NgElement, H as VERSION, Y as createCustomElement };
/*! Bundled license information:

@angular/elements/fesm2022/elements.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
