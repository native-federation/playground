import { createCustomElement } from '@angular/elements';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { getAppInjector } from '../../app.config';
import { AddToCartComponent } from './add-to-cart.component';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  const injector = await getAppInjector(env, nf);
  if (customElements.get('mfe-add-to-cart')) return;
  customElements.define(
    'mfe-add-to-cart',
    createCustomElement(AddToCartComponent, { injector }),
  );
};
