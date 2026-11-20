// Installs the page's one bus before any remote code runs.
import '@softarc/native-federation-communication/install';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type {
  FederationManifest,
  NativeFederationResult,
} from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { createRemoteLoader, LoadRemoteContext } from './load-remote';
import { createNavigation } from './navigation';
import { NavigationRoot } from './navigation-root';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
  manifest: FederationManifest,
): Promise<void> => {
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

  const navigation = await createNavigation(nf, manifest);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LoadRemoteContext.Provider value={createRemoteLoader(env, nf)}>
        <NavigationRoot {...navigation} />
      </LoadRemoteContext.Provider>
    </StrictMode>,
  );
};
