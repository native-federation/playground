import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CartStore } from '../../data/cart-store';
import { VariantService } from '../../data/variant.service';
import { variantFixture } from '../../testing/variant.fixture';
import { fakeVariantService } from '../../testing/variant-service.stub';
import { AddToCartComponent } from './add-to-cart.component';

const inStock = variantFixture.find((v) => v.inventory > 0)!;
const soldOut = variantFixture.find((v) => v.inventory === 0)!;

describe('AddToCartComponent', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: VariantService, useFactory: fakeVariantService }],
    });
  });

  function create(sku?: string) {
    const fixture = TestBed.createComponent(AddToCartComponent);
    if (sku !== undefined) fixture.componentRef.setInput('sku', sku);
    fixture.detectChanges();
    const root = (fixture.nativeElement as HTMLElement).shadowRoot!;
    return { fixture, root };
  }

  it('renders nothing until a sku arrives', () => {
    const { fixture, root } = create();
    expect(root.querySelector('.c_AddToCart')).toBeNull();
    fixture.componentRef.setInput('sku', inStock.sku);
    fixture.detectChanges();
    expect(root.querySelector('.c_AddToCart')).not.toBeNull();
  });

  it('shows price and stock for a known sku', () => {
    const { root } = create(inStock.sku);
    expect(root.textContent).toContain(`${inStock.price},00 Ø`);
    expect(root.textContent).toContain(`${inStock.inventory} in stock`);
    expect(root.querySelector('button')!.disabled).toBe(false);
  });

  it('disables the button when out of stock', () => {
    const { root } = create(soldOut.sku);
    expect(root.textContent).toContain('out of stock');
    expect(root.querySelector('button')!.disabled).toBe(true);
  });

  it('adds the sku to the cart and confirms on click', () => {
    const { fixture, root } = create(inStock.sku);
    const confirmation = root.querySelector('.c_AddToCart__confirmed')!;
    expect(confirmation.classList).toContain('c_AddToCart__confirmed--hidden');

    root.querySelector('button')!.click();
    fixture.detectChanges();

    expect(TestBed.inject(CartStore).lineItems()).toEqual([
      { sku: inStock.sku, quantity: 1 },
    ]);
    expect(confirmation.classList).not.toContain(
      'c_AddToCart__confirmed--hidden',
    );
  });
});
