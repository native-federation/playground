import { Lc as f, Nc as b, T as l, ad as v, e as d, id as w, kd as x, md as h, nd as g, od as j, qd as M, sd as k } from "@nf-internal/chunk-ABVK3W5E";
import "@nf-internal/chunk-RNDMTYF5";
import "@nf-internal/chunk-VSPXQRTJ";
import { a as y, b as D } from "@nf-internal/chunk-2VMXMS7J";
import { Observable as m, ReplaySubject as I } from "rxjs";
import { takeUntil as C } from "rxjs/operators";
function O(t) { t || (t = l(b)); let e = new m(n => { if (t.destroyed) {
    n.next();
    return;
} return t.onDestroy(n.next.bind(n)); }); return n => n.pipe(C(e)); }
var p = class {
    source;
    destroyed = !1;
    destroyRef = l(b);
    constructor(e) { this.source = e, this.destroyRef.onDestroy(() => { this.destroyed = !0; }); }
    subscribe(e) { if (this.destroyed)
        throw new d(953, !1); let n = this.source.pipe(O(this.destroyRef)).subscribe({ next: r => e(r) }); return { unsubscribe: () => n.unsubscribe() }; }
};
function F(t, e) { return new p(t); }
function L(t) { let e = h(t); return new m(n => { let r = e?.onDestroy(() => n.complete()), u = t.subscribe(o => n.next(o)); return () => { u.unsubscribe(), r?.(); }; }); }
function $(t, e) { let n = e?.injector ?? l(f), r = new I(1), u = x(() => { let o; try {
    o = t();
}
catch (i) {
    g(() => r.error(i));
    return;
} g(() => r.next(o)); }, { injector: n, manualCleanup: !0 }); return n.get(b).onDestroy(() => { u.destroy(), r.complete(); }), r.asObservable(); }
function P(t, e) { let r = !e?.manualCleanup ? e?.injector?.get(b) ?? l(b) : null, u = S(e?.equal), o; e?.requireSync ? o = v({ kind: 0 }, { equal: u }) : o = v({ kind: 1, value: e?.initialValue }, { equal: u }); let i, c = t.subscribe({ next: s => o.set({ kind: 1, value: s }), error: s => { o.set({ kind: 2, error: s }), i?.(); }, complete: () => { i?.(); } }); if (e?.requireSync && o().kind === 0)
    throw new d(601, !1); return i = r?.onDestroy(c.unsubscribe.bind(c)), j(() => { let s = o(); switch (s.kind) {
    case 1: return s.value;
    case 2: throw s.error;
    case 0: throw new d(601, !1);
} }, { equal: e?.equal }); }
function S(t = Object.is) { return (e, n) => e.kind === 1 && n.kind === 1 && t(e.value, n.value); }
function A(t) { t === void 0 && (t = l(f)); let e = t.get(w); return n => new m(r => { let u = e.add(), o = !1; function i() { o || (u(), o = !0); } let c = n.subscribe({ next: s => { r.next(s), i(); }, complete: () => { r.complete(), i(); }, error: s => { r.error(s), i(); } }); return c.add(() => { r.unsubscribe(), i(); }), c; }); }
function V(t) { return M(D(y({}, t), { loader: void 0, stream: e => { let n, r = () => n?.unsubscribe(); e.abortSignal.addEventListener("abort", r); let u = v({ value: void 0 }), o, i = new Promise(a => o = a); function c(a) { u.set(a), o?.(u), o = void 0; } let s = t.stream; if (s === void 0)
        throw new d(990, !1); return n = s(e).subscribe({ next: a => c({ value: a }), error: a => { c({ error: k(a) }), e.abortSignal.removeEventListener("abort", r); }, complete: () => { o && c({ error: new d(991, !1) }), e.abortSignal.removeEventListener("abort", r); } }), i; } })); }
export { F as outputFromObservable, L as outputToObservable, A as pendingUntilEvent, V as rxResource, O as takeUntilDestroyed, $ as toObservable, P as toSignal };
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
