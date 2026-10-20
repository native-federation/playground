import type { Teaser } from '../data/teaser';

export const teaserFixture: Teaser[] = [
  {
    title: 'Classic Tractors',
    image: '/img/[size]/classics.webp',
    link: {
      intent: 'explore.products.category',
      params: { category: 'classic' },
    },
  },
  {
    title: 'Autonomous Tractors',
    image: '/img/[size]/autonomous.webp',
    link: {
      intent: 'explore.products.category',
      params: { category: 'autonomous' },
    },
  },
];
