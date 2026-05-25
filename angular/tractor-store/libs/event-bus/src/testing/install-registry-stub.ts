import type { NFEventRegistry } from '@softarc/native-federation-orchestrator/registry';

type Handler = (event: { data: unknown; timestamp: number }) => void;

const fakeRegistry = (): NFEventRegistry => {
  const listeners = new Map<string, Handler[]>();
  return {
    on: (type: string, cb: Handler) => {
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      return () => {
        const next = (listeners.get(type) ?? []).filter((h) => h !== cb);
        listeners.set(type, next);
      };
    },
    emit: (type: string, data: unknown) => {
      for (const cb of listeners.get(type) ?? [])
        cb({ data, timestamp: Date.now() });
    },
    onReady: () => () => {},
    register: async () => {},
  } as unknown as NFEventRegistry;
};

// Mirrors what the host installs synchronously at bootstrap, so modules that
// call defineChannel() at top level have a registry to bind against. Specs
// can still swap in their own fake via beforeEach.
(window as unknown as { __NF_REGISTRY__: NFEventRegistry }).__NF_REGISTRY__ =
  fakeRegistry();
