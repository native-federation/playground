import { a as mi, c as fp, d as pp, e as hp, g as gp, h as mp, i as yp, j as vp, l as Ip, o as Ec } from "@nf-internal/chunk-VIIDHZJL";
import { $ as vo, $a as To, $b as T, $c as $C, A as qr, Aa as G, Ab as le, Ac as ie, B as Qr, Ba as ae, Bb as za, Bc as Dt, C as xa, Ca as ce, Cb as ri, Cc as Ee, D as ht, Da as re, Db as qf, Dc as lc, E as kt, Ea as Ot, Eb as wo, Ec as uc, F as hn, Fa as F, Fb as ii, Fc as dc, G as Zr, Ga as k, Gb as si, Gc as pi, H as W, Ha as Be, Hb as ai, Hc as bo, I as Te, Ia as C, Ib as Wa, Ic as Fe, J as Ve, Ja as yt, Jb as jt, Jc as jC, K as mo, Ka as Eo, Kb as Qf, Kc as ip, L as M, La as Do, Lb as Zf, Lc as De, M as Me, Ma as Y, Mb as Yf, Mc as Vt, N as kf, Na as vt, Nb as Kf, Nc as Ao, O as Oa, Oa as mn, Ob as Jf, Oc as sp, P as xt, Pa as $e, Pb as Ga, Pc as ap, Q as xf, Qa as we, Qb as ci, Qc as Bt, R as Oe, Ra as Va, Rb as _o, Rc as VC, S as Yr, Sa as Ba, Sb as qa, Sc as cp, T as E, Ta as oi, Tb as Qa, Tc as lp, U as La, Ua as Co, Ub as Xf, Uc as fc, V as gn, Va as _e, Vb as Za, Vc as B, W as Kr, Wa as Lt, Wb as Ya, Wc as pc, X as Of, Xa as Ue, Xb as g, Xc as hc, Y as Le, Ya as I, Yb as N, Yc as $t, Z as Pa, Za as Ie, Zb as Ka, Zc as gc, _ as yo, _a as Pe, _b as Ja, _c as BC, a as SC, aa as Fa, ab as Pt, ac as ep, ad as mc, b as bC, ba as Lf, bb as H, bc as vn, bd as up, c as ba, ca as Io, cb as te, cc as We, cd as UC, d as $r, da as Jr, db as J, dc as Xa, dd as hi, e as w, ea as Xr, eb as $a, ec, ed as Ct, f as bf, fa as Ne, fb as he, fc as tc, fd as In, g as ve, ga as P, gb as yn, gc as nc, gd as zC, h as Aa, ha as gt, hb as Se, hc as oc, hd as gi, i as Af, ia as LC, ib as ze, ic as ue, id as yc, j as Ur, ja as et, jb as Ua, jc as Ge, jd as vc, k as zr, ka as PC, kb as Vf, kc as rc, kd as WC, l as AC, la as FC, lb as It, lc as fe, ld as Ic, m as Ra, ma as Ha, mb as Bf, mc as qe, md as GC, n as z, na as ei, nb as $f, nc as tp, nd as qC, o as Wr, oa as Pf, ob as x, oc as ic, od as Ut, p as Rf, pa as Ff, pb as Mo, pc as np, pd as QC, q as V, qa as ti, qb as Ft, qc as op, qd as ZC, r as go, ra as mt, rb as ne, rc as sc, rd as YC, s as RC, sa as ja, sb as Uf, sc as li, sd as KC, t as kC, ta as Hf, tb as Ht, tc as ui, td as dp, u as Gr, ua as ni, ub as Et, uc as So, v as ka, va as jf, vb as No, vc as ac, w as _, wa as HC, wb as de, wc as di, x as xC, xa as j, xb as zf, xc as cc, y as OC, ya as m, yb as Wf, yc as fi, z as pn, za as A, zb as Gf, zc as rp } from "@nf-internal/chunk-ABVK3W5E";
import { b as wC } from "@nf-internal/chunk-RNDMTYF5";
import { B as _a, E as Sa, L as _C, a as Xe, b, c as wf, f as wa, g as jr, n as po, p as Vr, r as Br, s as ho, w as _f, x as Sf } from "@nf-internal/chunk-VSPXQRTJ";
import { a as Z, b as Je, c as pt } from "@nf-internal/chunk-2VMXMS7J";
import { Subject as Lh, Subscription as JC } from "rxjs";
import { map as XC } from "rxjs/operators";
function Ze(e) { return { toString: e }.toString(); }
var Dn = "__annotations__", Cn = "__parameters__", Tn = "__prop__metadata__";
function fr(e, t, n, o, r) { return Ze(() => { let i = Ql(t); function s(...a) { if (this instanceof s)
    return i.call(this, ...a), this; let c = new s(...a); return function (u) { return r && r(u, ...a), (u.hasOwnProperty(Dn) ? u[Dn] : Object.defineProperty(u, Dn, { value: [] })[Dn]).push(c), u; }; } return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = e, s.annotationCls = s, s; }); }
function Ql(e) { return function (...n) { if (e) {
    let o = e(...n);
    for (let r in o)
        this[r] = o[r];
} }; }
function zn(e, t, n) { return Ze(() => { let o = Ql(t); function r(...i) { if (this instanceof r)
    return o.apply(this, i), this; let s = new r(...i); return a.annotation = s, a; function a(c, l, u) { let d = c.hasOwnProperty(Cn) ? c[Cn] : Object.defineProperty(c, Cn, { value: [] })[Cn]; for (; d.length <= u;)
    d.push(null); return (d[u] = d[u] || []).push(s), c; } } return r.prototype.ngMetadataName = e, r.annotationCls = r, r; }); }
function st(e, t, n, o) { return Ze(() => { let r = Ql(t); function i(...s) { if (this instanceof i)
    return r.apply(this, s), this; let a = new i(...s); function c(l, u) { if (l === void 0)
    throw new Error("Standard Angular field decorators are not supported in JIT mode."); let d = l.constructor, f = d.hasOwnProperty(Tn) ? d[Tn] : Object.defineProperty(d, Tn, { value: {} })[Tn]; f[u] = f.hasOwnProperty(u) && f[u] || [], f[u].unshift(a); } return c; } return n && (i.prototype = Object.create(n.prototype)), i.prototype.ngMetadataName = e, i.annotationCls = i, i; }); }
var Ph = gn(zn("Inject", e => ({ token: e })), -1), Fh = gn(zn("Optional"), 8), Hh = gn(zn("Self"), 2), jh = gn(zn("SkipSelf"), 4), Vh = gn(zn("Host"), 1);
function ee(e) { let t = ve.ng; if (t && t.\u0275compilerFacade)
    return t.\u0275compilerFacade; throw new Error("JIT compiler unavailable"); }
var Ep = { \u0275\u0275defineInjectable: V, \u0275\u0275defineInjector: go, \u0275\u0275inject: Oe, \u0275\u0275invalidFactoryDep: Yr, resolveForwardRef: z }, Bh = Function;
function xo(e) { return typeof e == "function"; }
var eT = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*(arguments|(?:[^()]+\(\[\],)?[^()]+\(arguments\).*)\)/, tT = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/, nT = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/, oT = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{[^}]*super\(\.\.\.arguments\)/;
function rT(e) { return eT.test(e) || oT.test(e) || tT.test(e) && !nT.test(e); }
var Hi = class {
    _reflect;
    constructor(t) { this._reflect = t || ve.Reflect; }
    factory(t) { return (...n) => new t(...n); }
    _zipTypesAndAnnotations(t, n) { let o; typeof t > "u" ? o = vo(n.length) : o = vo(t.length); for (let r = 0; r < o.length; r++)
        typeof t > "u" ? o[r] = [] : t[r] && t[r] != Object ? o[r] = [t[r]] : o[r] = [], n && n[r] != null && (o[r] = o[r].concat(n[r])); return o; }
    _ownParameters(t, n) { let o = t.toString(); if (rT(o))
        return null; if (t.parameters && t.parameters !== n.parameters)
        return t.parameters; let r = t.ctorParameters; if (r && r !== n.ctorParameters) {
        let a = typeof r == "function" ? r() : r, c = a.map(u => u && u.type), l = a.map(u => u && Dc(u.decorators));
        return this._zipTypesAndAnnotations(c, l);
    } let i = t.hasOwnProperty(Cn) && t[Cn], s = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", t); return s || i ? this._zipTypesAndAnnotations(s, i) : vo(t.length); }
    parameters(t) { if (!xo(t))
        return []; let n = yi(t), o = this._ownParameters(t, n); return !o && n !== Object && (o = this.parameters(n)), o || []; }
    _ownAnnotations(t, n) { if (t.annotations && t.annotations !== n.annotations) {
        let o = t.annotations;
        return typeof o == "function" && o.annotations && (o = o.annotations), o;
    } return t.decorators && t.decorators !== n.decorators ? Dc(t.decorators) : t.hasOwnProperty(Dn) ? t[Dn] : null; }
    annotations(t) { if (!xo(t))
        return []; let n = yi(t), o = this._ownAnnotations(t, n) || []; return (n !== Object ? this.annotations(n) : []).concat(o); }
    _ownPropMetadata(t, n) { if (t.propMetadata && t.propMetadata !== n.propMetadata) {
        let o = t.propMetadata;
        return typeof o == "function" && o.propMetadata && (o = o.propMetadata), o;
    } if (t.propDecorators && t.propDecorators !== n.propDecorators) {
        let o = t.propDecorators, r = {};
        return Object.keys(o).forEach(i => { r[i] = Dc(o[i]); }), r;
    } return t.hasOwnProperty(Tn) ? t[Tn] : null; }
    propMetadata(t) { if (!xo(t))
        return {}; let n = yi(t), o = {}; if (n !== Object) {
        let i = this.propMetadata(n);
        Object.keys(i).forEach(s => { o[s] = i[s]; });
    } let r = this._ownPropMetadata(t, n); return r && Object.keys(r).forEach(i => { let s = []; o.hasOwnProperty(i) && s.push(...o[i]), s.push(...r[i]), o[i] = s; }), o; }
    ownPropMetadata(t) { return xo(t) ? this._ownPropMetadata(t, yi(t)) || {} : {}; }
    hasLifecycleHook(t, n) { return t instanceof Bh && n in t.prototype; }
};
function Dc(e) { return e ? e.map(t => { let o = t.type.annotationCls, r = t.args ? t.args : []; return new o(...r); }) : []; }
function yi(e) { let t = e.prototype ? Object.getPrototypeOf(e.prototype) : null; return (t ? t.constructor : null) || Object; }
function $h(e, t, n, o) { t !== null ? t.applyValueToInputSignal(t, o) : e[n] = o; }
var ji = class {
    previousValue;
    currentValue;
    firstChange;
    constructor(t, n, o) { this.previousValue = t, this.currentValue = n, this.firstChange = o; }
    isFirstChange() { return this.firstChange; }
}, Uh = (() => { let e = () => zh; return e.ngInherit = !0, e; })();
function zh(e) { return e.type.prototype.ngOnChanges && (e.setInput = sT), iT; }
function iT() { let e = Gh(this), t = e?.current; if (t) {
    let n = e.previous;
    if (n === Ne)
        e.previous = t;
    else
        for (let o in t)
            n[o] = t[o];
    e.current = null, this.ngOnChanges(t);
} }
function sT(e, t, n, o, r) { let i = this.declaredInputs[o], s = Gh(e) || aT(e, { previous: Ne, current: null }), a = s.current || (s.current = {}), c = s.previous, l = c[i]; a[i] = new ji(l && l.currentValue, n, c === Ne), $h(e, t, r, n); }
var Wh = "__ngSimpleChanges__";
function Gh(e) { return e[Wh] || null; }
function aT(e, t) { return e[Wh] = t; }
var Dp = [];
var O = function (e, t = null, n) { for (let o = 0; o < Dp.length; o++) {
    let r = Dp[o];
    r(e, t, n);
} }, R = (function (e) { return e[e.TemplateCreateStart = 0] = "TemplateCreateStart", e[e.TemplateCreateEnd = 1] = "TemplateCreateEnd", e[e.TemplateUpdateStart = 2] = "TemplateUpdateStart", e[e.TemplateUpdateEnd = 3] = "TemplateUpdateEnd", e[e.LifecycleHookStart = 4] = "LifecycleHookStart", e[e.LifecycleHookEnd = 5] = "LifecycleHookEnd", e[e.OutputStart = 6] = "OutputStart", e[e.OutputEnd = 7] = "OutputEnd", e[e.BootstrapApplicationStart = 8] = "BootstrapApplicationStart", e[e.BootstrapApplicationEnd = 9] = "BootstrapApplicationEnd", e[e.BootstrapComponentStart = 10] = "BootstrapComponentStart", e[e.BootstrapComponentEnd = 11] = "BootstrapComponentEnd", e[e.ChangeDetectionStart = 12] = "ChangeDetectionStart", e[e.ChangeDetectionEnd = 13] = "ChangeDetectionEnd", e[e.ChangeDetectionSyncStart = 14] = "ChangeDetectionSyncStart", e[e.ChangeDetectionSyncEnd = 15] = "ChangeDetectionSyncEnd", e[e.AfterRenderHooksStart = 16] = "AfterRenderHooksStart", e[e.AfterRenderHooksEnd = 17] = "AfterRenderHooksEnd", e[e.ComponentStart = 18] = "ComponentStart", e[e.ComponentEnd = 19] = "ComponentEnd", e[e.DeferBlockStateStart = 20] = "DeferBlockStateStart", e[e.DeferBlockStateEnd = 21] = "DeferBlockStateEnd", e[e.DynamicComponentStart = 22] = "DynamicComponentStart", e[e.DynamicComponentEnd = 23] = "DynamicComponentEnd", e[e.HostBindingsUpdateStart = 24] = "HostBindingsUpdateStart", e[e.HostBindingsUpdateEnd = 25] = "HostBindingsUpdateEnd", e; })(R || {});
function cT(e, t, n) { let { ngOnChanges: o, ngOnInit: r, ngDoCheck: i } = t.type.prototype; if (o) {
    let s = zh(t);
    (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
} r && (n.preOrderHooks ??= []).push(0 - e, r), i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i)); }
function qh(e, t) { for (let n = t.directiveStart, o = t.directiveEnd; n < o; n++) {
    let i = e.data[n].type.prototype, { ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: c, ngAfterViewChecked: l, ngOnDestroy: u } = i;
    s && (e.contentHooks ??= []).push(-n, s), a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)), c && (e.viewHooks ??= []).push(-n, c), l && ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)), u != null && (e.destroyHooks ??= []).push(n, u);
} }
function Si(e, t, n) { Qh(e, t, 3, n); }
function bi(e, t, n, o) { (e[A] & 3) === n && Qh(e, t, n, o); }
function Cc(e, t) { let n = e[A]; (n & 3) === t && (n &= 16383, n += 1, e[A] = n); }
function Qh(e, t, n, o) { let r = o !== void 0 ? e[mn] & 65535 : 0, i = o ?? -1, s = t.length - 1, a = 0; for (let c = r; c < s; c++)
    if (typeof t[c + 1] == "number") {
        if (a = t[c], o != null && a >= o)
            break;
    }
    else
        t[c] < 0 && (e[mn] += 65536), (a < i || i == -1) && (lT(e, n, t, c), e[mn] = (e[mn] & 4294901760) + c + 2), c++; }
function Cp(e, t) { O(R.LifecycleHookStart, e, t); let n = b(null); try {
    t.call(e);
}
finally {
    b(n), O(R.LifecycleHookEnd, e, t);
} }
function lT(e, t, n, o) { let r = n[o] < 0, i = n[o + 1], s = r ? -n[o] : n[o], a = e[s]; r ? e[A] >> 14 < e[mn] >> 16 && (e[A] & 3) === t && (e[A] += 16384, Cp(a, i)) : Cp(a, i); }
var _n = -1, Yt = class {
    factory;
    name;
    injectImpl;
    resolving = !1;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(t, n, o, r) { this.factory = t, this.name = r, this.canSeeViewProviders = n, this.injectImpl = o; }
};
function ps(e) { return e != null && typeof e == "object" && (e.insertBeforeIndex === null || typeof e.insertBeforeIndex == "number" || Array.isArray(e.insertBeforeIndex)); }
function Zh(e) { return !!(e.type & 128); }
function uT(e) { return (e.flags & 8) !== 0; }
function dT(e) { return (e.flags & 16) !== 0; }
function fT(e, t, n) { let o = 0; for (; o < n.length;) {
    let r = n[o];
    if (typeof r == "number") {
        if (r !== 0)
            break;
        o++;
        let i = n[o++], s = n[o++], a = n[o++];
        e.setAttribute(t, s, a, i);
    }
    else {
        let i = r, s = n[++o];
        pT(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), o++;
    }
} return o; }
function Yh(e) { return e === 3 || e === 4 || e === 6; }
function pT(e) { return e.charCodeAt(0) === 64; }
function xn(e, t) { if (!(t === null || t.length === 0))
    if (e === null || e.length === 0)
        e = t.slice();
    else {
        let n = -1;
        for (let o = 0; o < t.length; o++) {
            let r = t[o];
            typeof r == "number" ? n = r : n === 0 || (n === -1 || n === 2 ? Tp(e, n, r, null, t[++o]) : Tp(e, n, r, null, null));
        }
    } return e; }
function Tp(e, t, n, o, r) { let i = 0, s = e.length; if (t === -1)
    s = -1;
else
    for (; i < e.length;) {
        let a = e[i++];
        if (typeof a == "number") {
            if (a === t) {
                s = -1;
                break;
            }
            else if (a > t) {
                s = i - 1;
                break;
            }
        }
    } for (; i < e.length;) {
    let a = e[i];
    if (typeof a == "number")
        break;
    if (a === n) {
        r !== null && (e[i + 1] = r);
        return;
    }
    i++, r !== null && i++;
} s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), r !== null && e.splice(i++, 0, r); }
function Kh(e) { return e !== _n; }
function Vi(e) { return e & 32767; }
function hT(e) { return e >> 16; }
function Bi(e, t) { let n = hT(e), o = t; for (; n > 0;)
    o = o[Do], n--; return o; }
var Wc = !0;
function $i(e) { let t = Wc; return Wc = e, t; }
var gT = 256, Jh = gT - 1, Xh = 5, mT = 0, Qe = {};
function yT(e, t, n) { let o; typeof n == "string" ? o = n.charCodeAt(0) || 0 : n.hasOwnProperty(kt) && (o = n[kt]), o == null && (o = n[kt] = mT++); let r = o & Jh, i = 1 << r; t.data[e + (r >> Xh)] |= i; }
function Ui(e, t) { let n = eg(e, t); if (n !== -1)
    return n; let o = t[m]; o.firstCreatePass && (e.injectorIndex = t.length, Tc(o.data, e), Tc(t, null), Tc(o.blueprint, null)); let r = Zl(e, t), i = e.injectorIndex; if (Kh(r)) {
    let s = Vi(r), a = Bi(r, t), c = a[m].data;
    for (let l = 0; l < 8; l++)
        t[i + l] = a[s + l] | c[s + l];
} return t[i + 8] = r, i; }
function Tc(e, t) { e.push(0, 0, 0, 0, 0, 0, 0, 0, t); }
function eg(e, t) { return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex; }
function Zl(e, t) { if (e.parent && e.parent.injectorIndex !== -1)
    return e.parent.injectorIndex; let n = 0, o = null, r = t; for (; r !== null;) {
    if (o = sg(r), o === null)
        return _n;
    if (n++, r = r[Do], o.injectorIndex !== -1)
        return o.injectorIndex | n << 16;
} return _n; }
function Gc(e, t, n) { yT(e, t, n); }
function vT(e, t) { if (t === "class")
    return e.classes; if (t === "style")
    return e.styles; let n = e.attrs; if (n) {
    let o = n.length, r = 0;
    for (; r < o;) {
        let i = n[r];
        if (Yh(i))
            break;
        if (i === 0)
            r = r + 2;
        else if (typeof i == "number")
            for (r++; r < o && typeof n[r] == "string";)
                r++;
        else {
            if (i === t)
                return n[r + 1];
            r = r + 2;
        }
    }
} return null; }
function tg(e, t, n) { if (n & 8 || e !== void 0)
    return e; Oa(t, "NodeInjector"); }
function ng(e, t, n, o) { if (n & 8 && o === void 0 && (o = null), (n & 3) === 0) {
    let r = e[k], i = xt(void 0);
    try {
        return r ? r.get(t, o, n & 8) : xf(t, o, n & 8);
    }
    finally {
        xt(i);
    }
} return tg(o, t, n); }
function og(e, t, n, o = 0, r) { if (e !== null) {
    if (t[A] & 2048 && !(o & 2)) {
        let s = CT(e, t, n, o, Qe);
        if (s !== Qe)
            return s;
    }
    let i = rg(e, t, n, o, Qe);
    if (i !== Qe)
        return i;
} return ng(t, n, o, r); }
function rg(e, t, n, o, r) { let i = ET(n); if (typeof i == "function") {
    if (!ac(t, e, o))
        return o & 1 ? tg(r, n, o) : ng(t, n, o, r);
    try {
        let s;
        if (s = i(o), s == null && !(o & 8))
            Oa(n);
        else
            return s;
    }
    finally {
        cc();
    }
}
else if (typeof i == "number") {
    let s = null, a = eg(e, t), c = _n, l = o & 1 ? t[Y][ce] : null;
    for ((a === -1 || o & 4) && (c = a === -1 ? Zl(e, t) : t[a + 8], c === _n || !Np(o, !1) ? a = -1 : (s = t[m], a = Vi(c), t = Bi(c, t))); a !== -1;) {
        let u = t[m];
        if (Mp(i, a, u.data)) {
            let d = IT(a, t, n, s, o, l);
            if (d !== Qe)
                return d;
        }
        c = t[a + 8], c !== _n && Np(o, t[m].data[a + 8] === l) && Mp(i, a, t) ? (s = u, a = Vi(c), t = Bi(c, t)) : a = -1;
    }
} return r; }
function IT(e, t, n, o, r, i) { let s = t[m], a = s.data[e + 8], c = o == null ? he(a) && Wc : o != s && (a.type & 3) !== 0, l = r & 1 && i === a, u = Ai(a, s, n, c, l); return u !== null ? Go(t, s, u, a, r) : Qe; }
function Ai(e, t, n, o, r) { let i = e.providerIndexes, s = t.data, a = i & 1048575, c = e.directiveStart, l = e.directiveEnd, u = i >> 20, d = o ? a : a + u, f = r ? a + u : l; for (let p = d; p < f; p++) {
    let h = s[p];
    if (p < c && n === h || p >= c && h.type === n)
        return p;
} if (r) {
    let p = s[c];
    if (p && Se(p) && p.type === n)
        return c;
} return null; }
function Go(e, t, n, o, r) { let i = e[n], s = t.data; if (i instanceof Yt) {
    let a = i;
    if (a.resolving)
        throw kf("");
    let c = $i(a.canSeeViewProviders);
    a.resolving = !0;
    let l = s[n].type || s[n], u, d = a.injectImpl ? xt(a.injectImpl) : null, f = ac(e, o, 0);
    try {
        i = e[n] = a.factory(void 0, r, s, e, o), t.firstCreatePass && n >= o.directiveStart && cT(n, s[n], t);
    }
    finally {
        d !== null && xt(d), $i(c), a.resolving = !1, cc();
    }
} return i; }
function ET(e) { if (typeof e == "string")
    return e.charCodeAt(0) || 0; let t = e.hasOwnProperty(kt) ? e[kt] : void 0; return typeof t == "number" ? t >= 0 ? t & Jh : DT : t; }
function Mp(e, t, n) { let o = 1 << e; return !!(n[t + (e >> Xh)] & o); }
function Np(e, t) { return !(e & 2) && !(e & 1 && t); }
var Nt = class {
    _tNode;
    _lView;
    constructor(t, n) { this._tNode = t, this._lView = n; }
    get(t, n, o) { return og(this._tNode, this._lView, t, La(o), n); }
};
function DT() { return new Nt(T(), g()); }
function ig(e) { return Ze(() => { let t = e.prototype.constructor, n = t[ht] || qc(t), o = Object.prototype, r = Object.getPrototypeOf(e.prototype).constructor; for (; r && r !== o;) {
    let i = r[ht] || qc(r);
    if (i && i !== n)
        return i;
    r = Object.getPrototypeOf(r);
} return i => new i; }); }
function qc(e) { return Wr(e) ? () => { let t = qc(z(e)); return t && t(); } : Kr(e); }
function CT(e, t, n, o, r) { let i = e, s = t; for (; i !== null && s !== null && s[A] & 2048 && !ze(s);) {
    let a = rg(i, s, n, o | 2, Qe);
    if (a !== Qe)
        return a;
    let c = i.parent;
    if (!c) {
        let l = s[Va];
        if (l) {
            let u = l.get(n, Qe, o & -5);
            if (u !== Qe)
                return u;
        }
        c = sg(s), s = s[Do];
    }
    i = c;
} return r; }
function sg(e) { let t = e[m], n = t.type; return n === 2 ? t.declTNode : n === 1 ? e[ce] : null; }
function hs(e) { return vT(T(), e); }
var ag = zn("Attribute", e => ({ attributeName: e, __NG_ELEMENT_ID__: () => hs(e) })), wp = null;
function Yl() { return wp = wp || new Hi; }
function gs(e) { return cg(Yl().parameters(e)); }
function cg(e) { return e.map(t => TT(t)); }
function TT(e) { let t = { token: null, attribute: null, host: !1, optional: !1, self: !1, skipSelf: !1 }; if (Array.isArray(e) && e.length > 0)
    for (let n = 0; n < e.length; n++) {
        let o = e[n];
        if (o === void 0)
            continue;
        let r = Object.getPrototypeOf(o);
        if (o instanceof Fh || r.ngMetadataName === "Optional")
            t.optional = !0;
        else if (o instanceof jh || r.ngMetadataName === "SkipSelf")
            t.skipSelf = !0;
        else if (o instanceof Hh || r.ngMetadataName === "Self")
            t.self = !0;
        else if (o instanceof Vh || r.ngMetadataName === "Host")
            t.host = !0;
        else if (o instanceof Ph)
            t.token = o.token;
        else if (o instanceof ag) {
            if (o.attributeName === void 0)
                throw new w(-204, !1);
            t.attribute = o.attributeName;
        }
        else
            t.token = o;
    }
else
    e === void 0 || Array.isArray(e) && e.length === 0 ? t.token = null : t.token = e; return t; }
function MT(e, t) { let n = null, o = null; e.hasOwnProperty(Gr) || Object.defineProperty(e, Gr, { get: () => (n === null && (n = ee({ usage: 0, kind: "injectable", type: e }).compileInjectable(Ep, `ng:///${e.name}/\u0275prov.js`, ST(e, t))), n) }), e.hasOwnProperty(ht) || Object.defineProperty(e, ht, { get: () => { if (o === null) {
        let r = ee({ usage: 0, kind: "injectable", type: e });
        o = r.compileFactory(Ep, `ng:///${e.name}/\u0275fac.js`, { name: e.name, type: e, typeArgumentCount: 0, deps: gs(e), target: r.FactoryTarget.Injectable });
    } return o; }, configurable: !0 }); }
var NT = Aa({ provide: String, useValue: Aa });
function _p(e) { return e.useClass !== void 0; }
function wT(e) { return NT in e; }
function Sp(e) { return e.useFactory !== void 0; }
function _T(e) { return e.useExisting !== void 0; }
function ST(e, t) { let n = t || { providedIn: null }, o = { name: e.name, type: e, typeArgumentCount: 0, providedIn: n.providedIn }; return (_p(n) || Sp(n)) && n.deps !== void 0 && (o.deps = cg(n.deps)), _p(n) ? o.useClass = n.useClass : wT(n) ? o.useValue = n.useValue : Sp(n) ? o.useFactory = n.useFactory : _T(n) && (o.useExisting = n.useExisting), o; }
var bT = fr("Injectable", void 0, void 0, void 0, (e, t) => MT(e, t));
function AT() { return Wn(T(), g()); }
function Wn(e, t) { return new pr(ne(e, t)); }
var pr = (() => { class e {
    nativeElement;
    constructor(n) { this.nativeElement = n; }
    static __NG_ELEMENT_ID__ = AT;
} return e; })();
function lg(e) { return e instanceof pr ? e.nativeElement : e; }
function RT() { return this._results[Symbol.iterator](); }
var zi = class {
    _emitDistinctChangesOnly;
    dirty = !0;
    _onDirty = void 0;
    _results = [];
    _changesDetected = !1;
    _changes = void 0;
    length = 0;
    first = void 0;
    last = void 0;
    get changes() { return this._changes ??= new Lh; }
    constructor(t = !1) { this._emitDistinctChangesOnly = t; }
    get(t) { return this._results[t]; }
    map(t) { return this._results.map(t); }
    filter(t) { return this._results.filter(t); }
    find(t) { return this._results.find(t); }
    reduce(t, n) { return this._results.reduce(t, n); }
    forEach(t) { this._results.forEach(t); }
    some(t) { return this._results.some(t); }
    toArray() { return this._results.slice(); }
    toString() { return this._results.toString(); }
    reset(t, n) { this.dirty = !1; let o = Le(t); (this._changesDetected = !Of(this._results, o, n)) && (this._results = o, this.length = o.length, this.last = o[this.length - 1], this.first = o[0]); }
    notifyOnChanges() { this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.next(this); }
    onDirty(t) { this._onDirty = t; }
    setDirty() { this.dirty = !0, this._onDirty?.(); }
    destroy() { this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe()); }
    [Symbol.iterator] = RT;
}, an = "ngSkipHydration", kT = "ngskiphydration";
function Kl(e) { let t = e.mergedAttrs; if (t === null)
    return !1; for (let n = 0; n < t.length; n += 2) {
    let o = t[n];
    if (typeof o == "number")
        return !1;
    if (typeof o == "string" && o.toLowerCase() === kT)
        return !0;
} return !1; }
function ug(e) { return e.hasAttribute(an); }
function qo(e) { return (e.flags & 128) === 128; }
function Gn(e) { if (qo(e))
    return !0; let t = e.parent; for (; t;) {
    if (qo(e) || Kl(t))
        return !0;
    t = t.parent;
} return !1; }
function dg(e) { return qo(e) || Kl(e) || Gn(e); }
var ms = (function (e) { return e[e.OnPush = 0] = "OnPush", e[e.Eager = 1] = "Eager", e[e.Default = 1] = "Default", e; })(ms || {}), ys = new Map, xT = 0;
function OT() { return xT++; }
function LT(e) { ys.set(e[we], e); }
function fg(e) { return ys.get(e) || null; }
function Qc(e) { ys.delete(e[we]); }
function PT() { return ys; }
var Wi = class {
    lViewId;
    nodeIndex;
    native;
    component;
    directives;
    localRefs;
    get lView() { return fg(this.lViewId); }
    constructor(t, n, o) { this.lViewId = t, this.nodeIndex = n, this.native = o; }
};
function ye(e) { let t = Ri(e); if (t) {
    if (te(t)) {
        let n = t, o, r, i;
        if (pg(e)) {
            if (o = VT(n, e), o == -1)
                throw new Error("The provided component was not found in the application");
            r = e;
        }
        else if (HT(e)) {
            if (o = BT(n, e), o == -1)
                throw new Error("The provided directive was not found in the application");
            i = hg(o, n);
        }
        else if (o = Ap(n, e), o == -1)
            return null;
        let s = x(n[o]), a = Ri(s), c = a && !Array.isArray(a) ? a : bp(n, o, s);
        if (r && c.component === void 0 && (c.component = r, be(c.component, c)), i && c.directives === void 0) {
            c.directives = i;
            for (let l = 0; l < i.length; l++)
                be(i[l], c);
        }
        be(c.native, c), t = c;
    }
}
else {
    let n = e, o = n;
    for (; o = o.parentNode;) {
        let r = Ri(o);
        if (r) {
            let i = Array.isArray(r) ? r : r.lView;
            if (!i)
                return null;
            let s = Ap(i, n);
            if (s >= 0) {
                let a = x(i[s]), c = bp(i, s, a);
                be(a, c), t = c;
                break;
            }
        }
    }
} return t || null; }
function bp(e, t, n) { return new Wi(e[we], t, n); }
var Zc = "__ngContext__";
function be(e, t) { te(t) ? (e[Zc] = t[we], LT(t)) : e[Zc] = t; }
function Ri(e) { let t = e[Zc]; return typeof t == "number" ? fg(t) : t || null; }
function FT(e) { let t = Ri(e); return t ? te(t) ? t : t.lView : null; }
function pg(e) { return e && e.constructor && e.constructor.\u0275cmp; }
function HT(e) { return e && e.constructor && e.constructor.\u0275dir; }
function Ap(e, t) { let n = e[m]; for (let o = I; o < n.bindingStartIndex; o++)
    if (x(e[o]) === t)
        return o; return -1; }
function jT(e) { if (e.child)
    return e.child; if (e.next)
    return e.next; for (; e.parent && !e.parent.next;)
    e = e.parent; return e.parent && e.parent.next; }
function VT(e, t) { let n = e[m].components; if (n)
    for (let o = 0; o < n.length; o++) {
        let r = n[o];
        if (de(r, e)[F] === t)
            return r;
    }
else if (de(I, e)[F] === t)
    return I; return -1; }
function BT(e, t) { let n = e[m].firstChild; for (; n;) {
    let o = n.directiveStart, r = n.directiveEnd;
    for (let i = o; i < r; i++)
        if (e[i] === t)
            return n.index;
    n = jT(n);
} return -1; }
function hg(e, t) { let n = t[m].data[e]; if (n.directiveStart === 0)
    return P; let o = []; for (let r = n.directiveStart; r < n.directiveEnd; r++) {
    let i = t[r];
    pg(i) || o.push(i);
} return o; }
function $T(e, t) { let n = t[m].data[e]; return he(n) ? t[n.directiveStart + n.componentOffset] : null; }
function UT(e, t) { let n = e[m].data[t]; if (n && n.localNames) {
    let o = {}, r = n.index + 1;
    for (let i = 0; i < n.localNames.length; i += 2)
        o[n.localNames[i]] = e[r], r++;
    return o;
} return null; }
function gg(e) { return yg(e[yt]); }
function mg(e) { return yg(e[ae]); }
function yg(e) { for (; e !== null && !J(e);)
    e = e[ae]; return e; }
function Rp(e) { let t = ye(e); if (t === null)
    return null; if (t.component === void 0) {
    let n = t.lView;
    if (n === null)
        return null;
    t.component = $T(t.nodeIndex, n);
} return t.component; }
function zT(e) { eM(e); let t = ye(e), n = t ? t.lView : null; return n === null ? null : n[F]; }
function WT(e) { let t = ye(e), n = t ? t.lView : null; if (n === null)
    return null; let o; for (; n[m].type === 2 && (o = jt(n));)
    n = o; return ze(n) ? null : n[F]; }
function GT(e) { let t = ye(e), n = t ? t.lView : null; if (n === null)
    return De.NULL; let o = n[m].data[t.nodeIndex]; return new Nt(o, n); }
function qT(e) { let t = ye(e), n = t ? t.lView : null; if (n === null)
    return []; let o = n[m], r = o.data[t.nodeIndex], i = [], s = r.providerIndexes & 1048575, a = r.directiveEnd; for (let c = s; c < a; c++) {
    let l = o.data[c];
    XT(l) && (l = l.type), i.push(l);
} return i; }
function QT(e) { if (e instanceof Text)
    return []; let t = ye(e), n = t ? t.lView : null; if (n === null)
    return []; let o = n[m], r = t.nodeIndex; return o?.data[r] ? (t.directives === void 0 && (t.directives = hg(r, n)), t.directives === null ? [] : [...t.directives]) : []; }
var vg = (function (e) { return e[e.Default = 0] = "Default", e[e.OnPush = 1] = "OnPush", e; })(vg || {}), Ig = (function (e) { return e[e.Emulated = 0] = "Emulated", e[e.None = 1] = "None", e; })(Ig || {});
function ZT(e) { let t = ye(e); if (t === null)
    return {}; if (t.localRefs === void 0) {
    let n = t.lView;
    if (n === null)
        return {};
    t.localRefs = UT(n, t.nodeIndex);
} return t.localRefs || {}; }
function YT(e) { return ye(e).native; }
function KT(e) { let t = ye(e), n = t === null ? null : t.lView; if (n === null)
    return []; let o = n[m], r = n[Ot], i = o.cleanup, s = []; if (i && r)
    for (let a = 0; a < i.length;) {
        let c = i[a++], l = i[a++];
        if (typeof c == "string") {
            let u = c, d = x(n[l]), f = r[i[a++]], p = i[a++], h = typeof p == "boolean" || p >= 0 ? "dom" : "output", y = typeof p == "boolean" ? p : !1;
            e == d && s.push({ element: e, name: u, callback: f, useCapture: y, type: h });
        }
    } return s.sort(JT), s; }
function JT(e, t) { return e.name == t.name ? 0 : e.name < t.name ? -1 : 1; }
function XT(e) { return e.type !== void 0 && e.declaredInputs !== void 0 && e.resolveHostDirectives !== void 0; }
function eM(e) { if (typeof Element < "u" && !(e instanceof Element))
    throw new Error("Expecting instance of DOM Element"); }
var Yc;
function tM(e) { Yc = e; }
function vs() { if (Yc !== void 0)
    return Yc; if (typeof document < "u")
    return document; throw new w(210, !1); }
var at = new _("", { factory: () => nM }), nM = "ng";
var Jl = new _(""), oM = new _("", { providedIn: "platform", factory: () => "unknown" }), rM = new _(""), iM = new _("", { factory: () => E(Vt).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null }), Eg = { breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840], placeholderResolution: 30, disableImageSizeWarning: !1, disableImageLazyLoadWarning: !1 }, sM = new _("", { factory: () => Eg });
function aM(e) { return e; }
var qn = (() => { class e {
    static \u0275prov = V({ token: e, providedIn: "root", factory: () => { let n = new e; return (typeof ngServerMode > "u" || !ngServerMode) && (n.store = Dg(E(Vt), E(at))), n; } });
    store = {};
    onSerializeCallbacks = {};
    get(n, o) { return this.store[n] !== void 0 ? this.store[n] : o; }
    set(n, o) { this.store[n] = o; }
    remove(n) { delete this.store[n]; }
    hasKey(n) { return this.store.hasOwnProperty(n); }
    get isEmpty() { return Object.keys(this.store).length === 0; }
    onSerialize(n, o) { this.onSerializeCallbacks[n] = o; }
    toJson() { for (let n in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(n))
            try {
                this.store[n] = this.onSerializeCallbacks[n]();
            }
            catch (o) {
                console.warn("Exception in onSerialize callback: ", o);
            } return JSON.stringify(this.store).replace(/</g, "\\u003C").replace(/\//g, "\\u002F"); }
} return e; })();
function Dg(e, t) { let n = e.getElementById(t + "-state"); if (n?.textContent)
    try {
        return JSON.parse(n.textContent);
    }
    catch (o) {
        console.warn("Exception while restoring TransferState for app " + t, o);
    } return {}; }
var Xl = "h", eu = "b", Cg = "f", Tg = "n", hr = "e", Is = "t", Qn = "c", gr = "x", rt = "r", Es = "i", mr = "n", Zn = "d", Ds = "l", Cs = "di", yr = "s", tu = "p", vr = "t", cn = new _(""), Mg = !1, nu = new _("", { factory: () => Mg }), ou = new _(""), Ts = new _(""), ru = !1, Ng = new _("", { factory: () => [] }), iu = new _(""), Ir = new _("", { factory: () => new Map }), cM = new _(""), Gi = { passive: !0, capture: !0 }, Mc = new WeakMap, Nc = new WeakMap, Mt = new WeakMap, qi = ["click", "keydown"], Qi = ["mouseenter", "mouseover", "focusin"], vi = new Map, Qo = class {
    callbacks = new Set;
    listener = () => { for (let t of this.callbacks)
        t(); };
};
function wg(e, t) { let n = Nc.get(e); if (!n) {
    n = new Qo, Nc.set(e, n);
    for (let o of qi)
        e.addEventListener(o, n.listener, Gi);
} return n.callbacks.add(t), () => { let { callbacks: o, listener: r } = n; if (o.delete(t), o.size === 0) {
    Nc.delete(e);
    for (let i of qi)
        e.removeEventListener(i, r, Gi);
} }; }
function _g(e, t) { let n = Mc.get(e); if (!n) {
    n = new Qo, Mc.set(e, n);
    for (let o of Qi)
        e.addEventListener(o, n.listener, Gi);
} return n.callbacks.add(t), () => { let { callbacks: o, listener: r } = n; if (o.delete(t), o.size === 0) {
    for (let i of Qi)
        e.removeEventListener(i, r, Gi);
    Mc.delete(e);
} }; }
function lM(e) { let t = Sg(e); return new IntersectionObserver(n => { for (let o of n)
    o.isIntersecting && Mt.has(o.target) && Mt.get(o.target)?.get(t)?.listener(); }, e); }
function uM(e, t, n, o) { let r = Sg(o), i = Mt.get(e)?.get(r); vi.has(r) || vi.set(r, { observer: n(o), count: 0 }); let s = vi.get(r); if (!i) {
    i = new Qo, s.observer.observe(e);
    let a = Mt.get(e);
    a ? a.set(r, i) : (a = new Map, Mt.set(e, a)), a.set(r, i), s.count++;
} return i.callbacks.add(t), () => { if (Mt.get(e)?.has(r)) {
    if (i.callbacks.delete(t), i.callbacks.size === 0) {
        s.observer.unobserve(e), s.count--;
        let a = Mt.get(e);
        a && (a.delete(r), a.size === 0 && Mt.delete(e));
    }
    s.count === 0 && (s.observer.disconnect(), vi.delete(r));
} }; }
function Sg(e) {
    return e ? `${e.rootMargin}/${typeof e.threshold == "number" ? e.threshold : e.threshold?.join(`
`)}` : "";
}
var Yn = "ngb";
function su(e, t, n = null) { if (t.length === 0 || e.nodeType !== Node.ELEMENT_NODE)
    return; let o = e.getAttribute(mi.JSACTION), r = t.reduce((s, a) => (o?.indexOf(a) ?? -1) === -1 ? s + a + ":;" : s, ""); e.setAttribute(mi.JSACTION, `${o ?? ""}${r}`); let i = n ?? ""; i !== "" && r.length > 0 && e.setAttribute(Yn, i); }
var bg = (e, t, n) => { let o = e, r = o.__jsaction_fns ?? new Map, i = r.get(t) ?? []; i.push(n), r.set(t, i), o.__jsaction_fns = r; }, au = (e, t) => { let n = e, o = n.getAttribute(Yn) ?? "", r = t.get(o) ?? new Set; r.has(n) || r.add(n), t.set(o, r); };
function dM(e, t) { if (e.length > 0) {
    let n = [];
    for (let r of e)
        t.has(r) && (n = [...n, ...t.get(r)]);
    new Set(n).forEach(cu);
} }
var cu = e => { e.removeAttribute(mi.JSACTION), e.removeAttribute(Yn), e.__jsaction_fns = void 0; }, lu = new _("", { factory: () => ({}) }), Kc = new WeakMap;
function fM(e, t) { if (e == null || typeof e != "object")
    return; let n = Kc.get(e); n || (n = new WeakSet, Kc.set(e, n)), n.add(t); }
function uu(e, t) { let n = t?.__jsaction_fns?.get(e.type); if (!(!n || !t?.isConnected) && !(t && Kc.get(e)?.has(t)))
    for (let o of n)
        o(e); }
var Jc = new Map;
function Ag(e, t) { return Jc.set(e, t), () => Jc.delete(e); }
var kp = !1, Rg = (e, t, n, o) => { };
function pM(e, t, n, o) { Rg(e, t, n, o); }
function kg() { kp || (Rg = (e, t, n, o) => { let r = e[k].get(at); Jc.get(r)?.(t, n, o); }, kp = !0); }
var ct = new _(""), xg = (() => { class e {
    registry = new Map;
    cleanupFns = new Map;
    jsActionMap = E(Ir);
    contract = E(lu);
    add(n, o) { if (this.registry.set(n, o), this.awaitingCallbacks.has(n)) {
        let r = this.awaitingCallbacks.get(n);
        for (let i of r)
            i();
    } }
    get(n) { return this.registry.get(n) ?? null; }
    has(n) { return this.registry.has(n); }
    cleanup(n) { dM(n, this.jsActionMap); for (let o of n)
        this.registry.delete(o), this.jsActionMap.delete(o), this.invokeTriggerCleanupFns(o), this.hydrating.delete(o), this.awaitingCallbacks.delete(o); this.size === 0 && this.contract.instance?.cleanUp(); }
    get size() { return this.registry.size; }
    addCleanupFn(n, o) { let r = []; this.cleanupFns.has(n) && (r = this.cleanupFns.get(n)), r.push(o), this.cleanupFns.set(n, r); }
    invokeTriggerCleanupFns(n) { let o = this.cleanupFns.get(n) ?? []; for (let r of o)
        r(); this.cleanupFns.delete(n); }
    hydrating = new Map;
    awaitingCallbacks = new Map;
    awaitParentBlock(n, o) { let r = this.awaitingCallbacks.get(n) ?? []; r.push(o), this.awaitingCallbacks.set(n, r); }
    static \u0275prov = V({ token: e, providedIn: null, factory: () => new e });
} return e; })();
function Kn(e) { return (e.flags & 32) === 32; }
var Og = "__nghData__", Ms = Og, Lg = "__nghDeferData__", Ns = Lg;
function hM(e) { return e === Og || e === Lg; }
var Sn = "ngh", Pg = "nghm", Fg = () => null;
function gM(e, t, n = !1) { let o = e.getAttribute(Sn); if (o == null)
    return null; let [r, i] = o.split("|"); if (o = n ? i : r, !o)
    return null; let s = i ? `|${i}` : "", a = n ? r : s, c = {}; if (o !== "") {
    let u = t.get(qn, null, { optional: !0 });
    u !== null && (c = u.get(Ms, [])[Number(o)]);
} let l = { data: c, firstChild: e.firstChild ?? null }; return n && (l.firstChild = e, ws(l, 0, e.nextSibling)), a ? e.setAttribute(Sn, a) : e.removeAttribute(Sn), l; }
function Hg() { Fg = gM; }
function jg(e, t, n = !1) { return Fg(e, t, n); }
function du(e) { let t = e._lView; return t[m].type === 2 ? null : (ze(t) && (t = t[I]), t); }
function mM(e) { return e.textContent?.replace(/\s/gm, ""); }
function yM(e) { let t = vs(), n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, { acceptNode(i) { let s = mM(i); return s === "ngetn" || s === "ngtns" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } }), o, r = []; for (; o = n.nextNode();)
    r.push(o); for (let i of r)
    i.textContent === "ngetn" ? i.replaceWith(t.createTextNode("")) : i.remove(); }
var Vg = (function (e) { return e.Hydrated = "hydrated", e.Skipped = "skipped", e.Mismatched = "mismatched", e; })(Vg || {}), vM = "__ngDebugHydrationInfo__";
function IM(e) { return e[vM] ?? null; }
function ws(e, t, n) { e.segmentHeads ??= {}, e.segmentHeads[t] = n; }
function Xc(e, t) { return e.segmentHeads?.[t] ?? null; }
function Er(e) { return e.get(iu, !1, { optional: !0 }); }
var EM = !1;
function DM() { EM = !1; }
function Bg(e, t) { let n = e.data, o = n[hr]?.[t] ?? null; return o === null && n[Qn]?.[t] && (o = fu(e, t)), o; }
function CM(e, t) { return e.data[hr]?.[t] !== void 0; }
function $g(e, t) { return e.data[Qn]?.[t] ?? null; }
function fu(e, t) { let n = $g(e, t) ?? [], o = 0; for (let r of n)
    o += r[rt] * (r[gr] ?? 1); return o; }
function Ug(e) { if (typeof e.disconnectedNodes > "u") {
    let t = e.data[Zn];
    e.disconnectedNodes = t ? new Set(t) : null;
} return e.disconnectedNodes; }
function _s(e, t) { if (typeof e.disconnectedNodes > "u") {
    let n = e.data[Zn];
    e.disconnectedNodes = n ? new Set(n) : null;
} return !!Ug(e)?.has(t); }
function Ss(e, t) { let n = e[re]; return n !== null && !_o() && !Kn(t) && !_s(n, t.index - I); }
function pu(e, t) { let n = t, o = e.corruptedTextNodes; n.textContent === "" ? o.set(n, "ngetn") : n.nextSibling?.nodeType === Node.TEXT_NODE && o.set(n, "ngtns"); }
function zg(e) { let t = []; return e !== null && (e.has(4) && t.push(...Qi), e.has(3) && t.push(...qi)), t; }
function TM(e, t) { let n = t.get(ct), r = t.get(qn).get(Ns, {}), i = !1, s = e, a = null, c = []; for (; !i && s;) {
    i = n.has(s);
    let l = n.hydrating.get(s);
    if (a === null && l != null) {
        a = l.promise;
        break;
    }
    c.unshift(s), s = r[s][tu];
} return { parentBlockPromise: a, hydrationQueue: c }; }
function MM(e) { let t = e.body.querySelectorAll("[jsaction]"), n = new Set, o = [Qi.join(":;"), qi.join(":;")].join("|"); for (let r of t) {
    let i = r.getAttribute("jsaction"), s = r.getAttribute("ngb");
    i?.match(o) && s !== null && n.add(r);
} return n; }
function Wg(e, t) { let n = MM(e), o = t.get(Ir); for (let r of n)
    au(r, o); }
var Gg = () => ({});
function NM(e) { let t = e.get(qn, null, { optional: !0 }); return t !== null ? t.get(Ns, {}) : {}; }
function qg() { Gg = NM; }
function wM(e) { return Gg(e); }
function _M(e) { return typeof e == "object" && e.trigger === 5; }
function SM(e) { return e[vr]?.find(n => _M(n))?.delay ?? null; }
function bM(e) { let t = e[vr]; if (t)
    for (let n of t) {
        if (n === 2)
            return !0;
        if (typeof n == "object" && n.trigger === 2)
            return n.intersectionObserverOptions || !0;
    } return null; }
function xp(e, t) { return e[vr]?.includes(t) ?? !1; }
function AM(e) { return { data: e, hydrate: { idle: xp(e, 0), immediate: xp(e, 1), timer: SM(e), viewport: bM(e) } }; }
function Qg(e) { let t = wM(e), n = new Map; for (let o in t)
    n.set(o, AM(t[o])); return n; }
function wc(e) { return !!e && e.nodeType === Node.COMMENT_NODE && e.textContent?.trim() === Pg; }
function Op(e) { for (; e && e.nodeType === Node.TEXT_NODE;)
    e = e.previousSibling; return e; }
function Zg(e) { for (let o of e.body.childNodes)
    if (wc(o))
        return; let t = Op(e.body.previousSibling); if (wc(t))
    return; let n = Op(e.head.lastChild); if (!wc(n))
    throw new w(-507, !1); }
function Yg(e, t) { let n = e.contentQueries; if (n !== null) {
    let o = b(null);
    try {
        for (let r = 0; r < n.length; r += 2) {
            let i = n[r], s = n[r + 1];
            if (s !== -1) {
                let a = e.data[s];
                So(i), a.contentQueries(2, t[s], s);
            }
        }
    }
    finally {
        b(o);
    }
} }
function el(e, t, n) { So(0); let o = b(null); try {
    t(e, n);
}
finally {
    b(o);
} }
function hu(e, t, n) { if ($a(t)) {
    let o = b(null);
    try {
        let r = t.directiveStart, i = t.directiveEnd;
        for (let s = r; s < i; s++) {
            let a = e.data[s];
            if (a.contentQueries) {
                let c = n[s];
                a.contentQueries(1, c, s);
            }
        }
    }
    finally {
        b(o);
    }
} }
var Ae = (function (e) { return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e[e.ExperimentalIsolatedShadowDom = 4] = "ExperimentalIsolatedShadowDom", e; })(Ae || {}), RM = { name: "custom-elements" }, kM = { name: "no-errors-schema" }, Kg = !1;
function xM(e) { Kg = e; }
function OM() { return Kg; }
var Jg = !1;
function LM(e) { Jg = e; }
function PM() { return Jg; }
var Ii;
function Xg() { if (Ii === void 0 && (Ii = null, ve.trustedTypes))
    try {
        Ii = ve.trustedTypes.createPolicy("angular", { createHTML: e => e, createScript: e => e, createScriptURL: e => e });
    }
    catch { } return Ii; }
function Jn(e) { return Xg()?.createHTML(e) || e; }
function FM(e) { return Xg()?.createScriptURL(e) || e; }
var Ei;
function gu() { if (Ei === void 0 && (Ei = null, ve.trustedTypes))
    try {
        Ei = ve.trustedTypes.createPolicy("angular#unsafe-bypass", { createHTML: e => e, createScript: e => e, createScriptURL: e => e });
    }
    catch { } return Ei; }
function Lp(e) { return gu()?.createHTML(e) || e; }
function Pp(e) { return gu()?.createScript(e) || e; }
function Fp(e) { return gu()?.createScriptURL(e) || e; }
var it = class {
    changingThisBreaksApplicationSecurity;
    constructor(t) { this.changingThisBreaksApplicationSecurity = t; }
    toString() { return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${$r})`; }
}, tl = class extends it {
    getTypeName() { return "HTML"; }
}, nl = class extends it {
    getTypeName() { return "Style"; }
}, ol = class extends it {
    getTypeName() { return "Script"; }
}, rl = class extends it {
    getTypeName() { return "URL"; }
}, il = class extends it {
    getTypeName() { return "ResourceURL"; }
};
function lt(e) { return e instanceof it ? e.changingThisBreaksApplicationSecurity : e; }
function Xn(e, t) { let n = em(e); if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL")
        return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${$r})`);
} return n === t; }
function em(e) { return e instanceof it && e.getTypeName() || null; }
function HM(e) { return new tl(e); }
function jM(e) { return new nl(e); }
function VM(e) { return new ol(e); }
function BM(e) { return new rl(e); }
function $M(e) { return new il(e); }
function tm(e) { let t = new al(e); return UM() ? new sl(t) : t; }
var sl = class {
    inertDocumentHelper;
    constructor(t) { this.inertDocumentHelper = t; }
    getInertBodyElement(t) { t = "<body><remove></remove>" + t; try {
        let n = new window.DOMParser().parseFromString(Jn(t), "text/html").body;
        return n === null ? this.inertDocumentHelper.getInertBodyElement(t) : (n.firstChild?.remove(), n);
    }
    catch {
        return null;
    } }
}, al = class {
    defaultDoc;
    inertDocument;
    constructor(t) { this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"); }
    getInertBodyElement(t) { let n = this.inertDocument.createElement("template"); return n.innerHTML = Jn(t), n; }
};
function UM() { try {
    return !!new window.DOMParser().parseFromString(Jn(""), "text/html");
}
catch {
    return !1;
} }
var zM = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function bs(e) { return e = String(e), e.match(zM) ? e : "unsafe:" + e; }
function Ye(e) { let t = {}; for (let n of e.split(","))
    t[n] = !0; return t; }
function eo(...e) { let t = {}; for (let n of e)
    for (let o in n)
        n.hasOwnProperty(o) && (t[o] = !0); return t; }
var nm = Ye("area,br,col,hr,img,wbr"), om = Ye("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), rm = Ye("rp,rt"), WM = eo(rm, om), GM = eo(om, Ye("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), qM = eo(rm, Ye("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), cl = eo(nm, GM, qM, WM), mu = Ye("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), QM = Ye("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), ZM = Ye("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"), ll = eo(mu, QM, ZM), YM = Ye("script,style,template"), im = eo(mu, Ye("action,formaction,data,codebase")), ul = class {
    sanitizedSomething = !1;
    buf = [];
    sanitizeChildren(t) { let n = t.firstChild, o = !0, r = []; for (; n;) {
        if (n.nodeType === Node.ELEMENT_NODE ? o = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, o && n.firstChild) {
            r.push(n), n = XM(n);
            continue;
        }
        for (; n;) {
            n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
            let i = JM(n);
            if (i) {
                n = i;
                break;
            }
            n = r.pop();
        }
    } return this.buf.join(""); }
    startElement(t) { let n = Hp(t).toLowerCase(); if (!cl.hasOwnProperty(n))
        return this.sanitizedSomething = !0, !YM.hasOwnProperty(n); this.buf.push("<"), this.buf.push(n); let o = t.attributes; for (let r = 0; r < o.length; r++) {
        let i = o.item(r), s = i.name, a = s.toLowerCase();
        if (!ll.hasOwnProperty(a)) {
            this.sanitizedSomething = !0;
            continue;
        }
        let c = i.value;
        mu[a] && (c = bs(c)), this.buf.push(" ", s, '="', jp(c), '"');
    } return this.buf.push(">"), !0; }
    endElement(t) { let n = Hp(t).toLowerCase(); cl.hasOwnProperty(n) && !nm.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">")); }
    chars(t) { this.buf.push(jp(t)); }
};
function KM(e, t) { return (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY; }
function JM(e) { let t = e.nextSibling; if (t && e !== t.previousSibling)
    throw sm(t); return t; }
function XM(e) { let t = e.firstChild; if (t && KM(e, t))
    throw sm(t); return t; }
function Hp(e) { let t = e.nodeName; return typeof t == "string" ? t : "FORM"; }
function sm(e) { return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`); }
var eN = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, tN = /([^\#-~ |!])/g;
function jp(e) { return e.replace(/&/g, "&amp;").replace(eN, function (t) { let n = t.charCodeAt(0), o = t.charCodeAt(1); return "&#" + ((n - 55296) * 1024 + (o - 56320) + 65536) + ";"; }).replace(tN, function (t) { return "&#" + t.charCodeAt(0) + ";"; }).replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
var Di;
function am(e, t) { let n = null; try {
    Di = Di || tm(e);
    let o = t ? String(t) : "";
    n = Di.getInertBodyElement(o);
    let r = 5, i = o;
    do {
        if (r === 0)
            throw new Error("Failed to sanitize html because the input is unstable");
        r--, o = i, i = n.innerHTML, n = Di.getInertBodyElement(o);
    } while (o !== i);
    let a = new ul().sanitizeChildren(dl(n) || n);
    return Jn(a);
}
finally {
    if (n) {
        let o = dl(n) || n;
        for (; o.firstChild;)
            o.firstChild.remove();
    }
} }
function dl(e) { return "content" in e && nN(e) ? e.content : null; }
function nN(e) { return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE"; }
var oN = /^>|^->|<!--|-->|--!>|<!-$/g, rN = /(<|>)/g, iN = "\u200B$1\u200B";
function sN(e) { return e.replace(oN, t => t.replace(rN, iN)); }
function yu(e, t) { return e.createText(t); }
function cm(e, t, n) { e.setValue(t, n); }
function vu(e, t) { return e.createComment(sN(t)); }
function As(e, t, n) { return e.createElement(t, n); }
function Kt(e, t, n, o, r) { e.insertBefore(t, n, o, r); }
function lm(e, t, n) { e.appendChild(t, n); }
function Vp(e, t, n, o, r) { o !== null ? Kt(e, t, n, o, r) : lm(e, t, n); }
function Dr(e, t, n, o) { e.removeChild(null, t, n, o); }
function um(e) { e.textContent = ""; }
function aN(e, t, n) { e.setAttribute(t, "style", n); }
function cN(e, t, n) { n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n); }
function dm(e, t, n) { let { mergedAttrs: o, classes: r, styles: i } = n; o !== null && fT(e, t, o), r !== null && cN(e, t, r), i !== null && aN(e, t, i); }
function lN(e) { let t = g(); e.src = "", e.srcdoc = Jn(""), Dr(t[C], e); }
var ln = (function (e) { return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e; })(ln || {});
function fm(e) { let t = Cr(); return t ? Lp(t.sanitize(ln.HTML, e) || "") : Xn(e, "HTML") ? Lp(lt(e)) : am(vs(), M(e)); }
function pm(e) { let t = Cr(); return t ? t.sanitize(ln.STYLE, e) || "" : Xn(e, "Style") ? lt(e) : M(e); }
function Iu(e) { let t = Cr(); return t ? t.sanitize(ln.URL, e) || "" : Xn(e, "URL") ? lt(e) : bs(M(e)); }
function Eu(e) { let t = Cr(); if (t)
    return Fp(t.sanitize(ln.RESOURCE_URL, e) || ""); if (Xn(e, "ResourceURL"))
    return Fp(lt(e)); throw new w(904, !1); }
function hm(e) { let t = Cr(); if (t)
    return Pp(t.sanitize(ln.SCRIPT, e) || ""); if (Xn(e, "Script"))
    return Pp(lt(e)); throw new w(905, !1); }
function gm(e) { return Jn(e[0]); }
function mm(e) { return FM(e[0]); }
var uN = { embed: { src: !0 }, frame: { src: !0 }, iframe: { src: !0 }, media: { src: !0 }, base: { href: !0 }, link: { href: !0 }, object: { data: !0, codebase: !0 } };
function dN(e, t) { return uN[e.toLowerCase()]?.[t.toLowerCase()] === !0 ? Eu : Iu; }
function ym(e, t, n) { return dN(t, n)(e); }
function Cr() { let e = g(); return e && e[Be].sanitizer; }
var Ci = new Set(["href", "xlink:href"]), vm = { iframe: { sandbox: !0, allow: !0, allowfullscreen: !0, referrerpolicy: !0, csp: !0, fetchpriority: !0 }, ":svg:animate": { attributename: !0, to: Ci, values: Ci, from: Ci }, ":svg:set": { attributename: !0, to: Ci }, ":svg:animatemotion": { attributename: !0 }, ":svg:animatetransform": { attributename: !0 } };
function Du(e, t, n) { let o = t.toLowerCase(), r = n.toLowerCase(), i = Ee(), s = o[0] !== ":" && i?.namespace ? `:${i.namespace}:${o}` : o, a = vm[s]?.[r]; if (!a)
    return e; let c = g(); if (o === "iframe" && i?.type === 2) {
    let d = ne(i, c);
    lN(d);
} let l = t[0] === ":" ? t.split(":").pop() : t; if (typeof a != "boolean") {
    if (i?.type === 2) {
        let f = ne(i, c).getAttribute("attributeName");
        if (f && a.has(f.toLowerCase()))
            throw new w(-910, !1);
    }
    return e;
} let u = !1; throw new w(-910, u); }
function fN() { return et([]); }
function Im(e) { return e.ownerDocument.defaultView; }
function Em(e) { return e.ownerDocument; }
function Cu(e) { return e.ownerDocument.body; }
var pN = "\uFFFD";
function Mn(e) { return e instanceof Function ? e() : e; }
function hN(e, t, n) { let o = e.length; for (;;) {
    let r = e.indexOf(t, n);
    if (r === -1)
        return r;
    if (r === 0 || e.charCodeAt(r - 1) <= 32) {
        let i = t.length;
        if (r + i === o || e.charCodeAt(r + i) <= 32)
            return r;
    }
    n = r + 1;
} }
var Dm = "ng-template";
function gN(e, t, n, o) { let r = 0; if (o) {
    for (; r < t.length && typeof t[r] == "string"; r += 2)
        if (t[r] === "class" && hN(t[r + 1].toLowerCase(), n, 0) !== -1)
            return !0;
}
else if (Tu(e))
    return !1; if (r = t.indexOf(1, r), r > -1) {
    let i;
    for (; ++r < t.length && typeof (i = t[r]) == "string";)
        if (i.toLowerCase() === n)
            return !0;
} return !1; }
function Tu(e) { return e.type === 4 && e.value !== Dm; }
function mN(e, t, n) { let o = e.type === 4 && !n ? Dm : e.value; return t === o; }
function yN(e, t, n) { let o = 4, r = e.attrs, i = r !== null ? EN(r) : 0, s = !1; for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
        if (!s && !He(o) && !He(c))
            return !1;
        if (s && He(c))
            continue;
        s = !1, o = c | o & 1;
        continue;
    }
    if (!s)
        if (o & 4) {
            if (o = 2 | o & 1, c !== "" && !mN(e, c, n) || c === "" && t.length === 1) {
                if (He(o))
                    return !1;
                s = !0;
            }
        }
        else if (o & 8) {
            if (r === null || !gN(e, r, c, n)) {
                if (He(o))
                    return !1;
                s = !0;
            }
        }
        else {
            let l = t[++a], u = vN(c, r, Tu(e), n);
            if (u === -1) {
                if (He(o))
                    return !1;
                s = !0;
                continue;
            }
            if (l !== "") {
                let d;
                if (u > i ? d = "" : d = r[u + 1].toLowerCase(), o & 2 && l !== d) {
                    if (He(o))
                        return !1;
                    s = !0;
                }
            }
        }
} return He(o) || s; }
function He(e) { return (e & 1) === 0; }
function vN(e, t, n, o) { if (t === null)
    return -1; let r = 0; if (o || !n) {
    let i = !1;
    for (; r < t.length;) {
        let s = t[r];
        if (s === e)
            return r;
        if (s === 3 || s === 6)
            i = !0;
        else if (s === 1 || s === 2) {
            let a = t[++r];
            for (; typeof a == "string";)
                a = t[++r];
            continue;
        }
        else {
            if (s === 4)
                break;
            if (s === 0) {
                r += 4;
                continue;
            }
        }
        r += i ? 1 : 2;
    }
    return -1;
}
else
    return DN(t, e); }
function Cm(e, t, n = !1) { for (let o = 0; o < t.length; o++)
    if (yN(e, t[o], n))
        return !0; return !1; }
function IN(e) { let t = e.attrs; if (t != null) {
    let n = t.indexOf(5);
    if ((n & 1) === 0)
        return t[n + 1];
} return null; }
function EN(e) { for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Yh(n))
        return t;
} return e.length; }
function DN(e, t) { let n = e.indexOf(4); if (n > -1)
    for (n++; n < e.length;) {
        let o = e[n];
        if (typeof o == "number")
            return -1;
        if (o === t)
            return n;
        n++;
    } return -1; }
function CN(e, t) { e: for (let n = 0; n < t.length; n++) {
    let o = t[n];
    if (e.length === o.length) {
        for (let r = 0; r < e.length; r++)
            if (e[r] !== o[r])
                continue e;
        return !0;
    }
} return !1; }
function Bp(e, t) { return e ? ":not(" + t.trim() + ")" : t; }
function TN(e) { let t = e[0], n = 1, o = 2, r = "", i = !1; for (; n < e.length;) {
    let s = e[n];
    if (typeof s == "string")
        if (o & 2) {
            let a = e[++n];
            r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
        }
        else
            o & 8 ? r += "." + s : o & 4 && (r += " " + s);
    else
        r !== "" && !He(s) && (t += Bp(i, r), r = ""), o = s, i = i || !He(o);
    n++;
} return r !== "" && (t += Bp(i, r)), t; }
function MN(e) { return e.map(TN).join(","); }
function NN(e) { let t = [], n = [], o = 1, r = 2; for (; o < e.length;) {
    let i = e[o];
    if (typeof i == "string")
        r === 2 ? i !== "" && t.push(i, e[++o]) : r === 8 && n.push(i);
    else {
        if (!He(r))
            break;
        r = i;
    }
    o++;
} return n.length && t.push(1, ...n), t; }
var L = {};
function Mu(e, t, n, o, r, i, s, a, c, l, u) { let d = I + o, f = d + r, p = wN(d, f), h = typeof l == "function" ? l() : l; return p[m] = { type: e, blueprint: p, template: n, queries: null, viewQuery: a, declTNode: t, data: p.slice().fill(null, d), bindingStartIndex: d, expandoStartIndex: f, hostBindingOpCodes: null, firstCreatePass: !0, firstUpdatePass: !0, staticViewQueries: !1, staticContentQueries: !1, preOrderHooks: null, preOrderCheckHooks: null, contentHooks: null, contentCheckHooks: null, viewHooks: null, viewCheckHooks: null, destroyHooks: null, cleanup: null, contentQueries: null, components: null, directiveRegistry: typeof i == "function" ? i() : i, pipeRegistry: typeof s == "function" ? s() : s, firstChild: null, schemas: c, consts: h, incompleteFirstPass: !1, ssrId: u }; }
function wN(e, t) { let n = []; for (let o = 0; o < t; o++)
    n.push(o < e ? null : L); return n; }
function Tm(e) { let t = e.tView; return t === null || t.incompleteFirstPass ? e.tView = Mu(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t; }
function Rs(e, t, n, o, r, i, s, a, c, l, u) { let d = t.blueprint.slice(); return d[j] = r, d[A] = o | 4 | 128 | 8 | 64 | 1024, (l !== null || e && e[A] & 2048) && (d[A] |= 2048), za(d), d[G] = d[Do] = e, d[F] = n, d[Be] = s || e && e[Be], d[C] = a || e && e[C], d[k] = c || e && e[k] || null, d[ce] = i, d[we] = OT(), d[re] = u, d[Va] = l, d[Y] = t.type == 2 ? e[Y] : d, d; }
function _N(e, t, n) { let o = ne(t, e), r = Tm(n), i = e[Be].rendererFactory, s = wu(e, Rs(e, r, null, Nu(n), o, t, null, i.createRenderer(o, n), null, null, null)); return e[t.index] = s; }
function Nu(e) { let t = 16; return e.signals ? t = 4096 : e.onPush && (t = 64), t; }
function Tr(e, t, n, o) { if (n === 0)
    return -1; let r = t.length; for (let i = 0; i < n; i++)
    t.push(o), e.blueprint.push(o), e.data.push(null); return r; }
function wu(e, t) { return e[yt] ? e[Eo][ae] = t : e[yt] = t, e[Eo] = t, t; }
function Mm(e = 1) { Nm(N(), g(), ie() + e, !1); }
function Nm(e, t, n, o) { if (!o)
    if ((t[A] & 3) === 3) {
        let i = e.preOrderCheckHooks;
        i !== null && Si(t, i, n);
    }
    else {
        let i = e.preOrderHooks;
        i !== null && bi(t, i, 0, n);
    } Dt(n); }
var ks = (function (e) { return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e; })(ks || {});
function wt(e, t, n, o) { let r = b(null); try {
    let [i, s, a] = e.inputs[n], c = null;
    (s & ks.SignalBased) !== 0 && (c = t[i][Xe]), c !== null && c.transformFn !== void 0 ? o = c.transformFn(o) : a !== null && (o = a.call(t, o)), e.setInput !== null ? e.setInput(t, c, o, n, i) : $h(t, c, i, o);
}
finally {
    b(r);
} }
var Zi = (function (e) { return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e; })(Zi || {}), fl;
function _u(e, t) { return fl(e, t); }
function SN(e) { fl === void 0 && (fl = e()); }
var wm = new _("", { factory: () => !1 }), _m = new _("", { factory: () => bN }), bN = 4e3, AN = !1, un = (typeof ngServerMode > "u" || !ngServerMode) && typeof document < "u" && typeof document?.documentElement?.getAnimations == "function";
function xs(e) { return e[k].get(wm, AN); }
function RN(e, t, n) { let o = On.get(e); if (o) {
    for (let r of t)
        o.classList.push(r);
    for (let r of n)
        o.cleanupFns.push(r);
}
else
    On.set(e, { classList: t, cleanupFns: n }); }
function Su(e) { let t = On.get(e); if (t) {
    for (let n of t.cleanupFns)
        n();
    On.delete(e);
} Zt.delete(e); }
var kN = () => { }, On = new WeakMap, Zt = new WeakMap, Zo = new WeakMap, Oo = new WeakSet;
function pl(e, t) { let n = Zo.get(e); if (n && n.length > 0) {
    let o = n.findIndex(r => r === t);
    o > -1 && n.splice(o, 1);
} n?.length === 0 && Zo.delete(e); }
function xN(e, t) { let n = Zo.get(e); if (!n || n.length === 0)
    return; let o = t.parentNode, r = t.previousSibling; for (let i = n.length - 1; i >= 0; i--) {
    let s = n[i], a = s.parentNode;
    s === t ? (n.splice(i, 1), Oo.add(s), s.dispatchEvent(new CustomEvent("animationend", { detail: { cancel: !0 } }))) : (r && s === r || a && o && a !== o) && (n.splice(i, 1), s.dispatchEvent(new CustomEvent("animationend", { detail: { cancel: !0 } })), s.parentNode?.removeChild(s));
} }
function bu(e, t) { let n = Zo.get(e); n ? n.includes(t) || n.push(t) : Zo.set(e, [t]); }
function Yi(e) { let t = e[Ue] ??= {}; return t.enter ??= new Map; }
function Jt(e) { let t = e[Ue] ??= {}; return t.leave ??= new Map; }
function Sm(e) { let t = typeof e == "function" ? e() : e, n = Array.isArray(t) ? t : null; return typeof t == "string" && (n = t.trim().split(/\s+/).filter(o => o)), n; }
function ON(e, t) { if (!un)
    return; let n = On.get(e); if (n && n.classList.length > 0 && LN(e, n.classList))
    for (let o of n.classList)
        t.removeClass(e, o); Su(e); }
function LN(e, t) { for (let n of t)
    if (e.classList.contains(n))
        return !0; return !1; }
function Yo(e) { return e.composedPath ? e.composedPath()[0] : e.target; }
function Au(e, t) { let n = Zt.get(t); return n === void 0 ? !0 : t === Yo(e) && (n.animationName !== void 0 && e.animationName === n.animationName || n.propertyName !== void 0 && (n.propertyName === "all" || e.propertyName === n.propertyName)); }
function Os(e, t, n) { let o = e.get(t.index) ?? { animateFns: [] }; o.animateFns.push(n), e.set(t.index, o); }
function hl(e, t) { if (e)
    for (let n of e)
        n(); for (let n of t)
    n(); }
function gl(e, t) { let n = Jt(e).get(t.index); n && (n.resolvers = void 0); }
function Ti(e, t, n, o, r) { pl(t, n), hl(o, r), gl(e, t); }
function Ki(e) { if (!e)
    return 0; let t = e.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3; return parseFloat(e) * t; }
function qt(e, t) { return e.getPropertyValue(t).split(",").map(o => o.trim()); }
function PN(e) { let t = qt(e, "transition-property"), n = qt(e, "transition-duration"), o = qt(e, "transition-delay"), r = { propertyName: "", duration: 0, animationName: void 0 }; for (let i = 0; i < t.length; i++) {
    let s = Ki(o[i]) + Ki(n[i]);
    s > r.duration && (r.propertyName = t[i], r.duration = s);
} return r; }
function FN(e) { let t = qt(e, "animation-name"), n = qt(e, "animation-delay"), o = qt(e, "animation-duration"), r = qt(e, "animation-iteration-count"), i = { animationName: "", propertyName: void 0, duration: 0 }; for (let s = 0; s < t.length; s++) {
    let a = Ki(n[s]) + Ki(o[s]), c = r[s];
    a > i.duration && c !== "infinite" && (i.animationName = t[s], i.duration = a);
} return i; }
function bm(e, t) { return e !== void 0 && e.duration > t.duration; }
function Am(e) { return (e.animationName != null || e.propertyName != null) && e.duration > 0; }
function HN(e, t) { let n = getComputedStyle(e), o = FN(n), r = PN(n), i = o.duration > r.duration ? o : r; bm(t.get(e), i) || Am(i) && t.set(e, i); }
function Rm(e, t, n) { if (!n)
    return; let o = e.getAnimations(); return o.length === 0 ? HN(e, t) : jN(e, t, o); }
function jN(e, t, n) { let o = { animationName: void 0, propertyName: void 0, duration: 0 }; for (let r of n) {
    let i = r.effect?.getTiming();
    if (i?.iterations === 1 / 0)
        continue;
    let s = typeof i?.duration == "number" ? i.duration : 0, a = (i?.delay ?? 0) + s, c = r.playbackRate;
    c !== void 0 && c !== 0 && c !== 1 && (a /= Math.abs(c));
    let l, u;
    r.animationName ? u = r.animationName : l = r.transitionProperty, a >= o.duration && (o = { animationName: u, propertyName: l, duration: a });
} bm(t.get(e), o) || Am(o) && t.set(e, o); }
var Xt = new Set, Ls = (function (e) { return e[e.CHANGE_DETECTION = 0] = "CHANGE_DETECTION", e[e.AFTER_NEXT_RENDER = 1] = "AFTER_NEXT_RENDER", e; })(Ls || {}), dn = new _(""), $p = new Set;
function q(e) { $p.has(e) || ($p.add(e), performance?.mark?.("mark_feature_usage", { detail: { feature: e } })); }
var Ps = (() => { class e {
    impl = null;
    execute() { this.impl?.execute(); }
    static \u0275prov = V({ token: e, providedIn: "root", factory: () => new e });
} return e; })(), Ru = [0, 1, 2, 3], ku = (() => { class e {
    ngZone = E(B);
    scheduler = E(Ct);
    errorHandler = E(hc, { optional: !0 });
    sequences = new Set;
    deferredRegistrations = new Set;
    executing = !1;
    constructor() { E(dn, { optional: !0 }); }
    execute() { let n = this.sequences.size > 0; n && O(R.AfterRenderHooksStart), this.executing = !0; for (let o of Ru)
        for (let r of this.sequences)
            if (!(r.erroredOrDestroyed || !r.hooks[o]))
                try {
                    r.pipelinedValue = this.ngZone.runOutsideAngular(() => this.maybeTrace(() => { let i = r.hooks[o]; return i(r.pipelinedValue); }, r.snapshot));
                }
                catch (i) {
                    r.erroredOrDestroyed = !0, this.errorHandler?.handleError(i);
                } this.executing = !1; for (let o of this.sequences)
        o.afterRun(), o.once && (this.sequences.delete(o), o.destroy()); for (let o of this.deferredRegistrations)
        this.sequences.add(o); this.deferredRegistrations.size > 0 && this.scheduler.notify(7), this.deferredRegistrations.clear(), n && O(R.AfterRenderHooksEnd); }
    register(n) { let { view: o } = n; o !== void 0 ? ((o[Lt] ??= []).push(n), si(o), o[A] |= 8192) : this.executing ? this.deferredRegistrations.add(n) : this.addSequence(n); }
    addSequence(n) { this.sequences.add(n), this.scheduler.notify(7); }
    unregister(n) { this.executing && this.sequences.has(n) ? (n.erroredOrDestroyed = !0, n.pipelinedValue = void 0, n.once = !0) : (this.sequences.delete(n), this.deferredRegistrations.delete(n)); }
    maybeTrace(n, o) { return o ? o.run(Ls.AFTER_NEXT_RENDER, n) : n(); }
    static \u0275prov = V({ token: e, providedIn: "root", factory: () => new e });
} return e; })(), Ko = class {
    impl;
    hooks;
    view;
    once;
    snapshot;
    erroredOrDestroyed = !1;
    pipelinedValue = void 0;
    unregisterOnDestroy;
    constructor(t, n, o, r, i, s = null) { this.impl = t, this.hooks = n, this.view = o, this.once = r, this.snapshot = s, this.unregisterOnDestroy = i?.onDestroy(() => this.destroy()); }
    afterRun() { this.erroredOrDestroyed = !1, this.pipelinedValue = void 0, this.snapshot?.dispose(), this.snapshot = null; }
    destroy() { this.impl.unregister(this), this.unregisterOnDestroy?.(); let t = this.view?.[Lt]; t && (this.view[Lt] = t.filter(n => n !== this)); }
};
function km(e, t) { let n = t?.injector ?? E(De); return typeof ngServerMode < "u" && ngServerMode ? Fs : (q("NgAfterRender"), xm(e, n, t, !1)); }
function xu(e, t) { let n = t?.injector ?? E(De); return typeof ngServerMode < "u" && ngServerMode ? Fs : (q("NgAfterNextRender"), xm(e, n, t, !0)); }
function VN(e) { return e instanceof Function ? [void 0, void 0, e, void 0] : [e.earlyRead, e.write, e.mixedReadWrite, e.read]; }
function xm(e, t, n, o) { let r = t.get(Ps); r.impl ??= t.get(ku); let i = t.get(dn, null, { optional: !0 }), s = n?.manualCleanup !== !0 ? t.get(Ao) : null, a = t.get(hi, null, { optional: !0 }), c = new Ko(r.impl, VN(e), a?.view, o, s, i?.snapshot(null)); return r.impl.register(c), c; }
var Fs = { destroy() { } }, Hs = new _("", { factory: () => ({ queue: new Set, isScheduled: !1, scheduler: null, injector: E(mt) }) });
function Om(e, t, n) { let o = e.get(Hs); if (Array.isArray(t))
    for (let r of t)
        o.queue.add(r), n?.detachedLeaveAnimationFns?.push(r);
else
    o.queue.add(t), n?.detachedLeaveAnimationFns?.push(t); o.scheduler && o.scheduler(e); }
function BN(e, t) { let n = e.get(Hs); if (t.detachedLeaveAnimationFns) {
    for (let o of t.detachedLeaveAnimationFns)
        n.queue.delete(o);
    t.detachedLeaveAnimationFns = void 0;
} }
function $N(e) { let t = e.get(Hs); t.isScheduled || (xu(() => { t.isScheduled = !1; for (let n of t.queue)
    n(); t.queue.clear(); }, { injector: t.injector }), t.isScheduled = !0); }
function js(e) { let t = e.get(Hs); t.scheduler = $N, t.scheduler(e); }
function Ou(e, t) { for (let [n, o] of t)
    Om(e, o.animateFns); }
function Up(e, t, n, o) { let r = e?.[Ue]?.enter; t !== null && r && r.has(n.index) && Ou(o, r); }
function Nn(e, t, n, o, r, i, s, a) { if (r != null) {
    let c, l = !1;
    J(r) ? c = r : te(r) && (l = !0, r = r[j]);
    let u = x(r);
    e === 0 && o !== null ? (Up(a, o, i, n), s == null ? lm(t, o, u) : Kt(t, o, u, s || null, !0)) : e === 1 && o !== null ? (Up(a, o, i, n), Kt(t, o, u, s || null, !0), xN(i, u)) : e === 2 ? (a?.[Ue]?.leave?.has(i.index) && bu(i, u), Oo.delete(u), zp(a, i, n, d => { if (Oo.has(u)) {
        Oo.delete(u);
        return;
    } Dr(t, u, l, d); })) : e === 3 && (Oo.delete(u), zp(a, i, n, () => { t.destroyNode(u); })), c != null && ZN(t, e, n, c, i, o, s);
} }
function Lm(e, t) { Pm(e, t), t[j] = null, t[ce] = null; }
function UN(e, t, n, o, r, i) { o[j] = r, o[ce] = t, Vs(e, o, n, 1, r, i); }
function Pm(e, t) { t[Be].changeDetectionScheduler?.notify(9), Vs(e, t, t[C], 2, null, null); }
function zN(e) { let t = e[yt]; if (!t)
    return _c(e[m], e); for (; t;) {
    let n = null;
    if (te(t))
        n = t[yt];
    else {
        let o = t[H];
        o && (n = o);
    }
    if (!n) {
        for (; t && !t[ae] && t !== e;)
            te(t) && _c(t[m], t), t = t[G];
        t === null && (t = e), te(t) && _c(t[m], t), n = t && t[ae];
    }
    t = n;
} }
function Lu(e, t) { let n = e[Pt], o = n.indexOf(t); n.splice(o, 1); }
function Mr(e, t) { if (It(t))
    return; let n = t[C]; n.destroyNode && Vs(e, t, n, 3, null, null), zN(t); }
function _c(e, t) { if (It(t))
    return; let n = b(null); try {
    t[A] &= -129, t[A] |= 256, t[_e] && ho(t[_e]), qN(e, t), GN(e, t), t[m].type === 1 && t[C].destroy();
    let o = t[vt];
    if (o !== null && J(t[G])) {
        o !== t[G] && Lu(o, t);
        let r = t[$e];
        r !== null && r.detachView(e);
    }
    Qc(t);
}
finally {
    b(n);
} }
function zp(e, t, n, o) { let r = e?.[Ue]; if (r == null || r.leave == null || !r.leave.has(t.index))
    return o(!1); e && Xt.add(e[we]), Om(n, () => { if (r.leave && r.leave.has(t.index)) {
    let s = r.leave.get(t.index), a = [];
    if (s) {
        for (let c = 0; c < s.animateFns.length; c++) {
            let l = s.animateFns[c], { promise: u } = l();
            a.push(u);
        }
        r.detachedLeaveAnimationFns = void 0;
    }
    r.running = Promise.allSettled(a), WN(e, o);
}
else
    e && Xt.delete(e[we]), o(!1); }, r); }
function WN(e, t) { let n = e[Ue]?.running; if (n) {
    n.then(() => { e[Ue].running = void 0, Xt.delete(e[we]), t(!0); });
    return;
} t(!1); }
function GN(e, t) { let n = e.cleanup, o = t[Ot]; if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
        if (typeof n[s] == "string") {
            let a = n[s + 3];
            a >= 0 ? o[a]() : o[-a].unsubscribe(), s += 2;
        }
        else {
            let a = o[n[s + 1]];
            n[s].call(a);
        } o !== null && (t[Ot] = null); let r = t[Ba]; if (r !== null) {
    t[Ba] = null;
    for (let s = 0; s < r.length; s++) {
        let a = r[s];
        a();
    }
} let i = t[Co]; if (i !== null) {
    t[Co] = null;
    for (let s of i)
        s.destroy();
} }
function qN(e, t) { let n; if (e != null && (n = e.destroyHooks) != null)
    for (let o = 0; o < n.length; o += 2) {
        let r = t[n[o]];
        if (!(r instanceof Yt)) {
            let i = n[o + 1];
            if (Array.isArray(i))
                for (let s = 0; s < i.length; s += 2) {
                    let a = r[i[s]], c = i[s + 1];
                    O(R.LifecycleHookStart, a, c);
                    try {
                        c.call(a);
                    }
                    finally {
                        O(R.LifecycleHookEnd, a, c);
                    }
                }
            else {
                O(R.LifecycleHookStart, r, i);
                try {
                    i.call(r);
                }
                finally {
                    O(R.LifecycleHookEnd, r, i);
                }
            }
        }
    } }
function Pu(e, t, n) { return Fm(e, t.parent, n); }
function Fm(e, t, n) { let o = t; for (; o !== null && o.type & 168;)
    t = o, o = t.parent; if (o === null)
    return n[j]; if (he(o)) {
    let { encapsulation: r } = e.data[o.directiveStart + o.componentOffset];
    if (r === Ae.None || r === Ae.Emulated)
        return null;
} return ne(o, n); }
function Hm(e, t, n) { return Vm(e, t, n); }
function jm(e, t, n) { return e.type & 40 ? ne(e, n) : null; }
var Vm = jm, ml;
function Bm(e, t) { Vm = e, ml = t; }
function Fu(e, t, n, o) { let r = Pu(e, o, t), i = t[C], s = o.parent || t[ce], a = Hm(s, o, t); if (r != null)
    if (Array.isArray(n))
        for (let c = 0; c < n.length; c++)
            Vp(i, r, n[c], a, !1);
    else
        Vp(i, r, n, a, !1); ml !== void 0 && ml(i, o, t, n, r); }
function Qt(e, t) { if (t !== null) {
    let n = t.type;
    if (n & 3)
        return ne(t, e);
    if (n & 4)
        return yl(-1, e[t.index]);
    if (n & 8) {
        let o = t.child;
        if (o !== null)
            return Qt(e, o);
        {
            let r = e[t.index];
            return J(r) ? yl(-1, r) : x(r);
        }
    }
    else {
        if (n & 128)
            return Qt(e, t.next);
        if (n & 32)
            return _u(t, e)() || x(e[t.index]);
        {
            let o = $m(e, t);
            if (o !== null) {
                if (Array.isArray(o))
                    return o[0];
                let r = jt(e[Y]);
                return Qt(r, o);
            }
            else
                return Qt(e, t.next);
        }
    }
} return null; }
function $m(e, t) { if (t !== null) {
    let o = e[Y][ce], r = t.projection;
    return o.projection[r];
} return null; }
function yl(e, t) { let n = H + e + 1; if (n < t.length) {
    let o = t[n], r = o[m].firstChild;
    if (r !== null)
        return Qt(o, r);
} return t[Pe]; }
function Hu(e, t, n, o, r, i, s) { for (; n != null;) {
    let a = o[k];
    if (n.type === 128) {
        n = n.next;
        continue;
    }
    let c = o[n.index], l = n.type;
    if (s && t === 0 && (c && be(x(c), o), n.flags |= 2), !Kn(n))
        if (l & 8)
            Hu(e, t, n.child, o, r, i, !1), Nn(t, e, a, r, c, n, i, o);
        else if (l & 32) {
            let u = _u(n, o), d;
            for (; d = u();)
                Nn(t, e, a, r, d, n, i, o);
            Nn(t, e, a, r, c, n, i, o);
        }
        else
            l & 16 ? Um(e, t, o, n, r, i) : Nn(t, e, a, r, c, n, i, o);
    n = s ? n.projectionNext : n.next;
} }
function Vs(e, t, n, o, r, i) { Hu(n, o, e.firstChild, t, r, i, !1); }
function QN(e, t, n) { let o = t[C], r = Pu(e, n, t), i = n.parent || t[ce], s = Hm(i, n, t); Um(o, 0, t, n, r, s); }
function Um(e, t, n, o, r, i) { let s = n[Y], c = s[ce].projection[o.projection]; if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
        let u = c[l];
        Nn(t, e, n[k], r, u, o, i, n);
    }
else {
    let l = c, u = s[G];
    qo(o) && (l.flags |= 128), Hu(e, t, l, u, r, i, !0);
} }
function ZN(e, t, n, o, r, i, s) { let a = o[Pe], c = x(o); a !== c && Nn(t, e, n, i, a, r, s); for (let l = H; l < o.length; l++) {
    let u = o[l];
    Vs(u[m], u, e, t, i, a);
} }
function YN(e, t, n, o, r) { if (t)
    r ? e.addClass(n, o) : e.removeClass(n, o);
else {
    let i = o.indexOf("-") === -1 ? void 0 : Zi.DashCase;
    r == null ? e.removeStyle(n, o, i) : (typeof r == "string" && r.endsWith("!important") && (r = r.slice(0, -10), i |= Zi.Important), e.setStyle(n, o, r, i));
} }
function zm(e, t, n, o, r) { let i = ie(), s = o & 2; try {
    Dt(-1), s && t.length > I && Nm(e, t, I, !1);
    let a = s ? R.TemplateUpdateStart : R.TemplateCreateStart;
    O(a, r, n), n(o, r);
}
finally {
    Dt(i);
    let a = s ? R.TemplateUpdateEnd : R.TemplateCreateEnd;
    O(a, r, n);
} }
function Bs(e, t, n) { tw(e, t, n), (n.flags & 64) === 64 && nw(e, t, n); }
function to(e, t, n = ne) { let o = t.localNames; if (o !== null) {
    let r = t.index + 1;
    for (let i = 0; i < o.length; i += 2) {
        let s = o[i + 1], a = s === -1 ? n(t, e) : e[s];
        e[r++] = a;
    }
} }
function KN(e, t, n, o) { let i = o.get(nu, Mg) || n === Ae.ShadowDom || n === Ae.ExperimentalIsolatedShadowDom, s = e.selectRootElement(t, i); if (s.tagName.toLowerCase() === "script")
    throw new w(905, !1); return JN(s), s; }
function JN(e) { Wm(e); }
var Wm = () => null;
function XN(e) { ug(e) ? um(e) : yM(e); }
function Gm() { Wm = XN; }
function ew(e) { return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e; }
function ju(e, t, n, o, r, i) { let s = t[m]; if (Ws(e, s, t, n, o)) {
    he(e) && qm(t, e.index);
    return;
} e.type & 3 && (n = ew(n)), Vu(e, t, n, o, r, i); }
function Vu(e, t, n, o, r, i) { if (e.type & 3) {
    let s = ne(e, t);
    o = i != null ? i(o, e.value || "", n) : o, r.setProperty(s, n, o);
}
else
    e.type & 12; }
function qm(e, t) { let n = de(t, e); n[A] & 16 || (n[A] |= 64); }
function tw(e, t, n) { let o = n.directiveStart, r = n.directiveEnd; he(n) && _N(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || Ui(n, t); let i = n.initialInputs; for (let s = o; s < r; s++) {
    let a = e.data[s], c = Go(t, e, s, n);
    if (be(c, t), i !== null && iw(t, s - o, c, a, n, i), Se(a)) {
        let l = de(n.index, t);
        l[F] = Go(t, e, s, n);
    }
} }
function nw(e, t, n) { let o = n.directiveStart, r = n.directiveEnd, i = n.index, s = op(); try {
    Dt(i);
    for (let a = o; a < r; a++) {
        let c = e.data[a], l = t[a];
        sc(a), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && ow(c, l);
    }
}
finally {
    Dt(-1), sc(s);
} }
function ow(e, t) { e.hostBindings !== null && e.hostBindings(1, t); }
function Bu(e, t) { let n = e.directiveRegistry, o = null; if (n)
    for (let r = 0; r < n.length; r++) {
        let i = n[r];
        Cm(t, i.selectors, !1) && (o ??= [], Se(i) ? o.unshift(i) : o.push(i));
    } return o; }
function rw(e, t, n, o, r, i) { let s = ne(e, t); $s(t[C], s, i, e.value, n, o, r); }
function $s(e, t, n, o, r, i, s) { if (i == null)
    e.removeAttribute(t, r, n);
else {
    let a = s == null ? M(i) : s(i, o || "", r);
    e.setAttribute(t, r, a, n);
} }
function iw(e, t, n, o, r, i) { let s = i[t]; if (s !== null)
    for (let a = 0; a < s.length; a += 2) {
        let c = s[a], l = s[a + 1];
        wt(o, n, c, l);
    } }
function Us(e, t, n, o, r) { let i = I + n, s = t[m], a = r(s, t, e, o, n); t[i] = a, We(e, !0); let c = e.type === 2; return c ? (dm(t[C], a, e), (Kf() === 0 || yn(e)) && be(a, t), Jf()) : be(a, t), bo() && (!c || !Kn(e)) && Fu(s, t, a, e), e; }
function zs(e) { let t = e; return Xa() ? ec() : (t = t.parent, We(t, !1)), t; }
function Qm(e, t, n) { return (e === null || Se(e)) && (n = Mo(n[t.index])), n[C]; }
function $u(e, t) { let n = e[k]; if (!n)
    return; let o; try {
    o = n.get($t, null);
}
catch {
    o = null;
} o?.(t); }
function Ws(e, t, n, o, r) { let i = e.inputs?.[o], s = e.hostDirectiveInputs?.[o], a = !1; if (s)
    for (let c = 0; c < s.length; c += 2) {
        let l = s[c], u = s[c + 1], d = t.data[l];
        wt(d, n[l], u, r), a = !0;
    } if (i)
    for (let c of i) {
        let l = n[c], u = t.data[c];
        wt(u, l, o, r), a = !0;
    } return a; }
function sw(e, t, n, o, r, i) { let s = null, a = null, c = null, l = !1, u = e.directiveToIndex.get(o.type); if (typeof u == "number" ? s = u : [s, a, c] = u, a !== null && c !== null && e.hostDirectiveInputs?.hasOwnProperty(r)) {
    let d = e.hostDirectiveInputs[r];
    for (let f = 0; f < d.length; f += 2) {
        let p = d[f];
        if (p >= a && p <= c) {
            let h = t.data[p], y = d[f + 1];
            wt(h, n[p], y, i), l = !0;
        }
        else if (p > c)
            break;
    }
} return s !== null && o.inputs.hasOwnProperty(r) && (wt(o, n[s], r, i), l = !0), l; }
function aw(e, t) { let n = de(t, e), o = n[m]; cw(o, n); let r = n[j]; r !== null && n[re] === null && (n[re] = jg(r, n[k])), O(R.ComponentStart); try {
    Gs(o, n, n[F]);
}
finally {
    O(R.ComponentEnd, n[F]);
} }
function cw(e, t) { for (let n = t.length; n < e.blueprint.length; n++)
    t.push(e.blueprint[n]); }
function Gs(e, t, n) { di(t); try {
    let o = e.viewQuery;
    o !== null && el(1, o, n);
    let r = e.template;
    r !== null && zm(e, t, r, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[$e]?.finishViewCreation(e), e.staticContentQueries && Yg(e, t), e.staticViewQueries && el(2, e.viewQuery, n);
    let i = e.components;
    i !== null && lw(t, i);
}
catch (o) {
    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), o;
}
finally {
    t[A] &= -5, fi();
} }
function lw(e, t) { for (let n = 0; n < t.length; n++)
    aw(e, t[n]); }
function no(e, t, n, o) { let r = b(null); try {
    let i = t.tView, a = e[A] & 4096 ? 4096 : 16, c = Rs(e, i, n, a, null, t, null, null, o?.injector ?? null, o?.embeddedViewInjector ?? null, o?.dehydratedView ?? null), l = e[t.index];
    c[vt] = l;
    let u = e[$e];
    return u !== null && (c[$e] = u.createEmbeddedView(i)), Gs(i, c, n), c;
}
finally {
    b(r);
} }
function en(e, t) { return !t || t.firstChild === null || qo(e); }
function Ln(e, t, n, o, r = !1) { for (; n !== null;) {
    if (n.type === 128) {
        n = r ? n.projectionNext : n.next;
        continue;
    }
    let i = t[n.index];
    i !== null && o.push(x(i)), J(i) && qs(i, o);
    let s = n.type;
    if (s & 8)
        Ln(e, t, n.child, o);
    else if (s & 32) {
        let a = _u(n, t), c;
        for (; c = a();)
            o.push(c);
    }
    else if (s & 16) {
        let a = $m(t, n);
        if (Array.isArray(a))
            o.push(...a);
        else {
            let c = jt(t[Y]);
            Ln(c[m], c, a, o, !0);
        }
    }
    n = r ? n.projectionNext : n.next;
} return o; }
function qs(e, t) { for (let n = H; n < e.length; n++) {
    let o = e[n], r = o[m].firstChild;
    r !== null && Ln(o[m], o, r, t);
} e[Pe] !== e[j] && t.push(e[Pe]); }
function Zm(e) { if (e[Lt] !== null) {
    for (let t of e[Lt])
        t.impl.addSequence(t);
    e[Lt].length = 0;
} }
var Ym = [];
function uw(e) { return e[_e] ?? dw(e); }
function dw(e) { let t = Ym.pop() ?? Object.create(pw); return t.lView = e, t; }
function fw(e) { e.lView[_e] !== e && (e.lView = null, Ym.push(e)); }
var pw = Je(Z({}, wa), { consumerIsAlwaysLive: !0, kind: "template", consumerMarkedDirty: e => { si(e.lView); }, consumerOnSignalRead() { this.lView[_e] = this; } });
function hw(e) { let t = e[_e] ?? Object.create(gw); return t.lView = e, t; }
var gw = Je(Z({}, wa), { consumerIsAlwaysLive: !0, kind: "template", consumerMarkedDirty: e => { let t = jt(e.lView); for (; t && !Km(t[m]);)
        t = jt(t); t && ri(t); }, consumerOnSignalRead() { this.lView[_e] = this; } });
function Km(e) { return e.type !== 2; }
function Jm(e) { if (e[Co] === null)
    return; let t = !0; for (; t;) {
    let n = !1;
    for (let o of e[Co])
        o.dirty && (n = !0, o.zone === null || Zone.current === o.zone ? o.run() : o.zone.run(() => o.run()));
    t = n && !!(e[A] & 8192);
} }
var mw = 100;
function Xm(e, t = 0) { let o = e[Be].rendererFactory, r = !1; r || o.begin?.(); try {
    yw(e, t);
}
finally {
    r || o.end?.();
} }
function yw(e, t) { let n = nc(); try {
    oc(!0), vl(e, t);
    let o = 0;
    for (; wo(e);) {
        if (o === mw)
            throw new w(103, !1);
        o++, vl(e, 1);
    }
}
finally {
    oc(n);
} }
function ey(e, t, n, o) { if (It(t))
    return; let r = t[A], i = !1, s = !1; di(t); let a = !0, c = null, l = null; i || (Km(e) ? (l = uw(t), c = po(l)) : wf() === null ? (a = !1, l = hw(t), c = po(l)) : t[_e] && (ho(t[_e]), t[_e] = null)); try {
    za(t), rc(e.bindingStartIndex), n !== null && zm(e, t, n, 2, o);
    let u = (r & 3) === 3;
    if (!i)
        if (u) {
            let p = e.preOrderCheckHooks;
            p !== null && Si(t, p, null);
        }
        else {
            let p = e.preOrderHooks;
            p !== null && bi(t, p, 0, null), Cc(t, 0);
        }
    if (s || vw(t), Jm(t), ty(t, 0), e.contentQueries !== null && Yg(e, t), !i)
        if (u) {
            let p = e.contentCheckHooks;
            p !== null && Si(t, p);
        }
        else {
            let p = e.contentHooks;
            p !== null && bi(t, p, 1), Cc(t, 1);
        }
    Ew(e, t);
    let d = e.components;
    d !== null && oy(t, d, 0);
    let f = e.viewQuery;
    if (f !== null && el(2, f, o), !i)
        if (u) {
            let p = e.viewCheckHooks;
            p !== null && Si(t, p);
        }
        else {
            let p = e.viewHooks;
            p !== null && bi(t, p, 2), Cc(t, 2);
        }
    if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[oi]) {
        for (let p of t[oi])
            p();
        t[oi] = null;
    }
    i || (Zm(t), t[A] &= -73);
}
catch (u) {
    throw i || si(t), u;
}
finally {
    l !== null && (Vr(l, c), a && fw(l)), fi();
} }
function ty(e, t) { for (let n = gg(e); n !== null; n = mg(n))
    for (let o = H; o < n.length; o++) {
        let r = n[o];
        ny(r, t);
    } }
function vw(e) { for (let t = gg(e); t !== null; t = mg(t)) {
    if (!(t[A] & 2))
        continue;
    let n = t[Pt];
    for (let o = 0; o < n.length; o++) {
        let r = n[o];
        ri(r);
    }
} }
function Iw(e, t, n) { O(R.ComponentStart); let o = de(t, e); try {
    ny(o, n);
}
finally {
    O(R.ComponentEnd, o[F]);
} }
function ny(e, t) { Wf(e) && vl(e, t); }
function vl(e, t) { let o = e[m], r = e[A], i = e[_e], s = !!(t === 0 && r & 16); if (s ||= !!(r & 64 && t === 0), s ||= !!(r & 1024), s ||= !!(i?.dirty && Br(i)), s ||= !1, i && (i.dirty = !1), e[A] &= -9217, s)
    ey(o, e, o.template, e[F]);
else if (r & 8192) {
    let a = b(null);
    try {
        Jm(e), ty(e, 1);
        let c = o.components;
        c !== null && oy(e, c, 1), Zm(e);
    }
    finally {
        b(a);
    }
} }
function oy(e, t, n) { for (let o = 0; o < t.length; o++)
    Iw(e, t[o], n); }
function Ew(e, t) { let n = e.hostBindingOpCodes; if (n !== null)
    try {
        for (let o = 0; o < n.length; o++) {
            let r = n[o];
            if (r < 0)
                Dt(~r);
            else {
                let i = r, s = n[++o], a = n[++o];
                np(s, i);
                let c = t[i];
                O(R.HostBindingsUpdateStart, c);
                try {
                    a(2, c);
                }
                finally {
                    O(R.HostBindingsUpdateEnd, c);
                }
            }
        }
    }
    finally {
        Dt(-1);
    } }
function Nr(e, t) { let n = nc() ? 64 : 1088; for (e[Be].changeDetectionScheduler?.notify(t); e;) {
    e[A] |= n;
    let o = jt(e);
    if (ze(e) && !o)
        return e;
    e = o;
} return null; }
function ry(e, t, n, o) { return [e, !0, 0, t, null, o, null, n, null, null]; }
function iy(e, t) { let n = H + t; if (n < e.length)
    return e[n]; }
function oo(e, t, n, o = !0) { let r = t[m]; if (Dw(r, t, e, n), o) {
    let s = yl(n, e), a = t[C], c = a.parentNode(e[Pe]);
    c !== null && UN(r, e[ce], a, t, c, s);
} let i = t[re]; i !== null && i.firstChild !== null && (i.firstChild = null); }
function Uu(e, t) { let n = Jo(e, t); return n !== void 0 && Mr(n[m], n), n; }
function Jo(e, t) { if (e.length <= H)
    return; let n = H + t, o = e[n]; if (o) {
    let r = o[vt];
    r !== null && r !== e && Lu(r, o), t > 0 && (e[n - 1][ae] = o[ae]);
    let i = yo(e, H + t);
    Lm(o[m], o);
    let s = i[$e];
    s !== null && s.detachView(i[m]), o[G] = null, o[ae] = null, o[A] &= -129;
} return o; }
function Dw(e, t, n, o) { let r = H + o, i = n.length; o > 0 && (n[r - 1][ae] = t), o < i - H ? (t[ae] = n[r], Pa(n, H + o, t)) : (n.push(t), t[ae] = null), t[G] = n; let s = t[vt]; s !== null && n !== s && sy(s, t); let a = t[$e]; a !== null && a.insertView(e), ii(t), t[A] |= 128; }
function sy(e, t) { let n = e[Pt], o = t[G]; if (te(o))
    e[A] |= 2;
else {
    let r = o[G][Y];
    t[Y] !== r && (e[A] |= 2);
} n === null ? e[Pt] = [t] : n.push(t); }
var St = class {
    _lView;
    _cdRefInjectingView;
    _appRef = null;
    _attachedToViewContainer = !1;
    exhaustive;
    get rootNodes() { let t = this._lView, n = t[m]; return Ln(n, t, n.firstChild, []); }
    constructor(t, n) { this._lView = t, this._cdRefInjectingView = n; }
    get context() { return this._lView[F]; }
    set context(t) { this._lView[F] = t; }
    get destroyed() { return It(this._lView); }
    destroy() { if (this._appRef)
        this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
        let t = this._lView[G];
        if (J(t)) {
            let n = t[To], o = n ? n.indexOf(this) : -1;
            o > -1 && (Jo(t, o), yo(n, o));
        }
        this._attachedToViewContainer = !1;
    } Mr(this._lView[m], this._lView); }
    onDestroy(t) { ai(this._lView, t); }
    markForCheck() { Nr(this._cdRefInjectingView || this._lView, 4); }
    detach() { this._lView[A] &= -129; }
    reattach() { ii(this._lView), this._lView[A] |= 128; }
    detectChanges() { this._lView[A] |= 1024, Xm(this._lView); }
    checkNoChanges() { }
    attachToViewContainerRef() { if (this._appRef)
        throw new w(902, !1); this._attachedToViewContainer = !0; }
    detachFromAppRef() { this._appRef = null; let t = ze(this._lView), n = this._lView[vt]; n !== null && !t && Lu(n, this._lView), Pm(this._lView[m], this._lView); }
    attachToAppRef(t) { if (this._attachedToViewContainer)
        throw new w(902, !1); this._appRef = t; let n = ze(this._lView), o = this._lView[vt]; o !== null && !n && sy(o, this._lView), ii(this._lView); }
};
function Cw(e) { return wo(e._lView) || !!(e._lView[A] & 64); }
function Tw(e) { ri(e._lView); }
var Xo = (() => { class e {
    _declarationLView;
    _declarationTContainer;
    elementRef;
    static __NG_ELEMENT_ID__ = Mw;
    constructor(n, o, r) { this._declarationLView = n, this._declarationTContainer = o, this.elementRef = r; }
    get ssrId() { return this._declarationTContainer.tView?.ssrId || null; }
    createEmbeddedView(n, o) { return this.createEmbeddedViewImpl(n, o); }
    createEmbeddedViewImpl(n, o, r) { let i = no(this._declarationLView, this._declarationTContainer, n, { embeddedViewInjector: o, dehydratedView: r }); return new St(i); }
} return e; })();
function Mw() { return Qs(T(), g()); }
function Qs(e, t) { return e.type & 4 ? new Xo(t, e, Wn(e, t)) : null; }
var Il = "<-- AT THIS LOCATION", Nw = "/guide/hydration#third-party-scripts-with-dom-manipulation";
function ww(e) { switch (e) {
    case 4: return "view container";
    case 2: return "element";
    case 8: return "ng-container";
    case 32: return "icu";
    case 64: return "i18n";
    case 16: return "projection";
    case 1: return "text";
    case 128: return "@let";
    default: return "<unknown>";
} }
function _w(e, t) {
    let n = `During serialization, Angular was unable to find an element in the DOM:

`, o = `${Rw(e, t, !1)}

`, r = xw();
    throw new w(-502, n + o + r);
}
function ay(e) {
    let t = "During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n", n = `${kw(e)}

`, o = t + n + Ow();
    return new w(-503, o);
}
function Sw(e) { let t = []; if (e.attrs)
    for (let n = 0; n < e.attrs.length;) {
        let o = e.attrs[n++];
        if (typeof o == "number")
            break;
        let r = e.attrs[n++];
        t.push(`${o}="${Ji(r)}"`);
    } return t.join(" "); }
var bw = new Set(["ngh", "ng-version", "ng-server-context"]);
function Aw(e) { let t = []; for (let n = 0; n < e.attributes.length; n++) {
    let o = e.attributes[n];
    bw.has(o.name) || t.push(`${o.name}="${Ji(o.value)}"`);
} return t.join(" "); }
function Sc(e, t = "\u2026") { switch (e.type) {
    case 1: return `#text${e.value ? `(${e.value})` : ""}`;
    case 2:
        let o = Sw(e), r = e.value.toLowerCase();
        return `<${r}${o ? " " + o : ""}>${t}</${r}>`;
    case 8: return "<!-- ng-container -->";
    case 4: return "<!-- container -->";
    default: return `#node(${ww(e.type)})`;
} }
function ki(e, t = "\u2026") { let n = e; switch (n.nodeType) {
    case Node.ELEMENT_NODE:
        let o = n.tagName.toLowerCase(), r = Aw(n);
        return `<${o}${r ? " " + r : ""}>${t}</${o}>`;
    case Node.TEXT_NODE:
        let i = n.textContent ? Ji(n.textContent) : "";
        return `#text${i ? `(${i})` : ""}`;
    case Node.COMMENT_NODE: return `<!-- ${Ji(n.textContent ?? "")} -->`;
    default: return `#node(${n.nodeType})`;
} }
function Rw(e, t, n) {
    let r = "";
    t.prev ? (r += `  \u2026
`, r += "  " + Sc(t.prev) + `
`) : t.type && t.type & 12 && (r += `  \u2026
`), n ? (r += "  " + Sc(t) + `
`, r += `  <!-- container -->  ${Il}
`) : r += "  " + Sc(t) + `  ${Il}
`, r += `  \u2026
`;
    let i = t.type ? Pu(e[m], t, e) : null;
    return i && (r = ki(i, `
` + r)), r;
}
function kw(e) {
    let n = "", o = e;
    return o.previousSibling && (n += `  \u2026
`, n += "  " + ki(o.previousSibling) + `
`), n += "  " + ki(o) + `  ${Il}
`, e.nextSibling && (n += `  \u2026
`), e.parentNode && (n = ki(o.parentNode, `
` + n)), n;
}
function xw(e) {
    return `To fix this problem:
  * check ${e ? `the "${e}"` : "corresponding"} component for hydration-related issues
  * check to see if your template has valid HTML structure
  * check if there are any third-party scripts that manipulate the DOM. More info: ${ba}${Nw}
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`;
}
function Ow() {
    return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`;
}
function Lw(e) { return e.replace(/\s+/gm, ""); }
function Ji(e, t = 50) { return e ? (e = Lw(e), e.length > t ? `${e.substring(0, t - 1)}\u2026` : e) : ""; }
function cy(e, t, n) { let o = t.insertBeforeIndex, r = Array.isArray(o) ? o[0] : o; return r === null ? jm(e, t, n) : x(n[r]); }
function ly(e, t, n, o, r) { let i = t.insertBeforeIndex; if (Array.isArray(i)) {
    let s = o, a = null;
    if (t.type & 3 || (a = s, s = r), s !== null && t.componentOffset === -1)
        for (let c = 1; c < i.length; c++) {
            let l = n[i[c]];
            Kt(e, s, l, a, !1);
        }
} }
function fn(e, t, n, o, r) { let i = e.data[t]; if (i === null)
    i = zu(e, t, n, o, r), tp() && (i.flags |= 32);
else if (i.type & 64) {
    i.type = n, i.value = o, i.attrs = r;
    let s = vn();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
} return We(i, !0), i; }
function zu(e, t, n, o, r) { let i = ep(), s = Xa(), a = s ? i : i && i.parent, c = e.data[t] = Fw(e, a, n, t, o, r); return Pw(e, c, i, s), c; }
function Pw(e, t, n, o) { e.firstChild === null && (e.firstChild = t), n !== null && (o ? n.child == null && t.parent !== null && (n.child = t) : n.next === null && (n.next = t, t.prev = n)); }
function Fw(e, t, n, o, r, i) { let s = t ? t.injectorIndex : -1, a = 0; return _o() && (a |= 128), { type: n, index: o, insertBeforeIndex: null, injectorIndex: s, directiveStart: -1, directiveEnd: -1, directiveStylingLast: -1, componentOffset: -1, controlDirectiveIndex: -1, customControlIndex: -1, propertyBindings: null, flags: a, providerIndexes: 0, value: r, namespace: pi(), attrs: i, mergedAttrs: null, localNames: null, initialInputs: null, inputs: null, hostDirectiveInputs: null, outputs: null, hostDirectiveOutputs: null, directiveToIndex: null, tView: null, next: null, prev: null, projectionNext: null, child: null, parent: t, projection: null, styles: null, stylesWithoutHost: null, residualStyles: void 0, classes: null, classesWithoutHost: null, residualClasses: void 0, classBindings: 0, styleBindings: 0 }; }
function uy(e, t) { if (e.push(t), e.length > 1)
    for (let n = e.length - 2; n >= 0; n--) {
        let o = e[n];
        dy(o) || Hw(o, t) && jw(o) === null && Vw(o, t.index);
    } }
function dy(e) { return !(e.type & 64); }
function Hw(e, t) { return dy(t) || e.index > t.index; }
function jw(e) { let t = e.insertBeforeIndex; return Array.isArray(t) ? t[0] : t; }
function Vw(e, t) { let n = e.insertBeforeIndex; Array.isArray(n) ? n[0] = t : (Bm(cy, ly), e.insertBeforeIndex = t); }
function Po(e, t) { let n = e.data[t]; return n === null || typeof n == "string" ? null : n.hasOwnProperty("currentCaseLViewIndex") ? n : n.value; }
function Bw(e, t, n) { let o = e.data[t]; o === null ? e.data[t] = n : o.value = n; }
function $w(e, t) { let n = e.insertBeforeIndex; n === null ? (Bm(cy, ly), n = e.insertBeforeIndex = [null, t]) : (Rf(Array.isArray(n), !0, "Expecting array here"), n.push(t)); }
function Uw(e, t, n) { let o = zu(e, n, 64, null, null); return uy(t, o), o; }
function Zs(e, t) { let n = t[e.currentCaseLViewIndex]; return n === null ? n : n < 0 ? ~n : n; }
function zw(e) { return e >>> 17; }
function Ww(e) { return (e & 131070) >>> 1; }
function Gw(e, t, n) { return e | t << 17 | n << 1; }
function fy(e) { return e === -1; }
function Wu(e, t, n) { e.index = 0; let o = Zs(t, n); o !== null ? e.removes = t.remove[o] : e.removes = P; }
function Xi(e) { if (e.index < e.removes.length) {
    let t = e.removes[e.index++];
    if (t > 0)
        return e.lView[t];
    {
        e.stack.push(e.index, e.removes);
        let n = ~t, o = e.lView[m].data[n];
        return Wu(e, o, e.lView), Xi(e);
    }
}
else
    return e.stack.length === 0 ? (e.lView = void 0, null) : (e.removes = e.stack.pop(), e.index = e.stack.pop(), Xi(e)); }
function qw() { let e = { stack: [], index: -1 }; function t(n, o) { for (e.lView = o; e.stack.length;)
    e.stack.pop(); return Wu(e, n.value, o), Xi.bind(null, e); } return t; }
function Qw(e, t) { let n = { stack: [], index: -1, lView: t }; return Wu(n, e, t), Xi.bind(null, n); }
var Zw = new RegExp(`^(\\d+)*(${eu}|${Xl})*(.*)`);
function Yw(e, t) { let n = [e]; for (let o of t) {
    let r = n.length - 1;
    if (r > 0 && n[r - 1] === o) {
        let i = n[r] || 1;
        n[r] = i + 1;
    }
    else
        n.push(o, "");
} return n.join(""); }
function Kw(e) { let t = e.match(Zw), [n, o, r, i] = t, s = o ? parseInt(o, 10) : r, a = []; for (let [c, l, u] of i.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(u, 10) || 1;
    a.push(l, d);
} return [s, ...a]; }
function Jw(e) { return !e.prev && e.parent?.type === 8; }
function bc(e) { return e.index - I; }
function ro(e, t) { return !(e.type & 144) && !!t[e.index] && py(x(t[e.index])); }
function py(e) { return !!e && !e.isConnected; }
function hy(e, t) { let n = e.i18nNodes; if (n)
    return n.get(t); }
function Xw(e, t, n) { let r = e.data[mr]?.[n]; return r ? gy(r, t) : null; }
function wr(e, t, n, o) { let r = bc(o), i = hy(e, r); if (i === void 0) {
    let s = e.data[mr];
    if (s?.[r])
        i = gy(s[r], n);
    else if (t.firstChild === o)
        i = e.firstChild;
    else {
        let a = o.prev === null, c = o.prev ?? o.parent;
        if (Jw(o)) {
            let l = bc(o.parent);
            i = Xc(e, l);
        }
        else {
            let l = ne(c, n);
            if (a)
                i = l.firstChild;
            else {
                let u = bc(c), d = Xc(e, u);
                if (c.type === 2 && d) {
                    let p = fu(e, u) + 1;
                    i = Ys(p, d);
                }
                else
                    i = l.nextSibling;
            }
        }
    }
} return i; }
function Ys(e, t) { let n = t; for (let o = 0; o < e; o++)
    n = n.nextSibling; return n; }
function e_(e, t) { let n = e; for (let o = 0; o < t.length; o += 2) {
    let r = t[o], i = t[o + 1];
    for (let s = 0; s < i; s++)
        switch (r) {
            case Cg:
                n = n.firstChild;
                break;
            case Tg:
                n = n.nextSibling;
                break;
        }
} return n; }
function gy(e, t) { let [n, ...o] = Kw(e), r; if (n === Xl)
    r = t[Y][j];
else if (n === eu)
    r = Cu(t[Y][j]);
else {
    let i = Number(n);
    r = x(t[i + I]);
} return e_(r, o); }
function El(e, t) { if (e === t)
    return []; if (e.parentElement == null || t.parentElement == null)
    return null; if (e.parentElement === t.parentElement)
    return t_(e, t); {
    let n = t.parentElement, o = El(e, n), r = El(n.firstChild, t);
    return !o || !r ? null : [...o, Cg, ...r];
} }
function t_(e, t) { let n = [], o = null; for (o = e; o != null && o !== t; o = o.nextSibling)
    n.push(Tg); return o == null ? null : n; }
function Wp(e, t, n) { let o = El(e, t); return o === null ? null : Yw(n, o); }
function my(e, t, n) { let o = e.parent, r, i, s; for (; o !== null && (ro(o, t) || n?.has(o.index));)
    o = o.parent; o === null || !(o.type & 3) ? (r = s = Xl, i = t[Y][j]) : (r = o.index, i = x(t[r]), s = M(r - I)); let a = x(t[e.index]); if (e.type & 44) {
    let l = Qt(t, e);
    l && (a = l);
} let c = Wp(i, a, s); if (c === null && i !== a) {
    let l = i.ownerDocument.body;
    if (c = Wp(l, a, eu), c === null)
        throw _w(t, e);
} return c; }
function yy(e, t) { let n = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, { acceptNode: n_ }), o, r = new Map; for (; o = n.nextNode();) {
    let i = "ngh=", s = o?.textContent, a = s?.indexOf(i) ?? -1;
    if (a > -1) {
        let c = s.substring(a + i.length).trim();
        r.set(c, o);
    }
} return r; }
function n_(e) { return e.textContent?.trimStart().startsWith("ngh=") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
var vy = !1, Iy = () => { };
function Gu(e) { vy = e; }
function Ks() { return vy; }
function o_(e, t, n, o) { Iy(e, t, n, o); }
function Ey() { Iy = c_; }
function Dy(e) { return e = e ?? E(De), e.get(ou, !1); }
function Cy(e, t) { let n = t.i18nChildren.get(e); return n === void 0 && (n = r_(e), t.i18nChildren.set(e, n)), n; }
function r_(e) { let t = new Set; function n(o) { switch (t.add(o.index), o.kind) {
    case 1:
    case 2: {
        for (let r of o.children)
            n(r);
        break;
    }
    case 3: {
        for (let r of o.cases)
            for (let i of r)
                n(i);
        break;
    }
} } for (let o = I; o < e.bindingStartIndex; o++) {
    let r = e.data[o];
    if (!(!r || !r.ast))
        for (let i of r.ast)
            n(i);
} return t.size === 0 ? null : t; }
function Ty(e, t, n) { if (!n.isI18nHydrationEnabled)
    return null; let o = e[m], r = o.data[t]; if (!r || !r.ast)
    return null; let i = o.data[r.parentTNodeIndex]; if (i && dg(i))
    return null; let s = { caseQueue: [], disconnectedNodes: new Set, disjointNodes: new Set }; return Dl(e, s, n, r.ast), s.caseQueue.length === 0 && s.disconnectedNodes.size === 0 && s.disjointNodes.size === 0 ? null : s; }
function Dl(e, t, n, o) { let r = null; for (let i of o) {
    let s = s_(e, t, n, i);
    s && (i_(r, s) && t.disjointNodes.add(i.index - I), r = s);
} return r; }
function i_(e, t) { return e && e.nextSibling !== t; }
function s_(e, t, n, o) { let r = x(e[o.index]); if (!r || py(r))
    return t.disconnectedNodes.add(o.index - I), null; let i = r; switch (o.kind) {
    case 0: {
        pu(n, i);
        break;
    }
    case 1:
    case 2: {
        Dl(e, t, n, o.children);
        break;
    }
    case 3: {
        let s = e[o.currentCaseLViewIndex];
        if (s != null) {
            let a = s < 0 ? ~s : s;
            t.caseQueue.push(a), Dl(e, t, n, o.cases[a]);
        }
        break;
    }
} return a_(e, o); }
function a_(e, t) { let o = e[m].data[t.index]; return ps(o) ? Qt(e, o) : t.kind === 3 ? Qw(o, e)() ?? x(e[t.index]) : x(e[t.index]) ?? null; }
function zt(e, t) { e.currentNode = t; }
function Ro(e, t, n) { let o = n.index - I, { disconnectedNodes: r } = e, i = t.currentNode; return t.isConnected ? (e.i18nNodes.set(o, i), r.delete(o)) : r.add(o), i; }
function Ac(e, t) { let n = e.currentNode; for (let o = 0; o < t && n; o++)
    n = n?.nextSibling ?? null; return n; }
function Rc(e, t) { return { currentNode: t, isConnected: e.isConnected }; }
function c_(e, t, n, o) { let r = e[re]; if (!r || !Ks() || n && (dg(n) || _s(r, n.index - I)))
    return; let i = e[m], s = i.data[t]; function a() { if (fy(o)) {
    let p = wr(r, i, e, n);
    return n.type & 8 ? p : p.firstChild;
} return r?.firstChild; } let c = a(), l = Ug(r) ?? new Set, u = r.i18nNodes ??= new Map, d = r.data[Ds]?.[t - I] ?? [], f = r.dehydratedIcuData ??= new Map; En({ hydrationInfo: r, lView: e, i18nNodes: u, disconnectedNodes: l, caseQueue: d, dehydratedIcuData: f }, { currentNode: c, isConnected: !0 }, s.ast), r.disconnectedNodes = l.size === 0 ? null : l; }
function En(e, t, n) { if (Array.isArray(n)) {
    let o = t;
    for (let r of n) {
        let i = Xw(e.hydrationInfo, e.lView, r.index - I);
        i && (o = Rc(t, i)), En(e, o, r);
    }
}
else {
    if (e.disconnectedNodes.has(n.index - I))
        return;
    switch (n.kind) {
        case 0: {
            let o = Ro(e, t, n);
            zt(t, o?.nextSibling ?? null);
            break;
        }
        case 1: {
            En(e, Rc(t, t.currentNode?.firstChild ?? null), n.children);
            let o = Ro(e, t, n);
            zt(t, o?.nextSibling ?? null);
            break;
        }
        case 2: {
            let o = n.index - I, { hydrationInfo: r } = e, i = Bg(r, o);
            switch (n.type) {
                case 0: {
                    let s = Ro(e, t, n);
                    if (CM(r, o)) {
                        En(e, t, n.children);
                        let a = Ac(t, 1);
                        zt(t, a);
                    }
                    else if (En(e, Rc(t, t.currentNode?.firstChild ?? null), n.children), zt(t, s?.nextSibling ?? null), i !== null) {
                        let a = Ac(t, i + 1);
                        zt(t, a);
                    }
                    break;
                }
                case 1: {
                    Ro(e, t, n);
                    let s = Ac(t, i + 1);
                    zt(t, s);
                    break;
                }
            }
            break;
        }
        case 3: {
            let o = t.isConnected ? e.caseQueue.shift() : null, r = { currentNode: null, isConnected: !1 };
            for (let s = 0; s < n.cases.length; s++)
                En(e, s === o ? t : r, n.cases[s]);
            o !== null && e.dehydratedIcuData.set(n.index, { case: o, node: n });
            let i = Ro(e, t, n);
            zt(t, i?.nextSibling ?? null);
            break;
        }
    }
} }
var My = () => { };
function l_(e, t, n) { My(e, t, n); }
function Ny() { My = u_; }
function u_(e, t, n) { let o = e[re]?.dehydratedIcuData; o && o.get(t)?.case === n && o.delete(t); }
function d_(e) { let t = e[re]; if (t) {
    let { i18nNodes: n, dehydratedIcuData: o } = t;
    if (n && o) {
        let r = e[C];
        for (let i of o.values())
            f_(r, n, i);
    }
    t.i18nNodes = void 0, t.dehydratedIcuData = void 0;
} }
function f_(e, t, n) { for (let o of n.node.cases[n.case]) {
    let r = t.get(o.index - I);
    r && Dr(e, r, !1);
} }
function Js(e) { let t = e[Ie] ?? [], o = e[G][C], r = []; for (let i of t)
    i.data[Cs] !== void 0 ? r.push(i) : wy(i, o); e[Ie] = r; }
function p_(e) { let { lContainer: t } = e, n = t[Ie]; if (n === null)
    return; let r = t[G][C]; for (let i of n)
    wy(i, r); }
function wy(e, t) { let n = 0, o = e.firstChild; if (o) {
    let r = e.data[rt];
    for (; n < r;) {
        let i = o.nextSibling;
        Dr(t, o, !1), o = i, n++;
    }
} }
function Xs(e) { Js(e); let t = e[j]; te(t) && er(t); for (let n = H; n < e.length; n++)
    er(e[n]); }
function er(e) { d_(e); let t = e[m]; for (let n = I; n < t.bindingStartIndex; n++)
    if (J(e[n])) {
        let o = e[n];
        Xs(o);
    }
    else
        te(e[n]) && er(e[n]); }
function qu(e) { let t = e._views; for (let n of t) {
    let o = du(n);
    o !== null && o[j] !== null && (te(o) ? er(o) : Xs(o));
} }
function h_(e, t, n, o) { e !== null && (n.cleanup(t), Xs(e.lContainer), qu(o)); }
function g_(e, t) { let n = []; for (let o of t)
    for (let r = 0; r < (o[gr] ?? 1); r++) {
        let i = { data: o, firstChild: null };
        o[rt] > 0 && (i.firstChild = e, e = Ys(o[rt], e)), n.push(i);
    } return [e, n]; }
var _y = () => null, Sy = () => null;
function by() { _y = m_, Sy = y_; }
function m_(e, t) { return Ry(e, t) ? e[Ie].shift() : (Js(e), null); }
function tr(e, t) { return _y(e, t); }
function y_(e, t, n) { if (t.tView.ssrId === null)
    return null; let o = tr(e, t.tView.ssrId); return n[m].firstUpdatePass && o === null && v_(n, t), o; }
function Ay(e, t, n) { return Sy(e, t, n); }
function v_(e, t) { let n = t; for (; n;) {
    if (Gp(e, n))
        return;
    if ((n.flags & 256) === 256)
        break;
    n = n.prev;
} for (n = t.next; n && (n.flags & 512) === 512;) {
    if (Gp(e, n))
        return;
    n = n.next;
} }
function Ry(e, t) { let n = e[Ie]; return !t || n === null || n.length === 0 ? !1 : n[0].data[Es] === t; }
function Gp(e, t) { let n = t.tView?.ssrId; if (n == null)
    return !1; let o = e[t.index]; return J(o) && Ry(o, n) ? (Js(o), !0) : !1; }
var ky = class {
}, ea = class {
}, Cl = class {
    resolveComponentFactory(t) { throw new w(917, !1); }
}, _r = class {
    static NULL = new Cl;
}, nr = class {
}, I_ = (() => { class e {
    destroyNode = null;
    static __NG_ELEMENT_ID__ = () => E_();
} return e; })();
function E_() { let e = g(), t = T(), n = de(t.index, e); return (te(n) ? n : e)[C]; }
var xy = (() => { class e {
    static \u0275prov = V({ token: e, providedIn: "root", factory: () => null });
} return e; })();
function Qu(e) { return e.ngModule !== void 0; }
function Wt(e) { return !!hn(e); }
function Mi(e) { return !!Ve(e); }
function qp(e) { return !!Te(e); }
function Fo(e) { return !!W(e); }
function D_(e) { return W(e) ? "component" : Te(e) ? "directive" : Ve(e) ? "pipe" : "type"; }
function C_(e, t) { if (Wr(e) && (e = z(e), !e))
    throw new Error(`Expected forwardRef function, imported from "${Me(t)}", to return a standalone entity or NgModule but got "${Me(e) || e}".`); if (hn(e) == null) {
    let n = W(e) || Te(e) || Ve(e);
    if (n != null) {
        if (!n.standalone) {
            let o = D_(e);
            throw new Error(`The "${Me(e)}" ${o}, imported from "${Me(t)}", is not standalone. Does the ${o} have the standalone: false flag?`);
        }
    }
    else
        throw Qu(e) ? new Error(`A module with providers was imported from "${Me(t)}". Modules with providers are not supported in standalone components imports.`) : new Error(`The "${Me(e)}" type, imported from "${Me(t)}", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?`);
} }
var Tl = class {
    ownerNgModule = new WeakMap;
    ngModulesWithSomeUnresolvedDecls = new Set;
    ngModulesScopeCache = new WeakMap;
    standaloneComponentsScopeCache = new WeakMap;
    resolveNgModulesDecls() { if (this.ngModulesWithSomeUnresolvedDecls.size !== 0) {
        for (let t of this.ngModulesWithSomeUnresolvedDecls) {
            let n = hn(t);
            if (n?.declarations)
                for (let o of Mn(n.declarations))
                    Fo(o) && this.ownerNgModule.set(o, t);
        }
        this.ngModulesWithSomeUnresolvedDecls.clear();
    } }
    getComponentDependencies(t, n) { this.resolveNgModulesDecls(); let o = W(t); if (o === null)
        throw new Error(`Attempting to get component dependencies for a type that is not a component: ${t}`); if (o.standalone) {
        let r = this.getStandaloneComponentScope(t, n);
        return r.compilation.isPoisoned ? { dependencies: [] } : { dependencies: [...r.compilation.directives, ...r.compilation.pipes, ...r.compilation.ngModules] };
    }
    else {
        if (!this.ownerNgModule.has(t))
            return { dependencies: [] };
        let r = this.getNgModuleScope(this.ownerNgModule.get(t));
        return r.compilation.isPoisoned ? { dependencies: [] } : { dependencies: [...r.compilation.directives, ...r.compilation.pipes] };
    } }
    registerNgModule(t, n) { if (!Wt(t))
        throw new Error(`Attempting to register a Type which is not NgModule as NgModule: ${t}`); this.ngModulesWithSomeUnresolvedDecls.add(t); }
    clearScopeCacheFor(t) { this.ngModulesScopeCache.delete(t), this.standaloneComponentsScopeCache.delete(t); }
    getNgModuleScope(t) { if (this.ngModulesScopeCache.has(t))
        return this.ngModulesScopeCache.get(t); let n = this.computeNgModuleScope(t); return this.ngModulesScopeCache.set(t, n), n; }
    computeNgModuleScope(t) { let n = Zr(t), o = { exported: { directives: new Set, pipes: new Set }, compilation: { directives: new Set, pipes: new Set } }; for (let r of Mn(n.imports))
        if (Wt(r)) {
            let i = this.getNgModuleScope(r);
            Tt(i.exported.directives, o.compilation.directives), Tt(i.exported.pipes, o.compilation.pipes);
        }
        else if (mo(r))
            if (qp(r) || Fo(r))
                o.compilation.directives.add(r);
            else if (Mi(r))
                o.compilation.pipes.add(r);
            else
                throw new w(980, "The standalone imported type is neither a component nor a directive nor a pipe");
        else {
            o.compilation.isPoisoned = !0;
            break;
        } if (!o.compilation.isPoisoned)
        for (let r of Mn(n.declarations)) {
            if (Wt(r) || mo(r)) {
                o.compilation.isPoisoned = !0;
                break;
            }
            Mi(r) ? o.compilation.pipes.add(r) : o.compilation.directives.add(r);
        } for (let r of Mn(n.exports))
        if (Wt(r)) {
            let i = this.getNgModuleScope(r);
            Tt(i.exported.directives, o.exported.directives), Tt(i.exported.pipes, o.exported.pipes), Tt(i.exported.directives, o.compilation.directives), Tt(i.exported.pipes, o.compilation.pipes);
        }
        else
            Mi(r) ? o.exported.pipes.add(r) : o.exported.directives.add(r); return o; }
    getStandaloneComponentScope(t, n) { if (this.standaloneComponentsScopeCache.has(t))
        return this.standaloneComponentsScopeCache.get(t); let o = this.computeStandaloneComponentScope(t, n); return this.standaloneComponentsScopeCache.set(t, o), o; }
    computeStandaloneComponentScope(t, n) { let o = { compilation: { directives: new Set([t]), pipes: new Set, ngModules: new Set } }; for (let r of Le(n ?? [])) {
        let i = z(r);
        try {
            C_(i, t);
        }
        catch {
            return o.compilation.isPoisoned = !0, o;
        }
        if (Wt(i)) {
            o.compilation.ngModules.add(i);
            let s = this.getNgModuleScope(i);
            if (s.exported.isPoisoned)
                return o.compilation.isPoisoned = !0, o;
            Tt(s.exported.directives, o.compilation.directives), Tt(s.exported.pipes, o.compilation.pipes);
        }
        else if (Mi(i))
            o.compilation.pipes.add(i);
        else if (qp(i) || Fo(i))
            o.compilation.directives.add(i);
        else
            return o.compilation.isPoisoned = !0, o;
    } return o; }
    isOrphanComponent(t) { let n = W(t); return !n || n.standalone ? !1 : (this.resolveNgModulesDecls(), !this.ownerNgModule.has(t)); }
};
function Tt(e, t) { for (let n of e)
    t.add(n); }
var Pn = new Tl, xi = {}, bn = class {
    injector;
    parentInjector;
    constructor(t, n) { this.injector = t, this.parentInjector = n; }
    get(t, n, o) { let r = this.injector.get(t, xi, o); return r !== xi || n === xi ? r : this.parentInjector.get(t, n, o); }
};
function es(e, t, n) { let o = n ? e.styles : null, r = n ? e.classes : null, i = 0; if (t !== null)
    for (let s = 0; s < t.length; s++) {
        let a = t[s];
        if (typeof a == "number")
            i = a;
        else if (i == 1)
            r = zr(r, a);
        else if (i == 2) {
            let c = a, l = t[++s];
            o = zr(o, c + ": " + l + ";");
        }
    } n ? e.styles = o : e.stylesWithoutHost = o, n ? e.classes = r : e.classesWithoutHost = r; }
function io(e, t = 0) { let n = g(); if (n === null)
    return Oe(e, t); let o = T(); return og(o, n, z(e), t); }
function Oy() { let e = "invalid"; throw new Error(e); }
function Ly(e, t, n, o, r) { let i = o === null ? null : { "": -1 }, s = r(e, n); if (s !== null) {
    let a = s, c = null, l = null;
    for (let u of s)
        if (u.resolveHostDirectives !== null) {
            [a, c, l] = u.resolveHostDirectives(s);
            break;
        }
    N_(e, t, n, a, i, c, l);
} i !== null && o !== null && T_(n, o, i); }
function T_(e, t, n) { let o = e.localNames = []; for (let r = 0; r < t.length; r += 2) {
    let i = n[t[r + 1]];
    if (i == null)
        throw new w(-301, !1);
    o.push(t[r], i);
} }
function M_(e, t, n) { t.componentOffset = n, (e.components ??= []).push(t.index); }
function N_(e, t, n, o, r, i, s) { let a = o.length, c = null; for (let f = 0; f < a; f++) {
    let p = o[f];
    c === null && Se(p) && (c = p, M_(e, n, f)), Gc(Ui(n, t), e, p.type);
} R_(n, e.data.length, a), c?.viewProvidersResolver && c.viewProvidersResolver(c); for (let f = 0; f < a; f++) {
    let p = o[f];
    p.providersResolver && p.providersResolver(p);
} let l = !1, u = !1, d = Tr(e, t, a, null); a > 0 && (n.directiveToIndex = new Map); for (let f = 0; f < a; f++) {
    let p = o[f];
    if (n.mergedAttrs = xn(n.mergedAttrs, p.hostAttrs), __(e, n, t, d, p), A_(d, p, r), s !== null && s.has(p)) {
        let [y, v] = s.get(p);
        n.directiveToIndex.set(p.type, [d, y + n.directiveStart, v + n.directiveStart]);
    }
    else
        (i === null || !i.has(p)) && n.directiveToIndex.set(p.type, d);
    p.contentQueries !== null && (n.flags |= 4), (p.hostBindings !== null || p.hostAttrs !== null || p.hostVars !== 0) && (n.flags |= 64);
    let h = p.type.prototype;
    !l && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), l = !0), !u && (h.ngOnChanges || h.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), u = !0), d++;
} w_(e, n, i); }
function w_(e, t, n) { for (let o = t.directiveStart; o < t.directiveEnd; o++) {
    let r = e.data[o];
    if (n === null || !n.has(r))
        Qp(0, t, r, o), Qp(1, t, r, o), Yp(t, o, !1);
    else {
        let i = n.get(r);
        Zp(0, t, i, o), Zp(1, t, i, o), Yp(t, o, !0);
    }
} }
function Qp(e, t, n, o) { let r = e === 0 ? n.inputs : n.outputs; for (let i in r)
    if (r.hasOwnProperty(i)) {
        let s;
        e === 0 ? s = t.inputs ??= {} : s = t.outputs ??= {}, s[i] ??= [], s[i].push(o), Py(t, i);
    } }
function Zp(e, t, n, o) { let r = e === 0 ? n.inputs : n.outputs; for (let i in r)
    if (r.hasOwnProperty(i)) {
        let s = r[i], a;
        e === 0 ? a = t.hostDirectiveInputs ??= {} : a = t.hostDirectiveOutputs ??= {}, a[s] ??= [], a[s].push(o, i), Py(t, s);
    } }
function Py(e, t) { t === "class" ? e.flags |= 8 : t === "style" && (e.flags |= 16); }
function Yp(e, t, n) { let { attrs: o, inputs: r, hostDirectiveInputs: i } = e; if (o === null || !n && r === null || n && i === null || Tu(e)) {
    e.initialInputs ??= [], e.initialInputs.push(null);
    return;
} let s = null, a = 0; for (; a < o.length;) {
    let c = o[a];
    if (c === 0) {
        a += 4;
        continue;
    }
    else if (c === 5) {
        a += 2;
        continue;
    }
    else if (typeof c == "number")
        break;
    if (!n && r.hasOwnProperty(c)) {
        let l = r[c];
        for (let u of l)
            if (u === t) {
                s ??= [], s.push(c, o[a + 1]);
                break;
            }
    }
    else if (n && i.hasOwnProperty(c)) {
        let l = i[c];
        for (let u = 0; u < l.length; u += 2)
            if (l[u] === t) {
                s ??= [], s.push(l[u + 1], o[a + 1]);
                break;
            }
    }
    a += 2;
} e.initialInputs ??= [], e.initialInputs.push(s); }
function __(e, t, n, o, r) { e.data[o] = r; let i = r.factory || (r.factory = Kr(r.type, !0)), s = new Yt(i, Se(r), io, null); e.blueprint[o] = s, n[o] = s, S_(e, t, o, Tr(e, n, r.hostVars, L), r); }
function S_(e, t, n, o, r) { let i = r.hostBindings; if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    b_(s) != a && s.push(a), s.push(n, o, i);
} }
function b_(e) { let t = e.length; for (; t > 0;) {
    let n = e[--t];
    if (typeof n == "number" && n < 0)
        return n;
} return 0; }
function A_(e, t, n) { if (n) {
    if (t.exportAs)
        for (let o = 0; o < t.exportAs.length; o++)
            n[t.exportAs[o]] = e;
    Se(t) && (n[""] = e);
} }
function R_(e, t, n) { e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t; }
function Zu(e, t, n, o, r, i, s, a) { let c = t[m], l = c.consts, u = le(l, s), d = fn(c, e, n, o, u); return i && Ly(c, t, d, le(l, a), r), d.mergedAttrs = xn(d.mergedAttrs, d.attrs), d.attrs !== null && es(d, d.attrs, !1), d.mergedAttrs !== null && es(d, d.mergedAttrs, !0), c.queries !== null && c.queries.elementStart(c, d), d; }
function Yu(e, t) { qh(e, t), $a(t) && e.queries.elementEnd(t); }
function Fy(e, t, n, o, r, i) { let s = t.consts, a = le(s, r), c = fn(t, e, n, o, a); if (c.mergedAttrs = xn(c.mergedAttrs, c.attrs), i != null) {
    let l = le(s, i);
    c.localNames = [];
    for (let u = 0; u < l.length; u += 2)
        c.localNames.push(l[u], -1);
} return c.attrs !== null && es(c, c.attrs, !1), c.mergedAttrs !== null && es(c, c.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, c), c; }
function or(e) { return ta(e) ? Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e : !1; }
function k_(e, t, n) { let o = e[Symbol.iterator](), r = t[Symbol.iterator](); for (;;) {
    let i = o.next(), s = r.next();
    if (i.done && s.done)
        return !0;
    if (i.done || s.done || !n(i.value, s.value))
        return !1;
} }
function Hy(e, t) { if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
        t(e[n]);
else {
    let n = e[Symbol.iterator](), o;
    for (; !(o = n.next()).done;)
        t(o.value);
} }
function ta(e) { return e !== null && (typeof e == "function" || typeof e == "object"); }
function jy(e, t) { let n = or(e), o = or(t); return n && o ? k_(e, t, jy) : !n && (e && (typeof e == "object" || typeof e == "function")) && !o && (t && (typeof t == "object" || typeof t == "function")) ? !0 : Object.is(e, t); }
function je(e, t, n) { return e[t] = n; }
function so(e, t) { return e[t]; }
function U(e, t, n) { if (n === L)
    return !1; let o = e[t]; return Object.is(o, n) ? !1 : (e[t] = n, !0); }
function tn(e, t, n, o) { let r = U(e, t, n); return U(e, t + 1, o) || r; }
function na(e, t, n, o, r) { let i = tn(e, t, n, o); return U(e, t + 2, r) || i; }
function Re(e, t, n, o, r, i) { let s = tn(e, t, n, o); return tn(e, t + 2, r, i) || s; }
function _t(e, t, n) { return function o(r) { let i = o.__ngNativeEl__; i !== void 0 && fM(r, i); let s = he(e) ? de(e.index, t) : t; Nr(s, 5); let a = t[F], c = Kp(t, a, n, r), l = o.__ngNextListenerFn__; for (; l;)
    c = Kp(t, a, l, r) && c, l = l.__ngNextListenerFn__; return c; }; }
function Kp(e, t, n, o) { let r = b(null); try {
    return O(R.OutputStart, t, n), n(o) !== !1;
}
catch (i) {
    return $u(e, i), !1;
}
finally {
    O(R.OutputEnd, t, n), b(r);
} }
function Ku(e, t, n, o, r, i, s, a) { let c = yn(e), l = !1, u = null; if (!o && c && (u = O_(t, n, i, e.index)), u !== null) {
    let d = u.__ngLastListenerFn__ || u;
    d.__ngNextListenerFn__ = s, u.__ngLastListenerFn__ = s, l = !0;
}
else {
    let d = ne(e, n), f = o ? o(d) : d;
    pM(n, f, i, a), o || (a.__ngNativeEl__ = d);
    let p = r.listen(f, i, a);
    if (!x_(i)) {
        let h = o ? y => o(x(y[e.index])) : e.index;
        Vy(h, t, n, i, a, p, !1);
    }
} return l; }
function x_(e) { return e.startsWith("animation") || e.startsWith("transition"); }
function O_(e, t, n, o) { let r = e.cleanup; if (r != null)
    for (let i = 0; i < r.length - 1; i += 2) {
        let s = r[i];
        if (s === n && r[i + 1] === o) {
            let a = t[Ot], c = r[i + 2];
            return a && a.length > c ? a[c] : null;
        }
        typeof s == "string" && (i += 2);
    } return null; }
function Vy(e, t, n, o, r, i, s) { let a = t.firstCreatePass ? Zf(t) : null, c = Qf(n), l = c.length; c.push(r, i), a && a.push(o, e, l, (l + 1) * (s ? -1 : 1)); }
function L_(e, t, n, o, r) { let i = _t(e, t, n), s = P_(e, t, o, r, i); }
function P_(e, t, n, o, r) { let i = null, s = null, a = null, c = !1, l = e.directiveToIndex.get(n.type); if (typeof l == "number" ? i = l : [i, s, a] = l, s !== null && a !== null && e.hostDirectiveOutputs?.hasOwnProperty(o)) {
    let u = e.hostDirectiveOutputs[o];
    for (let d = 0; d < u.length; d += 2) {
        let f = u[d];
        if (f >= s && f <= a)
            c = !0, Fn(e, t, f, u[d + 1], o, r);
        else if (f > a)
            break;
    }
} return n.outputs.hasOwnProperty(o) && (c = !0, Fn(e, t, i, o, o, r)), c; }
function Fn(e, t, n, o, r, i) { let s = t[n], a = t[m], l = a.data[n].outputs[o], d = s[l].subscribe(i); Vy(e.index, a, t, r, i, d, !0); }
function By() { $y(); }
function $y() { let e = g(), t = N(), n = T(); if (t.firstCreatePass && F_(t, n), n.controlDirectiveIndex === -1)
    return; q("NgSignalForms"); let o = e[n.controlDirectiveIndex]; t.data[n.controlDirectiveIndex].controlDef.create(o, new ts(e, t, n)); }
function Uy() { zy(); }
function zy() { let e = g(), t = N(), n = Ee(); if (n.controlDirectiveIndex === -1)
    return; let o = t.data[n.controlDirectiveIndex].controlDef, r = e[n.controlDirectiveIndex]; o.update(r, new ts(e, t, n)); }
var ts = class {
    lView;
    tView;
    tNode;
    hasPassThrough;
    constructor(t, n, o) { this.lView = t, this.tView = n, this.tNode = o, this.hasPassThrough = !!(o.flags & 4096); }
    get customControl() { return this.tNode.customControlIndex !== -1 ? this.lView[this.tNode.customControlIndex] : void 0; }
    get descriptor() { return `<${this.tNode.value}>`; }
    listenToCustomControlOutput(t, n) { Wy(this.tView.data[this.tNode.customControlIndex], t) && Fn(this.tNode, this.lView, this.tNode.customControlIndex, t, t, _t(this.tNode, this.lView, n)); }
    listenToCustomControlModel(t) { let n = this.tNode.flags & 1024 ? "valueChange" : "checkedChange"; Fn(this.tNode, this.lView, this.tNode.customControlIndex, n, n, _t(this.tNode, this.lView, t)); }
    listenToDom(t, n) { Ku(this.tNode, this.tView, this.lView, void 0, this.lView[C], t, n, _t(this.tNode, this.lView, n)); }
    setInputOnDirectives(t, n) { let o = this.tNode.inputs?.[t], r = this.tNode.hostDirectiveInputs?.[t]; if (!o && !r)
        return !1; if (o)
        for (let i of o) {
            let s = this.tView.data[i], a = this.lView[i];
            wt(s, a, t, n);
        } if (r)
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i], a = r[i + 1], c = this.tView.data[s], l = this.lView[s];
            wt(c, l, a, n);
        } return !0; }
    setCustomControlModelInput(t) { let n = this.lView[this.tNode.customControlIndex], o = this.tView.data[this.tNode.customControlIndex], r = this.tNode.flags & 1024 ? "value" : "checked"; wt(o, n, r, t); }
    customControlHasInput(t) { return this.tNode.customControlIndex === -1 ? !1 : this.tView.data[this.tNode.customControlIndex].inputs[t] != null; }
};
function F_(e, t, n) { for (let r = t.directiveStart; r < t.directiveEnd; r++)
    if (e.data[r].controlDef) {
        t.controlDirectiveIndex = r;
        break;
    } if (t.controlDirectiveIndex === -1)
    return; let o = e.data[t.controlDirectiveIndex].controlDef; if (o.passThroughInput && (t.inputs?.[o.passThroughInput]?.length ?? 0) > 1) {
    t.flags |= 4096;
    return;
} H_(e, t); }
function H_(e, t) { for (let n = t.directiveStart; n < t.directiveEnd; n++) {
    let o = e.data[n];
    if (Jp(o, "value")) {
        t.flags |= 1024, t.customControlIndex = n;
        return;
    }
    if (Jp(o, "checked")) {
        t.flags |= 2048, t.customControlIndex = n;
        return;
    }
} }
function Jp(e, t) { return j_(e, t) && Wy(e, t + "Change"); }
function j_(e, t) { return t in e.inputs; }
function Wy(e, t) { return t in e.outputs; }
var ot = Symbol("BINDING"), Xp = { kind: "input", requiredVars: 1 }, V_ = { kind: "output", requiredVars: 0 };
function eh(e, t, n) { let o = g(), r = fe(); if (U(o, r, n)) {
    let i = o[m], s = Ee(), a = de(s.index, o);
    Nr(a, 1);
    let c = i.directiveRegistry[e], l = sw(s, i, o, c, t, n);
} }
function Gy(e, t) { if (e === "formField") {
    let o = { [ot]: Xp, create: () => { $y(); }, update: () => { eh(o.targetIdx, e, t()), zy(); } };
    return o;
} let n = { [ot]: Xp, update: () => eh(n.targetIdx, e, t()) }; return n; }
function qy(e, t) { let n = { [ot]: V_, create: () => { let o = g(), r = T(), s = o[m].directiveRegistry[n.targetIdx]; L_(r, o, t, s, e); } }; return n; }
function B_(e, t) { let n = Gy(e, t), o = qy(e + "Change", i => t.set(i)); return { [ot]: { kind: "twoWay", requiredVars: n[ot].requiredVars + o[ot].requiredVars }, set targetIdx(i) { n.targetIdx = i, o.targetIdx = i; }, create: o.create, update: n.update }; }
function $_(e) { let t = e; for (; t;) {
    let n = FT(t);
    if (n !== null)
        for (let o = I; o < n.length; o++) {
            let r = n[o];
            if (!te(r) && !J(r) || r[j] !== t)
                continue;
            let i = n[m], s = Ht(i, o);
            if (he(s)) {
                let a = i.data[s.directiveStart + s.componentOffset], c = Ju(a);
                if (c !== null)
                    return c;
                break;
            }
        }
    t = t.parentNode;
} return null; }
function Ju(e) { return e.debugInfo?.className || e.type.name || null; }
var ns = class extends _r {
    ngModule;
    constructor(t) { super(), this.ngModule = t; }
    resolveComponentFactory(t) { let n = W(t); return new bt(n, this.ngModule); }
};
function U_(e) { return Object.keys(e).map(t => { let [n, o, r] = e[t], i = { propName: n, templateName: t, isSignal: (o & ks.SignalBased) !== 0 }; return r && (i.transform = r), i; }); }
function z_(e) { return Object.keys(e).map(t => ({ propName: e[t], templateName: t })); }
function W_(e, t, n) { let o = t instanceof mt ? t : t?.injector; return o && e.getStandaloneInjector !== null && (o = e.getStandaloneInjector(o) || o), o ? new bn(n, o) : n; }
function G_(e) { let t = e.get(nr, null); if (t === null)
    throw new w(407, !1); let n = e.get(xy, null), o = e.get(Ct, null), r = e.get(dn, null, { optional: !0 }); return { rendererFactory: t, sanitizer: n, changeDetectionScheduler: o, ngReflect: !1, tracingService: r }; }
function q_(e, t) { let n = Qy(e); return As(t, n, n === "svg" ? Bf : n === "math" ? $f : null); }
function Qy(e) { return (e.selectors[0][0] || "div").toLowerCase(); }
var bt = class extends ea {
    componentDef;
    ngModule;
    selector;
    componentType;
    ngContentSelectors;
    isBoundToModule;
    cachedInputs = null;
    cachedOutputs = null;
    get inputs() { return this.cachedInputs ??= U_(this.componentDef.inputs), this.cachedInputs; }
    get outputs() { return this.cachedOutputs ??= z_(this.componentDef.outputs), this.cachedOutputs; }
    constructor(t, n) { super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = MN(t.selectors), this.ngContentSelectors = t.ngContentSelectors ?? [], this.isBoundToModule = !!n; }
    create(t, n, o, r, i, s) { O(R.DynamicComponentStart); let a = b(null); try {
        let c = this.componentDef, l = W_(c, r || this.ngModule, t), u = G_(l), d = u.tracingService;
        return d && d.componentCreate ? d.componentCreate(Ju(c), () => this.createComponentRef(u, l, n, o, i, s)) : this.createComponentRef(u, l, n, o, i, s);
    }
    finally {
        b(a);
    } }
    createComponentRef(t, n, o, r, i, s) { let a = this.componentDef, c = Q_(r, a, s, i), l = t.rendererFactory.createRenderer(null, a), u = r ? KN(l, r, a.encapsulation, n) : q_(a, l), d = s?.some(th) || i?.some(h => typeof h != "function" && h.bindings.some(th)), f = Rs(null, c, null, 512 | Nu(a), null, null, t, l, n, null, jg(u, n, !0)); f[I] = u, di(f); let p = null; try {
        let h = Zu(I, f, 2, "#host", () => c.directiveRegistry, !0, 0);
        dm(l, u, h), be(u, f), Bs(c, f, h), hu(c, h, f), Yu(c, h), o !== void 0 && Y_(h, this.ngContentSelectors, o), p = de(h.index, f), f[F] = p[F], Gs(c, f, null);
    }
    catch (h) {
        throw p !== null && Qc(p), Qc(f), h;
    }
    finally {
        O(R.DynamicComponentEnd), fi();
    } return new os(this.componentType, f, !!d); }
};
function Q_(e, t, n, o) { let r = e ? ["ng-version", "21.2.14"] : NN(t.selectors[0]), i = null, s = null, a = 0; if (n)
    for (let u of n)
        a += u[ot].requiredVars, u.create && (u.targetIdx = 0, (i ??= []).push(u)), u.update && (u.targetIdx = 0, (s ??= []).push(u)); if (o)
    for (let u = 0; u < o.length; u++) {
        let d = o[u];
        if (typeof d != "function")
            for (let f of d.bindings) {
                a += f[ot].requiredVars;
                let p = u + 1;
                f.create && (f.targetIdx = p, (i ??= []).push(f)), f.update && (f.targetIdx = p, (s ??= []).push(f));
            }
    } let c = [t]; if (o)
    for (let u of o) {
        let d = typeof u == "function" ? u : u.type, f = Te(d);
        c.push(f);
    } return Mu(0, null, Z_(i, s), 1, a, c, null, null, null, [r], null); }
function Z_(e, t) { return !e && !t ? null : n => { if (n & 1 && e)
    for (let o of e)
        o.create(); if (n & 2 && t)
    for (let o of t)
        o.update(); }; }
function th(e) { let t = e[ot].kind; return t === "input" || t === "twoWay"; }
var os = class extends ky {
    _rootLView;
    _hasInputBindings;
    instance;
    hostView;
    changeDetectorRef;
    componentType;
    location;
    previousInputValues = null;
    _tNode;
    constructor(t, n, o) { super(), this._rootLView = n, this._hasInputBindings = o, this._tNode = Ht(n[m], I), this.location = Wn(this._tNode, n), this.instance = de(this._tNode.index, n)[F], this.hostView = this.changeDetectorRef = new St(n, void 0), this.componentType = t; }
    setInput(t, n) { this._hasInputBindings; let o = this._tNode; if (this.previousInputValues ??= new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
        return; let r = this._rootLView, i = Ws(o, r[m], r, t, n); this.previousInputValues.set(t, n); let s = de(o.index, r); Nr(s, 1); }
    get injector() { return new Nt(this._tNode, this._rootLView); }
    destroy() { this.hostView.destroy(); }
    onDestroy(t) { this.hostView.onDestroy(t); }
};
function Y_(e, t, n) { let o = e.projection = []; for (let r = 0; r < t.length; r++) {
    let i = n[r];
    o.push(i != null && i.length ? Array.from(i) : null);
} }
var oa = (() => { class e {
    static __NG_ELEMENT_ID__ = K_;
} return e; })();
function K_() { let e = T(); return Zy(e, g()); }
var Ml = class e extends oa {
    _lContainer;
    _hostTNode;
    _hostLView;
    constructor(t, n, o) { super(), this._lContainer = t, this._hostTNode = n, this._hostLView = o; }
    get element() { return Wn(this._hostTNode, this._hostLView); }
    get injector() { return new Nt(this._hostTNode, this._hostLView); }
    get parentInjector() { let t = Zl(this._hostTNode, this._hostLView); if (Kh(t)) {
        let n = Bi(t, this._hostLView), o = Vi(t), r = n[m].data[o + 8];
        return new Nt(r, n);
    }
    else
        return new Nt(null, this._hostLView); }
    clear() { for (; this.length > 0;)
        this.remove(this.length - 1); }
    get(t) { let n = nh(this._lContainer); return n !== null && n[t] || null; }
    get length() { return this._lContainer.length - H; }
    createEmbeddedView(t, n, o) { let r, i; typeof o == "number" ? r = o : o != null && (r = o.index, i = o.injector); let s = tr(this._lContainer, t.ssrId), a = t.createEmbeddedViewImpl(n || {}, i, s); return this.insertImpl(a, r, en(this._hostTNode, s)), a; }
    createComponent(t, n, o, r, i, s, a) { let c = t && !xo(t), l; if (c)
        l = n;
    else {
        let v = n || {};
        l = v.index, o = v.injector, r = v.projectableNodes, i = v.environmentInjector || v.ngModuleRef, s = v.directives, a = v.bindings;
    } let u = c ? t : new bt(W(t)), d = o || this.parentInjector; if (!i && u.ngModule == null) {
        let D = (c ? d : this.parentInjector).get(mt, null);
        D && (i = D);
    } let f = W(u.componentType ?? {}), p = tr(this._lContainer, f?.id ?? null), h = p?.firstChild ?? null, y = u.create(d, r, h, i, s, a); return this.insertImpl(y.hostView, l, en(this._hostTNode, p)), y; }
    insert(t, n) { return this.insertImpl(t, n, !0); }
    insertImpl(t, n, o) { let r = t._lView; if (Gf(r)) {
        let a = this.indexOf(t);
        if (a !== -1)
            this.detach(a);
        else {
            let c = r[G], l = new e(c, c[ce], c[G]);
            l.detach(l.indexOf(t));
        }
    } let i = this._adjustIndex(n), s = this._lContainer; return oo(s, r, i, o), t.attachToViewContainerRef(), Pa(kc(s), i, t), t; }
    move(t, n) { return this.insert(t, n); }
    indexOf(t) { let n = nh(this._lContainer); return n !== null ? n.indexOf(t) : -1; }
    remove(t) { let n = this._adjustIndex(t, -1), o = Jo(this._lContainer, n); o && (yo(kc(this._lContainer), n), Mr(o[m], o)); }
    detach(t) { let n = this._adjustIndex(t, -1), o = Jo(this._lContainer, n); return o && yo(kc(this._lContainer), n) != null ? new St(o) : null; }
    _adjustIndex(t, n = 0) { return t ?? this.length + n; }
};
function nh(e) { return e[To]; }
function kc(e) { return e[To] || (e[To] = []); }
function Zy(e, t) { let n, o = t[e.index]; return J(o) ? n = o : (n = ry(o, t, null, e), t[e.index] = n, wu(t, n)), Yy(n, t, e, o), new Ml(n, e, t); }
function J_(e, t) { let n = e[C], o = n.createComment(""), r = ne(t, e), i = n.parentNode(r); return Kt(n, i, o, n.nextSibling(r), !1), o; }
var Yy = Jy, Xu = () => !1;
function Ky(e, t, n) { return Xu(e, t, n); }
function Jy(e, t, n, o) { if (e[Pe])
    return; let r; n.type & 8 ? r = x(o) : r = J_(t, n), e[Pe] = r; }
function X_(e, t, n) { if (e[Pe] && e[Ie])
    return !0; let o = n[re], r = t.index - I; if (!o || Gn(t) || _s(o, r))
    return !1; let s = Xc(o, r), a = o.data[Qn]?.[r]; if (a === void 0)
    return !1; let [c, l] = g_(s, a); return e[Pe] = c, e[Ie] = l, !0; }
function eS(e, t, n, o) { Xu(e, n, t) || Jy(e, t, n, o); }
function Xy() { Yy = eS, Xu = X_; }
var Nl = class e {
    queryList;
    matches = null;
    constructor(t) { this.queryList = t; }
    clone() { return new e(this.queryList); }
    setDirty() { this.queryList.setDirty(); }
}, wl = class e {
    queries;
    constructor(t = []) { this.queries = t; }
    createEmbeddedView(t) { let n = t.queries; if (n !== null) {
        let o = t.contentQueries !== null ? t.contentQueries[0] : n.length, r = [];
        for (let i = 0; i < o; i++) {
            let s = n.getByIndex(i), a = this.queries[s.indexInDeclarationView];
            r.push(a.clone());
        }
        return new e(r);
    } return null; }
    insertView(t) { this.dirtyQueriesWithMatches(t); }
    detachView(t) { this.dirtyQueriesWithMatches(t); }
    finishViewCreation(t) { this.dirtyQueriesWithMatches(t); }
    dirtyQueriesWithMatches(t) { for (let n = 0; n < this.queries.length; n++)
        td(t, n).matches !== null && this.queries[n].setDirty(); }
}, rs = class {
    flags;
    read;
    predicate;
    constructor(t, n, o = null) { this.flags = n, this.read = o, typeof t == "string" ? this.predicate = iS(t) : this.predicate = t; }
}, _l = class e {
    queries;
    constructor(t = []) { this.queries = t; }
    elementStart(t, n) { for (let o = 0; o < this.queries.length; o++)
        this.queries[o].elementStart(t, n); }
    elementEnd(t) { for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementEnd(t); }
    embeddedTView(t) { let n = null; for (let o = 0; o < this.length; o++) {
        let r = n !== null ? n.length : 0, i = this.getByIndex(o).embeddedTView(t, r);
        i && (i.indexInDeclarationView = o, n !== null ? n.push(i) : n = [i]);
    } return n !== null ? new e(n) : null; }
    template(t, n) { for (let o = 0; o < this.queries.length; o++)
        this.queries[o].template(t, n); }
    getByIndex(t) { return this.queries[t]; }
    get length() { return this.queries.length; }
    track(t) { this.queries.push(t); }
}, Sl = class e {
    metadata;
    matches = null;
    indexInDeclarationView = -1;
    crossesNgTemplate = !1;
    _declarationNodeIndex;
    _appliesToNextNode = !0;
    constructor(t, n = -1) { this.metadata = t, this._declarationNodeIndex = n; }
    elementStart(t, n) { this.isApplyingToNode(n) && this.matchTNode(t, n); }
    elementEnd(t) { this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1); }
    template(t, n) { this.elementStart(t, n); }
    embeddedTView(t, n) { return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new e(this.metadata)) : null; }
    isApplyingToNode(t) { if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex, o = t.parent;
        for (; o !== null && o.type & 8 && o.index !== n;)
            o = o.parent;
        return n === (o !== null ? o.index : -1);
    } return this._appliesToNextNode; }
    matchTNode(t, n) { let o = this.metadata.predicate; if (Array.isArray(o))
        for (let r = 0; r < o.length; r++) {
            let i = o[r];
            this.matchTNodeWithReadOption(t, n, tS(n, i)), this.matchTNodeWithReadOption(t, n, Ai(n, t, i, !1, !1));
        }
    else
        o === Xo ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, Ai(n, t, o, !1, !1)); }
    matchTNodeWithReadOption(t, n, o) { if (o !== null) {
        let r = this.metadata.read;
        if (r !== null)
            if (r === pr || r === oa || r === Xo && n.type & 4)
                this.addMatch(n.index, -2);
            else {
                let i = Ai(n, t, r, !1, !1);
                i !== null && this.addMatch(n.index, i);
            }
        else
            this.addMatch(n.index, o);
    } }
    addMatch(t, n) { this.matches === null ? this.matches = [t, n] : this.matches.push(t, n); }
};
function tS(e, t) { let n = e.localNames; if (n !== null) {
    for (let o = 0; o < n.length; o += 2)
        if (n[o] === t)
            return n[o + 1];
} return null; }
function nS(e, t) { return e.type & 11 ? Wn(e, t) : e.type & 4 ? Qs(e, t) : null; }
function oS(e, t, n, o) { return n === -1 ? nS(t, e) : n === -2 ? rS(e, t, o) : Go(e, e[m], n, t); }
function rS(e, t, n) { if (n === pr)
    return Wn(t, e); if (n === Xo)
    return Qs(t, e); if (n === oa)
    return Zy(t, e); }
function ev(e, t, n, o) { let r = t[$e].queries[o]; if (r.matches === null) {
    let i = e.data, s = n.matches, a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
        let l = s[c];
        if (l < 0)
            a.push(null);
        else {
            let u = i[l];
            a.push(oS(t, u, s[c + 1], n.metadata.read));
        }
    }
    r.matches = a;
} return r.matches; }
function bl(e, t, n, o) { let r = e.queries.getByIndex(n), i = r.matches; if (i !== null) {
    let s = ev(e, t, r, n);
    for (let a = 0; a < i.length; a += 2) {
        let c = i[a];
        if (c > 0)
            o.push(s[a / 2]);
        else {
            let l = i[a + 1], u = t[-c];
            for (let d = H; d < u.length; d++) {
                let f = u[d];
                f[vt] === f[G] && bl(f[m], f, l, o);
            }
            if (u[Pt] !== null) {
                let d = u[Pt];
                for (let f = 0; f < d.length; f++) {
                    let p = d[f];
                    bl(p[m], p, l, o);
                }
            }
        }
    }
} return o; }
function ed(e, t) { return e[$e].queries[t].queryList; }
function tv(e, t, n) { let o = new zi((n & 4) === 4); return Yf(e, t, o, o.destroy), (t[$e] ??= new wl).queries.push(new Nl(o)) - 1; }
function nv(e, t, n) { let o = N(); return o.firstCreatePass && (rv(o, new rs(e, t, n), -1), (t & 2) === 2 && (o.staticViewQueries = !0)), tv(o, g(), t); }
function ov(e, t, n, o) { let r = N(); if (r.firstCreatePass) {
    let i = T();
    rv(r, new rs(t, n, o), i.index), sS(r, e), (n & 2) === 2 && (r.staticContentQueries = !0);
} return tv(r, g(), n); }
function iS(e) { return e.split(",").map(t => t.trim()); }
function rv(e, t, n) { e.queries === null && (e.queries = new _l), e.queries.track(new Sl(t, n)); }
function sS(e, t) { let n = e.contentQueries || (e.contentQueries = []), o = n.length ? n[n.length - 1] : -1; t !== o && n.push(e.queries.length - 1, t); }
function td(e, t) { return e.queries.getByIndex(t); }
function iv(e, t) { let n = e[m], o = td(n, t); return o.crossesNgTemplate ? bl(n, e, t, []) : ev(n, e, o, t); }
function nd(e, t, n) { let o, r = _f(() => { o._dirtyCounter(); let i = aS(o, e); if (t && i === void 0)
    throw new w(-951, !1); return i; }); return o = r[Xe], o._dirtyCounter = mc(0), o._flatValue = void 0, r; }
function od(e) { return nd(!0, !1, e); }
function rd(e) { return nd(!0, !0, e); }
function id(e) { return nd(!1, !1, e); }
function sv(e, t) { let n = e[Xe]; n._lView = g(), n._queryIndex = t, n._queryList = ed(n._lView, t), n._queryList.onDirty(() => n._dirtyCounter.update(o => o + 1)); }
function aS(e, t) { let n = e._lView, o = e._queryIndex; if (n === void 0 || o === void 0 || n[A] & 4)
    return t ? void 0 : P; let r = ed(n, o), i = iv(n, o); return r.reset(i, lg), t ? r.first : r._changesDetected || e._flatValue === void 0 ? e._flatValue = r.toArray() : e._flatValue; }
var nn = new Map, rr = new Set;
function av(e) { return pt(this, null, function* () { let t = nn; nn = new Map; let n = new Map; function o(i) { let s = n.get(i); if (s)
    return s; let a = e(i).then(c => fS(i, c)); return n.set(i, a), a; } let r = Array.from(t).map(a => pt(null, [a], function* ([i, s]) { if (s.styleUrl && s.styleUrls?.length)
    throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"); let c = []; s.templateUrl && c.push(o(s.templateUrl).then(f => { s.template = f; })); let l = typeof s.styles == "string" ? [s.styles] : s.styles ?? []; s.styles = l; let { styleUrl: u, styleUrls: d } = s; if (u && (d = [u], s.styleUrl = void 0), d?.length) {
    let f = Promise.all(d.map(p => o(p))).then(p => { l.push(...p), s.styleUrls = void 0; });
    c.push(f);
} yield Promise.all(c), rr.delete(i); })); yield Promise.all(r); }); }
function cS(e, t) { cv(t) && (nn.set(e, t), rr.add(e)); }
function lS(e) { return rr.has(e); }
function cv(e) { return !!(e.templateUrl && !e.hasOwnProperty("template") || e.styleUrls?.length || e.styleUrl); }
function uS() { let e = nn; return nn = new Map, e; }
function dS(e) { rr.clear(); for (let t of e.keys())
    rr.add(t); nn = e; }
function lv() { return nn.size === 0; }
function fS(e, t) { return pt(this, null, function* () { if (typeof t == "string")
    return t; if (t.status !== void 0 && t.status !== 200)
    throw new w(918, !1); return t.text(); }); }
var Al = new Map, uv = !0;
function pS(e, t, n) { if (t && t !== n && uv)
    throw new w(921, !1); }
function sd(e, t) { let n = Al.get(t) || null; pS(t, n, e), Al.set(t, e); }
function ad(e) { return Al.get(e); }
function hS(e) { uv = !e; }
var Hn = class {
}, dv = class {
};
function fv(e, t) { return new jn(e, t ?? null, []); }
var gS = fv, jn = class extends Hn {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    componentFactoryResolver = new ns(this);
    constructor(t, n, o, r = !0) { super(), this.ngModuleType = t, this._parent = n; let i = hn(t); this._bootstrapComponents = Mn(i.bootstrap), this._r3Injector = ip(t, n, [{ provide: Hn, useValue: this }, { provide: _r, useValue: this.componentFactoryResolver }, ...o], Ur(t), new Set(["environment"])), r && this.resolveInjectorInitializers(); }
    resolveInjectorInitializers() { this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(this.ngModuleType); }
    get injector() { return this._r3Injector; }
    destroy() { let t = this._r3Injector; !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null; }
    onDestroy(t) { this.destroyCbs.push(t); }
}, Vn = class extends dv {
    moduleType;
    constructor(t) { super(), this.moduleType = t; }
    create(t) { return new jn(this.moduleType, t, []); }
};
function pv(e, t, n) { return new jn(e, t, n, !1); }
var ir = class extends Hn {
    injector;
    componentFactoryResolver = new ns(this);
    instance = null;
    constructor(t) { super(); let n = new ja([...t.providers, { provide: Hn, useValue: this }, { provide: _r, useValue: this.componentFactoryResolver }], t.parent || ti(), t.debugName, new Set(["environment"])); this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers(); }
    destroy() { this.injector.destroy(); }
    onDestroy(t) { this.injector.onDestroy(t); }
};
function cd(e, t, n = null) { return new ir({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector; }
var mS = (() => { class e {
    _injector;
    cachedInjectors = new Map;
    constructor(n) { this._injector = n; }
    getOrCreateStandaloneInjector(n) { if (!n.standalone)
        return null; if (!this.cachedInjectors.has(n)) {
        let o = Ha(!1, n.type), r = o.length > 0 ? cd([o], this._injector, "") : null;
        this.cachedInjectors.set(n, r);
    } return this.cachedInjectors.get(n); }
    ngOnDestroy() { try {
        for (let n of this.cachedInjectors.values())
            n !== null && n.destroy();
    }
    finally {
        this.cachedInjectors.clear();
    } }
    static \u0275prov = V({ token: e, providedIn: "environment", factory: () => new e(Oe(mt)) });
} return e; })();
function hv(e) { return Ze(() => { let t = vv(e), n = Je(Z({}, t), { decls: e.decls, vars: e.vars, template: e.template, consts: e.consts || null, ngContentSelectors: e.ngContentSelectors, onPush: e.changeDetection === ms.OnPush, directiveDefs: null, pipeDefs: null, dependencies: t.standalone && e.dependencies || null, getStandaloneInjector: t.standalone ? r => r.get(mS).getOrCreateStandaloneInjector(n) : null, getExternalStyles: null, signals: e.signals ?? !1, data: e.data || {}, encapsulation: e.encapsulation || Ae.Emulated, styles: e.styles || P, _: null, schemas: e.schemas || null, tView: null, id: "" }); t.standalone && q("NgStandalone"), Iv(n); let o = e.dependencies; return n.directiveDefs = is(o, gv), n.pipeDefs = is(o, Ve), n.id = ES(n), n; }); }
function gv(e) { return W(e) || Te(e); }
function ld(e) { return Ze(() => ({ type: e.type, bootstrap: e.bootstrap || P, declarations: e.declarations || P, imports: e.imports || P, exports: e.exports || P, transitiveCompileScopes: null, schemas: e.schemas || null, id: e.id || null })); }
function yS(e, t) { if (e == null)
    return Ne; let n = {}; for (let o in e)
    if (e.hasOwnProperty(o)) {
        let r = e[o], i, s, a, c;
        Array.isArray(r) ? (a = r[0], i = r[1], s = r[2] ?? i, c = r[3] || null) : (i = r, s = r, a = ks.None, c = null), n[i] = [o, a, c], t[i] = s;
    } return n; }
function vS(e) { if (e == null)
    return Ne; let t = {}; for (let n in e)
    e.hasOwnProperty(n) && (t[e[n]] = n); return t; }
function mv(e) { return Ze(() => { let t = vv(e); return Iv(t), t; }); }
function yv(e) { return { type: e.type, name: e.name, factory: null, pure: e.pure !== !1, standalone: e.standalone ?? !0, onDestroy: e.type.prototype.ngOnDestroy || null }; }
function vv(e) { let t = {}; return { type: e.type, providersResolver: null, viewProvidersResolver: null, factory: null, hostBindings: e.hostBindings || null, hostVars: e.hostVars || 0, hostAttrs: e.hostAttrs || null, contentQueries: e.contentQueries || null, declaredInputs: t, inputConfig: e.inputs || Ne, exportAs: e.exportAs || null, standalone: e.standalone ?? !0, signals: e.signals === !0, selectors: e.selectors || P, viewQuery: e.viewQuery || null, features: e.features || null, setInput: null, resolveHostDirectives: null, hostDirectives: null, controlDef: null, inputs: yS(e.inputs, t), outputs: vS(e.outputs), debugInfo: null }; }
function Iv(e) { e.features?.forEach(t => t(e)); }
function is(e, t) { return e ? () => { let n = typeof e == "function" ? e() : e, o = []; for (let r of n) {
    let i = t(r);
    i !== null && o.push(i);
} return o; } : null; }
var IS = new Map;
function ES(e) { let t = 0, n = typeof e.consts == "function" ? "" : e.consts, o = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, n, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery]; for (let i of o.join("|"))
    t = Math.imul(31, t) + i.charCodeAt(0) << 0; return t += 2147483648, "c" + t; }
function Ev(e) { return t => { t.controlDef = { create: (n, o) => { n?.\u0275ngControlCreate(o); }, update: (n, o) => { n?.\u0275ngControlUpdate?.(o); }, passThroughInput: e }; }; }
function Dv(e) { let t = n => { let o = Array.isArray(e); n.hostDirectives === null ? (n.resolveHostDirectives = DS, n.hostDirectives = o ? e.map(Rl) : [e]) : o ? n.hostDirectives.unshift(...e.map(Rl)) : n.hostDirectives.unshift(e); }; return t.ngInherit = !0, t; }
function DS(e) { let t = [], n = !1, o = null, r = null; for (let i = 0; i < e.length; i++) {
    let s = e[i];
    if (s.hostDirectives !== null) {
        let a = t.length;
        o ??= new Map, r ??= new Map, Cv(s, t, o), r.set(s, [a, t.length - 1]);
    }
    i === 0 && Se(s) && (n = !0, t.push(s));
} for (let i = n ? 1 : 0; i < e.length; i++)
    t.push(e[i]); return [t, o, r]; }
function Cv(e, t, n) { if (e.hostDirectives !== null)
    for (let o of e.hostDirectives)
        if (typeof o == "function") {
            let r = o();
            for (let i of r)
                oh(Rl(i), t, n);
        }
        else
            oh(o, t, n); }
function oh(e, t, n) { let o = Te(e.directive); CS(o.declaredInputs, e.inputs), Cv(o, t, n), n.set(o, e), t.push(o); }
function Rl(e) { return typeof e == "function" ? { directive: z(e), inputs: Ne, outputs: Ne } : { directive: z(e.directive), inputs: rh(e.inputs), outputs: rh(e.outputs) }; }
function rh(e) { if (e === void 0 || e.length === 0)
    return Ne; let t = {}; for (let n = 0; n < e.length; n += 2)
    t[e[n]] = e[n + 1]; return t; }
function CS(e, t) { for (let n in t)
    if (t.hasOwnProperty(n)) {
        let o = t[n], r = e[n];
        e[o] = r;
    } }
function TS(e) { return Object.getPrototypeOf(e.prototype).constructor; }
function ud(e) { let t = TS(e.type), n = !0, o = [e]; for (; t;) {
    let r;
    if (Se(e))
        r = t.\u0275cmp || t.\u0275dir;
    else {
        if (t.\u0275cmp)
            throw new w(903, !1);
        r = t.\u0275dir;
    }
    if (r) {
        if (n) {
            o.push(r);
            let s = e;
            s.inputs = xc(e.inputs), s.declaredInputs = xc(e.declaredInputs), s.outputs = xc(e.outputs);
            let a = r.hostBindings;
            a && SS(e, a);
            let c = r.viewQuery, l = r.contentQueries;
            if (c && wS(e, c), l && _S(e, l), MS(e, r), Af(e.outputs, r.outputs), Se(r) && r.data.animation) {
                let u = e.data;
                u.animation = (u.animation || []).concat(r.data.animation);
            }
        }
        let i = r.features;
        if (i)
            for (let s = 0; s < i.length; s++) {
                let a = i[s];
                a && a.ngInherit && a(e), a === ud && (n = !1);
            }
    }
    t = Object.getPrototypeOf(t);
} NS(o); }
function MS(e, t) { for (let n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n))
        continue;
    let o = t.inputs[n];
    o !== void 0 && (e.inputs[n] = o, e.declaredInputs[n] = t.declaredInputs[n]);
} }
function NS(e) { let t = 0, n = null; for (let o = e.length - 1; o >= 0; o--) {
    let r = e[o];
    r.hostVars = t += r.hostVars, r.hostAttrs = xn(r.hostAttrs, n = xn(n, r.hostAttrs));
} }
function xc(e) { return e === Ne ? {} : e === P ? [] : e; }
function wS(e, t) { let n = e.viewQuery; n ? e.viewQuery = (o, r) => { t(o, r), n(o, r); } : e.viewQuery = t; }
function _S(e, t) { let n = e.contentQueries; n ? e.contentQueries = (o, r, i) => { t(o, r, i), n(o, r, i); } : e.contentQueries = t; }
function SS(e, t) { let n = e.hostBindings; n ? e.hostBindings = (o, r) => { t(o, r), n(o, r); } : e.hostBindings = t; }
function Tv(e, t, n, o, r, i, s, a) { if (n.firstCreatePass) {
    e.mergedAttrs = xn(e.mergedAttrs, e.attrs);
    let u = e.tView = Mu(2, e, r, i, s, n.directiveRegistry, n.pipeRegistry, null, n.schemas, n.consts, null);
    n.queries !== null && (n.queries.template(n, e), u.queries = n.queries.embeddedTView(e));
} a && (e.flags |= a), We(e, !1); let c = Mv(n, t, e, o); bo() && Fu(n, t, c, e), be(c, t); let l = ry(c, t, c, e); t[o + I] = l, wu(t, l), Ky(l, e, t); }
function bS(e, t, n, o, r, i, s, a, c, l, u) { let d = n + I, f; return t.firstCreatePass ? (f = fn(t, d, 4, s || null, a || null), ci() && Ly(t, e, f, le(t.consts, l), Bu), qh(t, f)) : f = t.data[d], Tv(f, e, t, n, o, r, i, c), yn(f) && Bs(t, e, f), l != null && to(e, f, u), f; }
function on(e, t, n, o, r, i, s, a, c, l, u) { let d = n + I, f; if (t.firstCreatePass) {
    if (f = fn(t, d, 4, s || null, a || null), l != null) {
        let p = le(t.consts, l);
        f.localNames = [];
        for (let h = 0; h < p.length; h += 2)
            f.localNames.push(p[h], -1);
    }
}
else
    f = t.data[d]; return Tv(f, e, t, n, o, r, i, c), l != null && to(e, f, u), f; }
function dd(e, t, n, o, r, i, s, a) { let c = g(), l = N(), u = le(l.consts, i); return bS(c, l, e, t, n, o, r, u, void 0, s, a), dd; }
function fd(e, t, n, o, r, i, s, a) { let c = g(), l = N(), u = le(l.consts, i); return on(c, l, e, t, n, o, r, u, void 0, s, a), fd; }
var Mv = Nv;
function Nv(e, t, n, o) { return Fe(!0), t[C].createComment(""); }
function AS(e, t, n, o) { let r = !Ss(t, n); Fe(r); let i = t[re]?.data[Is]?.[o] ?? null; if (i !== null && n.tView !== null && n.tView.ssrId === null && (n.tView.ssrId = i), r)
    return Nv(e, t); let s = t[re], a = wr(s, e, t, n); ws(s, o, a); let c = fu(s, o); return Ys(c, a); }
function wv() { Mv = AS; }
var X = (function (e) { return e[e.NOT_STARTED = 0] = "NOT_STARTED", e[e.IN_PROGRESS = 1] = "IN_PROGRESS", e[e.COMPLETE = 2] = "COMPLETE", e[e.FAILED = 3] = "FAILED", e; })(X || {}), ih = 0, RS = 1, $ = (function (e) { return e[e.Placeholder = 0] = "Placeholder", e[e.Loading = 1] = "Loading", e[e.Complete = 2] = "Complete", e[e.Error = 3] = "Error", e; })($ || {}), sr = (function (e) { return e[e.Initial = -1] = "Initial", e; })(sr || {}), An = 0, ut = 1, Lo = 2, Ni = 3, kS = 4, xS = 5, ra = 6, OS = 7, Rn = 8, LS = 9, pd = (function (e) { return e[e.Manual = 0] = "Manual", e[e.Playthrough = 1] = "Playthrough", e; })(pd || {});
function Sr(e, t, n) { let o = Sv(e); t[o] === null && (t[o] = []), t[o].push(n); }
function Oi(e, t) { let n = Sv(e), o = t[n]; if (o !== null) {
    for (let r of o)
        r();
    t[n] = null;
} }
function _v(e) { Oi(1, e), Oi(0, e), Oi(2, e); }
function Sv(e) { let t = kS; return e === 1 ? t = xS : e === 2 && (t = LS), t; }
function br(e) { return e + 1; }
function ge(e, t) { let n = e[m], o = br(t.index); return e[o]; }
function PS(e, t, n) { let o = e[m], r = br(t); e[r] = n; }
function se(e, t) { let n = br(t.index); return e.data[n]; }
function FS(e, t, n) { let o = br(t); e.data[o] = n; }
function HS(e, t, n) { let o = t[m], r = se(o, n); switch (e) {
    case $.Complete: return r.primaryTmplIndex;
    case $.Loading: return r.loadingTmplIndex;
    case $.Error: return r.errorTmplIndex;
    case $.Placeholder: return r.placeholderTmplIndex;
    default: return null;
} }
function kl(e, t) { return t === $.Placeholder ? e.placeholderBlockConfig?.[ih] ?? null : t === $.Loading ? e.loadingBlockConfig?.[ih] ?? null : null; }
function bv(e) { return e.loadingBlockConfig?.[RS] ?? null; }
function sh(e, t) { if (!e || e.length === 0)
    return t; let n = new Set(e); for (let o of t)
    n.add(o); return e.length === n.size ? e : Array.from(n); }
function jS(e, t) { let n = t.primaryTmplIndex + I; return Ht(e, n); }
function Av(e) { return e !== null && typeof e == "object" && typeof e.primaryTmplIndex == "number"; }
function Rv(e, t) { let n = null, o = br(t.index); return I < o && o < e.bindingStartIndex && (n = se(e, t)), !!n && Av(n); }
function hd(e, t, n, o) { let r = n.get(B); return uM(e, () => r.run(t), i => r.runOutsideAngular(() => lM(i)), o); }
function VS(e, t, n) { return n == null ? e : n >= 0 ? qf(n, e) : e[t.index][H] ?? null; }
function BS(e, t) { return Ft(I + t, e); }
function ao(e, t, n, o, r, i, s, a) { let c = e[k], l = c.get(B), u; function d() { if (It(e)) {
    u.destroy();
    return;
} let f = ge(e, t), p = f[ut]; if (p !== sr.Initial && p !== $.Placeholder) {
    u.destroy();
    return;
} let h = VS(e, t, o); if (!h || (u.destroy(), It(h)))
    return; let y = BS(h, n), v = r(y, () => { l.run(() => { e !== h && Wa(h, v), i(); }); }, c, a); e !== h && ai(h, v), Sr(s, f, v); } u = km({ read: d }, { injector: c }); }
function ia(e, t) { let n = t.get(zS), o = () => n.remove(e); return n.add(e), o; }
var $S = () => typeof requestIdleCallback < "u" ? requestIdleCallback : setTimeout, US = () => typeof requestIdleCallback < "u" ? cancelIdleCallback : clearTimeout, zS = (() => { class e {
    executingCallbacks = !1;
    idleId = null;
    current = new Set;
    deferred = new Set;
    ngZone = E(B);
    requestIdleCallbackFn = $S().bind(globalThis);
    cancelIdleCallbackFn = US().bind(globalThis);
    add(n) { (this.executingCallbacks ? this.deferred : this.current).add(n), this.idleId === null && this.scheduleIdleCallback(); }
    remove(n) { let { current: o, deferred: r } = this; o.delete(n), r.delete(n), o.size === 0 && r.size === 0 && this.cancelIdleCallback(); }
    scheduleIdleCallback() { let n = () => { this.cancelIdleCallback(), this.executingCallbacks = !0; for (let o of this.current)
        o(); if (this.current.clear(), this.executingCallbacks = !1, this.deferred.size > 0) {
        for (let o of this.deferred)
            this.current.add(o);
        this.deferred.clear(), this.scheduleIdleCallback();
    } }; this.idleId = this.requestIdleCallbackFn(() => this.ngZone.run(n)); }
    cancelIdleCallback() { this.idleId !== null && (this.cancelIdleCallbackFn(this.idleId), this.idleId = null); }
    ngOnDestroy() { this.cancelIdleCallback(), this.current.clear(), this.deferred.clear(); }
    static \u0275prov = V({ token: e, providedIn: "root", factory: () => new e });
} return e; })();
function sa(e) { return (t, n) => kv(e, t, n); }
function kv(e, t, n) { let o = n.get(xv), r = n.get(B), i = () => o.remove(t); return o.add(e, t, r), i; }
var xv = (() => { class e {
    executingCallbacks = !1;
    timeoutId = null;
    invokeTimerAt = null;
    current = [];
    deferred = [];
    add(n, o, r) { let i = this.executingCallbacks ? this.deferred : this.current; this.addToQueue(i, Date.now() + n, o), this.scheduleTimer(r); }
    remove(n) { let { current: o, deferred: r } = this; this.removeFromQueue(o, n) === -1 && this.removeFromQueue(r, n), o.length === 0 && r.length === 0 && this.clearTimeout(); }
    addToQueue(n, o, r) { let i = n.length; for (let s = 0; s < n.length; s += 2)
        if (n[s] > o) {
            i = s;
            break;
        } Lf(n, i, o, r); }
    removeFromQueue(n, o) { let r = -1; for (let i = 0; i < n.length; i += 2)
        if (n[i + 1] === o) {
            r = i;
            break;
        } return r > -1 && Fa(n, r, 2), r; }
    scheduleTimer(n) { let o = () => { this.clearTimeout(), this.executingCallbacks = !0; let i = [...this.current], s = Date.now(); for (let c = 0; c < i.length; c += 2) {
        let l = i[c], u = i[c + 1];
        if (l <= s)
            u();
        else
            break;
    } let a = -1; for (let c = 0; c < this.current.length && this.current[c] <= s; c += 2)
        a = c + 1; if (a >= 0 && Fa(this.current, 0, a + 1), this.executingCallbacks = !1, this.deferred.length > 0) {
        for (let c = 0; c < this.deferred.length; c += 2) {
            let l = this.deferred[c], u = this.deferred[c + 1];
            this.addToQueue(this.current, l, u);
        }
        this.deferred.length = 0;
    } this.scheduleTimer(n); }; if (this.current.length > 0) {
        let i = Date.now(), s = this.current[0];
        if (this.timeoutId === null || this.invokeTimerAt && this.invokeTimerAt - s > 16) {
            this.clearTimeout();
            let a = Math.max(s - i, 16);
            this.invokeTimerAt = s, this.timeoutId = n.runOutsideAngular(() => setTimeout(() => n.run(o), a));
        }
    } }
    clearTimeout() { this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null); }
    ngOnDestroy() { this.clearTimeout(), this.current.length = 0, this.deferred.length = 0; }
    static \u0275prov = V({ token: e, providedIn: "root", factory: () => new e });
} return e; })(), WS = (() => { class e {
    cachedInjectors = new Map;
    getOrCreateInjector(n, o, r, i) { if (!this.cachedInjectors.has(n)) {
        let s = r.length > 0 ? cd(r, o, i) : null;
        this.cachedInjectors.set(n, s);
    } return this.cachedInjectors.get(n); }
    ngOnDestroy() { try {
        for (let n of this.cachedInjectors.values())
            n !== null && n.destroy();
    }
    finally {
        this.cachedInjectors.clear();
    } }
    static \u0275prov = V({ token: e, providedIn: "environment", factory: () => new e });
} return e; })(), GS = new _("DEFER_BLOCK_DEPENDENCY_INTERCEPTOR"), Ov = new _("");
function Oc(e, t, n) { return e.get(WS).getOrCreateInjector(t, e, n, ""); }
function qS(e, t, n) { if (e instanceof bn) {
    let r = e.injector, i = e.parentInjector, s = Oc(i, t, n);
    return new bn(r, s);
} let o = e.get(mt); if (o !== e) {
    let r = Oc(o, t, n);
    return new bn(e, r);
} return Oc(e, t, n); }
function nt(e, t, n, o = !1) { let r = n[G], i = r[m]; if (It(r))
    return; let s = ge(r, t), a = s[ut], c = s[OS]; if (!(c !== null && e < c) && ch(a, e) && ch(s[An] ?? -1, e)) {
    let l = se(i, t), d = !o && (typeof ngServerMode > "u" || !ngServerMode) && (bv(l) !== null || kl(l, $.Loading) !== null || kl(l, $.Placeholder)) ? xl : Lv;
    try {
        d(e, s, n, t, r);
    }
    catch (f) {
        $u(r, f);
    }
} }
function QS(e, t) { let n = e[Ie]?.findIndex(r => r.data[yr] === t[ut]) ?? -1; return { dehydratedView: n > -1 ? e[Ie][n] : null, dehydratedViewIx: n }; }
function Lv(e, t, n, o, r) { O(R.DeferBlockStateStart); let i = HS(e, r, o); if (i !== null) {
    t[ut] = e;
    let s = r[m], a = i + I, c = Ht(s, a), l = 0;
    Uu(n, l);
    let u;
    if (e === $.Complete) {
        let h = se(s, o), y = h.providers;
        y && y.length > 0 && (u = qS(r[k], h, y));
    }
    let { dehydratedView: d, dehydratedViewIx: f } = QS(n, t), p = no(r, c, null, { injector: u, dehydratedView: d });
    if (oo(n, p, l, en(c, d)), Nr(p, 2), f > -1 && n[Ie]?.splice(f, 1), (e === $.Complete || e === $.Error) && Array.isArray(t[Rn])) {
        for (let h of t[Rn])
            h();
        t[Rn] = null;
    }
} O(R.DeferBlockStateEnd); }
function ZS(e, t, n, o, r) { let i = Date.now(), s = r[m], a = se(s, o); if (t[Lo] === null || t[Lo] <= i) {
    t[Lo] = null;
    let c = bv(a), l = t[Ni] !== null;
    if (e === $.Loading && c !== null && !l) {
        t[An] = e;
        let u = ah(c, t, o, n, r);
        t[Ni] = u;
    }
    else {
        e > $.Loading && l && (t[Ni](), t[Ni] = null, t[An] = null), Lv(e, t, n, o, r);
        let u = kl(a, e);
        u !== null && (t[Lo] = i + u, ah(u, t, o, n, r));
    }
}
else
    t[An] = e; }
function ah(e, t, n, o, r) { return kv(e, () => { let s = t[An]; t[Lo] = null, t[An] = null, s !== null && nt(s, n, o); }, r[k]); }
function ch(e, t) { return e < t; }
function co(e, t) { let n = e[t.index]; nt($.Placeholder, t, n); }
function lh(e, t, n) { e.loadingPromise.then(() => { e.loadingState === X.COMPLETE ? nt($.Complete, t, n) : e.loadingState === X.FAILED && nt($.Error, t, n); }); }
var xl = null;
function Pv(e, t, n, o) { let r = e.consts; n != null && (t.placeholderBlockConfig = le(r, n)), o != null && (t.loadingBlockConfig = le(r, o)), xl === null && (xl = ZS); }
var Li = "__ngAsyncComponentMetadataFn__";
function YS(e) { return e[Li] ?? null; }
function Fv(e, t, n) { let o = e; return o[Li] = () => Promise.all(t()).then(r => (n(...r), o[Li] = null, r)), o[Li]; }
function gd(e, t, n, o) { return Ze(() => { let r = e; t !== null && (r.hasOwnProperty("decorators") && r.decorators !== void 0 ? r.decorators.push(...t) : r.decorators = t), n !== null && (r.ctorParameters = n), o !== null && (r.hasOwnProperty("propDecorators") && r.propDecorators !== void 0 ? r.propDecorators = Z(Z({}, r.propDecorators), o) : r.propDecorators = o); }); }
var KS = (() => { class e {
    log(n) { console.log(n); }
    warn(n) { console.warn(n); }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "platform" });
} return e; })(), Ol = class {
    resolverToTokenToDependencies = new WeakMap;
    resolverToProviders = new WeakMap;
    resolverToEffects = new WeakMap;
    standaloneInjectorToComponent = new WeakMap;
    reset() { this.resolverToTokenToDependencies = new WeakMap, this.resolverToProviders = new WeakMap, this.standaloneInjectorToComponent = new WeakMap; }
}, jx = new Ol;
function md(e) { return typeof e == "function" && e[Xe] !== void 0; }
function yd(e) { return md(e) && typeof e.set == "function"; }
function Pi(e, t) { let n = e[m]; for (let o = I; o < n.bindingStartIndex; o++)
    if (J(e[o])) {
        let r = e[o];
        if (!(o === n.bindingStartIndex - 1)) {
            let s = n.data[o], a = se(n, s);
            if (Av(a)) {
                t.push({ lContainer: r, lView: e, tNode: s, tDetails: a });
                continue;
            }
        }
        te(r[j]) && Pi(r[j], t);
        for (let s = H; s < r.length; s++)
            Pi(r[s], t);
    }
    else
        te(e[o]) && Pi(e[o], t); }
function JS() { return q("Chrome DevTools profiling"), () => { }; }
function XS(e) { let t = e.get(Vt), n = e.get(at), o = Dg(t, n), r = {}; for (let [i, s] of Object.entries(o))
    hM(i) || (r[i] = s); return r; }
var uh = "ng";
function eb(e, t) { tb(e, t); }
function tb(e, t) { if (typeof COMPILED > "u" || !COMPILED) {
    let n = ve;
    n[uh] ??= {}, n[uh][e] = t;
} }
var Hv = new _(""), jv = new _(""), nb = (() => { class e {
    _ngZone;
    registry;
    _isZoneStable = !0;
    _callbacks = [];
    _taskTrackingZone = null;
    _destroyRef;
    constructor(n, o, r) { this._ngZone = n, this.registry = o, jf() && (this._destroyRef = E(Ao, { optional: !0 }) ?? void 0), vd || (Bv(r), r.addToWindow(o)), this._watchAngularEvents(), n.run(() => { this._taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone"); }); }
    _watchAngularEvents() { let n = this._ngZone.onUnstable.subscribe({ next: () => { this._isZoneStable = !1; } }), o = this._ngZone.runOutsideAngular(() => this._ngZone.onStable.subscribe({ next: () => { B.assertNotInAngularZone(), queueMicrotask(() => { this._isZoneStable = !0, this._runCallbacksIfReady(); }); } })); this._destroyRef?.onDestroy(() => { n.unsubscribe(), o.unsubscribe(); }); }
    isStable() { return this._isZoneStable && !this._ngZone.hasPendingMacrotasks; }
    _runCallbacksIfReady() { if (this.isStable())
        queueMicrotask(() => { for (; this._callbacks.length !== 0;) {
            let n = this._callbacks.pop();
            clearTimeout(n.timeoutId), n.doneCb();
        } });
    else {
        let n = this.getPendingTasks();
        this._callbacks = this._callbacks.filter(o => o.updateCb && o.updateCb(n) ? (clearTimeout(o.timeoutId), !1) : !0);
    } }
    getPendingTasks() { return this._taskTrackingZone ? this._taskTrackingZone.macroTasks.map(n => ({ source: n.source, creationLocation: n.creationLocation, data: n.data })) : []; }
    addCallback(n, o, r) { let i = -1; o && o > 0 && (i = setTimeout(() => { this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), n(); }, o)), this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: r }); }
    whenStable(n, o, r) { if (r && !this._taskTrackingZone)
        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'); this.addCallback(n, o, r), this._runCallbacksIfReady(); }
    registerApplication(n) { this.registry.registerApplication(n, this); }
    unregisterApplication(n) { this.registry.unregisterApplication(n); }
    findProviders(n, o, r) { return []; }
    static \u0275fac = function (o) { return new (o || e)(Oe(B), Oe(Vv), Oe(jv)); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac });
} return e; })(), Vv = (() => { class e {
    _applications = new Map;
    registerApplication(n, o) { this._applications.set(n, o); }
    unregisterApplication(n) { this._applications.delete(n); }
    unregisterAllApplications() { this._applications.clear(); }
    getTestability(n) { return this._applications.get(n) || null; }
    getAllTestabilities() { return Array.from(this._applications.values()); }
    getAllRootElements() { return Array.from(this._applications.keys()); }
    findTestabilityInTree(n, o = !0) { return vd?.findTestabilityInTree(this, n, o) ?? null; }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "platform" });
} return e; })();
function Bv(e) { vd = e; }
var vd;
function Id(e) { return !!e && typeof e.then == "function"; }
function $v(e) { return !!e && typeof e.subscribe == "function"; }
var Ed = new _("");
function Uv(e) { return et([{ provide: Ed, multi: !0, useValue: e }]); }
var Dd = (() => { class e {
    resolve;
    reject;
    initialized = !1;
    done = !1;
    donePromise = new Promise((n, o) => { this.resolve = n, this.reject = o; });
    appInits = E(Ed, { optional: !0 }) ?? [];
    injector = E(De);
    constructor() { }
    runInitializers() { if (this.initialized)
        return; let n = []; for (let r of this.appInits) {
        let i = ni(this.injector, r);
        if (Id(i))
            n.push(i);
        else if ($v(i)) {
            let s = new Promise((a, c) => { i.subscribe({ complete: a, error: c }); });
            n.push(s);
        }
    } let o = () => { this.done = !0, this.resolve(); }; Promise.all(n).then(() => { o(); }).catch(r => { this.reject(r); }), n.length === 0 && o(), this.initialized = !0; }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), Ar = new _("");
function Cd() { Sf(() => { let e = ""; throw new w(600, e); }); }
function zv(e) { return e.isBoundToModule; }
var ob = 10;
function Td(e, t) { return Array.isArray(t) ? t.reduce(Td, e) : Z(Z({}, e), t); }
var ke = (() => { class e {
    _runningTick = !1;
    _destroyed = !1;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = E($t);
    afterRenderManager = E(Ps);
    zonelessEnabled = E(In);
    rootEffectScheduler = E(vc);
    dirtyFlags = 0;
    tracingSnapshot = null;
    allTestViews = new Set;
    autoDetectTestViews = new Set;
    includeAllTestViews = !1;
    afterTick = new Lh;
    get allViews() { return [...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(), ...this._views]; }
    get destroyed() { return this._destroyed; }
    componentTypes = [];
    components = [];
    internalPendingTask = E(Bt);
    get isStable() { return this.internalPendingTask.hasPendingTasksObservable.pipe(XC(n => !n)); }
    constructor() { E(dn, { optional: !0 }); }
    whenStable() { let n; return new Promise(o => { n = this.isStable.subscribe({ next: r => { r && o(); } }); }).finally(() => { n.unsubscribe(); }); }
    _injector = E(mt);
    _rendererFactory = null;
    get injector() { return this._injector; }
    bootstrap(n, o) { return this.bootstrapImpl(n, o); }
    bootstrapImpl(n, o, r = De.NULL) { return this._injector.get(B).run(() => { O(R.BootstrapComponentStart); let s = n instanceof ea; if (!this._injector.get(Dd).done) {
        let h = "";
        throw new w(405, h);
    } let c; s ? c = n : c = this._injector.get(_r).resolveComponentFactory(n), this.componentTypes.push(c.componentType); let l = zv(c) ? void 0 : this._injector.get(Hn), u = o || c.selector, d = c.create(r, [], u, l), f = d.location.nativeElement, p = d.injector.get(Hv, null); return p?.registerApplication(f), d.onDestroy(() => { this.detachView(d.hostView), Ho(this.components, d), p?.unregisterApplication(f); }), this._loadComponent(d), O(R.BootstrapComponentEnd, d), d; }); }
    tick() { this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick(); }
    _tick() { O(R.ChangeDetectionStart), this.tracingSnapshot !== null ? this.tracingSnapshot.run(Ls.CHANGE_DETECTION, this.tickImpl) : this.tickImpl(); }
    tickImpl = () => { if (this._runningTick)
        throw O(R.ChangeDetectionEnd), new w(101, !1); let n = b(null); try {
        this._runningTick = !0, this.synchronize();
    }
    finally {
        this._runningTick = !1, this.tracingSnapshot?.dispose(), this.tracingSnapshot = null, b(n), this.afterTick.next(), O(R.ChangeDetectionEnd);
    } };
    synchronize() { this._rendererFactory === null && !this._injector.destroyed && (this._rendererFactory = this._injector.get(nr, null, { optional: !0 })); let n = 0; for (; this.dirtyFlags !== 0 && n++ < ob;) {
        O(R.ChangeDetectionSyncStart);
        try {
            this.synchronizeOnce();
        }
        finally {
            O(R.ChangeDetectionSyncEnd);
        }
    } }
    synchronizeOnce() { this.dirtyFlags & 16 && (this.dirtyFlags &= -17, this.rootEffectScheduler.flush()); let n = !1; if (this.dirtyFlags & 7) {
        let o = !!(this.dirtyFlags & 1);
        this.dirtyFlags &= -8, this.dirtyFlags |= 8;
        for (let { _lView: r } of this.allViews) {
            if (!o && !wo(r))
                continue;
            let i = o && !this.zonelessEnabled ? 0 : 1;
            Xm(r, i), n = !0;
        }
        if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23)
            return;
    } n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()), this.dirtyFlags & 8 && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews(); }
    syncDirtyFlagsWithViews() { if (this.allViews.some(({ _lView: n }) => wo(n))) {
        this.dirtyFlags |= 2;
        return;
    }
    else
        this.dirtyFlags &= -8; }
    attachView(n) { let o = n; this._views.push(o), o.attachToAppRef(this); }
    detachView(n) { let o = n; Ho(this._views, o), o.detachFromAppRef(); }
    _loadComponent(n) { this.attachView(n.hostView); try {
        this.tick();
    }
    catch (r) {
        this.internalErrorHandler(r);
    } this.components.push(n), this._injector.get(Ar, []).forEach(r => r(n)); }
    ngOnDestroy() { if (!this._destroyed)
        try {
            this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy());
        }
        finally {
            this._destroyed = !0, this._views = [], this._destroyListeners = [];
        } }
    onDestroy(n) { return this._destroyListeners.push(n), () => Ho(this._destroyListeners, n); }
    destroy() { if (this._destroyed)
        throw new w(406, !1); let n = this._injector; n.destroy && !n.destroyed && n.destroy(); }
    get viewCount() { return this._views.length; }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })();
function Ho(e, t) { let n = e.indexOf(t); n > -1 && e.splice(n, 1); }
function aa() { let e, t; return { promise: new Promise((o, r) => { e = o, t = r; }), resolve: e, reject: t }; }
function Wv(e) { let t = g(), n = T(); if (co(t, n), !Qv(0, t))
    return; let o = t[k], r = ge(t, n), i = e(() => me(0, t, n), o); Sr(0, r, i); }
function Gv(e) { if (typeof ngServerMode < "u" && ngServerMode)
    return; let t = g(), n = t[k], o = T(), r = t[m], i = se(r, o); if (i.loadingState === X.NOT_STARTED) {
    let s = ge(t, o), c = e(() => Rr(i, t, o), n);
    Sr(1, s, c);
} }
function qv(e, t, n) { if (typeof ngServerMode < "u" && ngServerMode)
    return; let o = t[k], r = ge(t, n), i = r[ra], s = e(() => dt(o, i), o); Sr(2, r, s); }
function Rr(e, t, n) { ca(e, t, n); }
function ca(e, t, n) { let o = t[k], r = t[m]; if (e.loadingState !== X.NOT_STARTED)
    return e.loadingPromise ?? Promise.resolve(); let i = ge(t, n), s = jS(r, e); e.loadingState = X.IN_PROGRESS, Oi(1, i); let a = e.dependencyResolverFn, c = o.get(yc).add(); return a ? (e.loadingPromise = Promise.allSettled(a()).then(l => { let u = !1, d = null, f = [], p = []; for (let h = 0; h < l.length; h++) {
    let y = l[h];
    if (y.status === "fulfilled") {
        let v = y.value, D = W(v) || Te(v);
        if (D)
            f.push(D);
        else {
            let S = Ve(v);
            S && p.push(S);
        }
    }
    else {
        u = !0, d = y.reason instanceof Error ? y.reason : new Error(String(y.reason));
        break;
    }
} if (u) {
    if (e.loadingState = X.FAILED, e.errorTmplIndex === null) {
        let y = "", v = new w(-750, y);
        $u(t, v);
    }
}
else {
    e.loadingState = X.COMPLETE;
    let h = s.tView;
    if (f.length > 0) {
        h.directiveRegistry = sh(h.directiveRegistry, f);
        let y = f.map(D => D.type), v = Ha(!1, ...y);
        e.providers = v;
    }
    p.length > 0 && (h.pipeRegistry = sh(h.pipeRegistry, p));
} }), e.loadingPromise.finally(() => { e.loadingPromise = null, c(); })) : (e.loadingPromise = Promise.resolve().then(() => { e.loadingPromise = null, e.loadingState = X.COMPLETE, c(); }), e.loadingPromise); }
function Qv(e, t) { return !(e === 0 && typeof ngServerMode < "u" && ngServerMode || t[k].get(Ov, null, { optional: !0 })?.behavior === pd.Manual); }
function me(e, t, n) { let o = t[m], r = t[n.index]; if (!Qv(e, t))
    return; let i = ge(t, n), s = se(o, n); switch (_v(i), s.loadingState) {
    case X.NOT_STARTED:
        nt($.Loading, n, r), ca(s, t, n), s.loadingState === X.IN_PROGRESS && lh(s, n, r);
        break;
    case X.IN_PROGRESS:
        nt($.Loading, n, r), lh(s, n, r);
        break;
    case X.COMPLETE:
        nt($.Complete, n, r);
        break;
    case X.FAILED:
        nt($.Error, n, r);
        break;
    default:
} }
function dt(e, t, n) { return pt(this, null, function* () { let o = e.get(ct); if (o.hydrating.has(t))
    return; let { parentBlockPromise: i, hydrationQueue: s } = TM(t, e); if (s.length === 0)
    return; i !== null && s.shift(), sb(o, s), i !== null && (yield i); let a = s[0]; o.has(a) ? yield dh(e, s, n) : o.awaitParentBlock(a, () => pt(null, null, function* () { return yield dh(e, s, n); })); }); }
function dh(e, t, n) { return pt(this, null, function* () { let o = e.get(ct), r = o.hydrating, i = e.get(Bt), s = i.add(); for (let c = 0; c < t.length; c++) {
    let l = t[c], u = o.get(l);
    if (u != null) {
        if (yield cb(u), yield ab(e), rb(u)) {
            p_(u), fh(t.slice(c), o);
            break;
        }
        r.get(l).resolve();
    }
    else {
        ib(c, t, o), fh(t.slice(c), o);
        break;
    }
} let a = t[t.length - 1]; yield r.get(a)?.promise, i.remove(s), n && n(t), h_(o.get(a), t, o, e.get(ke)); }); }
function rb(e) { return ge(e.lView, e.tNode)[ut] === $.Error; }
function ib(e, t, n) { let o = e - 1, r = o > -1 ? n.get(t[o]) : null; r && Xs(r.lContainer); }
function fh(e, t) { let n = t.hydrating; for (let o in e)
    n.get(o)?.reject(); t.cleanup(e); }
function sb(e, t) { for (let n of t)
    e.hydrating.set(n, aa()); }
function ab(e) { return new Promise(t => xu(t, { injector: e })); }
function cb(e) { return pt(this, null, function* () { let { tNode: t, lView: n } = e, o = ge(n, t); return new Promise(r => { lb(o, r), me(2, n, t); }); }); }
function lb(e, t) { Array.isArray(e[Rn]) || (e[Rn] = []), e[Rn].push(t); }
function Q(e, t, n) { return e === 0 ? ph(t, n) : e === 2 ? !ph(t, n) : !(typeof ngServerMode < "u" && ngServerMode); }
function ub(e) { return e != null && (e & 1) === 1; }
function ph(e, t) { let n = e[k], o = se(e[m], t), r = Er(n), i = ub(o.flags); if (typeof ngServerMode < "u" && ngServerMode)
    return !r || !i; let a = ge(e, t)[ra] !== null; return !(i && a && r); }
function At(e, t) { let n = se(e, t); return n.hydrateTriggers ??= new Map; }
function Zv(e, t, n) { let o = [], r = [], i = [], s = []; for (let [a, c] of t) {
    let l = n.get(a);
    if (l !== void 0) {
        let u = c.data[rt], d = l;
        for (let f = 0; f < u; f++) {
            if (d = d.previousSibling, d.nodeType !== Node.ELEMENT_NODE)
                continue;
            let p = { el: d, blockName: a };
            c.hydrate.idle && o.push(p), c.hydrate.immediate && s.push(p), c.hydrate.timer !== null && (p.delay = c.hydrate.timer, r.push(p)), c.hydrate.viewport && (typeof c.hydrate.viewport != "boolean" && (p.intersectionObserverOptions = c.hydrate.viewport), i.push(p));
        }
    }
} db(e, o), hb(e, s), fb(e, i), pb(e, r); }
function db(e, t) { for (let n of t) {
    let o = e.get(ct), i = ia(() => dt(e, n.blockName), e);
    o.addCleanupFn(n.blockName, i);
} }
function fb(e, t) { if (t.length > 0) {
    let n = e.get(ct);
    for (let o of t) {
        let r = hd(o.el, () => dt(e, o.blockName), e, o.intersectionObserverOptions);
        n.addCleanupFn(o.blockName, r);
    }
} }
function pb(e, t) { for (let n of t) {
    let o = e.get(ct), r = () => dt(e, n.blockName), s = sa(n.delay)(r, e);
    o.addCleanupFn(n.blockName, s);
} }
function hb(e, t) { for (let n of t)
    dt(e, n.blockName); }
function Yv(e, t, n, o, r, i, s, a, c, l) { let u = g(), d = N(), f = e + I, p = on(u, d, e, null, 0, 0), h = u[k], y = Er(h); if (d.firstCreatePass) {
    q("NgDefer");
    let Ke = { primaryTmplIndex: t, loadingTmplIndex: o ?? null, placeholderTmplIndex: r ?? null, errorTmplIndex: i ?? null, placeholderBlockConfig: null, loadingBlockConfig: null, dependencyResolverFn: n ?? null, loadingState: X.NOT_STARTED, loadingPromise: null, providers: null, hydrateTriggers: null, debug: null, flags: l ?? 0 };
    c?.(d, Ke, a, s), FS(d, f, Ke);
} let v = u[f]; Ky(v, p, u); let D = null, S = null; if (v[Ie]?.length > 0) {
    let Ke = v[Ie][0].data;
    S = Ke[Cs] ?? null, D = Ke[yr];
} let K = [null, sr.Initial, null, null, null, null, S, D, null, null]; PS(u, f, K); let xe = null; S !== null && y && (xe = h.get(ct), xe.add(S, { lView: u, tNode: p, lContainer: v })); let Ce = () => { _v(K), S !== null && xe?.cleanup([S]); }; Sr(0, K, () => Wa(u, Ce)), ai(u, Ce); }
function Kv(e) { let t = g(), n = Ee(); if (!Q(0, t, n))
    return; let o = fe(); if (U(t, o, e)) {
    let r = b(null);
    try {
        let i = !!e, a = ge(t, n)[ut];
        i === !1 && a === sr.Initial ? co(t, n) : i === !0 && (a === sr.Initial || a === $.Placeholder) && me(0, t, n);
    }
    finally {
        b(r);
    }
} }
function Jv(e) { let t = g(), n = Ee(); if (!Q(1, t, n))
    return; let o = fe(); if (U(t, o, e)) {
    let r = b(null);
    try {
        let i = !!e, s = t[m], a = se(s, n);
        i === !0 && a.loadingState === X.NOT_STARTED && Rr(a, t, n);
    }
    finally {
        b(r);
    }
} }
function Xv(e) { let t = g(), n = Ee(); if (!Q(2, t, n))
    return; let o = fe(), r = N(); if (At(r, n).set(6, null), U(t, o, e))
    if (typeof ngServerMode < "u" && ngServerMode)
        me(2, t, n);
    else {
        let s = t[k], a = b(null);
        try {
            if (!!e === !0) {
                let u = ge(t, n)[ra];
                dt(s, u);
            }
        }
        finally {
            b(a);
        }
    } }
function eI() { let e = g(), t = T(); if (!Q(2, e, t))
    return; At(N(), t).set(7, null), typeof ngServerMode < "u" && ngServerMode && me(2, e, t); }
function tI() { let e = g(), t = T(); Q(0, e, t) && Wv(ia); }
function nI() { let e = g(), t = T(); Q(1, e, t) && Gv(ia); }
function oI() { let e = g(), t = T(); if (!Q(2, e, t))
    return; At(N(), t).set(0, null), typeof ngServerMode < "u" && ngServerMode ? me(2, e, t) : qv(ia, e, t); }
function rI() { let e = g(), t = T(); if (!Q(0, e, t))
    return; se(e[m], t).loadingTmplIndex === null && co(e, t), me(0, e, t); }
function iI() { let e = g(), t = T(); if (!Q(1, e, t))
    return; let n = e[m], o = se(n, t); o.loadingState === X.NOT_STARTED && ca(o, e, t); }
function sI() { let e = g(), t = T(); if (!Q(2, e, t))
    return; if (At(N(), t).set(1, null), typeof ngServerMode < "u" && ngServerMode)
    me(2, e, t);
else {
    let o = e[k], i = ge(e, t)[ra];
    dt(o, i);
} }
function aI(e) { let t = g(), n = T(); Q(0, t, n) && Wv(sa(e)); }
function cI(e) { let t = g(), n = T(); Q(1, t, n) && Gv(sa(e)); }
function lI(e) { let t = g(), n = T(); if (!Q(2, t, n))
    return; At(N(), n).set(5, { type: 5, delay: e }), typeof ngServerMode < "u" && ngServerMode ? me(2, t, n) : qv(sa(e), t, n); }
function uI(e, t) { let n = g(), o = T(); Q(0, n, o) && (co(n, o), typeof ngServerMode < "u" && ngServerMode || ao(n, o, e, t, _g, () => me(0, n, o), 0)); }
function dI(e, t) { let n = g(), o = T(); if (!Q(1, n, o))
    return; let r = n[m], i = se(r, o); i.loadingState === X.NOT_STARTED && ao(n, o, e, t, _g, () => Rr(i, n, o), 1); }
function fI() { let e = g(), t = T(); if (!Q(2, e, t))
    return; At(N(), t).set(4, null), typeof ngServerMode < "u" && ngServerMode && me(2, e, t); }
function pI(e, t) { let n = g(), o = T(); Q(0, n, o) && (co(n, o), typeof ngServerMode < "u" && ngServerMode || ao(n, o, e, t, wg, () => me(0, n, o), 0)); }
function hI(e, t) { let n = g(), o = T(); if (!Q(1, n, o))
    return; let r = n[m], i = se(r, o); i.loadingState === X.NOT_STARTED && ao(n, o, e, t, wg, () => Rr(i, n, o), 1); }
function gI() { let e = g(), t = T(); if (!Q(2, e, t))
    return; At(N(), t).set(3, null), typeof ngServerMode < "u" && ngServerMode && me(2, e, t); }
function mI(e, t, n) { let o = g(), r = T(); Q(0, o, r) && (co(o, r), typeof ngServerMode < "u" && ngServerMode || ao(o, r, e, t, hd, () => me(0, o, r), 0, n)); }
function yI(e, t, n) { let o = g(), r = T(); if (!Q(1, o, r))
    return; let i = o[m], s = se(i, r); s.loadingState === X.NOT_STARTED && ao(o, r, e, t, hd, () => Rr(s, o, r), 1, n); }
function vI(e) { let t = g(), n = T(); if (!Q(2, t, n))
    return; At(N(), n).set(2, e ? { type: 2, intersectionObserverOptions: e } : null), typeof ngServerMode < "u" && ngServerMode && me(2, t, n); }
function Md(e, t) { let n = g(), o = fe(); if (U(n, o, t)) {
    let r = N(), i = Ee();
    if (Ws(i, r, n, e, t))
        he(i) && qm(n, i.index);
    else {
        let a = ne(i, n);
        $s(n[C], a, null, i.value, e, t, null);
    }
} return Md; }
function Nd(e, t, n, o) { let r = g(), i = fe(); if (U(r, i, t)) {
    let s = N(), a = Ee();
    rw(a, r, e, t, n, o);
} return Nd; }
function jo(e) { if (q("NgAnimateEnter"), typeof ngServerMode < "u" && ngServerMode || !un)
    return jo; let t = g(); if (xs(t))
    return jo; let n = T(), o = t[k].get(B); return Os(Yi(t), n, () => gb(t, n, e, o)), js(t[k]), Ou(t[k], Yi(t)), jo; }
function gb(e, t, n, o) { let r = ne(t, e), i = e[C], s = Sm(n), a = [], c = !1, l = d => { if (Yo(d) !== r)
    return; let f = d instanceof AnimationEvent ? "animationend" : "transitionend"; o.runOutsideAngular(() => { i.listen(r, f, u); }); }, u = d => { Yo(d) === r && (Au(d, r) && (c = !0), mb(d, r, i)); }; if (s && s.length > 0) {
    o.runOutsideAngular(() => { a.push(i.listen(r, "animationstart", l)), a.push(i.listen(r, "transitionstart", l)); }), RN(r, s, a);
    for (let d of s)
        i.addClass(r, d);
    o.runOutsideAngular(() => { requestAnimationFrame(() => { if (!c && (Rm(r, Zt, un), !Zt.has(r))) {
        for (let d of s)
            i.removeClass(r, d);
        Su(r);
    } }); });
} }
function mb(e, t, n) { let o = On.get(t); if (!(Yo(e) !== t || !o) && Au(e, t)) {
    e.stopPropagation();
    for (let r of o.classList)
        n.removeClass(t, r);
    Su(t);
} }
function Vo(e) { if (q("NgAnimateEnter"), typeof ngServerMode < "u" && ngServerMode || !un)
    return Vo; let t = g(); if (xs(t))
    return Vo; let n = T(); return Os(Yi(t), n, () => yb(t, n, e)), js(t[k]), Ou(t[k], Yi(t)), Vo; }
function yb(e, t, n) { let o = ne(t, e); n.call(e[F], { target: o, animationComplete: kN }); }
function Bo(e) { if (q("NgAnimateLeave"), typeof ngServerMode < "u" && ngServerMode || !un)
    return Bo; let t = g(); if (xs(t))
    return Bo; let o = T(), r = t[k].get(B); return Os(Jt(t), o, () => vb(t, o, e, r)), js(t[k]), Bo; }
function vb(e, t, n, o) { let { promise: r, resolve: i } = aa(), s = ne(t, e), a = e[C]; Xt.add(e[we]), (Jt(e).get(t.index).resolvers ??= []).push(i); let c = Sm(n); return c && c.length > 0 ? Ib(s, t, e, c, a, o) : i(), { promise: r, resolve: i }; }
function Ib(e, t, n, o, r, i) { ON(e, r); let s = [], a = Jt(n).get(t.index)?.resolvers, c, l = !1, u = d => { if (!(Yo(d) !== e && d.type !== "animation-fallback") && (d.type === "animation-fallback" || Au(d, e))) {
    if (l = !0, c && clearTimeout(c), d.type !== "animation-fallback" && d.stopPropagation(), Zt.delete(e), pl(t, e), Array.isArray(t.projection))
        for (let p of o)
            r.removeClass(e, p);
    hl(a, s), gl(n, t);
} }; i.runOutsideAngular(() => { s.push(r.listen(e, "animationend", u)), s.push(r.listen(e, "transitionend", u)); }), bu(t, e); for (let d of o)
    r.addClass(e, d); i.runOutsideAngular(() => { requestAnimationFrame(() => { if (l)
    return; Rm(e, Zt, un); let d = Zt.get(e); d ? (c = setTimeout(() => { u(new CustomEvent("animation-fallback")); }, d.duration + 50), s.push(() => clearTimeout(c))) : (pl(t, e), hl(a, s), gl(n, t)); }); }); }
function ss(e) { if (q("NgAnimateLeave"), typeof ngServerMode < "u" && ngServerMode || !un)
    return ss; let t = g(), n = T(); Xt.add(t[we]); let o = t[k].get(B), r = t[k].get(_m); return Os(Jt(t), n, () => Eb(t, n, e, o, r)), js(t[k]), ss; }
function Eb(e, t, n, o, r) { let { promise: i, resolve: s } = aa(), a = ne(t, e), c = [], l = e[C], u = xs(e); (Jt(e).get(t.index).resolvers ??= []).push(s); let d = Jt(e).get(t.index)?.resolvers; if (u)
    Ti(e, t, a, d, c);
else {
    let f = setTimeout(() => Ti(e, t, a, d, c), r), p = { target: a, animationComplete: () => { Ti(e, t, a, d, c), clearTimeout(f); } };
    bu(t, a), o.runOutsideAngular(() => { c.push(l.listen(a, "animationend", () => { Ti(e, t, a, d, c), clearTimeout(f); }, { once: !0 })); }), n.call(e[F], p);
} return { promise: i, resolve: s }; }
function II() { return g()[Y][F]; }
var Ll = class {
    destroy(t) { }
    updateValue(t, n) { }
    swap(t, n) { let o = Math.min(t, n), r = Math.max(t, n), i = this.detach(r); if (r - o > 1) {
        let s = this.detach(o);
        this.attach(o, i), this.attach(r, s);
    }
    else
        this.attach(o, i); }
    move(t, n) { this.attach(n, this.detach(t)); }
};
function Lc(e, t, n, o, r) { return e === n && Object.is(t, o) ? 1 : Object.is(r(e, t), r(n, o)) ? -1 : 0; }
function Db(e, t, n, o) { let r, i, s = 0, a = e.length - 1, c = void 0; if (Array.isArray(t)) {
    b(o);
    let l = t.length - 1;
    for (b(null); s <= a && s <= l;) {
        let u = e.at(s), d = t[s], f = Lc(s, u, s, d, n);
        if (f !== 0) {
            f < 0 && e.updateValue(s, d), s++;
            continue;
        }
        let p = e.at(a), h = t[l], y = Lc(a, p, l, h, n);
        if (y !== 0) {
            y < 0 && e.updateValue(a, h), a--, l--;
            continue;
        }
        let v = n(s, u), D = n(a, p), S = n(s, d);
        if (Object.is(S, D)) {
            let K = n(l, h);
            Object.is(K, v) ? (e.swap(s, a), e.updateValue(a, h), l--, a--) : e.move(a, s), e.updateValue(s, d), s++;
            continue;
        }
        if (r ??= new as, i ??= gh(e, s, a, n), Pl(e, r, s, S))
            e.updateValue(s, d), s++, a++;
        else if (i.has(S))
            r.set(v, e.detach(s)), a--;
        else {
            let K = e.create(s, t[s]);
            e.attach(s, K), s++, a++;
        }
    }
    for (; s <= l;)
        hh(e, r, n, s, t[s]), s++;
}
else if (t != null) {
    b(o);
    let l = t[Symbol.iterator]();
    b(null);
    let u = l.next();
    for (; !u.done && s <= a;) {
        let d = e.at(s), f = u.value, p = Lc(s, d, s, f, n);
        if (p !== 0)
            p < 0 && e.updateValue(s, f), s++, u = l.next();
        else {
            r ??= new as, i ??= gh(e, s, a, n);
            let h = n(s, f);
            if (Pl(e, r, s, h))
                e.updateValue(s, f), s++, a++, u = l.next();
            else if (!i.has(h))
                e.attach(s, e.create(s, f)), s++, a++, u = l.next();
            else {
                let y = n(s, d);
                r.set(y, e.detach(s)), a--;
            }
        }
    }
    for (; !u.done;)
        hh(e, r, n, e.length, u.value), u = l.next();
} for (; s <= a;)
    e.destroy(e.detach(a--)); r?.forEach(l => { e.destroy(l); }); }
function Pl(e, t, n, o) { return t !== void 0 && t.has(o) ? (e.attach(n, t.get(o)), t.delete(o), !0) : !1; }
function hh(e, t, n, o, r) { if (Pl(e, t, o, n(o, r)))
    e.updateValue(o, r);
else {
    let i = e.create(o, r);
    e.attach(o, i);
} }
function gh(e, t, n, o) { let r = new Set; for (let i = t; i <= n; i++)
    r.add(o(i, e.at(i))); return r; }
var as = class {
    kvMap = new Map;
    _vMap = void 0;
    has(t) { return this.kvMap.has(t); }
    delete(t) { if (!this.has(t))
        return !1; let n = this.kvMap.get(t); return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0; }
    get(t) { return this.kvMap.get(t); }
    set(t, n) { if (this.kvMap.has(t)) {
        let o = this.kvMap.get(t);
        this._vMap === void 0 && (this._vMap = new Map);
        let r = this._vMap;
        for (; r.has(o);)
            o = r.get(o);
        r.set(o, n);
    }
    else
        this.kvMap.set(t, n); }
    forEach(t) { for (let [n, o] of this.kvMap)
        if (t(o, n), this._vMap !== void 0) {
            let r = this._vMap;
            for (; r.has(o);)
                o = r.get(o), t(o, n);
        } }
};
function EI(e, t, n, o, r, i, s, a) { q("NgControlFlow"); let c = g(), l = N(), u = le(l.consts, i); return on(c, l, e, t, n, o, r, u, 256, s, a), la; }
function la(e, t, n, o, r, i, s, a) { q("NgControlFlow"); let c = g(), l = N(), u = le(l.consts, i); return on(c, l, e, t, n, o, r, u, 512, s, a), la; }
function DI(e, t) { q("NgControlFlow"); let n = g(), o = fe(), r = n[o] !== L ? n[o] : -1, i = r !== -1 ? cs(n, I + r) : void 0, s = 0; if (U(n, o, e)) {
    let a = b(null);
    try {
        if (i !== void 0 && Uu(i, s), e !== -1) {
            let c = I + e, l = cs(n, c), u = Vl(n[m], c), d = Ay(l, u, n), f = no(n, u, t, { dehydratedView: d });
            oo(l, f, s, en(u, d));
        }
    }
    finally {
        b(a);
    }
}
else if (i !== void 0) {
    let a = iy(i, s);
    a !== void 0 && (a[F] = t);
} }
var Fl = class {
    lContainer;
    $implicit;
    $index;
    constructor(t, n, o) { this.lContainer = t, this.$implicit = n, this.$index = o; }
    get $count() { return this.lContainer.length - H; }
};
function CI(e) { return e; }
function TI(e, t) { return t; }
var Hl = class {
    hasEmptyBlock;
    trackByFn;
    liveCollection;
    constructor(t, n, o) { this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = o; }
};
function MI(e, t, n, o, r, i, s, a, c, l, u, d, f) { q("NgControlFlow"); let p = g(), h = N(), y = c !== void 0, v = g(), D = a ? s.bind(v[Y][F]) : s, S = new Hl(y, D); v[I + e] = S, on(p, h, e + 1, t, n, o, r, le(h.consts, i), 256), y && on(p, h, e + 2, c, l, u, d, le(h.consts, f), 512); }
var jl = class extends Ll {
    lContainer;
    hostLView;
    templateTNode;
    operationsCounter = void 0;
    needsIndexUpdate = !1;
    constructor(t, n, o) { super(), this.lContainer = t, this.hostLView = n, this.templateTNode = o; }
    get length() { return this.lContainer.length - H; }
    at(t) { return this.getLView(t)[F].$implicit; }
    attach(t, n) { let o = n[re]; this.needsIndexUpdate ||= t !== this.length, oo(this.lContainer, n, t, en(this.templateTNode, o)), Cb(this.lContainer, t); }
    detach(t) { return this.needsIndexUpdate ||= t !== this.length - 1, Tb(this.lContainer, t), Mb(this.lContainer, t); }
    create(t, n) { let o = tr(this.lContainer, this.templateTNode.tView.ssrId); return no(this.hostLView, this.templateTNode, new Fl(this.lContainer, n, t), { dehydratedView: o }); }
    destroy(t) { Mr(t[m], t); }
    updateValue(t, n) { this.getLView(t)[F].$implicit = n; }
    reset() { this.needsIndexUpdate = !1; }
    updateIndexes() { if (this.needsIndexUpdate)
        for (let t = 0; t < this.length; t++)
            this.getLView(t)[F].$index = t; }
    getLView(t) { return Nb(this.lContainer, t); }
};
function NI(e) { let t = b(null), n = ie(); try {
    let o = g(), r = o[m], i = o[n], s = n + 1, a = cs(o, s);
    if (i.liveCollection === void 0) {
        let l = Vl(r, s);
        i.liveCollection = new jl(a, o, l);
    }
    else
        i.liveCollection.reset();
    let c = i.liveCollection;
    if (Db(c, e, i.trackByFn, t), c.updateIndexes(), i.hasEmptyBlock) {
        let l = fe(), u = c.length === 0;
        if (U(o, l, u)) {
            let d = n + 2, f = cs(o, d);
            if (u) {
                let p = Vl(r, d), h = Ay(f, p, o), y = no(o, p, void 0, { dehydratedView: h });
                oo(f, y, 0, en(p, h));
            }
            else
                r.firstUpdatePass && Js(f), Uu(f, 0);
        }
    }
}
finally {
    b(t);
} }
function cs(e, t) { return e[t]; }
function Cb(e, t) { if (e.length <= H)
    return; let n = H + t, o = e[n], r = o ? o[Ue] : void 0; if (o && r && r.detachedLeaveAnimationFns && r.detachedLeaveAnimationFns.length > 0) {
    let i = o[k];
    BN(i, r), Xt.delete(o[we]), r.detachedLeaveAnimationFns = void 0;
} }
function Tb(e, t) { if (e.length <= H)
    return; let n = H + t, o = e[n], r = o ? o[Ue] : void 0; r && r.leave && r.leave.size > 0 && (r.detachedLeaveAnimationFns = []); }
function Mb(e, t) { return Jo(e, t); }
function Nb(e, t) { return iy(e, t); }
function Vl(e, t) { return Ht(e, t); }
function wd(e, t, n) { let o = g(), r = fe(); if (U(o, r, t)) {
    let i = N(), s = Ee();
    ju(s, o, e, t, o[C], n);
} return wd; }
function Bl(e, t, n, o, r) { Ws(t, e, n, r ? "class" : "style", o); }
function ar(e, t, n, o) { let r = g(), i = r[m], s = e + I, a = i.firstCreatePass ? Zu(s, r, 2, t, Bu, ci(), n, o) : i.data[s]; if (he(a)) {
    let c = r[Be].tracingService;
    if (c && c.componentCreate) {
        let l = i.data[a.directiveStart + a.componentOffset];
        return c.componentCreate(Ju(l), () => (mh(e, t, r, a, o), ar));
    }
} return mh(e, t, r, a, o), ar; }
function mh(e, t, n, o, r) { if (Us(o, n, e, t, bd), yn(o)) {
    let i = n[m];
    Bs(i, n, o), hu(i, o, n);
} r != null && to(n, o); }
function ua() { let e = N(), t = T(), n = zs(t); return e.firstCreatePass && Yu(e, n), qa(n) && Ya(), Ga(), n.classesWithoutHost != null && uT(n) && Bl(e, n, g(), n.classesWithoutHost, !0), n.stylesWithoutHost != null && dT(n) && Bl(e, n, g(), n.stylesWithoutHost, !1), ua; }
function _d(e, t, n, o) { return ar(e, t, n, o), ua(), _d; }
function da(e, t, n, o) { let r = g(), i = r[m], s = e + I, a = i.firstCreatePass ? Fy(s, i, 2, t, n, o) : i.data[s]; return Us(a, r, e, t, bd), o != null && to(r, a), da; }
function fa() { let e = T(), t = zs(e); return qa(t) && Ya(), Ga(), fa; }
function Sd(e, t, n, o) { return da(e, t, n, o), fa(), Sd; }
var bd = (e, t, n, o, r) => (Fe(!0), As(t[C], o, pi()));
function wb(e, t, n, o, r) { let i = !Ss(t, n); if (Fe(i), i)
    return As(t[C], o, pi()); let s = t[re], a = wr(s, e, t, n); return $g(s, r) && ws(s, r, a.nextSibling), s && (Kl(n) || ug(a)) && he(n) && (Xf(n), um(a)), a; }
function wI() { bd = wb; }
function pa(e, t, n) { let o = g(), r = o[m], i = e + I, s = r.firstCreatePass ? Zu(i, o, 8, "ng-container", Bu, ci(), t, n) : r.data[i]; if (Us(s, o, e, "ng-container", xd), yn(s)) {
    let a = o[m];
    Bs(a, o, s), hu(a, s, o);
} return n != null && to(o, s), pa; }
function kr() { let e = N(), t = T(), n = zs(t); return e.firstCreatePass && Yu(e, n), kr; }
function Ad(e, t, n) { return pa(e, t, n), kr(), Ad; }
function ha(e, t, n) { let o = g(), r = o[m], i = e + I, s = r.firstCreatePass ? Fy(i, r, 8, "ng-container", t, n) : r.data[i]; return Us(s, o, e, "ng-container", xd), n != null && to(o, s), ha; }
function Rd() { let e = T(), t = zs(e); return kr; }
function kd(e, t, n) { return ha(e, t, n), Rd(), kd; }
var xd = (e, t, n, o, r) => (Fe(!0), vu(t[C], ""));
function _b(e, t, n, o, r) { let i, s = !Ss(t, n); if (Fe(s), s)
    return vu(t[C], ""); let a = t[re], c = wr(a, e, t, n), l = Bg(a, r); return ws(a, r, c), i = Ys(l, c), i; }
function _I() { xd = _b; }
function SI() { return g(); }
function Od(e, t, n) { let o = g(), r = fe(); if (U(o, r, t)) {
    let i = N(), s = Ee();
    Vu(s, o, e, t, o[C], n);
} return Od; }
function Ld(e, t, n) { let o = g(), r = fe(); if (U(o, r, t)) {
    let i = N(), s = Ee(), a = li(i.data), c = Qm(a, s, o);
    Vu(s, o, e, t, c, n);
} return Ld; }
var ko = void 0;
function Sb(e) { let t = Math.floor(Math.abs(e)), n = e.toString().replace(/^[^.]*\.?/, "").length; return t === 1 && n === 0 ? 1 : 5; }
var bb = ["en", [["a", "p"], ["AM", "PM"]], [["AM", "PM"]], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], ko, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], ko, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm\u202Fa", "h:mm:ss\u202Fa", "h:mm:ss\u202Fa z", "h:mm:ss\u202Fa zzzz"], ["{1}, {0}", ko, ko, ko], [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", Sb], kn = {};
function Ab(e, t, n) { typeof t != "string" && (n = t, t = e[Bn.LocaleId]), t = t.toLowerCase().replace(/_/g, "-"), kn[t] = e, n && (kn[t][Bn.ExtraData] = n); }
function Pd(e) { let t = xb(e), n = yh(t); if (n)
    return n; let o = t.split("-")[0]; if (n = yh(o), n)
    return n; if (o === "en")
    return bb; throw new w(701, !1); }
function Rb(e) { return Pd(e)[Bn.CurrencyCode] || null; }
function bI(e) { return Pd(e)[Bn.PluralCase]; }
function yh(e) { return e in kn || (kn[e] = ve.ng && ve.ng.common && ve.ng.common.locales && ve.ng.common.locales[e]), kn[e]; }
function kb() { kn = {}; }
var Bn = (function (e) { return e[e.LocaleId = 0] = "LocaleId", e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat", e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", e[e.DaysFormat = 3] = "DaysFormat", e[e.DaysStandalone = 4] = "DaysStandalone", e[e.MonthsFormat = 5] = "MonthsFormat", e[e.MonthsStandalone = 6] = "MonthsStandalone", e[e.Eras = 7] = "Eras", e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek", e[e.WeekendRange = 9] = "WeekendRange", e[e.DateFormat = 10] = "DateFormat", e[e.TimeFormat = 11] = "TimeFormat", e[e.DateTimeFormat = 12] = "DateTimeFormat", e[e.NumberSymbols = 13] = "NumberSymbols", e[e.NumberFormats = 14] = "NumberFormats", e[e.CurrencyCode = 15] = "CurrencyCode", e[e.CurrencySymbol = 16] = "CurrencySymbol", e[e.CurrencyName = 17] = "CurrencyName", e[e.Currencies = 18] = "Currencies", e[e.Directionality = 19] = "Directionality", e[e.PluralCase = 20] = "PluralCase", e[e.ExtraData = 21] = "ExtraData", e; })(Bn || {});
function xb(e) { return e.toLowerCase().replace(/_/g, "-"); }
var Ob = ["zero", "one", "two", "few", "many"];
function Lb(e, t) { let n = bI(t)(parseInt(e, 10)), o = Ob[n]; return o !== void 0 ? o : "other"; }
var xr = "en-US", Pb = "USD", AI = { marker: "element" }, RI = { marker: "ICU" }, tt = (function (e) { return e[e.SHIFT = 2] = "SHIFT", e[e.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", e[e.COMMENT = 2] = "COMMENT", e; })(tt || {}), kI = xr;
function xI(e) { typeof e == "string" && (kI = e.toLowerCase().replace(/_/g, "-")); }
function Fb() { return kI; }
var cr = 0, $o = 0;
function Hb(e) { e && (cr = cr | 1 << Math.min($o, 31)), $o++; }
function jb(e, t, n) { try {
    if ($o > 0) {
        let o = e.data[n], r = Array.isArray(o) ? o : o.update, i = Ge() - $o - 1;
        FI(e, t, r, i, cr);
    }
}
finally {
    cr = 0, $o = 0;
} }
function OI(e, t, n) { let o = e[C]; switch (n) {
    case Node.COMMENT_NODE: return vu(o, t);
    case Node.TEXT_NODE: return yu(o, t);
    case Node.ELEMENT_NODE: return As(o, t, null);
} }
var Uo = (e, t, n, o) => (Fe(!0), OI(e, n, o));
function Vb(e, t, n, o) { let r = e[re], i = t - I, s = !Ks() || !r || _o() || _s(r, i); return Fe(s), s ? OI(e, n, o) : hy(r, i); }
function LI() { Uo = Vb; }
function Bb(e, t, n, o) { let r = e[C]; for (let i = 0; i < t.length; i++) {
    let s = t[i++], a = t[i], c = (s & tt.COMMENT) === tt.COMMENT, l = (s & tt.APPEND_EAGERLY) === tt.APPEND_EAGERLY, u = s >>> tt.SHIFT, d = e[u], f = !1;
    d === null && (d = e[u] = Uo(e, u, a, c ? Node.COMMENT_NODE : Node.TEXT_NODE), f = bo()), l && n !== null && f && Kt(r, n, d, o, !1);
} }
function PI(e, t, n, o) { let r = n[C], i = null, s; for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "string") {
        let l = t[++a];
        n[l] === null && (n[l] = Uo(n, l, c, Node.TEXT_NODE));
    }
    else if (typeof c == "number")
        switch (c & 1) {
            case 0:
                let l = zw(c);
                i === null && (i = l, s = r.parentNode(o));
                let u, d;
                if (l === i ? (u = o, d = s) : (u = null, d = x(n[l])), d !== null) {
                    let y = Ww(c), v = n[y];
                    Kt(r, d, v, u, !1);
                    let D = Po(e, y);
                    if (D !== null && typeof D == "object") {
                        let S = Zs(D, n);
                        S !== null && PI(e, D.create[S], n, n[D.anchorIdx]);
                    }
                }
                break;
            case 1:
                let f = c >>> 1, p = t[++a], h = t[++a];
                $s(r, Ft(f, n), null, null, p, h, null);
                break;
            default:
        }
    else
        switch (c) {
            case RI:
                let l = t[++a], u = t[++a];
                if (n[u] === null) {
                    let p = n[u] = Uo(n, u, l, Node.COMMENT_NODE);
                    be(p, n);
                }
                break;
            case AI:
                let d = t[++a], f = t[++a];
                if (n[f] === null) {
                    let p = n[f] = Uo(n, f, d, Node.ELEMENT_NODE);
                    be(p, n);
                }
                break;
            default:
        }
} }
function FI(e, t, n, o, r) { for (let i = 0; i < n.length; i++) {
    let s = n[i], a = n[++i];
    if (s & r) {
        let c = "";
        for (let l = i + 1; l <= i + a; l++) {
            let u = n[l];
            if (typeof u == "string")
                c += u;
            else if (typeof u == "number")
                if (u < 0)
                    c += M(t[o - u]);
                else {
                    let d = u >>> 2;
                    switch (u & 3) {
                        case 1:
                            let f = n[++l], p = n[++l], h = e.data[d];
                            typeof h == "string" ? $s(t[C], t[d], null, h, f, c, p) : ju(h, t, f, c, t[C], p);
                            break;
                        case 0:
                            let y = t[d];
                            y !== null && cm(t[C], y, c);
                            break;
                        case 2:
                            $b(e, Po(e, d), t, c);
                            break;
                        case 3:
                            vh(e, Po(e, d), o, t);
                            break;
                    }
                }
        }
    }
    else {
        let c = n[i + 1];
        if (c > 0 && (c & 3) === 3) {
            let l = c >>> 2, u = Po(e, l);
            t[u.currentCaseLViewIndex] < 0 && vh(e, u, o, t);
        }
    }
    i += a;
} }
function vh(e, t, n, o) { let r = o[t.currentCaseLViewIndex]; if (r !== null) {
    let i = cr;
    r < 0 && (r = o[t.currentCaseLViewIndex] = ~r, i = -1), FI(e, o, t.update[r], n, i);
} }
function $b(e, t, n, o) { let r = Ub(t, o); if (Zs(t, n) !== r && (HI(e, t, n), n[t.currentCaseLViewIndex] = r === null ? null : ~r, r !== null)) {
    let s = n[t.anchorIdx];
    s && PI(e, t.create[r], n, s), l_(n, t.anchorIdx, r);
} }
function HI(e, t, n) { let o = Zs(t, n); if (o !== null) {
    let r = t.remove[o];
    for (let i = 0; i < r.length; i++) {
        let s = r[i];
        if (s > 0) {
            let a = Ft(s, n);
            a !== null && Dr(n[C], a);
        }
        else
            HI(e, Po(e, ~s), n);
    }
} }
function Ub(e, t) { let n = e.cases.indexOf(t); if (n === -1)
    switch (e.type) {
        case 1: {
            let o = Lb(t, Fb());
            n = e.cases.indexOf(o), n === -1 && o !== "other" && (n = e.cases.indexOf("other"));
            break;
        }
        case 0: {
            n = e.cases.indexOf("other");
            break;
        }
    } return n === -1 ? null : n; }
var ls = /�(\d+):?\d*�/gi, zb = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi, Wb = /�(\d+)�/, jI = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/, zo = "\uFFFD", Gb = /�\/?\*(\d+:\d+)�/gi, qb = /�(\/?[#*]\d+):?\d*�/gi, Qb = /\uE500/g;
function Zb(e) { return e.replace(Qb, " "); }
function Yb(e, t, n, o, r, i) { let s = vn(), a = [], c = [], l = [[]], u = [[]]; r = eA(r, i); let d = Zb(r).split(qb); for (let f = 0; f < d.length; f++) {
    let p = d[f];
    if ((f & 1) === 0) {
        let h = $l(p);
        for (let y = 0; y < h.length; y++) {
            let v = h[y];
            if ((y & 1) === 0) {
                let D = v;
                D !== "" && Kb(u[0], e, s, l[0], a, c, n, D);
            }
            else {
                let D = v;
                if (typeof D != "object")
                    throw new Error(`Unable to parse ICU expression in "${r}" message.`);
                let K = VI(e, s, l[0], n, a, "", !0).index;
                $I(u[0], e, n, c, t, D, K);
            }
        }
    }
    else {
        let h = p.charCodeAt(0) === 47, y = p.charCodeAt(h ? 1 : 0), v = I + Number.parseInt(p.substring(h ? 2 : 1));
        if (h)
            l.shift(), u.shift(), We(vn(), !1);
        else {
            let D = Uw(e, l[0], v);
            l.unshift([]), We(D, !0);
            let S = { kind: 2, index: v, children: [], type: y === 35 ? 0 : 1 };
            u[0].push(S), u.unshift(S.children);
        }
    }
} e.data[o] = { create: a, update: c, ast: u[0], parentTNodeIndex: t }; }
function VI(e, t, n, o, r, i, s) { let a = Tr(e, o, 1, null), c = a << tt.SHIFT, l = vn(); t === l && (l = null), l === null && (c |= tt.APPEND_EAGERLY), s && (c |= tt.COMMENT, SN(qw)), r.push(c, i === null ? "" : i); let u = zu(e, a, s ? 32 : 1, i === null ? "" : i, null); uy(n, u); let d = u.index; return We(u, !1), l !== null && t !== l && $w(l, d), u; }
function Kb(e, t, n, o, r, i, s, a) { let c = a.match(ls), u = VI(t, n, o, s, r, c ? null : a, !1).index; c && us(i, a, u, null, 0, null), e.push({ kind: 0, index: u }); }
function Jb(e, t, n) { let r = T().index, i = []; if (e.firstCreatePass && e.data[t] === null) {
    for (let s = 0; s < n.length; s += 2) {
        let a = n[s], c = n[s + 1];
        if (c !== "") {
            if (zb.test(c))
                throw new Error(`ICU expressions are not supported in attributes. Message: "${c}".`);
            us(i, c, r, a, Xb(i), zI(a));
        }
    }
    e.data[t] = i;
} }
function us(e, t, n, o, r, i) { let s = e.length, a = s + 1; e.push(null, null); let c = s + 2, l = t.split(ls), u = 0; for (let d = 0; d < l.length; d++) {
    let f = l[d];
    if (d & 1) {
        let p = r + parseInt(f, 10);
        e.push(-1 - p), u = u | BI(p);
    }
    else
        f !== "" && e.push(f);
} return e.push(n << 2 | (o ? 1 : 0)), o && e.push(o, i), e[s] = u, e[a] = e.length - c, u; }
function Xb(e) { let t = 0; for (let n = 0; n < e.length; n++) {
    let o = e[n];
    typeof o == "number" && o < 0 && t++;
} return t; }
function BI(e) { return 1 << Math.min(e, 31); }
function Ih(e) { let t, n = "", o = 0, r = !1, i; for (; (t = Gb.exec(e)) !== null;)
    r ? t[0] === `${zo}/*${i}${zo}` && (o = t.index, r = !1) : (n += e.substring(o, t.index + t[0].length), i = t[1], r = !0); return n += e.slice(o), n; }
function eA(e, t) { if (fy(t))
    return Ih(e); {
    let n = e.indexOf(`:${t}${zo}`) + 2 + t.toString().length, o = e.search(new RegExp(`${zo}\\/\\*\\d+:${t}${zo}`));
    return Ih(e.substring(n, o));
} }
function $I(e, t, n, o, r, i, s) { let a = 0, c = { type: i.type, currentCaseLViewIndex: Tr(t, n, 1, null), anchorIdx: s, cases: [], create: [], remove: [], update: [] }; rA(o, i, s), Bw(t, s, c); let l = i.values, u = []; for (let d = 0; d < l.length; d++) {
    let f = l[d], p = [];
    for (let y = 0; y < f.length; y++) {
        let v = f[y];
        if (typeof v != "string") {
            let D = p.push(v) - 1;
            f[y] = `<!--\uFFFD${D}\uFFFD-->`;
        }
    }
    let h = [];
    u.push(h), a = nA(h, t, c, n, o, r, i.cases[d], f.join(""), p) | a;
} a && iA(o, a, s), e.push({ kind: 3, index: s, cases: u, currentCaseLViewIndex: c.currentCaseLViewIndex }); }
function tA(e) { let t = [], n = [], o = 1, r = 0; e = e.replace(jI, function (s, a, c) { return c === "select" ? o = 0 : o = 1, r = parseInt(a.slice(1), 10), ""; }); let i = $l(e); for (let s = 0; s < i.length;) {
    let a = i[s++].trim();
    o === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")), a.length && t.push(a);
    let c = $l(i[s++]);
    t.length > n.length && n.push(c);
} return { type: o, mainBinding: r, cases: t, values: n }; }
function $l(e) { if (!e)
    return []; let t = 0, n = [], o = [], r = /[{}]/g; r.lastIndex = 0; let i; for (; i = r.exec(e);) {
    let a = i.index;
    if (i[0] == "}") {
        if (n.pop(), n.length == 0) {
            let c = e.substring(t, a);
            jI.test(c) ? o.push(tA(c)) : o.push(c), t = a + 1;
        }
    }
    else {
        if (n.length == 0) {
            let c = e.substring(t, a);
            o.push(c), t = a + 1;
        }
        n.push("{");
    }
} let s = e.substring(t); return o.push(s), o; }
function nA(e, t, n, o, r, i, s, a, c) { let l = [], u = [], d = []; n.cases.push(s), n.create.push(l), n.remove.push(u), n.update.push(d); let p = tm(vs()).getInertBodyElement(a), h = dl(p) || p; return h ? UI(e, t, n, o, r, l, u, d, h, i, c, 0) : 0; }
function UI(e, t, n, o, r, i, s, a, c, l, u, d) { let f = 0, p = c.firstChild; for (; p;) {
    let h = Tr(t, o, 1, null);
    switch (p.nodeType) {
        case Node.ELEMENT_NODE:
            let y = p, v = y.tagName.toLowerCase();
            if (cl.hasOwnProperty(v)) {
                Pc(i, AI, v, l, h), t.data[h] = v;
                let xe = y.attributes;
                for (let Ke = 0; Ke < xe.length; Ke++) {
                    let Rt = xe.item(Ke), Hr = Rt.name.toLowerCase();
                    !!Rt.value.match(ls) ? ll.hasOwnProperty(Hr) && us(a, Rt.value, h, Rt.name, 0, zI(Hr)) : ll[Hr] && (im[Hr] ? Dh(i, h, Rt.name, "unsafe:blocked") : Dh(i, h, Rt.name, Rt.value));
                }
                let Ce = { kind: 1, index: h, children: [] };
                e.push(Ce), f = UI(Ce.children, t, n, o, r, i, s, a, p, h, u, d + 1) | f, Eh(s, h, d);
            }
            break;
        case Node.TEXT_NODE:
            let D = p.textContent || "", S = D.match(ls);
            Pc(i, null, S ? "" : D, l, h), Eh(s, h, d), S && (f = us(a, D, h, null, 0, null) | f), e.push({ kind: 0, index: h });
            break;
        case Node.COMMENT_NODE:
            let K = Wb.exec(p.textContent || "");
            if (K) {
                let xe = parseInt(K[1], 10), Ce = u[xe];
                Pc(i, RI, "", l, h), $I(e, t, o, r, l, Ce, h), oA(s, h, d);
            }
            break;
    }
    p = p.nextSibling;
} return f; }
function Eh(e, t, n) { n === 0 && e.push(t); }
function oA(e, t, n) { n === 0 && (e.push(~t), e.push(t)); }
function rA(e, t, n) { e.push(BI(t.mainBinding), 2, -1 - t.mainBinding, n << 2 | 2); }
function iA(e, t, n) { e.push(t, 1, n << 2 | 3); }
function Pc(e, t, n, o, r) { t !== null && e.push(t), e.push(n, r, Gw(0, o, r)); }
function Dh(e, t, n, o) { e.push(t << 1 | 1, n, o); }
var sA = new Set(Object.values(vm).flatMap(e => e ? Object.keys(e) : []));
function zI(e) { let t = e.toLowerCase(); return im[t] ? bs : sA.has(t) ? Du : null; }
var Ch = 0, aA = /\[(�.+?�?)\]/, cA = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g, lA = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g, uA = /{([A-Z0-9_]+)}/g, dA = /�I18N_EXP_(ICU(_\d+)?)�/g, fA = /\/\*/, pA = /\d+\:(\d+)/;
function hA(e, t = {}) { let n = e; if (aA.test(e)) {
    let o = {}, r = [Ch];
    n = n.replace(cA, (i, s, a) => { let c = s || a, l = o[c] || []; if (l.length || (c.split("|").forEach(y => { let v = y.match(pA), D = v ? parseInt(v[1], 10) : Ch, S = fA.test(y); l.push([D, S, y]); }), o[c] = l), !l.length)
        throw new Error(`i18n postprocess: unmatched placeholder - ${c}`); let u = r[r.length - 1], d = 0; for (let y = 0; y < l.length; y++)
        if (l[y][0] === u) {
            d = y;
            break;
        } let [f, p, h] = l[d]; return p ? r.pop() : u !== f && r.push(f), l.splice(d, 1), h; });
} return Object.keys(t).length && (n = n.replace(lA, (o, r, i, s, a, c) => t.hasOwnProperty(i) ? `${r}${t[i]}${c}` : o), n = n.replace(uA, (o, r) => t.hasOwnProperty(r) ? t[r] : o), n = n.replace(dA, (o, r) => { if (t.hasOwnProperty(r)) {
    let i = t[r];
    if (!i.length)
        throw new Error(`i18n postprocess: unmatched ICU - ${o} with key: ${r}`);
    return i.shift();
} return o; })), n; }
function Fd(e, t, n = -1) { let o = N(), r = g(), i = I + e, s = le(o.consts, t), a = vn(); if (o.firstCreatePass && Yb(o, a === null ? 0 : a.index, r, i, s, n), o.type === 2) {
    let f = r[Y];
    f[A] |= 32;
}
else
    r[A] |= 32; let c = o.data[i], l = a === r[ce] ? null : a, u = Fm(o, l, r), d = a && a.type & 8 ? r[a.index] : null; o_(r, i, a, n), Bb(r, c.create, u, d), ic(!0); }
function Hd() { ic(!1); }
function WI(e, t, n) { Fd(e, t, n), Hd(); }
function GI(e, t) { let n = N(), o = le(n.consts, t); Jb(n, e + I, o); }
function jd(e) { let t = g(); return Hb(U(t, fe(), e)), jd; }
function qI(e) { jb(N(), g(), e + I); }
function QI(e, t = {}) { return hA(e, t); }
function Vd(e, t, n) { let o = g(), r = N(), i = T(); return Ud(r, o, o[C], i, e, t, n), Vd; }
function Bd(e, t) { let n = T(), o = g(), r = N(), i = li(r.data), s = Qm(i, n, o); return Ud(r, o, s, n, e, t), Bd; }
function $d(e, t, n) { let o = g(), r = N(), i = T(); return (i.type & 3 || n) && Ku(i, r, o, n, o[C], e, t, _t(i, o, t)), $d; }
function Ud(e, t, n, o, r, i, s) { let a = !0, c = null; if ((o.type & 3 || s) && (c ??= _t(o, t, i), Ku(o, e, t, s, n, r, i, c) && (a = !1)), a) {
    let l = o.outputs?.[r], u = o.hostDirectiveOutputs?.[r];
    if (u && u.length)
        for (let d = 0; d < u.length; d += 2) {
            let f = u[d], p = u[d + 1];
            c ??= _t(o, t, i), Fn(o, t, f, p, r, c);
        }
    if (l && l.length)
        for (let d of l)
            c ??= _t(o, t, i), Fn(o, t, d, r, r, c);
} }
function ZI(e = 1) { return rp(e); }
function gA(e, t) { let n = null, o = IN(e); for (let r = 0; r < t.length; r++) {
    let i = t[r];
    if (i === "*") {
        n = r;
        continue;
    }
    if (o === null ? Cm(e, i, !0) : CN(o, i))
        return r;
} return n; }
function YI(e) { let t = g()[Y][ce]; if (!t.projection) {
    let n = e ? e.length : 1, o = t.projection = vo(n, null), r = o.slice(), i = t.child;
    for (; i !== null;) {
        if (i.type !== 128) {
            let s = e ? gA(i, e) : 0;
            s !== null && (r[s] ? r[s].projectionNext = i : o[s] = i, r[s] = i);
        }
        i = i.next;
    }
} }
function KI(e, t = 0, n, o, r, i) { let s = g(), a = N(), c = o ? e + 1 : null; c !== null && on(s, a, c, o, r, i, null, n); let l = fn(a, I + e, 16, null, n || null); l.projection === null && (l.projection = t), ec(); let d = !s[re] || _o(); s[Y][ce].projection[l.projection] === null && c !== null ? mA(s, a, c) : d && !Kn(l) && QN(a, s, l); }
function mA(e, t, n) { let o = I + n, r = t.data[o], i = e[o], s = tr(i, r.tView.ssrId), a = no(e, r, void 0, { dehydratedView: s }); oo(i, a, 0, en(r, s)); }
function zd(e, t, n, o) { return ov(e, t, n, o), zd; }
function Wd(e, t, n) { return nv(e, t, n), Wd; }
function JI(e) { let t = g(), n = N(), o = ui(); So(o + 1); let r = td(n, o); if (e.dirty && zf(t) === ((r.metadata.flags & 2) === 2)) {
    if (r.matches === null)
        e.reset([]);
    else {
        let i = iv(t, o);
        e.reset(i, lg), e.notifyOnChanges();
    }
    return !0;
} return !1; }
function XI() { return ed(g(), ui()); }
function Gd(e, t, n, o, r) { return sv(t, ov(e, n, o, r)), Gd; }
function qd(e, t, n, o) { return sv(e, nv(t, n, o)), qd; }
function eE(e = 1) { So(ui() + e); }
function tE(e) { let t = tc(); return Et(t, I + e); }
function wi(e, t) { return e << 17 | t << 2; }
function rn(e) { return e >> 17 & 32767; }
function yA(e) { return (e & 2) == 2; }
function vA(e, t) { return e & 131071 | t << 17; }
function Ul(e) { return e | 2; }
function $n(e) { return (e & 131068) >> 2; }
function Fc(e, t) { return e & -131069 | t << 2; }
function IA(e) { return (e & 1) === 1; }
function zl(e) { return e | 1; }
function EA(e, t, n, o, r, i) { let s = i ? t.classBindings : t.styleBindings, a = rn(s), c = $n(s); e[o] = n; let l = !1, u; if (Array.isArray(n)) {
    let d = n;
    u = d[1], (u === null || Xr(d, u) > 0) && (l = !0);
}
else
    u = n; if (r)
    if (c !== 0) {
        let f = rn(e[a + 1]);
        e[o + 1] = wi(f, a), f !== 0 && (e[f + 1] = Fc(e[f + 1], o)), e[a + 1] = vA(e[a + 1], o);
    }
    else
        e[o + 1] = wi(a, 0), a !== 0 && (e[a + 1] = Fc(e[a + 1], o)), a = o;
else
    e[o + 1] = wi(c, 0), a === 0 ? a = o : e[c + 1] = Fc(e[c + 1], o), c = o; l && (e[o + 1] = Ul(e[o + 1])), Th(e, u, o, !0), Th(e, u, o, !1), DA(t, u, e, o, i), s = wi(a, c), i ? t.classBindings = s : t.styleBindings = s; }
function DA(e, t, n, o, r) { let i = r ? e.residualClasses : e.residualStyles; i != null && typeof t == "string" && Xr(i, t) >= 0 && (n[o + 1] = zl(n[o + 1])); }
function Th(e, t, n, o) { let r = e[n + 1], i = t === null, s = o ? rn(r) : $n(r), a = !1; for (; s !== 0 && (a === !1 || i);) {
    let c = e[s], l = e[s + 1];
    CA(c, t) && (a = !0, e[s + 1] = o ? zl(l) : Ul(l)), s = o ? rn(l) : $n(l);
} a && (e[n + 1] = o ? Ul(r) : zl(r)); }
function CA(e, t) { return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? Xr(e, t) >= 0 : !1; }
var oe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function nE(e) { return e.substring(oe.key, oe.keyEnd); }
function TA(e) { return e.substring(oe.value, oe.valueEnd); }
function MA(e) { return iE(e), oE(e, Un(e, 0, oe.textEnd)); }
function oE(e, t) { let n = oe.textEnd; return n === t ? -1 : (t = oe.keyEnd = wA(e, oe.key = t, n), Un(e, t, n)); }
function NA(e) { return iE(e), rE(e, Un(e, 0, oe.textEnd)); }
function rE(e, t) { let n = oe.textEnd, o = oe.key = Un(e, t, n); return n === o ? -1 : (o = oe.keyEnd = _A(e, o, n), o = Mh(e, o, n, 58), o = oe.value = Un(e, o, n), o = oe.valueEnd = SA(e, o, n), Mh(e, o, n, 59)); }
function iE(e) { oe.key = 0, oe.keyEnd = 0, oe.value = 0, oe.valueEnd = 0, oe.textEnd = e.length; }
function Un(e, t, n) { for (; t < n && e.charCodeAt(t) <= 32;)
    t++; return t; }
function wA(e, t, n) { for (; t < n && e.charCodeAt(t) > 32;)
    t++; return t; }
function _A(e, t, n) { let o; for (; t < n && ((o = e.charCodeAt(t)) === 45 || o === 95 || (o & -33) >= 65 && (o & -33) <= 90 || o >= 48 && o <= 57);)
    t++; return t; }
function Mh(e, t, n, o) { return t = Un(e, t, n), t < n && t++, t; }
function SA(e, t, n) { let o = -1, r = -1, i = -1, s = t, a = s; for (; s < n;) {
    let c = e.charCodeAt(s++);
    if (c === 59)
        return a;
    c === 34 || c === 39 ? a = s = Nh(e, c, s, n) : t === s - 4 && i === 85 && r === 82 && o === 76 && c === 40 ? a = s = Nh(e, 41, s, n) : c > 32 && (a = s), i = r, r = o, o = c & -33;
} return a; }
function Nh(e, t, n, o) { let r = -1, i = n; for (; i < o;) {
    let s = e.charCodeAt(i++);
    if (s == t && r !== 92)
        return i;
    s == 92 && r === 92 ? r = 0 : r = s;
} throw new Error; }
function Qd(e, t, n) { return cE(e, t, n, !1), Qd; }
function Zd(e, t) { return cE(e, t, null, !0), Zd; }
function sE(e) { lE(fE, bA, e, !1); }
function bA(e, t) { for (let n = NA(t); n >= 0; n = rE(t, n))
    fE(e, nE(t), TA(t)); }
function aE(e) { lE(PA, AA, e, !0); }
function AA(e, t) { for (let n = MA(t); n >= 0; n = oE(t, n))
    Io(e, nE(t), !0); }
function cE(e, t, n, o) { let r = g(), i = N(), s = qe(2); if (i.firstUpdatePass && dE(i, e, s, o), t !== L && U(r, s, t)) {
    let a = i.data[ie()];
    pE(i, a, r, r[C], e, r[s + 1] = HA(t, n), o, s);
} }
function lE(e, t, n, o) { let r = N(), i = qe(2); r.firstUpdatePass && dE(r, null, i, o); let s = g(); if (n !== L && U(s, i, n)) {
    let a = r.data[ie()];
    if (hE(a, o) && !uE(r, i)) {
        let c = o ? a.classesWithoutHost : a.stylesWithoutHost;
        c !== null && (n = zr(c, n || "")), Bl(r, a, s, n, o);
    }
    else
        FA(r, a, s, s[C], s[i + 1], s[i + 1] = LA(e, t, n), o, i);
} }
function uE(e, t) { return t >= e.expandoStartIndex; }
function dE(e, t, n, o) { let r = e.data; if (r[n + 1] === null) {
    let i = r[ie()], s = uE(e, n);
    hE(i, o) && t === null && !s && (t = !1), t = RA(r, i, t, o), EA(r, i, t, n, s, o);
} }
function RA(e, t, n, o) { let r = li(e), i = o ? t.residualClasses : t.residualStyles; if (r === null)
    (o ? t.classBindings : t.styleBindings) === 0 && (n = Hc(null, e, t, n, o), n = lr(n, t.attrs, o), i = null);
else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== r)
        if (n = Hc(r, e, t, n, o), i === null) {
            let c = kA(e, t, o);
            c !== void 0 && Array.isArray(c) && (c = Hc(null, e, t, c[1], o), c = lr(c, t.attrs, o), xA(e, t, o, c));
        }
        else
            i = OA(e, t, o);
} return i !== void 0 && (o ? t.residualClasses = i : t.residualStyles = i), n; }
function kA(e, t, n) { let o = n ? t.classBindings : t.styleBindings; if ($n(o) !== 0)
    return e[rn(o)]; }
function xA(e, t, n, o) { let r = n ? t.classBindings : t.styleBindings; e[rn(r)] = o; }
function OA(e, t, n) { let o, r = t.directiveEnd; for (let i = 1 + t.directiveStylingLast; i < r; i++) {
    let s = e[i].hostAttrs;
    o = lr(o, s, n);
} return lr(o, t.attrs, n); }
function Hc(e, t, n, o, r) { let i = null, s = n.directiveEnd, a = n.directiveStylingLast; for (a === -1 ? a = n.directiveStart : a++; a < s && (i = t[a], o = lr(o, i.hostAttrs, r), i !== e);)
    a++; return e !== null && (n.directiveStylingLast = a), o; }
function lr(e, t, n) { let o = n ? 1 : 2, r = -1; if (t !== null)
    for (let i = 0; i < t.length; i++) {
        let s = t[i];
        typeof s == "number" ? r = s : r === o && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), Io(e, s, n ? !0 : t[++i]));
    } return e === void 0 ? null : e; }
function LA(e, t, n) { if (n == null || n === "")
    return P; let o = [], r = lt(n); if (Array.isArray(r))
    for (let i = 0; i < r.length; i++)
        e(o, r[i], !0);
else if (r instanceof Set)
    for (let i of r)
        e(o, i, !0);
else if (typeof r == "object")
    for (let i in r)
        r.hasOwnProperty(i) && e(o, i, r[i]);
else
    typeof r == "string" && t(o, r); return o; }
function fE(e, t, n) { Io(e, t, lt(n)); }
function PA(e, t, n) { let o = String(t); o !== "" && !o.includes(" ") && Io(e, o, n); }
function FA(e, t, n, o, r, i, s, a) { r === L && (r = P); let c = 0, l = 0, u = 0 < r.length ? r[0] : null, d = 0 < i.length ? i[0] : null; for (; u !== null || d !== null;) {
    let f = c < r.length ? r[c + 1] : void 0, p = l < i.length ? i[l + 1] : void 0, h = null, y;
    u === d ? (c += 2, l += 2, f !== p && (h = d, y = p)) : d === null || u !== null && u < d ? (c += 2, h = u) : (l += 2, h = d, y = p), h !== null && pE(e, t, n, o, h, y, s, a), u = c < r.length ? r[c] : null, d = l < i.length ? i[l] : null;
} }
function pE(e, t, n, o, r, i, s, a) { if (!(t.type & 3))
    return; let c = e.data, l = c[a + 1], u = IA(l) ? wh(c, t, n, r, $n(l), s) : void 0; if (!ds(u)) {
    ds(i) || yA(l) && (i = wh(c, null, n, r, a, s));
    let d = Ft(ie(), n);
    YN(o, s, d, r, i);
} }
function wh(e, t, n, o, r, i) { let s = t === null, a; for (; r > 0;) {
    let c = e[r], l = Array.isArray(c), u = l ? c[1] : c, d = u === null, f = n[r + 1];
    f === L && (f = d ? P : void 0);
    let p = d ? Jr(f, o) : u === o ? f : void 0;
    if (l && !ds(p) && (p = Jr(c, o)), ds(p) && (a = p, s))
        return a;
    let h = e[r + 1];
    r = s ? rn(h) : $n(h);
} if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = Jr(c, o));
} return a; }
function ds(e) { return e !== void 0; }
function HA(e, t) { return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = Ur(lt(e)))), e; }
function hE(e, t) { return (e.flags & (t ? 8 : 16)) !== 0; }
function gE(e, t = "") { let n = g(), o = N(), r = e + I, i = o.firstCreatePass ? fn(o, r, 1, t, null) : o.data[r], s = mE(o, n, i, t); n[r] = s, bo() && Fu(o, n, s, i), We(i, !1); }
var mE = (e, t, n, o) => (Fe(!0), yu(t[C], o));
function jA(e, t, n, o) { let r = !Ss(t, n); if (Fe(r), r)
    return yu(t[C], o); let i = t[re]; return wr(i, e, t, n); }
function yE() { mE = jA; }
function vE(e, t) { let n = !1, o = Ge(); for (let i = 1; i < t.length; i += 2)
    n = U(e, o++, t[i]) || n; if (rc(o), !n)
    return L; let r = t[0]; for (let i = 1; i < t.length; i += 2)
    r += M(t[i]) + (i + 1 !== t.length ? t[i + 1] : ""); return r; }
function IE(e, t, n, o = "") { return U(e, fe(), n) ? t + M(n) + o : L; }
function EE(e, t, n, o, r, i = "") { let s = Ge(), a = tn(e, s, n, r); return qe(2), a ? t + M(n) + o + M(r) + i : L; }
function DE(e, t, n, o, r, i, s, a = "") { let c = Ge(), l = na(e, c, n, r, s); return qe(3), l ? t + M(n) + o + M(r) + i + M(s) + a : L; }
function CE(e, t, n, o, r, i, s, a, c, l = "") { let u = Ge(), d = Re(e, u, n, r, s, c); return qe(4), d ? t + M(n) + o + M(r) + i + M(s) + a + M(c) + l : L; }
function TE(e, t, n, o, r, i, s, a, c, l, u, d = "") { let f = Ge(), p = Re(e, f, n, r, s, c); return p = U(e, f + 4, u) || p, qe(5), p ? t + M(n) + o + M(r) + i + M(s) + a + M(c) + l + M(u) + d : L; }
function ME(e, t, n, o, r, i, s, a, c, l, u, d, f, p = "") { let h = Ge(), y = Re(e, h, n, r, s, c); return y = tn(e, h + 4, u, f) || y, qe(6), y ? t + M(n) + o + M(r) + i + M(s) + a + M(c) + l + M(u) + d + M(f) + p : L; }
function NE(e, t, n, o, r, i, s, a, c, l, u, d, f, p, h, y = "") { let v = Ge(), D = Re(e, v, n, r, s, c); return D = na(e, v + 4, u, f, h) || D, qe(7), D ? t + M(n) + o + M(r) + i + M(s) + a + M(c) + l + M(u) + d + M(f) + p + M(h) + y : L; }
function wE(e, t, n, o, r, i, s, a, c, l, u, d, f, p, h, y, v, D = "") { let S = Ge(), K = Re(e, S, n, r, s, c); return K = Re(e, S + 4, u, f, h, v) || K, qe(8), K ? t + M(n) + o + M(r) + i + M(s) + a + M(c) + l + M(u) + d + M(f) + p + M(h) + y + M(v) + D : L; }
function Yd(e) { return ga("", e), Yd; }
function ga(e, t, n) { let o = g(), r = IE(o, e, t, n); return r !== L && ft(o, ie(), r), ga; }
function Kd(e, t, n, o, r) { let i = g(), s = EE(i, e, t, n, o, r); return s !== L && ft(i, ie(), s), Kd; }
function Jd(e, t, n, o, r, i, s) { let a = g(), c = DE(a, e, t, n, o, r, i, s); return c !== L && ft(a, ie(), c), Jd; }
function Xd(e, t, n, o, r, i, s, a, c) { let l = g(), u = CE(l, e, t, n, o, r, i, s, a, c); return u !== L && ft(l, ie(), u), Xd; }
function ef(e, t, n, o, r, i, s, a, c, l, u) { let d = g(), f = TE(d, e, t, n, o, r, i, s, a, c, l, u); return f !== L && ft(d, ie(), f), ef; }
function tf(e, t, n, o, r, i, s, a, c, l, u, d, f) { let p = g(), h = ME(p, e, t, n, o, r, i, s, a, c, l, u, d, f); return h !== L && ft(p, ie(), h), tf; }
function nf(e, t, n, o, r, i, s, a, c, l, u, d, f, p, h) { let y = g(), v = NE(y, e, t, n, o, r, i, s, a, c, l, u, d, f, p, h); return v !== L && ft(y, ie(), v), nf; }
function of(e, t, n, o, r, i, s, a, c, l, u, d, f, p, h, y, v) { let D = g(), S = wE(D, e, t, n, o, r, i, s, a, c, l, u, d, f, p, h, y, v); return S !== L && ft(D, ie(), S), of; }
function rf(e) { let t = g(), n = vE(t, e); return n !== L && ft(t, ie(), n), rf; }
function ft(e, t, n) { let o = Ft(t, e); cm(e[C], o, n); }
function sf(e, t, n) { yd(t) && (t = t()); let o = g(), r = fe(); if (U(o, r, t)) {
    let i = N(), s = Ee();
    ju(s, o, e, t, o[C], n);
} return sf; }
function _E(e, t) { let n = yd(e); return n && e.set(t), n; }
function af(e, t) { let n = g(), o = N(), r = T(); return Ud(o, n, n[C], r, e, t), af; }
var SE = {};
function cf(e) { q("NgLet"); let t = N(), n = g(), o = e + I, r = fn(t, o, 128, null, null); return We(r, !1), No(t, n, o, SE), cf; }
function bE(e) { let t = N(), n = g(), o = ie(); return No(t, n, o, e), e; }
function AE(e) { let t = tc(), n = Et(t, I + e); if (n === SE)
    throw new w(314, !1); return n; }
function RE(e, t) { let n = N(), o = g(), r = o[C], i = "data-ng-source-location"; for (let [s, a, c, l] of t) {
    let u = Ht(n, s + I), d = Ft(s + I, o);
    if (!d.hasAttribute(i)) {
        let f = `${e}@o:${a},l:${c},c:${l}`;
        r.setAttribute(d, i, f);
    }
} }
function kE(e) { return U(g(), fe(), e) ? M(e) : L; }
function xE(e, t, n = "") { return IE(g(), e, t, n); }
function OE(e, t, n, o, r = "") { return EE(g(), e, t, n, o, r); }
function LE(e, t, n, o, r, i, s = "") { return DE(g(), e, t, n, o, r, i, s); }
function PE(e, t, n, o, r, i, s, a, c = "") { return CE(g(), e, t, n, o, r, i, s, a, c); }
function FE(e, t, n, o, r, i, s, a, c, l, u = "") { return TE(g(), e, t, n, o, r, i, s, a, c, l, u); }
function HE(e, t, n, o, r, i, s, a, c, l, u, d, f = "") { return ME(g(), e, t, n, o, r, i, s, a, c, l, u, d, f); }
function jE(e, t, n, o, r, i, s, a, c, l, u, d, f, p, h = "") { return NE(g(), e, t, n, o, r, i, s, a, c, l, u, d, f, p, h); }
function VE(e, t, n, o, r, i, s, a, c, l, u, d, f, p, h, y, v = "") { return wE(g(), e, t, n, o, r, i, s, a, c, l, u, d, f, p, h, y, v); }
function BE(e) { return vE(g(), e); }
function $E(e, t, n) { let o = ue() + e, r = g(); return r[o] === L ? je(r, o, t(n, r)) : so(r, o); }
function _h(e, t, n) { let o = N(); o.firstCreatePass && UE(t, o.data, o.blueprint, Se(e), n); }
function UE(e, t, n, o, r) { if (e = z(e), Array.isArray(e))
    for (let i = 0; i < e.length; i++)
        UE(e[i], t, n, o, r);
else {
    let i = N(), s = g(), a = T(), c = ei(e) ? e : z(e.provide), l = Hf(e), u = a.providerIndexes & 1048575, d = a.directiveStart, f = a.providerIndexes >> 20;
    if (ei(e) || !e.multi) {
        let p = new Yt(l, r, io, null), h = Vc(c, t, r ? u : u + f, d);
        h === -1 ? (Gc(Ui(a, s), i, c), jc(i, e, t.length), t.push(c), a.directiveStart++, a.directiveEnd++, r && (a.providerIndexes += 1048576), n.push(p), s.push(p)) : (n[h] = p, s[h] = p);
    }
    else {
        let p = Vc(c, t, u + f, d), h = Vc(c, t, u, u + f), y = p >= 0 && n[p], v = h >= 0 && n[h];
        if (r && !v || !r && !y) {
            Gc(Ui(a, s), i, c);
            let D = $A(r ? BA : VA, n.length, r, o, l, e);
            !r && v && (n[h].providerFactory = D), jc(i, e, t.length, 0), t.push(c), a.directiveStart++, a.directiveEnd++, r && (a.providerIndexes += 1048576), n.push(D), s.push(D);
        }
        else {
            let D = zE(n[r ? h : p], l, !r && o);
            jc(i, e, p > -1 ? p : h, D);
        }
        !r && o && v && n[h].componentProviders++;
    }
} }
function jc(e, t, n, o) { let r = ei(t), i = Pf(t); if (r || i) {
    let c = (i ? z(t.useClass) : t).prototype.ngOnDestroy;
    if (c) {
        let l = e.destroyHooks || (e.destroyHooks = []);
        if (!r && t.multi) {
            let u = l.indexOf(n);
            u === -1 ? l.push(n, [o, c]) : l[u + 1].push(o, c);
        }
        else
            l.push(n, c);
    }
} }
function zE(e, t, n) { return n && e.componentProviders++, e.multi.push(t) - 1; }
function Vc(e, t, n, o) { for (let r = n; r < o; r++)
    if (t[r] === e)
        return r; return -1; }
function VA(e, t, n, o, r) { return Wl(this.multi, []); }
function BA(e, t, n, o, r) { let i = this.multi, s; if (this.providerFactory) {
    let a = this.providerFactory.componentProviders, c = Go(o, o[m], this.providerFactory.index, r);
    s = c.slice(0, a), Wl(i, s);
    for (let l = a; l < c.length; l++)
        s.push(c[l]);
}
else
    s = [], Wl(i, s); return s; }
function Wl(e, t) { for (let n = 0; n < e.length; n++) {
    let o = e[n];
    t.push(o());
} return t; }
function $A(e, t, n, o, r, i) { let s = new Yt(e, n, io, null); return s.multi = [], s.index = t, s.componentProviders = 0, zE(s, r, o && !n), s; }
function WE(e, t) { return n => { n.providersResolver = (o, r) => _h(o, r ? r(e) : e, !1), t && (n.viewProvidersResolver = (o, r) => _h(o, r ? r(t) : t, !0)); }; }
function GE(e) { return t => { e.length < 1 || (t.getExternalStyles = n => e.map(r => r + "?ngcomp" + (n ? "=" + encodeURIComponent(n) : "") + "&e=" + t.encapsulation)); }; }
function qE(e, t, n) { let o = e.\u0275cmp; o.directiveDefs = is(t, gv), o.pipeDefs = is(n, Ve); }
function QE(e, t) { return Ze(() => { let n = Zr(e); n.declarations = _i(t.declarations || P), n.imports = _i(t.imports || P), n.exports = _i(t.exports || P), t.bootstrap && (n.bootstrap = _i(t.bootstrap)), Pn.registerNgModule(e, t); }); }
function _i(e) { if (typeof e == "function")
    return e; let t = Le(e); return t.some(Wr) ? () => t.map(z).map(Sh) : t.map(Sh); }
function Sh(e) { return Qu(e) ? e.ngModule : e; }
function ZE(e, t) { let n = ue() + e, o = g(); return o[n] === L ? je(o, n, t()) : so(o, n); }
function YE(e, t, n) { return iD(g(), ue(), e, t, n); }
function KE(e, t, n, o) { return sD(g(), ue(), e, t, n, o); }
function JE(e, t, n, o, r) { return aD(g(), ue(), e, t, n, o, r); }
function XE(e, t, n, o, r, i, s) { return cD(g(), ue(), e, t, n, o, r, i); }
function eD(e, t, n, o, r, i, s) { let a = ue() + e, c = g(), l = Re(c, a, n, o, r, i); return U(c, a + 4, s) || l ? je(c, a + 5, t(n, o, r, i, s)) : so(c, a + 5); }
function tD(e, t, n, o, r, i, s, a) { let c = ue() + e, l = g(), u = Re(l, c, n, o, r, i); return tn(l, c + 4, s, a) || u ? je(l, c + 6, t(n, o, r, i, s, a)) : so(l, c + 6); }
function nD(e, t, n, o, r, i, s, a, c) { let l = ue() + e, u = g(), d = Re(u, l, n, o, r, i); return na(u, l + 4, s, a, c) || d ? je(u, l + 7, t(n, o, r, i, s, a, c)) : so(u, l + 7); }
function oD(e, t, n, o, r, i, s, a, c, l) { let u = ue() + e, d = g(), f = Re(d, u, n, o, r, i); return Re(d, u + 4, s, a, c, l) || f ? je(d, u + 8, t(n, o, r, i, s, a, c, l)) : so(d, u + 8); }
function rD(e, t, n) { return lD(g(), ue(), e, t, n); }
function Or(e, t) { let n = e[t]; return n === L ? void 0 : n; }
function iD(e, t, n, o, r, i) { let s = t + n; return U(e, s, r) ? je(e, s + 1, i ? o.call(i, r) : o(r)) : Or(e, s + 1); }
function sD(e, t, n, o, r, i, s) { let a = t + n; return tn(e, a, r, i) ? je(e, a + 2, s ? o.call(s, r, i) : o(r, i)) : Or(e, a + 2); }
function aD(e, t, n, o, r, i, s, a) { let c = t + n; return na(e, c, r, i, s) ? je(e, c + 3, a ? o.call(a, r, i, s) : o(r, i, s)) : Or(e, c + 3); }
function cD(e, t, n, o, r, i, s, a, c) { let l = t + n; return Re(e, l, r, i, s, a) ? je(e, l + 4, c ? o.call(c, r, i, s, a) : o(r, i, s, a)) : Or(e, l + 4); }
function lD(e, t, n, o, r, i) { let s = t + n, a = !1; for (let c = 0; c < r.length; c++)
    U(e, s++, r[c]) && (a = !0); return a ? je(e, s, o.apply(i, r)) : Or(e, s); }
function uD(e, t) { let n = N(), o, r = e + I; n.firstCreatePass ? (o = UA(t, n.pipeRegistry), n.data[r] = o, o.onDestroy && (n.destroyHooks ??= []).push(r, o.onDestroy)) : o = n.data[r]; let i = o.factory || (o.factory = Kr(o.type, !0)), s, a = xt(io); try {
    let c = $i(!1), l = i();
    return $i(c), No(n, g(), r, l), l;
}
finally {
    xt(a);
} }
function UA(e, t) { if (t)
    for (let n = t.length - 1; n >= 0; n--) {
        let o = t[n];
        if (e === o.name)
            return o;
    } }
function dD(e, t, n) { let o = e + I, r = g(), i = Et(r, o); return Lr(r, o) ? iD(r, ue(), t, i.transform, n, i) : i.transform(n); }
function fD(e, t, n, o) { let r = e + I, i = g(), s = Et(i, r); return Lr(i, r) ? sD(i, ue(), t, s.transform, n, o, s) : s.transform(n, o); }
function pD(e, t, n, o, r) { let i = e + I, s = g(), a = Et(s, i); return Lr(s, i) ? aD(s, ue(), t, a.transform, n, o, r, a) : a.transform(n, o, r); }
function hD(e, t, n, o, r, i) { let s = e + I, a = g(), c = Et(a, s); return Lr(a, s) ? cD(a, ue(), t, c.transform, n, o, r, i, c) : c.transform(n, o, r, i); }
function gD(e, t, n) { let o = e + I, r = g(), i = Et(r, o); return Lr(r, o) ? lD(r, ue(), t, i.transform, n, i) : i.transform.apply(i, n); }
function Lr(e, t) { return e[m].data[t].pure; }
function mD(e, t) { return Qs(e, t); }
function yD(e, t) { return () => { try {
    return Pn.getComponentDependencies(e, t).dependencies;
}
catch (n) {
    throw console.error(`Computing dependencies in local compilation mode for the component "${e.name}" failed with the exception:`, n), n;
} }; }
function vD(e, t) { let n = W(e); n !== null && (n.debugInfo = t); }
function ID(e, t, n) { let o = `./@ng/component?c=${e}&t=${encodeURIComponent(t)}`; return new URL(o, n).href; }
function ED(e, t, n, o, r = null, i = null) { let s = W(e); t.apply(null, [e, n, ...o]); let { newDef: a, oldDef: c } = zA(s, W(e)); if (e[pn] = a, c.tView) {
    let l = PT().values();
    for (let u of l)
        ze(u) && u[G] === null && Fi(r, i, a, c, u);
} }
function zA(e, t) { let n = Z({}, e); return { newDef: Object.assign(e, t, { directiveDefs: n.directiveDefs, pipeDefs: n.pipeDefs, setInput: n.setInput, type: n.type }), oldDef: n }; }
function Fi(e, t, n, o, r) { let i = r[m]; if (i === o.tView) {
    GA(e, t, n, o, r);
    return;
} for (let s = I; s < i.bindingStartIndex; s++) {
    let a = r[s];
    if (J(a)) {
        te(a[j]) && Fi(e, t, n, o, a[j]);
        for (let c = H; c < a.length; c++)
            Fi(e, t, n, o, a[c]);
    }
    else
        te(a) && Fi(e, t, n, o, a);
} }
function WA(e, t) { e.componentReplaced?.(t.id); }
function GA(e, t, n, o, r) { let i = r[F], s = r[j], a = r[G], c = r[ce], l = r[k].get(B, null), u = () => { if (o.encapsulation === Ae.ShadowDom || o.encapsulation === Ae.ExperimentalIsolatedShadowDom) {
    let h = s.cloneNode(!1);
    s.replaceWith(h), s = h;
} let d = Tm(n), f = Rs(a, d, i, Nu(n), s, c, null, null, null, null, null); qA(a, r, f, c.index), Mr(r[m], r), er(r); let p = r[Be].rendererFactory; WA(p, o), f[C] = p.createRenderer(s, n), Lm(r[m], r), QA(c), Gs(d, f, i), ey(d, f, d.template, i); }; l === null ? bh(e, t, u) : l.run(() => bh(e, t, u)); }
function bh(e, t, n) {
    try {
        n();
    }
    catch (o) {
        let r = o;
        if (t !== null && r.message) {
            let i = r.message + (r.stack ? `
` + r.stack : "");
            e?.hot?.send?.("angular:invalidate", { id: t, message: i, error: !0 });
        }
        throw o;
    }
}
function qA(e, t, n, o) { for (let r = I; r < e[m].bindingStartIndex; r++) {
    let i = e[r];
    if ((te(i) || J(i)) && i[ae] === t) {
        i[ae] = n;
        break;
    }
} e[yt] === t && (e[yt] = n), e[Eo] === t && (e[Eo] = n), n[ae] = t[ae], t[ae] = null, e[o] = n; }
function QA(e) { if (e.projection !== null) {
    for (let t of e.projection)
        ps(t) && (t.projectionNext = null, t.flags &= -3);
    e.projection = null;
} }
var pe = { \u0275\u0275animateEnter: jo, \u0275\u0275animateEnterListener: Vo, \u0275\u0275animateLeave: Bo, \u0275\u0275animateLeaveListener: ss, \u0275\u0275attribute: Nd, \u0275\u0275defineComponent: hv, \u0275\u0275defineDirective: mv, \u0275\u0275defineInjectable: V, \u0275\u0275defineInjector: go, \u0275\u0275defineNgModule: ld, \u0275\u0275definePipe: yv, \u0275\u0275directiveInject: io, \u0275\u0275getInheritedFactory: ig, \u0275\u0275inject: Oe, \u0275\u0275injectAttribute: hs, \u0275\u0275invalidFactory: Oy, \u0275\u0275invalidFactoryDep: Yr, \u0275\u0275templateRefExtractor: mD, \u0275\u0275resetView: Ja, \u0275\u0275HostDirectivesFeature: Dv, \u0275\u0275NgOnChangesFeature: Uh, \u0275\u0275ControlFeature: Ev, \u0275\u0275ProvidersFeature: WE, \u0275\u0275InheritDefinitionFeature: ud, \u0275\u0275ExternalStylesFeature: GE, \u0275\u0275nextContext: ZI, \u0275\u0275namespaceHTML: dc, \u0275\u0275namespaceMathML: uc, \u0275\u0275namespaceSVG: lc, \u0275\u0275enableBindings: Qa, \u0275\u0275disableBindings: Za, \u0275\u0275elementStart: ar, \u0275\u0275elementEnd: ua, \u0275\u0275element: _d, \u0275\u0275elementContainerStart: pa, \u0275\u0275elementContainerEnd: kr, \u0275\u0275domElement: Sd, \u0275\u0275domElementStart: da, \u0275\u0275domElementEnd: fa, \u0275\u0275domElementContainer: kd, \u0275\u0275domElementContainerStart: ha, \u0275\u0275domElementContainerEnd: Rd, \u0275\u0275domTemplate: fd, \u0275\u0275domListener: $d, \u0275\u0275elementContainer: Ad, \u0275\u0275pureFunction0: ZE, \u0275\u0275pureFunction1: YE, \u0275\u0275pureFunction2: KE, \u0275\u0275pureFunction3: JE, \u0275\u0275pureFunction4: XE, \u0275\u0275pureFunction5: eD, \u0275\u0275pureFunction6: tD, \u0275\u0275pureFunction7: nD, \u0275\u0275pureFunction8: oD, \u0275\u0275pureFunctionV: rD, \u0275\u0275getCurrentView: SI, \u0275\u0275restoreView: Ka, \u0275\u0275listener: Vd, \u0275\u0275projection: KI, \u0275\u0275syntheticHostProperty: Ld, \u0275\u0275syntheticHostListener: Bd, \u0275\u0275pipeBind1: dD, \u0275\u0275pipeBind2: fD, \u0275\u0275pipeBind3: pD, \u0275\u0275pipeBind4: hD, \u0275\u0275pipeBindV: gD, \u0275\u0275projectionDef: YI, \u0275\u0275domProperty: Od, \u0275\u0275ariaProperty: Md, \u0275\u0275property: wd, \u0275\u0275control: Uy, \u0275\u0275controlCreate: By, \u0275\u0275pipe: uD, \u0275\u0275queryRefresh: JI, \u0275\u0275queryAdvance: eE, \u0275\u0275viewQuery: Wd, \u0275\u0275viewQuerySignal: qd, \u0275\u0275loadQuery: XI, \u0275\u0275contentQuery: zd, \u0275\u0275contentQuerySignal: Gd, \u0275\u0275reference: tE, \u0275\u0275classMap: aE, \u0275\u0275styleMap: sE, \u0275\u0275styleProp: Qd, \u0275\u0275classProp: Zd, \u0275\u0275advance: Mm, \u0275\u0275template: dd, \u0275\u0275conditional: DI, \u0275\u0275conditionalCreate: EI, \u0275\u0275conditionalBranchCreate: la, \u0275\u0275defer: Yv, \u0275\u0275deferWhen: Kv, \u0275\u0275deferOnIdle: tI, \u0275\u0275deferOnImmediate: rI, \u0275\u0275deferOnTimer: aI, \u0275\u0275deferOnHover: uI, \u0275\u0275deferOnInteraction: pI, \u0275\u0275deferOnViewport: mI, \u0275\u0275deferPrefetchWhen: Jv, \u0275\u0275deferPrefetchOnIdle: nI, \u0275\u0275deferPrefetchOnImmediate: iI, \u0275\u0275deferPrefetchOnTimer: cI, \u0275\u0275deferPrefetchOnHover: dI, \u0275\u0275deferPrefetchOnInteraction: hI, \u0275\u0275deferPrefetchOnViewport: yI, \u0275\u0275deferHydrateWhen: Xv, \u0275\u0275deferHydrateNever: eI, \u0275\u0275deferHydrateOnIdle: oI, \u0275\u0275deferHydrateOnImmediate: sI, \u0275\u0275deferHydrateOnTimer: lI, \u0275\u0275deferHydrateOnHover: fI, \u0275\u0275deferHydrateOnInteraction: gI, \u0275\u0275deferHydrateOnViewport: vI, \u0275\u0275deferEnableTimerScheduling: Pv, \u0275\u0275repeater: NI, \u0275\u0275repeaterCreate: MI, \u0275\u0275repeaterTrackByIndex: CI, \u0275\u0275repeaterTrackByIdentity: TI, \u0275\u0275componentInstance: II, \u0275\u0275text: gE, \u0275\u0275textInterpolate: Yd, \u0275\u0275textInterpolate1: ga, \u0275\u0275textInterpolate2: Kd, \u0275\u0275textInterpolate3: Jd, \u0275\u0275textInterpolate4: Xd, \u0275\u0275textInterpolate5: ef, \u0275\u0275textInterpolate6: tf, \u0275\u0275textInterpolate7: nf, \u0275\u0275textInterpolate8: of, \u0275\u0275textInterpolateV: rf, \u0275\u0275i18n: WI, \u0275\u0275i18nAttributes: GI, \u0275\u0275i18nExp: jd, \u0275\u0275i18nStart: Fd, \u0275\u0275i18nEnd: Hd, \u0275\u0275i18nApply: qI, \u0275\u0275i18nPostprocess: QI, \u0275\u0275resolveWindow: Im, \u0275\u0275resolveDocument: Em, \u0275\u0275resolveBody: Cu, \u0275\u0275setComponentScope: qE, \u0275\u0275setNgModuleScope: QE, \u0275\u0275registerNgModuleType: sd, \u0275\u0275getComponentDepsFactory: yD, \u0275setClassDebugInfo: vD, \u0275\u0275declareLet: cf, \u0275\u0275storeLet: bE, \u0275\u0275arrowFunction: $E, \u0275\u0275readContextLet: AE, \u0275\u0275attachSourceLocations: RE, \u0275\u0275interpolate: kE, \u0275\u0275interpolate1: xE, \u0275\u0275interpolate2: OE, \u0275\u0275interpolate3: LE, \u0275\u0275interpolate4: PE, \u0275\u0275interpolate5: FE, \u0275\u0275interpolate6: HE, \u0275\u0275interpolate7: jE, \u0275\u0275interpolate8: VE, \u0275\u0275interpolateV: BE, \u0275\u0275sanitizeHtml: fm, \u0275\u0275sanitizeStyle: pm, \u0275\u0275sanitizeResourceUrl: Eu, \u0275\u0275sanitizeScript: hm, \u0275\u0275validateAttribute: Du, \u0275\u0275sanitizeUrl: Iu, \u0275\u0275sanitizeUrlOrResourceUrl: ym, \u0275\u0275trustConstantHtml: gm, \u0275\u0275trustConstantResourceUrl: mm, forwardRef: Ra, resolveForwardRef: z, \u0275\u0275twoWayProperty: sf, \u0275\u0275twoWayBindingSet: _E, \u0275\u0275twoWayListener: af, \u0275\u0275replaceMetadata: ED, \u0275\u0275getReplaceMetadataURL: ID }, wn = null;
function DD(e) { wn !== null && (e.defaultEncapsulation !== wn.defaultEncapsulation || e.preserveWhitespaces !== wn.preserveWhitespaces) || (wn = e); }
function ZA() { return wn; }
function YA() { wn = null; }
var Wo = [];
function KA(e, t) { Wo.push({ moduleType: e, ngModule: t }); }
var Bc = !1;
function CD() { if (!Bc) {
    Bc = !0;
    try {
        for (let e = Wo.length - 1; e >= 0; e--) {
            let { moduleType: t, ngModule: n } = Wo[e];
            n.declarations && n.declarations.every(TD) && (Wo.splice(e, 1), nR(t, n));
        }
    }
    finally {
        Bc = !1;
    }
} }
function TD(e) { return Array.isArray(e) ? e.every(TD) : !!z(e); }
function MD(e, t = {}) { ND(e, t), t.id !== void 0 && sd(e, t.id), KA(e, t); }
function ND(e, t, n = !1) { let o = Le(t.declarations || P), r = null; Object.defineProperty(e, xa, { configurable: !0, get: () => (r === null && (r = ee({ usage: 0, kind: "NgModule", type: e }).compileNgModule(pe, `ng:///${e.name}/\u0275mod.js`, { type: e, bootstrap: Le(t.bootstrap || P).map(z), declarations: o.map(z), imports: Le(t.imports || P).map(z).map(Ah), exports: Le(t.exports || P).map(z).map(Ah), schemas: t.schemas ? Le(t.schemas) : null, id: t.id || null }), r.schemas || (r.schemas = [])), r) }); let i = null; Object.defineProperty(e, ht, { get: () => { if (i === null) {
        let a = ee({ usage: 0, kind: "NgModule", type: e });
        i = a.compileFactory(pe, `ng:///${e.name}/\u0275fac.js`, { name: e.name, type: e, deps: gs(e), target: a.FactoryTarget.NgModule, typeArgumentCount: 0 });
    } return i; }, configurable: !1 }); let s = null; Object.defineProperty(e, ka, { get: () => { if (s === null) {
        let a = { name: e.name, type: e, providers: t.providers || P, imports: [(t.imports || P).map(z), (t.exports || P).map(z)] };
        s = ee({ usage: 0, kind: "NgModule", type: e }).compileInjector(pe, `ng:///${e.name}/\u0275inj.js`, a);
    } return s; }, configurable: !1 }); }
function JA(e, t) { let n = `Unexpected "${Me(e)}" found in the "declarations" array of the`, o = `"${Me(e)}" is marked as standalone and can't be declared in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?`; return `${n} ${t}, ${o}`; }
var XA = new WeakMap, eR = new WeakMap;
function tR() { XA = new WeakMap, eR = new WeakMap, Wo.length = 0, IS.clear(); }
function nR(e, t) { let n = Le(t.declarations || P), o = uf(e); n.forEach(r => { if (r = z(r), r.hasOwnProperty(pn)) {
    let s = W(r);
    lf(s, o);
}
else
    !r.hasOwnProperty(qr) && !r.hasOwnProperty(Qr) && (r.ngSelectorScope = e); }); }
function lf(e, t) { e.directiveDefs = () => Array.from(t.compilation.directives).map(n => n.hasOwnProperty(pn) ? W(n) : Te(n)).filter(n => !!n), e.pipeDefs = () => Array.from(t.compilation.pipes).map(n => Ve(n)), e.schemas = t.schemas, e.tView = null; }
function uf(e) { if (Wt(e)) {
    let t = Pn.getNgModuleScope(e), n = Zr(e);
    return Z({ schemas: n.schemas || null }, t);
}
else if (mo(e)) {
    if ((W(e) || Te(e)) !== null)
        return { schemas: null, compilation: { directives: new Set, pipes: new Set }, exported: { directives: new Set([e]), pipes: new Set } };
    if (Ve(e) !== null)
        return { schemas: null, compilation: { directives: new Set, pipes: new Set }, exported: { directives: new Set, pipes: new Set([e]) } };
} throw new Error(`${e.name} does not have a module def (\u0275mod property)`); }
function Ah(e) { return Qu(e) ? e.ngModule : e; }
var $c = 0;
function wD(e, t) {
    let n = null;
    cS(e, t), SD(e, t), Object.defineProperty(e, pn, { get: () => {
            if (n === null) {
                let o = ee({ usage: 0, kind: "component", type: e });
                if (cv(t)) {
                    let u = [`Component '${e.name}' is not resolved:`];
                    throw t.templateUrl && u.push(` - templateUrl: ${t.templateUrl}`), t.styleUrls && t.styleUrls.length && u.push(` - styleUrls: ${JSON.stringify(t.styleUrls)}`), t.styleUrl && u.push(` - styleUrl: ${t.styleUrl}`), u.push("Did you run and wait for 'resolveComponentResources()'?"), new Error(u.join(`
`));
                }
                let r = ZA(), i = t.preserveWhitespaces;
                i === void 0 && (r !== null && r.preserveWhitespaces !== void 0 ? i = r.preserveWhitespaces : i = !1);
                let s = t.encapsulation;
                s === void 0 && (r !== null && r.defaultEncapsulation !== void 0 ? s = r.defaultEncapsulation : s = Ae.Emulated);
                let a = t.templateUrl || `ng:///${e.name}/template.html`, c = bD(e, t), l = Je(Z({}, c), { typeSourceSpan: o.createParseSourceSpan("Component", e.name, a), template: t.template || "", preserveWhitespaces: i, styles: typeof t.styles == "string" ? [t.styles] : t.styles || P, animations: t.animations, declarations: [], changeDetection: t.changeDetection, encapsulation: s, viewProviders: t.viewProviders || null, hasDirectiveDependencies: !c.isStandalone || t.imports != null && t.imports.length > 0 });
                $c++;
                try {
                    if (l.usesInheritance && AD(e), n = o.compileComponent(pe, a, l), l.isStandalone) {
                        let u = Le(t.imports || P), { directiveDefs: d, pipeDefs: f } = oR(e, u);
                        n.directiveDefs = d, n.pipeDefs = f, n.dependencies = () => u.map(z);
                    }
                }
                finally {
                    $c--;
                }
                if ($c === 0 && CD(), rR(e)) {
                    let u = uf(e.ngSelectorScope);
                    lf(n, u);
                }
                if (t.schemas)
                    if (l.isStandalone)
                        n.schemas = t.schemas;
                    else
                        throw new Error(`The 'schemas' was specified for the ${Me(e)} but is only valid on a component that is standalone.`);
                else
                    l.isStandalone && (n.schemas = []);
            }
            return n;
        }, set: o => { n = o; }, configurable: !1 });
}
function oR(e, t) { return { directiveDefs: () => Fo(e) ? [...Pn.getStandaloneComponentScope(e, t).compilation.directives].map(i => W(i) || Te(i)).filter(i => i !== null) : [], pipeDefs: () => Fo(e) ? [...Pn.getStandaloneComponentScope(e, t).compilation.pipes].map(i => Ve(i)).filter(i => i !== null) : [] }; }
function rR(e) { return e.ngSelectorScope !== void 0; }
function df(e, t) { let n = null; SD(e, t || {}), Object.defineProperty(e, qr, { get: () => { if (n === null) {
        let o = _D(e, t || {});
        n = ee({ usage: 0, kind: "directive", type: e }).compileDirective(pe, o.sourceMapUrl, o.metadata);
    } return n; }, configurable: !1 }); }
function _D(e, t) { let n = e && e.name, o = `ng:///${n}/\u0275dir.js`, r = ee({ usage: 0, kind: "directive", type: e }), i = bD(e, t); return i.typeSourceSpan = r.createParseSourceSpan("Directive", n, o), i.usesInheritance && AD(e), { metadata: i, sourceMapUrl: o }; }
function SD(e, t) { let n = null; Object.defineProperty(e, ht, { get: () => { if (n === null) {
        let o = _D(e, t), r = ee({ usage: 0, kind: "directive", type: e });
        n = r.compileFactory(pe, `ng:///${e.name}/\u0275fac.js`, { name: o.metadata.name, type: o.metadata.type, typeArgumentCount: 0, deps: gs(e), target: r.FactoryTarget.Directive });
    } return n; }, configurable: !1 }); }
function iR(e) { return Object.getPrototypeOf(e.prototype) === Object.prototype; }
function bD(e, t) { let n = Yl(), o = n.ownPropMetadata(e); return { name: e.name, type: e, selector: t.selector !== void 0 ? t.selector : null, host: t.host || Ne, propMetadata: o, inputs: t.inputs || P, outputs: t.outputs || P, queries: Rh(e, o, RD), lifecycle: { usesOnChanges: n.hasLifecycleHook(e, "ngOnChanges") }, controlCreate: null, typeSourceSpan: null, usesInheritance: !iR(e), exportAs: cR(t.exportAs), providers: t.providers || null, viewQueries: Rh(e, o, kD), isStandalone: t.standalone === void 0 ? !0 : !!t.standalone, isSignal: !!t.signals, hostDirectives: t.hostDirectives?.map(r => typeof r == "function" ? { directive: r } : r) || null }; }
function AD(e) { let t = Object.prototype, n = Object.getPrototypeOf(e.prototype).constructor; for (; n && n !== t;)
    !Te(n) && !W(n) && uR(n) && df(n, null), n = Object.getPrototypeOf(n); }
function sR(e) { return typeof e == "string" ? OD(e) : z(e); }
function aR(e, t) { return { propertyName: e, predicate: sR(t.selector), descendants: t.descendants, first: t.first, read: t.read ? t.read : null, static: !!t.static, emitDistinctChangesOnly: !!t.emitDistinctChangesOnly, isSignal: !!t.isSignal }; }
function Rh(e, t, n) { let o = [], r = []; for (let i in t)
    if (t.hasOwnProperty(i)) {
        let s = t[i];
        s.forEach(a => { if (n(a)) {
            if (!a.selector)
                throw new Error(`Can't construct a query for the property "${i}" of "${Me(e)}" since the query selector wasn't defined.`);
            if (s.some(xD))
                throw new Error("Cannot combine @Input decorators with query decorators");
            let c = aR(i, a);
            c.isSignal ? o.push(c) : r.push(c);
        } });
    } return [...o, ...r]; }
function cR(e) { return e === void 0 ? null : OD(e); }
function RD(e) { let t = e.ngMetadataName; return t === "ContentChild" || t === "ContentChildren"; }
function kD(e) { let t = e.ngMetadataName; return t === "ViewChild" || t === "ViewChildren"; }
function xD(e) { return e.ngMetadataName === "Input"; }
function OD(e) { return e.split(",").map(t => t.trim()); }
var lR = ["ngOnChanges", "ngOnInit", "ngOnDestroy", "ngDoCheck", "ngAfterViewInit", "ngAfterViewChecked", "ngAfterContentInit", "ngAfterContentChecked"];
function uR(e) { let t = Yl(); if (lR.some(o => t.hasLifecycleHook(e, o)))
    return !0; let n = t.propMetadata(e); for (let o in n) {
    let r = n[o];
    for (let i = 0; i < r.length; i++) {
        let s = r[i], a = s.ngMetadataName;
        if (xD(s) || RD(s) || kD(s) || a === "Output" || a === "HostBinding" || a === "HostListener")
            return !0;
    }
} return !1; }
function LD(e, t) { let n = null, o = null; Object.defineProperty(e, ht, { get: () => { if (o === null) {
        let r = kh(e, t), i = ee({ usage: 0, kind: "pipe", type: r.type });
        o = i.compileFactory(pe, `ng:///${r.name}/\u0275fac.js`, { name: r.name, type: r.type, typeArgumentCount: 0, deps: gs(e), target: i.FactoryTarget.Pipe });
    } return o; }, configurable: !1 }), Object.defineProperty(e, Qr, { get: () => { if (n === null) {
        let r = kh(e, t);
        n = ee({ usage: 0, kind: "pipe", type: r.type }).compilePipe(pe, `ng:///${r.name}/\u0275pipe.js`, r);
    } return n; }, configurable: !1 }); }
function kh(e, t) { return { type: e, name: e.name, pipeName: t.name, pure: t.pure !== void 0 ? t.pure : !0, isStandalone: t.standalone === void 0 ? !0 : !!t.standalone }; }
var PD = fr("Directive", (e = {}) => e, void 0, void 0, (e, t) => df(e, t)), dR = fr("Component", (e = {}) => Z({ changeDetection: ms.Eager }, e), PD, void 0, (e, t) => wD(e, t)), fR = fr("Pipe", e => Z({ pure: !0 }, e), void 0, void 0, (e, t) => LD(e, t)), pR = st("Input", e => e ? typeof e == "string" ? { alias: e } : e : {}), hR = st("Output", e => ({ alias: e })), gR = st("HostBinding", e => ({ hostPropertyName: e })), mR = st("HostListener", (e, t) => ({ eventName: e, args: t })), yR = fr("NgModule", e => e, void 0, void 0, (e, t) => MD(e, t)), fs = class {
    ngModuleFactory;
    componentFactories;
    constructor(t, n) { this.ngModuleFactory = t, this.componentFactories = n; }
}, vR = (() => { class e {
    compileModuleSync(n) { return new Vn(n); }
    compileModuleAsync(n) { return Promise.resolve(this.compileModuleSync(n)); }
    compileModuleAndAllComponentsSync(n) { let o = this.compileModuleSync(n), r = hn(n), i = Mn(r.declarations).reduce((s, a) => { let c = W(a); return c && s.push(new bt(c)), s; }, []); return new fs(o, i); }
    compileModuleAndAllComponentsAsync(n) { return Promise.resolve(this.compileModuleAndAllComponentsSync(n)); }
    clearCache() { }
    clearCacheFor(n) { }
    getModuleId(n) { }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), FD = new _(""), Gl = class {
};
var HD = (() => { class e {
    applicationErrorHandler = E($t);
    appRef = E(ke);
    taskService = E(Bt);
    ngZone = E(B);
    zonelessEnabled = E(In);
    tracing = E(dn, { optional: !0 });
    zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
    subscriptions = new JC;
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(fc) : null;
    scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (E(gi, { optional: !0 }) ?? !1);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = !1;
    runningTick = !1;
    pendingRenderTaskId = null;
    constructor() { this.subscriptions.add(this.appRef.afterTick.subscribe(() => { let n = this.taskService.add(); if (!this.runningTick && (this.cleanup(), !this.zonelessEnabled || this.appRef.includeAllTestViews)) {
        this.taskService.remove(n);
        return;
    } this.switchToMicrotaskScheduler(), this.taskService.remove(n); })), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => { this.runningTick || this.cleanup(); })); }
    switchToMicrotaskScheduler() { this.ngZone.runOutsideAngular(() => { let n = this.taskService.add(); this.useMicrotaskScheduler = !0, queueMicrotask(() => { this.useMicrotaskScheduler = !1, this.taskService.remove(n); }); }); }
    notify(n) { if (!this.zonelessEnabled && n === 5)
        return; switch (n) {
        case 0: {
            this.appRef.dirtyFlags |= 2;
            break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
            this.appRef.dirtyFlags |= 4;
            break;
        }
        case 6: {
            this.appRef.dirtyFlags |= 2;
            break;
        }
        case 12: {
            this.appRef.dirtyFlags |= 16;
            break;
        }
        case 13: {
            this.appRef.dirtyFlags |= 2;
            break;
        }
        case 11: break;
        default: this.appRef.dirtyFlags |= 8;
    } if (this.appRef.tracingSnapshot = this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null, !this.shouldScheduleTick())
        return; let o = this.useMicrotaskScheduler ? lp : cp; this.pendingRenderTaskId = this.taskService.add(), this.scheduleInRootZone ? this.cancelScheduledCallback = Zone.root.run(() => o(() => this.tick())) : this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => o(() => this.tick())); }
    shouldScheduleTick() { return !(this.appRef.destroyed || this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(fc + this.angularZoneId)); }
    tick() { if (this.runningTick || this.appRef.destroyed)
        return; if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
    } !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1); let n = this.taskService.add(); try {
        this.ngZone.run(() => { this.runningTick = !0, this.appRef._tick(); }, void 0, this.schedulerTickApplyArgs);
    }
    catch (o) {
        this.applicationErrorHandler(o);
    }
    finally {
        this.taskService.remove(n), this.cleanup();
    } }
    ngOnDestroy() { this.subscriptions.unsubscribe(), this.cleanup(); }
    cleanup() { if (this.runningTick = !1, this.cancelScheduledCallback?.(), this.cancelScheduledCallback = null, this.pendingRenderTaskId !== null) {
        let n = this.pendingRenderTaskId;
        this.pendingRenderTaskId = null, this.taskService.remove(n);
    } }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })();
function IR() { return q("NgZoneless"), et([...ma(), []]); }
function ma() { return [{ provide: Ct, useExisting: HD }, { provide: B, useClass: pc }, { provide: In, useValue: !0 }]; }
function ER() { return typeof ngI18nClosureMode < "u" && ngI18nClosureMode && typeof goog < "u" && goog.LOCALE !== "en" ? goog.LOCALE : typeof $localize < "u" && $localize.locale || xr; }
var ff = new _("", { factory: () => E(ff, { optional: !0, skipSelf: !0 }) || ER() }), DR = new _("", { factory: () => Pb }), CR = new _(""), TR = new _(""), jD = (function (e) { return e[e.Error = 0] = "Error", e[e.Warning = 1] = "Warning", e[e.Ignore = 2] = "Ignore", e; })(jD || {}), ql = class {
    name;
    callback;
    constructor(t, n) { this.name = t, this.callback = n; }
};
function MR(e) { return e.map(t => t.nativeElement); }
var ur = class {
    nativeNode;
    constructor(t) { this.nativeNode = t; }
    get parent() { let t = this.nativeNode.parentNode; return t ? new sn(t) : null; }
    get injector() { return GT(this.nativeNode); }
    get componentInstance() { let t = this.nativeNode; return t && (Rp(t) || WT(t)); }
    get context() { return Rp(this.nativeNode) || zT(this.nativeNode); }
    get listeners() { return KT(this.nativeNode).filter(t => t.type === "dom"); }
    get references() { return ZT(this.nativeNode); }
    get providerTokens() { return qT(this.nativeNode); }
}, sn = class extends ur {
    constructor(t) { super(t); }
    get nativeElement() { return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null; }
    get name() { let t = ye(this.nativeNode), n = t ? t.lView : null; return n !== null ? n[m].data[t.nodeIndex].value : this.nativeNode.nodeName; }
    get properties() { let t = ye(this.nativeNode), n = t ? t.lView : null; if (n === null)
        return {}; let o = n[m].data, r = o[t.nodeIndex], i = {}; return NR(this.nativeElement, i), _R(i, r, n, o), i; }
    get attributes() { let t = {}, n = this.nativeElement; if (!n)
        return t; let o = ye(n), r = o ? o.lView : null; if (r === null)
        return {}; let i = r[m].data[o.nodeIndex].attrs, s = []; if (i) {
        let a = 0;
        for (; a < i.length;) {
            let c = i[a];
            if (typeof c != "string")
                break;
            let l = i[a + 1];
            t[c] = l, s.push(c.toLowerCase()), a += 2;
        }
    } for (let a of n.attributes)
        s.includes(a.name) || (t[a.name] = a.value); return t; }
    get styles() { return this.nativeElement?.style ?? {}; }
    get classes() { let t = {}, o = this.nativeElement.className; return (typeof o != "string" ? o.baseVal.split(" ") : o.split(" ")).forEach(i => t[i] = !0), t; }
    get childNodes() { let t = this.nativeNode.childNodes, n = []; for (let o = 0; o < t.length; o++) {
        let r = t[o];
        n.push(dr(r));
    } return n; }
    get children() { let t = this.nativeElement; if (!t)
        return []; let n = t.children, o = []; for (let r = 0; r < n.length; r++) {
        let i = n[r];
        o.push(dr(i));
    } return o; }
    query(t) { return this.queryAll(t)[0] || null; }
    queryAll(t) { let n = []; return xh(this, t, n, !0), n; }
    queryAllNodes(t) { let n = []; return xh(this, t, n, !1), n; }
    triggerEventHandler(t, n) { let o = this.nativeNode, r = []; this.listeners.forEach(i => { if (i.name === t) {
        let s = i.callback;
        s.call(o, n), r.push(s);
    } }), typeof o.eventListeners == "function" && o.eventListeners(t).forEach(i => { if (i.toString().indexOf("__ngUnwrap__") !== -1) {
        let s = i("__ngUnwrap__");
        return r.indexOf(s) === -1 && s.call(o, n);
    } }); }
};
function NR(e, t) { if (e) {
    let n = Object.getPrototypeOf(e), o = Node.prototype;
    for (; n !== null && n !== o;) {
        let r = Object.getOwnPropertyDescriptors(n);
        for (let i in r)
            if (!i.startsWith("__") && !i.startsWith("on")) {
                let s = e[i];
                wR(s) && (t[i] = s);
            }
        n = Object.getPrototypeOf(n);
    }
} }
function wR(e) { return typeof e == "string" || typeof e == "boolean" || typeof e == "number" || e === null; }
function xh(e, t, n, o) { let r = ye(e.nativeNode), i = r ? r.lView : null; if (i !== null) {
    let s = i[m].data[r.nodeIndex];
    Gt(s, i, t, n, o, e.nativeNode);
}
else
    pf(e.nativeNode, t, n, o); }
function Gt(e, t, n, o, r, i) { let s = Uf(e, t); if (e.type & 11) {
    if (Uc(s, n, o, r, i), he(e)) {
        let c = de(e.index, t);
        c && c[m].firstChild && Gt(c[m].firstChild, c, n, o, r, i);
    }
    else
        e.child && Gt(e.child, t, n, o, r, i), s && pf(s, n, o, r);
    let a = t[e.index];
    J(a) && Oh(a, n, o, r, i);
}
else if (e.type & 4) {
    let a = t[e.index];
    Uc(a[Pe], n, o, r, i), Oh(a, n, o, r, i);
}
else if (e.type & 16) {
    let a = t[Y], l = a[ce].projection[e.projection];
    if (Array.isArray(l))
        for (let u of l)
            Uc(u, n, o, r, i);
    else if (l) {
        let u = a[G], d = u[m].data[l.index];
        Gt(d, u, n, o, r, i);
    }
}
else
    e.child && Gt(e.child, t, n, o, r, i); if (i !== s) {
    let a = e.flags & 2 ? e.projectionNext : e.next;
    a && Gt(a, t, n, o, r, i);
} }
function Oh(e, t, n, o, r) { for (let i = H; i < e.length; i++) {
    let s = e[i], a = s[m].firstChild;
    a && Gt(a, s, t, n, o, r);
} }
function Uc(e, t, n, o, r) { if (r !== e) {
    let i = dr(e);
    if (!i)
        return;
    (o && i instanceof sn && t(i) && n.indexOf(i) === -1 || !o && t(i) && n.indexOf(i) === -1) && n.push(i);
} }
function pf(e, t, n, o) { let r = e.childNodes, i = r.length; for (let s = 0; s < i; s++) {
    let a = r[s], c = dr(a);
    c && ((o && c instanceof sn && t(c) && n.indexOf(c) === -1 || !o && t(c) && n.indexOf(c) === -1) && n.push(c), pf(a, t, n, o));
} }
function _R(e, t, n, o) { let r = t.propertyBindings; if (r !== null)
    for (let i = 0; i < r.length; i++) {
        let s = r[i], c = o[s].split(pN), l = c[0];
        if (c.length > 1) {
            let u = c[1];
            for (let d = 1; d < c.length - 1; d++)
                u += M(n[s + d - 1]) + c[d + 1];
            e[l] = u;
        }
        else
            e[l] = n[s];
    } }
var zc = "__ng_debug__";
function dr(e) { return e instanceof Node ? (e.hasOwnProperty(zc) || (e[zc] = e.nodeType == Node.ELEMENT_NODE ? new sn(e) : new ur(e)), e[zc]) : null; }
import { Subscription as SR } from "rxjs";
import "rxjs/operators";
typeof globalThis.ngServerMode > "u" && (globalThis.ngServerMode = typeof window > "u");
var Ta = Symbol("InputSignalNode#UNSET"), sC = Je(Z({}, Sa), { transformFn: void 0, applyValueToInputSignal(e, t) { _a(e, t); } }), cO = Symbol();
function aC(e, t) { let n = Object.create(sC); n.value = e, n.transformFn = t?.transform; function o() { if (jr(n), n.value === Ta) {
    let r = null;
    throw new w(-950, r);
} return n.value; } return o[Xe] = n, o; }
var lo = (function (e) { return e[e.Directive = 0] = "Directive", e[e.Component = 1] = "Component", e[e.Injectable = 2] = "Injectable", e[e.Pipe = 3] = "Pipe", e[e.NgModule = 4] = "NgModule", e; })(lo || {});
var bR = (function (e) { return e.Angular = "angular", e.ACX = "acx", e.Wiz = "wiz", e; })(bR || {}), VD = class {
    attributeName;
    constructor(t) { this.attributeName = t; }
    __NG_ELEMENT_ID__ = () => hs(this.attributeName);
    toString() { return `HostAttributeToken ${this.attributeName}`; }
}, lO = (() => { let e = new _(""); return e.__NG_ELEMENT_ID__ = t => { let n = T(); if (n === null)
    throw new w(-204, !1); if (n.type & 2)
    return n.value; if (t & 8)
    return null; throw new w(-204, !1); }, e; })();
function uO(e) { return new Ic; }
function BD(e, t) { return aC(e, t); }
function AR(e) { return aC(Ta, e); }
var dO = (BD.required = AR, BD);
function $D(e, t) { return od(t); }
function RR(e, t) { return rd(t); }
var fO = ($D.required = RR, $D);
function pO(e, t) { return id(t); }
function UD(e, t) { return od(t); }
function kR(e, t) { return rd(t); }
var hO = (UD.required = kR, UD);
function gO(e, t) { return id(t); }
function cC(e, t) { let n = Object.create(sC), o = new Ic; n.value = e; function r() { return jr(n), zD(n.value), n.value; } return r[Xe] = n, r.asReadonly = up.bind(r), r.set = i => { n.equal(n.value, i) || (_a(n, i), o.emit(i)); }, r.update = i => { zD(n.value), r.set(i(n.value)); }, r.subscribe = o.subscribe.bind(o), r.destroyRef = o.destroyRef, r; }
function zD(e) { if (e === Ta)
    throw new w(952, !1); }
function WD(e, t) { return cC(e, t); }
function xR(e) { return cC(Ta, e); }
var mO = (WD.required = xR, WD), lC = !0, fo = class {
}, yO = st("ContentChildren", (e, t = {}) => Z({ selector: e, first: !1, isViewQuery: !1, descendants: !1, emitDistinctChangesOnly: lC }, t), fo), vO = st("ContentChild", (e, t = {}) => Z({ selector: e, first: !0, isViewQuery: !1, descendants: !0 }, t), fo), IO = st("ViewChildren", (e, t = {}) => Z({ selector: e, first: !1, isViewQuery: !0, descendants: !0, emitDistinctChangesOnly: lC }, t), fo), EO = st("ViewChild", (e, t) => Z({ selector: e, first: !0, isViewQuery: !0, descendants: !0 }, t), fo);
function OR(e, t, n) { let o = new Vn(n); return Promise.resolve(o); }
function GD(e) { for (let t = e.length - 1; t >= 0; t--)
    if (e[t] !== void 0)
        return e[t]; }
var LR = (() => { class e {
    zone = E(B);
    changeDetectionScheduler = E(Ct);
    applicationRef = E(ke);
    applicationErrorHandler = E($t);
    _onMicrotaskEmptySubscription;
    initialize() { this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({ next: () => { this.changeDetectionScheduler.runningTick || this.zone.run(() => { try {
            this.applicationRef.dirtyFlags |= 1, this.applicationRef._tick();
        }
        catch (n) {
            this.applicationErrorHandler(n);
        } }); } })); }
    ngOnDestroy() { this._onMicrotaskEmptySubscription?.unsubscribe(); }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), PR = new _("", { factory: () => !1 });
function FR({ ngZoneFactory: e, scheduleInRootZone: t }) { return e ??= () => new B(Je(Z({}, uC()), { scheduleInRootZone: t })), [{ provide: In, useValue: !1 }, { provide: B, useFactory: e }, { provide: gt, multi: !0, useFactory: () => { let n = E(LR, { optional: !0 }); return () => n.initialize(); } }, { provide: gt, multi: !0, useFactory: () => { let n = E(HR); return () => { n.initialize(); }; } }, { provide: gi, useValue: t ?? sp }]; }
function DO(e) { let t = e?.scheduleInRootZone, n = FR({ ngZoneFactory: () => { let o = uC(e); return o.scheduleInRootZone = t, o.shouldCoalesceEventChangeDetection && q("NgZone_CoalesceEvent"), new B(o); }, scheduleInRootZone: t }); return et([{ provide: PR, useValue: !0 }, n]); }
function uC(e) { return { enableLongStackTrace: !1, shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1, shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1 }; }
var HR = (() => { class e {
    subscription = new SR;
    initialized = !1;
    zone = E(B);
    pendingTasks = E(Bt);
    initialize() { if (this.initialized)
        return; this.initialized = !0; let n = null; !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (n = this.pendingTasks.add()), this.zone.runOutsideAngular(() => { this.subscription.add(this.zone.onStable.subscribe(() => { B.assertNotInAngularZone(), queueMicrotask(() => { n !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(n), n = null); }); })); }), this.subscription.add(this.zone.onUnstable.subscribe(() => { B.assertInAngularZone(), n ??= this.pendingTasks.add(); })); }
    ngOnDestroy() { this.subscription.unsubscribe(); }
    static \u0275fac = function (o) { return new (o || e); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })();
var va = new _(""), jR = new _("");
function Pr(e) { return !e.moduleRef; }
function dC(e) { let t = Pr(e) ? e.r3Injector : e.moduleRef.injector, n = t.get(B); return n.run(() => { Pr(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers(); let o = t.get($t), r; if (n.runOutsideAngular(() => { r = n.onError.subscribe({ next: o }); }), Pr(e)) {
    let i = () => t.destroy(), s = e.platformInjector.get(va);
    s.add(i), t.onDestroy(() => { r.unsubscribe(), s.delete(i); });
}
else {
    let i = () => e.moduleRef.destroy(), s = e.platformInjector.get(va);
    s.add(i), e.moduleRef.onDestroy(() => { Ho(e.allPlatformModules, e.moduleRef), r.unsubscribe(), s.delete(i); });
} return BR(o, n, () => { let i = t.get(Bt), s = i.add(), a = t.get(Dd); return a.runInitializers(), a.donePromise.then(() => { let c = t.get(ff, xr); if (xI(c || xr), !t.get(jR, !0))
    return Pr(e) ? t.get(ke) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef); if (Pr(e)) {
    let u = t.get(ke);
    return e.rootComponent !== void 0 && u.bootstrap(e.rootComponent), u;
}
else
    return fC?.(e.moduleRef, e.allPlatformModules), e.moduleRef; }).finally(() => { i.remove(s); }); }); }); }
var fC;
function qD() { fC = VR; }
function VR(e, t) { let n = e.injector.get(ke); if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach(o => n.bootstrap(o));
else if (e.instance.ngDoBootstrap)
    e.instance.ngDoBootstrap(n);
else
    throw new w(-403, !1); t.push(e); }
function BR(e, t, n) { try {
    let o = n();
    return Id(o) ? o.catch(r => { throw t.runOutsideAngular(() => e(r)), r; }) : o;
}
catch (o) {
    throw t.runOutsideAngular(() => e(o)), o;
} }
var pC = (() => { class e {
    _injector;
    _modules = [];
    _destroyListeners = [];
    _destroyed = !1;
    constructor(n) { this._injector = n; }
    bootstrapModuleFactory(n, o) { let r = [ma(), ...o?.applicationProviders ?? [], gc], i = pv(n.moduleType, this.injector, r); return qD(), dC({ moduleRef: i, allPlatformModules: this._modules, platformInjector: this.injector }); }
    bootstrapModule(n, o = []) { let r = Td({}, o); return qD(), OR(this.injector, r, n).then(i => this.bootstrapModuleFactory(i, r)); }
    onDestroy(n) { this._destroyListeners.push(n); }
    get injector() { return this._injector; }
    destroy() { if (this._destroyed)
        throw new w(404, !1); this._modules.slice().forEach(o => o.destroy()), this._destroyListeners.forEach(o => o()); let n = this._injector.get(va, null); n && (n.forEach(o => o()), n.clear()), this._destroyed = !0; }
    get destroyed() { return this._destroyed; }
    static \u0275fac = function (o) { return new (o || e)(Oe(De)); };
    static \u0275prov = V({ token: e, factory: e.\u0275fac, providedIn: "platform" });
} return e; })(), uo = null;
function $R(e) { if (Ma())
    throw new w(400, !1); Cd(), uo = typeof ngServerMode > "u" || !ngServerMode ? e : null; let t = e.get(pC); return gC(e), t; }
function UR(e, t, n = []) { let o = `Platform: ${t}`, r = new _(o); return (i = []) => { let s = Ma(); if (!s) {
    let a = [...n, ...i, { provide: r, useValue: !0 }];
    s = e?.(a) ?? $R(hC(a, o));
} return typeof ngServerMode < "u" && ngServerMode ? s : zR(r); }; }
function hC(e = [], t) { return De.create({ name: t, providers: [{ provide: Ff, useValue: "platform" }, { provide: va, useValue: new Set([() => uo = null]) }, ...e] }); }
function zR(e) { let t = Ma(); if (!t)
    throw new w(-401, !1); return t; }
function Ma() { return typeof ngServerMode < "u" && ngServerMode ? null : uo?.get(pC) ?? null; }
function CO() { Ma()?.destroy(); }
function WR(e = []) { if (uo)
    return uo; let t = hC(e); return (typeof ngServerMode > "u" || !ngServerMode) && (uo = t), Cd(), gC(t), t; }
function TO(e) { return { provide: Jl, useValue: e, multi: !0 }; }
function gC(e) { let t = e.get(Jl, null); ni(e, () => { t?.forEach(n => n()); }); }
function MO(e) { return et([]); }
function NO() { return !1; }
function wO() { }
var ya = new WeakSet, QD = "";
function ZD(e) { return e.get(Ts, ru); }
function GR() { let e = [{ provide: Ts, useFactory: () => { let t = !0; if (typeof ngServerMode > "u" || !ngServerMode) {
            let n = E(at);
            t = !!window._ejsas?.[n];
        } return t && q("NgEventReplay"), t; } }]; return (typeof ngServerMode > "u" || !ngServerMode) && e.push({ provide: gt, useValue: () => { let t = E(ke), { injector: n } = t; if (!ya.has(t)) {
        let o = E(Ir);
        if (ZD(n)) {
            kg();
            let r = n.get(at), i = Ag(r, (s, a, c) => { s.nodeType === Node.ELEMENT_NODE && (bg(s, a, c), au(s, o)); });
            t.onDestroy(i);
        }
    } }, multi: !0 }, { provide: Ar, useFactory: () => { let t = E(ke), { injector: n } = t; return () => { if (!ZD(n) || ya.has(t))
        return; ya.add(t); let o = n.get(at); t.onDestroy(() => { ya.delete(t), typeof ngServerMode < "u" && !ngServerMode && Ec(o); }), t.whenStable().then(() => { if (t.destroyed)
        return; let r = n.get(lu); qR(r, n); let i = n.get(Ir); i.get(QD)?.forEach(cu), i.delete(QD); let s = r.instance; Er(n) ? t.onDestroy(() => s.cleanUp()) : s.cleanUp(); }); }; }, multi: !0 }), e; }
var qR = (e, t) => { let n = t.get(at), o = window._ejsas[n], r = e.instance = new vp(new hp(o.c)); for (let a of o.et)
    r.addEvent(a); for (let a of o.etc)
    r.addEvent(a); let i = Ip(n); r.replayEarlyEventInfos(i), Ec(n); let s = new mp(a => { ZR(t, a, a.currentTarget); }); yp(r, s); };
function QR(e, t, n) { let o = new Map, r = t[Ot], i = e.cleanup; if (!i || !r)
    return o; for (let s = 0; s < i.length;) {
    let a = i[s++], c = i[s++];
    if (typeof a != "string")
        continue;
    let l = a;
    if (!pp(l))
        continue;
    fp(l) ? n.capture.add(l) : n.regular.add(l);
    let u = x(t[c]);
    s++;
    let d = i[s++];
    (typeof d == "boolean" || d >= 0) && (o.has(u) ? o.get(u).push(l) : o.set(u, [l]));
} return o; }
function ZR(e, t, n) { let o = (n && n.getAttribute(Yn)) ?? ""; /d\d+/.test(o) ? YR(o, e, t, n) : t.eventPhase === gp.REPLAY && uu(t, n); }
function YR(e, t, n, o) { let r = t.get(Ng); r.push({ event: n, currentTarget: o }), dt(t, e, KR(r)); }
function KR(e) { return t => { let n = new Set(t), o = []; for (let { event: r, currentTarget: i } of e) {
    let s = i.getAttribute(Yn);
    n.has(s) ? uu(r, i) : o.push({ event: r, currentTarget: i });
} e.length = 0, e.push(...o); }; }
var YD = !1, KD = !1, JD = !1, JR = 1e4;
function XR() { YD || (YD = !0, Hg(), wI(), yE(), _I(), wv(), Xy(), by(), Gm()); }
function ek() { KD || (KD = !0, LI(), Ey(), Ny()); }
function tk() { JD || (JD = !0, qg()); }
function nk(e) { return e.whenStable(); }
var _O = "ngcm";
function SO() { let e = [{ provide: cn, useFactory: () => { let t = !0; return (typeof ngServerMode > "u" || !ngServerMode) && (t = !!E(qn, { optional: !0 })?.get(Ms, null)), t && q("NgHydration"), t; } }, { provide: gt, useValue: () => { if (Gu(!1), typeof ngServerMode < "u" && ngServerMode)
            return; let t = E(Vt); E(cn) && (Zg(t), XR()); }, multi: !0 }]; return (typeof ngServerMode > "u" || !ngServerMode) && e.push({ provide: nu, useFactory: () => E(cn) }, { provide: Ar, useFactory: () => { let t = E(Ct); if (E(cn)) {
        let n = E(ke);
        return () => { nk(n).then(() => { n.destroyed || (qu(n), t.notify(7)); }); };
    } return () => { }; }, multi: !0 }), et(e); }
function bO() { return [{ provide: ou, useFactory: () => E(cn) }, { provide: gt, useValue: () => { E(cn) && (ek(), Gu(!0), q("NgI18nHydration")); }, multi: !0 }]; }
function AO() { let e = [GR(), { provide: iu, useValue: !0 }, { provide: ct, useClass: xg }, { provide: gt, useValue: () => { tk(), q("NgIncrementalHydration"); }, multi: !0 }]; return (typeof ngServerMode > "u" || !ngServerMode) && e.push({ provide: Ar, useFactory: () => { let t = E(De), n = E(Vt); return () => { let o = Qg(t), r = yy(n, n.body); Zv(t, o, r), Wg(n, t); }; }, multi: !0 }), e; }
var XD = JR - 1e3, mf = class {
    openTasks = new Map;
    add(t) { this.openTasks.set(t, new Error("Task stack tracking error")); }
    remove(t) { this.openTasks.delete(t); }
};
function RO() { let e = new mf, { openTasks: t } = e; return et([{ provide: ap, useValue: e }, Uv(() => { console.warn("Stability debugging utility was provided in production mode. This will cause debug code to be included in production bundles. If this is intentional because you are debugging stability issues in a production environment, you can ignore this warning."); let n = E(B), o = E(ke), r = null; typeof Zone < "u" && n.run(() => { r = Zone.current.get("TaskTrackingZone"); }), n.runOutsideAngular(() => { let i = setTimeout(() => { if (console.debug(`---- Application did not stabilize within ${XD / 1e3} seconds ----`), typeof Zone < "u" && !r && console.info('Zone.js is present but no TaskTrackingZone found. To enable better debugging of tasks in the Angular Zone, import "zone.js/plugins/task-tracking" in your application.'), r?.macroTasks?.length) {
        console.group("Macrotasks keeping Angular Zone unstable:");
        for (let s of r?.macroTasks ?? [])
            console.debug(s.creationLocation.stack);
        console.groupEnd();
    } console.group("PendingTasks keeping application unstable:"); for (let s of t.values())
        console.debug(s.stack); console.groupEnd(); }, XD); o.whenStable().then(() => { clearTimeout(i); }); }); })]); }
function kO(e) { let t = ad(e); if (!t)
    throw mC(e); return new Vn(t); }
function xO(e) { let t = ad(e); if (!t)
    throw mC(e); return t; }
function mC(e) { return new w(920, !1); }
var ok = (() => { class e {
    static __NG_ELEMENT_ID__ = rk;
} return e; })();
function rk(e) { return ik(T(), g(), (e & 16) === 16); }
function ik(e, t, n) { if (he(e) && !n) {
    let o = de(e.index, t);
    return new St(o, o);
}
else if (e.type & 175) {
    let o = t[Y];
    return new St(o, t);
} return null; }
var yf = class extends ok {
}, eC = class extends yf {
}, Ia = class {
    supports(t) { return or(t); }
    create(t) { return new vf(t); }
}, sk = (e, t) => t, vf = class {
    length = 0;
    collection;
    _linkedRecords = null;
    _unlinkedRecords = null;
    _previousItHead = null;
    _itHead = null;
    _itTail = null;
    _additionsHead = null;
    _additionsTail = null;
    _movesHead = null;
    _movesTail = null;
    _removalsHead = null;
    _removalsTail = null;
    _identityChangesHead = null;
    _identityChangesTail = null;
    _trackByFn;
    constructor(t) { this._trackByFn = t || sk; }
    forEachItem(t) { let n; for (n = this._itHead; n !== null; n = n._next)
        t(n); }
    forEachOperation(t) { let n = this._itHead, o = this._removalsHead, r = 0, i = null; for (; n || o;) {
        let s = !o || n && n.currentIndex < tC(o, r, i) ? n : o, a = tC(s, r, i), c = s.currentIndex;
        if (s === o)
            r--, o = o._nextRemoved;
        else if (n = n._next, s.previousIndex == null)
            r++;
        else {
            i || (i = []);
            let l = a - r, u = c - r;
            if (l != u) {
                for (let f = 0; f < l; f++) {
                    let p = f < i.length ? i[f] : i[f] = 0, h = p + f;
                    u <= h && h < l && (i[f] = p + 1);
                }
                let d = s.previousIndex;
                i[d] = u - l;
            }
        }
        a !== c && t(s, a, c);
    } }
    forEachPreviousItem(t) { let n; for (n = this._previousItHead; n !== null; n = n._nextPrevious)
        t(n); }
    forEachAddedItem(t) { let n; for (n = this._additionsHead; n !== null; n = n._nextAdded)
        t(n); }
    forEachMovedItem(t) { let n; for (n = this._movesHead; n !== null; n = n._nextMoved)
        t(n); }
    forEachRemovedItem(t) { let n; for (n = this._removalsHead; n !== null; n = n._nextRemoved)
        t(n); }
    forEachIdentityChange(t) { let n; for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange)
        t(n); }
    diff(t) { if (t == null && (t = []), !or(t))
        throw new w(900, !1); return this.check(t) ? this : null; }
    onDestroy() { }
    check(t) { this._reset(); let n = this._itHead, o = !1, r, i, s; if (Array.isArray(t)) {
        this.length = t.length;
        for (let a = 0; a < this.length; a++)
            i = t[a], s = this._trackByFn(a, i), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, i, s, a), o = !0) : (o && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)), n = n._next;
    }
    else
        r = 0, Hy(t, a => { s = this._trackByFn(r, a), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, a, s, r), o = !0) : (o && (n = this._verifyReinsertion(n, a, s, r)), Object.is(n.item, a) || this._addIdentityChange(n, a)), n = n._next, r++; }), this.length = r; return this._truncate(n), this.collection = t, this.isDirty; }
    get isDirty() { return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null; }
    _reset() { if (this.isDirty) {
        let t;
        for (t = this._previousItHead = this._itHead; t !== null; t = t._next)
            t._nextPrevious = t._next;
        for (t = this._additionsHead; t !== null; t = t._nextAdded)
            t.previousIndex = t.currentIndex;
        for (this._additionsHead = this._additionsTail = null, t = this._movesHead; t !== null; t = t._nextMoved)
            t.previousIndex = t.currentIndex;
        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null;
    } }
    _mismatch(t, n, o, r) { let i; return t === null ? i = this._itTail : (i = t._prev, this._remove(t)), t = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(o, null), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, r)) : (t = this._linkedRecords === null ? null : this._linkedRecords.get(o, r), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, r)) : t = this._addAfter(new If(n, o), i, r)), t; }
    _verifyReinsertion(t, n, o, r) { let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(o, null); return i !== null ? t = this._reinsertAfter(i, t._prev, r) : t.currentIndex != r && (t.currentIndex = r, this._addToMoves(t, r)), t; }
    _truncate(t) { for (; t !== null;) {
        let n = t._next;
        this._addToRemovals(this._unlink(t)), t = n;
    } this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null); }
    _reinsertAfter(t, n, o) { this._unlinkedRecords !== null && this._unlinkedRecords.remove(t); let r = t._prevRemoved, i = t._nextRemoved; return r === null ? this._removalsHead = i : r._nextRemoved = i, i === null ? this._removalsTail = r : i._prevRemoved = r, this._insertAfter(t, n, o), this._addToMoves(t, o), t; }
    _moveAfter(t, n, o) { return this._unlink(t), this._insertAfter(t, n, o), this._addToMoves(t, o), t; }
    _addAfter(t, n, o) { return this._insertAfter(t, n, o), this._additionsTail === null ? this._additionsTail = this._additionsHead = t : this._additionsTail = this._additionsTail._nextAdded = t, t; }
    _insertAfter(t, n, o) { let r = n === null ? this._itHead : n._next; return t._next = r, t._prev = n, r === null ? this._itTail = t : r._prev = t, n === null ? this._itHead = t : n._next = t, this._linkedRecords === null && (this._linkedRecords = new Ea), this._linkedRecords.put(t), t.currentIndex = o, t; }
    _remove(t) { return this._addToRemovals(this._unlink(t)); }
    _unlink(t) { this._linkedRecords !== null && this._linkedRecords.remove(t); let n = t._prev, o = t._next; return n === null ? this._itHead = o : n._next = o, o === null ? this._itTail = n : o._prev = n, t; }
    _addToMoves(t, n) { return t.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = t : this._movesTail = this._movesTail._nextMoved = t), t; }
    _addToRemovals(t) { return this._unlinkedRecords === null && (this._unlinkedRecords = new Ea), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t; }
    _addIdentityChange(t, n) { return t.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = t : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = t, t; }
}, If = class {
    item;
    trackById;
    currentIndex = null;
    previousIndex = null;
    _nextPrevious = null;
    _prev = null;
    _next = null;
    _prevDup = null;
    _nextDup = null;
    _prevRemoved = null;
    _nextRemoved = null;
    _nextAdded = null;
    _nextMoved = null;
    _nextIdentityChange = null;
    constructor(t, n) { this.item = t, this.trackById = n; }
}, Ef = class {
    _head = null;
    _tail = null;
    add(t) { this._head === null ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t); }
    get(t, n) { let o; for (o = this._head; o !== null; o = o._nextDup)
        if ((n === null || n <= o.currentIndex) && Object.is(o.trackById, t))
            return o; return null; }
    remove(t) { let n = t._prevDup, o = t._nextDup; return n === null ? this._head = o : n._nextDup = o, o === null ? this._tail = n : o._prevDup = n, this._head === null; }
}, Ea = class {
    map = new Map;
    put(t) { let n = t.trackById, o = this.map.get(n); o || (o = new Ef, this.map.set(n, o)), o.add(t); }
    get(t, n) { let o = t, r = this.map.get(o); return r ? r.get(t, n) : null; }
    remove(t) { let n = t.trackById; return this.map.get(n).remove(t) && this.map.delete(n), t; }
    get isEmpty() { return this.map.size === 0; }
    clear() { this.map.clear(); }
};
function tC(e, t, n) { let o = e.previousIndex; if (o === null)
    return o; let r = 0; return n && o < n.length && (r = n[o]), o + t + r; }
var Da = class {
    supports(t) { return t instanceof Map || ta(t); }
    create() { return new Df; }
}, Df = class {
    _records = new Map;
    _mapHead = null;
    _appendAfter = null;
    _previousMapHead = null;
    _changesHead = null;
    _changesTail = null;
    _additionsHead = null;
    _additionsTail = null;
    _removalsHead = null;
    get isDirty() { return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null; }
    forEachItem(t) { let n; for (n = this._mapHead; n !== null; n = n._next)
        t(n); }
    forEachPreviousItem(t) { let n; for (n = this._previousMapHead; n !== null; n = n._nextPrevious)
        t(n); }
    forEachChangedItem(t) { let n; for (n = this._changesHead; n !== null; n = n._nextChanged)
        t(n); }
    forEachAddedItem(t) { let n; for (n = this._additionsHead; n !== null; n = n._nextAdded)
        t(n); }
    forEachRemovedItem(t) { let n; for (n = this._removalsHead; n !== null; n = n._nextRemoved)
        t(n); }
    diff(t) { if (!t)
        t = new Map;
    else if (!(t instanceof Map || ta(t)))
        throw new w(900, !1); return this.check(t) ? this : null; }
    check(t) { this._reset(); let n = this._mapHead; if (this._appendAfter = null, this._forEach(t, (o, r) => { if (n && n.key === r)
        this._maybeAddToChanges(n, o), this._appendAfter = n, n = n._next;
    else {
        let i = this._getOrCreateRecordForKey(r, o);
        n = this._insertBeforeOrAppend(n, i);
    } }), n) {
        n._prev && (n._prev._next = null), this._removalsHead = n;
        for (let o = n; o !== null; o = o._nextRemoved)
            o === this._mapHead && (this._mapHead = null), this._records.delete(o.key), o._nextRemoved = o._next, o.previousValue = o.currentValue, o.currentValue = null, o._prev = null, o._next = null;
    } return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty; }
    _insertBeforeOrAppend(t, n) { if (t) {
        let o = t._prev;
        return n._next = t, n._prev = o, t._prev = n, o && (o._next = n), t === this._mapHead && (this._mapHead = n), this._appendAfter = t, t;
    } return this._appendAfter ? (this._appendAfter._next = n, n._prev = this._appendAfter) : this._mapHead = n, this._appendAfter = n, null; }
    _getOrCreateRecordForKey(t, n) { if (this._records.has(t)) {
        let r = this._records.get(t);
        this._maybeAddToChanges(r, n);
        let i = r._prev, s = r._next;
        return i && (i._next = s), s && (s._prev = i), r._next = null, r._prev = null, r;
    } let o = new Cf(t); return this._records.set(t, o), o.currentValue = n, this._addToAdditions(o), o; }
    _reset() { if (this.isDirty) {
        let t;
        for (this._previousMapHead = this._mapHead, t = this._previousMapHead; t !== null; t = t._next)
            t._nextPrevious = t._next;
        for (t = this._changesHead; t !== null; t = t._nextChanged)
            t.previousValue = t.currentValue;
        for (t = this._additionsHead; t != null; t = t._nextAdded)
            t.previousValue = t.currentValue;
        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null;
    } }
    _maybeAddToChanges(t, n) { Object.is(n, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = n, this._addToChanges(t)); }
    _addToAdditions(t) { this._additionsHead === null ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t); }
    _addToChanges(t) { this._changesHead === null ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t); }
    _forEach(t, n) { t instanceof Map ? t.forEach(n) : Object.keys(t).forEach(o => n(t[o], o)); }
}, Cf = class {
    key;
    previousValue = null;
    currentValue = null;
    _nextPrevious = null;
    _next = null;
    _prev = null;
    _nextAdded = null;
    _nextRemoved = null;
    _nextChanged = null;
    constructor(t) { this.key = t; }
};
function nC() { return new yC([new Ia]); }
var yC = (() => { class e {
    factories;
    static \u0275prov = V({ token: e, providedIn: "root", factory: nC });
    constructor(n) { this.factories = n; }
    static create(n, o) { if (o != null) {
        let r = o.factories.slice();
        n = n.concat(r);
    } return new e(n); }
    static extend(n) { return { provide: e, useFactory: () => { let o = E(e, { optional: !0, skipSelf: !0 }); return e.create(n, o || nC()); } }; }
    find(n) { let o = this.factories.find(r => r.supports(n)); if (o != null)
        return o; throw new w(901, !1); }
} return e; })();
function oC() { return new vC([new Da]); }
var vC = (() => { class e {
    static \u0275prov = V({ token: e, providedIn: "root", factory: oC });
    factories;
    constructor(n) { this.factories = n; }
    static create(n, o) { if (o) {
        let r = o.factories.slice();
        n = n.concat(r);
    } return new e(n); }
    static extend(n) { return { provide: e, useFactory: () => { let o = E(e, { optional: !0, skipSelf: !0 }); return e.create(n, o || oC()); } }; }
    find(n) { let o = this.factories.find(r => r.supports(n)); if (o)
        return o; throw new w(901, !1); }
} return e; })(), ak = [new Da], ck = [new Ia], OO = new yC(ck), LO = new vC(ak), PO = UR(null, "core", []), FO = (() => { class e {
    constructor(n) { }
    static \u0275fac = function (o) { return new (o || e)(Oe(ke)); };
    static \u0275mod = ld({ type: e });
    static \u0275inj = go({});
} return e; })();
function HO(e) { let { rootComponent: t, appProviders: n, platformProviders: o, platformRef: r } = e; if (O(R.BootstrapApplicationStart), typeof ngServerMode < "u" && ngServerMode && !r)
    throw new w(-401, !1); try {
    let i = r?.injector ?? WR(o), s = [ma(), gc, ...n || []], a = new ir({ providers: s, parent: i, debugName: "", runEnvironmentInitializers: !1 });
    return dC({ r3Injector: a.injector, platformInjector: i, rootComponent: t });
}
catch (i) {
    return Promise.reject(i);
}
finally {
    O(R.BootstrapApplicationEnd);
} }
var Tf = class {
    views = [];
    indexByContent = new Map;
    add(t) { let n = JSON.stringify(t); if (!this.indexByContent.has(n)) {
        let o = this.views.length;
        return this.views.push(t), this.indexByContent.set(n, o), o;
    } return this.indexByContent.get(n); }
    getAll() { return this.views; }
}, lk = 0;
function IC(e) { return e.ssrId || (e.ssrId = `t${lk++}`), e.ssrId; }
function EC(e, t, n) { let o = []; return Ln(e, t, n, o), o.length; }
function uk(e) { let t = []; return qs(e, t), t.length; }
function DC(e, t) { let n = e[j]; return n && !n.hasAttribute(an) ? Ca(n, e, null, t) : null; }
function CC(e, t) { let n = Mo(e[j]), o = DC(n, t); if (o === null)
    return; let r = x(n[j]), i = e[G], s = Ca(r, i, null, t), a = n[C], c = `${o}|${s}`; a.setAttribute(r, Sn, c); }
function jO(e, t) { let n = e.injector, o = Dy(n), r = Er(n), i = new Tf, s = new Map, a = e._views, c = n.get(Ts, ru), l = { regular: new Set, capture: new Set }, u = new Map; e.injector.get(at); for (let p of a) {
    let h = du(p);
    if (h !== null) {
        let y = { serializedViewCollection: i, corruptedTextNodes: s, isI18nHydrationEnabled: o, isIncrementalHydrationEnabled: r, i18nChildren: new Map, eventTypesToReplay: l, shouldReplayEvents: c, deferBlocks: u };
        J(h) ? CC(h, y) : DC(h, y), gk(s, t);
    }
} let d = i.getAll(), f = n.get(qn); if (f.set(Ms, d), u.size > 0) {
    let p = {};
    for (let [h, y] of u.entries())
        p[h] = y;
    f.set(Ns, p);
} return l; }
function dk(e, t, n, o, r) { let i = [], s = ""; for (let a = H; a < e.length; a++) {
    let c = e[a], l, u, d;
    if (ze(c) && (c = c[I], J(c))) {
        u = uk(c) + 1, CC(c, r);
        let p = Mo(c[j]);
        d = { [Es]: p[m].ssrId, [rt]: u };
    }
    if (!d) {
        let p = c[m];
        p.type === 1 ? (l = p.ssrId, u = 1) : (l = IC(p), u = EC(p, c, p.firstChild)), d = { [Es]: l, [rt]: u };
        let h = !1;
        if (Rv(n[m], t)) {
            let y = ge(n, t), v = se(n[m], t);
            if (r.isIncrementalHydrationEnabled && v.hydrateTriggers !== null) {
                let D = `d${r.deferBlocks.size}`;
                v.hydrateTriggers.has(7) && (h = !0);
                let S = [];
                qs(e, S);
                let K = { [rt]: S.length, [yr]: y[ut] }, xe = fk(v.hydrateTriggers);
                xe.length > 0 && (K[vr] = xe), o !== null && (K[tu] = o), r.deferBlocks.set(D, K);
                let Ce = x(e);
                Ce !== void 0 ? Ce.nodeType === Node.COMMENT_NODE && rC(Ce, D) : rC(Ce, D), h || yk(v, S, D, r), o = D, d[Cs] = D;
            }
            d[yr] = y[ut];
        }
        if (!h) {
            let y = x(c[j]);
            (c[m].type !== 1 || y === null || !y.hasAttribute(an)) && Object.assign(d, TC(e[a], o, r));
        }
    }
    let f = JSON.stringify(d);
    if (i.length > 0 && f === s) {
        let p = i[i.length - 1];
        p[gr] ??= 1, p[gr]++;
    }
    else
        s = f, i.push(d);
} return i; }
function fk(e) { let t = new Set([0, 1, 2, 5]), n = []; for (let [o, r] of e)
    t.has(o) && (r === null ? n.push(o) : r.type === 5 ? n.push({ trigger: o, delay: r.delay }) : n.push({ trigger: o, intersectionObserverOptions: r.intersectionObserverOptions })); return n; }
function Fr(e, t, n, o) { let r = t.index - I; e[mr] ??= {}, e[mr][r] ??= my(t, n, o); }
function hf(e, t) { let n = typeof t == "number" ? t : t.index - I; e[Zn] ??= [], e[Zn].includes(n) || e[Zn].push(n); }
function TC(e, t = null, n) { let o = {}, r = e[m], i = Cy(r, n), s = n.shouldReplayEvents ? QR(r, e, n.eventTypesToReplay) : null; for (let a = I; a < r.bindingStartIndex; a++) {
    let c = r.data[a], l = a - I, u = Ty(e, a, n);
    if (u) {
        o[Ds] ??= {}, o[Ds][l] = u.caseQueue;
        for (let d of u.disconnectedNodes)
            hf(o, d);
        for (let d of u.disjointNodes) {
            let f = r.data[d + I];
            Fr(o, f, e, i);
        }
        continue;
    }
    if (ps(c) && !Kn(c)) {
        if (J(e[a]) && c.tView && (o[Is] ??= {}, o[Is][l] = IC(c.tView)), ro(c, e) && mk(c)) {
            hf(o, c);
            continue;
        }
        if (Array.isArray(c.projection)) {
            for (let d of c.projection)
                if (d)
                    if (!Array.isArray(d))
                        !Ua(d) && !Gn(d) && (ro(d, e) ? hf(o, d) : Fr(o, d, e, i));
                    else
                        throw ay(x(e[a]));
        }
        if (pk(o, c, e, i), J(e[a])) {
            let d = e[a][j];
            if (Array.isArray(d)) {
                let f = x(d);
                f.hasAttribute(an) || Ca(f, d, t, n);
            }
            o[Qn] ??= {}, o[Qn][l] = dk(e[a], c, e, t, n);
        }
        else if (Array.isArray(e[a]) && !Zh(c)) {
            let d = x(e[a][j]);
            d.hasAttribute(an) || Ca(d, e[a], t, n);
        }
        else if (c.type & 8)
            o[hr] ??= {}, o[hr][l] = EC(r, e, c.child);
        else if (c.type & 144) {
            let d = c.next;
            for (; d !== null && d.type & 144;)
                d = d.next;
            d && !Gn(d) && Fr(o, d, e, i);
        }
        else if (c.type & 1) {
            let d = x(e[a]);
            pu(n, d);
        }
        if (s && c.type & 2) {
            let d = x(e[a]);
            s.has(d) && su(d, s.get(d), t);
        }
    }
} return o; }
function pk(e, t, n, o) { Ua(t) || (t.projectionNext && t.projectionNext !== t.next && !Gn(t.projectionNext) && Fr(e, t.projectionNext, n, o), t.prev === null && t.parent !== null && ro(t.parent, n) && !ro(t, n) && Fr(e, t, n, o)); }
function hk(e) { let t = e[F]; if (!t?.constructor)
    return !1; let n = W(t.constructor); return n?.encapsulation === Ae.ShadowDom || n?.encapsulation === Ae.ExperimentalIsolatedShadowDom; }
function Ca(e, t, n, o) { let r = t[C]; if (Vf(t) && !Ks() || hk(t))
    return r.setAttribute(e, an, ""), null; {
    let i = TC(t, n, o), s = o.serializedViewCollection.add(i);
    return r.setAttribute(e, Sn, s.toString()), s;
} }
function rC(e, t) { e.textContent = `ngh=${t}`; }
function gk(e, t) { for (let [n, o] of e)
    n.after(t.createComment(o)); }
function mk(e) { let t = e; for (; t != null;) {
    if (he(t))
        return !0;
    t = t.parent;
} return !1; }
function yk(e, t, n, o) { let r = zg(e.hydrateTriggers); for (let i of r)
    o.eventTypesToReplay.regular.add(i); if (r.length > 0) {
    let i = t.filter(s => s.nodeType === Node.ELEMENT_NODE);
    for (let s of i)
        su(s, r, n);
} }
function VO(e) { return typeof e == "boolean" ? e : e != null && e !== "false"; }
function BO(e, t = NaN) { return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t; }
var vk = "\u{1F170}\uFE0F", Na = !1;
function $O(e) { if (!Na)
    return; let { startLabel: t } = MC(e); performance.mark(t); }
function UO(e) { if (!Na)
    return; let { startLabel: t, labelName: n, endLabel: o } = MC(e); performance.mark(o), performance.measure(n, t, o), performance.clearMarks(t), performance.clearMarks(o); }
function MC(e) { let t = `${vk}:${e}`; return { labelName: t, startLabel: `start:${t}`, endLabel: `end:${t}` }; }
var iC = !1;
function zO() { if (!iC && (typeof performance > "u" || !performance.mark || !performance.measure)) {
    iC = !0, console.warn("Performance API is not supported on this platform");
    return;
} Na = !0; }
function WO() { Na = !1; }
function GO(e) { }
function qO(e) { return ee({ usage: 1, kind: "directive", type: e.type }).compileDirectiveDeclaration(pe, `ng:///${e.type.name}/\u0275fac.js`, e); }
function QO(e) { gd(e.type, e.decorators, e.ctorParameters ?? null, e.propDecorators ?? null); }
function ZO(e) { Fv(e.type, e.resolveDeferredDeps, (...t) => { let n = e.resolveMetadata(...t); gd(e.type, n.decorators, n.ctorParameters, n.propDecorators); }); }
function YO(e) { return ee({ usage: 1, kind: "component", type: e.type }).compileComponentDeclaration(pe, `ng:///${e.type.name}/\u0275cmp.js`, e); }
function KO(e) { return ee({ usage: 1, kind: Ik(e.target), type: e.type }).compileFactoryDeclaration(pe, `ng:///${e.type.name}/\u0275fac.js`, e); }
function Ik(e) { switch (e) {
    case lo.Directive: return "directive";
    case lo.Component: return "component";
    case lo.Injectable: return "injectable";
    case lo.Pipe: return "pipe";
    case lo.NgModule: return "NgModule";
} }
function JO(e) { return ee({ usage: 1, kind: "injectable", type: e.type }).compileInjectableDeclaration(pe, `ng:///${e.type.name}/\u0275prov.js`, e); }
function XO(e) { return ee({ usage: 1, kind: "NgModule", type: e.type }).compileInjectorDeclaration(pe, `ng:///${e.type.name}/\u0275inj.js`, e); }
function eL(e) { return ee({ usage: 1, kind: "NgModule", type: e.type }).compileNgModuleDeclaration(pe, `ng:///${e.type.name}/\u0275mod.js`, e); }
function tL(e) { return ee({ usage: 1, kind: "pipe", type: e.type }).compilePipeDeclaration(pe, `ng:///${e.type.name}/\u0275pipe.js`, e); }
var gf = Symbol("NOT_SET"), NC = new Set, Ek = Je(Z({}, Sa), { kind: "afterRenderEffectPhase", consumerIsAlwaysLive: !0, consumerAllowSignalWrites: !0, value: gf, cleanup: null, consumerMarkedDirty() { if (this.sequence.impl.executing) {
        if (this.sequence.lastPhase === null || this.sequence.lastPhase < this.phase)
            return;
        this.sequence.erroredOrDestroyed = !0;
    } this.sequence.scheduler.notify(7); }, phaseFn(e) { if (this.sequence.lastPhase = this.phase, !this.dirty)
        return this.signal; if (this.dirty = !1, this.value !== gf && !Br(this))
        return this.signal; try {
        for (let r of this.cleanup ?? NC)
            r();
    }
    finally {
        this.cleanup?.clear();
    } let t = []; e !== void 0 && t.push(e), t.push(this.registerCleanupFn); let n = po(this), o; try {
        o = this.userFn.apply(null, t);
    }
    finally {
        Vr(this, n);
    } return (this.value === gf || !this.equal(this.value, o)) && (this.value = o, this.version++), this.signal; } }), Mf = class extends Ko {
    scheduler;
    lastPhase = null;
    nodes = [void 0, void 0, void 0, void 0];
    onDestroyFns = null;
    constructor(t, n, o, r, i, s = null) { super(t, [void 0, void 0, void 0, void 0], o, !1, i.get(Ao), s), this.scheduler = r; for (let a of Ru) {
        let c = n[a];
        if (c === void 0)
            continue;
        let l = Object.create(Ek);
        l.sequence = this, l.phase = a, l.userFn = c, l.dirty = !0, l.signal = () => (jr(l), l.value), l.signal[Xe] = l, l.registerCleanupFn = u => (l.cleanup ??= new Set).add(u), this.nodes[a] = l, this.hooks[a] = u => l.phaseFn(u);
    } }
    afterRun() { super.afterRun(), this.lastPhase = null; }
    destroy() { if (this.onDestroyFns !== null)
        for (let t of this.onDestroyFns)
            t(); super.destroy(); for (let t of this.nodes)
        if (t)
            try {
                for (let n of t.cleanup ?? NC)
                    n();
            }
            finally {
                ho(t);
            } }
};
function nL(e, t) { if (typeof ngServerMode < "u" && ngServerMode)
    return Fs; let n = t?.injector ?? E(De), o = n.get(Ct), r = n.get(Ps), i = n.get(dn, null, { optional: !0 }); r.impl ??= n.get(ku); let s = e; typeof s == "function" && (s = { mixedReadWrite: e }); let a = n.get(hi, null, { optional: !0 }), c = new Mf(r.impl, [s.earlyRead, s.write, s.mixedReadWrite, s.read], a?.view, o, n, i?.snapshot(null)); return r.impl.register(c), c; }
function oL(e) { return new Nf(md(e) ? e : Ut(e)); }
var Nf = class {
    snapshot;
    constructor(t) { this.snapshot = t; }
    get state() { return this.snapshot(); }
    value = Ut(() => { if (this.state.status === "error")
        throw new dp(this.state.error); return this.state.value; });
    status = Ut(() => this.state.status);
    error = Ut(() => this.state.status === "error" ? this.state.error : void 0);
    isLoading = Ut(() => this.state.status === "loading" || this.state.status === "reloading");
    isValueDefined = Ut(() => this.state.status !== "error" && this.state.value !== void 0);
    hasValue() { return this.isValueDefined(); }
};
function rL(e, t) { let n = W(e), o = t.elementInjector || ti(); return new bt(n).create(o, t.projectableNodes, t.hostElement, t.environmentInjector, t.directives, t.bindings); }
function iL(e) { let t = W(e); if (!t)
    return null; let n = new bt(t); return { get selector() { return n.selector; }, get type() { return n.componentType; }, get inputs() { return n.inputs; }, get outputs() { return n.outputs; }, get ngContentSelectors() { return n.ngContentSelectors; }, get isStandalone() { return t.standalone; }, get isSignal() { return t.signals; } }; }
function sL(...e) { return e.reduce((t, n) => Object.assign(t, n, { providers: [...t.providers, ...n.providers] }), { providers: [] }); }
var aL = new _("", { providedIn: "platform", factory: () => null }), cL = new _("", { providedIn: "platform", factory: () => null }), lL = new _("", { providedIn: "platform", factory: () => null });
export { rM as ANIMATION_MODULE_TYPE, Ar as APP_BOOTSTRAP_LISTENER, at as APP_ID, Ed as APP_INITIALIZER, Dd as ApplicationInitStatus, FO as ApplicationModule, ke as ApplicationRef, ag as Attribute, FD as COMPILER_OPTIONS, iM as CSP_NONCE, RM as CUSTOM_ELEMENTS_SCHEMA, ms as ChangeDetectionStrategy, ok as ChangeDetectorRef, vR as Compiler, Gl as CompilerFactory, dR as Component, ea as ComponentFactory, _r as ComponentFactoryResolver, ky as ComponentRef, vO as ContentChild, yO as ContentChildren, DR as DEFAULT_CURRENCY_CODE, Vt as DOCUMENT, sn as DebugElement, ql as DebugEventListener, ur as DebugNode, vf as DefaultIterableDiffer, Ao as DestroyRef, PD as Directive, gt as ENVIRONMENT_INITIALIZER, pr as ElementRef, eC as EmbeddedViewRef, mt as EnvironmentInjector, hc as ErrorHandler, VC as EventEmitter, lO as HOST_TAG_NAME, Vh as Host, VD as HostAttributeToken, gR as HostBinding, mR as HostListener, LC as INJECTOR, Ph as Inject, bT as Injectable, _ as InjectionToken, De as Injector, pR as Input, yC as IterableDiffers, vC as KeyValueDiffers, ff as LOCALE_ID, _m as MAX_ANIMATION_TIMEOUT, jD as MissingTranslationStrategy, fs as ModuleWithComponentFactories, kM as NO_ERRORS_SCHEMA, yR as NgModule, dv as NgModuleFactory, Hn as NgModuleRef, B as NgZone, Fh as Optional, hR as Output, Ic as OutputEmitterRef, oM as PLATFORM_ID, Jl as PLATFORM_INITIALIZER, yc as PendingTasks, fR as Pipe, pC as PlatformRef, fo as Query, zi as QueryList, aL as REQUEST, lL as REQUEST_CONTEXT, cL as RESPONSE_INIT, I_ as Renderer2, nr as RendererFactory2, Zi as RendererStyleFlags2, xy as Sanitizer, ln as SecurityContext, Hh as Self, ji as SimpleChange, jh as SkipSelf, CR as TRANSLATIONS, TR as TRANSLATIONS_FORMAT, Xo as TemplateRef, nb as Testability, Vv as TestabilityRegistry, qn as TransferState, Bh as Type, bC as VERSION, SC as Version, EO as ViewChild, IO as ViewChildren, oa as ViewContainerRef, Ae as ViewEncapsulation, yf as ViewRef, km as afterEveryRender, xu as afterNextRender, nL as afterRenderEffect, MR as asNativeElements, HC as assertInInjectionContext, UC as assertNotInReactiveContext, zR as assertPlatform, VO as booleanAttribute, Ut as computed, hO as contentChild, gO as contentChildren, rL as createComponent, cd as createEnvironmentInjector, fv as createNgModule, gS as createNgModuleRef, $R as createPlatform, UR as createPlatformFactory, CO as destroyPlatform, WC as effect, wO as enableProdMode, JS as enableProfiling, Ra as forwardRef, dr as getDebugNode, kO as getModuleFactory, xO as getNgModuleById, Ma as getPlatform, FC as importProvidersFrom, E as inject, dO as input, Gy as inputBinding, NO as isDevMode, md as isSignal, mo as isStandalone, yd as isWritableSignal, QC as linkedSignal, et as makeEnvironmentProviders, aM as makeStateKey, sL as mergeApplicationConfig, mO as model, BO as numberAttribute, uO as output, qy as outputBinding, PO as platformCore, Uv as provideAppInitializer, BC as provideBrowserGlobalErrorListeners, MO as provideCheckNoChangesConfig, PC as provideEnvironmentInitializer, fN as provideNgReflectAttributes, TO as providePlatformInitializer, RO as provideStabilityDebugging, DO as provideZoneChangeDetection, IR as provideZonelessChangeDetection, iL as reflectComponentType, z as resolveForwardRef, ZC as resource, oL as resourceFromSnapshots, ni as runInInjectionContext, Bv as setTestabilityGetter, mc as signal, B_ as twoWayBinding, qC as untracked, fO as viewChild, pO as viewChildren, wm as \u0275ANIMATIONS_DISABLED, vg as \u0275AcxChangeDetectionStrategy, Ig as \u0275AcxViewEncapsulation, Ps as \u0275AfterRenderManager, _O as \u0275CLIENT_RENDER_MODE_FLAG, H as \u0275CONTAINER_HEADER_OFFSET, Ct as \u0275ChangeDetectionScheduler, ea as \u0275ComponentFactory, KS as \u0275Console, xr as \u0275DEFAULT_LOCALE_ID, Ov as \u0275DEFER_BLOCK_CONFIG, GS as \u0275DEFER_BLOCK_DEPENDENCY_INTERCEPTOR, ct as \u0275DEHYDRATED_BLOCK_REGISTRY, pd as \u0275DeferBlockBehavior, $ as \u0275DeferBlockState, jR as \u0275ENABLE_ROOT_COMPONENT_BOOTSTRAP, Ng as \u0275EVENT_REPLAY_QUEUE, vc as \u0275EffectScheduler, bR as \u0275Framework, Vg as \u0275HydrationStatus, sM as \u0275IMAGE_CONFIG, Eg as \u0275IMAGE_CONFIG_DEFAULTS, Ff as \u0275INJECTOR_SCOPE, cO as \u0275INPUT_SIGNAL_BRAND_WRITE_TYPE, $t as \u0275INTERNAL_APPLICATION_ERROR_HANDLER, cM as \u0275IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, cn as \u0275IS_HYDRATION_DOM_REUSE_ENABLED, iu as \u0275IS_INCREMENTAL_HYDRATION_ENABLED, Ir as \u0275JSACTION_BLOCK_ELEMENT_MAP, lu as \u0275JSACTION_EVENT_CONTRACT, Wi as \u0275LContext, Bn as \u0275LocaleDataIndex, pn as \u0275NG_COMP_DEF, qr as \u0275NG_DIR_DEF, kt as \u0275NG_ELEMENT_ID, ka as \u0275NG_INJ_DEF, xa as \u0275NG_MOD_DEF, Qr as \u0275NG_PIPE_DEF, Gr as \u0275NG_PROV_DEF, xi as \u0275NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, L as \u0275NO_CHANGE, Vn as \u0275NgModuleFactory, pc as \u0275NoopNgZone, vk as \u0275PERFORMANCE_MARK_PREFIX, PR as \u0275PROVIDED_NG_ZONE, zC as \u0275PROVIDED_ZONELESS, Bt as \u0275PendingTasksInternal, R as \u0275ProfilerEvent, ja as \u0275R3Injector, Hi as \u0275ReflectionCapabilities, bt as \u0275Render3ComponentFactory, os as \u0275Render3ComponentRef, jn as \u0275Render3NgModuleRef, YC as \u0275ResourceImpl, w as \u0275RuntimeError, Xe as \u0275SIGNAL, Pg as \u0275SSR_CONTENT_INTEGRITY_MARKER, Hv as \u0275TESTABILITY, jv as \u0275TESTABILITY_GETTER, xv as \u0275TimerScheduler, Ls as \u0275TracingAction, dn as \u0275TracingService, St as \u0275ViewRef, $r as \u0275XSS_SECURITY_URL, In as \u0275ZONELESS_ENABLED, am as \u0275_sanitizeHtml, bs as \u0275_sanitizeUrl, Xt as \u0275allLeavingAnimations, Xn as \u0275allowSanitizationBypassAndThrow, jO as \u0275annotateForHydration, GO as \u0275assertType, HM as \u0275bypassSanitizationTrustHtml, $M as \u0275bypassSanitizationTrustResourceUrl, VM as \u0275bypassSanitizationTrustScript, jM as \u0275bypassSanitizationTrustStyle, BM as \u0275bypassSanitizationTrustUrl, uS as \u0275clearResolutionOfComponentResourcesQueue, wD as \u0275compileComponent, df as \u0275compileDirective, MD as \u0275compileNgModule, ND as \u0275compileNgModuleDefs, OR as \u0275compileNgModuleFactory, LD as \u0275compilePipe, La as \u0275convertToBitFlags, jC as \u0275createInjector, WR as \u0275createOrReusePlatformInjector, OO as \u0275defaultIterableDiffers, LO as \u0275defaultKeyValueDiffers, Pn as \u0275depsTracker, jy as \u0275devModeEqual, WO as \u0275disableProfiling, zO as \u0275enableProfiling, KC as \u0275encapsulateResourceError, Pd as \u0275findLocaleData, CD as \u0275flushModuleScopingQueueAsMuchAsPossible, bf as \u0275formatRuntimeError, JA as \u0275generateStandaloneInDeclarationsError, YS as \u0275getAsyncClassMetadataFn, $_ as \u0275getClosestComponentName, W as \u0275getComponentDef, Pi as \u0275getDeferBlocks, QT as \u0275getDirectives, vs as \u0275getDocument, YT as \u0275getHostElement, RC as \u0275getInjectableDef, ye as \u0275getLContext, Rb as \u0275getLocaleCurrencyCode, bI as \u0275getLocalePluralCase, GC as \u0275getOutputDestroyRef, em as \u0275getSanitizationBypassType, XS as \u0275getTransferState, OM as \u0275getUnknownElementStrictMode, PM as \u0275getUnknownPropertyStrictMode, ve as \u0275global, Qy as \u0275inferTagNameFromDefinition, rk as \u0275injectChangeDetectorRef, HO as \u0275internalCreateApplication, FR as \u0275internalProvideZoneChangeDetection, zv as \u0275isBoundToModule, lS as \u0275isComponentDefPendingResolution, OC as \u0275isEnvironmentProviders, kC as \u0275isInjectable, Wt as \u0275isNgModule, Id as \u0275isPromise, $v as \u0275isSubscribable, Cw as \u0275isViewDirty, Tw as \u0275markForRefresh, Ze as \u0275noSideEffects, lf as \u0275patchComponentDefWithScope, q as \u0275performanceMarkFeature, aa as \u0275promiseWithResolvers, ma as \u0275provideZonelessChangeDetectionInternal, eb as \u0275publishExternalGlobalUtil, IM as \u0275readHydrationInfo, Ab as \u0275registerLocaleData, nt as \u0275renderDeferBlockState, tR as \u0275resetCompiledComponents, DM as \u0275resetIncrementalHydrationEnabledWarnedForTests, YA as \u0275resetJitOptions, av as \u0275resolveComponentResources, dS as \u0275restoreComponentResolutionQueue, hS as \u0275setAllowDuplicateNgModuleIdsForTest, _C as \u0275setAlternateWeakRefImpl, vD as \u0275setClassDebugInfo, gd as \u0275setClassMetadata, Fv as \u0275setClassMetadataAsync, wC as \u0275setCurrentInjector, tM as \u0275setDocument, xC as \u0275setInjectorProfilerContext, xI as \u0275setLocaleId, xM as \u0275setUnknownElementStrictMode, LM as \u0275setUnknownPropertyStrictMode, $O as \u0275startMeasuring, UO as \u0275stopMeasuring, No as \u0275store, Ur as \u0275stringify, uf as \u0275transitiveScopesFor, ca as \u0275triggerResourceLoading, AC as \u0275truncateMiddle, kb as \u0275unregisterLocaleData, lt as \u0275unwrapSafeValue, $C as \u0275unwrapWritableSignal, SO as \u0275withDomHydration, GR as \u0275withEventReplay, bO as \u0275withI18nSupport, AO as \u0275withIncrementalHydration, Ev as \u0275\u0275ControlFeature, GE as \u0275\u0275ExternalStylesFeature, lo as \u0275\u0275FactoryTarget, Dv as \u0275\u0275HostDirectivesFeature, ud as \u0275\u0275InheritDefinitionFeature, Uh as \u0275\u0275NgOnChangesFeature, WE as \u0275\u0275ProvidersFeature, Mm as \u0275\u0275advance, jo as \u0275\u0275animateEnter, Vo as \u0275\u0275animateEnterListener, Bo as \u0275\u0275animateLeave, ss as \u0275\u0275animateLeaveListener, Md as \u0275\u0275ariaProperty, $E as \u0275\u0275arrowFunction, RE as \u0275\u0275attachSourceLocations, Nd as \u0275\u0275attribute, aE as \u0275\u0275classMap, Zd as \u0275\u0275classProp, II as \u0275\u0275componentInstance, DI as \u0275\u0275conditional, la as \u0275\u0275conditionalBranchCreate, EI as \u0275\u0275conditionalCreate, zd as \u0275\u0275contentQuery, Gd as \u0275\u0275contentQuerySignal, Uy as \u0275\u0275control, By as \u0275\u0275controlCreate, cf as \u0275\u0275declareLet, Yv as \u0275\u0275defer, Pv as \u0275\u0275deferEnableTimerScheduling, eI as \u0275\u0275deferHydrateNever, fI as \u0275\u0275deferHydrateOnHover, oI as \u0275\u0275deferHydrateOnIdle, sI as \u0275\u0275deferHydrateOnImmediate, gI as \u0275\u0275deferHydrateOnInteraction, lI as \u0275\u0275deferHydrateOnTimer, vI as \u0275\u0275deferHydrateOnViewport, Xv as \u0275\u0275deferHydrateWhen, uI as \u0275\u0275deferOnHover, tI as \u0275\u0275deferOnIdle, rI as \u0275\u0275deferOnImmediate, pI as \u0275\u0275deferOnInteraction, aI as \u0275\u0275deferOnTimer, mI as \u0275\u0275deferOnViewport, dI as \u0275\u0275deferPrefetchOnHover, nI as \u0275\u0275deferPrefetchOnIdle, iI as \u0275\u0275deferPrefetchOnImmediate, hI as \u0275\u0275deferPrefetchOnInteraction, cI as \u0275\u0275deferPrefetchOnTimer, yI as \u0275\u0275deferPrefetchOnViewport, Jv as \u0275\u0275deferPrefetchWhen, Kv as \u0275\u0275deferWhen, hv as \u0275\u0275defineComponent, mv as \u0275\u0275defineDirective, V as \u0275\u0275defineInjectable, go as \u0275\u0275defineInjector, ld as \u0275\u0275defineNgModule, yv as \u0275\u0275definePipe, io as \u0275\u0275directiveInject, Za as \u0275\u0275disableBindings, Sd as \u0275\u0275domElement, kd as \u0275\u0275domElementContainer, Rd as \u0275\u0275domElementContainerEnd, ha as \u0275\u0275domElementContainerStart, fa as \u0275\u0275domElementEnd, da as \u0275\u0275domElementStart, $d as \u0275\u0275domListener, Od as \u0275\u0275domProperty, fd as \u0275\u0275domTemplate, _d as \u0275\u0275element, Ad as \u0275\u0275elementContainer, kr as \u0275\u0275elementContainerEnd, pa as \u0275\u0275elementContainerStart, ua as \u0275\u0275elementEnd, ar as \u0275\u0275elementStart, Qa as \u0275\u0275enableBindings, yD as \u0275\u0275getComponentDepsFactory, SI as \u0275\u0275getCurrentView, ig as \u0275\u0275getInheritedFactory, ID as \u0275\u0275getReplaceMetadataURL, WI as \u0275\u0275i18n, qI as \u0275\u0275i18nApply, GI as \u0275\u0275i18nAttributes, Hd as \u0275\u0275i18nEnd, jd as \u0275\u0275i18nExp, QI as \u0275\u0275i18nPostprocess, Fd as \u0275\u0275i18nStart, Oe as \u0275\u0275inject, hs as \u0275\u0275injectAttribute, kE as \u0275\u0275interpolate, xE as \u0275\u0275interpolate1, OE as \u0275\u0275interpolate2, LE as \u0275\u0275interpolate3, PE as \u0275\u0275interpolate4, FE as \u0275\u0275interpolate5, HE as \u0275\u0275interpolate6, jE as \u0275\u0275interpolate7, VE as \u0275\u0275interpolate8, BE as \u0275\u0275interpolateV, Oy as \u0275\u0275invalidFactory, Yr as \u0275\u0275invalidFactoryDep, Vd as \u0275\u0275listener, XI as \u0275\u0275loadQuery, dc as \u0275\u0275namespaceHTML, uc as \u0275\u0275namespaceMathML, lc as \u0275\u0275namespaceSVG, ZI as \u0275\u0275nextContext, QO as \u0275\u0275ngDeclareClassMetadata, ZO as \u0275\u0275ngDeclareClassMetadataAsync, YO as \u0275\u0275ngDeclareComponent, qO as \u0275\u0275ngDeclareDirective, KO as \u0275\u0275ngDeclareFactory, JO as \u0275\u0275ngDeclareInjectable, XO as \u0275\u0275ngDeclareInjector, eL as \u0275\u0275ngDeclareNgModule, tL as \u0275\u0275ngDeclarePipe, uD as \u0275\u0275pipe, dD as \u0275\u0275pipeBind1, fD as \u0275\u0275pipeBind2, pD as \u0275\u0275pipeBind3, hD as \u0275\u0275pipeBind4, gD as \u0275\u0275pipeBindV, KI as \u0275\u0275projection, YI as \u0275\u0275projectionDef, wd as \u0275\u0275property, ZE as \u0275\u0275pureFunction0, YE as \u0275\u0275pureFunction1, KE as \u0275\u0275pureFunction2, JE as \u0275\u0275pureFunction3, XE as \u0275\u0275pureFunction4, eD as \u0275\u0275pureFunction5, tD as \u0275\u0275pureFunction6, nD as \u0275\u0275pureFunction7, oD as \u0275\u0275pureFunction8, rD as \u0275\u0275pureFunctionV, eE as \u0275\u0275queryAdvance, JI as \u0275\u0275queryRefresh, AE as \u0275\u0275readContextLet, tE as \u0275\u0275reference, sd as \u0275\u0275registerNgModuleType, NI as \u0275\u0275repeater, MI as \u0275\u0275repeaterCreate, TI as \u0275\u0275repeaterTrackByIdentity, CI as \u0275\u0275repeaterTrackByIndex, ED as \u0275\u0275replaceMetadata, Ja as \u0275\u0275resetView, Cu as \u0275\u0275resolveBody, Em as \u0275\u0275resolveDocument, Im as \u0275\u0275resolveWindow, Ka as \u0275\u0275restoreView, fm as \u0275\u0275sanitizeHtml, Eu as \u0275\u0275sanitizeResourceUrl, hm as \u0275\u0275sanitizeScript, pm as \u0275\u0275sanitizeStyle, Iu as \u0275\u0275sanitizeUrl, ym as \u0275\u0275sanitizeUrlOrResourceUrl, qE as \u0275\u0275setComponentScope, QE as \u0275\u0275setNgModuleScope, bE as \u0275\u0275storeLet, sE as \u0275\u0275styleMap, Qd as \u0275\u0275styleProp, Bd as \u0275\u0275syntheticHostListener, Ld as \u0275\u0275syntheticHostProperty, dd as \u0275\u0275template, mD as \u0275\u0275templateRefExtractor, gE as \u0275\u0275text, Yd as \u0275\u0275textInterpolate, ga as \u0275\u0275textInterpolate1, Kd as \u0275\u0275textInterpolate2, Jd as \u0275\u0275textInterpolate3, Xd as \u0275\u0275textInterpolate4, ef as \u0275\u0275textInterpolate5, tf as \u0275\u0275textInterpolate6, nf as \u0275\u0275textInterpolate7, of as \u0275\u0275textInterpolate8, rf as \u0275\u0275textInterpolateV, gm as \u0275\u0275trustConstantHtml, mm as \u0275\u0275trustConstantResourceUrl, _E as \u0275\u0275twoWayBindingSet, af as \u0275\u0275twoWayListener, sf as \u0275\u0275twoWayProperty, Du as \u0275\u0275validateAttribute, Wd as \u0275\u0275viewQuery, qd as \u0275\u0275viewQuerySignal };
/*! Bundled license information:

@angular/core/fesm2022/_debug_node-chunk.mjs:
@angular/core/fesm2022/core.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
