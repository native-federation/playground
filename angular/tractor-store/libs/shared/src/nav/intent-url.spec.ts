import { describe, expect, it } from 'vitest';
import { resolveIntentUrl } from './intent-url';

describe('resolveIntentUrl', () => {
  it('joins the base path and intent path', () => {
    expect(resolveIntentUrl({ basePath: 'checkout', path: '/cart' })).toBe(
      '/checkout/cart',
    );
  });

  it('fills path params from the payload', () => {
    expect(
      resolveIntentUrl(
        { basePath: 'decide', path: '/product/{id}' },
        { id: 'CL-01' },
      ),
    ).toBe('/decide/product/CL-01');
  });

  it('turns payload keys that are not path params into the query string', () => {
    expect(
      resolveIntentUrl(
        { basePath: 'decide', path: '/product/{id}' },
        { id: '123', sku: 'BLUE-XL' },
      ),
    ).toBe('/decide/product/123?sku=BLUE-XL');
  });

  it('throws when a path param is missing', () => {
    expect(() =>
      resolveIntentUrl({ basePath: 'decide', path: '/product/{id}' }),
    ).toThrow(/missing required param "\{id\}"/);
  });
});
