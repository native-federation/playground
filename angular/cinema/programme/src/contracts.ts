// copied from shell/src/contracts.ts
// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.
import type { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

declare global {
  interface Window {
    // Installed by whichever main.ts runs first (see shell/src/main.ts).
    __NF_REGISTRY__?: NFEventRegistry;
  }
}

// What every remote exposes as `nav-contribution`. The public intent id is
// `${basePath}.${intent.id}`, e.g. 'seating.plan'.
export interface NavContribution {
  readonly basePath: string;
  readonly intents: readonly NavIntent[];
}

export interface NavIntent {
  readonly id: string;
  // `{name}` segments are filled from the NavPayload, e.g. '{screeningId}'.
  readonly path: string;
  // Routed intents render this element; intents without one are link-only.
  readonly element?: string;
}

// Fills `{param}` segments of an intent path; leftover keys become the query string.
export type NavPayload = Readonly<Record<string, string>>;

// Published by the shell: turns an intent into a URL, or null when it is unknown
// or a path param is missing.
export type NavResolver = (id: string, payload?: NavPayload) => string | null;

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: NavPayload;
}

// Every event on window.__NF_REGISTRY__, by name.
export interface Events {
  // Command (emit with replay 0): ask the shell to navigate to an intent.
  'nav:navigate': NavigatePayload;
  // Resource (register/onReady): the shell's NavResolver. register() calls a
  // function argument as a provider, so the shell registers `() => resolve`.
  'nav:resolve': NavResolver;
}
