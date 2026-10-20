import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { cdnImageLoader } from '../../../app.config';
import { categoryFixture } from '../../../testing/category.fixture';
import { testEnv } from '../../../testing/env.fixture';
import { ProductTileComponent } from './product-tile.component';
import { publishNavResolver } from '../../../testing/nav-resolver.stub';

const [product] = categoryFixture[0].products;

describe('ProductTileComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
    await publishNavResolver((id, payload) => `${id}/${payload?.['id']}`);
  });

  async function render() {
    const fixture = TestBed.createComponent(ProductTileComponent);
    fixture.componentRef.setInput('product', product);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the name and the start price', async () => {
    const el = await render();
    expect(el.querySelector('.e_Product_name')?.textContent).toBe(product.name);
    expect(el.querySelector('.e_Product_price')?.textContent).toBe(
      `${product.startPrice},00 Ø`,
    );
  });

  it('links to the product page', async () => {
    expect((await render()).querySelector('a')?.getAttribute('href')).toBe(
      `decide.product/${product.id}`,
    );
  });

  it('serves the image from the CDN in three sizes', async () => {
    const img = (await render()).querySelector('img')!;
    const at = (size: number) =>
      testEnv.cdnUrl + product.image.replace('[size]', String(size));
    expect(img.getAttribute('src')).toBe(at(200));
    expect(img.getAttribute('srcset')).toBe(
      `${at(200)} 200w, ${at(400)} 400w, ${at(800)} 800w`,
    );
  });
});
