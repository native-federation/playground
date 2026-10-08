import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective, provideEnv } from '@tractor-store/shared';
import { beforeEach, describe, expect, it } from 'vitest';
import type { ProductModel } from '../../../core/data/contracts/models/product.model';
import { testEnv } from '../../../testing/env.fixture';
import { productFixture } from '../../../testing/product.fixture';
import { ProductTileComponent } from './product-tile';

describe('ProductTileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTileComponent],
      providers: [provideRouter([]), provideEnv(testEnv)],
    }).compileComponents();
  });

  function create(p: ProductModel = productFixture) {
    const fixture = TestBed.createComponent(ProductTileComponent);
    fixture.componentRef.setInput('product', p);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the product name and formatted price', () => {
    const el: HTMLElement = create().nativeElement as HTMLElement;
    expect(el.querySelector('.e_Product_name')?.textContent).toContain(
      'Heritage Workhorse',
    );
    expect(el.querySelector('.e_Product_price')?.textContent).toContain(
      '5700,00 Ø',
    );
  });

  it('builds the cdn-prefixed src and srcset from the [size] template', () => {
    const img = (create().nativeElement as HTMLElement).querySelector(
      'img',
    ) as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('http://cdn.test/img/200/CL-01.webp');
    expect(img.getAttribute('srcset')).toBe(
      'http://cdn.test/img/200/CL-01.webp 200w, ' +
        'http://cdn.test/img/400/CL-01.webp 400w, ' +
        'http://cdn.test/img/800/CL-01.webp 800w',
    );
  });

  it('passes the navigation intent and params to the navigateTo directive', () => {
    const fixture = create();
    const dir = fixture.debugElement
      .query(By.directive(NavigateToDirective))
      .injector.get(NavigateToDirective);
    expect(dir.appNavigateTo()).toBe('decide.product');
    expect(dir.navPayload()).toEqual({ id: 'CL-01' });
  });
});
