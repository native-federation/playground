import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { navigateTo, NavigatePayload } from './nav-event-bus';

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

describe('navigateTo channel', () => {
  let original: unknown;

  beforeEach(() => {
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      fakeRegistry();
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      original as never;
  });

  it('emits a payload with id and params to subscribers', () => {
    const seen = vi.fn();
    navigateTo.on(seen);

    const payload: NavigatePayload = {
      id: 'decide.product',
      payload: { id: 'CL-01' },
    };
    navigateTo.emit(payload);

    expect(seen).toHaveBeenCalledWith(payload);
  });

  it('on returns an unsubscribe', () => {
    const seen = vi.fn();
    const off = navigateTo.on(seen);
    off();
    navigateTo.emit({ id: 'explore.home' });
    expect(seen).not.toHaveBeenCalled();
  });
});
