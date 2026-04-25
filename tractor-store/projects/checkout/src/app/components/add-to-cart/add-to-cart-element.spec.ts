import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AddToCartElement } from './add-to-cart-element';

describe('AddToCartElement', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.resetTestingModule();
  });

  async function create(sku?: string) {
    await TestBed.configureTestingModule({
      imports: [AddToCartElement],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(AddToCartElement);
    const ref: ComponentRef<AddToCartElement> = fixture.componentRef;
    if (sku !== undefined) ref.setInput('sku', sku);
    fixture.detectChanges();
    return fixture;
  }

  it('does not render the inner component when sku is missing', async () => {
    const fixture = await create();
    expect(
      fixture.nativeElement.querySelector('app-add-to-cart'),
    ).toBeNull();
  });

  it('does not render the inner component when sku is empty', async () => {
    const fixture = await create('');
    expect(
      fixture.nativeElement.querySelector('app-add-to-cart'),
    ).toBeNull();
  });

  it('renders the inner component once a sku is provided', async () => {
    const fixture = await create('AU-03-RD');
    expect(
      fixture.nativeElement.querySelector('app-add-to-cart'),
    ).not.toBeNull();
  });
});
