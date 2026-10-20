import { Injectable, resource, type ResourceRef } from '@angular/core';
import type { Teaser } from './teaser';
import { teasers } from './teaser.data';

@Injectable({ providedIn: 'root' })
export class TeaserService {
  list(): ResourceRef<Teaser[] | undefined> {
    return resource({ loader: async () => teasers });
  }
}
