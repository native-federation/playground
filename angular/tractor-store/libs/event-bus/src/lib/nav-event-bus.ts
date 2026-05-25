import { defineChannel } from './event-bus-setup';

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: Readonly<Record<string, string>>;
}

export const navigateTo = defineChannel<NavigatePayload>('nav:navigate');

export interface NavIntentEntry {
  readonly basePath: string;
  readonly path: string;
}

export type NavIntentMap = ReadonlyMap<string, NavIntentEntry>;

export const navIntents = defineChannel<NavIntentMap>('nav:intents');
