// copied from shell/src/contracts.ts
// Everything the teams agree on. Types only: nothing here exists at runtime,
// so each app keeps its own implementation of the flow.

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
}

export interface NavFragment {
  // An exposed key, like a routed element.
  readonly element: string;
  readonly slot: 'header' | 'overlay';
}

// A message for the moviegoer, already worded by the team it belongs to (ADR-14).
export interface NotifyMessage {
  readonly message: string;
}

// Every channel on the bus, by name.
declare module '@softarc/native-federation-communication' {
  interface Channels {
    // Command (emit with { retain: false }): show a short-lived message to the moviegoer (ADR-14).
    'notify:show': NotifyMessage;
  }
}
