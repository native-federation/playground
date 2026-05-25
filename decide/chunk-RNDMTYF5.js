var e;
function u() { return e; }
function i(n) { let r = e; return e = n, r; }
function d(n, r) { let o = u(); if (!o)
    throw new Error("Current injector is not set."); if (!n.\u0275prov)
    throw new Error("Token is not an injectable"); return o.retrieve(n, r); }
var c = Symbol("NotFound"), t = class extends Error {
    name = "\u0275NotFound";
    constructor(r) { super(r); }
};
function f(n) { return n === c || n?.name === "\u0275NotFound"; }
function j(n) { return { token: n.token, providedIn: n.providedIn || null, factory: n.factory, value: void 0 }; }
function a(n, r) { return n.\u0275prov = r, n; }
export { u as a, i as b, d as c, c as d, t as e, f, j as g, a as h };
/*! Bundled license information:

@angular/core/fesm2022/_not_found-chunk.mjs:
@angular/core/fesm2022/primitives-di.mjs:
  (**
   * @license Angular v21.2.14
   * (c) 2010-2026 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
