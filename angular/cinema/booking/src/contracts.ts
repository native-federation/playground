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

// Written by the shell onto a routed element as its `routeParams` property.
export type RouteParams = Readonly<Record<string, string>>;

export interface BookingConfirmed {
  readonly bookingRef: string;
  readonly ticketCount: number;
}

// Every event on window.__NF_REGISTRY__, by name.
export interface Events {
  'booking:confirmed': BookingConfirmed;
}
