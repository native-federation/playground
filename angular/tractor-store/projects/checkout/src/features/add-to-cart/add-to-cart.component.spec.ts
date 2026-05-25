import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { VariantHttp } from '../../core/data/http/variant-http';
import { CartStore } from '../../core/data/store/cart-store';
import { fakeVariantHttp } from '../../testing/variant-http.stub';
import { AddToCartComponent } from './add-to-cart.component';

type Listener = (data: unknown) => void;

const fakeBus = () => {
  const listeners = new Map<string, Listener[]>();
  return {
    on: (type: string, cb: Listener) => {
      const arr = listeners.get(type) ?? [];
      arr.push(cb);
      listeners.set(type, arr);
      return () => {};
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

describe('AddToCartComponent', () => {
  let original: unknown;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
    original = (window as unknown as { __NF_REGISTRY__?: unknown })
      .__NF_REGISTRY__;
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      fakeBus();
  });

  afterEach(() => {
    (window as unknown as { __NF_REGISTRY__: unknown }).__NF_REGISTRY__ =
      original;
  });

  async function create(sku: string) {
    await TestBed.configureTestingModule({
      imports: [AddToCartComponent],
      providers: [
        provideRouter([]),
        { provide: VariantHttp, useFactory: () => fakeVariantHttp() },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AddToCartComponent);
    const ref: ComponentRef<AddToCartComponent> = fixture.componentRef;
    ref.setInput('sku', sku);
    fixture.detectChanges();
    return fixture;
  }

  it('creates for a known sku', async () => {
    const fixture = await create('AU-03-RD');
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.outOfStock()).toBe(false);
  });

  it('marks out-of-stock when inventory is 0', async () => {
    const fixture = await create('CL-04-TQ');
    expect(fixture.componentInstance.outOfStock()).toBe(true);
  });

  it('adds to the cart and shows confirmation on submit', async () => {
    const fixture = await create('AU-03-RD');
    const cart = TestBed.inject(CartStore);
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();
    expect(cart.lineItems()).toEqual([{ sku: 'AU-03-RD', quantity: 1 }]);
    expect(fixture.componentInstance.confirmed()).toBe(true);
  });

  it('binds the sku input into the reactive form control', async () => {
    const fixture = await create('CL-01-GR');
    expect(fixture.componentInstance.form.controls.sku.value).toBe('CL-01-GR');
  });
});
