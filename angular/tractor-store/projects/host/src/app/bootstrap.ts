import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { appConfig } from './app.config';
import { EnvironmentConfig, toCdnUrl } from '@internal/federation';
import {
  NativeFederationResult,
  FederationManifest,
} from '@softarc/native-federation-orchestrator';

const loadRalewayFont = (cdnUrl: string): void => {
  if (!('FontFace' in window)) return;
  const url = toCdnUrl('/cdn/font/raleway-regular.woff2', cdnUrl);
  const face = new FontFace('Raleway', `url(${url}) format('woff2')`, {
    weight: 'normal',
    style: 'normal',
    display: 'swap',
  });
  face
    .load()
    .then((loaded) => document.fonts.add(loaded))
    .catch((err) => console.warn('[host] failed to load Raleway font', err));
};

const loadHelperScript = (cdnUrl: string): void => {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = toCdnUrl('/cdn/js/helper.js', cdnUrl);
  document.head.appendChild(script);
};

const loadGlobalStylesheet = (cdnUrl: string): void => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = toCdnUrl('/cdn/css/global.css', cdnUrl);
  document.head.appendChild(link);
};

export const bootstrap = (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
  manifest: FederationManifest,
) => {
  loadGlobalStylesheet(env.cdnUrl);
  loadRalewayFont(env.cdnUrl);
  loadHelperScript(env.cdnUrl);
  bootstrapApplication(App, appConfig(env, nf, manifest)).catch((err) =>
    console.error(err),
  );
};
