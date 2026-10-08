import { describe, expect, it } from 'vitest';
import { parseCart, serializeCart } from './cart-storage';

describe('cart storage format', () => {
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
