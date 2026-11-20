// copied from shell/src/contracts.ts
// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.

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

// The seats held for one screening, in grid order (A1 before A2).
export interface SeatHold {
  readonly screeningId: string;
  readonly seats: readonly string[];
}

// Every channel on the bus, by name.
declare module '@softarc/native-federation-communication' {
  interface Channels {
    // State: seating's current hold, retained for booking's summary on the same page (ADR-16).
    'seating:hold': SeatHold;
  }
}
