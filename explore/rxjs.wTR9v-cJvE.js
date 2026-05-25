import { $ as Y, $a as Cr, $b as qt, A as S, Ab as nt, B as Q, Ba as fr, Bb as it, C as X, Ca as sr, Cb as mt, D as Z, Da as pr, Db as ft, E as $, Ea as ur, Eb as st, F as c, Fa as cr, Fb as pt, G as N, Ga as ar, Gb as ut, H as U, Ha as lr, Hb as ct, I as ee, Ia as xr, Ib as at, J as Te, Ja as dr, Jb as lt, K as F, Ka as hr, Kb as xt, L as Se, La as br, Lb as dt, M as _e, Ma as vr, Mb as ht, N as ke, Na as yr, Nb as bt, O as qe, Oa as Ar, Ob as vt, P as g, Pa as wr, Pb as yt, Q as Me, Qa as Er, Qb as At, R as Ce, Ra as Fr, Rb as wt, S as Le, Sa as gr, Sb as Et, T as We, Ta as Ir, Tb as Ft, U as Pe, Ua as Or, Ub as gt, V as Ve, Va as Tr, Vb as It, W as h, Wa as Sr, Wb as Ot, X as re, Xa as _r, Xb as Tt, Y as te, Ya as kr, Yb as St, Z as je, Za as qr, Zb as _t, _ as z, _a as Mr, _b as kt, a as u, aa as Re, ab as Lr, ac as Mt, b as le, ba as Ne, bb as Wr, bc as Ct, c as E, ca as Ue, cb as Pr, cc as Lt, d as xe, da as ze, db as Vr, e as V, eb as jr, ec as Wt, f as de, fa as Ye, fb as Rr, g as G, ga as oe, gb as Nr, h as he, ha as _, hb as Ur, i as T, ia as De, ib as zr, j as be, ja as Be, k as f, ka as Je, kb as Yr, l as H, la as Ke, lb as Dr, m as ve, ma as Ge, mb as Br, n as ye, na as He, nb as Jr, o as Ae, oa as Qe, p as j, pa as Xe, pb as Kr, q as we, qa as Ze, qb as Gr, r as Ee, ra as $e, rb as Hr, s as R, sa as er, sb as Qr, t as x, ta as rr, tb as Xr, u as Fe, ua as tr, ub as Zr, v as d, va as or, vb as $r, w as ge, wb as et, x as Ie, xa as nr, xb as rt, y as v, ya as ir, yb as tt, z as Oe, za as mr, zb as ot } from "@nf-internal/chunk-64WOUHHJ";
var D = { now() { return (D.delegate || performance).now(); }, delegate: void 0 };
var a = { schedule(t) { let e = requestAnimationFrame, r = cancelAnimationFrame, { delegate: o } = a; o && (e = o.requestAnimationFrame, r = o.cancelAnimationFrame); let n = e(i => { r = void 0, t(i); }); return new E(() => r?.(n)); }, requestAnimationFrame(...t) { let { delegate: e } = a; return (e?.requestAnimationFrame || requestAnimationFrame)(...t); }, cancelAnimationFrame(...t) { let { delegate: e } = a; return (e?.cancelAnimationFrame || cancelAnimationFrame)(...t); }, delegate: void 0 };
function Pt(t) { return t ? ne(t) : Vt; }
function ne(t) { return new f(e => { let r = t || D, o = r.now(), n = 0, i = () => { e.closed || (n = a.requestAnimationFrame(m => { n = 0; let s = r.now(); e.next({ timestamp: t ? s : m, elapsed: s - o }), i(); })); }; return i(), () => { n && a.cancelAnimationFrame(n); }; }); }
var Vt = ne();
var jt = 1, B, J = {};
function ie(t) { return t in J ? (delete J[t], !0) : !1; }
var me = { setImmediate(t) { let e = jt++; return J[e] = !0, B || (B = Promise.resolve()), B.then(() => ie(e) && t()), e; }, clearImmediate(t) { ie(t); } };
var { setImmediate: Rt, clearImmediate: Nt } = me, I = { setImmediate(...t) { let { delegate: e } = I; return (e?.setImmediate || Rt)(...t); }, clearImmediate(t) { let { delegate: e } = I; return (e?.clearImmediate || Nt)(t); }, delegate: void 0 };
var k = class extends x {
    constructor(e, r) { super(e, r), this.scheduler = e, this.work = r; }
    requestAsyncId(e, r, o = 0) { return o !== null && o > 0 ? super.requestAsyncId(e, r, o) : (e.actions.push(this), e._scheduled || (e._scheduled = I.setImmediate(e.flush.bind(e, void 0)))); }
    recycleAsyncId(e, r, o = 0) { var n; if (o != null ? o > 0 : this.delay > 0)
        return super.recycleAsyncId(e, r, o); let { actions: i } = e; r != null && ((n = i[i.length - 1]) === null || n === void 0 ? void 0 : n.id) !== r && (I.clearImmediate(r), e._scheduled === r && (e._scheduled = void 0)); }
};
var q = class extends d {
    flush(e) { this._active = !0; let r = this._scheduled; this._scheduled = void 0; let { actions: o } = this, n; e = e || o.shift(); do
        if (n = e.execute(e.state, e.delay))
            break;
    while ((e = o[0]) && e.id === r && o.shift()); if (this._active = !1, n) {
        for (; (e = o[0]) && e.id === r && o.shift();)
            e.unsubscribe();
        throw n;
    } }
};
var fe = new q(k), Ut = fe;
var M = class extends x {
    constructor(e, r) { super(e, r), this.scheduler = e, this.work = r; }
    schedule(e, r = 0) { return r > 0 ? super.schedule(e, r) : (this.delay = r, this.state = e, this.scheduler.flush(this), this); }
    execute(e, r) { return r > 0 || this.closed ? super.execute(e, r) : this._execute(e, r); }
    requestAsyncId(e, r, o = 0) { return o != null && o > 0 || o == null && this.delay > 0 ? super.requestAsyncId(e, r, o) : (e.flush(this), 0); }
};
var C = class extends d {
};
var se = new C(M), zt = se;
var L = class extends x {
    constructor(e, r) { super(e, r), this.scheduler = e, this.work = r; }
    requestAsyncId(e, r, o = 0) { return o !== null && o > 0 ? super.requestAsyncId(e, r, o) : (e.actions.push(this), e._scheduled || (e._scheduled = a.requestAnimationFrame(() => e.flush(void 0)))); }
    recycleAsyncId(e, r, o = 0) { var n; if (o != null ? o > 0 : this.delay > 0)
        return super.recycleAsyncId(e, r, o); let { actions: i } = e; r != null && r === e._scheduled && ((n = i[i.length - 1]) === null || n === void 0 ? void 0 : n.id) !== r && (a.cancelAnimationFrame(r), e._scheduled = void 0); }
};
var W = class extends d {
    flush(e) { this._active = !0; let r; e ? r = e.id : (r = this._scheduled, this._scheduled = void 0); let { actions: o } = this, n; e = e || o.shift(); do
        if (n = e.execute(e.state, e.delay))
            break;
    while ((e = o[0]) && e.id === r && o.shift()); if (this._active = !1, n) {
        for (; (e = o[0]) && e.id === r && o.shift();)
            e.unsubscribe();
        throw n;
    } }
};
var pe = new W(L), Yt = pe;
var Dt = (() => { class t extends d {
    constructor(r = P, o = 1 / 0) { super(r, () => this.frame), this.maxFrames = o, this.frame = 0, this.index = -1; }
    flush() { let { actions: r, maxFrames: o } = this, n, i; for (; (i = r[0]) && i.delay <= o && (r.shift(), this.frame = i.delay, !(n = i.execute(i.state, i.delay)));)
        ; if (n) {
        for (; i = r.shift();)
            i.unsubscribe();
        throw n;
    } }
} return t.frameTimeFactor = 10, t; })(), P = class t extends x {
    constructor(e, r, o = e.index += 1) { super(e, r), this.scheduler = e, this.work = r, this.index = o, this.active = !0, this.index = e.index = o; }
    schedule(e, r = 0) { if (Number.isFinite(r)) {
        if (!this.id)
            return super.schedule(e, r);
        this.active = !1;
        let o = new t(this.scheduler, this.work);
        return this.add(o), o.schedule(e, r);
    }
    else
        return E.EMPTY; }
    requestAsyncId(e, r, o = 0) { this.delay = e.frame + o; let { actions: n } = e; return n.push(this), n.sort(t.sortActions), 1; }
    recycleAsyncId(e, r, o = 0) { }
    _execute(e, r) { if (this.active === !0)
        return super._execute(e, r); }
    static sortActions(e, r) { return e.delay === r.delay ? e.index === r.index ? 0 : e.index > r.index ? 1 : -1 : e.delay > r.delay ? 1 : -1; }
};
function Bt(t) { return !!t && (t instanceof f || u(t.lift) && u(t.subscribe)); }
function Jt(t, e) { let r = typeof e == "object"; return new Promise((o, n) => { let i = !1, m; t.subscribe({ next: s => { m = s, i = !0; }, error: n, complete: () => { i ? o(m) : r ? o(e.defaultValue) : n(new g); } }); }); }
function Kt(t, e) { let r = typeof e == "object"; return new Promise((o, n) => { let i = new G({ next: m => { o(m), i.unsubscribe(); }, error: n, complete: () => { r ? o(e.defaultValue) : n(new g); } }); t.subscribe(i); }); }
function A(t, e, r, o) { if (r)
    if (S(r))
        o = r;
    else
        return function (...n) { return A(t, e, o).apply(this, n).pipe(h(r)); }; return o ? function (...n) { return A(t, e).apply(this, n).pipe(U(o), N(o)); } : function (...n) { let i = new R, m = !0; return new f(s => { let p = i.subscribe(s); if (m) {
    m = !1;
    let w = !1, b = !1;
    e.apply(this, [...n, (...l) => { if (t) {
            let O = l.shift();
            if (O != null) {
                i.error(O);
                return;
            }
        } i.next(1 < l.length ? l : l[0]), b = !0, w && i.complete(); }]), b && i.complete(), w = !0;
} return p; }); }; }
function Gt(t, e, r) { return A(!1, t, e, r); }
function Ht(t, e, r) { return A(!0, t, e, r); }
function y(t) { return new f(e => { c(t()).subscribe(e); }); }
var Qt = { connector: () => new j, resetOnDisconnect: !0 };
function Xt(t, e = Qt) { let r = null, { connector: o, resetOnDisconnect: n = !0 } = e, i = o(), m = new f(s => i.subscribe(s)); return m.connect = () => ((!r || r.closed) && (r = y(() => t).subscribe(i), n && r.add(() => i = o())), r), m; }
function Zt(...t) { let e = Q(t), { args: r, keys: o } = re(t), n = new f(i => { let { length: m } = r; if (!m) {
    i.complete();
    return;
} let s = new Array(m), p = m, w = m; for (let b = 0; b < m; b++) {
    let l = !1;
    c(r[b]).subscribe(H(i, O => { l || (l = !0, w--), s[b] = O; }, () => p--, void 0, () => { (!p || !l) && (w || i.next(o ? te(o, s) : s), i.complete()); }));
} }); return e ? n.pipe(h(e)) : n; }
var $t = ["addListener", "removeListener"], eo = ["addEventListener", "removeEventListener"], ro = ["on", "off"];
function K(t, e, r, o) { if (u(r) && (o = r, r = void 0), o)
    return K(t, e, r).pipe(h(o)); let [n, i] = no(t) ? eo.map(m => s => t[m](e, s, r)) : to(t) ? $t.map(ue(t, e)) : oo(t) ? ro.map(ue(t, e)) : []; if (!n && $(t))
    return z(m => K(m, e, r))(c(t)); if (!n)
    throw new TypeError("Invalid event target"); return new f(m => { let s = (...p) => m.next(1 < p.length ? p : p[0]); return n(s), () => i(s); }); }
function ue(t, e) { return r => o => t[r](e, o); }
function to(t) { return u(t.addListener) && u(t.removeListener); }
function oo(t) { return u(t.on) && u(t.off); }
function no(t) { return u(t.addEventListener) && u(t.removeEventListener); }
function ce(t, e, r) { return r ? ce(t, e).pipe(h(r)) : new f(o => { let n = (...m) => o.next(m.length === 1 ? m[0] : m), i = t(n); return u(e) ? () => e(n, i) : void 0; }); }
function io(t, e, r, o, n) { let i, m; arguments.length === 1 ? { initialState: m, condition: e, iterate: r, resultSelector: i = T, scheduler: n } = t : (m = t, !o || S(o) ? (i = T, n = o) : i = o); function* s() { for (let p = m; !e || e(p); p = r(p))
    yield i(p); } return y(n ? () => ee(s(), n) : s); }
function mo(t, e, r) { return y(() => t() ? e : r); }
function fo(...t) { let e = X(t), r = Z(t, 1 / 0), o = t; return o.length ? o.length === 1 ? c(o[0]) : Y(r)(F(o, e)) : v; }
var ae = new f(V);
function so() { return ae; }
function po(t, e) { return F(Object.entries(t), e); }
function uo(t, e, r) { return [_(e, r)(c(t)), _(oe(e, r))(c(t))]; }
function co(t, e, r) { if (e == null && (e = t, t = 0), e <= 0)
    return v; let o = e + t; return new f(r ? n => { let i = t; return r.schedule(function () { i < o ? (n.next(i++), this.schedule()) : n.complete(); }); } : n => { let i = t; for (; i < o && !n.closed;)
    n.next(i++); n.complete(); }); }
function ao(t, e) { return new f(r => { let o = t(), n = e(o); return (n ? c(n) : v).subscribe(r), () => { o && o.unsubscribe(); }; }); }
export { Me as ArgumentOutOfRangeError, R as AsyncSubject, we as BehaviorSubject, ye as ConnectableObservable, v as EMPTY, g as EmptyError, ae as NEVER, Ce as NotFoundError, qe as Notification, ke as NotificationKind, Ae as ObjectUnsubscribedError, f as Observable, Ee as ReplaySubject, Fe as Scheduler, Le as SequenceError, j as Subject, de as Subscriber, E as Subscription, We as TimeoutError, le as UnsubscriptionError, P as VirtualAction, Dt as VirtualTimeScheduler, Yt as animationFrame, pe as animationFrameScheduler, Pt as animationFrames, Ut as asap, fe as asapScheduler, Ie as async, ge as asyncScheduler, Je as audit, Ke as auditTime, Gt as bindCallback, Ht as bindNodeCallback, Ge as buffer, He as bufferCount, Qe as bufferTime, Xe as bufferToggle, Ze as bufferWhen, $e as catchError, or as combineAll, je as combineLatest, tr as combineLatestAll, nr as combineLatestWith, Ne as concat, Re as concatAll, ir as concatMap, mr as concatMapTo, fr as concatWith, xe as config, sr as connect, Xt as connectable, pr as count, ur as debounce, cr as debounceTime, ar as defaultIfEmpty, y as defer, br as delay, hr as delayWhen, vr as dematerialize, yr as distinct, Ar as distinctUntilChanged, wr as distinctUntilKeyChanged, Fr as elementAt, Oe as empty, gr as endWith, Ir as every, Sr as exhaust, Tr as exhaustAll, Or as exhaustMap, _r as expand, _ as filter, kr as finalize, qr as find, Mr as findIndex, Cr as first, Kt as firstValueFrom, Nr as flatMap, Zt as forkJoin, F as from, K as fromEvent, ce as fromEventPattern, io as generate, Lr as groupBy, T as identity, xr as ignoreElements, mo as iif, ze as interval, Wr as isEmpty, Bt as isObservable, Vr as last, Jt as lastValueFrom, Ve as map, dr as mapTo, jr as materialize, Rr as max, fo as merge, Y as mergeAll, z as mergeMap, Ur as mergeMapTo, zr as mergeScan, Yr as mergeWith, Dr as min, Br as multicast, so as never, V as noop, he as observable, N as observeOn, Se as of, Ye as onErrorResumeNext, Jr as onErrorResumeNextWith, po as pairs, Kr as pairwise, uo as partition, be as pipe, Gr as pluck, Hr as publish, Qr as publishBehavior, Xr as publishLast, Zr as publishReplay, zt as queue, se as queueScheduler, De as race, $r as raceWith, co as range, er as reduce, ve as refCount, et as repeat, rt as repeatWhen, tt as retry, ot as retryWhen, nt as sample, it as sampleTime, mt as scan, Te as scheduled, ft as sequenceEqual, st as share, pt as shareReplay, ut as single, ct as skip, at as skipLast, lt as skipUntil, xt as skipWhile, dt as startWith, U as subscribeOn, bt as switchAll, ht as switchMap, vt as switchMapTo, yt as switchScan, lr as take, Pr as takeLast, At as takeUntil, wt as takeWhile, Et as tap, Ft as throttle, gt as throttleTime, _e as throwError, Er as throwIfEmpty, It as timeInterval, Pe as timeout, Ot as timeoutWith, Ue as timer, Tt as timestamp, rr as toArray, ao as using, St as window, _t as windowCount, kt as windowTime, qt as windowToggle, Mt as windowWhen, Ct as withLatestFrom, Be as zip, Lt as zipAll, Wt as zipWith };
