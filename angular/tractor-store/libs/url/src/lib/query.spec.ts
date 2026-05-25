import { describe, expect, it } from 'vitest';
import { appendQueryString } from './query';

describe('appendQueryString', () => {
  it('returns the path unchanged when there are no params', () => {
    expect(appendQueryString('/explore/products', {})).toBe('/explore/products');
  });

  it('appends a single param', () => {
    expect(appendQueryString('/p', { sku: 'CL-01' })).toBe('/p?sku=CL-01');
  });

  it('appends multiple params with & separators', () => {
    expect(appendQueryString('/p', { a: '1', b: '2' })).toBe('/p?a=1&b=2');
  });

  it('encodes both keys and values', () => {
    expect(appendQueryString('/p', { 'a b': 'c d' })).toBe('/p?a%20b=c%20d');
  });

  it('encodes characters that have meaning in URLs', () => {
    expect(appendQueryString('/p', { q: 'a&b=c' })).toBe('/p?q=a%26b%3Dc');
  });
});
