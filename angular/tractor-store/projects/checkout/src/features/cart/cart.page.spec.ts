import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { CART_STORAGE_KEY } from '../../core/data/store/cart-store';
import { VariantHttp } from '../../core/data/http/variant-http';
import { LOAD_REMOTE, provideEnv } from '@tractor-store/shared';
import { fakeVariantHttp } from '../../testing/variant-http.stub';
import { CartPage } from './cart.page';

const envFixture = {
  production: false,
  apiUrl: '',
  cdnUrl: '',
};

function configure() {
  return TestBed.configureTestingModule({
    imports: [CartPage],
    providers: [
      provideRouter([]),
      { provide: VariantHttp, useFactory: () => fakeVariantHttp() },
      { provide: LOAD_REMOTE, useValue: () => Promise.resolve() },
      provideEnv(envFixture),
    ],
  }).compileComponents();
}

describe('CartPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('creates with an empty cart and triggers no variant fetch', async () => {
    await configure();
    const fixture = TestBed.createComponent(CartPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.lineItems()).toEqual([]);
    expect(fixture.componentInstance.total()).toBe(0);
  });

  it('derives line items from the cart store', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2');
    await configure();
    const fixture = TestBed.createComponent(CartPage);
    fixture.detectChanges();
    const items = fixture.componentInstance.lineItems();
    expect(items).toHaveLength(1);
    expect(items[0].sku).toBe('AU-03-RD');
    expect(items[0].quantity).toBe(2);
    expect(items[0].total).toBe(3800);
    expect(fixture.componentInstance.total()).toBe(3800);
    expect(fixture.componentInstance.skusCsv()).toBe('AU-03-RD');
  });
});
