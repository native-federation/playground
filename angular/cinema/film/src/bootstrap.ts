import { createCustomElement } from '@angular/elements';
import { getAppInjector } from './app.config';
import { FilmCardComponent } from './film-card.component';
import { FilmDetailComponent } from './film-detail.component';

const detailTag = 'mfe-film-detail';
const cardTag = 'mfe-film-card';

export const bootstrap = async (): Promise<void> => {
  const injector = await getAppInjector();
  if (!customElements.get(detailTag)) {
    customElements.define(detailTag, createCustomElement(FilmDetailComponent, { injector }));
  }
  if (!customElements.get(cardTag)) {
    customElements.define(cardTag, createCustomElement(FilmCardComponent, { injector }));
  }
};
