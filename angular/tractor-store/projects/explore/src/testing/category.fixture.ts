import type { Category } from '../data/category';

export const categoryFixture: Category[] = [
  {
    key: 'classic',
    name: 'Classics',
    products: [
      {
        id: 'CL-01',
        name: 'Heritage Workhorse',
        image: '/img/[size]/CL-01.webp',
        startPrice: 5700,
        link: { intent: 'decide.product', params: { id: 'CL-01' } },
      },
      {
        id: 'CL-02',
        name: 'Falcon Crest',
        image: '/img/[size]/CL-02.webp',
        startPrice: 2600,
        link: { intent: 'decide.product', params: { id: 'CL-02' } },
      },
    ],
  },
  {
    key: 'autonomous',
    name: 'Autonomous',
    products: [
      {
        id: 'AU-01',
        name: 'TerraFirma',
        image: '/img/[size]/AU-01.webp',
        startPrice: 1000,
        link: { intent: 'decide.product', params: { id: 'AU-01' } },
      },
    ],
  },
];
