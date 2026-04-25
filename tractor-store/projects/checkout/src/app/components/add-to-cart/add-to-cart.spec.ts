import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AddToCartComponent } from './add-to-cart';

describe('AddToCartComponent', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
  });

  async function create(sku: string) {
    await TestBed.configureTestingModule({
      imports: [AddToCartComponent],
      providers: [provideRouter([])],
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
    const cart = TestBed.inject(CartService);
    fixture.componentInstance.onSubmit(new Event('submit'));
    fixture.detectChanges();
    expect(cart.lineItems()).toEqual([{ sku: 'AU-03-RD', quantity: 1 }]);
    expect(fixture.componentInstance.confirmed()).toBe(true);
  });
});
