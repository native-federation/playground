import { describe, expect, it } from 'vitest';
import {
  joinPath,
  resolveTemplate,
  splitIntentParams,
  toRoutePath,
} from './path-template';

describe('path-template', () => {
  describe('joinPath', () => {
    it('joins a base and intent path with a single slash', () => {
      expect(joinPath('explore', 'products')).toBe('/explore/products');
    });

    it('trims leading and trailing slashes on both segments', () => {
      expect(joinPath('/explore/', '/products/')).toBe('/explore/products');
    });

    it('treats an empty base as root', () => {
      expect(joinPath('', 'products')).toBe('/products');
    });

    it('returns just the base when the intent path is empty', () => {
      expect(joinPath('explore', '')).toBe('/explore');
    });

    it('returns "/" when both segments are empty', () => {
      expect(joinPath('', '')).toBe('/');
    });

    it('returns "/" when both segments contain only slashes', () => {
      expect(joinPath('/', '/')).toBe('/');
    });
  });

  describe('toRoutePath', () => {
    it('returns a path without a leading slash for the Angular router', () => {
      expect(toRoutePath('explore', 'products')).toBe('explore/products');
    });

    it('returns an empty string for the root', () => {
      expect(toRoutePath('', '')).toBe('');
    });

    it('keeps :param placeholders intact', () => {
      expect(toRoutePath('decide', '/product/:id')).toBe('decide/product/:id');
    });
  });

  describe('splitIntentParams', () => {
    it('extracts param names from :param segments', () => {
      expect(splitIntentParams('/product/:id')).toEqual(['id']);
    });

    it('returns multiple param names in order', () => {
      expect(splitIntentParams('/:org/:repo/issues/:num')).toEqual([
        'org',
        'repo',
        'num',
      ]);
    });

    it('returns an empty list for a static path', () => {
      expect(splitIntentParams('/products')).toEqual([]);
    });

    it('ignores segments that look like params but include extra chars', () => {
      expect(splitIntentParams('/:id-suffix')).toEqual([]);
    });
  });

  describe('resolveTemplate', () => {
    it('substitutes :param segments with payload values', () => {
      expect(resolveTemplate('/product/:id', { id: 'CL-01' })).toBe(
        '/product/CL-01',
      );
    });

    it('URL-encodes substituted values', () => {
      expect(resolveTemplate('/q/:term', { term: 'a b&c' })).toBe(
        '/q/a%20b%26c',
      );
    });

    it('leaves static segments untouched', () => {
      expect(resolveTemplate('/static/path', {})).toBe('/static/path');
    });

    it('throws a descriptive error when a required param is missing', () => {
      expect(() => resolveTemplate('/product/:id', {})).toThrow(
        /missing required param ":id" for path "\/product\/:id"/,
      );
    });

    it('handles multiple params', () => {
      expect(
        resolveTemplate('/:org/:repo', { org: 'a', repo: 'b' }),
      ).toBe('/a/b');
    });
  });
});
