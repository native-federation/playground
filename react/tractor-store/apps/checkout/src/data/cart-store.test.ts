// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CART_STORAGE_KEY } from './cart-storage';

// The store reads localStorage when the module loads, so every test imports a fresh copy.
const loadStore = async () => {
  vi.resetModules();
  return (await import('./cart-store')).cartStore;
};

describe('cartStore', () => {
  beforeEach(() => localStorage.clear());

  it('starts from what is in localStorage', async () => {
    localStorage.setItem(CART_STORAGE_KEY, 'CL-01-GR_2');
    const cart = await loadStore();
    expect(cart.getLineItems()).toEqual([{ sku: 'CL-01-GR', quantity: 2 }]);
  });

  it('starts empty when localStorage is corrupt', async () => {
    localStorage.setItem(CART_STORAGE_KEY, '|||');
    const cart = await loadStore();
    expect(cart.getLineItems()).toEqual([]);
  });

  it('adds a sku, then raises its quantity, and persists it', async () => {
    const cart = await loadStore();
    cart.add('CL-01-GR');
    cart.add('CL-01-GR');
    expect(cart.getLineItems()).toEqual([{ sku: 'CL-01-GR', quantity: 2 }]);
    expect(localStorage.getItem(CART_STORAGE_KEY)).toBe('CL-01-GR_2');
  });

  it('ignores removing an unknown sku', async () => {
    const cart = await loadStore();
    cart.add('CL-01-GR');
    cart.remove('AU-02-OG');
    expect(cart.getLineItems()).toEqual([{ sku: 'CL-01-GR', quantity: 1 }]);
  });

  it('notifies subscribers and clears', async () => {
    const cart = await loadStore();
    const listener = vi.fn();
    cart.subscribe(listener);
    cart.add('CL-01-GR');
    cart.clear();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(cart.getLineItems()).toEqual([]);
  });

  it('follows changes made in another tab', async () => {
    const cart = await loadStore();
    window.dispatchEvent(
      new StorageEvent('storage', { key: CART_STORAGE_KEY, newValue: 'AU-02-OG_3' }),
    );
    expect(cart.getLineItems()).toEqual([{ sku: 'AU-02-OG', quantity: 3 }]);
  });
});
