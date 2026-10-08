import type { NavPayload } from './nav-payload';

export interface NavTarget {
  readonly intent: string;
  readonly params?: NavPayload;
}

export interface NavIntent {
  readonly id: string;
  readonly path: string;
  readonly element?: string;
}

// What each remote exposes as `nav-contribution`. The public intent id is
// `${basePath}.${intent.id}`, e.g. 'checkout.cart'.
export interface NavContribution {
  readonly basePath: string;
  readonly intents: readonly NavIntent[];
}

export interface IntentTarget {
  readonly basePath: string;
  readonly path: string;
}

// Public intent id -> where it lives.
export type IntentMap = ReadonlyMap<string, IntentTarget>;
