import { Injectable, resource, type ResourceRef } from '@angular/core';
import type { Category } from './category';
import { categories } from './category.data';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  list(): ResourceRef<Category[] | undefined> {
    return resource({ loader: async () => categories });
  }
}
