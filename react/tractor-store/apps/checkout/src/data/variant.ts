import { variantCatalog } from './variants-fixtures';

export interface Variant {
  id: string;
  sku: string;
  name: string;
  image: string;
  price: number;
  inventory: number;
}

export function getVariantBySku(
  sku: string | null | undefined,
): Promise<Variant | undefined> {
  if (!sku) return Promise.resolve(undefined);
  return Promise.resolve(variantCatalog.find((v) => v.sku === sku));
}

export function getVariantsBySkus(
  skus: readonly string[],
): Promise<Variant[]> {
  if (skus.length === 0) return Promise.resolve([]);
  const wanted = new Set(skus);
  return Promise.resolve(variantCatalog.filter((v) => wanted.has(v.sku)));
}
