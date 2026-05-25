import {
  navIntents,
  type NavIntentEntry,
  type NavIntentMap,
} from '@react-internal/event-bus';
import {
  joinPath,
  resolveTemplate,
  type NavPayload,
} from '@react-internal/url';

const EMPTY_MAP: NavIntentMap = new Map();

let currentMap: NavIntentMap = EMPTY_MAP;
const listeners = new Set<() => void>();

// The host broadcasts the registry's intent map on `nav:intents` once
// shell navigation is wired up. The bus replays buffered events to late
// subscribers (NFEventRegistry buffers per-stream), so remote MFEs that
// import this module after the broadcast still receive the snapshot — the
// microtask delivery just means the first render sees the empty map and a
// follow-up render publishes the real hrefs.
navIntents.on((map) => {
  currentMap = map;
  for (const listener of listeners) listener();
});

export const subscribeNavIntents = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getNavIntents = (): NavIntentMap => currentMap;

export const getNavIntent = (intent: string): NavIntentEntry | undefined =>
  currentMap.get(intent);

export const resolveIntent = (
  intent: string,
  params?: NavPayload,
): string | undefined => {
  const entry = currentMap.get(intent);
  if (!entry) return undefined;
  try {
    return joinPath(entry.basePath, resolveTemplate(entry.path, params ?? {}));
  } catch {
    return undefined;
  }
};

/**
 * Like `resolveIntent` but throws the underlying `resolveTemplate` error when
 * the intent is known but a required `{param}` is missing. Returns `undefined`
 * only when the intent itself isn't in the map. Intended for call sites that
 * want to surface "you forgot a param" failures (e.g. a click handler).
 */
export const tryResolveIntent = (
  intent: string,
  params?: NavPayload,
): string | undefined => {
  const entry = currentMap.get(intent);
  if (!entry) return undefined;
  return joinPath(entry.basePath, resolveTemplate(entry.path, params ?? {}));
};
