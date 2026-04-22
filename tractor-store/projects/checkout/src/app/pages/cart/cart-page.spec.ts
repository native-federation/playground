import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CART_STORAGE_KEY } from '../../services/cart.service';
import { CartPage } from './cart-page';

describe('CartPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('creates with an empty cart', async () => {
    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(CartPage);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.lineItems()).toEqual([]);
    expect(fixture.componentInstance.total()).toBe(0);
  });

  it('derives line items from the cart service', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, 'AU-03-RD_2');
    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [provideRouter([])],
    }).compileComponents();
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
