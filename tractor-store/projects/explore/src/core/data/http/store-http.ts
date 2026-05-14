import { Injectable, resource, type ResourceRef } from '@angular/core';
import type { ListStoresResponse } from '../contracts/endpoints/store-list.contract';
import type { StoreModel } from '../contracts/models/store.model';
import { toStoreListModel } from '../mappers/store.mapper';

const stores: ListStoresResponse = [
  {
    id: 'store-a',
    name: 'Aurora Flagship Store',
    street: 'Astronaut Way 1',
    city: 'Arlington',
    image: '/cdn/img/store/[size]/store-1.webp',
  },
  {
    id: 'store-b',
    name: 'Big Micro Machines',
    street: 'Broadway 2',
    city: 'Burlington',
    image: '/cdn/img/store/[size]/store-2.webp',
  },
  {
    id: 'store-c',
    name: 'Central Mall',
    street: 'Clown Street 3',
    city: 'Cryo',
    image: '/cdn/img/store/[size]/store-3.webp',
  },
  {
    id: 'store-d',
    name: 'Downtown Model Store',
    street: 'Duck Street 4',
    city: 'Davenport',
    image: '/cdn/img/store/[size]/store-4.webp',
  },
];

@Injectable({ providedIn: 'root' })
export class StoreHttp {
  list(): ResourceRef<StoreModel[] | undefined> {
    return resource<StoreModel[], void>({
      loader: () => Promise.resolve(toStoreListModel(stores)),
    });
  }
}
