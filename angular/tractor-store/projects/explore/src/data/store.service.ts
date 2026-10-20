import { Injectable, resource, type ResourceRef } from '@angular/core';
import type { Store } from './store';
import { stores } from './store.data';

@Injectable({ providedIn: 'root' })
export class StoreService {
  list(): ResourceRef<Store[] | undefined> {
    return resource({ loader: async () => stores });
  }
}
