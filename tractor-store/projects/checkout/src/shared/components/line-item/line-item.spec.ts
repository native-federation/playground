import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective } from '@internal/events';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CART_STORAGE_KEY,
  CartStore,
} from '../../../core/data/store/cart-store';
import { ENV } from '../../../env.config';
import { testEnv } from '../../../testing/env.fixture';
import { LineItemComponent, LineItemView } from './line-item';

const itemFixture: LineItemView = {
  id: 'AU-03',
  sku: 'AU-03-RD',
  name: 'FutureHarvest Navigator Scarlet Dynamo',
  image: '/cdn/img/product/[size]/AU-03-RD.webp',
  quantity: 2,
  total: 3800,
};

describe('LineItemComponent', () => {
  beforeEach(async () => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [LineItemComponent],
      providers: [provideRouter([]), { provide: ENV, useValue: testEnv }],
    }).compileComponents();
  });

  function create(item: LineItemView = itemFixture) {
    const fixture = TestBed.createComponent(LineItemComponent);
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    return fixture;
  }

  describe('derived signals', () => {
    it('exposes link params from the item id and sku', () => {
      expect(create().componentInstance.linkParams()).toEqual({
        id: 'AU-03',
        sku: 'AU-03-RD',
      });
    });

    it('builds a cdn-prefixed 200w small src from the [size] placeholder', () => {
      expect(create().componentInstance.smallSrc()).toBe(
        'http://cdn.test/cdn/img/product/200/AU-03-RD.webp',
      );
    });

    it('builds a srcset with 200w and 400w descriptors', () => {
      expect(create().componentInstance.srcset()).toBe(
        'http://cdn.test/cdn/img/product/200/AU-03-RD.webp 200w, ' +
          'http://cdn.test/cdn/img/product/400/AU-03-RD.webp 400w',
      );
    });
  });

  describe('template rendering', () => {
    it('renders the variant name, sku, quantity and total', () => {
      const el: HTMLElement = create().nativeElement;
      expect(el.querySelector('.c_LineItem__name')?.textContent).toContain(
        'FutureHarvest Navigator Scarlet Dynamo',
      );
      expect(el.querySelector('.c_LineItem__name')?.textContent).toContain(
        'AU-03-RD',
      );
      expect(el.querySelector('.c_LineItem__quantity span')?.textContent).toBe(
        '2',
      );
      expect(el.querySelector('.c_LineItem__price')?.textContent).toContain(
        '3800',
      );
    });

    it('renders the product image with src, srcset and alt', () => {
      const img = create().nativeElement.querySelector(
        'img',
      ) as HTMLImageElement;
      expect(img.getAttribute('src')).toBe(
        'http://cdn.test/cdn/img/product/200/AU-03-RD.webp',
      );
      expect(img.getAttribute('srcset')).toContain('200w');
      expect(img.getAttribute('srcset')).toContain('400w');
      expect(img.getAttribute('alt')).toBe(
        'FutureHarvest Navigator Scarlet Dynamo',
      );
    });

    it('passes the navigation intent and {id, sku} params to NavigateToDirective', () => {
      const fixture = create();
      const dir = fixture.debugElement
        .query(By.directive(NavigateToDirective))
        .injector.get(NavigateToDirective);
      expect(dir.navigateTo()).toBe('decide.product');
      expect(dir.navParams()).toEqual({ id: 'AU-03', sku: 'AU-03-RD' });
    });

    it('marks the host with the listitem role', () => {
      const host: HTMLElement = create().nativeElement;
      expect(host.getAttribute('role')).toBe('listitem');
    });
  });

  describe('remove flow', () => {
    it('removes the sku from the cart store and emits removed', () => {
      window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2|CL-01-GR_1');
      const fixture = create();
      const cart = TestBed.inject(CartStore);
      const emitted = vi.fn();
      fixture.componentInstance.removed.subscribe(emitted);

      fixture.componentInstance.onRemove(new Event('submit'));

      expect(cart.lineItems()).toEqual([{ sku: 'CL-01-GR', quantity: 1 }]);
      expect(emitted).toHaveBeenCalledWith('AU-03-RD');
    });

    it('prevents the default form submission', () => {
      const fixture = create();
      const event = new Event('submit', { cancelable: true });
      fixture.componentInstance.onRemove(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('reflects an updated item input', () => {
      const fixture = create();
      fixture.componentRef.setInput('item', {
        ...itemFixture,
        sku: 'CL-01-GR',
        id: 'CL-01',
        name: 'Heritage Workhorse Verdant Field',
        image: '/cdn/img/product/[size]/CL-01-GR.webp',
        quantity: 1,
        total: 5700,
      } satisfies LineItemView);
      fixture.detectChanges();

      expect(fixture.componentInstance.linkParams()).toEqual({
        id: 'CL-01',
        sku: 'CL-01-GR',
      });
      expect(
        (fixture.nativeElement.querySelector('img') as HTMLImageElement)
          .getAttribute('src'),
      ).toBe('http://cdn.test/cdn/img/product/200/CL-01-GR.webp');
    });
  });
});
