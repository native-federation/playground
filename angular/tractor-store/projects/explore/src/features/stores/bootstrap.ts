import { createCustomElement } from '@angular/elements';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { getAppInjector } from '../../app.config';
import { StoresPage } from './stores.page';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  const injector = await getAppInjector(env, nf);
  if (customElements.get('mfe-stores')) return;
  customElements.define(
    'mfe-stores',
    createCustomElement(StoresPage, { injector }),
  );
};
