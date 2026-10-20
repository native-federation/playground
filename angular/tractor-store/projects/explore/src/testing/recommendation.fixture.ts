import type { Recommendation } from '../data/recommendation';

export const recommendationFixture: Recommendation[] = [
  {
    sku: 'AU-01-SI',
    name: 'TerraFirma Silver',
    image: '/img/[size]/AU-01-SI.webp',
    link: {
      intent: 'decide.product',
      params: { id: 'AU-01', sku: 'AU-01-SI' },
    },
    rgb: [192, 192, 192],
  },
  {
    sku: 'CL-02-BL',
    name: 'Falcon Crest Farm Blue',
    image: '/img/[size]/CL-02-BL.webp',
    link: {
      intent: 'decide.product',
      params: { id: 'CL-02', sku: 'CL-02-BL' },
    },
    rgb: [0, 123, 167],
  },
];
