import type { Teaser } from './teaser';

export const teasers: Teaser[] = [
  {
    title: 'Classic Tractors',
    image: '/cdn/img/scene/[size]/classics.webp',
    link: {
      intent: 'explore.products.category',
      params: { category: 'classic' },
    },
  },
  {
    title: 'Autonomous Tractors',
    image: '/cdn/img/scene/[size]/autonomous.webp',
    link: {
      intent: 'explore.products.category',
      params: { category: 'autonomous' },
    },
  },
];
