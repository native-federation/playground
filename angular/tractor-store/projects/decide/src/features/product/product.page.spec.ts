import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductHttp } from '../../core/data/http/product-http';
import { LOAD_REMOTE, provideEnv } from '@tractor-store/shared';
import { testEnv } from '../../testing/env.fixture';
import { fakeProductHttp } from '../../testing/product-http.stub';
import { ProductPage } from './product.page';

describe('ProductPage', () => {
  let loader: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loader = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [ProductPage],
      providers: [
        provideRouter([]),
        { provide: ProductHttp, useValue: fakeProductHttp() },
        { provide: LOAD_REMOTE, useValue: loader },
        provideEnv(testEnv),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  function create(routeParams: Record<string, string> = {}) {
    const fixture = TestBed.createComponent(ProductPage);
    fixture.componentRef.setInput('routeParams', routeParams);
    fixture.detectChanges();
    return fixture;
  }

  describe('product resolution', () => {
    it('resolves a product by the id route param', () => {
      const cmp = create({ id: 'CL-01' }).componentInstance;
      expect(cmp.product()?.name).toBe('Heritage Workhorse');
      expect(cmp.id()).toBe('CL-01');
    });

    it('returns undefined when no id is provided', () => {
      const cmp = create().componentInstance;
      expect(cmp.product()).toBeUndefined();
    });

    it('returns undefined when the id does not match any product', () => {
      const cmp = create({ id: 'unknown' }).componentInstance;
      expect(cmp.product()).toBeUndefined();
    });
  });

  describe('variant selection', () => {
    it('selects the variant matching the sku param', () => {
      const cmp = create({ id: 'CL-01', sku: 'CL-01-GY' }).componentInstance;
      expect(cmp.selectedVariant()?.sku).toBe('CL-01-GY');
      expect(cmp.selectedSku()).toBe('CL-01-GY');
    });

    it('falls back to the first variant when the sku param is missing', () => {
      const cmp = create({ id: 'CL-01' }).componentInstance;
      expect(cmp.selectedSku()).toBe('CL-01-GR');
    });

    it('falls back to the first variant when the sku param does not match', () => {
      const cmp = create({ id: 'CL-01', sku: 'nonexistent' }).componentInstance;
      expect(cmp.selectedSku()).toBe('CL-01-GR');
    });

    it('selectedVariant is undefined when there are no variants to choose from', () => {
      const cmp = create().componentInstance;
      expect(cmp.selectedVariant()).toBeUndefined();
      expect(cmp.selectedSku()).toBe('');
    });

    it('isSelected returns true only for the active variant', () => {
      const cmp = create({ id: 'CL-01', sku: 'CL-01-GY' }).componentInstance;
      expect(cmp.isSelected('CL-01-GY')).toBe(true);
      expect(cmp.isSelected('CL-01-GR')).toBe(false);
      expect(cmp.isSelected('unknown')).toBe(false);
    });
  });

  describe('derived view data', () => {
    it('exposes the product variants', () => {
      const cmp = create({ id: 'CL-01' }).componentInstance;
      expect(cmp.variants().map((v) => v.sku)).toEqual([
        'CL-01-GR',
        'CL-01-GY',
      ]);
    });

    it('exposes an empty variants list when no product is resolved', () => {
      expect(create().componentInstance.variants()).toEqual([]);
    });

    it('exposes the product highlights', () => {
      expect(create({ id: 'CL-01' }).componentInstance.highlights()).toEqual([
        'Reliable',
        'Built to last',
      ]);
    });

    it('exposes an empty highlights list when no product is resolved', () => {
      expect(create().componentInstance.highlights()).toEqual([]);
    });

    it('composes alt text from product name and variant name', () => {
      const cmp = create({ id: 'CL-01', sku: 'CL-01-GY' }).componentInstance;
      expect(cmp.productAlt()).toBe('Heritage Workhorse - Stormy Sky');
    });

    it('returns empty alt text when no product is resolved', () => {
      expect(create().componentInstance.productAlt()).toBe('');
    });
  });

  describe('template rendering', () => {
    it('renders the product details when a product is found', () => {
      const el: ShadowRoot = (
        create({ id: 'CL-01' }).nativeElement as HTMLElement
      ).shadowRoot!;
      expect(el.querySelector('.d_ProductPage__title')?.textContent).toContain(
        'Heritage Workhorse',
      );
      const items = Array.from(
        el.querySelectorAll('.d_ProductPage__highlights li'),
      ).map((li) => li.textContent?.trim());
      expect(items).toEqual(['Reliable', 'Built to last']);
    });

    it('renders one variant option per product variant', () => {
      const el: ShadowRoot = (
        create({ id: 'CL-01' }).nativeElement as HTMLElement
      ).shadowRoot!;
      expect(el.querySelectorAll('app-variant-option').length).toBe(2);
    });

    it('binds the selected sku onto mfe-add-to-cart and mfe-recommendations', () => {
      const el: ShadowRoot = (
        create({
          id: 'CL-01',
          sku: 'CL-01-GY',
        }).nativeElement as HTMLElement
      ).shadowRoot!;
      expect(el.querySelector('mfe-add-to-cart')?.getAttribute('sku')).toBe(
        'CL-01-GY',
      );
      expect(
        el.querySelector('mfe-recommendations')?.getAttribute('skus'),
      ).toBe('CL-01-GY');
    });

    it('renders the product image with the composed src, srcset and alt', () => {
      const img = (
        create({ id: 'CL-01' }).nativeElement as HTMLElement
      ).shadowRoot!.querySelector('img') as HTMLImageElement;
      expect(img.getAttribute('src')).toBe(
        'http://cdn.test/cdn/img/product/400/CL-01-GR.webp',
      );
      expect(img.getAttribute('srcset')).toContain('400w');
      expect(img.getAttribute('srcset')).toContain('800w');
      expect(img.getAttribute('alt')).toBe(
        'Heritage Workhorse - Verdant Field',
      );
    });

    it('renders the "not found" fallback when no id is provided', () => {
      const el: ShadowRoot = (create().nativeElement as HTMLElement)
        .shadowRoot!;
      expect(el.textContent).toContain('Product not found');
      expect(el.querySelector('.d_ProductPage__details')).toBeFalsy();
    });

    it('renders the "not found" fallback when the id does not match', () => {
      const el: ShadowRoot = (
        create({ id: 'NOPE' }).nativeElement as HTMLElement
      ).shadowRoot!;
      expect(el.textContent).toContain('Product not found');
    });
  });

  describe('host metadata', () => {
    it('marks the page with the decide page boundary attribute', () => {
      const fixture = create({ id: 'CL-01' });
      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-boundary-page')).toBe('decide');
    });
  });

  describe('cross-team elements', () => {
    it('loads the explore header, footer, recommendations and the checkout add-to-cart', () => {
      create({ id: 'CL-01' });
      const calls = loader.mock.calls.map(([remote, element]) => [remote, element]);
      expect(calls).toHaveLength(4);
      expect(calls).toEqual(
        expect.arrayContaining([
          ['@tractor-store/explore', 'mfe-header'],
          ['@tractor-store/explore', 'mfe-footer'],
          ['@tractor-store/explore', 'mfe-recommendations'],
          ['@tractor-store/checkout', 'mfe-add-to-cart'],
        ]),
      );
    });
  });
});
