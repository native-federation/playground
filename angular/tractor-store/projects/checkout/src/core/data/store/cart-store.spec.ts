import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CART_STORAGE_KEY } from './cart-bus';
import { CartStore } from './cart-store';
import { installFakeRegistry } from '@tractor-store/shared/testing';

const CART_UPDATED = 'cart:updated';

describe('CartStore', () => {
  let bus: ReturnType<typeof installFakeRegistry>;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
    bus = installFakeRegistry();
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

  it('syncs from a storage event fired by another tab', () => {
    const store = create();
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: CART_STORAGE_KEY,
        newValue: 'AU-05-ZH_3',
      }),
    );
    expect(store.lineItems()).toEqual([{ sku: 'AU-05-ZH', quantity: 3 }]);
  });

  it('ignores storage events for other keys', () => {
    const store = create();
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'other', newValue: 'AU-05-ZH_3' }),
    );
    expect(store.lineItems()).toEqual([]);
  });

  it('does not mutate the previous line items when adding', () => {
    const store = create();
    store.add('AU-05-ZH');
    const before = store.lineItems();
    const firstItem = before[0];
    store.add('AU-05-ZH');
    expect(firstItem.quantity).toBe(1);
    expect(store.lineItems()).not.toBe(before);
    expect(store.lineItems()[0].quantity).toBe(2);
  });
});
