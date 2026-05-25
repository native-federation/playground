import "@nf-internal/chunk-2VMXMS7J";
var a = /^\{([a-zA-Z_$][\w$]*)\}$/, u = r => r.replace(/^\/+|\/+$/g, ""), p = (r, t) => "/" + [u(r), u(t)].filter(e => e.length > 0).join("/"), l = (r, t) => p(r, t).replace(/^\/+/, "").split("/").map(n => { let e = a.exec(n); return e ? `:${e[1]}` : n; }).join("/"), g = r => r.split("/").map(t => a.exec(t)?.[1] ?? null).filter(t => t !== null), f = (r, t) => r.split("/").map(n => { let e = a.exec(n); if (!e)
    return n; let o = t[e[1]]; if (o == null)
    throw new Error(`[nav] missing required param "{${e[1]}}" for path "${r}"`); return encodeURIComponent(o); }).join("/");
var c = (r, t) => { let n = r[t]; return typeof n == "string" ? n : void 0; }, d = (r, t) => { let n = c(r, t); if (n === void 0)
    throw new Error(`[nav] missing required route param "${t}"`); return n; }, y = (r, t) => { let n = r[t]; return Array.isArray(n) ? n : typeof n == "string" ? [n] : []; }, x = (r, t) => { if (r === t)
    return !0; let n = Object.keys(r); if (n.length !== Object.keys(t).length)
    return !1; for (let e of n) {
    let o = r[e], s = t[e];
    if (o !== s) {
        if (Array.isArray(o) && Array.isArray(s)) {
            if (o.length !== s.length)
                return !1;
            for (let i = 0; i < o.length; i += 1)
                if (o[i] !== s[i])
                    return !1;
            continue;
        }
        return !1;
    }
} return !0; };
var R = (r, t) => { let n = Object.keys(t); if (n.length === 0)
    return r; let e = n.map(o => `${encodeURIComponent(o)}=${encodeURIComponent(t[o])}`).join("&"); return `${r}?${e}`; };
export { R as appendQueryString, p as joinPath, c as param, y as paramList, d as requiredParam, f as resolveTemplate, x as sameRouteParams, g as splitIntentParams, l as toRoutePath };
