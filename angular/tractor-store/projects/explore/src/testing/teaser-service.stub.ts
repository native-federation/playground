import { resource } from '@angular/core';
import type { Teaser } from '../data/teaser';
import { teaserFixture } from './teaser.fixture';

// Same shape as TeaserService, backed by the test fixture instead of the real catalog.
export const fakeTeaserService = (teasers: Teaser[] = teaserFixture) => ({
  list: () => resource({ loader: async () => teasers }),
});
