import { createCustomElement } from '@angular/elements';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { getAppInjector } from '../../app.config';
import { ProductPage } from './product.page';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  const injector = await getAppInjector(env, nf);
  if (customElements.get('mfe-product')) return;
  customElements.define(
    'mfe-product',
    createCustomElement(ProductPage, { injector }),
  );
};
