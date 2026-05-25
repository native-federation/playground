var Ce = Object.defineProperty, be = Object.defineProperties;
var Ae = Object.getOwnPropertyDescriptors;
var W = Object.getOwnPropertySymbols;
var Ie = Object.prototype.hasOwnProperty, Oe = Object.prototype.propertyIsEnumerable;
var q = (n, r, e) => r in n ? Ce(n, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[r] = e, I = (n, r) => { for (var e in r ||= {})
    Ie.call(r, e) && q(n, e, r[e]); if (W)
    for (var e of W(r))
        Oe.call(r, e) && q(n, e, r[e]); return n; }, Q = (n, r) => be(n, Ae(r));
var B = (n, r, e) => new Promise((t, o) => { var s = c => { try {
    a(e.next(c));
}
catch (d) {
    o(d);
} }, i = c => { try {
    a(e.throw(c));
}
catch (d) {
    o(d);
} }, a = c => c.done ? t(c.value) : Promise.resolve(c.value).then(s, i); a((e = e.apply(n, r)).next()); });
import { \u0275DomAdapter as Ve, \u0275setRootDomAdapter as ze, \u0275parseCookieValue as Ge, \u0275getDOM as de, DOCUMENT as ue, CommonModule as $e, XhrFactory as Ye, \u0275PLATFORM_BROWSER_ID as Ze } from "@angular/common";
import * as h from "@angular/core";
import { \u0275global as v, \u0275RuntimeError as Je, InjectionToken as en, ApplicationModule as Ke, \u0275INJECTOR_SCOPE as Xe, ErrorHandler as fe, RendererFactory2 as We, \u0275TESTABILITY_GETTER as qe, Testability as Y, \u0275TESTABILITY as Qe, \u0275internalCreateApplication as pe, createPlatformFactory as et, platformCore as tt, PLATFORM_ID as nt, PLATFORM_INITIALIZER as rt, \u0275resolveComponentResources as tn, \u0275setDocument as ot } from "@angular/core";
import { DOCUMENT as G, \u0275getDOM as Ne } from "@angular/common";
import * as l from "@angular/core";
import { InjectionToken as re, \u0275RuntimeError as V, APP_ID as oe, CSP_NONCE as se, PLATFORM_ID as Le, ViewEncapsulation as E, \u0275TracingService as He, RendererStyleFlags2 as O, \u0275allLeavingAnimations as Pe } from "@angular/core";
var g = class {
    _doc;
    constructor(r) { this._doc = r; }
    manager;
}, w = (() => { class n extends g {
    constructor(e) { super(e); }
    supports(e) { return !0; }
    addEventListener(e, t, o, s) { return e.addEventListener(t, o, s), () => this.removeEventListener(e, t, o, s); }
    removeEventListener(e, t, o, s) { return e.removeEventListener(t, o, s); }
    static \u0275fac = function (t) { return new (t || n)(l.\u0275\u0275inject(G)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), S = new re(""), P = (() => { class n {
    _zone;
    _plugins;
    _eventNameToPlugin = new Map;
    constructor(e, t) { this._zone = t, e.forEach(i => { i.manager = this; }); let o = e.filter(i => !(i instanceof w)); this._plugins = o.slice().reverse(); let s = e.find(i => i instanceof w); s && this._plugins.push(s); }
    addEventListener(e, t, o, s) { return this._findPluginFor(t).addEventListener(e, t, o, s); }
    getZone() { return this._zone; }
    _findPluginFor(e) { let t = this._eventNameToPlugin.get(e); if (t)
        return t; if (t = this._plugins.find(s => s.supports(e)), !t)
        throw new V(5101, !1); return this._eventNameToPlugin.set(e, t), t; }
    static \u0275fac = function (t) { return new (t || n)(l.\u0275\u0275inject(S), l.\u0275\u0275inject(l.NgZone)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), N = "ng-app-id";
function ee(n) { for (let r of n)
    r.remove(); }
function te(n, r) { let e = r.createElement("style"); return e.textContent = n, e; }
function ke(n, r, e, t) { let o = n.head?.querySelectorAll(`style[${N}="${r}"],link[${N}="${r}"]`); if (o)
    for (let s of o)
        s.removeAttribute(N), s instanceof HTMLLinkElement ? t.set(s.href.slice(s.href.lastIndexOf("/") + 1), { usage: 0, elements: [s] }) : s.textContent && e.set(s.textContent, { usage: 0, elements: [s] }); }
function z(n, r) { let e = r.createElement("link"); return e.setAttribute("rel", "stylesheet"), e.setAttribute("href", n), e; }
var k = (() => { class n {
    doc;
    appId;
    nonce;
    inline = new Map;
    external = new Map;
    hosts = new Set;
    constructor(e, t, o, s = {}) { this.doc = e, this.appId = t, this.nonce = o, ke(e, t, this.inline, this.external), this.hosts.add(e.head); }
    addStyles(e, t) { for (let o of e)
        this.addUsage(o, this.inline, te); t?.forEach(o => this.addUsage(o, this.external, z)); }
    removeStyles(e, t) { for (let o of e)
        this.removeUsage(o, this.inline); t?.forEach(o => this.removeUsage(o, this.external)); }
    addUsage(e, t, o) { let s = t.get(e); s ? s.usage++ : t.set(e, { usage: 1, elements: [...this.hosts].map(i => this.addElement(i, o(e, this.doc))) }); }
    removeUsage(e, t) { let o = t.get(e); o && (o.usage--, o.usage <= 0 && (ee(o.elements), t.delete(e))); }
    ngOnDestroy() { for (let [, { elements: e }] of [...this.inline, ...this.external])
        ee(e); this.hosts.clear(); }
    addHost(e) { this.hosts.add(e); for (let [t, { elements: o }] of this.inline)
        o.push(this.addElement(e, te(t, this.doc))); for (let [t, { elements: o }] of this.external)
        o.push(this.addElement(e, z(t, this.doc))); }
    removeHost(e) { this.hosts.delete(e); }
    addElement(e, t) { return this.nonce && t.setAttribute("nonce", this.nonce), typeof ngServerMode < "u" && ngServerMode && t.setAttribute(N, this.appId), e.appendChild(t); }
    static \u0275fac = function (t) { return new (t || n)(l.\u0275\u0275inject(G), l.\u0275\u0275inject(oe), l.\u0275\u0275inject(se, 8), l.\u0275\u0275inject(Le)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), F = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/", math: "http://www.w3.org/1998/Math/MathML" }, $ = /%COMP%/g;
var ie = "%COMP%", Ue = `_nghost-${ie}`, je = `_ngcontent-${ie}`, xe = !0, ae = new re("", { factory: () => xe });
function Be(n) { return je.replace($, n); }
function Fe(n) { return Ue.replace($, n); }
function ce(n, r) { return r.map(e => e.replace($, n)); }
var U = (() => { class n {
    eventManager;
    sharedStylesHost;
    appId;
    removeStylesOnCompDestroy;
    doc;
    ngZone;
    nonce;
    tracingService;
    rendererByCompId = new Map;
    defaultRenderer;
    constructor(e, t, o, s, i, a, c = null, d = null) { this.eventManager = e, this.sharedStylesHost = t, this.appId = o, this.removeStylesOnCompDestroy = s, this.doc = i, this.ngZone = a, this.nonce = c, this.tracingService = d, this.defaultRenderer = new _(e, i, a, this.tracingService); }
    createRenderer(e, t) { if (!e || !t)
        return this.defaultRenderer; typeof ngServerMode < "u" && ngServerMode && (t.encapsulation === E.ShadowDom || t.encapsulation === E.ExperimentalIsolatedShadowDom) && (t = Q(I({}, t), { encapsulation: E.Emulated })); let o = this.getOrCreateRenderer(e, t); return o instanceof H ? o.applyToHost(e) : o instanceof T && o.applyStyles(), o; }
    getOrCreateRenderer(e, t) { let o = this.rendererByCompId, s = o.get(t.id); if (!s) {
        let i = this.doc, a = this.ngZone, c = this.eventManager, d = this.sharedStylesHost, f = this.removeStylesOnCompDestroy, p = this.tracingService;
        switch (t.encapsulation) {
            case E.Emulated:
                s = new H(c, d, t, this.appId, f, i, a, p);
                break;
            case E.ShadowDom: return new L(c, e, t, i, a, this.nonce, p, d);
            case E.ExperimentalIsolatedShadowDom: return new L(c, e, t, i, a, this.nonce, p);
            default:
                s = new T(c, d, t, f, i, a, p);
                break;
        }
        o.set(t.id, s);
    } return s; }
    ngOnDestroy() { this.rendererByCompId.clear(); }
    componentReplaced(e) { this.rendererByCompId.delete(e); }
    static \u0275fac = function (t) { return new (t || n)(l.\u0275\u0275inject(P), l.\u0275\u0275inject(k), l.\u0275\u0275inject(oe), l.\u0275\u0275inject(ae), l.\u0275\u0275inject(G), l.\u0275\u0275inject(l.NgZone), l.\u0275\u0275inject(se), l.\u0275\u0275inject(He, 8)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), _ = class {
    eventManager;
    doc;
    ngZone;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(r, e, t, o) { this.eventManager = r, this.doc = e, this.ngZone = t, this.tracingService = o; }
    destroy() { }
    destroyNode = null;
    createElement(r, e) { return e ? this.doc.createElementNS(F[e] || e, r) : this.doc.createElement(r); }
    createComment(r) { return this.doc.createComment(r); }
    createText(r) { return this.doc.createTextNode(r); }
    appendChild(r, e) { (ne(r) ? r.content : r).appendChild(e); }
    insertBefore(r, e, t) { r && (ne(r) ? r.content : r).insertBefore(e, t); }
    removeChild(r, e) { e.remove(); }
    selectRootElement(r, e) { let t = typeof r == "string" ? this.doc.querySelector(r) : r; if (!t)
        throw new V(-5104, !1); return e || (t.textContent = ""), t; }
    parentNode(r) { return r.parentNode; }
    nextSibling(r) { return r.nextSibling; }
    setAttribute(r, e, t, o) { if (o) {
        e = o + ":" + e;
        let s = F[o];
        s ? r.setAttributeNS(s, e, t) : r.setAttribute(e, t);
    }
    else
        r.setAttribute(e, t); }
    removeAttribute(r, e, t) { if (t) {
        let o = F[t];
        o ? r.removeAttributeNS(o, e) : r.removeAttribute(`${t}:${e}`);
    }
    else
        r.removeAttribute(e); }
    addClass(r, e) { r.classList.add(e); }
    removeClass(r, e) { r.classList.remove(e); }
    setStyle(r, e, t, o) { o & (O.DashCase | O.Important) ? r.style.setProperty(e, t, o & O.Important ? "important" : "") : r.style[e] = t; }
    removeStyle(r, e, t) { t & O.DashCase ? r.style.removeProperty(e) : r.style[e] = ""; }
    setProperty(r, e, t) { r != null && (r[e] = t); }
    setValue(r, e) { r.nodeValue = e; }
    listen(r, e, t, o) { if (typeof r == "string" && (r = Ne().getGlobalEventTarget(this.doc, r), !r))
        throw new V(5102, !1); let s = this.decoratePreventDefault(t); return this.tracingService?.wrapEventListener && (s = this.tracingService.wrapEventListener(r, e, s)), this.eventManager.addEventListener(r, e, s, o); }
    decoratePreventDefault(r) { return e => { if (e === "__ngUnwrap__")
        return r; (typeof ngServerMode < "u" && ngServerMode ? this.ngZone.runGuarded(() => r(e)) : r(e)) === !1 && e.preventDefault(); }; }
};
function ne(n) { return n.tagName === "TEMPLATE" && n.content !== void 0; }
var L = class extends _ {
    hostEl;
    sharedStylesHost;
    shadowRoot;
    constructor(r, e, t, o, s, i, a, c) { super(r, o, s, a), this.hostEl = e, this.sharedStylesHost = c, this.shadowRoot = e.attachShadow({ mode: "open" }), this.sharedStylesHost && this.sharedStylesHost.addHost(this.shadowRoot); let d = t.styles; d = ce(t.id, d); for (let p of d) {
        let y = document.createElement("style");
        i && y.setAttribute("nonce", i), y.textContent = p, this.shadowRoot.appendChild(y);
    } let f = t.getExternalStyles?.(); if (f)
        for (let p of f) {
            let y = z(p, o);
            i && y.setAttribute("nonce", i), this.shadowRoot.appendChild(y);
        } }
    nodeOrShadowRoot(r) { return r === this.hostEl ? this.shadowRoot : r; }
    appendChild(r, e) { return super.appendChild(this.nodeOrShadowRoot(r), e); }
    insertBefore(r, e, t) { return super.insertBefore(this.nodeOrShadowRoot(r), e, t); }
    removeChild(r, e) { return super.removeChild(null, e); }
    parentNode(r) { return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(r))); }
    destroy() { this.sharedStylesHost && this.sharedStylesHost.removeHost(this.shadowRoot); }
}, T = class extends _ {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(r, e, t, o, s, i, a, c) { super(r, s, i, a), this.sharedStylesHost = e, this.removeStylesOnCompDestroy = o; let d = t.styles; this.styles = c ? ce(c, d) : d, this.styleUrls = t.getExternalStyles?.(c); }
    applyStyles() { this.sharedStylesHost.addStyles(this.styles, this.styleUrls); }
    destroy() { this.removeStylesOnCompDestroy && Pe.size === 0 && this.sharedStylesHost.removeStyles(this.styles, this.styleUrls); }
}, H = class extends T {
    contentAttr;
    hostAttr;
    constructor(r, e, t, o, s, i, a, c) { let d = o + "-" + t.id; super(r, e, t, s, i, a, c, d), this.contentAttr = Be(d), this.hostAttr = Fe(d); }
    applyToHost(r) { this.applyStyles(), this.setAttribute(r, this.hostAttr, ""); }
    createElement(r, e) { let t = super.createElement(r, e); return super.setAttribute(t, this.contentAttr, ""), t; }
};
var j = class n extends Ve {
    supportsDOMEvents = !0;
    static makeCurrent() { ze(new n); }
    onAndCancel(r, e, t, o) { return r.addEventListener(e, t, o), () => { r.removeEventListener(e, t, o); }; }
    dispatchEvent(r, e) { r.dispatchEvent(e); }
    remove(r) { r.remove(); }
    createElement(r, e) { return e = e || this.getDefaultDocument(), e.createElement(r); }
    createHtmlDocument() { return document.implementation.createHTMLDocument("fakeTitle"); }
    getDefaultDocument() { return document; }
    isElementNode(r) { return r.nodeType === Node.ELEMENT_NODE; }
    isShadowRoot(r) { return r instanceof DocumentFragment; }
    getGlobalEventTarget(r, e) { return e === "window" ? window : e === "document" ? r : e === "body" ? r.body : null; }
    getBaseHref(r) { let e = st(); return e == null ? null : it(e); }
    resetBaseElement() { D = null; }
    getUserAgent() { return window.navigator.userAgent; }
    getCookie(r) { return Ge(document.cookie, r); }
}, D = null;
function st() { return D = D || document.head.querySelector("base"), D ? D.getAttribute("href") : null; }
function it(n) { return new URL(n, document.baseURI).pathname; }
var x = class {
    addToWindow(r) { v.getAngularTestability = (t, o = !0) => { let s = r.findTestabilityInTree(t, o); if (s == null)
        throw new Je(5103, !1); return s; }, v.getAllAngularTestabilities = () => r.getAllTestabilities(), v.getAllAngularRootElements = () => r.getAllRootElements(); let e = t => { let o = v.getAllAngularTestabilities(), s = o.length, i = function () { s--, s == 0 && t(); }; o.forEach(a => { a.whenStable(i); }); }; v.frameworkStabilizers || (v.frameworkStabilizers = []), v.frameworkStabilizers.push(e); }
    findTestabilityInTree(r, e, t) { if (e == null)
        return null; let o = r.getTestability(e); return o ?? (t ? de().isShadowRoot(e) ? this.findTestabilityInTree(r, e.host, !0) : this.findTestabilityInTree(r, e.parentElement, !0) : null); }
}, at = (() => { class n {
    build() { return new XMLHttpRequest; }
    static \u0275fac = function (t) { return new (t || n); };
    static \u0275prov = h.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), le = ["alt", "control", "meta", "shift"], ct = { "\b": "Backspace", "	": "Tab", "\x7F": "Delete", "\x1B": "Escape", Del: "Delete", Esc: "Escape", Left: "ArrowLeft", Right: "ArrowRight", Up: "ArrowUp", Down: "ArrowDown", Menu: "ContextMenu", Scroll: "ScrollLock", Win: "OS" }, lt = { alt: n => n.altKey, control: n => n.ctrlKey, meta: n => n.metaKey, shift: n => n.shiftKey }, he = (() => { class n extends g {
    constructor(e) { super(e); }
    supports(e) { return n.parseEventName(e) != null; }
    addEventListener(e, t, o, s) { let i = n.parseEventName(t), a = n.eventCallback(i.fullKey, o, this.manager.getZone()); return this.manager.getZone().runOutsideAngular(() => de().onAndCancel(e, i.domEventName, a, s)); }
    static parseEventName(e) { let t = e.toLowerCase().split("."), o = t.shift(); if (t.length === 0 || !(o === "keydown" || o === "keyup"))
        return null; let s = n._normalizeKey(t.pop()), i = "", a = t.indexOf("code"); if (a > -1 && (t.splice(a, 1), i = "code."), le.forEach(d => { let f = t.indexOf(d); f > -1 && (t.splice(f, 1), i += d + "."); }), i += s, t.length != 0 || s.length === 0)
        return null; let c = {}; return c.domEventName = o, c.fullKey = i, c; }
    static matchEventFullKeyCode(e, t) { let o = ct[e.key] || e.key, s = ""; return t.indexOf("code.") > -1 && (o = e.code, s = "code."), o == null || !o ? !1 : (o = o.toLowerCase(), o === " " ? o = "space" : o === "." && (o = "dot"), le.forEach(i => { if (i !== o) {
        let a = lt[i];
        a(e) && (s += i + ".");
    } }), s += o, s === t); }
    static eventCallback(e, t, o) { return s => { n.matchEventFullKeyCode(s, e) && o.runGuarded(() => t(s)); }; }
    static _normalizeKey(e) { return e === "esc" ? "escape" : e; }
    static \u0275fac = function (t) { return new (t || n)(h.\u0275\u0275inject(ue)); };
    static \u0275prov = h.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })();
function dt(n, r, e) { return B(this, null, function* () { let t = I({ rootComponent: n }, me(r, e)); return pe(t); }); }
function ut(n, r) { return B(this, null, function* () { return pe(me(n, r)); }); }
function me(n, r) { return { platformRef: r?.platformRef, appProviders: [...ye, ...n?.providers ?? []], platformProviders: ge }; }
function ft() { return [...ve]; }
function pt() { j.makeCurrent(); }
function ht() { return new fe; }
function mt() { return ot(document), document; }
var ge = [{ provide: nt, useValue: Ze }, { provide: rt, useValue: pt, multi: !0 }, { provide: ue, useFactory: mt }], gt = et(tt, "browser", ge);
var ve = [{ provide: qe, useClass: x }, { provide: Qe, useClass: Y }, { provide: Y, useClass: Y }], ye = [{ provide: Xe, useValue: "root" }, { provide: fe, useFactory: ht }, { provide: S, useClass: w, multi: !0 }, { provide: S, useClass: he, multi: !0 }, U, k, P, { provide: We, useExisting: U }, { provide: Ye, useClass: at }, []], vt = (() => { class n {
    constructor() { }
    static \u0275fac = function (t) { return new (t || n); };
    static \u0275mod = h.\u0275\u0275defineNgModule({ type: n });
    static \u0275inj = h.\u0275\u0275defineInjector({ providers: [...ye, ...ve], imports: [$e, Ke] });
} return n; })();
import { \u0275getDOM as Me, DOCUMENT as b } from "@angular/common";
import { \u0275getDOM as Un } from "@angular/common";
import * as u from "@angular/core";
import { \u0275global as Ee, ApplicationRef as yt, InjectionToken as we, Injector as Et, Optional as St, \u0275Console as un, \u0275RuntimeError as Z, SecurityContext as M, \u0275allowSanitizationBypassAndThrow as R, \u0275unwrapSafeValue as C, \u0275_sanitizeUrl as Mt, \u0275_sanitizeHtml as wt, \u0275bypassSanitizationTrustHtml as _t, \u0275bypassSanitizationTrustStyle as Tt, \u0275bypassSanitizationTrustScript as Dt, \u0275bypassSanitizationTrustUrl as Rt, \u0275bypassSanitizationTrustResourceUrl as Ct, makeEnvironmentProviders as bt, \u0275withDomHydration as At, \u0275withEventReplay as It, \u0275withI18nSupport as Ot, \u0275withIncrementalHydration as Nt, ENVIRONMENT_INITIALIZER as gn, inject as vn, \u0275IS_ENABLED_BLOCKING_INITIAL_NAVIGATION as yn, \u0275formatRuntimeError as En, Version as Lt } from "@angular/core";
import { \u0275withHttpTransferCache as _e } from "@angular/common/http";
var wn = (() => { class n {
    _doc;
    _dom;
    constructor(e) { this._doc = e, this._dom = Me(); }
    addTag(e, t = !1) { return e ? this._getOrCreateElement(e, t) : null; }
    addTags(e, t = !1) { return e ? e.reduce((o, s) => (s && o.push(this._getOrCreateElement(s, t)), o), []) : []; }
    getTag(e) { return e && this._doc.querySelector(`meta[${e}]`) || null; }
    getTags(e) { if (!e)
        return []; let t = this._doc.querySelectorAll(`meta[${e}]`); return t ? [].slice.call(t) : []; }
    updateTag(e, t) { if (!e)
        return null; t = t || this._parseSelector(e); let o = this.getTag(t); return o ? this._setMetaElementAttributes(e, o) : this._getOrCreateElement(e, !0); }
    removeTag(e) { this.removeTagElement(this.getTag(e)); }
    removeTagElement(e) { e && this._dom.remove(e); }
    _getOrCreateElement(e, t = !1) { if (!t) {
        let i = this._parseSelector(e), a = this.getTags(i).filter(c => this._containsAttributes(e, c))[0];
        if (a !== void 0)
            return a;
    } let o = this._dom.createElement("meta"); return this._setMetaElementAttributes(e, o), this._doc.getElementsByTagName("head")[0].appendChild(o), o; }
    _setMetaElementAttributes(e, t) { return Object.keys(e).forEach(o => t.setAttribute(this._getMetaKeyMap(o), e[o])), t; }
    _parseSelector(e) { let t = e.name ? "name" : "property"; return `${t}="${e[t]}"`; }
    _containsAttributes(e, t) { return Object.keys(e).every(o => t.getAttribute(this._getMetaKeyMap(o)) === e[o]); }
    _getMetaKeyMap(e) { return Ht[e] || e; }
    static \u0275fac = function (t) { return new (t || n)(u.\u0275\u0275inject(b)); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac, providedIn: "root" });
} return n; })(), Ht = { httpEquiv: "http-equiv" }, _n = (() => { class n {
    _doc;
    constructor(e) { this._doc = e; }
    getTitle() { return this._doc.title; }
    setTitle(e) { this._doc.title = e || ""; }
    static \u0275fac = function (t) { return new (t || n)(u.\u0275\u0275inject(b)); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac, providedIn: "root" });
} return n; })();
function Te(n, r) { if (typeof COMPILED > "u" || !COMPILED) {
    let e = Ee.ng = Ee.ng || {};
    e[n] = r;
} }
var J = class {
    msPerTick;
    numTicks;
    constructor(r, e) { this.msPerTick = r, this.numTicks = e; }
}, K = class {
    appRef;
    constructor(r) { this.appRef = r.injector.get(yt); }
    timeChangeDetection(r) { let e = r && r.record, t = "Change Detection"; e && "profile" in console && typeof console.profile == "function" && console.profile(t); let o = performance.now(), s = 0; for (; s < 5 || performance.now() - o < 500;)
        this.appRef.tick(), s++; let i = performance.now(); e && "profileEnd" in console && typeof console.profileEnd == "function" && console.profileEnd(t); let a = (i - o) / s; return console.log(`ran ${s} change detection cycles`), console.log(`${a.toFixed(2)} ms per check`), new J(a, s); }
}, De = "profiler";
function Tn(n) { return Te(De, new K(n)), n; }
function Dn() { Te(De, null); }
var Se = class {
    static all() { return () => !0; }
    static css(r) { return e => e.nativeElement != null ? Pt(e.nativeElement, r) : !1; }
    static directive(r) { return e => e.providerTokens.indexOf(r) !== -1; }
};
function Pt(n, r) { return Me().isElementNode(n) ? n.matches && n.matches(r) || n.msMatchesSelector && n.msMatchesSelector(r) || n.webkitMatchesSelector && n.webkitMatchesSelector(r) : !1; }
var kt = { pan: !0, panstart: !0, panmove: !0, panend: !0, pancancel: !0, panleft: !0, panright: !0, panup: !0, pandown: !0, pinch: !0, pinchstart: !0, pinchmove: !0, pinchend: !0, pinchcancel: !0, pinchin: !0, pinchout: !0, press: !0, pressup: !0, rotate: !0, rotatestart: !0, rotatemove: !0, rotateend: !0, rotatecancel: !0, swipe: !0, swipeleft: !0, swiperight: !0, swipeup: !0, swipedown: !0, tap: !0, doubletap: !0 }, X = new we(""), Re = new we(""), Ut = (() => { class n {
    events = [];
    overrides = {};
    options;
    buildHammer(e) { let t = new Hammer(e, this.options); t.get("pinch").set({ enable: !0 }), t.get("rotate").set({ enable: !0 }); for (let o in this.overrides)
        t.get(o).set(this.overrides[o]); return t; }
    static \u0275fac = function (t) { return new (t || n); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), jt = (() => { class n extends g {
    _config;
    _injector;
    loader;
    _loaderPromise = null;
    constructor(e, t, o, s) { super(e), this._config = t, this._injector = o, this.loader = s; }
    supports(e) { return !(!kt.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e) || !window.Hammer && !this.loader); }
    addEventListener(e, t, o) { let s = this.manager.getZone(); if (t = t.toLowerCase(), !window.Hammer && this.loader) {
        this._loaderPromise = this._loaderPromise || s.runOutsideAngular(() => this.loader());
        let i = !1, a = () => { i = !0; };
        return s.runOutsideAngular(() => this._loaderPromise.then(() => { if (!window.Hammer) {
            a = () => { };
            return;
        } i || (a = this.addEventListener(e, t, o)); }).catch(() => { a = () => { }; })), () => { a(); };
    } return s.runOutsideAngular(() => { let i = this._config.buildHammer(e), a = function (c) { s.runGuarded(function () { o(c); }); }; return i.on(t, a), () => { i.off(t, a), typeof i.destroy == "function" && i.destroy(); }; }); }
    isCustomEvent(e) { return this._config.events.indexOf(e) > -1; }
    static \u0275fac = function (t) { return new (t || n)(u.\u0275\u0275inject(b), u.\u0275\u0275inject(X), u.\u0275\u0275inject(u.Injector), u.\u0275\u0275inject(Re, 8)); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
} return n; })(), Rn = (() => { class n {
    static \u0275fac = function (t) { return new (t || n); };
    static \u0275mod = u.\u0275\u0275defineNgModule({ type: n });
    static \u0275inj = u.\u0275\u0275defineInjector({ providers: [{ provide: S, useClass: jt, multi: !0, deps: [b, X, Et, [new St, Re]] }, { provide: X, useClass: Ut }] });
} return n; })(), xt = (() => { class n {
    static \u0275fac = function (t) { return new (t || n); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: n, factory: function (t) { let o = null; return t ? o = new (t || n) : o = u.\u0275\u0275inject(Bt), o; }, providedIn: "root" });
} return n; })(), Bt = (() => { class n extends xt {
    _doc;
    constructor(e) { super(), this._doc = e; }
    sanitize(e, t) { if (t == null)
        return null; switch (e) {
        case M.NONE: return t;
        case M.HTML: return R(t, "HTML") ? C(t) : wt(this._doc, String(t)).toString();
        case M.STYLE: return R(t, "Style") ? C(t) : t;
        case M.SCRIPT:
            if (R(t, "Script"))
                return C(t);
            throw new Z(5200, !1);
        case M.URL: return R(t, "URL") ? C(t) : Mt(String(t));
        case M.RESOURCE_URL:
            if (R(t, "ResourceURL"))
                return C(t);
            throw new Z(5201, !1);
        default: throw new Z(5202, !1);
    } }
    bypassSecurityTrustHtml(e) { return _t(e); }
    bypassSecurityTrustStyle(e) { return Tt(e); }
    bypassSecurityTrustScript(e) { return Dt(e); }
    bypassSecurityTrustUrl(e) { return Rt(e); }
    bypassSecurityTrustResourceUrl(e) { return Ct(e); }
    static \u0275fac = function (t) { return new (t || n)(u.\u0275\u0275inject(b)); };
    static \u0275prov = u.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac, providedIn: "root" });
} return n; })(), m = (function (n) { return n[n.NoHttpTransferCache = 0] = "NoHttpTransferCache", n[n.HttpTransferCacheOptions = 1] = "HttpTransferCacheOptions", n[n.I18nSupport = 2] = "I18nSupport", n[n.EventReplay = 3] = "EventReplay", n[n.IncrementalHydration = 4] = "IncrementalHydration", n; })(m || {});
function A(n, r = [], e = {}) { return { \u0275kind: n, \u0275providers: r }; }
function Cn() { return A(m.NoHttpTransferCache); }
function bn(n) { return A(m.HttpTransferCacheOptions, _e(n)); }
function An() { return A(m.I18nSupport, Ot()); }
function In() { return A(m.EventReplay, It()); }
function On() { return A(m.IncrementalHydration, Nt()); }
function Nn(...n) { let r = [], e = new Set; for (let { \u0275providers: o, \u0275kind: s } of n)
    e.add(s), o.length && r.push(o); let t = e.has(m.HttpTransferCacheOptions); return bt([[], [], At(), e.has(m.NoHttpTransferCache) || t ? [] : _e({}), r]); }
var Ln = new Lt("21.2.14");
export { vt as BrowserModule, Se as By, xt as DomSanitizer, S as EVENT_MANAGER_PLUGINS, P as EventManager, g as EventManagerPlugin, X as HAMMER_GESTURE_CONFIG, Re as HAMMER_LOADER, Ut as HammerGestureConfig, Rn as HammerModule, m as HydrationFeatureKind, wn as Meta, ae as REMOVE_STYLES_ON_COMPONENT_DESTROY, _n as Title, Ln as VERSION, dt as bootstrapApplication, ut as createApplication, Dn as disableDebugTools, Tn as enableDebugTools, gt as platformBrowser, Nn as provideClientHydration, ft as provideProtractorTestingSupport, In as withEventReplay, bn as withHttpTransferCacheOptions, An as withI18nSupport, On as withIncrementalHydration, Cn as withNoHttpTransferCache, j as \u0275BrowserDomAdapter, x as \u0275BrowserGetTestability, w as \u0275DomEventsPlugin, U as \u0275DomRendererFactory2, Bt as \u0275DomSanitizerImpl, jt as \u0275HammerGesturesPlugin, he as \u0275KeyEventsPlugin, k as \u0275SharedStylesHost, Un as \u0275getDOM };
/*! Bundled license information:

@angular/platform-browser/fesm2022/_dom_renderer-chunk.mjs:
@angular/platform-browser/fesm2022/_browser-chunk.mjs:
@angular/platform-browser/fesm2022/platform-browser.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
