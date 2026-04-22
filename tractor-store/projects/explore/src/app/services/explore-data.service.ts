import { Injectable } from '@angular/core';
import databaseJson from '../data/database.json';

export interface Teaser {
  title: string;
  image: string;
  url: string;
}

export interface Product {
  name: string;
  id: string;
  image: string;
  startPrice: number;
  url: string;
}

export interface Category {
  key: string;
  name: string;
  products: Product[];
}

export interface RecoItem {
  name: string;
  sku: string;
  image: string;
  url: string;
  rgb: [number, number, number];
}

export interface Store {
  id: string;
  name: string;
  street: string;
  city: string;
  image: string;
}

export interface Database {
  teaser: Teaser[];
  categories: Category[];
  recommendations: Record<string, RecoItem>;
  stores: Store[];
}

const db = databaseJson as unknown as Database;

@Injectable({ providedIn: 'root' })
export class ExploreDataService {
  teaser(): Teaser[] {
    return db.teaser;
  }

  categories(): Category[] {
    return db.categories;
  }

  stores(): Store[] {
    return db.stores;
  }

  recommendations(): Record<string, RecoItem> {
    return db.recommendations;
  }

  findCategory(key: string | undefined | null): Category | undefined {
    if (!key) return undefined;
    return db.categories.find((c) => c.key === key);
  }
}
