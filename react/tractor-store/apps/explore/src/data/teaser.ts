import type { NavTarget } from '@react-internal/navigation';

export interface Teaser {
  title: string;
  image: string;
  link: NavTarget;
}

const teasers: Teaser[] = [
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

export const getTeasers = (): Promise<Teaser[]> => Promise.resolve(teasers);
