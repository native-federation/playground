import { IMAGE_LOADER } from '@angular/common';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { describe, expect, it, vi } from 'vitest';
import { getAppInjector } from './app.config';
import { CartStore } from './data/cart-store';
import { bootstrap as bootstrapAddToCart } from './features/add-to-cart/bootstrap';
import { bootstrap as bootstrapMiniCart } from './features/mini-cart/bootstrap';
import { LOAD_REMOTE } from './shared/remote-element';
import { testEnv } from './testing/env.fixture';

// Nothing here loads a remote, so the federation result is never touched.
const nf = {} as NativeFederationResult;

// getAppInjector caches at module level and customElements can't be redefined,
// so every test in this file shares one application on purpose.
describe('getAppInjector', () => {
  it('creates the application once', async () => {
    const [a, b] = await Promise.all([
      getAppInjector(testEnv, nf),
      getAppInjector(testEnv, nf),
    ]);
    expect(a).toBe(b);
  });

  it('serves images from the CDN with the [size] segment filled in', async () => {
    const loader = (await getAppInjector(testEnv, nf)).get(IMAGE_LOADER);
    const src = '/cdn/img/product/[size]/AU-03-RD.webp';
    expect(loader({ src, width: 400 })).toBe(
      'http://cdn.test/cdn/img/product/400/AU-03-RD.webp',
    );
    expect(loader({ src, loaderParams: { size: 800 } })).toBe(
      'http://cdn.test/cdn/img/product/800/AU-03-RD.webp',
    );
    expect(loader({ src })).toBe(
      'http://cdn.test/cdn/img/product/200/AU-03-RD.webp',
    );
  });

  it('provides a remote loader', async () => {
    const injector = await getAppInjector(testEnv, nf);
    expect(injector.get(LOAD_REMOTE)).toBeTypeOf('function');
  });
});

describe('bootstrap', () => {
  it('defines each element once, even when bootstrapped concurrently', async () => {
    const define = vi.spyOn(customElements, 'define');
    await Promise.all([
      bootstrapMiniCart(testEnv, nf),
      bootstrapMiniCart(testEnv, nf),
      bootstrapAddToCart(testEnv, nf),
    ]);
    expect(customElements.get('mfe-mini-cart')).toBeDefined();
    expect(customElements.get('mfe-add-to-cart')).toBeDefined();
    expect(define.mock.calls.map(([tag]) => tag).sort()).toEqual([
      'mfe-add-to-cart',
      'mfe-mini-cart',
    ]);
    define.mockRestore();
  });

  it('lets mini-cart and add-to-cart share one CartStore', async () => {
    window.localStorage.clear();
    await bootstrapMiniCart(testEnv, nf);
    await bootstrapAddToCart(testEnv, nf);
    const injector = await getAppInjector(testEnv, nf);

    const miniCart = document.createElement('mfe-mini-cart');
    const addToCart = document.createElement('mfe-add-to-cart');
    addToCart.setAttribute('sku', 'AU-03-RD');
    document.body.append(miniCart, addToCart);

    const addButton = await vi.waitFor(() => {
      const button = addToCart.shadowRoot?.querySelector('button');
      if (!button) throw new Error('add-to-cart has not rendered yet');
      return button;
    });
    addButton.click();

    expect(injector.get(CartStore).totalQuantity()).toBe(1);
    await vi.waitFor(() =>
      expect(
        miniCart.shadowRoot?.querySelector('.c_MiniCart__quantity')
          ?.textContent,
      ).toBe('1'),
    );
    miniCart.remove();
    addToCart.remove();
  });
});
