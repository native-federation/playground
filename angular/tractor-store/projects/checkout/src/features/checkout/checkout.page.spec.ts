import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CART_STORAGE_KEY, CartStore } from '../../core/data/store/cart-store';
import { provideEnv, LOAD_REMOTE } from '@tractor-store/shared';
import { CheckoutPage } from './checkout.page';
import { installFakeRegistry } from '@tractor-store/shared/testing';

const envFixture = {
  production: false,
  apiUrl: '',
  cdnUrl: '',
};

describe('CheckoutPage', () => {
  let bus: ReturnType<typeof installFakeRegistry>;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
    bus = installFakeRegistry();
  });

  it('creates', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [
        provideRouter([]),
        { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
        provideEnv(envFixture),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.isReady()).toBe(false);
  });

  it('is ready once first name, last name and store id are set', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [
        provideRouter([]),
        { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
        provideEnv(envFixture),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    c.form.patchValue({ firstname: 'Alice', lastname: 'Anderson' });
    expect(c.isReady()).toBe(false);
    bus.emit('store:selected', { id: 'berlin' });
    expect(c.isReady()).toBe(true);
    expect(c.storeId()).toBe('berlin');
  });

  it('clears the cart and emits navigate intent on submit', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2');
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [
        provideRouter([]),
        { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
        provideEnv(envFixture),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutPage);
    fixture.detectChanges();
    const c = fixture.componentInstance;

    const navigated = vi.fn();
    bus.on('nav:navigate', (event) => {
      navigated((event as { data: unknown }).data);
    });

    c.form.patchValue({ firstname: 'A', lastname: 'B' });
    bus.emit('store:selected', { id: 'hamburg' });
    c.onSubmit(new Event('submit'));
    expect(TestBed.inject(CartStore).lineItems()).toEqual([]);
    expect(navigated).toHaveBeenCalledWith({ id: 'checkout.thanks' });
  });
});
