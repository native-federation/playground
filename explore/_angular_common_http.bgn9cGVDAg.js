import { a as J, c as be, d as te, h as Re, k as Pe, l as Me } from "@nf-internal/chunk-7WCF54EH";
import * as l from "@angular/core";
import { \u0275RuntimeError as N, inject as g, NgZone as Tr, DestroyRef as vr, \u0275formatRuntimeError as pt, InjectionToken as I, \u0275TracingService as wr, runInInjectionContext as ce, PendingTasks as xe, CSP_NONCE as Er, DOCUMENT as Fe, EnvironmentInjector as br, makeEnvironmentProviders as Rr } from "@angular/core";
import { switchMap as Pr, finalize as je, concatMap as Mr, filter as Nr, map as V } from "rxjs/operators";
import { Observable as de, from as Or, of as Ce } from "rxjs";
var b = class e {
    headers;
    normalizedNames = new Map;
    lazyInit;
    lazyUpdate = null;
    constructor(t) {
        t ? typeof t == "string" ? this.lazyInit = () => {
            this.headers = new Map, t.split(`
`).forEach(r => { let n = r.indexOf(":"); if (n > 0) {
                let o = r.slice(0, n), s = r.slice(n + 1).trim();
                this.addHeaderEntry(o, s);
            } });
        } : typeof Headers < "u" && t instanceof Headers ? (this.headers = new Map, t.forEach((r, n) => { this.addHeaderEntry(n, r); })) : this.lazyInit = () => { this.headers = new Map, Object.entries(t).forEach(([r, n]) => { this.setHeaderEntries(r, n); }); } : this.headers = new Map;
    }
    has(t) { return this.init(), this.headers.has(t.toLowerCase()); }
    get(t) { this.init(); let r = this.headers.get(t.toLowerCase()); return r && r.length > 0 ? r[0] : null; }
    keys() { return this.init(), Array.from(this.normalizedNames.values()); }
    getAll(t) { return this.init(), this.headers.get(t.toLowerCase()) || null; }
    append(t, r) { return this.clone({ name: t, value: r, op: "a" }); }
    set(t, r) { return this.clone({ name: t, value: r, op: "s" }); }
    delete(t, r) { return this.clone({ name: t, value: r, op: "d" }); }
    maybeSetNormalizedName(t, r) { this.normalizedNames.has(r) || this.normalizedNames.set(r, t); }
    init() { this.lazyInit && (this.lazyInit instanceof e ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null)); }
    copyFrom(t) { t.init(), Array.from(t.headers.keys()).forEach(r => { this.headers.set(r, t.headers.get(r)), this.normalizedNames.set(r, t.normalizedNames.get(r)); }); }
    clone(t) { let r = new e; return r.lazyInit = this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this, r.lazyUpdate = (this.lazyUpdate || []).concat([t]), r; }
    applyUpdate(t) { let r = t.name.toLowerCase(); switch (t.op) {
        case "a":
        case "s":
            let n = t.value;
            if (typeof n == "string" && (n = [n]), n.length === 0)
                return;
            this.maybeSetNormalizedName(t.name, r);
            let o = (t.op === "a" ? this.headers.get(r) : void 0) || [];
            o.push(...n), this.headers.set(r, o);
            break;
        case "d":
            let s = t.value;
            if (!s)
                this.headers.delete(r), this.normalizedNames.delete(r);
            else {
                let i = this.headers.get(r);
                if (!i)
                    return;
                i = i.filter(d => s.indexOf(d) === -1), i.length === 0 ? (this.headers.delete(r), this.normalizedNames.delete(r)) : this.headers.set(r, i);
            }
            break;
    } }
    addHeaderEntry(t, r) { let n = t.toLowerCase(); this.maybeSetNormalizedName(t, n), this.headers.has(n) ? this.headers.get(n).push(r) : this.headers.set(n, [r]); }
    setHeaderEntries(t, r) { let n = (Array.isArray(r) ? r : [r]).map(s => s.toString()), o = t.toLowerCase(); this.headers.set(o, n), this.maybeSetNormalizedName(t, o); }
    forEach(t) { this.init(), Array.from(this.normalizedNames.keys()).forEach(r => t(this.normalizedNames.get(r), this.headers.get(r))); }
};
var oe = class {
    defaultValue;
    constructor(t) { this.defaultValue = t; }
}, W = class {
    map = new Map;
    set(t, r) { return this.map.set(t, r), this; }
    get(t) { return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t); }
    delete(t) { return this.map.delete(t), this; }
    has(t) { return this.map.has(t); }
    keys() { return this.map.keys(); }
}, K = class {
    encodeKey(t) { return Ne(t); }
    encodeValue(t) { return Ne(t); }
    decodeKey(t) { return decodeURIComponent(t); }
    decodeValue(t) { return decodeURIComponent(t); }
};
function Dr(e, t) { let r = new Map; return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => { let s = o.indexOf("="), [i, d] = s == -1 ? [t.decodeKey(o), ""] : [t.decodeKey(o.slice(0, s)), t.decodeValue(o.slice(s + 1))], a = r.get(i) || []; a.push(d), r.set(i, a); }), r; }
var Ir = /%(\d[a-f0-9])/gi, Ar = { 40: "@", "3A": ":", 24: "$", "2C": ",", "3B": ";", "3D": "=", "3F": "?", "2F": "/" };
function Ne(e) { return encodeURIComponent(e).replace(Ir, (t, r) => Ar[r] ?? t); }
function $(e) { return `${e}`; }
var M = class e {
    map;
    encoder;
    updates = null;
    cloneFrom = null;
    constructor(t = {}) { if (this.encoder = t.encoder || new K, t.fromString) {
        if (t.fromObject)
            throw new N(2805, !1);
        this.map = Dr(t.fromString, this.encoder);
    }
    else
        t.fromObject ? (this.map = new Map, Object.keys(t.fromObject).forEach(r => { let n = t.fromObject[r], o = Array.isArray(n) ? n.map($) : [$(n)]; this.map.set(r, o); })) : this.map = null; }
    has(t) { return this.init(), this.map.has(t); }
    get(t) { this.init(); let r = this.map.get(t); return r ? r[0] : null; }
    getAll(t) { return this.init(), this.map.get(t) || null; }
    keys() { return this.init(), Array.from(this.map.keys()); }
    append(t, r) { return this.clone({ param: t, value: r, op: "a" }); }
    appendAll(t) { let r = []; return Object.keys(t).forEach(n => { let o = t[n]; Array.isArray(o) ? o.forEach(s => { r.push({ param: n, value: s, op: "a" }); }) : r.push({ param: n, value: o, op: "a" }); }), this.clone(r); }
    set(t, r) { return this.clone({ param: t, value: r, op: "s" }); }
    delete(t, r) { return this.clone({ param: t, value: r, op: "d" }); }
    toString() { return this.init(), this.keys().map(t => { let r = this.encoder.encodeKey(t); return this.map.get(t).map(n => r + "=" + this.encoder.encodeValue(n)).join("&"); }).filter(t => t !== "").join("&"); }
    clone(t) { let r = new e({ encoder: this.encoder }); return r.cloneFrom = this.cloneFrom || this, r.updates = (this.updates || []).concat(t), r; }
    init() { this.map === null && (this.map = new Map), this.cloneFrom !== null && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => { switch (t.op) {
        case "a":
        case "s":
            let r = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
            r.push($(t.value)), this.map.set(t.param, r);
            break;
        case "d": if (t.value !== void 0) {
            let n = this.map.get(t.param) || [], o = n.indexOf($(t.value));
            o !== -1 && n.splice(o, 1), n.length > 0 ? this.map.set(t.param, n) : this.map.delete(t.param);
        }
        else {
            this.map.delete(t.param);
            break;
        }
    } }), this.cloneFrom = this.updates = null); }
};
function kr(e) { switch (e) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP": return !1;
    default: return !0;
} }
function Oe(e) { return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer; }
function De(e) { return typeof Blob < "u" && e instanceof Blob; }
function Ie(e) { return typeof FormData < "u" && e instanceof FormData; }
function _r(e) { return typeof URLSearchParams < "u" && e instanceof URLSearchParams; }
var S = "Content-Type", Y = "Accept", Le = "text/plain", Ue = "application/json", Se = `${Ue}, ${Le}, */*`, F = class e {
    url;
    body = null;
    headers;
    context;
    reportProgress = !1;
    withCredentials = !1;
    credentials;
    keepalive = !1;
    cache;
    priority;
    mode;
    redirect;
    referrer;
    integrity;
    referrerPolicy;
    responseType = "json";
    method;
    params;
    urlWithParams;
    transferCache;
    timeout;
    constructor(t, r, n, o) { this.url = r, this.method = t.toUpperCase(); let s; if (kr(this.method) || o ? (this.body = n !== void 0 ? n : null, s = o) : s = n, s) {
        if (this.reportProgress = !!s.reportProgress, this.withCredentials = !!s.withCredentials, this.keepalive = !!s.keepalive, s.responseType && (this.responseType = s.responseType), s.headers && (this.headers = s.headers), s.context && (this.context = s.context), s.params && (this.params = s.params), s.priority && (this.priority = s.priority), s.cache && (this.cache = s.cache), s.credentials && (this.credentials = s.credentials), typeof s.timeout == "number") {
            if (s.timeout < 1 || !Number.isInteger(s.timeout))
                throw new N(2822, "");
            this.timeout = s.timeout;
        }
        s.mode && (this.mode = s.mode), s.redirect && (this.redirect = s.redirect), s.integrity && (this.integrity = s.integrity), s.referrer && (this.referrer = s.referrer), s.referrerPolicy && (this.referrerPolicy = s.referrerPolicy), this.transferCache = s.transferCache;
    } if (this.headers ??= new b, this.context ??= new W, !this.params)
        this.params = new M, this.urlWithParams = r;
    else {
        let i = this.params.toString();
        if (i.length === 0)
            this.urlWithParams = r;
        else {
            let d = r.indexOf("?"), a = d === -1 ? "?" : d < r.length - 1 ? "&" : "";
            this.urlWithParams = r + a + i;
        }
    } }
    serializeBody() { return this.body === null ? null : typeof this.body == "string" || Oe(this.body) || De(this.body) || Ie(this.body) || _r(this.body) ? this.body : this.body instanceof M ? this.body.toString() : typeof this.body == "object" || typeof this.body == "boolean" || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString(); }
    detectContentTypeHeader() { return this.body === null || Ie(this.body) ? null : De(this.body) ? this.body.type || null : Oe(this.body) ? null : typeof this.body == "string" ? Le : this.body instanceof M ? "application/x-www-form-urlencoded;charset=UTF-8" : typeof this.body == "object" || typeof this.body == "number" || typeof this.body == "boolean" ? Ue : null; }
    clone(t = {}) { let r = t.method || this.method, n = t.url || this.url, o = t.responseType || this.responseType, s = t.keepalive ?? this.keepalive, i = t.priority || this.priority, d = t.cache || this.cache, a = t.mode || this.mode, h = t.redirect || this.redirect, p = t.credentials || this.credentials, u = t.referrer || this.referrer, T = t.integrity || this.integrity, v = t.referrerPolicy || this.referrerPolicy, P = t.transferCache ?? this.transferCache, y = t.timeout ?? this.timeout, c = t.body !== void 0 ? t.body : this.body, f = t.withCredentials ?? this.withCredentials, w = t.reportProgress ?? this.reportProgress, k = t.headers || this.headers, m = t.params || this.params, _ = t.context ?? this.context; return t.setHeaders !== void 0 && (k = Object.keys(t.setHeaders).reduce((x, O) => x.set(O, t.setHeaders[O]), k)), t.setParams && (m = Object.keys(t.setParams).reduce((x, O) => x.set(O, t.setParams[O]), m)), new e(r, n, c, { params: m, headers: k, context: _, reportProgress: w, responseType: o, withCredentials: f, transferCache: P, keepalive: s, cache: d, priority: i, timeout: y, mode: a, redirect: h, credentials: p, referrer: u, integrity: T, referrerPolicy: v }); }
}, R = (function (e) { return e[e.Sent = 0] = "Sent", e[e.UploadProgress = 1] = "UploadProgress", e[e.ResponseHeader = 2] = "ResponseHeader", e[e.DownloadProgress = 3] = "DownloadProgress", e[e.Response = 4] = "Response", e[e.User = 5] = "User", e; })(R || {}), C = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    redirected;
    responseType;
    constructor(t, r = 200, n = "OK") { this.headers = t.headers || new b, this.status = t.status !== void 0 ? t.status : r, this.statusText = t.statusText || n, this.url = t.url || null, this.redirected = t.redirected, this.responseType = t.responseType, this.ok = this.status >= 200 && this.status < 300; }
}, B = class e extends C {
    constructor(t = {}) { super(t); }
    type = R.ResponseHeader;
    clone(t = {}) { return new e({ headers: t.headers || this.headers, status: t.status !== void 0 ? t.status : this.status, statusText: t.statusText || this.statusText, url: t.url || this.url || void 0 }); }
}, D = class e extends C {
    body;
    constructor(t = {}) { super(t), this.body = t.body !== void 0 ? t.body : null; }
    type = R.Response;
    clone(t = {}) { return new e({ body: t.body !== void 0 ? t.body : this.body, headers: t.headers || this.headers, status: t.status !== void 0 ? t.status : this.status, statusText: t.statusText || this.statusText, url: t.url || this.url || void 0, redirected: t.redirected ?? this.redirected, responseType: t.responseType ?? this.responseType }); }
}, E = class extends C {
    name = "HttpErrorResponse";
    message;
    error;
    ok = !1;
    constructor(t) { super(t, 0, "Unknown Error"), this.status >= 200 && this.status < 300 ? this.message = `Http failure during parsing for ${t.url || "(unknown url)"}` : this.message = `Http failure response for ${t.url || "(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null; }
}, le = 200, xr = 204, Be = (function (e) { return e[e.Continue = 100] = "Continue", e[e.SwitchingProtocols = 101] = "SwitchingProtocols", e[e.Processing = 102] = "Processing", e[e.EarlyHints = 103] = "EarlyHints", e[e.Ok = 200] = "Ok", e[e.Created = 201] = "Created", e[e.Accepted = 202] = "Accepted", e[e.NonAuthoritativeInformation = 203] = "NonAuthoritativeInformation", e[e.NoContent = 204] = "NoContent", e[e.ResetContent = 205] = "ResetContent", e[e.PartialContent = 206] = "PartialContent", e[e.MultiStatus = 207] = "MultiStatus", e[e.AlreadyReported = 208] = "AlreadyReported", e[e.ImUsed = 226] = "ImUsed", e[e.MultipleChoices = 300] = "MultipleChoices", e[e.MovedPermanently = 301] = "MovedPermanently", e[e.Found = 302] = "Found", e[e.SeeOther = 303] = "SeeOther", e[e.NotModified = 304] = "NotModified", e[e.UseProxy = 305] = "UseProxy", e[e.Unused = 306] = "Unused", e[e.TemporaryRedirect = 307] = "TemporaryRedirect", e[e.PermanentRedirect = 308] = "PermanentRedirect", e[e.BadRequest = 400] = "BadRequest", e[e.Unauthorized = 401] = "Unauthorized", e[e.PaymentRequired = 402] = "PaymentRequired", e[e.Forbidden = 403] = "Forbidden", e[e.NotFound = 404] = "NotFound", e[e.MethodNotAllowed = 405] = "MethodNotAllowed", e[e.NotAcceptable = 406] = "NotAcceptable", e[e.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", e[e.RequestTimeout = 408] = "RequestTimeout", e[e.Conflict = 409] = "Conflict", e[e.Gone = 410] = "Gone", e[e.LengthRequired = 411] = "LengthRequired", e[e.PreconditionFailed = 412] = "PreconditionFailed", e[e.PayloadTooLarge = 413] = "PayloadTooLarge", e[e.UriTooLong = 414] = "UriTooLong", e[e.UnsupportedMediaType = 415] = "UnsupportedMediaType", e[e.RangeNotSatisfiable = 416] = "RangeNotSatisfiable", e[e.ExpectationFailed = 417] = "ExpectationFailed", e[e.ImATeapot = 418] = "ImATeapot", e[e.MisdirectedRequest = 421] = "MisdirectedRequest", e[e.UnprocessableEntity = 422] = "UnprocessableEntity", e[e.Locked = 423] = "Locked", e[e.FailedDependency = 424] = "FailedDependency", e[e.TooEarly = 425] = "TooEarly", e[e.UpgradeRequired = 426] = "UpgradeRequired", e[e.PreconditionRequired = 428] = "PreconditionRequired", e[e.TooManyRequests = 429] = "TooManyRequests", e[e.RequestHeaderFieldsTooLarge = 431] = "RequestHeaderFieldsTooLarge", e[e.UnavailableForLegalReasons = 451] = "UnavailableForLegalReasons", e[e.InternalServerError = 500] = "InternalServerError", e[e.NotImplemented = 501] = "NotImplemented", e[e.BadGateway = 502] = "BadGateway", e[e.ServiceUnavailable = 503] = "ServiceUnavailable", e[e.GatewayTimeout = 504] = "GatewayTimeout", e[e.HttpVersionNotSupported = 505] = "HttpVersionNotSupported", e[e.VariantAlsoNegotiates = 506] = "VariantAlsoNegotiates", e[e.InsufficientStorage = 507] = "InsufficientStorage", e[e.LoopDetected = 508] = "LoopDetected", e[e.NotExtended = 510] = "NotExtended", e[e.NetworkAuthenticationRequired = 511] = "NetworkAuthenticationRequired", e; })(Be || {}), Fr = /^\)\]\}',?\n/, ze = new I(""), G = (() => { class e {
    fetchImpl = g(se, { optional: !0 })?.fetch ?? ((...r) => globalThis.fetch(...r));
    ngZone = g(Tr);
    destroyRef = g(vr);
    handle(r) { return new de(n => { let o = new AbortController; this.doRequest(r, o.signal, n).then(ie, i => n.error(new E({ error: i }))); let s; return r.timeout && (s = this.ngZone.runOutsideAngular(() => setTimeout(() => { o.signal.aborted || o.abort(new DOMException("signal timed out", "TimeoutError")); }, r.timeout))), () => { s !== void 0 && clearTimeout(s), o.abort(); }; }); }
    doRequest(r, n, o) { return te(this, null, function* () { let s = this.createRequestInit(r), i; try {
        let y = this.ngZone.runOutsideAngular(() => this.fetchImpl(r.urlWithParams, J({ signal: n }, s)));
        jr(y), o.next({ type: R.Sent }), i = yield y;
    }
    catch (y) {
        o.error(new E({ error: y, status: y.status ?? 0, statusText: y.statusText, url: r.urlWithParams, headers: y.headers }));
        return;
    } let d = new b(i.headers), a = i.statusText, h = i.url || r.urlWithParams, p = i.status, u = null; if (r.reportProgress && o.next(new B({ headers: d, status: p, statusText: a, url: h })), i.body) {
        let y = i.headers.get("content-length"), c = [], f = i.body.getReader(), w = 0, k, m, _ = typeof Zone < "u" && Zone.current, x = !1;
        if (yield this.ngZone.runOutsideAngular(() => te(this, null, function* () { for (;;) {
            if (this.destroyRef.destroyed) {
                yield f.cancel(), x = !0;
                break;
            }
            let { done: U, value: re } = yield f.read();
            if (U)
                break;
            if (c.push(re), w += re.length, r.reportProgress) {
                m = r.responseType === "text" ? (m ?? "") + (k ??= new TextDecoder).decode(re, { stream: !0 }) : void 0;
                let Ee = () => o.next({ type: R.DownloadProgress, total: y ? +y : void 0, loaded: w, partialText: m });
                _ ? _.run(Ee) : Ee();
            }
        } })), x) {
            o.complete();
            return;
        }
        let O = this.concatChunks(c, w);
        try {
            let U = i.headers.get(S) ?? "";
            u = this.parseBody(r, O, U, p);
        }
        catch (U) {
            o.error(new E({ error: U, headers: new b(i.headers), status: i.status, statusText: i.statusText, url: i.url || r.urlWithParams }));
            return;
        }
    } p === 0 && (p = u ? le : 0); let T = p >= 200 && p < 300, v = i.redirected, P = i.type; T ? (o.next(new D({ body: u, headers: d, status: p, statusText: a, url: h, redirected: v, responseType: P })), o.complete()) : o.error(new E({ error: u, headers: d, status: p, statusText: a, url: h, redirected: v, responseType: P })); }); }
    parseBody(r, n, o, s) { switch (r.responseType) {
        case "json":
            let i = new TextDecoder().decode(n).replace(Fr, "");
            if (i === "")
                return null;
            try {
                return JSON.parse(i);
            }
            catch (d) {
                if (s < 200 || s >= 300)
                    return i;
                throw d;
            }
        case "text": return new TextDecoder().decode(n);
        case "blob": return new Blob([n], { type: o });
        case "arraybuffer": return n.buffer;
    } }
    createRequestInit(r) { let n = {}, o; if (o = r.credentials, r.withCredentials && (o = "include"), r.headers.forEach((s, i) => n[s] = i.join(",")), r.headers.has(Y) || (n[Y] = Se), !r.headers.has(S)) {
        let s = r.detectContentTypeHeader();
        s !== null && (n[S] = s);
    } return { body: r.serializeBody(), method: r.method, headers: n, credentials: o, keepalive: r.keepalive, cache: r.cache, priority: r.priority, mode: r.mode, redirect: r.redirect, referrer: r.referrer, integrity: r.integrity, referrerPolicy: r.referrerPolicy }; }
    concatChunks(r, n) { let o = new Uint8Array(n), s = 0; for (let i of r)
        o.set(i, s), s += i.length; return o; }
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac });
} return e; })(), se = class {
};
function ie() { }
function jr(e) { e.then(ie, ie); }
var Cr = /^\)\]\}',?\n/;
var ue = (() => { class e {
    xhrFactory;
    tracingService = g(wr, { optional: !0 });
    constructor(r) { this.xhrFactory = r; }
    maybePropagateTrace(r) { return this.tracingService?.propagate ? this.tracingService.propagate(r) : r; }
    handle(r) { if (r.method === "JSONP")
        throw new N(-2800, !1); let n = this.xhrFactory; return (typeof ngServerMode < "u" && ngServerMode && n.\u0275loadImpl ? Or(n.\u0275loadImpl()) : Ce(null)).pipe(Pr(() => new de(s => { let i = n.build(); if (i.open(r.method, r.urlWithParams), r.withCredentials && (i.withCredentials = !0), r.headers.forEach((c, f) => i.setRequestHeader(c, f.join(","))), r.headers.has(Y) || i.setRequestHeader(Y, Se), !r.headers.has(S)) {
        let c = r.detectContentTypeHeader();
        c !== null && i.setRequestHeader(S, c);
    } if (r.timeout && (i.timeout = r.timeout), r.responseType) {
        let c = r.responseType.toLowerCase();
        i.responseType = c !== "json" ? c : "text";
    } let d = r.serializeBody(), a = null, h = () => { if (a !== null)
        return a; let c = i.statusText || "OK", f = new b(i.getAllResponseHeaders()), w = i.responseURL || r.url; return a = new B({ headers: f, status: i.status, statusText: c, url: w }), a; }, p = this.maybePropagateTrace(() => { let { headers: c, status: f, statusText: w, url: k } = h(), m = null; f !== xr && (m = typeof i.response > "u" ? i.responseText : i.response), f === 0 && (f = m ? le : 0); let _ = f >= 200 && f < 300; if (r.responseType === "json" && typeof m == "string") {
        let x = m;
        m = m.replace(Cr, "");
        try {
            m = m !== "" ? JSON.parse(m) : null;
        }
        catch (O) {
            m = x, _ && (_ = !1, m = { error: O, text: m });
        }
    } _ ? (s.next(new D({ body: m, headers: c, status: f, statusText: w, url: k || void 0 })), s.complete()) : s.error(new E({ error: m, headers: c, status: f, statusText: w, url: k || void 0 })); }), u = this.maybePropagateTrace(c => { let { url: f } = h(), w = new E({ error: c, status: i.status || 0, statusText: i.statusText || "Unknown Error", url: f || void 0 }); s.error(w); }), T = u; r.timeout && (T = this.maybePropagateTrace(c => { let { url: f } = h(), w = new E({ error: new DOMException("Request timed out", "TimeoutError"), status: i.status || 0, statusText: i.statusText || "Request timeout", url: f || void 0 }); s.error(w); })); let v = !1, P = this.maybePropagateTrace(c => { v || (s.next(h()), v = !0); let f = { type: R.DownloadProgress, loaded: c.loaded }; c.lengthComputable && (f.total = c.total), r.responseType === "text" && i.responseText && (f.partialText = i.responseText), s.next(f); }), y = this.maybePropagateTrace(c => { let f = { type: R.UploadProgress, loaded: c.loaded }; c.lengthComputable && (f.total = c.total), s.next(f); }); return i.addEventListener("load", p), i.addEventListener("error", u), i.addEventListener("timeout", T), i.addEventListener("abort", u), r.reportProgress && (i.addEventListener("progress", P), d !== null && i.upload && i.upload.addEventListener("progress", y)), i.send(d), s.next({ type: R.Sent }), () => { i.removeEventListener("error", u), i.removeEventListener("abort", u), i.removeEventListener("load", p), i.removeEventListener("timeout", T), r.reportProgress && (i.removeEventListener("progress", P), d !== null && i.upload && i.upload.removeEventListener("progress", y)), i.readyState !== i.DONE && i.abort(); }; }))); }
    static \u0275fac = function (n) { return new (n || e)(l.\u0275\u0275inject(Me)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })();
function Xe(e, t) { return t(e); }
function Lr(e, t) { return (r, n) => t.intercept(r, { handle: o => e(o, n) }); }
function Ur(e, t, r) { return (n, o) => ce(r, () => t(n, s => e(s, o))); }
var he = new I(""), z = new I("", { factory: () => [] }), fe = new I(""), pe = new I("", { factory: () => !0 });
function Sr() { let e = null; return (t, r) => { e === null && (e = (g(he, { optional: !0 }) ?? []).reduceRight(Lr, Xe)); let n = g(xe); if (g(pe)) {
    let s = n.add();
    return e(t, r).pipe(je(s));
}
else
    return e(t, r); }; }
var X = (() => { class e {
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: function (n) { let o = null; return n ? o = new (n || e) : o = l.\u0275\u0275inject(ue), o; }, providedIn: "root" });
} return e; })();
var Z = (() => { class e {
    backend;
    injector;
    chain = null;
    pendingTasks = g(xe);
    contributeToStability = g(pe);
    constructor(r, n) { this.backend = r, this.injector = n; }
    handle(r) { if (this.chain === null) {
        let n = Array.from(new Set([...this.injector.get(z), ...this.injector.get(fe, [])]));
        this.chain = n.reduceRight((o, s) => Ur(o, s, this.injector), Xe);
    } if (this.contributeToStability) {
        let n = this.pendingTasks.add();
        return this.chain(r, o => this.backend.handle(o)).pipe(je(n));
    }
    else
        return this.chain(r, n => this.backend.handle(n)); }
    static \u0275fac = function (n) { return new (n || e)(l.\u0275\u0275inject(X), l.\u0275\u0275inject(l.EnvironmentInjector)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), q = (() => { class e {
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: function (n) { let o = null; return n ? o = new (n || e) : o = l.\u0275\u0275inject(Z), o; }, providedIn: "root" });
} return e; })();
function ne(e, t) { return { body: t, headers: e.headers, context: e.context, observe: e.observe, params: e.params, reportProgress: e.reportProgress, responseType: e.responseType, withCredentials: e.withCredentials, credentials: e.credentials, transferCache: e.transferCache, timeout: e.timeout, keepalive: e.keepalive, priority: e.priority, cache: e.cache, mode: e.mode, redirect: e.redirect, integrity: e.integrity, referrer: e.referrer, referrerPolicy: e.referrerPolicy }; }
var ye = (() => { class e {
    handler;
    constructor(r) { this.handler = r; }
    request(r, n, o = {}) { let s; if (r instanceof F)
        s = r;
    else {
        let a;
        o.headers instanceof b ? a = o.headers : a = new b(o.headers);
        let h;
        o.params && (o.params instanceof M ? h = o.params : h = new M({ fromObject: o.params })), s = new F(r, n, o.body !== void 0 ? o.body : null, { headers: a, context: o.context, params: h, reportProgress: o.reportProgress, responseType: o.responseType || "json", withCredentials: o.withCredentials, transferCache: o.transferCache, keepalive: o.keepalive, priority: o.priority, cache: o.cache, mode: o.mode, redirect: o.redirect, credentials: o.credentials, referrer: o.referrer, referrerPolicy: o.referrerPolicy, integrity: o.integrity, timeout: o.timeout });
    } let i = Ce(s).pipe(Mr(a => this.handler.handle(a))); if (r instanceof F || o.observe === "events")
        return i; let d = i.pipe(Nr(a => a instanceof D)); switch (o.observe || "body") {
        case "body": switch (s.responseType) {
            case "arraybuffer": return d.pipe(V(a => { if (a.body !== null && !(a.body instanceof ArrayBuffer))
                throw new N(2806, !1); return a.body; }));
            case "blob": return d.pipe(V(a => { if (a.body !== null && !(a.body instanceof Blob))
                throw new N(2807, !1); return a.body; }));
            case "text": return d.pipe(V(a => { if (a.body !== null && typeof a.body != "string")
                throw new N(2808, !1); return a.body; }));
            default: return d.pipe(V(a => a.body));
        }
        case "response": return d;
        default: throw new N(2809, !1);
    } }
    delete(r, n = {}) { return this.request("DELETE", r, n); }
    get(r, n = {}) { return this.request("GET", r, n); }
    head(r, n = {}) { return this.request("HEAD", r, n); }
    jsonp(r, n) { return this.request("JSONP", r, { params: new M().append(n, "JSONP_CALLBACK"), observe: "body", responseType: "json" }); }
    options(r, n = {}) { return this.request("OPTIONS", r, n); }
    patch(r, n, o = {}) { return this.request("PATCH", r, ne(o, n)); }
    post(r, n, o = {}) { return this.request("POST", r, ne(o, n)); }
    put(r, n, o = {}) { return this.request("PUT", r, ne(o, n)); }
    static \u0275fac = function (n) { return new (n || e)(l.\u0275\u0275inject(q)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), Br = 0, Ae, zr = "JSONP injected script did not invoke callback.";
var Q = class {
};
function Xr() { return typeof window == "object" ? window : {}; }
var me = (() => { class e {
    callbackMap;
    document;
    resolvedPromise = Promise.resolve();
    nonce = g(Er, { optional: !0 });
    constructor(r, n) { this.callbackMap = r, this.document = n; }
    nextCallback() { return `ng_jsonp_callback_${Br++}`; }
    handle(r) { if (r.method !== "JSONP")
        throw new N(2810, !1); if (r.responseType !== "json")
        throw new N(2811, !1); if (r.headers.keys().length > 0)
        throw new N(2812, !1); return new de(n => { let o = this.nextCallback(), s = r.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, `=${o}$1`), i = this.document.createElement("script"); i.src = s, this.nonce && i.setAttribute("nonce", this.nonce); let d = null, a = !1; this.callbackMap[o] = T => { delete this.callbackMap[o], d = T, a = !0; }; let h = () => { i.removeEventListener("load", p), i.removeEventListener("error", u), i.remove(), delete this.callbackMap[o]; }, p = () => { this.resolvedPromise.then(() => { if (h(), !a) {
        n.error(new E({ url: s, status: 0, statusText: "JSONP Error", error: new Error(zr) }));
        return;
    } n.next(new D({ body: d, status: le, statusText: "OK", url: s })), n.complete(); }); }, u = T => { h(), n.error(new E({ error: T, status: 0, statusText: "JSONP Error", url: s })); }; return i.addEventListener("load", p), i.addEventListener("error", u), this.document.body.appendChild(i), n.next({ type: R.Sent }), () => { a || this.removeListeners(i), h(); }; }); }
    removeListeners(r) { Ae ??= this.document.implementation.createHTMLDocument(), Ae.adoptNode(r); }
    static \u0275fac = function (n) { return new (n || e)(l.\u0275\u0275inject(Q), l.\u0275\u0275inject(Fe)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac });
} return e; })();
function Je(e, t) { return e.method === "JSONP" ? g(me).handle(e) : t(e); }
var Jr = (() => { class e {
    injector;
    constructor(r) { this.injector = r; }
    intercept(r, n) { return ce(this.injector, () => Je(r, o => n.handle(o))); }
    static \u0275fac = function (n) { return new (n || e)(l.\u0275\u0275inject(l.EnvironmentInjector)); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac });
} return e; })(), ge = new I("", { factory: () => !0 }), Ve = "XSRF-TOKEN", $e = new I("", { factory: () => Ve }), Ge = "X-XSRF-TOKEN", We = new I("", { factory: () => Ge }), Ke = (() => { class e {
    cookieName = g($e);
    doc = g(Fe);
    lastCookieString = "";
    lastToken = null;
    parseCount = 0;
    getToken() { if (typeof ngServerMode < "u" && ngServerMode)
        return null; let r = this.doc.cookie || ""; return r !== this.lastCookieString && (this.parseCount++, this.lastToken = Pe(r, this.cookieName), this.lastCookieString = r), this.lastToken; }
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac, providedIn: "root" });
} return e; })(), Te = (() => { class e {
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: function (n) { let o = null; return n ? o = new (n || e) : o = l.\u0275\u0275inject(Ke), o; }, providedIn: "root" });
} return e; })();
function Ye(e, t) { if (!g(ge) || e.method === "GET" || e.method === "HEAD")
    return t(e); try {
    let o = g(Re).href, { origin: s } = new URL(o), { origin: i } = new URL(e.url, s);
    if (s !== i)
        return t(e);
}
catch {
    return t(e);
} let r = g(Te).getToken(), n = g(We); return r != null && !e.headers.has(n) && (e = e.clone({ headers: e.headers.set(n, r) })), t(e); }
var ke = (() => { class e {
    injector = g(br);
    intercept(r, n) { return ce(this.injector, () => Ye(r, o => n.handle(o))); }
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275prov = l.\u0275\u0275defineInjectable({ token: e, factory: e.\u0275fac });
} return e; })(), A = (function (e) { return e[e.Interceptors = 0] = "Interceptors", e[e.LegacyInterceptors = 1] = "LegacyInterceptors", e[e.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", e[e.NoXsrfProtection = 3] = "NoXsrfProtection", e[e.JsonpSupport = 4] = "JsonpSupport", e[e.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", e[e.Fetch = 6] = "Fetch", e; })(A || {});
function j(e, t) { return { \u0275kind: e, \u0275providers: t }; }
function Ze(...e) { let t = [ye, Z, { provide: q, useExisting: Z }, { provide: X, useFactory: () => g(ze, { optional: !0 }) ?? g(ue) }, { provide: z, useValue: Ye, multi: !0 }]; for (let r of e)
    t.push(...r.\u0275providers); return Rr(t); }
function Vr(e) { return j(A.Interceptors, e.map(t => ({ provide: z, useValue: t, multi: !0 }))); }
var _e = new I("");
function Qe() { return j(A.LegacyInterceptors, [{ provide: _e, useFactory: Sr }, { provide: z, useExisting: _e, multi: !0 }]); }
function ae({ cookieName: e, headerName: t }) { let r = []; return e !== void 0 && r.push({ provide: $e, useValue: e }), t !== void 0 && r.push({ provide: We, useValue: t }), j(A.CustomXsrfConfiguration, r); }
function qe() { return j(A.NoXsrfProtection, [{ provide: ge, useValue: !1 }]); }
function He() { return j(A.JsonpSupport, [me, { provide: Q, useFactory: Xr }, { provide: z, useValue: Je, multi: !0 }]); }
function $r() { return j(A.RequestsMadeViaParent, [{ provide: X, useFactory: () => g(q, { skipSelf: !0, optional: !0 }) }]); }
function Gr() { return j(A.Fetch, [G, { provide: ze, useExisting: G }, { provide: X, useExisting: G }]); }
var Wr = (() => { class e {
    static disable() { return { ngModule: e, providers: [qe().\u0275providers] }; }
    static withOptions(r = {}) { return { ngModule: e, providers: ae(r).\u0275providers }; }
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275mod = l.\u0275\u0275defineNgModule({ type: e });
    static \u0275inj = l.\u0275\u0275defineInjector({ providers: [ke, { provide: he, useExisting: ke, multi: !0 }, { provide: Te, useClass: Ke }, ae({ cookieName: Ve, headerName: Ge }).\u0275providers, { provide: ge, useValue: !0 }] });
} return e; })(), Kr = (() => { class e {
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275mod = l.\u0275\u0275defineNgModule({ type: e });
    static \u0275inj = l.\u0275\u0275defineInjector({ providers: [Ze(Qe())] });
} return e; })(), Yr = (() => { class e {
    static \u0275fac = function (n) { return new (n || e); };
    static \u0275mod = l.\u0275\u0275defineNgModule({ type: e });
    static \u0275inj = l.\u0275\u0275defineInjector({ providers: [He().\u0275providers] });
} return e; })();
import { InjectionToken as tr, APP_BOOTSTRAP_LISTENER as Zr, \u0275performanceMarkFeature as Qr, inject as L, ApplicationRef as qr, TransferState as nr, \u0275RuntimeError as or, makeStateKey as Hr, \u0275truncateMiddle as Ot, \u0275formatRuntimeError as Dt, Injector as et, signal as sr, \u0275ResourceImpl as rt, linkedSignal as ve, computed as tt, \u0275encapsulateResourceError as nt } from "@angular/core";
import { of as ot } from "rxjs";
import { tap as st } from "rxjs/operators";
var ir = new tr(""), ar = "b", cr = "h", dr = "s", lr = "st", ur = "u", hr = "rt", ee = new tr(""), it = ["GET", "HEAD"];
function fr(e, t) { let i = t, { isCacheActive: r } = i, n = be(i, ["isCacheActive"]), { transferCache: o, method: s } = e; return !(!r || o === !1 || s === "POST" && !n.includePostRequests && !o || s !== "POST" && !it.includes(s) || !n.includeRequestsWithAuthHeaders && ct(e) || n.filter?.(e) === !1); }
function pr(e, t) { let { includeHeaders: r } = e, n = r; return typeof t == "object" && t.includeHeaders && (n = t.includeHeaders), n; }
function yr(e, t, r, n) { let { transferCache: o } = e; if (!fr(e, t))
    return null; if (typeof ngServerMode < "u" && !ngServerMode && n)
    throw new or(2803, !1); let s = typeof ngServerMode < "u" && ngServerMode && n ? gr(e.url, n) : e.url, i = mr(e, s), d = r.get(i, null), a = pr(t, o); if (d) {
    let { [ar]: h, [hr]: p, [cr]: u, [dr]: T, [lr]: v, [ur]: P } = d, y = h;
    switch (p) {
        case "arraybuffer":
            y = rr(h);
            break;
        case "blob":
            y = new Blob([rr(h)]);
            break;
    }
    let c = new b(u);
    return new D({ body: y, headers: c, status: T, statusText: v, url: P });
} return null; }
function at(e, t) { let r = L(ee), n = L(nr), o = L(ir, { optional: !0 }), s = yr(e, r, n, o); if (s)
    return ot(s); let { transferCache: i } = e, d = pr(r, i), a = typeof ngServerMode < "u" && ngServerMode && o ? gr(e.url, o) : e.url, h = mr(e, a); if (!fr(e, r))
    return t(e); let p = t(e); return typeof ngServerMode < "u" && ngServerMode ? p.pipe(st(u => { u instanceof D && n.set(h, { [ar]: e.responseType === "arraybuffer" || e.responseType === "blob" ? ut(u.body) : u.body, [cr]: dt(u.headers, d), [dr]: u.status, [lr]: u.statusText, [ur]: a, [hr]: e.responseType }); })) : p; }
function ct(e) { return e.headers.has("authorization") || e.headers.has("proxy-authorization"); }
function dt(e, t) { if (!t)
    return {}; let r = {}; for (let n of t) {
    let o = e.getAll(n);
    o !== null && (r[n] = o);
} return r; }
function er(e) { return [...e.keys()].sort().map(t => `${t}=${e.getAll(t)}`).join("&"); }
function mr(e, t) { let { params: r, method: n, responseType: o } = e, s = er(r), i = e.serializeBody(); i instanceof URLSearchParams ? i = er(i) : typeof i != "string" && (i = ""); let d = [n, o, t, i, s].join("|"), a = lt(d); return Hr(a); }
function lt(e) { let t = 0; for (let r of e)
    t = Math.imul(31, t) + r.charCodeAt(0) << 0; return t += 2147483648, t.toString(); }
function ut(e) { let t = new Uint8Array(e), r = 32768, n = ""; for (let o = 0; o < t.length; o += r) {
    let s = t.subarray(o, o + r);
    n += String.fromCharCode.apply(null, s);
} return btoa(n); }
function rr(e) { let t = atob(e); return Uint8Array.from(t, n => n.charCodeAt(0)).buffer; }
function _t(e) { return [{ provide: ee, useFactory: () => (Qr("NgHttpTransferCache"), J({ isCacheActive: !0 }, e)) }, { provide: fe, useValue: at, multi: !0 }, { provide: Zr, multi: !0, useFactory: () => { let t = L(qr), r = L(ee); return () => { t.whenStable().then(() => { r.isCacheActive = !1; }); }; } }]; }
function gr(e, t) { let r = new URL(e, "resolve://").origin, n = t[r]; return n ? e.replace(r, n) : e; }
var xt = (() => { let e = H("json"); return e.arrayBuffer = H("arraybuffer"), e.blob = H("blob"), e.text = H("text"), e; })();
function H(e) { return function (r, n) { let o = n?.injector ?? L(et), s = o.get(ee, null, { optional: !0 }), i = o.get(nr, null, { optional: !0 }), d = o.get(ir, null, { optional: !0 }), a = h => { if (s && i && h) {
    let p = yr(h, s, i, d);
    if (p)
        try {
            let u = p.body, T = n?.parse ? n.parse(u) : u;
            return sr({ value: T });
        }
        catch { }
} }; return new we(o, () => ht(r, e), n?.defaultValue, n?.debugName, n?.parse, n?.equal, a); }; }
function ht(e, t) { let r = typeof e == "function" ? e() : e; if (r === void 0)
    return; typeof r == "string" && (r = { url: r }); let n = r.headers instanceof b ? r.headers : new b(r.headers), o = r.params instanceof M ? r.params : new M({ fromObject: r.params }); return new F(r.method ?? "GET", r.url, r.body ?? null, { headers: n, params: o, reportProgress: r.reportProgress, withCredentials: r.withCredentials, keepalive: r.keepalive, cache: r.cache, priority: r.priority, mode: r.mode, redirect: r.redirect, responseType: t, context: r.context, transferCache: r.transferCache, credentials: r.credentials, referrer: r.referrer, referrerPolicy: r.referrerPolicy, integrity: r.integrity, timeout: r.timeout }); }
var we = class extends rt {
    client;
    _headers = ve({ source: this.extRequest, computation: () => { } });
    _progress = ve({ source: this.extRequest, computation: () => { } });
    _statusCode = ve({ source: this.extRequest, computation: () => { } });
    headers = tt(() => this.status() === "resolved" || this.status() === "error" ? this._headers() : void 0);
    progress = this._progress.asReadonly();
    statusCode = this._statusCode.asReadonly();
    constructor(t, r, n, o, s, i, d) { super(r, ({ params: a, abortSignal: h }) => { let p, u = () => p.unsubscribe(); h.addEventListener("abort", u); let T = sr({ value: void 0 }), v, P = new Promise(c => v = c), y = c => { T.set(c), v?.(T), v = void 0; }; return p = this.client.request(a).subscribe({ next: c => { switch (c.type) {
            case R.Response:
                this._headers.set(c.headers), this._statusCode.set(c.status);
                try {
                    y({ value: s ? s(c.body) : c.body });
                }
                catch (f) {
                    y({ error: nt(f) });
                }
                break;
            case R.DownloadProgress:
                this._progress.set(c);
                break;
        } }, error: c => { c instanceof E && (this._headers.set(c.headers), this._statusCode.set(c.status)), y({ error: c }), h.removeEventListener("abort", u); }, complete: () => { v && y({ error: new or(991, !1) }), h.removeEventListener("abort", u); } }), P; }, n, i, o, t, d), this.client = t.get(ye); }
    set(t) { super.set(t), this._headers.set(void 0), this._progress.set(void 0), this._statusCode.set(void 0); }
};
export { G as FetchBackend, he as HTTP_INTERCEPTORS, ir as HTTP_TRANSFER_CACHE_ORIGIN_MAP, X as HttpBackend, ye as HttpClient, Yr as HttpClientJsonpModule, Kr as HttpClientModule, Wr as HttpClientXsrfModule, W as HttpContext, oe as HttpContextToken, E as HttpErrorResponse, R as HttpEventType, A as HttpFeatureKind, q as HttpHandler, B as HttpHeaderResponse, b as HttpHeaders, M as HttpParams, F as HttpRequest, D as HttpResponse, C as HttpResponseBase, Be as HttpStatusCode, K as HttpUrlEncodingCodec, ue as HttpXhrBackend, Te as HttpXsrfTokenExtractor, me as JsonpClientBackend, Jr as JsonpInterceptor, xt as httpResource, Ze as provideHttpClient, Gr as withFetch, Vr as withInterceptors, Qe as withInterceptorsFromDi, He as withJsonpSupport, qe as withNoXsrfProtection, $r as withRequestsMadeViaParent, ae as withXsrfConfiguration, fe as \u0275HTTP_ROOT_INTERCEPTOR_FNS, Z as \u0275HttpInterceptingHandler, pe as \u0275REQUESTS_CONTRIBUTE_TO_STABILITY, _t as \u0275withHttpTransferCache };
/*! Bundled license information:

@angular/common/fesm2022/_module-chunk.mjs:
@angular/common/fesm2022/http.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
