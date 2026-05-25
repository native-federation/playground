var Fn = Object.defineProperty, qn = Object.defineProperties;
var Bn = Object.getOwnPropertyDescriptors;
var Sr = Object.getOwnPropertySymbols;
var Vn = Object.prototype.hasOwnProperty, Gn = Object.prototype.propertyIsEnumerable;
var Cr = (t, n, e) => n in t ? Fn(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e, l = (t, n) => { for (var e in n ||= {})
    Vn.call(n, e) && Cr(t, e, n[e]); if (Sr)
    for (var e of Sr(n))
        Gn.call(n, e) && Cr(t, e, n[e]); return t; }, E = (t, n) => qn(t, Bn(n));
var R = (t, n, e) => new Promise((r, i) => { var o = c => { try {
    a(e.next(c));
}
catch (u) {
    i(u);
} }, s = c => { try {
    a(e.throw(c));
}
catch (u) {
    i(u);
} }, a = c => c.done ? r(c.value) : Promise.resolve(c.value).then(o, s); a((e = e.apply(t, n)).next()); });
import { DOCUMENT as Wn, Location as Jt } from "@angular/common";
import * as y from "@angular/core";
import { \u0275isPromise as Qn, \u0275RuntimeError as A, computed as Kn, InjectionToken as ne, EventEmitter as Ye, input as Yn, inject as g, ViewContainerRef as Zn, ChangeDetectorRef as Jn, reflectComponentType as Xn, runInInjectionContext as L, \u0275isInjectable as ei, \u0275isNgModule as Ka, isStandalone as Ya, createEnvironmentInjector as ti, Compiler as ri, NgModuleFactory as ni, afterNextRender as ii, signal as wr, EnvironmentInjector as Xt, DestroyRef as oi, untracked as Ue, \u0275Console as ai, \u0275PendingTasksInternal as si, \u0275INTERNAL_APPLICATION_ERROR_HANDLER as ci, \u0275formatRuntimeError as ui } from "@angular/core";
import { isObservable as Dr, from as G, of as v, BehaviorSubject as z, combineLatest as Nr, EmptyError as li, Observable as di, concat as hi, defer as er, pipe as fi, EMPTY as $, throwError as pi, Subject as Pt, Subscription as gi } from "rxjs";
import { first as he, map as D, switchMap as B, take as Le, startWith as vi, filter as xe, takeUntil as Lt, mergeMap as ue, concatMap as _r, tap as V, takeLast as Ur, catchError as Or, finalize as mi } from "rxjs/operators";
import * as Pr from "@angular/platform-browser";
var p = "primary", Be = Symbol("RouteTitle"), xt = class {
    params;
    constructor(n) { this.params = n || {}; }
    has(n) { return Object.prototype.hasOwnProperty.call(this.params, n); }
    get(n) { if (this.has(n)) {
        let e = this.params[n];
        return Array.isArray(e) ? e[0] : e;
    } return null; }
    getAll(n) { if (this.has(n)) {
        let e = this.params[n];
        return Array.isArray(e) ? e : [e];
    } return []; }
    get keys() { return Object.keys(this.params); }
};
function le(t) { return new xt(t); }
function Nt(t, n, e) { for (let r = 0; r < t.length; r++) {
    let i = t[r], o = n[r];
    if (i[0] === ":")
        e[i.substring(1)] = o;
    else if (i !== o.path)
        return !1;
} return !0; }
function Lr(t, n, e) { let r = e.path.split("/"), i = r.indexOf("**"); if (i === -1) {
    if (r.length > t.length || e.pathMatch === "full" && (n.hasChildren() || r.length < t.length))
        return null;
    let c = {}, u = t.slice(0, r.length);
    return Nt(r, u, c) ? { consumed: u, posParams: c } : null;
} if (i !== r.lastIndexOf("**"))
    return null; let o = r.slice(0, i), s = r.slice(i + 1); if (o.length + s.length > t.length || e.pathMatch === "full" && n.hasChildren() && e.path !== "**")
    return null; let a = {}; return !Nt(o, t.slice(0, o.length), a) || !Nt(s, t.slice(t.length - s.length), a) ? null : { consumed: t, posParams: a }; }
function rt(t) { return new Promise((n, e) => { t.pipe(he()).subscribe({ next: r => n(r), error: r => e(r) }); }); }
function yi(t, n) { if (t.length !== n.length)
    return !1; for (let e = 0; e < t.length; ++e)
    if (!W(t[e], n[e]))
        return !1; return !0; }
function W(t, n) { let e = t ? jt(t) : void 0, r = n ? jt(n) : void 0; if (!e || !r || e.length != r.length)
    return !1; let i; for (let o = 0; o < e.length; o++)
    if (i = e[o], !xr(t[i], n[i]))
        return !1; return !0; }
function jt(t) { return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)]; }
function xr(t, n) { if (Array.isArray(t) && Array.isArray(n)) {
    if (t.length !== n.length)
        return !1;
    let e = [...t].sort(), r = [...n].sort();
    return e.every((i, o) => r[o] === i);
}
else
    return t === n; }
function Ri(t) { return t.length > 0 ? t[t.length - 1] : null; }
function fe(t) { return Dr(t) ? t : Qn(t) ? G(Promise.resolve(t)) : v(t); }
function jr(t) { return Dr(t) ? rt(t) : Promise.resolve(t); }
var Si = { exact: $r, subset: zr }, kr = { exact: Ci, subset: wi, ignored: () => !0 }, tr = { paths: "exact", fragment: "ignored", matrixParams: "ignored", queryParams: "exact" }, je = { paths: "subset", fragment: "ignored", matrixParams: "ignored", queryParams: "subset" };
function rr(t, n, e) { let r = t instanceof T ? t : n.parseUrl(t); return Kn(() => kt(n.lastSuccessfulNavigation()?.finalUrl ?? new T, r, l(l({}, je), e))); }
function kt(t, n, e) { return Si[e.paths](t.root, n.root, e.matrixParams) && kr[e.queryParams](t.queryParams, n.queryParams) && !(e.fragment === "exact" && t.fragment !== n.fragment); }
function Ci(t, n) { return W(t, n); }
function $r(t, n, e) { if (!ce(t.segments, n.segments) || !Xe(t.segments, n.segments, e) || t.numberOfChildren !== n.numberOfChildren)
    return !1; for (let r in n.children)
    if (!t.children[r] || !$r(t.children[r], n.children[r], e))
        return !1; return !0; }
function wi(t, n) { return Object.keys(n).length <= Object.keys(t).length && Object.keys(n).every(e => xr(t[e], n[e])); }
function zr(t, n, e) { return Hr(t, n, n.segments, e); }
function Hr(t, n, e, r) { if (t.segments.length > e.length) {
    let i = t.segments.slice(0, e.length);
    return !(!ce(i, e) || n.hasChildren() || !Xe(i, e, r));
}
else if (t.segments.length === e.length) {
    if (!ce(t.segments, e) || !Xe(t.segments, e, r))
        return !1;
    for (let i in n.children)
        if (!t.children[i] || !zr(t.children[i], n.children[i], r))
            return !1;
    return !0;
}
else {
    let i = e.slice(0, t.segments.length), o = e.slice(t.segments.length);
    return !ce(t.segments, i) || !Xe(t.segments, i, r) || !t.children[p] ? !1 : Hr(t.children[p], n, o, r);
} }
function Xe(t, n, e) { return n.every((r, i) => kr[e](t[i].parameters, r.parameters)); }
var T = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(n = new m([], {}), e = {}, r = null) { this.root = n, this.queryParams = e, this.fragment = r; }
    get queryParamMap() { return this._queryParamMap ??= le(this.queryParams), this._queryParamMap; }
    toString() { return Ei.serialize(this); }
}, m = class {
    segments;
    children;
    parent = null;
    constructor(n, e) { this.segments = n, this.children = e, Object.values(e).forEach(r => r.parent = this); }
    hasChildren() { return this.numberOfChildren > 0; }
    get numberOfChildren() { return Object.keys(this.children).length; }
    toString() { return et(this); }
}, ee = class {
    path;
    parameters;
    _parameterMap;
    constructor(n, e) { this.path = n, this.parameters = e; }
    get parameterMap() { return this._parameterMap ??= le(this.parameters), this._parameterMap; }
    toString() { return qr(this); }
};
function bi(t, n) { return ce(t, n) && t.every((e, r) => W(e.parameters, n[r].parameters)); }
function ce(t, n) { return t.length !== n.length ? !1 : t.every((e, r) => e.path === n[r].path); }
function Ii(t, n) { let e = []; return Object.entries(t.children).forEach(([r, i]) => { r === p && (e = e.concat(n(i, r))); }), Object.entries(t.children).forEach(([r, i]) => { r !== p && (e = e.concat(n(i, r))); }), e; }
var ie = (() => { class t {
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: () => new Z, providedIn: "root" });
} return t; })(), Z = class {
    parse(n) { let e = new zt(n); return new T(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment()); }
    serialize(n) { let e = `/${Ne(n.root, !0)}`, r = Ti(n.queryParams), i = typeof n.fragment == "string" ? `#${Ai(n.fragment)}` : ""; return `${e}${r}${i}`; }
}, Ei = new Z;
function et(t) { return t.segments.map(n => qr(n)).join("/"); }
function Ne(t, n) { if (!t.hasChildren())
    return et(t); if (n) {
    let e = t.children[p] ? Ne(t.children[p], !1) : "", r = [];
    return Object.entries(t.children).forEach(([i, o]) => { i !== p && r.push(`${i}:${Ne(o, !1)}`); }), r.length > 0 ? `${e}(${r.join("//")})` : e;
}
else {
    let e = Ii(t, (r, i) => i === p ? [Ne(t.children[p], !1)] : [`${i}:${Ne(r, !1)}`]);
    return Object.keys(t.children).length === 1 && t.children[p] != null ? `${et(t)}/${e[0]}` : `${et(t)}/(${e.join("//")})`;
} }
function Fr(t) { return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ","); }
function Ze(t) { return Fr(t).replace(/%3B/gi, ";"); }
function Ai(t) { return encodeURI(t); }
function $t(t) { return Fr(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&"); }
function tt(t) { return decodeURIComponent(t); }
function br(t) { return tt(t.replace(/\+/g, "%20")); }
function qr(t) { return `${$t(t.path)}${Mi(t.parameters)}`; }
function Mi(t) { return Object.entries(t).map(([n, e]) => `;${$t(n)}=${$t(e)}`).join(""); }
function Ti(t) { let n = Object.entries(t).map(([e, r]) => Array.isArray(r) ? r.map(i => `${Ze(e)}=${Ze(i)}`).join("&") : `${Ze(e)}=${Ze(r)}`).filter(e => e); return n.length ? `?${n.join("&")}` : ""; }
var Di = /^[^\/()?;#]+/;
function _t(t) { let n = t.match(Di); return n ? n[0] : ""; }
var Ni = /^[^\/()?;=#]+/;
function _i(t) { let n = t.match(Ni); return n ? n[0] : ""; }
var Ui = /^[^=?&#]+/;
function Oi(t) { let n = t.match(Ui); return n ? n[0] : ""; }
var Pi = /^[^&#]+/;
function Li(t) { let n = t.match(Pi); return n ? n[0] : ""; }
var zt = class {
    url;
    remaining;
    constructor(n) { this.url = n, this.remaining = n; }
    parseRootSegment() { for (; this.consumeOptional("/");)
        ; return this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#") ? new m([], {}) : new m([], this.parseChildren()); }
    parseQueryParams() { let n = {}; if (this.consumeOptional("?"))
        do
            this.parseQueryParam(n);
        while (this.consumeOptional("&")); return n; }
    parseFragment() { return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null; }
    parseChildren(n = 0) { if (n > 50)
        throw new A(4010, !1); if (this.remaining === "")
        return {}; this.consumeOptional("/"); let e = []; for (this.peekStartsWith("(") || e.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");)
        this.capture("/"), e.push(this.parseSegment()); let r = {}; this.peekStartsWith("/(") && (this.capture("/"), r = this.parseParens(!0, n)); let i = {}; return this.peekStartsWith("(") && (i = this.parseParens(!1, n)), (e.length > 0 || Object.keys(r).length > 0) && (i[p] = new m(e, r)), i; }
    parseSegment() { let n = _t(this.remaining); if (n === "" && this.peekStartsWith(";"))
        throw new A(4009, !1); return this.capture(n), new ee(tt(n), this.parseMatrixParams()); }
    parseMatrixParams() { let n = {}; for (; this.consumeOptional(";");)
        this.parseParam(n); return n; }
    parseParam(n) { let e = _i(this.remaining); if (!e)
        return; this.capture(e); let r = ""; if (this.consumeOptional("=")) {
        let i = _t(this.remaining);
        i && (r = i, this.capture(r));
    } n[tt(e)] = tt(r); }
    parseQueryParam(n) { let e = Oi(this.remaining); if (!e)
        return; this.capture(e); let r = ""; if (this.consumeOptional("=")) {
        let s = Li(this.remaining);
        s && (r = s, this.capture(r));
    } let i = br(e), o = br(r); if (n.hasOwnProperty(i)) {
        let s = n[i];
        Array.isArray(s) || (s = [s], n[i] = s), s.push(o);
    }
    else
        n[i] = o; }
    parseParens(n, e) { let r = {}; for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
        let i = _t(this.remaining), o = this.remaining[i.length];
        if (o !== "/" && o !== ")" && o !== ";")
            throw new A(4010, !1);
        let s;
        i.indexOf(":") > -1 ? (s = i.slice(0, i.indexOf(":")), this.capture(s), this.capture(":")) : n && (s = p);
        let a = this.parseChildren(e + 1);
        r[s ?? p] = Object.keys(a).length === 1 && a[p] ? a[p] : new m([], a), this.consumeOptional("//");
    } return r; }
    peekStartsWith(n) { return this.remaining.startsWith(n); }
    consumeOptional(n) { return this.peekStartsWith(n) ? (this.remaining = this.remaining.substring(n.length), !0) : !1; }
    capture(n) { if (!this.consumeOptional(n))
        throw new A(4011, !1); }
};
function Br(t) { return t.segments.length > 0 ? new m([], { [p]: t }) : t; }
function Vr(t) { let n = {}; for (let [r, i] of Object.entries(t.children)) {
    let o = Vr(i);
    if (r === p && o.segments.length === 0 && o.hasChildren())
        for (let [s, a] of Object.entries(o.children))
            n[s] = a;
    else
        (o.segments.length > 0 || o.hasChildren()) && (n[r] = o);
} let e = new m(t.segments, n); return xi(e); }
function xi(t) { if (t.numberOfChildren === 1 && t.children[p]) {
    let n = t.children[p];
    return new m(t.segments.concat(n.segments), n.children);
} return t; }
function te(t) { return t instanceof T; }
function Gr(t, n, e = null, r = null, i = new Z) { let o = Wr(t); return Qr(o, n, e, r, i); }
function Wr(t) { let n; function e(o) { let s = {}; for (let c of o.children) {
    let u = e(c);
    s[c.outlet] = u;
} let a = new m(o.url, s); return o === t && (n = a), a; } let r = e(t.root), i = Br(r); return n ?? i; }
function Qr(t, n, e, r, i) { let o = t; for (; o.parent;)
    o = o.parent; if (n.length === 0)
    return Ut(o, o, o, e, r, i); let s = ji(n); if (s.toRoot())
    return Ut(o, o, new m([], {}), e, r, i); let a = ki(s, o, t), c = a.processChildren ? Oe(a.segmentGroup, a.index, s.commands) : Yr(a.segmentGroup, a.index, s.commands); return Ut(o, a.segmentGroup, c, e, r, i); }
function nt(t) { return typeof t == "object" && t != null && !t.outlets && !t.segmentPath; }
function ke(t) { return typeof t == "object" && t != null && t.outlets; }
function Ir(t, n, e) { t ||= "\u0275"; let r = new T; return r.queryParams = { [t]: n }, e.parse(e.serialize(r)).queryParams[t]; }
function Ut(t, n, e, r, i, o) { let s = {}; for (let [u, h] of Object.entries(r ?? {}))
    s[u] = Array.isArray(h) ? h.map(f => Ir(u, f, o)) : Ir(u, h, o); let a; t === n ? a = e : a = Kr(t, n, e); let c = Br(Vr(a)); return new T(c, s, i); }
function Kr(t, n, e) { let r = {}; return Object.entries(t.children).forEach(([i, o]) => { o === n ? r[i] = e : r[i] = Kr(o, n, e); }), new m(t.segments, r); }
var it = class {
    isAbsolute;
    numberOfDoubleDots;
    commands;
    constructor(n, e, r) { if (this.isAbsolute = n, this.numberOfDoubleDots = e, this.commands = r, n && r.length > 0 && nt(r[0]))
        throw new A(4003, !1); let i = r.find(ke); if (i && i !== Ri(r))
        throw new A(4004, !1); }
    toRoot() { return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"; }
};
function ji(t) { if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
    return new it(!0, 0, t); let n = 0, e = !1, r = t.reduce((i, o, s) => { if (typeof o == "object" && o != null) {
    if (o.outlets) {
        let a = {};
        return Object.entries(o.outlets).forEach(([c, u]) => { a[c] = typeof u == "string" ? u.split("/") : u; }), [...i, { outlets: a }];
    }
    if (o.segmentPath)
        return [...i, o.segmentPath];
} return typeof o != "string" ? [...i, o] : s === 0 ? (o.split("/").forEach((a, c) => { c == 0 && a === "." || (c == 0 && a === "" ? e = !0 : a === ".." ? n++ : a != "" && i.push(a)); }), i) : [...i, o]; }, []); return new it(e, n, r); }
var me = class {
    segmentGroup;
    processChildren;
    index;
    constructor(n, e, r) { this.segmentGroup = n, this.processChildren = e, this.index = r; }
};
function ki(t, n, e) { if (t.isAbsolute)
    return new me(n, !0, 0); if (!e)
    return new me(n, !1, NaN); if (e.parent === null)
    return new me(e, !0, 0); let r = nt(t.commands[0]) ? 0 : 1, i = e.segments.length - 1 + r; return $i(e, i, t.numberOfDoubleDots); }
function $i(t, n, e) { let r = t, i = n, o = e; for (; o > i;) {
    if (o -= i, r = r.parent, !r)
        throw new A(4005, !1);
    i = r.segments.length;
} return new me(r, !1, i - o); }
function zi(t) { return ke(t[0]) ? t[0].outlets : { [p]: t }; }
function Yr(t, n, e) { if (t ??= new m([], {}), t.segments.length === 0 && t.hasChildren())
    return Oe(t, n, e); let r = Hi(t, n, e), i = e.slice(r.commandIndex); if (r.match && r.pathIndex < t.segments.length) {
    let o = new m(t.segments.slice(0, r.pathIndex), {});
    return o.children[p] = new m(t.segments.slice(r.pathIndex), t.children), Oe(o, 0, i);
}
else
    return r.match && i.length === 0 ? new m(t.segments, {}) : r.match && !t.hasChildren() ? Ht(t, n, e) : r.match ? Oe(t, 0, i) : Ht(t, n, e); }
function Oe(t, n, e) { if (e.length === 0)
    return new m(t.segments, {}); {
    let r = zi(e), i = {};
    if (Object.keys(r).some(o => o !== p) && t.children[p] && t.numberOfChildren === 1 && t.children[p].segments.length === 0) {
        let o = Oe(t.children[p], n, e);
        return new m(t.segments, o.children);
    }
    return Object.entries(r).forEach(([o, s]) => { typeof s == "string" && (s = [s]), s !== null && (i[o] = Yr(t.children[o], n, s)); }), Object.entries(t.children).forEach(([o, s]) => { r[o] === void 0 && (i[o] = s); }), new m(t.segments, i);
} }
function Hi(t, n, e) { let r = 0, i = n, o = { match: !1, pathIndex: 0, commandIndex: 0 }; for (; i < t.segments.length;) {
    if (r >= e.length)
        return o;
    let s = t.segments[i], a = e[r];
    if (ke(a))
        break;
    let c = `${a}`, u = r < e.length - 1 ? e[r + 1] : null;
    if (i > 0 && c === void 0)
        break;
    if (c && u && typeof u == "object" && u.outlets === void 0) {
        if (!Ar(c, u, s))
            return o;
        r += 2;
    }
    else {
        if (!Ar(c, {}, s))
            return o;
        r++;
    }
    i++;
} return { match: !0, pathIndex: i, commandIndex: r }; }
function Ht(t, n, e) { let r = t.segments.slice(0, n), i = 0; for (; i < e.length;) {
    let o = e[i];
    if (ke(o)) {
        let c = Fi(o.outlets);
        return new m(r, c);
    }
    if (i === 0 && nt(e[0])) {
        let c = t.segments[n];
        r.push(new ee(c.path, Er(e[0]))), i++;
        continue;
    }
    let s = ke(o) ? o.outlets[p] : `${o}`, a = i < e.length - 1 ? e[i + 1] : null;
    s && a && nt(a) ? (r.push(new ee(s, Er(a))), i += 2) : (r.push(new ee(s, {})), i++);
} return new m(r, {}); }
function Fi(t) { let n = {}; return Object.entries(t).forEach(([e, r]) => { typeof r == "string" && (r = [r]), r !== null && (n[e] = Ht(new m([], {}), 0, r)); }), n; }
function Er(t) { let n = {}; return Object.entries(t).forEach(([e, r]) => n[e] = `${r}`), n; }
function Ar(t, n, e) { return t == e.path && W(n, e.parameters); }
var ye = "imperative", w = (function (t) { return t[t.NavigationStart = 0] = "NavigationStart", t[t.NavigationEnd = 1] = "NavigationEnd", t[t.NavigationCancel = 2] = "NavigationCancel", t[t.NavigationError = 3] = "NavigationError", t[t.RoutesRecognized = 4] = "RoutesRecognized", t[t.ResolveStart = 5] = "ResolveStart", t[t.ResolveEnd = 6] = "ResolveEnd", t[t.GuardsCheckStart = 7] = "GuardsCheckStart", t[t.GuardsCheckEnd = 8] = "GuardsCheckEnd", t[t.RouteConfigLoadStart = 9] = "RouteConfigLoadStart", t[t.RouteConfigLoadEnd = 10] = "RouteConfigLoadEnd", t[t.ChildActivationStart = 11] = "ChildActivationStart", t[t.ChildActivationEnd = 12] = "ChildActivationEnd", t[t.ActivationStart = 13] = "ActivationStart", t[t.ActivationEnd = 14] = "ActivationEnd", t[t.Scroll = 15] = "Scroll", t[t.NavigationSkipped = 16] = "NavigationSkipped", t; })(w || {}), P = class {
    id;
    url;
    constructor(n, e) { this.id = n, this.url = e; }
}, J = class extends P {
    type = w.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(n, e, r = "imperative", i = null) { super(n, e), this.navigationTrigger = r, this.restoredState = i; }
    toString() { return `NavigationStart(id: ${this.id}, url: '${this.url}')`; }
}, N = class extends P {
    urlAfterRedirects;
    type = w.NavigationEnd;
    constructor(n, e, r) { super(n, e), this.urlAfterRedirects = r; }
    toString() { return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`; }
}, b = (function (t) { return t[t.Redirect = 0] = "Redirect", t[t.SupersededByNewNavigation = 1] = "SupersededByNewNavigation", t[t.NoDataFromResolver = 2] = "NoDataFromResolver", t[t.GuardRejected = 3] = "GuardRejected", t[t.Aborted = 4] = "Aborted", t; })(b || {}), Se = (function (t) { return t[t.IgnoredSameUrlNavigation = 0] = "IgnoredSameUrlNavigation", t[t.IgnoredByUrlHandlingStrategy = 1] = "IgnoredByUrlHandlingStrategy", t; })(Se || {}), M = class extends P {
    reason;
    code;
    type = w.NavigationCancel;
    constructor(n, e, r, i) { super(n, e), this.reason = r, this.code = i; }
    toString() { return `NavigationCancel(id: ${this.id}, url: '${this.url}')`; }
};
function nr(t) { return t instanceof M && (t.code === b.Redirect || t.code === b.SupersededByNewNavigation); }
var F = class extends P {
    reason;
    code;
    type = w.NavigationSkipped;
    constructor(n, e, r, i) { super(n, e), this.reason = r, this.code = i; }
}, re = class extends P {
    error;
    target;
    type = w.NavigationError;
    constructor(n, e, r, i) { super(n, e), this.error = r, this.target = i; }
    toString() { return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`; }
}, $e = class extends P {
    urlAfterRedirects;
    state;
    type = w.RoutesRecognized;
    constructor(n, e, r, i) { super(n, e), this.urlAfterRedirects = r, this.state = i; }
    toString() { return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, ot = class extends P {
    urlAfterRedirects;
    state;
    type = w.GuardsCheckStart;
    constructor(n, e, r, i) { super(n, e), this.urlAfterRedirects = r, this.state = i; }
    toString() { return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, at = class extends P {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = w.GuardsCheckEnd;
    constructor(n, e, r, i, o) { super(n, e), this.urlAfterRedirects = r, this.state = i, this.shouldActivate = o; }
    toString() { return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`; }
}, st = class extends P {
    urlAfterRedirects;
    state;
    type = w.ResolveStart;
    constructor(n, e, r, i) { super(n, e), this.urlAfterRedirects = r, this.state = i; }
    toString() { return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, ct = class extends P {
    urlAfterRedirects;
    state;
    type = w.ResolveEnd;
    constructor(n, e, r, i) { super(n, e), this.urlAfterRedirects = r, this.state = i; }
    toString() { return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`; }
}, ut = class {
    route;
    type = w.RouteConfigLoadStart;
    constructor(n) { this.route = n; }
    toString() { return `RouteConfigLoadStart(path: ${this.route.path})`; }
}, lt = class {
    route;
    type = w.RouteConfigLoadEnd;
    constructor(n) { this.route = n; }
    toString() { return `RouteConfigLoadEnd(path: ${this.route.path})`; }
}, dt = class {
    snapshot;
    type = w.ChildActivationStart;
    constructor(n) { this.snapshot = n; }
    toString() { return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, ht = class {
    snapshot;
    type = w.ChildActivationEnd;
    constructor(n) { this.snapshot = n; }
    toString() { return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, ft = class {
    snapshot;
    type = w.ActivationStart;
    constructor(n) { this.snapshot = n; }
    toString() { return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, pt = class {
    snapshot;
    type = w.ActivationEnd;
    constructor(n) { this.snapshot = n; }
    toString() { return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`; }
}, Ce = class {
    routerEvent;
    position;
    anchor;
    scrollBehavior;
    type = w.Scroll;
    constructor(n, e, r, i) { this.routerEvent = n, this.position = e, this.anchor = r, this.scrollBehavior = i; }
    toString() { let n = this.position ? `${this.position[0]}, ${this.position[1]}` : null; return `Scroll(anchor: '${this.anchor}', position: '${n}')`; }
}, de = class {
}, we = class {
}, be = class {
    url;
    navigationBehaviorOptions;
    constructor(n, e) { this.url = n, this.navigationBehaviorOptions = e; }
};
function qi(t) { return !(t instanceof de) && !(t instanceof be) && !(t instanceof we); }
var gt = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() { return this.route?.snapshot._environmentInjector ?? this.rootInjector; }
    constructor(n) { this.rootInjector = n, this.children = new pe(this.rootInjector); }
}, pe = (() => { class t {
    rootInjector;
    contexts = new Map;
    constructor(e) { this.rootInjector = e; }
    onChildOutletCreated(e, r) { let i = this.getOrCreateContext(e); i.outlet = r, this.contexts.set(e, i); }
    onChildOutletDestroyed(e) { let r = this.getContext(e); r && (r.outlet = null, r.attachRef = null); }
    onOutletDeactivated() { let e = this.contexts; return this.contexts = new Map, e; }
    onOutletReAttached(e) { this.contexts = e; }
    getOrCreateContext(e) { let r = this.getContext(e); return r || (r = new gt(this.rootInjector), this.contexts.set(e, r)), r; }
    getContext(e) { return this.contexts.get(e) || null; }
    static \u0275fac = function (r) { return new (r || t)(y.\u0275\u0275inject(y.EnvironmentInjector)); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), vt = class {
    _root;
    constructor(n) { this._root = n; }
    get root() { return this._root.value; }
    parent(n) { let e = this.pathFromRoot(n); return e.length > 1 ? e[e.length - 2] : null; }
    children(n) { let e = Ft(n, this._root); return e ? e.children.map(r => r.value) : []; }
    firstChild(n) { let e = Ft(n, this._root); return e && e.children.length > 0 ? e.children[0].value : null; }
    siblings(n) { let e = qt(n, this._root); return e.length < 2 ? [] : e[e.length - 2].children.map(i => i.value).filter(i => i !== n); }
    pathFromRoot(n) { return qt(n, this._root).map(e => e.value); }
};
function Ft(t, n) { if (t === n.value)
    return n; for (let e of n.children) {
    let r = Ft(t, e);
    if (r)
        return r;
} return null; }
function qt(t, n) { if (t === n.value)
    return [n]; for (let e of n.children) {
    let r = qt(t, e);
    if (r.length)
        return r.unshift(n), r;
} return []; }
var O = class {
    value;
    children;
    constructor(n, e) { this.value = n, this.children = e; }
    toString() { return `TreeNode(${this.value})`; }
};
function ve(t) { let n = {}; return t && t.children.forEach(e => n[e.value.outlet] = e), n; }
var ze = class extends vt {
    snapshot;
    constructor(n, e) { super(n), this.snapshot = e, or(this, n); }
    toString() { return this.snapshot.toString(); }
};
function Zr(t, n) { let e = Bi(t, n), r = new z([new ee("", {})]), i = new z({}), o = new z({}), s = new z({}), a = new z(""), c = new Q(r, i, s, a, o, p, t, e.root); return c.snapshot = e.root, new ze(new O(c, []), e); }
function Bi(t, n) { let e = {}, r = {}, i = {}, s = new Ie([], e, i, "", r, p, t, null, {}, n); return new He("", new O(s, [])); }
var Q = class {
    urlSubject;
    paramsSubject;
    queryParamsSubject;
    fragmentSubject;
    dataSubject;
    outlet;
    component;
    snapshot;
    _futureSnapshot;
    _routerState;
    _paramMap;
    _queryParamMap;
    title;
    url;
    params;
    queryParams;
    fragment;
    data;
    constructor(n, e, r, i, o, s, a, c) { this.urlSubject = n, this.paramsSubject = e, this.queryParamsSubject = r, this.fragmentSubject = i, this.dataSubject = o, this.outlet = s, this.component = a, this._futureSnapshot = c, this.title = this.dataSubject?.pipe(D(u => u[Be])) ?? v(void 0), this.url = n, this.params = e, this.queryParams = r, this.fragment = i, this.data = o; }
    get routeConfig() { return this._futureSnapshot.routeConfig; }
    get root() { return this._routerState.root; }
    get parent() { return this._routerState.parent(this); }
    get firstChild() { return this._routerState.firstChild(this); }
    get children() { return this._routerState.children(this); }
    get pathFromRoot() { return this._routerState.pathFromRoot(this); }
    get paramMap() { return this._paramMap ??= this.params.pipe(D(n => le(n))), this._paramMap; }
    get queryParamMap() { return this._queryParamMap ??= this.queryParams.pipe(D(n => le(n))), this._queryParamMap; }
    toString() { return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`; }
};
function ir(t, n, e = "emptyOnly") { let r, { routeConfig: i } = t; return n !== null && (e === "always" || i?.path === "" || !n.component && !n.routeConfig?.loadComponent) ? r = { params: l(l({}, n.params), t.params), data: l(l({}, n.data), t.data), resolve: l(l(l(l({}, t.data), n.data), i?.data), t._resolvedData) } : r = { params: l({}, t.params), data: l({}, t.data), resolve: l(l({}, t.data), t._resolvedData ?? {}) }, i && Xr(i) && (r.resolve[Be] = i.title), r; }
var Ie = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    _environmentInjector;
    get title() { return this.data?.[Be]; }
    constructor(n, e, r, i, o, s, a, c, u, h) { this.url = n, this.params = e, this.queryParams = r, this.fragment = i, this.data = o, this.outlet = s, this.component = a, this.routeConfig = c, this._resolve = u, this._environmentInjector = h; }
    get root() { return this._routerState.root; }
    get parent() { return this._routerState.parent(this); }
    get firstChild() { return this._routerState.firstChild(this); }
    get children() { return this._routerState.children(this); }
    get pathFromRoot() { return this._routerState.pathFromRoot(this); }
    get paramMap() { return this._paramMap ??= le(this.params), this._paramMap; }
    get queryParamMap() { return this._queryParamMap ??= le(this.queryParams), this._queryParamMap; }
    toString() { let n = this.url.map(r => r.toString()).join("/"), e = this.routeConfig ? this.routeConfig.path : ""; return `Route(url:'${n}', path:'${e}')`; }
}, He = class extends vt {
    url;
    constructor(n, e) { super(e), this.url = n, or(this, e); }
    toString() { return Jr(this._root); }
};
function or(t, n) { n.value._routerState = t, n.children.forEach(e => or(t, e)); }
function Jr(t) { let n = t.children.length > 0 ? ` { ${t.children.map(Jr).join(", ")} } ` : ""; return `${t.value}${n}`; }
function Ot(t) { if (t.snapshot) {
    let n = t.snapshot, e = t._futureSnapshot;
    t.snapshot = e, W(n.queryParams, e.queryParams) || t.queryParamsSubject.next(e.queryParams), n.fragment !== e.fragment && t.fragmentSubject.next(e.fragment), W(n.params, e.params) || t.paramsSubject.next(e.params), yi(n.url, e.url) || t.urlSubject.next(e.url), W(n.data, e.data) || t.dataSubject.next(e.data);
}
else
    t.snapshot = t._futureSnapshot, t.dataSubject.next(t._futureSnapshot.data); }
function Bt(t, n) { let e = W(t.params, n.params) && bi(t.url, n.url), r = !t.parent != !n.parent; return e && !r && (!t.parent || Bt(t.parent, n.parent)); }
function Xr(t) { return typeof t.title == "string" || t.title === null; }
var en = new ne(""), ar = (() => { class t {
    activated = null;
    get activatedComponentRef() { return this.activated; }
    _activatedRoute = null;
    name = p;
    activateEvents = new Ye;
    deactivateEvents = new Ye;
    attachEvents = new Ye;
    detachEvents = new Ye;
    routerOutletData = Yn();
    parentContexts = g(pe);
    location = g(Zn);
    changeDetector = g(Jn);
    inputBinder = g(Ve, { optional: !0 });
    supportsBindingToComponentInputs = !0;
    ngOnChanges(e) { if (e.name) {
        let { firstChange: r, previousValue: i } = e.name;
        if (r)
            return;
        this.isTrackedInParentContexts(i) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)), this.initializeOutletWithName();
    } }
    ngOnDestroy() { this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder?.unsubscribeFromRouteData(this); }
    isTrackedInParentContexts(e) { return this.parentContexts.getContext(e)?.outlet === this; }
    ngOnInit() { this.initializeOutletWithName(); }
    initializeOutletWithName() { if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated)
        return; let e = this.parentContexts.getContext(this.name); e?.route && (e.attachRef ? this.attach(e.attachRef, e.route) : this.activateWith(e.route, e.injector)); }
    get isActivated() { return !!this.activated; }
    get component() { if (!this.activated)
        throw new A(4012, !1); return this.activated.instance; }
    get activatedRoute() { if (!this.activated)
        throw new A(4012, !1); return this._activatedRoute; }
    get activatedRouteData() { return this._activatedRoute ? this._activatedRoute.snapshot.data : {}; }
    detach() { if (!this.activated)
        throw new A(4012, !1); this.location.detach(); let e = this.activated; return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(e.instance), e; }
    attach(e, r) { this.activated = e, this._activatedRoute = r, this.location.insert(e.hostView), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(e.instance); }
    deactivate() { if (this.activated) {
        let e = this.component;
        this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(e);
    } }
    activateWith(e, r) { if (this.isActivated)
        throw new A(4013, !1); this._activatedRoute = e; let i = this.location, s = e.snapshot.component, a = this.parentContexts.getOrCreateContext(this.name).children, c = new Vt(e, a, i.injector, this.routerOutletData); this.activated = i.createComponent(s, { index: i.length, injector: c, environmentInjector: r }), this.changeDetector.markForCheck(), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275dir = y.\u0275\u0275defineDirective({ type: t, selectors: [["router-outlet"]], inputs: { name: "name", routerOutletData: [1, "routerOutletData"] }, outputs: { activateEvents: "activate", deactivateEvents: "deactivate", attachEvents: "attach", detachEvents: "detach" }, exportAs: ["outlet"], features: [y.\u0275\u0275NgOnChangesFeature] });
} return t; })(), Vt = class {
    route;
    childContexts;
    parent;
    outletData;
    constructor(n, e, r, i) { this.route = n, this.childContexts = e, this.parent = r, this.outletData = i; }
    get(n, e) { return n === Q ? this.route : n === pe ? this.childContexts : n === en ? this.outletData : this.parent.get(n, e); }
}, Ve = new ne(""), sr = (() => { class t {
    outletDataSubscriptions = new Map;
    bindActivatedRouteToOutletComponent(e) { this.unsubscribeFromRouteData(e), this.subscribeToRouteData(e); }
    unsubscribeFromRouteData(e) { this.outletDataSubscriptions.get(e)?.unsubscribe(), this.outletDataSubscriptions.delete(e); }
    subscribeToRouteData(e) { let { activatedRoute: r } = e, i = Nr([r.queryParams, r.params, r.data]).pipe(B(([o, s, a], c) => (a = l(l(l({}, o), s), a), c === 0 ? v(a) : Promise.resolve(a)))).subscribe(o => { if (!e.isActivated || !e.activatedComponentRef || e.activatedRoute !== r || r.component === null) {
        this.unsubscribeFromRouteData(e);
        return;
    } let s = Xn(r.component); if (!s) {
        this.unsubscribeFromRouteData(e);
        return;
    } for (let { templateName: a } of s.inputs)
        e.activatedComponentRef.setInput(a, o[a]); }); this.outletDataSubscriptions.set(e, i); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac });
} return t; })(), cr = (() => { class t {
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275cmp = y.\u0275\u0275defineComponent({ type: t, selectors: [["ng-component"]], exportAs: ["emptyRouterOutlet"], decls: 1, vars: 0, template: function (r, i) { r & 1 && y.\u0275\u0275element(0, "router-outlet"); }, dependencies: [ar], encapsulation: 2 });
} return t; })();
function ur(t) { let n = t.children && t.children.map(ur), e = n ? E(l({}, t), { children: n }) : l({}, t); return !e.component && !e.loadComponent && (n || e.loadChildren) && e.outlet && e.outlet !== p && (e.component = cr), e; }
function Vi(t, n, e) { let r = Fe(t, n._root, e ? e._root : void 0); return new ze(r, n); }
function Fe(t, n, e) { if (e && t.shouldReuseRoute(n.value, e.value.snapshot)) {
    let r = e.value;
    r._futureSnapshot = n.value;
    let i = Gi(t, n, e);
    return new O(r, i);
}
else {
    if (t.shouldAttach(n.value)) {
        let o = t.retrieve(n.value);
        if (o !== null) {
            let s = o.route;
            return s.value._futureSnapshot = n.value, s.children = n.children.map(a => Fe(t, a)), s;
        }
    }
    let r = Wi(n.value), i = n.children.map(o => Fe(t, o));
    return new O(r, i);
} }
function Gi(t, n, e) { return n.children.map(r => { for (let i of e.children)
    if (t.shouldReuseRoute(r.value, i.value.snapshot))
        return Fe(t, r, i); return Fe(t, r); }); }
function Wi(t) { return new Q(new z(t.url), new z(t.params), new z(t.queryParams), new z(t.fragment), new z(t.data), t.outlet, t.component, t); }
var Ee = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(n, e) { this.redirectTo = n, this.navigationBehaviorOptions = e; }
}, tn = "ngNavigationCancelingError";
function mt(t, n) { let { redirectTo: e, navigationBehaviorOptions: r } = te(n) ? { redirectTo: n, navigationBehaviorOptions: void 0 } : n, i = rn(!1, b.Redirect); return i.url = e, i.navigationBehaviorOptions = r, i; }
function rn(t, n) { let e = new Error(`NavigationCancelingError: ${t || ""}`); return e[tn] = !0, e.cancellationCode = n, e; }
function Qi(t) { return nn(t) && te(t.url); }
function nn(t) { return !!t && t[tn]; }
var Gt = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(n, e, r, i, o) { this.routeReuseStrategy = n, this.futureState = e, this.currState = r, this.forwardEvent = i, this.inputBindingEnabled = o; }
    activate(n) { let e = this.futureState._root, r = this.currState ? this.currState._root : null; this.deactivateChildRoutes(e, r, n), Ot(this.futureState.root), this.activateChildRoutes(e, r, n); }
    deactivateChildRoutes(n, e, r) { let i = ve(e); n.children.forEach(o => { let s = o.value.outlet; this.deactivateRoutes(o, i[s], r), delete i[s]; }), Object.values(i).forEach(o => { this.deactivateRouteAndItsChildren(o, r); }); }
    deactivateRoutes(n, e, r) { let i = n.value, o = e ? e.value : null; if (i === o)
        if (i.component) {
            let s = r.getContext(i.outlet);
            s && this.deactivateChildRoutes(n, e, s.children);
        }
        else
            this.deactivateChildRoutes(n, e, r);
    else
        o && this.deactivateRouteAndItsChildren(e, r); }
    deactivateRouteAndItsChildren(n, e) { n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot) ? this.detachAndStoreRouteSubtree(n, e) : this.deactivateRouteAndOutlet(n, e); }
    detachAndStoreRouteSubtree(n, e) { let r = e.getContext(n.value.outlet), i = r && n.value.component ? r.children : e, o = ve(n); for (let s of Object.values(o))
        this.deactivateRouteAndItsChildren(s, i); if (r && r.outlet) {
        let s = r.outlet.detach(), a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(n.value.snapshot, { componentRef: s, route: n, contexts: a });
    } }
    deactivateRouteAndOutlet(n, e) { let r = e.getContext(n.value.outlet), i = r && n.value.component ? r.children : e, o = ve(n); for (let s of Object.values(o))
        this.deactivateRouteAndItsChildren(s, i); r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null); }
    activateChildRoutes(n, e, r) { let i = ve(e); n.children.forEach(o => { this.activateRoutes(o, i[o.value.outlet], r), this.forwardEvent(new pt(o.value.snapshot)); }), n.children.length && this.forwardEvent(new ht(n.value.snapshot)); }
    activateRoutes(n, e, r) { let i = n.value, o = e ? e.value : null; if (Ot(i), i === o)
        if (i.component) {
            let s = r.getOrCreateContext(i.outlet);
            this.activateChildRoutes(n, e, s.children);
        }
        else
            this.activateChildRoutes(n, e, r);
    else if (i.component) {
        let s = r.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
            let a = this.routeReuseStrategy.retrieve(i.snapshot);
            this.routeReuseStrategy.store(i.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Ot(a.route.value), this.activateChildRoutes(n, null, s.children);
        }
        else
            s.attachRef = null, s.route = i, s.outlet && s.outlet.activateWith(i, s.injector), this.activateChildRoutes(n, null, s.children);
    }
    else
        this.activateChildRoutes(n, null, r); }
}, yt = class {
    path;
    route;
    constructor(n) { this.path = n, this.route = this.path[this.path.length - 1]; }
}, Re = class {
    component;
    route;
    constructor(n, e) { this.component = n, this.route = e; }
};
function Ki(t, n, e) { let r = t._root, i = n ? n._root : null; return _e(r, i, e, [r.value]); }
function Yi(t) { let n = t.routeConfig ? t.routeConfig.canActivateChild : null; return !n || n.length === 0 ? null : { node: t, guards: n }; }
function Me(t, n) { let e = Symbol(), r = n.get(t, e); return r === e ? typeof t == "function" && !ei(t) ? t : n.get(t) : r; }
function _e(t, n, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) { let o = ve(n); return t.children.forEach(s => { Zi(s, o[s.value.outlet], e, r.concat([s.value]), i), delete o[s.value.outlet]; }), Object.entries(o).forEach(([s, a]) => Pe(a, e.getContext(s), i)), i; }
function Zi(t, n, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) { let o = t.value, s = n ? n.value : null, a = e ? e.getContext(t.value.outlet) : null; if (s && o.routeConfig === s.routeConfig) {
    let c = Ji(s, o, o.routeConfig.runGuardsAndResolvers);
    c ? i.canActivateChecks.push(new yt(r)) : (o.data = s.data, o._resolvedData = s._resolvedData), o.component ? _e(t, n, a ? a.children : null, r, i) : _e(t, n, e, r, i), c && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new Re(a.outlet.component, s));
}
else
    s && Pe(n, a, i), i.canActivateChecks.push(new yt(r)), o.component ? _e(t, null, a ? a.children : null, r, i) : _e(t, null, e, r, i); return i; }
function Ji(t, n, e) { if (typeof e == "function")
    return L(n._environmentInjector, () => e(t, n)); switch (e) {
    case "pathParamsChange": return !ce(t.url, n.url);
    case "pathParamsOrQueryParamsChange": return !ce(t.url, n.url) || !W(t.queryParams, n.queryParams);
    case "always": return !0;
    case "paramsOrQueryParamsChange": return !Bt(t, n) || !W(t.queryParams, n.queryParams);
    default: return !Bt(t, n);
} }
function Pe(t, n, e) { let r = ve(t), i = t.value; Object.entries(r).forEach(([o, s]) => { i.component ? n ? Pe(s, n.children.getContext(o), e) : Pe(s, null, e) : Pe(s, n, e); }), i.component ? n && n.outlet && n.outlet.isActivated ? e.canDeactivateChecks.push(new Re(n.outlet.component, i)) : e.canDeactivateChecks.push(new Re(null, i)) : e.canDeactivateChecks.push(new Re(null, i)); }
function Ge(t) { return typeof t == "function"; }
function Xi(t) { return typeof t == "boolean"; }
function eo(t) { return t && Ge(t.canLoad); }
function to(t) { return t && Ge(t.canActivate); }
function ro(t) { return t && Ge(t.canActivateChild); }
function no(t) { return t && Ge(t.canDeactivate); }
function io(t) { return t && Ge(t.canMatch); }
function on(t) { return t instanceof li || t?.name === "EmptyError"; }
var Je = Symbol("INITIAL_VALUE");
function Ae() { return B(t => Nr(t.map(n => n.pipe(Le(1), vi(Je)))).pipe(D(n => { for (let e of n)
    if (e !== !0) {
        if (e === Je)
            return Je;
        if (e === !1 || oo(e))
            return e;
    } return !0; }), xe(n => n !== Je), Le(1))); }
function oo(t) { return te(t) || t instanceof Ee; }
function an(t) { return t.aborted ? v(void 0).pipe(Le(1)) : new di(n => { let e = () => { n.next(), n.complete(); }; return t.addEventListener("abort", e), () => t.removeEventListener("abort", e); }); }
function sn(t) { return Lt(an(t)); }
function ao(t) { return ue(n => { let { targetSnapshot: e, currentSnapshot: r, guards: { canActivateChecks: i, canDeactivateChecks: o } } = n; return o.length === 0 && i.length === 0 ? v(E(l({}, n), { guardsResult: !0 })) : so(o, e, r).pipe(ue(s => s && Xi(s) ? co(e, i, t) : v(s)), D(s => E(l({}, n), { guardsResult: s }))); }); }
function so(t, n, e) { return G(t).pipe(ue(r => po(r.component, r.route, e, n)), he(r => r !== !0, !0)); }
function co(t, n, e) { return G(n).pipe(_r(r => hi(lo(r.route.parent, e), uo(r.route, e), fo(t, r.path), ho(t, r.route))), he(r => r !== !0, !0)); }
function uo(t, n) { return t !== null && n && n(new ft(t)), v(!0); }
function lo(t, n) { return t !== null && n && n(new dt(t)), v(!0); }
function ho(t, n) { let e = n.routeConfig ? n.routeConfig.canActivate : null; if (!e || e.length === 0)
    return v(!0); let r = e.map(i => er(() => { let o = n._environmentInjector, s = Me(i, o), a = to(s) ? s.canActivate(n, t) : L(o, () => s(n, t)); return fe(a).pipe(he()); })); return v(r).pipe(Ae()); }
function fo(t, n) { let e = n[n.length - 1], i = n.slice(0, n.length - 1).reverse().map(o => Yi(o)).filter(o => o !== null).map(o => er(() => { let s = o.guards.map(a => { let c = o.node._environmentInjector, u = Me(a, c), h = ro(u) ? u.canActivateChild(e, t) : L(c, () => u(e, t)); return fe(h).pipe(he()); }); return v(s).pipe(Ae()); })); return v(i).pipe(Ae()); }
function po(t, n, e, r) { let i = n && n.routeConfig ? n.routeConfig.canDeactivate : null; if (!i || i.length === 0)
    return v(!0); let o = i.map(s => { let a = n._environmentInjector, c = Me(s, a), u = no(c) ? c.canDeactivate(t, n, e, r) : L(a, () => c(t, n, e, r)); return fe(u).pipe(he()); }); return v(o).pipe(Ae()); }
function go(t, n, e, r, i) { let o = n.canLoad; if (o === void 0 || o.length === 0)
    return v(!0); let s = o.map(a => { let c = Me(a, t), u = eo(c) ? c.canLoad(n, e) : L(t, () => c(n, e)), h = fe(u); return i ? h.pipe(sn(i)) : h; }); return v(s).pipe(Ae(), cn(r)); }
function cn(t) { return fi(V(n => { if (typeof n != "boolean")
    throw mt(t, n); }), D(n => n === !0)); }
function vo(t, n, e, r, i, o) { let s = n.canMatch; if (!s || s.length === 0)
    return v(!0); let a = s.map(c => { let u = Me(c, t), h = io(u) ? u.canMatch(n, e, i) : L(t, () => u(n, e, i)); return fe(h).pipe(sn(o)); }); return v(a).pipe(Ae(), cn(r)); }
var Y = class t extends Error {
    segmentGroup;
    constructor(n) { super(), this.segmentGroup = n || null, Object.setPrototypeOf(this, t.prototype); }
}, qe = class t extends Error {
    urlTree;
    constructor(n) { super(), this.urlTree = n, Object.setPrototypeOf(this, t.prototype); }
};
function mo(t) { throw new A(4e3, !1); }
function yo(t) { throw rn(!1, b.GuardRejected); }
var Wt = class {
    urlSerializer;
    urlTree;
    constructor(n, e) { this.urlSerializer = n, this.urlTree = e; }
    lineralizeSegments(n, e) { return R(this, null, function* () { let r = [], i = e.root; for (;;) {
        if (r = r.concat(i.segments), i.numberOfChildren === 0)
            return r;
        if (i.numberOfChildren > 1 || !i.children[p])
            throw mo(`${n.redirectTo}`);
        i = i.children[p];
    } }); }
    applyRedirectCommands(n, e, r, i, o) { return R(this, null, function* () { let s = yield Ro(e, i, o); if (s instanceof T)
        throw new qe(s); let a = this.applyRedirectCreateUrlTree(s, this.urlSerializer.parse(s), n, r); if (s[0] === "/")
        throw new qe(a); return a; }); }
    applyRedirectCreateUrlTree(n, e, r, i) { let o = this.createSegmentGroup(n, e.root, r, i); return new T(o, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment); }
    createQueryParams(n, e) { let r = {}; return Object.entries(n).forEach(([i, o]) => { if (typeof o == "string" && o[0] === ":") {
        let a = o.substring(1);
        r[i] = e[a];
    }
    else
        r[i] = o; }), r; }
    createSegmentGroup(n, e, r, i) { let o = this.createSegments(n, e.segments, r, i), s = {}; return Object.entries(e.children).forEach(([a, c]) => { s[a] = this.createSegmentGroup(n, c, r, i); }), new m(o, s); }
    createSegments(n, e, r, i) { return e.map(o => o.path[0] === ":" ? this.findPosParam(n, o, i) : this.findOrReturn(o, r)); }
    findPosParam(n, e, r) { let i = r[e.path.substring(1)]; if (!i)
        throw new A(4001, !1); return i; }
    findOrReturn(n, e) { let r = 0; for (let i of e) {
        if (i.path === n.path)
            return e.splice(r), i;
        r++;
    } return n; }
};
function Ro(t, n, e) { if (typeof t == "string")
    return Promise.resolve(t); let r = t; return rt(fe(L(e, () => r(n)))); }
function So(t, n) { return t.providers && !t._injector && (t._injector = ti(t.providers, n, `Route: ${t.path}`)), t._injector ?? n; }
function H(t) { return t.outlet || p; }
function Co(t, n) { let e = t.filter(r => H(r) === n); return e.push(...t.filter(r => H(r) !== n)), e; }
var Qt = { matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {} };
function un(t) { return { routeConfig: t.routeConfig, url: t.url, params: t.params, queryParams: t.queryParams, fragment: t.fragment, data: t.data, outlet: t.outlet, title: t.title, paramMap: t.paramMap, queryParamMap: t.queryParamMap }; }
function wo(t, n, e, r, i, o, s) { let a = ln(t, n, e); if (!a.matched)
    return v(a); let c = un(o(a)); return r = So(n, r), vo(r, n, e, i, c, s).pipe(D(u => u === !0 ? a : l({}, Qt))); }
function ln(t, n, e) { if (n.path === "")
    return n.pathMatch === "full" && (t.hasChildren() || e.length > 0) ? l({}, Qt) : { matched: !0, consumedSegments: [], remainingSegments: e, parameters: {}, positionalParamSegments: {} }; let i = (n.matcher || Lr)(e, t, n); if (!i)
    return l({}, Qt); let o = {}; Object.entries(i.posParams ?? {}).forEach(([a, c]) => { o[a] = c.path; }); let s = i.consumed.length > 0 ? l(l({}, o), i.consumed[i.consumed.length - 1].parameters) : o; return { matched: !0, consumedSegments: i.consumed, remainingSegments: e.slice(i.consumed.length), parameters: s, positionalParamSegments: i.posParams ?? {} }; }
function Mr(t, n, e, r, i) { return e.length > 0 && Eo(t, e, r, i) ? { segmentGroup: new m(n, Io(r, new m(e, t.children))), slicedSegments: [] } : e.length === 0 && Ao(t, e, r) ? { segmentGroup: new m(t.segments, bo(t, e, r, t.children)), slicedSegments: e } : { segmentGroup: new m(t.segments, t.children), slicedSegments: e }; }
function bo(t, n, e, r) { let i = {}; for (let o of e)
    if (St(t, n, o) && !r[H(o)]) {
        let s = new m([], {});
        i[H(o)] = s;
    } return l(l({}, r), i); }
function Io(t, n) { let e = {}; e[p] = n; for (let r of t)
    if (r.path === "" && H(r) !== p) {
        let i = new m([], {});
        e[H(r)] = i;
    } return e; }
function Eo(t, n, e, r) { return e.some(i => !St(t, n, i) || !(H(i) !== p) ? !1 : !(r !== void 0 && H(i) === r)); }
function Ao(t, n, e) { return e.some(r => St(t, n, r)); }
function St(t, n, e) { return (t.hasChildren() || n.length > 0) && e.pathMatch === "full" ? !1 : e.path === ""; }
function Mo(t, n, e) { return n.length === 0 && !t.children[e]; }
var Kt = class {
};
function To(t, n, e, r, i, o, s = "emptyOnly", a) { return R(this, null, function* () { return new Yt(t, n, e, r, i, s, o, a).recognize(); }); }
var Do = 31, Yt = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    abortSignal;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = !0;
    constructor(n, e, r, i, o, s, a, c) { this.injector = n, this.configLoader = e, this.rootComponentType = r, this.config = i, this.urlTree = o, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.abortSignal = c, this.applyRedirects = new Wt(this.urlSerializer, this.urlTree); }
    noMatchError(n) { return new A(4002, `'${n.segmentGroup}'`); }
    recognize() { return R(this, null, function* () { let n = Mr(this.urlTree.root, [], [], this.config).segmentGroup, { children: e, rootSnapshot: r } = yield this.match(n), i = new O(r, e), o = new He("", i), s = Gr(r, [], this.urlTree.queryParams, this.urlTree.fragment); return s.queryParams = this.urlTree.queryParams, o.url = this.urlSerializer.serialize(s), { state: o, tree: s }; }); }
    match(n) { return R(this, null, function* () { let e = new Ie([], Object.freeze({}), Object.freeze(l({}, this.urlTree.queryParams)), this.urlTree.fragment, Object.freeze({}), p, this.rootComponentType, null, {}, this.injector); try {
        return { children: yield this.processSegmentGroup(this.injector, this.config, n, p, e), rootSnapshot: e };
    }
    catch (r) {
        if (r instanceof qe)
            return this.urlTree = r.urlTree, this.match(r.urlTree.root);
        throw r instanceof Y ? this.noMatchError(r) : r;
    } }); }
    processSegmentGroup(n, e, r, i, o) { return R(this, null, function* () { if (r.segments.length === 0 && r.hasChildren())
        return this.processChildren(n, e, r, o); let s = yield this.processSegment(n, e, r, r.segments, i, !0, o); return s instanceof O ? [s] : []; }); }
    processChildren(n, e, r, i) { return R(this, null, function* () { let o = []; for (let c of Object.keys(r.children))
        c === "primary" ? o.unshift(c) : o.push(c); let s = []; for (let c of o) {
        let u = r.children[c], h = Co(e, c), f = yield this.processSegmentGroup(n, h, u, c, i);
        s.push(...f);
    } let a = dn(s); return No(a), a; }); }
    processSegment(n, e, r, i, o, s, a) { return R(this, null, function* () { for (let c of e)
        try {
            return yield this.processSegmentAgainstRoute(c._injector ?? n, e, c, r, i, o, s, a);
        }
        catch (u) {
            if (u instanceof Y || on(u))
                continue;
            throw u;
        } if (Mo(r, i, o))
        return new Kt; throw new Y(r); }); }
    processSegmentAgainstRoute(n, e, r, i, o, s, a, c) { return R(this, null, function* () { if (H(r) !== s && (s === p || !St(i, o, r)))
        throw new Y(i); if (r.redirectTo === void 0)
        return this.matchSegmentAgainstRoute(n, i, r, o, s, c); if (this.allowRedirects && a)
        return this.expandSegmentAgainstRouteUsingRedirect(n, i, e, r, o, s, c); throw new Y(i); }); }
    expandSegmentAgainstRouteUsingRedirect(n, e, r, i, o, s, a) { return R(this, null, function* () { let { matched: c, parameters: u, consumedSegments: h, positionalParamSegments: f, remainingSegments: C } = ln(e, i, o); if (!c)
        throw new Y(e); typeof i.redirectTo == "string" && i.redirectTo[0] === "/" && (this.absoluteRedirectCount++, this.absoluteRedirectCount > Do && (this.allowRedirects = !1)); let K = this.createSnapshot(n, i, o, u, a); if (this.abortSignal.aborted)
        throw new Error(this.abortSignal.reason); let j = yield this.applyRedirects.applyRedirectCommands(h, i.redirectTo, f, un(K), n), I = yield this.applyRedirects.lineralizeSegments(i, j); return this.processSegment(n, r, e, I.concat(C), s, !1, a); }); }
    createSnapshot(n, e, r, i, o) { let s = new Ie(r, i, Object.freeze(l({}, this.urlTree.queryParams)), this.urlTree.fragment, Uo(e), H(e), e.component ?? e._loadedComponent ?? null, e, Oo(e), n), a = ir(s, o, this.paramsInheritanceStrategy); return s.params = Object.freeze(a.params), s.data = Object.freeze(a.data), s; }
    matchSegmentAgainstRoute(n, e, r, i, o, s) { return R(this, null, function* () { if (this.abortSignal.aborted)
        throw new Error(this.abortSignal.reason); let a = ge => this.createSnapshot(n, r, ge.consumedSegments, ge.parameters, s), c = yield rt(wo(e, r, i, n, this.urlSerializer, a, this.abortSignal)); if (r.path === "**" && (e.children = {}), !c?.matched)
        throw new Y(e); n = r._injector ?? n; let { routes: u } = yield this.getChildConfig(n, r, i), h = r._loadedInjector ?? n, { parameters: f, consumedSegments: C, remainingSegments: K } = c, j = this.createSnapshot(n, r, C, f, s), { segmentGroup: I, slicedSegments: k } = Mr(e, C, K, u, o); if (k.length === 0 && I.hasChildren()) {
        let ge = yield this.processChildren(h, u, I, j);
        return new O(j, ge);
    } if (u.length === 0 && k.length === 0)
        return new O(j, []); let De = H(r) === o, se = yield this.processSegment(h, u, I, k, De ? p : o, !0, j); return new O(j, se instanceof O ? [se] : []); }); }
    getChildConfig(n, e, r) { return R(this, null, function* () { if (e.children)
        return { routes: e.children, injector: n }; if (e.loadChildren) {
        if (e._loadedRoutes !== void 0) {
            let o = e._loadedNgModuleFactory;
            return o && !e._loadedInjector && (e._loadedInjector = o.create(n).injector), { routes: e._loadedRoutes, injector: e._loadedInjector };
        }
        if (this.abortSignal.aborted)
            throw new Error(this.abortSignal.reason);
        if (yield rt(go(n, e, r, this.urlSerializer, this.abortSignal))) {
            let o = yield this.configLoader.loadChildren(n, e);
            return e._loadedRoutes = o.routes, e._loadedInjector = o.injector, e._loadedNgModuleFactory = o.factory, o;
        }
        throw yo(e);
    } return { routes: [], injector: n }; }); }
};
function No(t) { t.sort((n, e) => n.value.outlet === p ? -1 : e.value.outlet === p ? 1 : n.value.outlet.localeCompare(e.value.outlet)); }
function _o(t) { let n = t.value.routeConfig; return n && n.path === ""; }
function dn(t) { let n = [], e = new Set; for (let r of t) {
    if (!_o(r)) {
        n.push(r);
        continue;
    }
    let i = n.find(o => r.value.routeConfig === o.value.routeConfig);
    i !== void 0 ? (i.children.push(...r.children), e.add(i)) : n.push(r);
} for (let r of e) {
    let i = dn(r.children);
    n.push(new O(r.value, i));
} return n.filter(r => !e.has(r)); }
function Uo(t) { return t.data || {}; }
function Oo(t) { return t.resolve || {}; }
function Po(t, n, e, r, i, o, s) { return ue(a => R(null, null, function* () { let { state: c, tree: u } = yield To(t, n, e, r, a.extractedUrl, i, o, s); return E(l({}, a), { targetSnapshot: c, urlAfterRedirects: u }); })); }
function Lo(t) { return ue(n => { let { targetSnapshot: e, guards: { canActivateChecks: r } } = n; if (!r.length)
    return v(n); let i = new Set(r.map(a => a.route)), o = new Set; for (let a of i)
    if (!o.has(a))
        for (let c of hn(a))
            o.add(c); let s = 0; return G(o).pipe(_r(a => i.has(a) ? xo(a, e, t) : (a.data = ir(a, a.parent, t).resolve, v(void 0))), V(() => s++), Ur(1), ue(a => s === o.size ? v(n) : $)); }); }
function hn(t) { let n = t.children.map(e => hn(e)).flat(); return [t, ...n]; }
function xo(t, n, e) { let r = t.routeConfig, i = t._resolve; return r?.title !== void 0 && !Xr(r) && (i[Be] = r.title), er(() => (t.data = ir(t, t.parent, e).resolve, jo(i, t, n).pipe(D(o => (t._resolvedData = o, t.data = l(l({}, t.data), o), null))))); }
function jo(t, n, e) { let r = jt(t); if (r.length === 0)
    return v({}); let i = {}; return G(r).pipe(ue(o => ko(t[o], n, e).pipe(he(), V(s => { if (s instanceof Ee)
    throw mt(new Z, s); i[o] = s; }))), Ur(1), D(() => i), Or(o => on(o) ? $ : pi(o))); }
function ko(t, n, e) { let r = n._environmentInjector, i = Me(t, r), o = i.resolve ? i.resolve(n, e) : L(r, () => i(n, e)); return fe(o); }
function Tr(t) { return B(n => { let e = t(n); return e ? G(e).pipe(D(() => n)) : v(n); }); }
var lr = (() => { class t {
    buildTitle(e) { let r, i = e.root; for (; i !== void 0;)
        r = this.getResolvedTitleForRoute(i) ?? r, i = i.children.find(o => o.outlet === p); return r; }
    getResolvedTitleForRoute(e) { return e.data[Be]; }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: () => g(fn), providedIn: "root" });
} return t; })(), fn = (() => { class t extends lr {
    title;
    constructor(e) { super(), this.title = e; }
    updateTitle(e) { let r = this.buildTitle(e); r !== void 0 && this.title.setTitle(r); }
    static \u0275fac = function (r) { return new (r || t)(y.\u0275\u0275inject(Pr.Title)); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), X = new ne("", { factory: () => ({}) }), oe = new ne(""), Ct = (() => { class t {
    componentLoaders = new WeakMap;
    childrenLoaders = new WeakMap;
    onLoadStartListener;
    onLoadEndListener;
    compiler = g(ri);
    loadComponent(e, r) { return R(this, null, function* () { if (this.componentLoaders.get(r))
        return this.componentLoaders.get(r); if (r._loadedComponent)
        return Promise.resolve(r._loadedComponent); this.onLoadStartListener && this.onLoadStartListener(r); let i = R(this, null, function* () { try {
        let o = yield jr(L(e, () => r.loadComponent())), s = yield vn(gn(o));
        return this.onLoadEndListener && this.onLoadEndListener(r), r._loadedComponent = s, s;
    }
    finally {
        this.componentLoaders.delete(r);
    } }); return this.componentLoaders.set(r, i), i; }); }
    loadChildren(e, r) { if (this.childrenLoaders.get(r))
        return this.childrenLoaders.get(r); if (r._loadedRoutes)
        return Promise.resolve({ routes: r._loadedRoutes, injector: r._loadedInjector }); this.onLoadStartListener && this.onLoadStartListener(r); let i = R(this, null, function* () { try {
        let o = yield pn(r, this.compiler, e, this.onLoadEndListener);
        return r._loadedRoutes = o.routes, r._loadedInjector = o.injector, r._loadedNgModuleFactory = o.factory, o;
    }
    finally {
        this.childrenLoaders.delete(r);
    } }); return this.childrenLoaders.set(r, i), i; }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })();
function pn(t, n, e, r) { return R(this, null, function* () { let i = yield jr(L(e, () => t.loadChildren())), o = yield vn(gn(i)), s; o instanceof ni || Array.isArray(o) ? s = o : s = yield n.compileModuleAsync(o), r && r(t); let a, c, u = !1, h; return Array.isArray(s) ? (c = s, u = !0) : (a = s.create(e).injector, h = s, c = a.get(oe, [], { optional: !0, self: !0 }).flat()), { routes: c.map(ur), injector: a, factory: h }; }); }
function $o(t) { return t && typeof t == "object" && "default" in t; }
function gn(t) { return $o(t) ? t.default : t; }
function vn(t) { return R(this, null, function* () { return t; }); }
var wt = (() => { class t {
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: () => g(zo), providedIn: "root" });
} return t; })(), zo = (() => { class t {
    shouldProcessUrl(e) { return !0; }
    extract(e) { return e; }
    merge(e, r) { return e; }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), dr = new ne(""), hr = new ne("");
function mn(t, n, e) { let r = t.get(hr), i = t.get(Wn); if (!i.startViewTransition || r.skipNextTransition)
    return r.skipNextTransition = !1, new Promise(u => setTimeout(u)); let o, s = new Promise(u => { o = u; }), a = i.startViewTransition(() => (o(), Ho(t))); a.updateCallbackDone.catch(u => { }), a.ready.catch(u => { }), a.finished.catch(u => { }); let { onViewTransitionCreated: c } = r; return c && L(t, () => c({ transition: a, from: n, to: e })), s; }
function Ho(t) { return new Promise(n => { ii({ read: () => setTimeout(n) }, { injector: t }); }); }
var Fo = () => { }, bt = new ne(""), It = (() => { class t {
    currentNavigation = wr(null, { equal: () => !1 });
    currentTransition = null;
    lastSuccessfulNavigation = wr(null);
    events = new Pt;
    transitionAbortWithErrorSubject = new Pt;
    configLoader = g(Ct);
    environmentInjector = g(Xt);
    destroyRef = g(oi);
    urlSerializer = g(ie);
    rootContexts = g(pe);
    location = g(Jt);
    inputBindingEnabled = g(Ve, { optional: !0 }) !== null;
    titleStrategy = g(lr);
    options = g(X, { optional: !0 }) || {};
    paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly";
    urlHandlingStrategy = g(wt);
    createViewTransition = g(dr, { optional: !0 });
    navigationErrorHandler = g(bt, { optional: !0 });
    navigationId = 0;
    get hasRequestedNavigation() { return this.navigationId !== 0; }
    transitions;
    afterPreactivation = () => v(void 0);
    rootComponentType = null;
    destroyed = !1;
    constructor() { let e = i => this.events.next(new ut(i)), r = i => this.events.next(new lt(i)); this.configLoader.onLoadEndListener = r, this.configLoader.onLoadStartListener = e, this.destroyRef.onDestroy(() => { this.destroyed = !0; }); }
    complete() { this.transitions?.complete(); }
    handleNavigationRequest(e) { let r = ++this.navigationId; Ue(() => { this.transitions?.next(E(l({}, e), { extractedUrl: this.urlHandlingStrategy.extract(e.rawUrl), targetSnapshot: null, targetRouterState: null, guards: { canActivateChecks: [], canDeactivateChecks: [] }, guardsResult: null, id: r, routesRecognizeHandler: {}, beforeActivateHandler: {} })); }); }
    setupNavigations(e) { return this.transitions = new z(null), this.transitions.pipe(xe(r => r !== null), B(r => { let i = !1, o = new AbortController, s = () => !i && this.currentTransition?.id === r.id; return v(r).pipe(B(a => { if (this.navigationId > r.id)
        return this.cancelNavigationTransition(r, "", b.SupersededByNewNavigation), $; this.currentTransition = r; let c = this.lastSuccessfulNavigation(); this.currentNavigation.set({ id: a.id, initialUrl: a.rawUrl, extractedUrl: a.extractedUrl, targetBrowserUrl: typeof a.extras.browserUrl == "string" ? this.urlSerializer.parse(a.extras.browserUrl) : a.extras.browserUrl, trigger: a.source, extras: a.extras, previousNavigation: c ? E(l({}, c), { previousNavigation: null }) : null, abort: () => o.abort(), routesRecognizeHandler: a.routesRecognizeHandler, beforeActivateHandler: a.beforeActivateHandler }); let u = !e.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(), h = a.extras.onSameUrlNavigation ?? e.onSameUrlNavigation; if (!u && h !== "reload")
        return this.events.next(new F(a.id, this.urlSerializer.serialize(a.rawUrl), "", Se.IgnoredSameUrlNavigation)), a.resolve(!1), $; if (this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))
        return v(a).pipe(B(f => (this.events.next(new J(f.id, this.urlSerializer.serialize(f.extractedUrl), f.source, f.restoredState)), f.id !== this.navigationId ? $ : Promise.resolve(f))), Po(this.environmentInjector, this.configLoader, this.rootComponentType, e.config, this.urlSerializer, this.paramsInheritanceStrategy, o.signal), V(f => { r.targetSnapshot = f.targetSnapshot, r.urlAfterRedirects = f.urlAfterRedirects, this.currentNavigation.update(C => (C.finalUrl = f.urlAfterRedirects, C)), this.events.next(new we); }), B(f => G(r.routesRecognizeHandler.deferredHandle ?? v(void 0)).pipe(D(() => f))), V(() => { let f = new $e(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot); this.events.next(f); })); if (u && this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)) {
        let { id: f, extractedUrl: C, source: K, restoredState: j, extras: I } = a, k = new J(f, this.urlSerializer.serialize(C), K, j);
        this.events.next(k);
        let De = Zr(this.rootComponentType, this.environmentInjector).snapshot;
        return this.currentTransition = r = E(l({}, a), { targetSnapshot: De, urlAfterRedirects: C, extras: E(l({}, I), { skipLocationChange: !1, replaceUrl: !1 }) }), this.currentNavigation.update(se => (se.finalUrl = C, se)), v(r);
    }
    else
        return this.events.next(new F(a.id, this.urlSerializer.serialize(a.extractedUrl), "", Se.IgnoredByUrlHandlingStrategy)), a.resolve(!1), $; }), D(a => { let c = new ot(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot); return this.events.next(c), this.currentTransition = r = E(l({}, a), { guards: Ki(a.targetSnapshot, a.currentSnapshot, this.rootContexts) }), r; }), ao(a => this.events.next(a)), B(a => { if (r.guardsResult = a.guardsResult, a.guardsResult && typeof a.guardsResult != "boolean")
        throw mt(this.urlSerializer, a.guardsResult); let c = new at(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot, !!a.guardsResult); if (this.events.next(c), !s())
        return $; if (!a.guardsResult)
        return this.cancelNavigationTransition(a, "", b.GuardRejected), $; if (a.guards.canActivateChecks.length === 0)
        return v(a); let u = new st(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot); if (this.events.next(u), !s())
        return $; let h = !1; return v(a).pipe(Lo(this.paramsInheritanceStrategy), V({ next: () => { h = !0; let f = new ct(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot); this.events.next(f); }, complete: () => { h || this.cancelNavigationTransition(a, "", b.NoDataFromResolver); } })); }), Tr(a => { let c = h => { let f = []; if (h.routeConfig?._loadedComponent)
        h.component = h.routeConfig?._loadedComponent;
    else if (h.routeConfig?.loadComponent) {
        let C = h._environmentInjector;
        f.push(this.configLoader.loadComponent(C, h.routeConfig).then(K => { h.component = K; }));
    } for (let C of h.children)
        f.push(...c(C)); return f; }, u = c(a.targetSnapshot.root); return u.length === 0 ? v(a) : G(Promise.all(u).then(() => a)); }), Tr(() => this.afterPreactivation()), B(() => { let { currentSnapshot: a, targetSnapshot: c } = r, u = this.createViewTransition?.(this.environmentInjector, a.root, c.root); return u ? G(u).pipe(D(() => r)) : v(r); }), Le(1), B(a => { let c = Vi(e.routeReuseStrategy, a.targetSnapshot, a.currentRouterState); this.currentTransition = r = a = E(l({}, a), { targetRouterState: c }), this.currentNavigation.update(h => (h.targetRouterState = c, h)), this.events.next(new de); let u = r.beforeActivateHandler.deferredHandle; return u ? G(u.then(() => a)) : v(a); }), V(a => { new Gt(e.routeReuseStrategy, r.targetRouterState, r.currentRouterState, c => this.events.next(c), this.inputBindingEnabled).activate(this.rootContexts), s() && (i = !0, this.currentNavigation.update(c => (c.abort = Fo, c)), this.lastSuccessfulNavigation.set(Ue(this.currentNavigation)), this.events.next(new N(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects))), this.titleStrategy?.updateTitle(a.targetRouterState.snapshot), a.resolve(!0)); }), Lt(an(o.signal).pipe(xe(() => !i && !r.targetRouterState), V(() => { this.cancelNavigationTransition(r, o.signal.reason + "", b.Aborted); }))), V({ complete: () => { i = !0; } }), Lt(this.transitionAbortWithErrorSubject.pipe(V(a => { throw a; }))), mi(() => { o.abort(), i || this.cancelNavigationTransition(r, "", b.SupersededByNewNavigation), this.currentTransition?.id === r.id && (this.currentNavigation.set(null), this.currentTransition = null); }), Or(a => { if (i = !0, this.destroyed)
        return r.resolve(!1), $; if (nn(a))
        this.events.next(new M(r.id, this.urlSerializer.serialize(r.extractedUrl), a.message, a.cancellationCode)), Qi(a) ? this.events.next(new be(a.url, a.navigationBehaviorOptions)) : r.resolve(!1);
    else {
        let c = new re(r.id, this.urlSerializer.serialize(r.extractedUrl), a, r.targetSnapshot ?? void 0);
        try {
            let u = L(this.environmentInjector, () => this.navigationErrorHandler?.(c));
            if (u instanceof Ee) {
                let { message: h, cancellationCode: f } = mt(this.urlSerializer, u);
                this.events.next(new M(r.id, this.urlSerializer.serialize(r.extractedUrl), h, f)), this.events.next(new be(u.redirectTo, u.navigationBehaviorOptions));
            }
            else
                throw this.events.next(c), a;
        }
        catch (u) {
            this.options.resolveNavigationPromiseOnError ? r.resolve(!1) : r.reject(u);
        }
    } return $; })); })); }
    cancelNavigationTransition(e, r, i) { let o = new M(e.id, this.urlSerializer.serialize(e.extractedUrl), r, i); this.events.next(o), e.resolve(!1); }
    isUpdatingInternalState() { return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString(); }
    isUpdatedBrowserUrl() { let e = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))), r = Ue(this.currentNavigation), i = r?.targetBrowserUrl ?? r?.extractedUrl; return e.toString() !== i?.toString() && !r?.extras.skipLocationChange; }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })();
function qo(t) { return t !== ye; }
var fr = new ne("");
function yn(t, n, e) { let r = new Set; n.snapshot.root && Rn(n.snapshot.root, r); let i = t.retrieveStoredRouteHandles?.() || []; for (let o of i) {
    let s = o;
    if (s?.route?.value?.snapshot)
        for (let a of s.route.value.snapshot.pathFromRoot)
            a.routeConfig && r.add(a.routeConfig);
} Zt(e, r, t, !1); }
function Rn(t, n) { t.routeConfig && n.add(t.routeConfig); for (let e of t.children)
    Rn(e, n); }
function Zt(t, n, e, r) { for (let i of t) {
    let o = r || !!((i._injector || i._loadedInjector) && !n.has(i) && (e.shouldDestroyInjector?.(i) ?? !1));
    i.children && Zt(i.children, n, e, o), i.loadChildren && i._loadedRoutes && Zt(i._loadedRoutes, n, e, o), o && (i._injector && (i._injector.destroy(), i._injector = void 0), i._loadedInjector && (i._loadedInjector.destroy(), i._loadedInjector = void 0));
} }
function Bo(t) { let n = t; n && n.componentRef && n.componentRef.destroy(); }
var Sn = (() => { class t {
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: () => g(Vo), providedIn: "root" });
} return t; })(), Rt = class {
    shouldDetach(n) { return !1; }
    store(n, e) { }
    shouldAttach(n) { return !1; }
    retrieve(n) { return null; }
    shouldReuseRoute(n, e) { return n.routeConfig === e.routeConfig; }
    shouldDestroyInjector(n) { return !0; }
}, Vo = (() => { class t extends Rt {
    static \u0275fac = (() => { let e; return function (i) { return (e || (e = y.\u0275\u0275getInheritedFactory(t)))(i || t); }; })();
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), Te = (() => { class t {
    urlSerializer = g(ie);
    options = g(X, { optional: !0 }) || {};
    canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
    location = g(Jt);
    urlHandlingStrategy = g(wt);
    urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
    currentUrlTree = new T;
    getCurrentUrlTree() { return this.currentUrlTree; }
    rawUrlTree = this.currentUrlTree;
    getRawUrlTree() { return this.rawUrlTree; }
    createBrowserPath({ finalUrl: e, initialUrl: r, targetBrowserUrl: i }) { let o = e !== void 0 ? this.urlHandlingStrategy.merge(e, r) : r, s = i ?? o; return s instanceof T ? this.urlSerializer.serialize(s) : s; }
    routerUrlState(e) { return e?.targetBrowserUrl === void 0 || e?.finalUrl === void 0 ? {} : { \u0275routerUrl: this.urlSerializer.serialize(e.finalUrl) }; }
    commitTransition({ targetRouterState: e, finalUrl: r, initialUrl: i }) { r && e ? (this.currentUrlTree = r, this.rawUrlTree = this.urlHandlingStrategy.merge(r, i), this.routerState = e) : this.rawUrlTree = i; }
    routerState = Zr(null, g(Xt));
    getRouterState() { return this.routerState; }
    _stateMemento = this.createStateMemento();
    get stateMemento() { return this._stateMemento; }
    updateStateMemento() { this._stateMemento = this.createStateMemento(); }
    createStateMemento() { return { rawUrlTree: this.rawUrlTree, currentUrlTree: this.currentUrlTree, routerState: this.routerState }; }
    restoredState() { return this.location.getState(); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: () => g(Go), providedIn: "root" });
} return t; })(), Go = (() => { class t extends Te {
    currentPageId = 0;
    lastSuccessfulId = -1;
    get browserPageId() { return this.canceledNavigationResolution !== "computed" ? this.currentPageId : this.restoredState()?.\u0275routerPageId ?? this.currentPageId; }
    registerNonRouterCurrentEntryChangeListener(e) { return this.location.subscribe(r => { r.type === "popstate" && setTimeout(() => { e(r.url, r.state, "popstate", { replaceUrl: !0 }); }); }); }
    handleRouterEvent(e, r) { e instanceof J ? this.updateStateMemento() : e instanceof F ? this.commitTransition(r) : e instanceof $e ? this.urlUpdateStrategy === "eager" && (r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r)) : e instanceof de ? (this.commitTransition(r), this.urlUpdateStrategy === "deferred" && !r.extras.skipLocationChange && this.setBrowserUrl(this.createBrowserPath(r), r)) : e instanceof M && !nr(e) ? this.restoreHistory(r) : e instanceof re ? this.restoreHistory(r, !0) : e instanceof N && (this.lastSuccessfulId = e.id, this.currentPageId = this.browserPageId); }
    setBrowserUrl(e, r) { let { extras: i, id: o } = r, { replaceUrl: s, state: a } = i; if (this.location.isCurrentPathEqualTo(e) || s) {
        let c = this.browserPageId, u = l(l({}, a), this.generateNgRouterState(o, c, r));
        this.location.replaceState(e, "", u);
    }
    else {
        let c = l(l({}, a), this.generateNgRouterState(o, this.browserPageId + 1, r));
        this.location.go(e, "", c);
    } }
    restoreHistory(e, r = !1) { if (this.canceledNavigationResolution === "computed") {
        let i = this.browserPageId, o = this.currentPageId - i;
        o !== 0 ? this.location.historyGo(o) : this.getCurrentUrlTree() === e.finalUrl && o === 0 && (this.resetInternalState(e), this.resetUrlToCurrentUrlTree());
    }
    else
        this.canceledNavigationResolution === "replace" && (r && this.resetInternalState(e), this.resetUrlToCurrentUrlTree()); }
    resetInternalState({ finalUrl: e }) { this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, e ?? this.rawUrlTree); }
    resetUrlToCurrentUrlTree() { this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)); }
    generateNgRouterState(e, r, i) { return this.canceledNavigationResolution === "computed" ? l({ navigationId: e, \u0275routerPageId: r }, this.routerUrlState(i)) : l({ navigationId: e }, this.routerUrlState(i)); }
    static \u0275fac = (() => { let e; return function (i) { return (e || (e = y.\u0275\u0275getInheritedFactory(t)))(i || t); }; })();
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })();
function Et(t, n) { t.events.pipe(xe(e => e instanceof N || e instanceof M || e instanceof re || e instanceof F), D(e => e instanceof N || e instanceof F ? 0 : (e instanceof M ? e.code === b.Redirect || e.code === b.SupersededByNewNavigation : !1) ? 2 : 1), xe(e => e !== 2), Le(1)).subscribe(() => { n(); }); }
var q = (() => { class t {
    get currentUrlTree() { return this.stateManager.getCurrentUrlTree(); }
    get rawUrlTree() { return this.stateManager.getRawUrlTree(); }
    disposed = !1;
    nonRouterCurrentEntryChangeSubscription;
    console = g(ai);
    stateManager = g(Te);
    options = g(X, { optional: !0 }) || {};
    pendingTasks = g(si);
    urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
    navigationTransitions = g(It);
    urlSerializer = g(ie);
    location = g(Jt);
    urlHandlingStrategy = g(wt);
    injector = g(Xt);
    _events = new Pt;
    get events() { return this._events; }
    get routerState() { return this.stateManager.getRouterState(); }
    navigated = !1;
    routeReuseStrategy = g(Sn);
    injectorCleanup = g(fr, { optional: !0 });
    onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
    config = g(oe, { optional: !0 })?.flat() ?? [];
    componentInputBindingEnabled = !!g(Ve, { optional: !0 });
    currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
    constructor() { this.resetConfig(this.config), this.navigationTransitions.setupNavigations(this).subscribe({ error: e => { } }), this.subscribeToNavigationEvents(); }
    eventsSubscription = new gi;
    subscribeToNavigationEvents() { let e = this.navigationTransitions.events.subscribe(r => { try {
        let i = this.navigationTransitions.currentTransition, o = Ue(this.navigationTransitions.currentNavigation);
        if (i !== null && o !== null) {
            if (this.stateManager.handleRouterEvent(r, o), r instanceof M && r.code !== b.Redirect && r.code !== b.SupersededByNewNavigation)
                this.navigated = !0;
            else if (r instanceof N)
                this.navigated = !0, this.injectorCleanup?.(this.routeReuseStrategy, this.routerState, this.config);
            else if (r instanceof be) {
                let s = r.navigationBehaviorOptions, a = this.urlHandlingStrategy.merge(r.url, i.currentRawUrl), c = l({ scroll: i.extras.scroll, browserUrl: i.extras.browserUrl, info: i.extras.info, skipLocationChange: i.extras.skipLocationChange, replaceUrl: i.extras.replaceUrl || this.urlUpdateStrategy === "eager" || qo(i.source) }, s);
                this.scheduleNavigation(a, ye, null, c, { resolve: i.resolve, reject: i.reject, promise: i.promise });
            }
        }
        qi(r) && this._events.next(r);
    }
    catch (i) {
        this.navigationTransitions.transitionAbortWithErrorSubject.next(i);
    } }); this.eventsSubscription.add(e); }
    resetRootComponentType(e) { this.routerState.root.component = e, this.navigationTransitions.rootComponentType = e; }
    initialNavigation() { this.setUpLocationChangeListener(), this.navigationTransitions.hasRequestedNavigation || this.navigateToSyncWithBrowser(this.location.path(!0), ye, this.stateManager.restoredState(), { replaceUrl: !0 }); }
    setUpLocationChangeListener() { this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((e, r, i, o) => { this.navigateToSyncWithBrowser(e, i, r, o); }); }
    navigateToSyncWithBrowser(e, r, i, o) { let s = i?.navigationId ? i : null, a = i?.\u0275routerUrl ?? e; if (i?.\u0275routerUrl && (o = E(l({}, o), { browserUrl: e })), i) {
        let u = l({}, i);
        delete u.navigationId, delete u.\u0275routerPageId, delete u.\u0275routerUrl, Object.keys(u).length !== 0 && (o.state = u);
    } let c = this.parseUrl(a); this.scheduleNavigation(c, r, s, o).catch(u => { this.disposed || this.injector.get(ci)(u); }); }
    get url() { return this.serializeUrl(this.currentUrlTree); }
    getCurrentNavigation() { return Ue(this.navigationTransitions.currentNavigation); }
    get lastSuccessfulNavigation() { return this.navigationTransitions.lastSuccessfulNavigation; }
    resetConfig(e) { this.config = e.map(ur), this.navigated = !1; }
    ngOnDestroy() { this.dispose(); }
    dispose() { this._events.unsubscribe(), this.navigationTransitions.complete(), this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(), this.nonRouterCurrentEntryChangeSubscription = void 0, this.disposed = !0, this.eventsSubscription.unsubscribe(); }
    createUrlTree(e, r = {}) { let { relativeTo: i, queryParams: o, fragment: s, queryParamsHandling: a, preserveFragment: c } = r, u = c ? this.currentUrlTree.fragment : s, h = null; switch (a ?? this.options.defaultQueryParamsHandling) {
        case "merge":
            h = l(l({}, this.currentUrlTree.queryParams), o);
            break;
        case "preserve":
            h = this.currentUrlTree.queryParams;
            break;
        default: h = o || null;
    } h !== null && (h = this.removeEmptyProps(h)); let f; try {
        let C = i ? i.snapshot : this.routerState.snapshot.root;
        f = Wr(C);
    }
    catch {
        (typeof e[0] != "string" || e[0][0] !== "/") && (e = []), f = this.currentUrlTree.root;
    } return Qr(f, e, h, u ?? null, this.urlSerializer); }
    navigateByUrl(e, r = { skipLocationChange: !1 }) { let i = te(e) ? e : this.parseUrl(e), o = this.urlHandlingStrategy.merge(i, this.rawUrlTree); return this.scheduleNavigation(o, ye, null, r); }
    navigate(e, r = { skipLocationChange: !1 }) { return Wo(e), this.navigateByUrl(this.createUrlTree(e, r), r); }
    serializeUrl(e) { return this.urlSerializer.serialize(e); }
    parseUrl(e) { try {
        return this.urlSerializer.parse(e);
    }
    catch {
        return this.console.warn(ui(4018, !1)), this.urlSerializer.parse("/");
    } }
    isActive(e, r) { let i; if (r === !0 ? i = l({}, tr) : r === !1 ? i = l({}, je) : i = l(l({}, je), r), te(e))
        return kt(this.currentUrlTree, e, i); let o = this.parseUrl(e); return kt(this.currentUrlTree, o, i); }
    removeEmptyProps(e) { return Object.entries(e).reduce((r, [i, o]) => (o != null && (r[i] = o), r), {}); }
    scheduleNavigation(e, r, i, o, s) { if (this.disposed)
        return Promise.resolve(!1); let a, c, u; s ? (a = s.resolve, c = s.reject, u = s.promise) : u = new Promise((f, C) => { a = f, c = C; }); let h = this.pendingTasks.add(); return Et(this, () => { queueMicrotask(() => this.pendingTasks.remove(h)); }), this.navigationTransitions.handleNavigationRequest({ source: r, restoredState: i, currentUrlTree: this.currentUrlTree, currentRawUrl: this.currentUrlTree, rawUrl: e, extras: o, resolve: a, reject: c, promise: u, currentSnapshot: this.routerState.snapshot, currentRouterState: this.routerState }), u.catch(Promise.reject.bind(Promise)); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = y.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })();
function Wo(t) { for (let n = 0; n < t.length; n++)
    if (t[n] == null)
        throw new A(4008, !1); }
import * as wn from "@angular/common";
import { ViewportScroller as bn, PlatformNavigation as Qo, PlatformLocation as Ko, \u0275PRECOMMIT_HANDLER_SUPPORTED as Yo, LOCATION_INITIALIZED as Zo, Location as In, \u0275NavigationAdapterForLocation as Jo, HashLocationStrategy as En, LocationStrategy as mr, PathLocationStrategy as Xo } from "@angular/common";
import * as d from "@angular/core";
import { inject as S, HostAttributeToken as ea, linkedSignal as ta, untracked as _, signal as U, \u0275INTERNAL_APPLICATION_ERROR_HANDLER as ra, \u0275RuntimeError as os, computed as na, booleanAttribute as pr, EventEmitter as ia, createEnvironmentInjector as oa, InjectionToken as Qe, \u0275IS_HYDRATION_DOM_REUSE_ENABLED as aa, NgZone as sa, ApplicationRef as An, EnvironmentInjector as ca, DestroyRef as ua, afterNextRender as la, \u0275promiseWithResolvers as Cn, makeEnvironmentProviders as da, APP_BOOTSTRAP_LISTENER as Mn, ENVIRONMENT_INITIALIZER as ps, provideAppInitializer as Tn, \u0275IS_ENABLED_BLOCKING_INITIAL_NAVIGATION as ha, Injector as Dn, \u0275performanceMarkFeature as fa } from "@angular/core";
import { Subject as yr, of as ae, from as At } from "rxjs";
import { mergeAll as Mt, catchError as pa, filter as ga, concatMap as va, mergeMap as ma } from "rxjs/operators";
var ya = (() => { class t {
    router = S(q);
    stateManager = S(Te);
    fragment = U("");
    queryParams = U({});
    path = U("");
    serializer = S(ie);
    constructor() { this.updateState(), this.router.events?.subscribe(e => { e instanceof N && this.updateState(); }); }
    updateState() { let { fragment: e, root: r, queryParams: i } = this.stateManager.getCurrentUrlTree(); this.fragment.set(e), this.queryParams.set(i), this.path.set(this.serializer.serialize(new T(r))); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), Tt = (() => { class t {
    router;
    route;
    tabIndexAttribute;
    renderer;
    el;
    locationStrategy;
    hrefAttributeValue = S(new ea("href"), { optional: !0 });
    reactiveHref = ta(() => this.isAnchorElement ? this.computeHref(this._urlTree()) : this.hrefAttributeValue);
    get href() { return _(this.reactiveHref); }
    set href(e) { this.reactiveHref.set(e); }
    set target(e) { this._target.set(e); }
    get target() { return _(this._target); }
    _target = U(void 0);
    set queryParams(e) { this._queryParams.set(e); }
    get queryParams() { return _(this._queryParams); }
    _queryParams = U(void 0, { equal: () => !1 });
    set fragment(e) { this._fragment.set(e); }
    get fragment() { return _(this._fragment); }
    _fragment = U(void 0);
    set queryParamsHandling(e) { this._queryParamsHandling.set(e); }
    get queryParamsHandling() { return _(this._queryParamsHandling); }
    _queryParamsHandling = U(void 0);
    set state(e) { this._state.set(e); }
    get state() { return _(this._state); }
    _state = U(void 0, { equal: () => !1 });
    set info(e) { this._info.set(e); }
    get info() { return _(this._info); }
    _info = U(void 0, { equal: () => !1 });
    set relativeTo(e) { this._relativeTo.set(e); }
    get relativeTo() { return _(this._relativeTo); }
    _relativeTo = U(void 0);
    set preserveFragment(e) { this._preserveFragment.set(e); }
    get preserveFragment() { return _(this._preserveFragment); }
    _preserveFragment = U(!1);
    set skipLocationChange(e) { this._skipLocationChange.set(e); }
    get skipLocationChange() { return _(this._skipLocationChange); }
    _skipLocationChange = U(!1);
    set replaceUrl(e) { this._replaceUrl.set(e); }
    get replaceUrl() { return _(this._replaceUrl); }
    _replaceUrl = U(!1);
    isAnchorElement;
    onChanges = new yr;
    applicationErrorHandler = S(ra);
    options = S(X, { optional: !0 });
    reactiveRouterState = S(ya);
    constructor(e, r, i, o, s, a) { this.router = e, this.route = r, this.tabIndexAttribute = i, this.renderer = o, this.el = s, this.locationStrategy = a; let c = s.nativeElement.tagName?.toLowerCase(); this.isAnchorElement = c === "a" || c === "area" || !!(typeof customElements == "object" && customElements.get(c)?.observedAttributes?.includes?.("href")); }
    setTabIndexIfNotOnNativeEl(e) { this.tabIndexAttribute != null || this.isAnchorElement || this.applyAttributeValue("tabindex", e); }
    ngOnChanges(e) { this.onChanges.next(this); }
    routerLinkInput = U(null);
    set routerLink(e) { e == null ? (this.routerLinkInput.set(null), this.setTabIndexIfNotOnNativeEl(null)) : (te(e) ? this.routerLinkInput.set(e) : this.routerLinkInput.set(Array.isArray(e) ? e : [e]), this.setTabIndexIfNotOnNativeEl("0")); }
    onClick(e, r, i, o, s) { let a = this._urlTree(); if (a === null || this.isAnchorElement && (e !== 0 || r || i || o || s || typeof this.target == "string" && this.target != "_self"))
        return !0; let c = { skipLocationChange: this.skipLocationChange, replaceUrl: this.replaceUrl, state: this.state, info: this.info }; return this.router.navigateByUrl(a, c)?.catch(u => { this.applicationErrorHandler(u); }), !this.isAnchorElement; }
    ngOnDestroy() { }
    applyAttributeValue(e, r) { let i = this.renderer, o = this.el.nativeElement; r !== null ? i.setAttribute(o, e, r) : i.removeAttribute(o, e); }
    _urlTree = na(() => { this.reactiveRouterState.path(), this._preserveFragment() && this.reactiveRouterState.fragment(); let e = i => i === "preserve" || i === "merge"; (e(this._queryParamsHandling()) || e(this.options?.defaultQueryParamsHandling)) && this.reactiveRouterState.queryParams(); let r = this.routerLinkInput(); return r === null || !this.router.createUrlTree ? null : te(r) ? r : this.router.createUrlTree(r, { relativeTo: this._relativeTo() !== void 0 ? this._relativeTo() : this.route, queryParams: this._queryParams(), fragment: this._fragment(), queryParamsHandling: this._queryParamsHandling(), preserveFragment: this._preserveFragment() }); }, { equal: (e, r) => this.computeHref(e) === this.computeHref(r) });
    get urlTree() { return _(this._urlTree); }
    computeHref(e) { return e !== null && this.locationStrategy ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e)) ?? "" : null; }
    static \u0275fac = function (r) { return new (r || t)(d.\u0275\u0275directiveInject(q), d.\u0275\u0275directiveInject(Q), d.\u0275\u0275injectAttribute("tabindex"), d.\u0275\u0275directiveInject(d.Renderer2), d.\u0275\u0275directiveInject(d.ElementRef), d.\u0275\u0275directiveInject(wn.LocationStrategy)); };
    static \u0275dir = d.\u0275\u0275defineDirective({ type: t, selectors: [["", "routerLink", ""]], hostVars: 2, hostBindings: function (r, i) { r & 1 && d.\u0275\u0275listener("click", function (s) { return i.onClick(s.button, s.ctrlKey, s.shiftKey, s.altKey, s.metaKey); }), r & 2 && d.\u0275\u0275attribute("href", i.reactiveHref(), d.\u0275\u0275sanitizeUrlOrResourceUrl)("target", i._target()); }, inputs: { target: "target", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", state: "state", info: "info", relativeTo: "relativeTo", preserveFragment: [2, "preserveFragment", "preserveFragment", pr], skipLocationChange: [2, "skipLocationChange", "skipLocationChange", pr], replaceUrl: [2, "replaceUrl", "replaceUrl", pr], routerLink: "routerLink" }, features: [d.\u0275\u0275NgOnChangesFeature] });
} return t; })(), Ra = (() => { class t {
    router;
    element;
    renderer;
    cdr;
    links;
    classes = [];
    routerEventsSubscription;
    linkInputChangesSubscription;
    _isActive = !1;
    get isActive() { return this._isActive; }
    routerLinkActiveOptions = { exact: !1 };
    ariaCurrentWhenActive;
    isActiveChange = new ia;
    link = S(Tt, { optional: !0 });
    constructor(e, r, i, o) { this.router = e, this.element = r, this.renderer = i, this.cdr = o, this.routerEventsSubscription = e.events.subscribe(s => { s instanceof N && this.update(); }); }
    ngAfterContentInit() { ae(this.links.changes, ae(null)).pipe(Mt()).subscribe(e => { this.update(), this.subscribeToEachLinkOnChanges(); }); }
    subscribeToEachLinkOnChanges() { this.linkInputChangesSubscription?.unsubscribe(); let e = [...this.links.toArray(), this.link].filter(r => !!r).map(r => r.onChanges); this.linkInputChangesSubscription = At(e).pipe(Mt()).subscribe(r => { this._isActive !== this.isLinkActive(this.router)(r) && this.update(); }); }
    set routerLinkActive(e) { let r = Array.isArray(e) ? e : e.split(" "); this.classes = r.filter(i => !!i); }
    ngOnChanges(e) { this.update(); }
    ngOnDestroy() { this.routerEventsSubscription.unsubscribe(), this.linkInputChangesSubscription?.unsubscribe(); }
    update() { !this.links || !this.router.navigated || queueMicrotask(() => { let e = this.hasActiveLinks(); this.classes.forEach(r => { e ? this.renderer.addClass(this.element.nativeElement, r) : this.renderer.removeClass(this.element.nativeElement, r); }), e && this.ariaCurrentWhenActive !== void 0 ? this.renderer.setAttribute(this.element.nativeElement, "aria-current", this.ariaCurrentWhenActive.toString()) : this.renderer.removeAttribute(this.element.nativeElement, "aria-current"), this._isActive !== e && (this._isActive = e, this.cdr.markForCheck(), this.isActiveChange.emit(e)); }); }
    isLinkActive(e) { let r = Sa(this.routerLinkActiveOptions) ? this.routerLinkActiveOptions : this.routerLinkActiveOptions.exact ?? !1 ? l({}, tr) : l({}, je); return i => { let o = i.urlTree; return o ? _(rr(o, e, r)) : !1; }; }
    hasActiveLinks() { let e = this.isLinkActive(this.router); return this.link && e(this.link) || this.links.some(e); }
    static \u0275fac = function (r) { return new (r || t)(d.\u0275\u0275directiveInject(q), d.\u0275\u0275directiveInject(d.ElementRef), d.\u0275\u0275directiveInject(d.Renderer2), d.\u0275\u0275directiveInject(d.ChangeDetectorRef)); };
    static \u0275dir = d.\u0275\u0275defineDirective({ type: t, selectors: [["", "routerLinkActive", ""]], contentQueries: function (r, i, o) { if (r & 1 && d.\u0275\u0275contentQuery(o, Tt, 5), r & 2) {
            let s;
            d.\u0275\u0275queryRefresh(s = d.\u0275\u0275loadQuery()) && (i.links = s);
        } }, inputs: { routerLinkActiveOptions: "routerLinkActiveOptions", ariaCurrentWhenActive: "ariaCurrentWhenActive", routerLinkActive: "routerLinkActive" }, outputs: { isActiveChange: "isActiveChange" }, exportAs: ["routerLinkActive"], features: [d.\u0275\u0275NgOnChangesFeature] });
} return t; })();
function Sa(t) { let n = t; return !!(n.paths || n.matrixParams || n.queryParams || n.fragment); }
var We = class {
}, Ca = (() => { class t {
    preload(e, r) { return r().pipe(pa(() => ae(null))); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), wa = (() => { class t {
    preload(e, r) { return ae(null); }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), Nn = (() => { class t {
    router;
    injector;
    preloadingStrategy;
    loader;
    subscription;
    constructor(e, r, i, o) { this.router = e, this.injector = r, this.preloadingStrategy = i, this.loader = o; }
    setUpPreloading() { this.subscription = this.router.events.pipe(ga(e => e instanceof N), va(() => this.preload())).subscribe(() => { }); }
    preload() { return this.processRoutes(this.injector, this.router.config); }
    ngOnDestroy() { this.subscription?.unsubscribe(); }
    processRoutes(e, r) { let i = []; for (let o of r) {
        o.providers && !o._injector && (o._injector = oa(o.providers, e, ""));
        let s = o._injector ?? e;
        o._loadedNgModuleFactory && !o._loadedInjector && (o._loadedInjector = o._loadedNgModuleFactory.create(s).injector);
        let a = o._loadedInjector ?? s;
        (o.loadChildren && !o._loadedRoutes && o.canLoad === void 0 || o.loadComponent && !o._loadedComponent) && i.push(this.preloadConfig(s, o)), (o.children || o._loadedRoutes) && i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
    } return At(i).pipe(Mt()); }
    preloadConfig(e, r) { return this.preloadingStrategy.preload(r, () => { if (e.destroyed)
        return ae(null); let i; r.loadChildren && r.canLoad === void 0 ? i = At(this.loader.loadChildren(e, r)) : i = ae(null); let o = i.pipe(ma(s => s === null ? ae(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, r._loadedNgModuleFactory = s.factory, this.processRoutes(s.injector ?? e, s.routes)))); if (r.loadComponent && !r._loadedComponent) {
        let s = this.loader.loadComponent(e, r);
        return At([o, s]).pipe(Mt());
    }
    else
        return o; }); }
    static \u0275fac = function (r) { return new (r || t)(d.\u0275\u0275inject(q), d.\u0275\u0275inject(d.EnvironmentInjector), d.\u0275\u0275inject(We), d.\u0275\u0275inject(Ct)); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })(), Dt = new Qe(""), _n = (() => { class t {
    options;
    routerEventsSubscription;
    scrollEventsSubscription;
    lastId = 0;
    lastSource = ye;
    restoredId = 0;
    store = {};
    isHydrating = S(aa, { optional: !0 }) ?? !1;
    urlSerializer = S(ie);
    zone = S(sa);
    viewportScroller = S(bn);
    transitions = S(It);
    constructor(e) { this.options = e, this.options.scrollPositionRestoration ||= "disabled", this.options.anchorScrolling ||= "disabled", this.isHydrating && S(An).whenStable().then(() => { this.isHydrating = !1; }); }
    init() { this.options.scrollPositionRestoration !== "disabled" && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents(); }
    createScrollEvents() { return this.transitions.events.subscribe(e => { e instanceof J ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = e.navigationTrigger, this.restoredId = e.restoredState ? e.restoredState.navigationId : 0) : e instanceof N ? (this.lastId = e.id, this.scheduleScrollEvent(e, this.urlSerializer.parse(e.urlAfterRedirects).fragment)) : e instanceof F && e.code === Se.IgnoredSameUrlNavigation && (this.lastSource = void 0, this.restoredId = 0, this.scheduleScrollEvent(e, this.urlSerializer.parse(e.url).fragment)); }); }
    consumeScrollEvents() { return this.transitions.events.subscribe(e => { if (!(e instanceof Ce) || e.scrollBehavior === "manual")
        return; let r = { behavior: "instant" }; e.position ? this.options.scrollPositionRestoration === "top" ? this.viewportScroller.scrollToPosition([0, 0], r) : this.options.scrollPositionRestoration === "enabled" && this.viewportScroller.scrollToPosition(e.position, r) : e.anchor && this.options.anchorScrolling === "enabled" ? this.viewportScroller.scrollToAnchor(e.anchor) : this.options.scrollPositionRestoration !== "disabled" && this.viewportScroller.scrollToPosition([0, 0]); }); }
    scheduleScrollEvent(e, r) { if (this.isHydrating)
        return; let i = _(this.transitions.currentNavigation)?.extras.scroll; this.zone.runOutsideAngular(() => R(this, null, function* () { yield new Promise(o => { setTimeout(o), typeof requestAnimationFrame < "u" && requestAnimationFrame(o); }), this.zone.run(() => { this.transitions.events.next(new Ce(e, this.lastSource === "popstate" ? this.store[this.restoredId] : null, r, i)); }); })); }
    ngOnDestroy() { this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe(); }
    static \u0275fac = function (r) { d.\u0275\u0275invalidFactory(); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac });
} return t; })();
var ba = (() => { class t extends Te {
    injector = S(ca);
    navigation = S(Qo);
    inMemoryScrollingEnabled = S(Dt, { optional: !0 }) !== null;
    base = new URL(S(Ko).href).origin;
    appRootURL = new URL(this.location.prepareExternalUrl?.("/") ?? "/", this.base).href;
    precommitHandlerSupported = S(Yo);
    activeHistoryEntry = this.navigation.currentEntry;
    currentNavigation = {};
    nonRouterCurrentEntryChangeSubject = new yr;
    nonRouterEntryChangeListener;
    get registered() { return this.nonRouterEntryChangeListener !== void 0 && !this.nonRouterEntryChangeListener.closed; }
    constructor() { super(); let e = r => { this.handleNavigate(r); }; this.navigation.addEventListener("navigate", e), S(ua).onDestroy(() => this.navigation.removeEventListener("navigate", e)); }
    registerNonRouterCurrentEntryChangeListener(e) { return this.activeHistoryEntry = this.navigation.currentEntry, this.nonRouterEntryChangeListener = this.nonRouterCurrentEntryChangeSubject.subscribe(({ path: r, state: i }) => { e(r, i, "popstate", this.precommitHandlerSupported ? {} : { replaceUrl: !0 }); }), this.nonRouterEntryChangeListener; }
    handleRouterEvent(e, r) { return R(this, null, function* () { if (this.currentNavigation = E(l({}, this.currentNavigation), { routerTransition: r }), e instanceof J)
        this.updateStateMemento(), this.precommitHandlerSupported && this.maybeCreateNavigationForTransition(r);
    else if (e instanceof F)
        this.finishNavigation(), this.commitTransition(r);
    else if (e instanceof we)
        r.routesRecognizeHandler.deferredHandle = new Promise(i => R(this, null, function* () { if (this.urlUpdateStrategy === "eager")
            try {
                this.maybeCreateNavigationForTransition(r), yield this.currentNavigation.commitUrl?.();
            }
            catch {
                return;
            } i(); }));
    else if (e instanceof de)
        r.beforeActivateHandler.deferredHandle = new Promise(i => R(this, null, function* () { if (this.urlUpdateStrategy === "deferred")
            try {
                this.maybeCreateNavigationForTransition(r), yield this.currentNavigation.commitUrl?.();
            }
            catch {
                return;
            } this.commitTransition(r), i(); }));
    else if (e instanceof M || e instanceof re) {
        if (e instanceof M && e.code === b.Redirect && !!this.currentNavigation.commitUrl)
            return;
        this.cancel(r, e);
    }
    else if (e instanceof N) {
        let { resolveHandler: i, removeAbortListener: o } = this.currentNavigation;
        this.currentNavigation = {}, o?.(), this.activeHistoryEntry = this.navigation.currentEntry, la({ read: () => i?.() }, { injector: this.injector });
    } }); }
    maybeCreateNavigationForTransition(e) { let { navigationEvent: r, commitUrl: i } = this.currentNavigation; if (i || r && r.navigationType === "traverse" && this.eventAndRouterDestinationsMatch(r, e))
        return; this.currentNavigation.removeAbortListener?.(); let o = this.createBrowserPath(e); this.navigate(o, e); }
    navigate(e, r) { let i = r.extras.skipLocationChange ? this.navigation.currentEntry.url : this.location.prepareExternalUrl(e), o = l(l({}, r.extras.state), this.generateNgRouterState(r)), s = { \u0275routerInfo: { intercept: !0 } }; !this.navigation.transition && this.currentNavigation.navigationEvent && (r.extras.replaceUrl = !1); let a = this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl || r.extras.skipLocationChange ? "replace" : "push"; gr(this.navigation.navigate(i, { state: o, history: a, info: s })); }
    finishNavigation() { this.currentNavigation.commitUrl?.(), this.currentNavigation?.resolveHandler?.(), this.currentNavigation = {}; }
    cancel(e, r) { return R(this, null, function* () { this.currentNavigation.rejectNavigateEvent?.(); let i = {}; if (this.currentNavigation = i, nr(r))
        return; let o = this.canceledNavigationResolution === "computed" && this.navigation.currentEntry.key !== this.activeHistoryEntry.key; if (this.resetInternalState(e.finalUrl, o), this.navigation.currentEntry.id !== this.activeHistoryEntry.id && !(r instanceof M && r.code === b.Aborted && (yield Promise.resolve(), this.currentNavigation !== i)))
        if (o)
            gr(this.navigation.traverseTo(this.activeHistoryEntry.key, { info: { \u0275routerInfo: { intercept: !1 } } }));
        else {
            let s = this.urlSerializer.serialize(this.getCurrentUrlTree()), a = this.location.prepareExternalUrl(s);
            gr(this.navigation.navigate(a, { state: this.activeHistoryEntry.getState(), history: "replace", info: { \u0275routerInfo: { intercept: !1 } } }));
        } }); }
    resetInternalState(e, r) { this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = r ? this.stateMemento.rawUrlTree : this.urlHandlingStrategy.merge(this.currentUrlTree, e ?? this.rawUrlTree); }
    handleNavigate(e) { if (!e.canIntercept || e.navigationType === "reload")
        return; let r = e?.info?.\u0275routerInfo; if (r && !r.intercept)
        return; let i = !!r; if (!i && (this.currentNavigation.routerTransition?.abort(), !this.registered)) {
        this.finishNavigation();
        return;
    } this.currentNavigation = l({}, this.currentNavigation), this.currentNavigation.navigationEvent = e; let o = () => { this.currentNavigation.routerTransition?.abort(); }; e.signal.addEventListener("abort", o), this.currentNavigation.removeAbortListener = () => e.signal.removeEventListener("abort", o); let a = { scroll: this.inMemoryScrollingEnabled ? "manual" : this.currentNavigation.routerTransition?.extras.scroll ?? "after-transition" }, { promise: c, resolve: u, reject: h } = Cn(), { promise: f, resolve: C, reject: K } = Cn(); if (this.currentNavigation.rejectNavigateEvent = () => { e.signal.removeEventListener("abort", o), K(), h(); }, this.currentNavigation.resolveHandler = () => { this.currentNavigation.removeAbortListener?.(), u(); }, c.catch(() => { }), f.catch(() => { }), a.handler = () => c, this.deferredCommitSupported(e)) {
        let j = new Promise(I => { a.precommitHandler = k => (this.navigation.transition?.navigationType === "traverse" ? I(() => { }) : I(k.redirect.bind(k)), f); });
        this.currentNavigation.commitUrl = () => R(this, null, function* () { this.currentNavigation.commitUrl = void 0; let I = this.currentNavigation.routerTransition; if (I && !I.extras.skipLocationChange) {
            let k = this.createBrowserPath(I), De = this.location.isCurrentPathEqualTo(k) || I.extras.replaceUrl ? "replace" : "push", se = l(l({}, I.extras.state), this.generateNgRouterState(I)), ge = this.location.prepareExternalUrl(k);
            (yield j)(ge, { state: se, history: De });
        } return C(), yield this.navigation.transition?.committed; });
    } e.intercept(a), i || this.handleNavigateEventTriggeredOutsideRouterAPIs(e); }
    handleNavigateEventTriggeredOutsideRouterAPIs(e) { let r = e.destination.url.substring(this.appRootURL.length - 1), i = e.destination.getState(); this.nonRouterCurrentEntryChangeSubject.next({ path: r, state: i }); }
    eventAndRouterDestinationsMatch(e, r) { let i = this.createBrowserPath(r), o = new URL(e.destination.url), s = this.location.prepareExternalUrl(i); return new URL(s, o.origin).href === o.href; }
    generateNgRouterState(e) { return E(l({}, this.routerUrlState(e)), { navigationId: e.id }); }
    deferredCommitSupported(e) { return this.precommitHandlerSupported && e.cancelable; }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275prov = d.\u0275\u0275defineInjectable({ token: t, factory: t.\u0275fac, providedIn: "root" });
} return t; })();
function gr(t) { return t.finished?.catch(() => { }), t.committed?.catch(() => { }), t; }
function Ia(t, ...n) { return da([{ provide: oe, multi: !0, useValue: t }, [], { provide: Q, useFactory: Un }, { provide: Mn, multi: !0, useFactory: On }, n.map(e => e.\u0275providers)]); }
function Un() { return S(q).routerState.root; }
function x(t, n) { return { \u0275kind: t, \u0275providers: n }; }
function Ea(t) { return [{ provide: oe, multi: !0, useValue: t }, []]; }
function Aa(t = {}) { return x(4, [{ provide: Dt, useFactory: () => new _n(t) }]); }
function Ma() { return x(11, [{ provide: Te, useExisting: ba }, { provide: In, useClass: Jo }, []]); }
function On() { let t = S(Dn); return n => { let e = t.get(An); if (n !== e.components[0])
    return; let r = t.get(q), i = t.get(Pn); t.get(Rr) === 1 && r.initialNavigation(), t.get(jn, null, { optional: !0 })?.setUpPreloading(), t.get(Dt, null, { optional: !0 })?.init(), r.resetRootComponentType(e.componentTypes[0]), i.closed || (i.next(), i.complete(), i.unsubscribe()); }; }
var Pn = new Qe("", { factory: () => new yr }), Rr = new Qe("", { factory: () => 1 });
function Ln() { let t = [{ provide: ha, useValue: !0 }, { provide: Rr, useValue: 0 }, Tn(() => { let n = S(Dn); return n.get(Zo, Promise.resolve()).then(() => new Promise(r => { let i = n.get(q), o = n.get(Pn); Et(i, () => { r(!0); }), n.get(It).afterPreactivation = () => (r(!0), o.closed ? ae(void 0) : o), i.initialNavigation(); })); })]; return x(2, t); }
function xn() { let t = [Tn(() => { S(q).setUpLocationChangeListener(); }), { provide: Rr, useValue: 2 }]; return x(3, t); }
function Ta() { let t = []; return t = [], x(1, t); }
var jn = new Qe("");
function kn(t) { return x(0, [{ provide: jn, useExisting: Nn }, { provide: We, useExisting: t }]); }
function Da(t) { return x(5, [{ provide: X, useValue: t }]); }
function Na() { return x(6, [{ provide: mr, useClass: En }]); }
function _a(t) { return x(7, [{ provide: bt, useValue: t }]); }
function Ua() { return x(10, [{ provide: fr, useValue: yn }]); }
function $n() { return x(8, [sr, { provide: Ve, useExisting: sr }]); }
function zn(t) { fa("NgRouterViewTransitions"); let n = [{ provide: dr, useValue: mn }, { provide: hr, useValue: l({ skipNextTransition: !!t?.skipInitialTransition }, t) }]; return x(9, n); }
var Hn = [In, { provide: ie, useClass: Z }, q, pe, { provide: Q, useFactory: Un }, Ct, []], Oa = (() => { class t {
    constructor() { }
    static forRoot(e, r) { return { ngModule: t, providers: [Hn, [], { provide: oe, multi: !0, useValue: e }, [], r?.errorHandler ? { provide: bt, useValue: r.errorHandler } : [], { provide: X, useValue: r || {} }, r?.useHash ? La() : xa(), Pa(), r?.preloadingStrategy ? kn(r.preloadingStrategy).\u0275providers : [], r?.initialNavigation ? ja(r) : [], r?.bindToComponentInputs ? $n().\u0275providers : [], r?.enableViewTransitions ? zn().\u0275providers : [], ka()] }; }
    static forChild(e) { return { ngModule: t, providers: [{ provide: oe, multi: !0, useValue: e }] }; }
    static \u0275fac = function (r) { return new (r || t); };
    static \u0275mod = d.\u0275\u0275defineNgModule({ type: t });
    static \u0275inj = d.\u0275\u0275defineInjector({});
} return t; })();
function Pa() { return { provide: Dt, useFactory: () => { let t = S(bn), n = S(X); return n.scrollOffset && t.setOffset(n.scrollOffset), new _n(n); } }; }
function La() { return { provide: mr, useClass: En }; }
function xa() { return { provide: mr, useClass: Xo }; }
function ja(t) { return [t.initialNavigation === "disabled" ? xn().\u0275providers : [], t.initialNavigation === "enabledBlocking" ? Ln().\u0275providers : []]; }
var vr = new Qe("");
function ka() { return [{ provide: vr, useFactory: On }, { provide: Mn, multi: !0, useExisting: vr }]; }
import { inject as Ke, Version as $a } from "@angular/core";
import "@angular/common";
import "rxjs";
import "rxjs/operators";
import "@angular/platform-browser";
function Ts(t) { return t.map(n => (...e) => Ke(n).canMatch(...e)); }
function Ds(t) { return t.map(n => (...e) => Ke(n).canActivate(...e)); }
function Ns(t) { return t.map(n => (...e) => Ke(n).canActivateChild(...e)); }
function _s(t) { return t.map(n => (...e) => Ke(n).canDeactivate(...e)); }
function Us(t) { return (...n) => Ke(t).resolve(...n); }
var Os = new $a("21.2.14");
export { Q as ActivatedRoute, Ie as ActivatedRouteSnapshot, pt as ActivationEnd, ft as ActivationStart, Rt as BaseRouteReuseStrategy, ht as ChildActivationEnd, dt as ChildActivationStart, pe as ChildrenOutletContexts, fn as DefaultTitleStrategy, Z as DefaultUrlSerializer, w as EventType, at as GuardsCheckEnd, ot as GuardsCheckStart, M as NavigationCancel, b as NavigationCancellationCode, N as NavigationEnd, re as NavigationError, F as NavigationSkipped, Se as NavigationSkippedCode, J as NavigationStart, wa as NoPreloading, gt as OutletContext, p as PRIMARY_OUTLET, Ca as PreloadAllModules, We as PreloadingStrategy, X as ROUTER_CONFIGURATION, vr as ROUTER_INITIALIZER, en as ROUTER_OUTLET_DATA, oe as ROUTES, Ee as RedirectCommand, ct as ResolveEnd, st as ResolveStart, lt as RouteConfigLoadEnd, ut as RouteConfigLoadStart, Sn as RouteReuseStrategy, q as Router, P as RouterEvent, Tt as RouterLink, Ra as RouterLinkActive, Tt as RouterLinkWithHref, Oa as RouterModule, ar as RouterOutlet, Nn as RouterPreloader, ze as RouterState, He as RouterStateSnapshot, $e as RoutesRecognized, Ce as Scroll, lr as TitleStrategy, wt as UrlHandlingStrategy, ee as UrlSegment, m as UrlSegmentGroup, ie as UrlSerializer, T as UrlTree, Os as VERSION, le as convertToParamMap, Gr as createUrlTreeFromSnapshot, Lr as defaultUrlMatcher, Bo as destroyDetachedRouteHandle, rr as isActive, Ds as mapToCanActivate, Ns as mapToCanActivateChild, _s as mapToCanDeactivate, Ts as mapToCanMatch, Us as mapToResolve, Ia as provideRouter, Ea as provideRoutes, $n as withComponentInputBinding, Ta as withDebugTracing, xn as withDisabledInitialNavigation, Ln as withEnabledBlockingInitialNavigation, Ua as withExperimentalAutoCleanupInjectors, Ma as withExperimentalPlatformNavigation, Na as withHashLocation, Aa as withInMemoryScrolling, _a as withNavigationErrorHandler, kn as withPreloading, Da as withRouterConfig, zn as withViewTransitions, cr as \u0275EmptyOutletComponent, Hn as \u0275ROUTER_PROVIDERS, Et as \u0275afterNextNavigation, pn as \u0275loadChildren };
/*! Bundled license information:

@angular/router/fesm2022/_router-chunk.mjs:
@angular/router/fesm2022/_router_module-chunk.mjs:
@angular/router/fesm2022/router.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
