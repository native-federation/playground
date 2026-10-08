import { IMAGE_LOADER } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { provideEnv } from '../federation/provide-env';

const loader = () => {
  TestBed.configureTestingModule({
    providers: [
      provideEnv({ production: false, apiUrl: '', cdnUrl: 'http://cdn.test/' }),
    ],
  });
  return TestBed.inject(IMAGE_LOADER);
};

describe('provideCdnImageLoader', () => {
  it('prefixes the CDN url', () => {
    expect(loader()({ src: '/cdn/img/logo.svg' })).toBe(
      'http://cdn.test/cdn/img/logo.svg',
    );
  });

  it('fills [size] with the requested width', () => {
    expect(loader()({ src: '/img/[size]/a.webp', width: 400 })).toBe(
      'http://cdn.test/img/400/a.webp',
    );
  });

  it('falls back to loaderParams.size, then 200, when no width is requested', () => {
    const load = loader();
    expect(
      load({ src: '/img/[size]/a.webp', loaderParams: { size: 500 } }),
    ).toBe('http://cdn.test/img/500/a.webp');
    expect(load({ src: '/img/[size]/a.webp' })).toBe(
      'http://cdn.test/img/200/a.webp',
    );
  });
});
