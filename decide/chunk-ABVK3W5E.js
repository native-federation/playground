import { a as ee, b as E, f as R } from "@nf-internal/chunk-RNDMTYF5";
import { F as Le, G as Ae, H as ne, I as Ve, J as $e, K as qe, a as I, b as h, c as Oe, s as z, w as Se, y as Pe } from "@nf-internal/chunk-VSPXQRTJ";
import { a as L, b as A, c as X } from "@nf-internal/chunk-2VMXMS7J";
import { BehaviorSubject as Bn, Observable as Un, Subject as Wn, Subscription as Yn } from "rxjs";
var re = class {
    full;
    major;
    minor;
    patch;
    constructor(n) { this.full = n; let t = n.split("."); this.major = t[0], this.minor = t[1], this.patch = t.slice(2).join("."); }
}, He = new re("21.2.14"), Jn = (() => { let e = He.full; return `https://${e.includes("-next") || e.includes("-rc") || e === "0.0.0-PLACEHOLDER" ? "next" : `v${He.major}`}.angular.dev`; })(), Fr = `${Jn}/errors`, Rr = "https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss", f = class extends Error {
    code;
    constructor(n, t) { super(Ie(n, t)), this.code = n; }
};
function Qn(e) { return `NG0${Math.abs(e)}`; }
function Ie(e, n) { return `${Qn(e)}${n ? ": " + n : ""}`; }
var jr = globalThis;
function d(e) { for (let n in e)
    if (e[n] === d)
        return n; throw Error(""); }
function kr(e, n) { for (let t in n)
    n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]); }
function Kn(e) {
    if (typeof e == "string")
        return e;
    if (Array.isArray(e))
        return `[${e.map(Kn).join(", ")}]`;
    if (e == null)
        return "" + e;
    let n = e.overriddenName || e.name;
    if (n)
        return `${n}`;
    let t = e.toString();
    if (t == null)
        return "" + t;
    let r = t.indexOf(`
`);
    return r >= 0 ? t.slice(0, r) : t;
}
function Or(e, n) { return e ? n ? `${e} ${n}` : e : n || ""; }
function Sr(e, n = 100) { if (!e || n < 1 || e.length <= n)
    return e; if (n == 1)
    return e.substring(0, 1) + "..."; let t = Math.round(n / 2); return e.substring(0, t) + "..." + e.substring(e.length - t); }
var Xn = d({ __forward_ref__: d });
function tn(e) { return e.__forward_ref__ = tn, e; }
function y(e) { return zn(e) ? e() : e; }
function zn(e) { return typeof e == "function" && e.hasOwnProperty(Xn) && e.__forward_ref__ === tn; }
function Pr(e, n, t) { e != n && rn(t, e, n, "=="); }
function rn(e, n, t, r) { throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`)); }
function S(e) { return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 }; }
function Lr(e) { return { providers: e.providers || [], imports: e.imports || [] }; }
function Y(e) { return et(e, on); }
function Ar(e) { return Y(e) !== null; }
function et(e, n) { return e.hasOwnProperty(n) && e[n] || null; }
function nt(e) { let n = e?.[on] ?? null; return n || null; }
function Ge(e) { return e && e.hasOwnProperty(Ze) ? e[Ze] : null; }
var on = d({ \u0275prov: d }), Ze = d({ \u0275inj: d }), p = class {
    _desc;
    ngMetadataName = "InjectionToken";
    \u0275prov;
    constructor(n, t) { this._desc = n, this.\u0275prov = void 0, typeof t == "number" ? this.__NG_ELEMENT_ID__ = t : t !== void 0 && (this.\u0275prov = S({ token: this, providedIn: t.providedIn || "root", factory: t.factory })); }
    get multi() { return this; }
    toString() { return `InjectionToken ${this._desc}`; }
}, Be;
function Vr(e) { rn("setInjectorProfilerContext should never be called in production mode"); let n = Be; return Be = e, n; }
function sn(e) { return e && !!e.\u0275providers; }
var tt = d({ \u0275cmp: d }), rt = d({ \u0275dir: d }), ot = d({ \u0275pipe: d }), it = d({ \u0275mod: d }), Ue = d({ \u0275fac: d }), $r = d({ __NG_ELEMENT_ID__: d }), We = d({ __NG_ENV_ID__: d });
function st(e) { return J(e, "@NgModule"), e[it] || null; }
function qr(e) { let n = st(e); if (!n)
    throw new f(915, !1); return n; }
function un(e) { return J(e, "@Component"), e[tt] || null; }
function ut(e) { return J(e, "@Directive"), e[rt] || null; }
function at(e) { return J(e, "@Pipe"), e[ot] || null; }
function J(e, n) { if (e == null)
    throw new f(-919, !1); }
function Hr(e) { let n = un(e) || ut(e) || at(e); return n !== null && n.standalone; }
function ct(e) { return typeof e == "string" ? e : e == null ? "" : String(e); }
function Gr(e) { return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : ct(e); }
var an = d({ ngErrorCode: d }), dt = d({ ngErrorMessage: d }), lt = d({ ngTokenPath: d });
function ft(e, n) { return cn("", -200, n); }
function gt(e, n) { throw new f(-201, !1); }
function cn(e, n, t) { let r = new f(n, e); return r[an] = n, r[dt] = e, t && (r[lt] = t), r; }
function ht(e) { return e[an]; }
var oe;
function dn() { return oe; }
function T(e) { let n = oe; return oe = e, n; }
function pt(e, n, t) { let r = Y(e); if (r && r.providedIn == "root")
    return r.value === void 0 ? r.value = r.factory() : r.value; if (t & 8)
    return null; if (n !== void 0)
    return n; gt(e, ""); }
var mt = {}, N = mt, ie = "__NG_DI_FLAG__", se = class {
    injector;
    constructor(n) { this.injector = n; }
    retrieve(n, t) { let r = $(t) || 0; try {
        return this.injector.get(n, r & 8 ? null : N, r);
    }
    catch (o) {
        if (R(o))
            return o;
        throw o;
    } }
};
function vt(e, n = 0) { let t = ee(); if (t === void 0)
    throw new f(-203, !1); if (t === null)
    return pt(e, void 0, n); {
    let r = yt(n), o = t.retrieve(e, r);
    if (R(o)) {
        if (r.optional)
            return null;
        throw o;
    }
    return o;
} }
function x(e, n = 0) { return (dn() || vt)(y(e), n); }
function Zr(e) { throw new f(202, !1); }
function g(e, n) { return x(e, $(n)); }
function $(e) { return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4); }
function yt(e) { return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) }; }
function ue(e) { let n = []; for (let t = 0; t < e.length; t++) {
    let r = y(e[t]);
    if (Array.isArray(r)) {
        if (r.length === 0)
            throw new f(900, !1);
        let o, i = 0;
        for (let s = 0; s < r.length; s++) {
            let l = r[s], u = Dt(l);
            typeof u == "number" ? u === -1 ? o = l.token : i |= u : o = l;
        }
        n.push(x(o, i));
    }
    else
        n.push(x(r));
} return n; }
function Br(e, n) { return e[ie] = n, e.prototype[ie] = n, e; }
function Dt(e) { return e[ie]; }
function q(e, n) { let t = e.hasOwnProperty(Ue); return t ? e[Ue] : null; }
function Ur(e, n, t) { if (e.length !== n.length)
    return !1; for (let r = 0; r < e.length; r++) {
    let o = e[r], i = n[r];
    if (t && (o = t(o), i = t(i)), i !== o)
        return !1;
} return !0; }
function Wr(e) { return e.flat(Number.POSITIVE_INFINITY); }
function Ee(e, n) { e.forEach(t => Array.isArray(t) ? Ee(t, n) : n(t)); }
function Yr(e, n, t) { n >= e.length ? e.push(t) : e.splice(n, 0, t); }
function Jr(e, n) { return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]; }
function Qr(e, n) { let t = []; for (let r = 0; r < e; r++)
    t.push(n); return t; }
function Kr(e, n, t) { let r = e.length - t; for (; n < r;)
    e[n] = e[n + t], n++; for (; t--;)
    e.pop(); }
function It(e, n, t, r) { let o = e.length; if (o == n)
    e.push(t, r);
else if (o === 1)
    e.push(r, e[0]), e[0] = t;
else {
    for (o--, e.push(e[o - 1], e[o]); o > n;) {
        let i = o - 2;
        e[o] = e[i], o--;
    }
    e[n] = t, e[n + 1] = r;
} }
function Xr(e, n, t) { let r = ln(e, n); return r >= 0 ? e[r | 1] = t : (r = ~r, It(e, r, n, t)), r; }
function zr(e, n) { let t = ln(e, n); if (t >= 0)
    return e[t | 1]; }
function ln(e, n) { return Et(e, n, 1); }
function Et(e, n, t) { let r = 0, o = e.length >> t; for (; o !== r;) {
    let i = r + (o - r >> 1), s = e[i << t];
    if (n === s)
        return i << t;
    s > n ? o = i : r = i + 1;
} return ~(o << t); }
var eo = {}, H = [], Q = new p(""), fn = new p("", -1), gn = new p(""), G = class {
    get(n, t = N) { if (t === N) {
        let o = cn("", -201);
        throw o.name = "\u0275NotFound", o;
    } return t; }
};
function hn(e) { return { \u0275providers: e }; }
function Tt(e) { return hn([{ provide: Q, multi: !0, useValue: e }]); }
function wt(...e) { return { \u0275providers: Nt(!0, e), \u0275fromNgModule: !0 }; }
function Nt(e, ...n) { let t = [], r = new Set, o, i = s => { t.push(s); }; return Ee(n, s => { let l = s; ae(l, i, [], r) && (o ||= [], o.push(l)); }), o !== void 0 && pn(o, i), t; }
function pn(e, n) { for (let t = 0; t < e.length; t++) {
    let { ngModule: r, providers: o } = e[t];
    Te(o, i => { n(i, r); });
} }
function ae(e, n, t, r) { if (e = y(e), !e)
    return !1; let o = null, i = Ge(e), s = !i && un(e); if (!i && !s) {
    let u = e.ngModule;
    if (i = Ge(u), i)
        o = u;
    else
        return !1;
}
else {
    if (s && !s.standalone)
        return !1;
    o = e;
} let l = r.has(o); if (s) {
    if (l)
        return !1;
    if (r.add(o), s.dependencies) {
        let u = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
        for (let c of u)
            ae(c, n, t, r);
    }
}
else if (i) {
    if (i.imports != null && !l) {
        r.add(o);
        let c;
        Ee(i.imports, v => { ae(v, n, t, r) && (c ||= [], c.push(v)); }), c !== void 0 && pn(c, n);
    }
    if (!l) {
        let c = q(o) || (() => new o);
        n({ provide: o, useFactory: c, deps: H }, o), n({ provide: gn, useValue: o, multi: !0 }, o), n({ provide: Q, useValue: () => x(o), multi: !0 }, o);
    }
    let u = i.providers;
    if (u != null && !l) {
        let c = e;
        Te(u, v => { n(v, c); });
    }
}
else
    return !1; return o !== e && e.providers !== void 0; }
function Te(e, n) { for (let t of e)
    sn(t) && (t = t.\u0275providers), Array.isArray(t) ? Te(t, n) : n(t); }
var Mt = d({ provide: String, useValue: d });
function mn(e) { return e !== null && typeof e == "object" && Mt in e; }
function bt(e) { return !!(e && e.useExisting); }
function _t(e) { return !!(e && e.useFactory); }
function ce(e) { return typeof e == "function"; }
function no(e) { return !!e.useClass; }
var Ct = new p(""), V = {}, Ye = {}, te;
function vn() { return te === void 0 && (te = new G), te; }
var k = class {
}, Z = class extends k {
    parent;
    source;
    scopes;
    records = new Map;
    _ngOnDestroyHooks = new Set;
    _onDestroyHooks = [];
    get destroyed() { return this._destroyed; }
    _destroyed = !1;
    injectorDefTypes;
    constructor(n, t, r, o) { super(), this.parent = t, this.source = r, this.scopes = o, le(n, s => this.processProvider(s)), this.records.set(fn, _(void 0, this)), o.has("environment") && this.records.set(k, _(void 0, this)); let i = this.records.get(Ct); i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(gn, H, { self: !0 })); }
    retrieve(n, t) { let r = $(t) || 0; try {
        return this.get(n, N, r);
    }
    catch (o) {
        if (R(o))
            return o;
        throw o;
    } }
    destroy() { j(this), this._destroyed = !0; let n = h(null); try {
        for (let r of this._ngOnDestroyHooks)
            r.ngOnDestroy();
        let t = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of t)
            r();
    }
    finally {
        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), h(n);
    } }
    onDestroy(n) { return j(this), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n); }
    runInContext(n) { j(this); let t = E(this), r = T(void 0), o; try {
        return n();
    }
    finally {
        E(t), T(r);
    } }
    get(n, t = N, r) { if (j(this), n.hasOwnProperty(We))
        return n[We](this); let o = $(r), i, s = E(this), l = T(void 0); try {
        if (!(o & 4)) {
            let c = this.records.get(n);
            if (c === void 0) {
                let v = Ot(n) && Y(n);
                v && this.injectableDefInScope(v) ? c = _(de(n), V) : c = null, this.records.set(n, c);
            }
            if (c != null)
                return this.hydrate(n, c, o);
        }
        let u = o & 2 ? vn() : this.parent;
        return t = o & 8 && t === N ? null : t, u.get(n, t);
    }
    catch (u) {
        let c = ht(u);
        throw c === -200 || c === -201 ? new f(c, null) : u;
    }
    finally {
        T(l), E(s);
    } }
    resolveInjectorInitializers() { let n = h(null), t = E(this), r = T(void 0), o; try {
        let i = this.get(Q, H, { self: !0 });
        for (let s of i)
            s();
    }
    finally {
        E(t), T(r), h(n);
    } }
    toString() { return "R3Injector[...]"; }
    processProvider(n) { n = y(n); let t = ce(n) ? n : y(n && n.provide), r = Ft(n); if (!ce(n) && n.multi === !0) {
        let o = this.records.get(t);
        o || (o = _(void 0, V, !0), o.factory = () => ue(o.multi), this.records.set(t, o)), t = n, o.multi.push(n);
    } this.records.set(t, r); }
    hydrate(n, t, r) { let o = h(null); try {
        if (t.value === Ye)
            throw ft("");
        return t.value === V && (t.value = Ye, t.value = t.factory(void 0, r)), typeof t.value == "object" && t.value && kt(t.value) && this._ngOnDestroyHooks.add(t.value), t.value;
    }
    finally {
        h(o);
    } }
    injectableDefInScope(n) { if (!n.providedIn)
        return !1; let t = y(n.providedIn); return typeof t == "string" ? t === "any" || this.scopes.has(t) : this.injectorDefTypes.has(t); }
    removeOnDestroy(n) { let t = this._onDestroyHooks.indexOf(n); t !== -1 && this._onDestroyHooks.splice(t, 1); }
};
function de(e) { let n = Y(e), t = n !== null ? n.factory : q(e); if (t !== null)
    return t; if (e instanceof p)
    throw new f(-204, !1); if (e instanceof Function)
    return xt(e); throw new f(-204, !1); }
function xt(e) { if (e.length > 0)
    throw new f(-204, !1); let t = nt(e); return t !== null ? () => t.factory(e) : () => new e; }
function Ft(e) { if (mn(e))
    return _(void 0, e.useValue); {
    let n = Rt(e);
    return _(n, V);
} }
function Rt(e, n, t) { let r; if (ce(e)) {
    let o = y(e);
    return q(o) || de(o);
}
else if (mn(e))
    r = () => y(e.useValue);
else if (_t(e))
    r = () => e.useFactory(...ue(e.deps || []));
else if (bt(e))
    r = (o, i) => x(y(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
else {
    let o = y(e && (e.useClass || e.provide));
    if (jt(e))
        r = () => new o(...ue(e.deps));
    else
        return q(o) || de(o);
} return r; }
function j(e) { if (e.destroyed)
    throw new f(-205, !1); }
function _(e, n, t = !1) { return { factory: e, value: n, multi: t ? [] : void 0 }; }
function jt(e) { return !!e.deps; }
function kt(e) { return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"; }
function Ot(e) { return typeof e == "function" || typeof e == "object" && e.ngMetadataName === "InjectionToken"; }
function le(e, n) { for (let t of e)
    Array.isArray(t) ? le(t, n) : t && sn(t) ? le(t.\u0275providers, n) : n(t); }
function to(e, n) { let t; e instanceof Z ? (j(e), t = e) : t = new se(e); let r, o = E(t), i = T(void 0); try {
    return n();
}
finally {
    E(o), T(i);
} }
function yn() { return dn() !== void 0 || ee() != null; }
function ro(e) { if (!yn())
    throw new f(-203, !1); }
var we = 0, Dn = 1, m = 2, fe = 3, oo = 4, St = 5, io = 6, Pt = 7, In = 8, so = 9, En = 10, uo = 11, ao = 12, co = 13, Tn = 14, lo = 15, fo = 16, Lt = 17, go = 18, ho = 19, po = 20, C = 21, mo = 22, ge = 23, At = 24, vo = 25, yo = 26, Do = 27, Ne = 1, Io = 6, Eo = 7, To = 8, wo = 9, No = 10;
function Vt(e) { return Array.isArray(e) && typeof e[Ne] == "object"; }
function wn(e) { return Array.isArray(e) && e[Ne] === !0; }
function Mo(e) { return (e.flags & 4) !== 0; }
function bo(e) { return e.componentOffset > -1; }
function _o(e) { return (e.flags & 1) === 1; }
function Co(e) { return !!e.template; }
function xo(e) { return (e[m] & 512) !== 0; }
function Fo(e) { return (e.type & 16) === 16; }
function Ro(e) { return (e[m] & 32) === 32; }
function Nn(e) { return (e[m] & 256) === 256; }
var $t = "svg", qt = "math";
function Me(e) { for (; Array.isArray(e);)
    e = e[we]; return e; }
function jo(e) { for (; Array.isArray(e);) {
    if (typeof e[Ne] == "object")
        return e;
    e = e[we];
} return null; }
function ko(e, n) { return Me(n[e]); }
function Oo(e, n) { return Me(n[e.index]); }
function So(e, n) { let t = e === null ? -1 : e.index; return t !== -1 ? Me(n[t]) : null; }
function Ht(e, n) { return e.data[n]; }
function Po(e, n) { return e[n]; }
function Lo(e, n, t, r) { t >= e.data.length && (e.data[t] = null, e.blueprint[t] = null), n[t] = r; }
function Ao(e, n) { let t = n[e]; return Vt(t) ? t : t[we]; }
function Vo(e) { return (e[m] & 4) === 4; }
function Mn(e) { return (e[m] & 128) === 128; }
function $o(e) { return wn(e[fe]); }
function qo(e, n) { return n == null ? null : e[n]; }
function Ho(e) { e[Lt] = 0; }
function Go(e) { e[m] & 1024 || (e[m] |= 1024, Mn(e) && be(e)); }
function Gt(e, n) { for (; e > 0;)
    n = n[Tn], e--; return n; }
function Zt(e) { return !!(e[m] & 9216 || e[At]?.dirty); }
function Zo(e) { e[En].changeDetectionScheduler?.notify(8), e[m] & 64 && (e[m] |= 1024), Zt(e) && be(e); }
function be(e) { e[En].changeDetectionScheduler?.notify(0); let n = Je(e); for (; n !== null && !(n[m] & 8192 || (n[m] |= 8192, !Mn(n)));)
    n = Je(n); }
function Bt(e, n) { if (Nn(e))
    throw new f(911, !1); e[C] === null && (e[C] = []), e[C].push(n); }
function Ut(e, n) { if (e[C] === null)
    return; let t = e[C].indexOf(n); t !== -1 && e[C].splice(t, 1); }
function Je(e) { let n = e[fe]; return wn(n) ? n[fe] : n; }
function Wt(e) { return e[Pt] ??= []; }
function Yt(e) { return e.cleanup ??= []; }
function Bo(e, n, t, r) { let o = Wt(n); o.push(t), e.firstCreatePass && Yt(e).push(r, o.length - 1); }
var a = { lFrame: Cn(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var he = !1;
function Uo() { return a.lFrame.elementDepthCount; }
function Wo() { a.lFrame.elementDepthCount++; }
function Yo() { a.lFrame.elementDepthCount--; }
function Jo() { return a.bindingsEnabled; }
function Qo() { return a.skipHydrationRootTNode !== null; }
function Ko(e) { return a.skipHydrationRootTNode === e; }
function Xo() { a.bindingsEnabled = !0; }
function zo(e) { a.skipHydrationRootTNode = e; }
function ei() { a.bindingsEnabled = !1; }
function ni() { a.skipHydrationRootTNode = null; }
function bn() { return a.lFrame.lView; }
function ti() { return a.lFrame.tView; }
function ri(e) { return a.lFrame.contextLView = e, e[In]; }
function oi(e) { return a.lFrame.contextLView = null, e; }
function Jt() { let e = Qt(); for (; e !== null && e.type === 64;)
    e = e.parent; return e; }
function Qt() { return a.lFrame.currentTNode; }
function ii() { let e = a.lFrame, n = e.currentTNode; return e.isParent ? n : n.parent; }
function si(e, n) { let t = a.lFrame; t.currentTNode = e, t.isParent = n; }
function ui() { return a.lFrame.isParent; }
function ai() { a.lFrame.isParent = !1; }
function ci() { return a.lFrame.contextLView; }
function di() { return he; }
function Qe(e) { let n = he; return he = e, n; }
function li() { let e = a.lFrame, n = e.bindingRootIndex; return n === -1 && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n; }
function fi() { return a.lFrame.bindingIndex; }
function gi(e) { return a.lFrame.bindingIndex = e; }
function hi() { return a.lFrame.bindingIndex++; }
function pi(e) { let n = a.lFrame, t = n.bindingIndex; return n.bindingIndex = n.bindingIndex + e, t; }
function mi() { return a.lFrame.inI18n; }
function vi(e) { a.lFrame.inI18n = e; }
function yi(e, n) { let t = a.lFrame; t.bindingIndex = t.bindingRootIndex = e, Kt(n); }
function Di() { return a.lFrame.currentDirectiveIndex; }
function Kt(e) { a.lFrame.currentDirectiveIndex = e; }
function Ii(e) { let n = a.lFrame.currentDirectiveIndex; return n === -1 ? null : e[n]; }
function Ei() { return a.lFrame.currentQueryIndex; }
function Ti(e) { a.lFrame.currentQueryIndex = e; }
function Xt(e) { let n = e[Dn]; return n.type === 2 ? n.declTNode : n.type === 1 ? e[St] : null; }
function wi(e, n, t) { if (t & 4) {
    let o = n, i = e;
    for (; o = o.parent, o === null && !(t & 1);)
        if (o = Xt(i), o === null || (i = i[Tn], o.type & 10))
            break;
    if (o === null)
        return !1;
    n = o, e = i;
} let r = a.lFrame = _n(); return r.currentTNode = n, r.lView = e, !0; }
function Ni(e) { let n = _n(), t = e[Dn]; a.lFrame = n, n.currentTNode = t.firstChild, n.lView = e, n.tView = t, n.contextLView = e, n.bindingIndex = t.bindingStartIndex, n.inI18n = !1; }
function _n() { let e = a.lFrame, n = e === null ? null : e.child; return n === null ? Cn(e) : n; }
function Cn(e) { let n = { currentTNode: null, isParent: !0, lView: null, tView: null, selectedIndex: -1, contextLView: null, elementDepthCount: 0, currentNamespace: null, currentDirectiveIndex: -1, bindingRootIndex: -1, bindingIndex: -1, currentQueryIndex: 0, parent: e, child: null, inI18n: !1 }; return e !== null && (e.child = n), n; }
function xn() { let e = a.lFrame; return a.lFrame = e.parent, e.currentTNode = null, e.lView = null, e; }
var Mi = xn;
function bi() { let e = xn(); e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0; }
function _i(e) { return (a.lFrame.contextLView = Gt(e, a.lFrame.contextLView))[In]; }
function Ci() { return a.lFrame.selectedIndex; }
function xi(e) { a.lFrame.selectedIndex = e; }
function Fi() { let e = a.lFrame; return Ht(e.tView, e.selectedIndex); }
function Ri() { a.lFrame.currentNamespace = $t; }
function ji() { a.lFrame.currentNamespace = qt; }
function ki() { zt(); }
function zt() { a.lFrame.currentNamespace = null; }
function Oi() { return a.lFrame.currentNamespace; }
var Fn = !0;
function Si() { return Fn; }
function Pi(e) { Fn = e; }
function Ke(e, n = null, t = null, r) { let o = er(e, n, t, r); return o.resolveInjectorInitializers(), o; }
function er(e, n = null, t = null, r, o = new Set) { let i = [t || H, wt(e)], s; return new Z(i, n || vn(), s || null, o); }
var O = class e {
    static THROW_IF_NOT_FOUND = N;
    static NULL = new G;
    static create(n, t) { if (Array.isArray(n))
        return Ke({ name: "" }, t, n, ""); {
        let r = n.name ?? "";
        return Ke({ name: r }, n.parent, n.providers, r);
    } }
    static \u0275prov = S({ token: e, providedIn: "any", factory: () => x(fn) });
    static __NG_ELEMENT_ID__ = -1;
}, nr = new p(""), M = (() => { class e {
    static __NG_ELEMENT_ID__ = tr;
    static __NG_ENV_ID__ = t => t;
} return e; })(), B = class extends M {
    _lView;
    constructor(n) { super(), this._lView = n; }
    get destroyed() { return Nn(this._lView); }
    onDestroy(n) { let t = this._lView; return Bt(t, n), () => Ut(t, n); }
};
function tr() { return new B(bn()); }
var rr = !1, or = new p(""), Rn = (() => { class e {
    taskId = 0;
    pendingTasks = new Set;
    destroyed = !1;
    pendingTask = new Bn(!1);
    debugTaskTracker = g(or, { optional: !0 });
    get hasPendingTasks() { return this.destroyed ? !1 : this.pendingTask.value; }
    get hasPendingTasksObservable() { return this.destroyed ? new Un(t => { t.next(!1), t.complete(); }) : this.pendingTask; }
    add() { !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0); let t = this.taskId++; return this.pendingTasks.add(t), this.debugTaskTracker?.add(t), t; }
    has(t) { return this.pendingTasks.has(t); }
    remove(t) { this.pendingTasks.delete(t), this.debugTaskTracker?.remove(t), this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1); }
    ngOnDestroy() { this.pendingTasks.clear(), this.hasPendingTasks && this.pendingTask.next(!1), this.destroyed = !0, this.pendingTask.unsubscribe(); }
    static \u0275prov = S({ token: e, providedIn: "root", factory: () => new e });
} return e; })(), pe = class extends Wn {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(n = !1) { super(), this.__isAsync = n, yn() && (this.destroyRef = g(M, { optional: !0 }) ?? void 0, this.pendingTasks = g(Rn, { optional: !0 }) ?? void 0); }
    emit(n) { let t = h(null); try {
        super.next(n);
    }
    finally {
        h(t);
    } }
    subscribe(n, t, r) { let o = n, i = t || (() => null), s = r; if (n && typeof n == "object") {
        let u = n;
        o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u);
    } this.__isAsync && (i = this.wrapInTimeout(i), o && (o = this.wrapInTimeout(o)), s && (s = this.wrapInTimeout(s))); let l = super.subscribe({ next: o, error: i, complete: s }); return n instanceof Yn && n.add(l), l; }
    wrapInTimeout(n) { return t => { let r = this.pendingTasks?.add(); setTimeout(() => { try {
        n(t);
    }
    finally {
        r !== void 0 && this.pendingTasks?.remove(r);
    } }); }; }
}, w = pe;
function U(...e) { }
function ir(e) { let n, t; function r() { e = U; try {
    t !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(t), n !== void 0 && clearTimeout(n);
}
catch { } } return n = setTimeout(() => { e(), r(); }), typeof requestAnimationFrame == "function" && (t = requestAnimationFrame(() => { e(), r(); })), () => r(); }
function Li(e) { return queueMicrotask(() => e()), () => { e = U; }; }
var _e = "isAngularZone", Xe = _e + "_ID", sr = 0, me = class e {
    hasPendingMacrotasks = !1;
    hasPendingMicrotasks = !1;
    isStable = !0;
    onUnstable = new w(!1);
    onMicrotaskEmpty = new w(!1);
    onStable = new w(!1);
    onError = new w(!1);
    constructor(n) { let { enableLongStackTrace: t = !1, shouldCoalesceEventChangeDetection: r = !1, shouldCoalesceRunChangeDetection: o = !1, scheduleInRootZone: i = rr } = n; if (typeof Zone > "u")
        throw new f(908, !1); Zone.assertZonePatched(); let s = this; s._nesting = 0, s._outer = s._inner = Zone.current, Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)), s.shouldCoalesceEventChangeDetection = !o && r, s.shouldCoalesceRunChangeDetection = o, s.callbackScheduled = !1, s.scheduleInRootZone = i, cr(s); }
    static isInAngularZone() { return typeof Zone < "u" && Zone.current.get(_e) === !0; }
    static assertInAngularZone() { if (!e.isInAngularZone())
        throw new f(909, !1); }
    static assertNotInAngularZone() { if (e.isInAngularZone())
        throw new f(909, !1); }
    run(n, t, r) { return this._inner.run(n, t, r); }
    runTask(n, t, r, o) { let i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + o, n, ur, U, U); try {
        return i.runTask(s, t, r);
    }
    finally {
        i.cancelTask(s);
    } }
    runGuarded(n, t, r) { return this._inner.runGuarded(n, t, r); }
    runOutsideAngular(n) { return this._outer.run(n); }
}, ur = {};
function Ce(e) { if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
        e._nesting++, e.onMicrotaskEmpty.emit(null);
    }
    finally {
        if (e._nesting--, !e.hasPendingMicrotasks)
            try {
                e.runOutsideAngular(() => e.onStable.emit(null));
            }
            finally {
                e.isStable = !0;
            }
    } }
function ar(e) { if (e.isCheckStableRunning || e.callbackScheduled)
    return; e.callbackScheduled = !0; function n() { ir(() => { e.callbackScheduled = !1, ve(e), e.isCheckStableRunning = !0, Ce(e), e.isCheckStableRunning = !1; }); } e.scheduleInRootZone ? Zone.root.run(() => { n(); }) : e._outer.run(() => { n(); }), ve(e); }
function cr(e) { let n = () => { ar(e); }, t = sr++; e._inner = e._inner.fork({ name: "angular", properties: { [_e]: !0, [Xe]: t, [Xe + t]: !0 }, onInvokeTask: (r, o, i, s, l, u) => { if (dr(u))
        return r.invokeTask(i, s, l, u); try {
        return ze(e), r.invokeTask(i, s, l, u);
    }
    finally {
        (e.shouldCoalesceEventChangeDetection && s.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && n(), en(e);
    } }, onInvoke: (r, o, i, s, l, u, c) => { try {
        return ze(e), r.invoke(i, s, l, u, c);
    }
    finally {
        e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !lr(u) && n(), en(e);
    } }, onHasTask: (r, o, i, s) => { r.hasTask(i, s), o === i && (s.change == "microTask" ? (e._hasPendingMicrotasks = s.microTask, ve(e), Ce(e)) : s.change == "macroTask" && (e.hasPendingMacrotasks = s.macroTask)); }, onHandleError: (r, o, i, s) => (r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1) }); }
function ve(e) { e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1; }
function ze(e) { e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null)); }
function en(e) { e._nesting--, Ce(e); }
var nn = class {
    hasPendingMicrotasks = !1;
    hasPendingMacrotasks = !1;
    isStable = !0;
    onUnstable = new w;
    onMicrotaskEmpty = new w;
    onStable = new w;
    onError = new w;
    run(n, t, r) { return n.apply(t, r); }
    runGuarded(n, t, r) { return n.apply(t, r); }
    runOutsideAngular(n) { return n(); }
    runTask(n, t, r, o) { return n.apply(t, r); }
};
function dr(e) { return jn(e, "__ignore_ng_zone__"); }
function lr(e) { return jn(e, "__scheduler_tick__"); }
function jn(e, n) { return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[n] === !0; }
var F = class {
    _console = console;
    handleError(n) { this._console.error("ERROR", n); }
}, kn = new p("", { factory: () => { let e = g(me), n = g(k), t; return r => { e.runOutsideAngular(() => { n.destroyed && !t ? setTimeout(() => { throw r; }) : (t ??= n.get(F), t.handleError(r)); }); }; } }), Ai = { provide: Q, useValue: () => { let e = g(F, { optional: !0 }); }, multi: !0 }, fr = new p("", { factory: () => { if (typeof ngServerMode < "u" && ngServerMode)
        return; let e = g(nr).defaultView; if (!e)
        return; let n = g(kn), t = i => { n(i.reason), i.preventDefault(); }, r = i => { i.error ? n(i.error) : n(new Error(i.message, { cause: i })), i.preventDefault(); }, o = () => { e.addEventListener("unhandledrejection", t), e.addEventListener("error", r); }; typeof Zone < "u" ? Zone.root.run(o) : o(), g(M).onDestroy(() => { e.removeEventListener("error", r), e.removeEventListener("unhandledrejection", t); }); } });
function Vi() { return hn([Tt(() => { g(fr); })]); }
function $i(e) { return null; }
function P(e, n) { let [t, r, o] = Pe(e, n?.equal), i = t, s = i[I]; return i.set = r, i.update = o, i.asReadonly = K.bind(i), i; }
function K() { let e = this[I]; if (e.readonlyFn === void 0) {
    let n = () => this();
    n[I] = e, e.readonlyFn = n;
} return e.readonlyFn; }
function qi(e, n) { if (Oe() !== null)
    throw new f(-602, !1); }
var On = (() => { class e {
    view;
    node;
    constructor(t, r) { this.view = t, this.node = r; }
    static __NG_ELEMENT_ID__ = gr;
} return e; })();
function gr() { return new On(bn(), Jt()); }
var W = class {
}, Hi = new p("", { factory: () => !0 }), Gi = new p("", { factory: () => !1 }), Zi = new p(""), Sn = (() => { class e {
    internalPendingTasks = g(Rn);
    scheduler = g(W);
    errorHandler = g(kn);
    add() { let t = this.internalPendingTasks.add(); return () => { this.internalPendingTasks.has(t) && (this.scheduler.notify(11), this.internalPendingTasks.remove(t)); }; }
    run(t) { let r = this.add(); t().catch(this.errorHandler).finally(r); }
    static \u0275prov = S({ token: e, providedIn: "root", factory: () => new e });
} return e; })(), hr = (() => { class e {
    static \u0275prov = S({ token: e, providedIn: "root", factory: () => new ye });
} return e; })(), ye = class {
    dirtyEffectCount = 0;
    queues = new Map;
    add(n) { this.enqueue(n), this.schedule(n); }
    schedule(n) { n.dirty && this.dirtyEffectCount++; }
    remove(n) { let t = n.zone, r = this.queues.get(t); r.has(n) && (r.delete(n), n.dirty && this.dirtyEffectCount--); }
    enqueue(n) { let t = n.zone; this.queues.has(t) || this.queues.set(t, new Set); let r = this.queues.get(t); r.has(n) || r.add(n); }
    flush() { for (; this.dirtyEffectCount > 0;) {
        let n = !1;
        for (let [t, r] of this.queues)
            t === null ? n ||= this.flushQueue(r) : n ||= t.run(() => this.flushQueue(r));
        n || (this.dirtyEffectCount = 0);
    } }
    flushQueue(n) { let t = !1; for (let r of n)
        r.dirty && (this.dirtyEffectCount--, t = !0, r.run()); return t; }
}, De = class {
    [I];
    constructor(n) { this[I] = n; }
    destroy() { this[I].destroy(); }
};
function Pn(e, n) { let t = n?.injector ?? g(O), r = n?.manualCleanup !== !0 ? t.get(M) : null, o, i = t.get(On, null, { optional: !0 }), s = t.get(W); return i !== null ? (o = vr(i.view, s, e), r instanceof B && r._lView === i.view && (r = null)) : o = yr(e, t.get(hr), s), o.injector = t, r !== null && (o.onDestroyFns = [r.onDestroy(() => o.destroy())]), new De(o); }
var Ln = A(L({}, Le), { cleanupFns: void 0, zone: null, onDestroyFns: null, run() { let e = Qe(!1); try {
        Ae(this);
    }
    finally {
        Qe(e);
    } }, cleanup() { if (!this.cleanupFns?.length)
        return; let e = h(null); try {
        for (; this.cleanupFns.length;)
            this.cleanupFns.pop()();
    }
    finally {
        this.cleanupFns = [], h(e);
    } } }), pr = A(L({}, Ln), { consumerMarkedDirty() { this.scheduler.schedule(this), this.notifier.notify(12); }, destroy() { if (z(this), this.onDestroyFns !== null)
        for (let e of this.onDestroyFns)
            e(); this.cleanup(), this.scheduler.remove(this); } }), mr = A(L({}, Ln), { consumerMarkedDirty() { this.view[m] |= 8192, be(this.view), this.notifier.notify(13); }, destroy() { if (z(this), this.onDestroyFns !== null)
        for (let e of this.onDestroyFns)
            e(); this.cleanup(), this.view[ge]?.delete(this); } });
function vr(e, n, t) { let r = Object.create(mr); return r.view = e, r.zone = typeof Zone < "u" ? Zone.current : null, r.notifier = n, r.fn = An(r, t), e[ge] ??= new Set, e[ge].add(r), r.consumerMarkedDirty(r), r; }
function yr(e, n, t) { let r = Object.create(pr); return r.fn = An(r, e), r.scheduler = n, r.notifier = t, r.zone = typeof Zone < "u" ? Zone.current : null, r.scheduler.add(r), r.notifier.notify(12), r; }
function An(e, n) { return () => { n(t => (e.cleanupFns ??= []).push(t)); }; }
var Vn = class {
    destroyed = !1;
    listeners = null;
    errorHandler = g(F, { optional: !0 });
    destroyRef = g(M);
    constructor() { this.destroyRef.onDestroy(() => { this.destroyed = !0, this.listeners = null; }); }
    subscribe(n) { if (this.destroyed)
        throw new f(953, !1); return (this.listeners ??= []).push(n), { unsubscribe: () => { let t = this.listeners?.indexOf(n); t !== void 0 && t !== -1 && this.listeners?.splice(t, 1); } }; }
    emit(n) { if (this.destroyed) {
        console.warn(Ie(953, !1));
        return;
    } if (this.listeners === null)
        return; let t = h(null); try {
        for (let r of this.listeners)
            try {
                r(n);
            }
            catch (o) {
                this.errorHandler?.handleError(o);
            }
    }
    finally {
        h(t);
    } }
};
function Ki(e) { return e.destroyRef; }
function D(e) { return qe(e); }
function b(e, n) { return Se(e, n?.equal); }
var Dr = e => e;
function $n(e, n) { if (typeof e == "function") {
    let t = ne(e, Dr, n?.equal);
    return qn(t, n?.debugName);
}
else {
    let t = ne(e.source, e.computation, e.equal);
    return qn(t, e.debugName);
} }
function qn(e, n) { let t = e[I], r = e; return r.set = o => Ve(t, o), r.update = o => $e(t, o), r.asReadonly = K.bind(e), r; }
function Xi(e) { let n = e.request, t = e.params ?? n ?? (() => null); return new Fe(t, Er(e), e.defaultValue, e.equal ? Ir(e.equal) : void 0, e.debugName, e.injector ?? g(O)); }
var xe = class {
    value;
    isLoading;
    constructor(n, t) { this.value = n, this.value.set = this.set.bind(this), this.value.update = this.update.bind(this), this.value.asReadonly = K, this.isLoading = b(() => this.status() === "loading" || this.status() === "reloading", void 0); }
    isError = b(() => this.status() === "error");
    update(n) { this.set(n(D(this.value))); }
    isValueDefined = b(() => this.isError() ? !1 : this.value() !== void 0);
    _snapshot;
    get snapshot() { return this._snapshot ??= b(() => { let n = this.status(); return n === "error" ? { status: "error", error: this.error() } : { status: n, value: this.value() }; }); }
    hasValue() { return this.isValueDefined(); }
    asReadonly() { return this; }
}, Fe = class extends xe {
    loaderFn;
    equal;
    debugName;
    pendingTasks;
    state;
    extRequest;
    effectRef;
    pendingController;
    resolvePendingTask = void 0;
    destroyed = !1;
    unregisterOnDestroy;
    status;
    error;
    constructor(n, t, r, o, i, s, l) { super(b(() => { let u = this.state().stream?.(); if (!u || this.state().status === "loading" && this.error())
        return r; if (!Re(u))
        throw new je(this.error()); return u.value; }, { equal: o }), i), this.loaderFn = t, this.equal = o, this.debugName = i, this.extRequest = $n({ source: n, computation: u => ({ request: u, reload: 0 }) }), this.state = $n({ source: this.extRequest, computation: (u, c) => { if (c) {
            let v = u.request === void 0 ? "idle" : "loading";
            return { extRequest: u, status: v, previousStatus: Hn(c.value), stream: c.value.extRequest.request === u.request ? c.value.stream : void 0 };
        }
        else {
            let v = l?.(u.request);
            l = void 0;
            let Zn = u.request === void 0 ? "idle" : v ? "resolved" : "loading";
            return { extRequest: u, status: Zn, previousStatus: "idle", stream: v };
        } } }), this.effectRef = Pn(this.loadEffect.bind(this), { injector: s, manualCleanup: !0 }), this.pendingTasks = s.get(Sn), this.unregisterOnDestroy = s.get(M).onDestroy(() => this.destroy()), this.status = b(() => Hn(this.state()), void 0), this.error = b(() => { let u = this.state().stream?.(); return u && !Re(u) ? u.error : void 0; }, void 0); }
    set(n) { if (this.destroyed)
        return; let t = D(this.error), r = D(this.state); if (!t) {
        let o = D(this.value);
        if (r.status === "local" && (this.equal ? this.equal(o, n) : o === n))
            return;
    } this.state.set({ extRequest: r.extRequest, status: "local", previousStatus: "local", stream: P({ value: n }, void 0) }), this.abortInProgressLoad(); }
    reload() { let { status: n } = D(this.state); return n === "idle" || n === "loading" ? !1 : (this.extRequest.update(({ request: t, reload: r }) => ({ request: t, reload: r + 1 })), !0); }
    destroy() { this.destroyed = !0, this.unregisterOnDestroy(), this.effectRef.destroy(), this.abortInProgressLoad(), this.state.set({ extRequest: { request: void 0, reload: 0 }, status: "idle", previousStatus: "idle", stream: void 0 }); }
    loadEffect() { return X(this, null, function* () { let n = this.extRequest(), { status: t, previousStatus: r } = D(this.state); if (n.request === void 0)
        return; if (t !== "loading")
        return; this.abortInProgressLoad(); let o = this.resolvePendingTask = this.pendingTasks.add(), { signal: i } = this.pendingController = new AbortController; try {
        let s = yield D(() => this.loaderFn({ params: n.request, abortSignal: i, previous: { status: r } }));
        if (i.aborted || D(this.extRequest) !== n)
            return;
        this.state.set({ extRequest: n, status: "resolved", previousStatus: "resolved", stream: s });
    }
    catch (s) {
        if (i.aborted || D(this.extRequest) !== n)
            return;
        this.state.set({ extRequest: n, status: "resolved", previousStatus: "error", stream: P({ error: Gn(s) }, void 0) });
    }
    finally {
        o?.(), o = void 0;
    } }); }
    abortInProgressLoad() { D(() => this.pendingController?.abort()), this.pendingController = void 0, this.resolvePendingTask?.(), this.resolvePendingTask = void 0; }
};
function Ir(e) { return (n, t) => n === void 0 || t === void 0 ? n === t : e(n, t); }
function Er(e) { return Tr(e) ? e.stream : n => X(null, null, function* () { try {
    return P({ value: yield e.loader(n) }, void 0);
}
catch (t) {
    return P({ error: Gn(t) }, void 0);
} }); }
function Tr(e) { return !!e.stream; }
function Hn(e) { switch (e.status) {
    case "loading": return e.extRequest.reload === 0 ? "loading" : "reloading";
    case "resolved": return Re(e.stream()) ? "resolved" : "error";
    default: return e.status;
} }
function Re(e) { return e.error === void 0; }
function Gn(e) { return wr(e) ? e : new ke(e); }
function wr(e) { return e instanceof Error || typeof e == "object" && typeof e.name == "string" && typeof e.message == "string"; }
var je = class extends Error {
    constructor(n) { super(n.message, { cause: n }); }
}, ke = class extends Error {
    constructor(n) { super(String(n), { cause: n }); }
};
export { re as a, He as b, Jn as c, Rr as d, f as e, Ie as f, jr as g, d as h, kr as i, Kn as j, Or as k, Sr as l, tn as m, y as n, zn as o, Pr as p, S as q, Lr as r, Y as s, Ar as t, on as u, Ze as v, p as w, Vr as x, sn as y, tt as z, rt as A, ot as B, it as C, Ue as D, $r as E, st as F, qr as G, un as H, ut as I, at as J, Hr as K, ct as L, Gr as M, ft as N, gt as O, T as P, pt as Q, x as R, Zr as S, g as T, $ as U, Br as V, q as W, Ur as X, Wr as Y, Yr as Z, Jr as _, Qr as $, Kr as aa, It as ba, Xr as ca, zr as da, ln as ea, eo as fa, H as ga, Q as ha, fn as ia, hn as ja, Tt as ka, wt as la, Nt as ma, ce as na, no as oa, Ct as pa, vn as qa, k as ra, Z as sa, Rt as ta, to as ua, yn as va, ro as wa, we as xa, Dn as ya, m as za, fe as Aa, oo as Ba, St as Ca, io as Da, Pt as Ea, In as Fa, so as Ga, En as Ha, uo as Ia, ao as Ja, co as Ka, Tn as La, lo as Ma, fo as Na, Lt as Oa, go as Pa, ho as Qa, po as Ra, C as Sa, mo as Ta, ge as Ua, At as Va, vo as Wa, yo as Xa, Do as Ya, Io as Za, Eo as _a, To as $a, wo as ab, No as bb, Vt as cb, wn as db, Mo as eb, bo as fb, _o as gb, Co as hb, xo as ib, Fo as jb, Ro as kb, Nn as lb, $t as mb, qt as nb, Me as ob, jo as pb, ko as qb, Oo as rb, So as sb, Ht as tb, Po as ub, Lo as vb, Ao as wb, Vo as xb, Mn as yb, $o as zb, qo as Ab, Ho as Bb, Go as Cb, Gt as Db, Zt as Eb, Zo as Fb, be as Gb, Bt as Hb, Ut as Ib, Je as Jb, Wt as Kb, Yt as Lb, Bo as Mb, Uo as Nb, Wo as Ob, Yo as Pb, Jo as Qb, Qo as Rb, Ko as Sb, Xo as Tb, zo as Ub, ei as Vb, ni as Wb, bn as Xb, ti as Yb, ri as Zb, oi as _b, Jt as $b, Qt as ac, ii as bc, si as cc, ui as dc, ai as ec, ci as fc, di as gc, Qe as hc, li as ic, fi as jc, gi as kc, hi as lc, pi as mc, mi as nc, vi as oc, yi as pc, Di as qc, Kt as rc, Ii as sc, Ei as tc, Ti as uc, wi as vc, Ni as wc, Mi as xc, bi as yc, _i as zc, Ci as Ac, xi as Bc, Fi as Cc, Ri as Dc, ji as Ec, ki as Fc, Oi as Gc, Si as Hc, Pi as Ic, Ke as Jc, er as Kc, O as Lc, nr as Mc, M as Nc, rr as Oc, or as Pc, Rn as Qc, w as Rc, ir as Sc, Li as Tc, Xe as Uc, me as Vc, nn as Wc, F as Xc, kn as Yc, Ai as Zc, Vi as _c, $i as $c, P as ad, K as bd, qi as cd, On as dd, W as ed, Hi as fd, Gi as gd, Zi as hd, Sn as id, hr as jd, Pn as kd, Vn as ld, Ki as md, D as nd, b as od, $n as pd, Xi as qd, Fe as rd, Gn as sd, je as td };
/*! Bundled license information:

@angular/core/fesm2022/_effect-chunk2.mjs:
@angular/core/fesm2022/_resource-chunk.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
