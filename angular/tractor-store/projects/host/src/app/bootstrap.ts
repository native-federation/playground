import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { App } from './app';
import { createRemoteLoader, LOAD_REMOTE } from './load-remote';
import { provideNavigation } from './navigation';

export const bootstrap = (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
  manifest: FederationManifest,
) => {
  const cdnUrl = env.cdnUrl.replace(/\/+$/, '');

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = `${cdnUrl}/cdn/css/global.css`;
  document.head.appendChild(stylesheet);

  if ('FontFace' in window) {
    new FontFace(
      'Raleway',
      `url(${cdnUrl}/cdn/font/raleway-regular.woff2) format('woff2')`,
      { weight: 'normal', style: 'normal', display: 'swap' },
    )
      .load()
      .then((font) => document.fonts.add(font))
      .catch((err) => console.warn('[host] failed to load Raleway font', err));
  }

  const helper = document.createElement('script');
  helper.type = 'module';
  helper.src = `${cdnUrl}/cdn/js/helper.js`;
  document.head.appendChild(helper);

  return bootstrapApplication(App, {
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([], withComponentInputBinding()),
      provideNavigation(nf, manifest),
      { provide: LOAD_REMOTE, useValue: createRemoteLoader(env, nf) },
    ],
  });
};
