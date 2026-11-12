// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.

// What every exposed `mfe-*` module exports.
export interface RemoteElementModule {
  bootstrap(): Promise<void>;
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

// Written by the shell onto a routed element as its `routeParams` property.
export type RouteParams = Readonly<Record<string, string>>;

// Published by the shell: turns an intent into a URL, or null when it is unknown
// or a path param is missing.
export type NavResolver = (id: string, payload?: NavPayload) => string | null;

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: NavPayload;
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
    // State: the shell's NavResolver, retained for links that render later.
    'nav:resolve': NavResolver;
    // Command (emit with { retain: false }): a booking is counted once, by whoever listens now (ADR-05).
    'booking:confirmed': BookingConfirmed;
  }
}
