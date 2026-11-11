import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { BadgeComponent } from './badge.component';
import { PointsPageComponent } from './points-page.component';

const pointsTag = 'mfe-loyalty-points';
const badgeTag = 'mfe-loyalty-badge';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (!customElements.get(pointsTag)) {
    customElements.define(pointsTag, createCustomElement(PointsPageComponent, { injector }));
  }
  if (!customElements.get(badgeTag)) {
    customElements.define(badgeTag, createCustomElement(BadgeComponent, { injector }));
  }
};
