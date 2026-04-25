import { createCustomElement } from '@angular/elements';
import { ComponentBootstrap, LoadRemoteModule } from '@internal/federation';
import { EnvironmentConfig } from '../../../env.config';
import { getApp } from '../../app-instance';
import { AddToCartElement } from './add-to-cart-element';

let registered = false;

export const bootstrap: ComponentBootstrap['bootstrap'] = async (
  env: EnvironmentConfig,
  _loadRemoteModule: LoadRemoteModule,
): Promise<void> => {
  if (registered) return;
  registered = true;

  const { injector } = await getApp(env);

  if (!customElements.get('mfe-checkout-add-to-cart')) {
    customElements.define(
      'mfe-checkout-add-to-cart',
      createCustomElement(AddToCartElement, { injector }),
    );
  }
};
