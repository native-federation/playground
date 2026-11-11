import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { SeatPlanComponent } from './seat-plan.component';

const tag = 'mfe-seating-plan';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (customElements.get(tag)) return;
  customElements.define(
    tag,
    createCustomElement(SeatPlanComponent, { injector }),
  );
};
