import type { NavTarget } from '@tractor-store/shared';

export interface TeaserDto {
  title: string;
  image: string;
  link: NavTarget;
}

export type ListTeasersResponse = TeaserDto[];
