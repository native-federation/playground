import { createCustomElement } from '@angular/elements';
import type { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import type { EnvironmentConfig } from '@tractor-store/contracts';
import { getAppInjector } from '../../app.config';
import { MiniCartComponent } from './mini-cart.component';

export const bootstrap = async (
  env: EnvironmentConfig,
  nf: NativeFederationResult,
): Promise<void> => {
  const injector = await getAppInjector(env, nf);
  if (customElements.get('mfe-mini-cart')) return;
  customElements.define(
    'mfe-mini-cart',
    createCustomElement(MiniCartComponent, { injector }),
  );
};
