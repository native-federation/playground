import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { CART_STORAGE_KEY } from '../../data/cart-storage';
import { VariantService } from '../../data/variant.service';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { testEnv } from '../../testing/env.fixture';
import { variantFixture } from '../../testing/variant.fixture';
import { fakeVariantService } from '../../testing/variant-service.stub';
import { CartPage } from './cart.page';

const [scarlet, verdant] = variantFixture;

describe('CartPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        { provide: VariantService, useFactory: fakeVariantService },
        { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  function render() {
    const fixture = TestBed.createComponent(CartPage);
    fixture.detectChanges();
    return (fixture.nativeElement as HTMLElement).shadowRoot!;
  }

  it('renders an empty basket', () => {
    const root = render();
    expect(root.querySelectorAll('app-line-item')).toHaveLength(0);
    expect(root.querySelector('.c_CartPage__total')?.textContent).toBe(
      'Total: 0,00 Ø',
    );
  });

  it('renders a line item per cart entry and the total', () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      `${scarlet.sku}_2|${verdant.sku}_1`,
    );
    const root = render();
    expect(root.querySelectorAll('app-line-item')).toHaveLength(2);
    expect(root.querySelector('.c_CartPage__total')?.textContent).toBe(
      `Total: ${scarlet.price * 2 + verdant.price},00 Ø`,
    );
  });

  it('skips skus that are not in the catalog', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, `${scarlet.sku}_1|NOPE_1`);
    expect(render().querySelectorAll('app-line-item')).toHaveLength(1);
  });

  it('passes the cart skus to the recommendations', () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      `${scarlet.sku}_2|${verdant.sku}_1`,
    );
    const recommendations = render().querySelector('mfe-recommendations')!;
    expect(recommendations.getAttribute('skus')).toBe(
      `${scarlet.sku},${verdant.sku}`,
    );
  });
});
