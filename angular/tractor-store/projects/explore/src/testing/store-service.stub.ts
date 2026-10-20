import { resource } from '@angular/core';
import type { Store } from '../data/store';
import { storeFixture } from './store.fixture';

// Same shape as StoreService, backed by the test fixture instead of the real catalog.
export const fakeStoreService = (stores: Store[] = storeFixture) => ({
  list: () => resource({ loader: async () => stores }),
});
