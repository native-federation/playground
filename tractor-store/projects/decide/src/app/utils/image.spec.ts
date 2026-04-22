import { beforeEach, describe, expect, it } from 'vitest';
import { setImageServer, src, srcset } from './image';

describe('image utils', () => {
  beforeEach(() => setImageServer(''));

  it('src replaces [size] placeholder', () => {
    expect(src('/cdn/img/product/[size]/AU-03-RD.webp', 400)).toBe(
      '/cdn/img/product/400/AU-03-RD.webp',
    );
  });

  it('srcset builds a comma-separated list with widths', () => {
    const result = srcset('/cdn/img/product/[size]/x.webp', [400, 800]);
    expect(result).toBe(
      '/cdn/img/product/400/x.webp 400w, /cdn/img/product/800/x.webp 800w',
    );
  });

  it('srcset is empty when no sizes given', () => {
    expect(srcset('/cdn/img/product/[size]/x.webp', [])).toBe('');
  });

  it('src prepends the image server when set', () => {
    setImageServer('http://cdn.test');
    expect(src('/cdn/img/product/[size]/x.webp', 200)).toBe(
      'http://cdn.test/cdn/img/product/200/x.webp',
    );
  });
});
