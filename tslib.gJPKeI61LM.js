var m = function (e, t) { return m = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (r, n) { r.__proto__ = n; } || function (r, n) { for (var i in n)
    Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]); }, m(e, t); };
function P(e, t) { if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null"); m(e, t); function r() { this.constructor = e; } e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r); }
var v = function () { return v = Object.assign || function (t) { for (var r, n = 1, i = arguments.length; n < i; n++) {
    r = arguments[n];
    for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
} return t; }, v.apply(this, arguments); };
function S(e, t) { var r = {}; for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]); if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
        t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]]); return r; }
function E(e, t, r, n) { var i = arguments.length, o = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n, a; if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    o = Reflect.decorate(e, t, r, n);
else
    for (var f = e.length - 1; f >= 0; f--)
        (a = e[f]) && (o = (i < 3 ? a(o) : i > 3 ? a(t, r, o) : a(t, r)) || o); return i > 3 && o && Object.defineProperty(t, r, o), o; }
function T(e, t) { return function (r, n) { t(r, n, e); }; }
function D(e, t, r, n, i, o) { function a(b) { if (b !== void 0 && typeof b != "function")
    throw new TypeError("Function expected"); return b; } for (var f = n.kind, p = f === "getter" ? "get" : f === "setter" ? "set" : "value", c = !t && e ? n.static ? e : e.prototype : null, s = t || (c ? Object.getOwnPropertyDescriptor(c, n.name) : {}), l, w = !1, u = r.length - 1; u >= 0; u--) {
    var y = {};
    for (var h in n)
        y[h] = h === "access" ? {} : n[h];
    for (var h in n.access)
        y.access[h] = n.access[h];
    y.addInitializer = function (b) { if (w)
        throw new TypeError("Cannot add initializers after decoration has completed"); o.push(a(b || null)); };
    var d = (0, r[u])(f === "accessor" ? { get: s.get, set: s.set } : s[p], y);
    if (f === "accessor") {
        if (d === void 0)
            continue;
        if (d === null || typeof d != "object")
            throw new TypeError("Object expected");
        (l = a(d.get)) && (s.get = l), (l = a(d.set)) && (s.set = l), (l = a(d.init)) && i.unshift(l);
    }
    else
        (l = a(d)) && (f === "field" ? i.unshift(l) : s[p] = l);
} c && Object.defineProperty(c, n.name, s), w = !0; }
function R(e, t, r) { for (var n = arguments.length > 2, i = 0; i < t.length; i++)
    r = n ? t[i].call(e, r) : t[i].call(e); return n ? r : void 0; }
function A(e) { return typeof e == "symbol" ? e : "".concat(e); }
function I(e, t, r) { return typeof t == "symbol" && (t = t.description ? "[".concat(t.description, "]") : ""), Object.defineProperty(e, "name", { configurable: !0, value: r ? "".concat(r, " ", t) : t }); }
function C(e, t) { if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, t); }
function F(e, t, r, n) { function i(o) { return o instanceof r ? o : new r(function (a) { a(o); }); } return new (r || (r = Promise))(function (o, a) { function f(s) { try {
    c(n.next(s));
}
catch (l) {
    a(l);
} } function p(s) { try {
    c(n.throw(s));
}
catch (l) {
    a(l);
} } function c(s) { s.done ? o(s.value) : i(s.value).then(f, p); } c((n = n.apply(e, t || [])).next()); }); }
function M(e, t) { var r = { label: 0, sent: function () { if (o[0] & 1)
        throw o[1]; return o[1]; }, trys: [], ops: [] }, n, i, o, a = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype); return a.next = f(0), a.throw = f(1), a.return = f(2), typeof Symbol == "function" && (a[Symbol.iterator] = function () { return this; }), a; function f(c) { return function (s) { return p([c, s]); }; } function p(c) { if (n)
    throw new TypeError("Generator is already executing."); for (; a && (a = 0, c[0] && (r = 0)), r;)
    try {
        if (n = 1, i && (o = c[0] & 2 ? i.return : c[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, c[1])).done)
            return o;
        switch (i = 0, o && (c = [c[0] & 2, o.value]), c[0]) {
            case 0:
            case 1:
                o = c;
                break;
            case 4: return r.label++, { value: c[1], done: !1 };
            case 5:
                r.label++, i = c[1], c = [0];
                continue;
            case 7:
                c = r.ops.pop(), r.trys.pop();
                continue;
            default:
                if (o = r.trys, !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2)) {
                    r = 0;
                    continue;
                }
                if (c[0] === 3 && (!o || c[1] > o[0] && c[1] < o[3])) {
                    r.label = c[1];
                    break;
                }
                if (c[0] === 6 && r.label < o[1]) {
                    r.label = o[1], o = c;
                    break;
                }
                if (o && r.label < o[2]) {
                    r.label = o[2], r.ops.push(c);
                    break;
                }
                o[2] && r.ops.pop(), r.trys.pop();
                continue;
        }
        c = t.call(e, r);
    }
    catch (s) {
        c = [6, s], i = 0;
    }
    finally {
        n = o = 0;
    } if (c[0] & 5)
    throw c[1]; return { value: c[0] ? c[1] : void 0, done: !0 }; } }
var j = Object.create ? function (e, t, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(t, r); (!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return t[r]; } }), Object.defineProperty(e, n, i); } : function (e, t, r, n) { n === void 0 && (n = r), e[n] = t[r]; };
function G(e, t) { for (var r in e)
    r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && j(t, e, r); }
function g(e) { var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0; if (r)
    return r.call(e); if (e && typeof e.length == "number")
    return { next: function () { return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }; } }; throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined."); }
function x(e, t) { var r = typeof Symbol == "function" && e[Symbol.iterator]; if (!r)
    return e; var n = r.call(e), i, o = [], a; try {
    for (; (t === void 0 || t-- > 0) && !(i = n.next()).done;)
        o.push(i.value);
}
catch (f) {
    a = { error: f };
}
finally {
    try {
        i && !i.done && (r = n.return) && r.call(n);
    }
    finally {
        if (a)
            throw a.error;
    }
} return o; }
function K() { for (var e = [], t = 0; t < arguments.length; t++)
    e = e.concat(x(arguments[t])); return e; }
function N() { for (var e = 0, t = 0, r = arguments.length; t < r; t++)
    e += arguments[t].length; for (var n = Array(e), i = 0, t = 0; t < r; t++)
    for (var o = arguments[t], a = 0, f = o.length; a < f; a++, i++)
        n[i] = o[a]; return n; }
function V(e, t, r) { if (r || arguments.length === 2)
    for (var n = 0, i = t.length, o; n < i; n++)
        (o || !(n in t)) && (o || (o = Array.prototype.slice.call(t, 0, n)), o[n] = t[n]); return e.concat(o || Array.prototype.slice.call(t)); }
function _(e) { return this instanceof _ ? (this.v = e, this) : new _(e); }
function $(e, t, r) { if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined."); var n = r.apply(e, t || []), i, o = []; return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), f("next"), f("throw"), f("return", a), i[Symbol.asyncIterator] = function () { return this; }, i; function a(u) { return function (y) { return Promise.resolve(y).then(u, l); }; } function f(u, y) { n[u] && (i[u] = function (h) { return new Promise(function (d, b) { o.push([u, h, d, b]) > 1 || p(u, h); }); }, y && (i[u] = y(i[u]))); } function p(u, y) { try {
    c(n[u](y));
}
catch (h) {
    w(o[0][3], h);
} } function c(u) { u.value instanceof _ ? Promise.resolve(u.value.v).then(s, l) : w(o[0][2], u); } function s(u) { p("next", u); } function l(u) { p("throw", u); } function w(u, y) { u(y), o.shift(), o.length && p(o[0][0], o[0][1]); } }
function q(e) { var t, r; return t = {}, n("next"), n("throw", function (i) { throw i; }), n("return"), t[Symbol.iterator] = function () { return this; }, t; function n(i, o) { t[i] = e[i] ? function (a) { return (r = !r) ? { value: _(e[i](a)), done: !1 } : o ? o(a) : a; } : o; } }
function B(e) { if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined."); var t = e[Symbol.asyncIterator], r; return t ? t.call(e) : (e = typeof g == "function" ? g(e) : e[Symbol.iterator](), r = {}, n("next"), n("throw"), n("return"), r[Symbol.asyncIterator] = function () { return this; }, r); function n(o) { r[o] = e[o] && function (a) { return new Promise(function (f, p) { a = e[o](a), i(f, p, a.done, a.value); }); }; } function i(o, a, f, p) { Promise.resolve(p).then(function (c) { o({ value: c, done: f }); }, a); } }
function L(e, t) { return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e; }
var z = Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }); } : function (e, t) { e.default = t; }, O = function (e) { return O = Object.getOwnPropertyNames || function (t) { var r = []; for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (r[r.length] = n); return r; }, O(e); };
function H(e) { if (e && e.__esModule)
    return e; var t = {}; if (e != null)
    for (var r = O(e), n = 0; n < r.length; n++)
        r[n] !== "default" && j(t, e, r[n]); return z(t, e), t; }
function J(e) { return e && e.__esModule ? e : { default: e }; }
function Q(e, t, r, n) { if (r === "a" && !n)
    throw new TypeError("Private accessor was defined without a getter"); if (typeof t == "function" ? e !== t || !n : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it"); return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e); }
function U(e, t, r, n, i) { if (n === "m")
    throw new TypeError("Private method is not writable"); if (n === "a" && !i)
    throw new TypeError("Private accessor was defined without a setter"); if (typeof t == "function" ? e !== t || !i : !t.has(e))
    throw new TypeError("Cannot write private member to an object whose class did not declare it"); return n === "a" ? i.call(e, r) : i ? i.value = r : t.set(e, r), r; }
function W(e, t) { if (t === null || typeof t != "object" && typeof t != "function")
    throw new TypeError("Cannot use 'in' operator on non-object"); return typeof e == "function" ? t === e : e.has(t); }
function X(e, t, r) { if (t != null) {
    if (typeof t != "object" && typeof t != "function")
        throw new TypeError("Object expected.");
    var n, i;
    if (r) {
        if (!Symbol.asyncDispose)
            throw new TypeError("Symbol.asyncDispose is not defined.");
        n = t[Symbol.asyncDispose];
    }
    if (n === void 0) {
        if (!Symbol.dispose)
            throw new TypeError("Symbol.dispose is not defined.");
        n = t[Symbol.dispose], r && (i = n);
    }
    if (typeof n != "function")
        throw new TypeError("Object not disposable.");
    i && (n = function () { try {
        i.call(this);
    }
    catch (o) {
        return Promise.reject(o);
    } }), e.stack.push({ value: t, dispose: n, async: r });
}
else
    r && e.stack.push({ async: !0 }); return t; }
var Y = typeof SuppressedError == "function" ? SuppressedError : function (e, t, r) { var n = new Error(r); return n.name = "SuppressedError", n.error = e, n.suppressed = t, n; };
function Z(e) { function t(o) { e.error = e.hasError ? new Y(o, e.error, "An error was suppressed during disposal.") : o, e.hasError = !0; } var r, n = 0; function i() { for (; r = e.stack.pop();)
    try {
        if (!r.async && n === 1)
            return n = 0, e.stack.push(r), Promise.resolve().then(i);
        if (r.dispose) {
            var o = r.dispose.call(r.value);
            if (r.async)
                return n |= 2, Promise.resolve(o).then(i, function (a) { return t(a), i(); });
        }
        else
            n |= 1;
    }
    catch (a) {
        t(a);
    } if (n === 1)
    return e.hasError ? Promise.reject(e.error) : Promise.resolve(); if (e.hasError)
    throw e.error; } return i(); }
function k(e, t) { return typeof e == "string" && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (r, n, i, o, a) { return n ? t ? ".jsx" : ".js" : i && (!o || !a) ? r : i + o + "." + a.toLowerCase() + "js"; }) : e; }
var ee = { __extends: P, __assign: v, __rest: S, __decorate: E, __param: T, __esDecorate: D, __runInitializers: R, __propKey: A, __setFunctionName: I, __metadata: C, __awaiter: F, __generator: M, __createBinding: j, __exportStar: G, __values: g, __read: x, __spread: K, __spreadArrays: N, __spreadArray: V, __await: _, __asyncGenerator: $, __asyncDelegator: q, __asyncValues: B, __makeTemplateObject: L, __importStar: H, __importDefault: J, __classPrivateFieldGet: Q, __classPrivateFieldSet: U, __classPrivateFieldIn: W, __addDisposableResource: X, __disposeResources: Z, __rewriteRelativeImportExtension: k };
export { X as __addDisposableResource, v as __assign, q as __asyncDelegator, $ as __asyncGenerator, B as __asyncValues, _ as __await, F as __awaiter, Q as __classPrivateFieldGet, W as __classPrivateFieldIn, U as __classPrivateFieldSet, j as __createBinding, E as __decorate, Z as __disposeResources, D as __esDecorate, G as __exportStar, P as __extends, M as __generator, J as __importDefault, H as __importStar, L as __makeTemplateObject, C as __metadata, T as __param, A as __propKey, x as __read, S as __rest, k as __rewriteRelativeImportExtension, R as __runInitializers, I as __setFunctionName, K as __spread, V as __spreadArray, N as __spreadArrays, g as __values, ee as default };
