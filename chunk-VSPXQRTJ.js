import { a, b as f } from "@nf-internal/chunk-2VMXMS7J";
var i = null, F = !1, x = 1, b = null, d = Symbol("SIGNAL");
function p(e) { let r = i; return i = e, r; }
function Q() { return i; }
function W() { return F; }
function X(e) { return e[d] !== void 0; }
var v = { version: 0, lastCleanEpoch: 0, dirty: !1, producers: void 0, producersTail: void 0, consumers: void 0, consumersTail: void 0, recomputing: !1, consumerAllowSignalWrites: !1, consumerIsAlwaysLive: !1, kind: "unknown", producerMustRecompute: () => !1, producerRecomputeValue: () => { }, consumerMarkedDirty: () => { }, consumerOnSignalRead: () => { } };
function A(e) { if (F)
    throw new Error(""); if (i === null)
    return; i.consumerOnSignalRead(e); let r = i.producersTail; if (r !== void 0 && r.producer === e)
    return; let t, n = i.recomputing; if (n && (t = r !== void 0 ? r.nextProducer : i.producers, t !== void 0 && t.producer === e)) {
    i.producersTail = t, t.lastReadVersion = e.version;
    return;
} let u = e.consumersTail; if (u !== void 0 && u.consumer === i && (!n || Z(u, i)))
    return; let o = h(i), s = { producer: e, consumer: i, nextProducer: t, prevConsumer: u, lastReadVersion: e.version, nextConsumer: void 0 }; i.producersTail = s, r !== void 0 ? r.nextProducer = s : i.producers = s, o && B(e, s); }
function _() { x++; }
function C(e) { if (!(h(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === x)) {
    if (!e.producerMustRecompute(e) && !T(e)) {
        y(e);
        return;
    }
    e.producerRecomputeValue(e), y(e);
} }
function M(e) { if (e.consumers === void 0)
    return; let r = F; F = !0; try {
    for (let t = e.consumers; t !== void 0; t = t.nextConsumer) {
        let n = t.consumer;
        n.dirty || I(n);
    }
}
finally {
    F = r;
} }
function L() { return i?.consumerAllowSignalWrites !== !1; }
function I(e) { e.dirty = !0, M(e), e.consumerMarkedDirty?.(e); }
function y(e) { e.dirty = !1, e.lastCleanEpoch = x; }
function S(e) { return e && G(e), p(e); }
function G(e) { e.producersTail = void 0, e.recomputing = !0; }
function E(e, r) { p(r), e && $(e); }
function $(e) { e.recomputing = !1; let r = e.producersTail, t = r !== void 0 ? r.nextProducer : e.producers; if (t !== void 0) {
    if (h(e))
        do
            t = O(t);
        while (t !== void 0);
    r !== void 0 ? r.nextProducer = void 0 : e.producers = void 0;
} }
function T(e) { for (let r = e.producers; r !== void 0; r = r.nextProducer) {
    let t = r.producer, n = r.lastReadVersion;
    if (n !== t.version || (C(t), n !== t.version))
        return !0;
} return !1; }
function q(e) { if (h(e)) {
    let r = e.producers;
    for (; r !== void 0;)
        r = O(r);
} e.producers = void 0, e.producersTail = void 0, e.consumers = void 0, e.consumersTail = void 0; }
function B(e, r) { let t = e.consumersTail, n = h(e); if (t !== void 0 ? (r.nextConsumer = t.nextConsumer, t.nextConsumer = r) : (r.nextConsumer = void 0, e.consumers = r), r.prevConsumer = t, e.consumersTail = r, !n)
    for (let u = e.producers; u !== void 0; u = u.nextProducer)
        B(u.producer, u); }
function O(e) { let r = e.producer, t = e.nextProducer, n = e.nextConsumer, u = e.prevConsumer; if (e.nextConsumer = void 0, e.prevConsumer = void 0, n !== void 0 ? n.prevConsumer = u : r.consumersTail = u, u !== void 0)
    u.nextConsumer = n;
else if (r.consumers = n, !h(r)) {
    let o = r.producers;
    for (; o !== void 0;)
        o = O(o);
} return t; }
function h(e) { return e.consumerIsAlwaysLive || e.consumers !== void 0; }
function w(e) { b?.(e); }
function Y(e) { let r = b; return b = e, r; }
function Z(e, r) { let t = r.producersTail; if (t !== void 0) {
    let n = r.producers;
    do {
        if (n === e)
            return !0;
        if (n === t)
            break;
        n = n.nextProducer;
    } while (n !== void 0);
} return !1; }
function D(e, r) { return Object.is(e, r); }
function ee(e, r) { let t = Object.create(re); t.computation = e, r !== void 0 && (t.equal = r); let n = () => { if (C(t), A(t), t.value === l)
    throw t.error; return t.value; }; return n[d] = t, w(t), n; }
var m = Symbol("UNSET"), g = Symbol("COMPUTING"), l = Symbol("ERRORED"), re = f(a({}, v), { value: m, dirty: !0, error: null, equal: D, kind: "computed", producerMustRecompute(e) { return e.value === m || e.value === g; }, producerRecomputeValue(e) { if (e.value === g)
        throw new Error(""); let r = e.value; e.value = g; let t = S(e), n, u = !1; try {
        n = e.computation(), p(null), u = r !== m && r !== l && n !== l && e.equal(r, n);
    }
    catch (o) {
        n = l, e.error = o;
    }
    finally {
        E(e, t);
    } if (u) {
        e.value = r;
        return;
    } e.value = n, e.version++; } });
function ne() { throw new Error; }
var z = ne;
function H(e) { z(e); }
function te(e) { z = e; }
var P = null;
function ue(e, r) { let t = Object.create(J); t.value = e, r !== void 0 && (t.equal = r); let n = () => K(t); return n[d] = t, w(t), [n, s => N(t, s), s => k(t, s)]; }
function oe(e) { let r = P; return P = e, r; }
function K(e) { return A(e), e.value; }
function N(e, r) { L() || H(e), e.equal(e.value, r) || (e.value = r, se(e)); }
function k(e, r) { L() || H(e), N(e, r(e.value)); }
function ie(e) { P?.(e); }
var J = f(a({}, v), { equal: D, value: void 0, kind: "signal" });
function se(e) { e.version++, _(), M(e), P?.(e); }
var ce = f(a({}, v), { consumerIsAlwaysLive: !0, consumerAllowSignalWrites: !0, dirty: !0, kind: "effect" });
function le(e) { if (e.dirty = !1, e.version > 0 && !T(e))
    return; e.version++; let r = S(e); try {
    e.cleanup(), e.fn();
}
finally {
    E(e, r);
} }
function ae(e, r, t) { let n = Object.create(pe); n.source = e, n.computation = r, t != null && (n.equal = t); let o = () => { if (C(n), A(n), n.value === l)
    throw n.error; return n.value; }; return o[d] = n, w(n), o; }
function fe(e, r) { C(e), N(e, r), y(e); }
function de(e, r) { if (C(e), e.value === l)
    throw e.error; k(e, r), y(e); }
var pe = f(a({}, v), { value: m, dirty: !0, error: null, equal: D, kind: "linkedSignal", producerMustRecompute(e) { return e.value === m || e.value === g; }, producerRecomputeValue(e) { if (e.value === g)
        throw new Error(""); let r = e.value; e.value = g; let t = S(e), n, u = !1; try {
        let o = e.source(), s = r !== m && r !== l, R = s ? { source: e.sourceValue, value: r } : void 0;
        n = e.computation(o, R), e.sourceValue = o, p(null), u = s && n !== l && e.equal(r, n);
    }
    catch (o) {
        n = l, e.error = o;
    }
    finally {
        E(e, t);
    } if (u) {
        e.value = r;
        return;
    } e.value = n, e.version++; } });
function me(e) { let r = p(null); try {
    return e();
}
finally {
    p(r);
} }
function ge(e) { }
var U = { header: (e, r) => { if (!V(e) || r?.ngSkipFormatting)
        return null; let t; try {
        t = e();
    }
    catch (o) {
        return ["span", `Signal(\u26A0\uFE0F Error)${o.message ? `: ${o.message}` : ""}`];
    } let n = "computation" in e[d] ? "Computed" : "Signal", u = t === null || !Array.isArray(t) && typeof t != "object"; return ["span", {}, ["span", {}, `${n}(`], V(t) ? U.header(t, r) : u && t !== void 0 && typeof t != "function" ? ["object", { object: t }] : ve(t), ["span", {}, ")"]]; }, hasBody: (e, r) => { if (!V(e))
        return !1; try {
        e();
    }
    catch {
        return !1;
    } return !r?.ngSkipFormatting; }, body: (e, r) => { let t = "var(--sys-color-primary)"; return ["div", { style: "background: #FFFFFF10; padding-left: 4px; padding-top: 2px; padding-bottom: 2px;" }, ["div", { style: `color: ${t}` }, "Signal value: "], ["div", { style: "padding-left: .5rem;" }, ["object", { object: e(), config: r }]], ["div", { style: `color: ${t}` }, "Signal function: "], ["div", { style: "padding-left: .5rem;" }, ["object", { object: e, config: f(a({}, r), { ngSkipFormatting: !0 }) }]]]; } };
function ve(e) { if (e === null)
    return "null"; if (Array.isArray(e))
    return `Array(${e.length})`; if (e instanceof Element)
    return `<${e.tagName.toLowerCase()}>`; if (e instanceof URL)
    return "URL"; switch (typeof e) {
    case "undefined": return "undefined";
    case "function": return "prototype" in e ? "class" : "() => {\u2026}";
    case "object": return e.constructor.name === "Object" ? "{\u2026}" : `${e.constructor.name} {}`;
    default: return ["object", { object: e, config: { ngSkipFormatting: !0 } }];
} }
function V(e) { return e[d] !== void 0; }
function De() { globalThis.devtoolsFormatters ??= [], globalThis.devtoolsFormatters.some(e => e === U) || globalThis.devtoolsFormatters.push(U); }
function Ne(e, r, t) { let n = Object.create(Ce); t && (n.consumerAllowSignalWrites = !0), n.fn = e, n.schedule = r; let u = c => { n.cleanupFn = c; }; function o(c) { return c.fn === null && c.schedule === null; } function s(c) { o(c) || (q(c), c.cleanupFn(), c.fn = null, c.schedule = null, c.cleanupFn = j); } let R = () => { if (n.fn === null)
    return; if (W())
    throw new Error(""); if (n.dirty = !1, n.version > 0 && !T(n))
    return; n.version++; let c = S(n); try {
    n.cleanupFn(), n.cleanupFn = j, n.fn(u);
}
finally {
    E(n, c);
} }; return n.ref = { notify: () => I(n), run: R, cleanup: () => n.cleanupFn(), destroy: () => s(n), [d]: n }, n.ref; }
var j = () => { }, Ce = f(a({}, v), { consumerIsAlwaysLive: !0, consumerAllowSignalWrites: !1, consumerMarkedDirty: e => { e.schedule !== null && e.schedule(e.ref); }, cleanupFn: j });
export { d as a, p as b, Q as c, W as d, X as e, v as f, A as g, _ as h, C as i, M as j, L as k, I as l, y as m, S as n, G as o, E as p, $ as q, T as r, q as s, w as t, Y as u, D as v, ee as w, te as x, ue as y, oe as z, K as A, N as B, k as C, ie as D, J as E, ce as F, le as G, ae as H, fe as I, de as J, me as K, ge as L, De as M, Ne as N };
/*! Bundled license information:

@angular/core/fesm2022/_effect-chunk.mjs:
@angular/core/fesm2022/_untracked-chunk.mjs:
@angular/core/fesm2022/_weak_ref-chunk.mjs:
@angular/core/fesm2022/primitives-signals.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
