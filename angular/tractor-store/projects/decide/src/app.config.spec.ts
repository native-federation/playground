import { IMAGE_LOADER } from '@angular/common';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { describe, expect, it } from 'vitest';
import { getAppInjector } from './app.config';
import { bootstrap } from './features/product/bootstrap';
import { testEnv } from './testing/env.fixture';

// Nothing here loads a remote, so the federation result is never touched.
const nf = {} as NativeFederationResult;

// getAppInjector caches in module state, so every test here shares one application.
describe('app.config', () => {
  it('creates one application for all elements of this remote', async () => {
    expect(await getAppInjector(testEnv, nf)).toBe(
      await getAppInjector(testEnv, nf),
    );
  });

  it('serves images from the CDN and fills in the [size] segment', async () => {
    const load = (await getAppInjector(testEnv, nf)).get(IMAGE_LOADER);
    expect(load({ src: '/img/[size]/a.webp', width: 800 })).toBe(
      'http://cdn.test/img/800/a.webp',
    );
    expect(
      load({ src: '/img/[size]/a.webp', loaderParams: { size: 400 } }),
    ).toBe('http://cdn.test/img/400/a.webp');
    expect(load({ src: '/img/[size]/a.webp' })).toBe(
      'http://cdn.test/img/200/a.webp',
    );
  });
});

describe('bootstrap', () => {
  it('defines mfe-product, also when called concurrently', async () => {
    await Promise.all([bootstrap(testEnv, nf), bootstrap(testEnv, nf)]);
    expect(customElements.get('mfe-product')).toBeDefined();
  });
});
