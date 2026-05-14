import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CART_STORAGE_KEY,
  CartStore,
} from '../../core/data/store/cart-store';
import { ENV } from '../../env.config';
import { LOADER } from '../../core/remote-loader';
import { CheckoutPage } from './checkout.page';

const envFixture = {
  production: false,
  apiUrl: '',
  scope: 'checkout',
  cdnUrl: '',
};

type Listener = (data: unknown) => void;

const fakeBus = () => {
  const listeners = new Map<string, Listener[]>();
  return {
    on: (type: string, cb: Listener) => {
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      return () => {
        const next = (listeners.get(type) ?? []).filter((h) => h !== cb);
        listeners.set(type, next);
      };
    },
    onReady: () => () => {},
    emit: (type: string, data: unknown) => {
      for (const cb of listeners.get(type) ?? [])
        cb({ data, timestamp: Date.now() });
    },
    register: async () => {},
    clear: () => listeners.clear(),
  };
};

describe('CheckoutPage', () => {
  let original: unknown;
  let bus: ReturnType<typeof fakeBus>;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
    bus = fakeBus();
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ = bus;
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      original;
  });

  it('creates', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [
        provideRouter([]),
        { provide: LOADER, useValue: () => Promise.resolve() },
        { provide: ENV, useValue: envFixture },
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
        { provide: LOADER, useValue: () => Promise.resolve() },
        { provide: ENV, useValue: envFixture },
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
        { provide: LOADER, useValue: () => Promise.resolve() },
        { provide: ENV, useValue: envFixture },
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
