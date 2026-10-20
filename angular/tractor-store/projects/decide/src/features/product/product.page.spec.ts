import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import type { RouteParams } from '@tractor-store/contracts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cdnImageLoader } from '../../app.config';
import { ProductService } from '../../data/product.service';
import { LOAD_REMOTE } from '../../shared/remote-element';
import { testEnv } from '../../testing/env.fixture';
import { productFixture } from '../../testing/product.fixture';
import { fakeProductService } from '../../testing/product-service.stub';
import { ProductPage } from './product.page';

const [product] = productFixture;
const [firstVariant, secondVariant] = product.variants;

describe('ProductPage', () => {
  let loadRemote: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    loadRemote = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      imports: [ProductPage],
      providers: [
        { provide: ProductService, useValue: fakeProductService() },
        { provide: LOAD_REMOTE, useValue: loadRemote },
        { provide: IMAGE_LOADER, useValue: cdnImageLoader(testEnv.cdnUrl) },
      ],
    });
  });

  async function render(routeParams: RouteParams = {}) {
    const fixture = TestBed.createComponent(ProductPage);
    fixture.componentRef.setInput('routeParams', routeParams);
    await fixture.whenStable();
    return (fixture.nativeElement as HTMLElement).shadowRoot!;
  }

  const variantNames = (root: ShadowRoot) =>
    [...root.querySelectorAll('app-variant-option')].map((el) => ({
      name: el.textContent?.trim(),
      selected: el.querySelector('strong') !== null,
    }));

  it('renders the product named by the id route param', async () => {
    const root = await render({ id: product.id });
    expect(root.querySelector('.d_ProductPage__title')?.textContent).toBe(
      product.name,
    );
    expect(
      [...root.querySelectorAll('.d_ProductPage__highlights li')].map(
        (li) => li.textContent,
      ),
    ).toEqual(product.highlights);
  });

  it('selects the variant named by the sku route param', async () => {
    const root = await render({ id: product.id, sku: secondVariant.sku });
    expect(variantNames(root)).toEqual([
      { name: firstVariant.name, selected: false },
      { name: secondVariant.name, selected: true },
    ]);
  });

  it('falls back to the first variant when the sku is missing or unknown', async () => {
    for (const routeParams of [
      { id: product.id },
      { id: product.id, sku: 'nope' },
    ] as RouteParams[]) {
      const root = await render(routeParams);
      expect(variantNames(root)[0]).toEqual({
        name: firstVariant.name,
        selected: true,
      });
    }
  });

  it('ignores a repeated (array) route param', async () => {
    const root = await render({ id: [product.id, 'AU-02'] });
    expect(root.textContent).toContain('Product not found');
  });

  it('shows the image of the selected variant', async () => {
    const img = (
      await render({ id: product.id, sku: secondVariant.sku })
    ).querySelector('img')!;
    expect(img.getAttribute('src')).toBe(
      `${testEnv.cdnUrl}${secondVariant.image.replace('[size]', '400')}`,
    );
    expect(img.getAttribute('srcset')).toContain('800w');
    expect(img.getAttribute('alt')).toBe(
      `${product.name} - ${secondVariant.name}`,
    );
  });

  it('passes the selected sku to add-to-cart and recommendations', async () => {
    const root = await render({ id: product.id, sku: secondVariant.sku });
    expect(root.querySelector('mfe-add-to-cart')?.getAttribute('sku')).toBe(
      secondVariant.sku,
    );
    expect(
      root.querySelector('mfe-recommendations')?.getAttribute('skus'),
    ).toBe(secondVariant.sku);
  });

  it('shows "not found" without an id or for an unknown id', async () => {
    for (const routeParams of [{}, { id: 'NOPE' }] as RouteParams[]) {
      const root = await render(routeParams);
      expect(root.textContent).toContain('Product not found');
      expect(root.querySelector('.d_ProductPage__details')).toBeNull();
    }
  });

  it('marks the host with the decide page boundary', async () => {
    const fixture = TestBed.createComponent(ProductPage);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).dataset['boundaryPage']).toBe(
      'decide',
    );
  });

  it('loads the explore and checkout elements it embeds', async () => {
    await render({ id: product.id });
    expect(loadRemote.mock.calls).toEqual(
      expect.arrayContaining([
        ['@tractor-store/explore', 'mfe-header'],
        ['@tractor-store/explore', 'mfe-footer'],
        ['@tractor-store/explore', 'mfe-recommendations'],
        ['@tractor-store/checkout', 'mfe-add-to-cart'],
      ]),
    );
    expect(loadRemote).toHaveBeenCalledTimes(4);
  });
});
