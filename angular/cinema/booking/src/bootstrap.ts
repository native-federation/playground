import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { CheckoutComponent } from './checkout.component';

const tag = 'mfe-booking-checkout';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (customElements.get(tag)) return;
  customElements.define(
    tag,
    createCustomElement(CheckoutComponent, { injector }),
  );
};
