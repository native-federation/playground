import { Injectable, resource, type ResourceRef } from '@angular/core';
import type { ListTeasersResponse } from '../contracts/endpoints/teaser-list.contract';
import type { TeaserModel } from '../contracts/models/teaser.model';
import { toTeaserListModel } from '../mappers/teaser.mapper';

const teasers: ListTeasersResponse = [
  {
    title: 'Classic Tractors',
    image: '/cdn/img/scene/[size]/classics.webp',
    link: { intent: 'explore.products.category', params: { category: 'classic' } },
  },
  {
    title: 'Autonomous Tractors',
    image: '/cdn/img/scene/[size]/autonomous.webp',
    link: { intent: 'explore.products.category', params: { category: 'autonomous' } },
  },
];

@Injectable({ providedIn: 'root' })
export class TeaserHttp {
  list(): ResourceRef<TeaserModel[] | undefined> {
    return resource<TeaserModel[], void>({
      loader: () => Promise.resolve(toTeaserListModel(teasers)),
    });
  }
}
