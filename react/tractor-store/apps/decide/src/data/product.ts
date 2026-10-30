import { productCatalog } from './products-fixtures';

export interface Variant {
  sku: string;
  name: string;
  image: string;
  color: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  highlights: string[];
  variants: Variant[];
}

// Source data may omit `highlights`; normalize to a guaranteed empty array.
type RawProduct = Omit<Product, 'highlights'> & { highlights?: string[] };

const normalize = (p: RawProduct): Product => ({
  ...p,
  highlights: p.highlights ?? [],
});

export function getProductById(
  id: string | null | undefined,
): Promise<Product | undefined> {
  if (!id) return Promise.resolve(undefined);
  const match = productCatalog.find((p) => p.id === id);
  return Promise.resolve(match ? normalize(match) : undefined);
}
