import type { IntentMap } from '../nav/contribution';
import type { NavPayload } from '../nav/nav-payload';
import { defineChannel, defineResource } from './channel';

export interface NavigatePayload {
  readonly id: string;
  readonly payload?: NavPayload;
}

// A command: never replay an old navigation to a new subscriber.
export const navigateTo = defineChannel<NavigatePayload>('nav:navigate', {
  replay: 0,
});

// Published once by the host, so links in every remote can render a real href.
export const navIntents = defineResource<IntentMap>('nav:intents');
