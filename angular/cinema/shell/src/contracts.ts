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
  // Elements the shell mounts at startup, in one of its slots (ADR-06).
  readonly fragments?: readonly NavFragment[];
}

export interface NavIntent {
  readonly id: string;
  // `{name}` segments are filled from the NavPayload, e.g. '{screeningId}'.
  readonly path: string;
  // Routed intents render this element; intents without one are link-only.
  readonly element?: string;
  // Shown in the shell's main menu; only on intents without `{params}`.
  readonly menuLabel?: string;
}

export interface NavFragment {
  // An exposed key, like a routed element.
  readonly element: string;
  readonly slot: 'header' | 'overlay';
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

// A message for the moviegoer, already worded by the team it belongs to (ADR-14).
export interface NotifyMessage {
  readonly message: string;
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
    // Command (emit with { retain: false }): show a short-lived message to the moviegoer (ADR-14).
    'notify:show': NotifyMessage;
  }
}
