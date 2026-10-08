import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cartUpdated, parseCart, serializeCart } from './cart-bus';
import { installFakeRegistry } from '@tractor-store/shared/testing';

describe('cartUpdated channel', () => {
  beforeEach(() => {
    installFakeRegistry();
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

  it('round-trips line items through the storage format', () => {
    const items = [
      { sku: 'AU-05-ZH', quantity: 3 },
      { sku: 'CL-01-GR', quantity: 1 },
    ];
    expect(serializeCart(items)).toBe('AU-05-ZH_3|CL-01-GR_1');
    expect(parseCart(serializeCart(items))).toEqual(items);
  });

  it('drops malformed and empty entries when parsing', () => {
    expect(parseCart('AU-05-ZH_0||_2|CL-01-GR_x|AU-07-MT_1')).toEqual([
      { sku: 'AU-07-MT', quantity: 1 },
    ]);
  });
});
