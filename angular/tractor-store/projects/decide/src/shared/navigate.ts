import { bus } from '@softarc/native-federation-communication';
import type {
  NavIntents,
  NavigatePayload,
  NavPayload,
} from '@tractor-store/contracts';

// The only place that emits nav:navigate: a command, so a listener that subscribes later never gets it.
export const navigateTo = (target: NavigatePayload): void =>
  bus.emit('nav:navigate', target, { retain: false });

// Payload keys fill the path's `{param}` segments; the rest become the query string.
export const urlFor = (
  intents: NavIntents,
  id: string,
  payload: NavPayload = {},
): string | null => {
  // hasOwn, so an id like 'constructor' doesn't hit Object.prototype.
  const path = Object.hasOwn(intents, id) ? intents[id] : undefined;
  if (path === undefined) return null;
  const params = [...path.matchAll(PARAM)].map(([, name]) => name);
  if (params.some((name) => payload[name] === undefined)) return null;

  const url = path.replace(PARAM, (_, name: string) =>
    encodeURIComponent(payload[name]),
  );
  const query = Object.entries(payload)
    .filter(([key]) => !params.includes(key))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `${url}?${query}` : url;
};

const PARAM = /\{(\w+)\}/g;
