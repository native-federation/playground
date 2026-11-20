import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { BookingStartComponent } from './booking-start.component';
import { BookingSummaryComponent } from './booking-summary.component';
import { CheckoutComponent } from './checkout.component';

const checkoutTag = 'mfe-booking-checkout';
const startTag = 'mfe-booking-start';
const summaryTag = 'mfe-booking-summary';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (!customElements.get(checkoutTag)) {
    customElements.define(checkoutTag, createCustomElement(CheckoutComponent, { injector }));
  }
  if (!customElements.get(startTag)) {
    customElements.define(startTag, createCustomElement(BookingStartComponent, { injector }));
  }
  if (!customElements.get(summaryTag)) {
    customElements.define(summaryTag, createCustomElement(BookingSummaryComponent, { injector }));
  }
};
