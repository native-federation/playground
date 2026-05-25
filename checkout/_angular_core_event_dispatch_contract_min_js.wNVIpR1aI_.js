(() => { function s(t, n, i, e, a, c, p, l) { return { eventType: t, event: n, targetElement: i, eic: e, timeStamp: a, eia: c, eirp: p, eiack: l }; } function r(t) { let n = [], i = e => { n.push(e); }; return { c: t, q: n, et: [], etc: [], d: i, h: e => { i(s(e.type, e, e.target, t, Date.now())); } }; } function o(t, n, i) { for (let e = 0; e < n.length; e++) {
    let a = n[e];
    (i ? t.etc : t.et).push(a), t.c.addEventListener(a, t.h, i);
} } function u(t, n, i, e, a = window) { let c = r(t); a._ejsas || (a._ejsas = {}), a._ejsas[n] = c, o(c, i), o(c, e, !0); } window.__jsaction_bootstrap = u; })();
