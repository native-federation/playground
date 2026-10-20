import { IMAGE_LOADER, type ImageLoaderConfig } from '@angular/common';
import { type Injector, provideZonelessChangeDetection } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createRemoteLoader, LOAD_REMOTE } from './shared/remote-element';

// Serves images from the CDN and fills the `[size]` segment of a catalog image path. The plain
// `src` has no width, so it uses loaderParams.size or 200.
export const cdnImageLoader =
  (cdnUrl: string) =>
  ({ src, width, loaderParams }: ImageLoaderConfig): string =>
    cdnUrl.replace(/\/+$/, '') +
    src.replace('[size]', String(width ?? loaderParams?.['size'] ?? 200));

let injector: Promise<Injector> | undefined;

// Every element this remote exposes shares one Angular app, so mini-cart and add-to-cart see the same CartStore.
export const getAppInjector = (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<Injector> =>
  (injector ??= createApplication({
    providers: [
      provideZonelessChangeDetection(),
      { provide: IMAGE_LOADER, useValue: cdnImageLoader(env.cdnUrl) },
      { provide: LOAD_REMOTE, useValue: createRemoteLoader(env, nf) },
    ],
  }).then((app) => app.injector));
