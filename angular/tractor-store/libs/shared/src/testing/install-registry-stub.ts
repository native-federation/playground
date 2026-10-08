import type { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

type Entry = { data: unknown; timestamp: number };
type Handler = (event: Entry) => void;

// In-memory stand-in for the orchestrator's registry: event streams with replay
// (delivered in a microtask, like the real one) and latched resources.
export const createFakeRegistry = (): NFEventRegistry => {
  const listeners = new Map<string, Handler[]>();
  const history = new Map<string, Entry[]>();
  const resources = new Map<string, unknown>();
  const waiting = new Map<string, ((value: unknown) => void)[]>();

  const append = (type: string, entry: Entry) => {
    history.set(type, [...(history.get(type) ?? []), entry]);
    for (const cb of listeners.get(type) ?? []) cb(entry);
  };

  return {
    on: (type: string, cb: Handler, opts: { replay?: number } = {}) => {
      const replay = opts.replay ?? 1;
      listeners.set(type, [...(listeners.get(type) ?? []), cb]);
      const past = (history.get(type) ?? []).slice(-replay);
      if (replay > 0 && past.length > 0) {
        queueMicrotask(() => past.forEach(cb));
      }
      return () =>
        listeners.set(
          type,
          (listeners.get(type) ?? []).filter((h) => h !== cb),
        );
    },
    emit: (type: string, data: unknown) => {
      append(type, { data, timestamp: Date.now() });
    },
    update: (type: string, fn: (last: unknown) => unknown) => {
      const last = history.get(type)?.at(-1)?.data;
      append(type, { data: fn(last), timestamp: Date.now() });
    },
    register: async (type: string, value: unknown) => {
      resources.set(type, value);
      for (const cb of waiting.get(type) ?? []) cb(value);
      waiting.delete(type);
    },
    onReady: (type: string, cb: (value: unknown) => void) => {
      if (resources.has(type)) {
        cb(resources.get(type));
        return () => {};
      }
      waiting.set(type, [...(waiting.get(type) ?? []), cb]);
      return () =>
        waiting.set(
          type,
          (waiting.get(type) ?? []).filter((h) => h !== cb),
        );
    },
    clear: () => {
      listeners.clear();
      history.clear();
      resources.clear();
      waiting.clear();
    },
  } as unknown as NFEventRegistry;
};

// Replaces window.__NF_REGISTRY__ with a fresh fake; call it in beforeEach.
export const installFakeRegistry = (): NFEventRegistry => {
  const registry = createFakeRegistry();
  (window as unknown as { __NF_REGISTRY__: NFEventRegistry }).__NF_REGISTRY__ =
    registry;
  return registry;
};

// Loaded through the test builder's `setupFiles`, so every spec starts with a bus.
installFakeRegistry();
