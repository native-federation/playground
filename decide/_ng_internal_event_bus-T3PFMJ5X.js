import "@nf-internal/chunk-DUTPQ56Q";
var t = e => { let a = window.__NF_REGISTRY__; if (!a)
    throw new Error(`event-bus: __NF_REGISTRY__ is not on window (channel "${e}").`); return a; }, n = e => (t(e), Object.freeze({ name: e, emit: a => t(e).emit(e, a), update: a => t(e).update(e, a), on: (a, o) => t(e).on(e, r => a(r.data), o) }));
var i = n("store:selected");
var p = n("nav:navigate"), v = n("nav:intents");
export { n as defineChannel, v as navIntents, p as navigateTo, i as storeSelected };
