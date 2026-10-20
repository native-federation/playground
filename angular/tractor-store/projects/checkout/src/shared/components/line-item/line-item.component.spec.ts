import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../../app.config';
import { CartStore } from '../../../data/cart-store';
import { CART_STORAGE_KEY } from '../../../data/cart-storage';
import { testEnv } from '../../../testing/env.fixture';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';
import { variantFixture } from '../../../testing/variant.fixture';
import { LineItemComponent, type LineItemView } from './line-item.component';

const [scarlet, verdant] = variantFixture;

// The plain src has no width, so the loader fills [size] with its default of 200.
const cdnSrc = (image: string) =>
  `${testEnv.cdnUrl}${image.replace('[size]', '200')}`;

const view = (v = scarlet, quantity = 2): LineItemView => ({
  id: v.id,
  sku: v.sku,
  name: v.name,
  image: v.image,
  quantity,
  total: v.price * quantity,
});

describe('LineItemComponent', () => {
  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  function create(item: LineItemView = view()) {
    const fixture = TestBed.createComponent(LineItemComponent);
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the name, sku, quantity and total price', () => {
    const el = create().nativeElement as HTMLElement;
    const name = el.querySelector('.c_LineItem__name')?.textContent;
    expect(name).toContain(scarlet.name);
    expect(name).toContain(scarlet.sku);
    expect(el.querySelector('.c_LineItem__quantity span')?.textContent).toBe(
      '2',
    );
    expect(el.querySelector('.c_LineItem__price')?.textContent).toBe(
      `${scarlet.price * 2},00 Ø`,
    );
  });

  it('renders the product image with srcset and alt', () => {
    const img = (create().nativeElement as HTMLElement).querySelector('img')!;
    expect(img.getAttribute('src')).toBe(cdnSrc(scarlet.image));
    expect(img.getAttribute('srcset')).toContain('200w');
    expect(img.getAttribute('srcset')).toContain('400w');
    expect(img.getAttribute('alt')).toBe(scarlet.name);
  });

  it('links to the product intent with {id, sku}', async () => {
    await publishNavResolver((id, payload = {}) =>
      id === 'decide.product'
        ? `/product/${payload['id']}?sku=${payload['sku']}`
        : null,
    );
    const links = (create().nativeElement as HTMLElement).querySelectorAll('a');
    for (const link of links) {
      expect(link.getAttribute('href')).toBe(
        `/product/${scarlet.id}?sku=${scarlet.sku}`,
      );
    }
  });

  it('marks the host with the listitem role', () => {
    expect((create().nativeElement as HTMLElement).getAttribute('role')).toBe(
      'listitem',
    );
  });

  it('removes its sku from the cart when the remove button is clicked', () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      `${scarlet.sku}_2|${verdant.sku}_1`,
    );
    const el = create().nativeElement as HTMLElement;
    const remove = el.querySelector('button')!;
    expect(remove.title).toBe(`Remove ${scarlet.name} from cart`);
    remove.click();
    expect(TestBed.inject(CartStore).lineItems()).toEqual([
      { sku: verdant.sku, quantity: 1 },
    ]);
  });

  it('reflects an updated item input', () => {
    const fixture = create();
    fixture.componentRef.setInput('item', view(verdant, 1));
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('img')?.getAttribute('src')).toBe(
      cdnSrc(verdant.image),
    );
    expect(el.querySelector('.c_LineItem__price')?.textContent).toBe(
      `${verdant.price},00 Ø`,
    );
  });
});
