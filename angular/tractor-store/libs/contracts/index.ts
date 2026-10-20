// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

declare global {
  interface Window {
    // Installed by whichever main.ts runs first (see projects/host/src/main.ts).
    __NF_REGISTRY__?: NFEventRegistry;
  }
}

// public/env.config.json of every app.
export interface EnvironmentConfig {
  readonly production: boolean;
  readonly cdnUrl: string;
}

// What every exposed `mfe-*` module exports.
export interface RemoteElementModule {
  bootstrap(env: EnvironmentConfig, nf: NativeFederationResult): Promise<void>;
}

// What every remote exposes as `nav-contribution`. The public intent id is
// `${basePath}.${intent.id}`, e.g. 'checkout.cart'.
export interface NavContribution {
  readonly basePath: string;
  readonly intents: readonly NavIntent[];
}

export interface NavIntent {
  readonly id: string;
  // `{name}` segments are filled from the NavPayload, e.g. '/product/{id}'.
  readonly path: string;
  // Routed intents render this element; intents without one are link-only.
  readonly element?: string;
}

// Fills `{param}` segments of an intent path; leftover keys become the query string.
export type NavPayload = Readonly<Record<string, string>>;

// Written by the host onto a routed element as its `routeParams` property.
// Repeated query params arrive as arrays.
export type RouteParams = Readonly<Record<string, string | readonly string[]>>;

// Published by the host: turns an intent into a URL, or null when it is unknown
// or a path param is missing.
export type NavResolver = (id: string, payload?: NavPayload) => string | null;

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: NavPayload;
}

export interface StoreSelectedPayload {
  readonly id: string;
}

// Every event on window.__NF_REGISTRY__, by name.
export interface Events {
  // Command (emit with replay 0): ask the host to navigate to an intent.
  'nav:navigate': NavigatePayload;
  // Resource (register/onReady): the host's NavResolver. register() calls a
  // function argument as a provider, so the host registers `() => resolve`.
  'nav:resolve': NavResolver;
  'store:selected': StoreSelectedPayload;
}
