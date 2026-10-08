import type { NavTarget } from '@tractor-store/shared';

export interface ProductDto {
  id: string;
  name: string;
  image: string;
  startPrice: number;
  link: NavTarget;
}

export interface CategoryDto {
  key: string;
  name: string;
  products: ProductDto[];
}

export type ListCategoriesResponse = CategoryDto[];
export type GetCategoryResponse = CategoryDto;
