import type { Product } from '../data/product';

export const productFixture: Product[] = [
  {
    id: 'CL-01',
    name: 'Heritage Workhorse',
    category: 'classic',
    highlights: ['Reliable', 'Built to last'],
    variants: [
      {
        sku: 'CL-01-GR',
        name: 'Verdant Field',
        image: '/cdn/img/product/[size]/CL-01-GR.webp',
        color: '#6B8E23',
        price: 5700,
      },
      {
        sku: 'CL-01-GY',
        name: 'Stormy Sky',
        image: '/cdn/img/product/[size]/CL-01-GY.webp',
        color: '#708090',
        price: 6200,
      },
    ],
  },
  {
    id: 'AU-02',
    name: 'SmartFarm Titan',
    category: 'autonomous',
    highlights: [],
    variants: [
      {
        sku: 'AU-02-OG',
        name: 'Sunset Copper',
        image: '/cdn/img/product/[size]/AU-02-OG.webp',
        color: '#dd5219',
        price: 4100,
      },
    ],
  },
];
