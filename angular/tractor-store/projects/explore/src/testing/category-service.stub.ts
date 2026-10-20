import { resource } from '@angular/core';
import type { Category } from '../data/category';
import { categoryFixture } from './category.fixture';

// Same shape as CategoryService, backed by the test fixture instead of the real catalog.
export const fakeCategoryService = (
  categories: Category[] = categoryFixture,
) => ({
  list: () => resource({ loader: async () => categories }),
});
