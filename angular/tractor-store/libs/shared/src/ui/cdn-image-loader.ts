import { IMAGE_LOADER, type ImageLoaderConfig } from '@angular/common';
import { inject, type Provider } from '@angular/core';
import { ENV, toCdnUrl } from '../federation/env';

const DEFAULT_SIZE = 200;

// Serves `ngSrc` paths from the CDN and fills a `[size]` path segment with the
// requested width. Angular requests the plain `src` without a width; that one
// uses `loaderParams.size`, or 200.
export const provideCdnImageLoader = (): Provider => ({
  provide: IMAGE_LOADER,
  useFactory: () => {
    const { cdnUrl } = inject(ENV);
    return ({ src, width, loaderParams }: ImageLoaderConfig) => {
      const size = width ?? loaderParams?.['size'] ?? DEFAULT_SIZE;
      return toCdnUrl(src.replace('[size]', String(size)), cdnUrl);
    };
  },
});
