import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { storeSelected } from './store-event-bus';

type Handler = (event: { data: unknown; timestamp: number }) => void;

const fakeRegistry = () => {
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
  };
};

describe('storeSelected channel', () => {
  let original: unknown;

  beforeEach(() => {
    original = (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__;
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      fakeRegistry();
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      original as never;
  });

  it('emit forwards the payload to subscribers', () => {
    const seen = vi.fn();
    storeSelected.on(seen);
    storeSelected.emit({ id: 'berlin' });
    expect(seen).toHaveBeenCalledWith({ id: 'berlin' });
  });

  it('on returns an unsubscribe', () => {
    const seen = vi.fn();
    const off = storeSelected.on(seen);
    off();
    storeSelected.emit({ id: 'berlin' });
    expect(seen).not.toHaveBeenCalled();
  });
});
