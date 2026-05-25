import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CART_STORAGE_KEY } from './cart-bus';
import { CartStore } from './cart-store';

const CART_UPDATED = 'cart:updated';

type Listener = (event: { data: unknown; timestamp: number }) => void;

const fakeBus = () => {
  const listeners = new Map<string, Listener[]>();
  return {
    on: (type: string, cb: Listener) => {
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      return () => {
        const next = (listeners.get(type) ?? []).filter((h) => h !== cb);
        listeners.set(type, next);
      };
    },
    onReady: () => () => {},
    emit: (type: string, data: unknown) => {
      for (const cb of listeners.get(type) ?? [])
        cb({ data, timestamp: Date.now() });
    },
    register: async () => {},
    clear: () => listeners.clear(),
  };
};

describe('CartStore', () => {
  let original: unknown;
  let bus: ReturnType<typeof fakeBus>;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
    bus = fakeBus();
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      original;
  });

  function create(): CartStore {
    return TestBed.inject(CartStore);
  }

  it('reads an empty cart when storage is empty', () => {
    const store = create();
    expect(store.lineItems()).toEqual([]);
    expect(store.totalQuantity()).toBe(0);
  });

  it('reads an existing cart from localStorage on init', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2|CL-01-GR_1');
    const store = create();
    expect(store.lineItems()).toEqual([
      { sku: 'AU-03-RD', quantity: 2 },
      { sku: 'CL-01-GR', quantity: 1 },
    ]);
    expect(store.totalQuantity()).toBe(3);
  });

  it('adds a new item and persists', () => {
    const store = create();
    store.add('AU-03-RD');
    expect(store.lineItems()).toEqual([{ sku: 'AU-03-RD', quantity: 1 }]);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('AU-03-RD_1');
  });

  it('increments the quantity of an existing item', () => {
    const store = create();
    store.add('AU-03-RD');
    store.add('AU-03-RD');
    expect(store.lineItems()).toEqual([{ sku: 'AU-03-RD', quantity: 2 }]);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('AU-03-RD_2');
  });

  it('removes an item', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2|CL-01-GR_1');
    const store = create();
    store.remove('AU-03-RD');
    expect(store.lineItems()).toEqual([{ sku: 'CL-01-GR', quantity: 1 }]);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('CL-01-GR_1');
  });

  it('clears the cart', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2');
    const store = create();
    store.clear();
    expect(store.lineItems()).toEqual([]);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('');
  });

  it('emits an update on the NF registry when writing', () => {
    const store = create();
    const spy = vi.fn();
    bus.on(CART_UPDATED, (event) => spy(event.data));
    store.add('AU-03-RD');
    expect(spy).toHaveBeenCalledWith({
      items: [{ sku: 'AU-03-RD', quantity: 1 }],
    });
  });

  it('syncs from a registry update emitted by a peer MFE', () => {
    const store = create();
    bus.emit(CART_UPDATED, {
      items: [{ sku: 'AU-05-ZH', quantity: 3 }],
    });
    expect(store.lineItems()).toEqual([{ sku: 'AU-05-ZH', quantity: 3 }]);
  });

  it('syncs from a storage event fired by another tab via the bridge', () => {
    const store = create();
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: CART_STORAGE_KEY,
        newValue: 'AU-05-ZH_3',
      }),
    );
    expect(store.lineItems()).toEqual([{ sku: 'AU-05-ZH', quantity: 3 }]);
  });
});
