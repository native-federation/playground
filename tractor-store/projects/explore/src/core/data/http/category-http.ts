import {
  Injectable,
  resource,
  type ResourceRef,
  type Signal,
} from '@angular/core';
import type { GetCategoryResponse } from '../contracts/endpoints/category-list.contract';
import type { CategoryModel } from '../contracts/models/category.model';
import {
  toCategoryListModel,
  toCategoryModel,
} from '../mappers/category.mapper';
import { categoryCatalog } from './category-http.fixtures';

@Injectable({ providedIn: 'root' })
export class CategoryHttp {
  list(): ResourceRef<CategoryModel[] | undefined> {
    return resource<CategoryModel[], void>({
      loader: () => Promise.resolve(toCategoryListModel(categoryCatalog)),
    });
  }

  byKey(
    key: Signal<string | undefined | null>,
  ): ResourceRef<CategoryModel | undefined> {
    return resource<CategoryModel | undefined, string | undefined>({
      params: () => key() ?? undefined,
      loader: ({ params }) => {
        const match = categoryCatalog.find((c) => c.key === params);
        return Promise.resolve(
          match ? toCategoryModel(match as GetCategoryResponse) : undefined,
        );
      },
    });
  }
}
