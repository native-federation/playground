import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CART_STORAGE_KEY, cartUpdated } from './cart-bus';

type Handler = (event: { data: unknown; timestamp: number }) => void;

const fakeBus = () => {
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

describe('cartUpdated channel', () => {
  let original: unknown;

  beforeEach(() => {
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      fakeBus();
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__?: unknown }).__NF_REGISTRY__ =
      original as never;
  });

  it('emit forwards the payload to subscribers', () => {
    const seen = vi.fn();
    cartUpdated.on(seen);
    cartUpdated.emit({ items: [{ sku: 'AU-03-RD', quantity: 1 }] });
    expect(seen).toHaveBeenCalledWith({
      items: [{ sku: 'AU-03-RD', quantity: 1 }],
    });
  });

  it('on returns an unsubscribe', () => {
    const seen = vi.fn();
    const off = cartUpdated.on(seen);
    off();
    cartUpdated.emit({ items: [] });
    expect(seen).not.toHaveBeenCalled();
  });

  it('bridges cross-tab storage events into the channel', () => {
    const seen = vi.fn();
    cartUpdated.on(seen);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: CART_STORAGE_KEY,
        newValue: 'AU-05-ZH_3|CL-01-GR_1',
      }),
    );
    expect(seen).toHaveBeenCalledWith({
      items: [
        { sku: 'AU-05-ZH', quantity: 3 },
        { sku: 'CL-01-GR', quantity: 1 },
      ],
    });
  });

  it('ignores storage events for unrelated keys', () => {
    const seen = vi.fn();
    cartUpdated.on(seen);
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'some-other-key',
        newValue: 'whatever',
      }),
    );
    expect(seen).not.toHaveBeenCalled();
  });
});
