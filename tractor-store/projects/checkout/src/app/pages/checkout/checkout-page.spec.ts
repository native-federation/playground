import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {
  CART_STORAGE_KEY,
  CartService,
} from '../../services/cart.service';
import { CheckoutPage } from './checkout-page';

describe('CheckoutPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('creates', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.isReady()).toBe(false);
  });

  it('is ready once first name, last name and store id are set', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    c.form.patchValue({ firstname: 'Alice', lastname: 'Anderson' });
    expect(c.isReady()).toBe(false);
    c.onStoreSelected(
      new CustomEvent('store-selected', { detail: { id: 'berlin' } }),
    );
    expect(c.isReady()).toBe(true);
    expect(c.storeId()).toBe('berlin');
  });

  it('clears the cart and navigates on submit', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2');
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const nav = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    c.form.patchValue({ firstname: 'A', lastname: 'B' });
    c.onStoreSelected(
      new CustomEvent('store-selected', { detail: { id: 'hamburg' } }),
    );
    c.onSubmit(new Event('submit'));
    expect(TestBed.inject(CartService).lineItems()).toEqual([]);
    expect(nav).toHaveBeenCalledWith('/checkout/thanks');
  });
});
