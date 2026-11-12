// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';

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

// Every channel on the bus, by name.
declare module '@softarc/native-federation-communication' {
  interface Channels {
    // Command (emit with { retain: false }): ask the host to navigate to an intent.
    'nav:navigate': NavigatePayload;
    // State: the host's NavResolver, retained for links that render later.
    'nav:resolve': NavResolver;
    'store:selected': StoreSelectedPayload;
  }
}
