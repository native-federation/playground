// copied from shell/src/contracts.ts
// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.

// What every remote exposes as `nav-contribution`. The public intent id is
// `${basePath}.${intent.id}`, e.g. 'seating.plan'.
export interface NavContribution {
  readonly basePath: string;
  readonly intents: readonly NavIntent[];
  // Elements the shell defines at startup (ADR-15).
  readonly fragments?: readonly NavFragment[];
}

export interface NavIntent {
  readonly id: string;
  // `{name}` segments are filled from the NavPayload, e.g. '{screeningId}'.
  readonly path: string;
  // Routed intents render this element; intents without one are link-only.
  readonly element?: string;
}

export interface NavFragment {
  // An exposed key, like a routed element.
  readonly element: string;
  // Absent: pages embed it. 'header': the shell also places it in its header.
  readonly slot?: 'header';
}

// Fills `{param}` segments of an intent path; leftover keys become the query string.
export type NavPayload = Readonly<Record<string, string>>;

// Written by the shell onto a routed element as its `routeParams` property.
export type RouteParams = Readonly<Record<string, string>>;

// Published by the shell: every intent's absolute path by full id, e.g.
// 'film.detail' → '/film/{filmId}'. Params are `{name}` placeholders.
export type NavIntents = Readonly<Record<string, string>>;

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: NavPayload;
}

// The seats held for one screening, in grid order (A1 before A2).
export interface SeatHold {
  readonly screeningId: string;
  readonly seats: readonly string[];
}

export interface BookingConfirmed {
  readonly bookingRef: string;
  readonly ticketCount: number;
}

// Every channel on the bus, by name.
declare module '@softarc/native-federation-communication' {
  interface Channels {
    // Command (emit with { retain: false }): ask the shell to navigate to an intent.
    'nav:navigate': NavigatePayload;
    // State: the shell's NavIntents, retained for links that render later.
    'nav:intents': NavIntents;
    // State: seating's current hold, retained for booking's summary on the same page (ADR-16).
    'seating:hold': SeatHold;
    // Command (emit with { retain: false }): a booking is counted once, by whoever listens now (ADR-05).
    'booking:confirmed': BookingConfirmed;
  }
}
