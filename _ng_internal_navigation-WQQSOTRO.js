import { DestroyRef as y, ElementRef as v, computed as s, inject as l, input as p, signal as g } from "@angular/core";
import { navIntents as u, navigateTo as h } from "@ng-internal/event-bus";
import { joinPath as f, resolveTemplate as c } from "@ng-internal/url";
import * as a from "@angular/core";
var m = Object.freeze({}), N = new Map, d = class o {
    appNavigateTo = p.required();
    navPayload = p(m);
    intents = g(N);
    isAnchor = l(v).nativeElement.tagName === "A";
    displayStyle = s(() => this.intents().has(this.appNavigateTo()) ? null : "none");
    tryResolveUrl() { let t = this.intents().get(this.appNavigateTo()); if (!t)
        return null; try {
        return f(t.basePath, c(t.path, this.navPayload()));
    }
    catch {
        return null;
    } }
    hrefAttr = s(() => this.isAnchor ? this.tryResolveUrl() : null);
    constructor() { try {
        let t = u.on(e => this.intents.set(e));
        l(y).onDestroy(t);
    }
    catch { } }
    onClick(t) { if (this.isAnchor && (t.button !== 0 || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey))
        return; let e = this.appNavigateTo(), n = this.intents().get(e); if (n) {
        try {
            c(n.path, this.navPayload());
        }
        catch (i) {
            let r = i instanceof Error ? i.message : String(i);
            console.warn(`[nav] [appNavigateTo]="${e}" cannot navigate: ${r}`);
            return;
        }
        this.isAnchor && t.preventDefault(), h.emit({ id: e, payload: this.navPayload() });
    } }
    static \u0275fac = function (e) { return new (e || o); };
    static \u0275dir = a.\u0275\u0275defineDirective({ type: o, selectors: [["", "appNavigateTo", ""]], hostVars: 5, hostBindings: function (e, n) { e & 1 && a.\u0275\u0275listener("click", function (r) { return n.onClick(r); }), e & 2 && (a.\u0275\u0275attribute("href", n.hrefAttr(), a.\u0275\u0275sanitizeUrlOrResourceUrl), a.\u0275\u0275styleProp("cursor", "pointer")("display", n.displayStyle())); }, inputs: { appNavigateTo: [1, "appNavigateTo"], navPayload: [1, "navPayload"] } });
};
export { d as NavigateToDirective };
