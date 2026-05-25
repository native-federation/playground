import { describe, expect, it } from 'vitest';
import {
  param,
  paramList,
  requiredParam,
  RouteParams,
  sameRouteParams,
} from './route-params';

describe('route-params', () => {
  describe('param', () => {
    it('returns the value when present and string', () => {
      expect(param({ sku: 'CL-01' }, 'sku')).toBe('CL-01');
    });

    it('returns undefined when missing', () => {
      expect(param({}, 'sku')).toBeUndefined();
    });

    it('returns undefined when the value is an array (multi-valued query)', () => {
      const params: RouteParams = { tag: ['a', 'b'] };
      expect(param(params, 'tag')).toBeUndefined();
    });
  });

  describe('requiredParam', () => {
    it('returns the value when present', () => {
      expect(requiredParam({ id: '7' }, 'id')).toBe('7');
    });

    it('throws when missing', () => {
      expect(() => requiredParam({}, 'id')).toThrow(
        /missing required route param "id"/,
      );
    });

    it('throws when the value is an array', () => {
      expect(() => requiredParam({ id: ['1', '2'] }, 'id')).toThrow(
        /missing required route param/,
      );
    });
  });

  describe('paramList', () => {
    it('returns an array as-is', () => {
      expect(paramList({ tag: ['a', 'b'] }, 'tag')).toEqual(['a', 'b']);
    });

    it('wraps a string in a single-element array', () => {
      expect(paramList({ tag: 'a' }, 'tag')).toEqual(['a']);
    });

    it('returns an empty array when missing', () => {
      expect(paramList({}, 'tag')).toEqual([]);
    });
  });

  describe('sameRouteParams', () => {
    it('returns true for identical references', () => {
      const a: RouteParams = { sku: 'X' };
      expect(sameRouteParams(a, a)).toBe(true);
    });

    it('returns true for same scalar params', () => {
      expect(sameRouteParams({ sku: 'X' }, { sku: 'X' })).toBe(true);
    });

    it('returns false for differing scalar values', () => {
      expect(sameRouteParams({ sku: 'X' }, { sku: 'Y' })).toBe(false);
    });

    it('returns false for differing key counts', () => {
      expect(sameRouteParams({ sku: 'X' }, { sku: 'X', tag: 'a' })).toBe(false);
    });

    it('returns true for arrays with the same contents', () => {
      expect(
        sameRouteParams({ tag: ['a', 'b'] }, { tag: ['a', 'b'] }),
      ).toBe(true);
    });

    it('returns false for arrays with different lengths', () => {
      expect(
        sameRouteParams({ tag: ['a'] }, { tag: ['a', 'b'] }),
      ).toBe(false);
    });

    it('returns false for arrays with different ordering', () => {
      expect(
        sameRouteParams({ tag: ['a', 'b'] }, { tag: ['b', 'a'] }),
      ).toBe(false);
    });

    it('returns false when one side is array and the other is string', () => {
      expect(sameRouteParams({ tag: ['a'] }, { tag: 'a' })).toBe(false);
    });

    it('returns true for two empty objects', () => {
      expect(sameRouteParams({}, {})).toBe(true);
    });
  });
});
