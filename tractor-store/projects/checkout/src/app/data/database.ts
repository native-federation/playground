import database from './database.json';

export interface Variant {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  inventory: number;
}

interface Database {
  variants: Variant[];
}

const typed = database as Database;

export const variants: Variant[] = typed.variants;

export function findVariant(sku: string): Variant | undefined {
  return variants.find((v) => v.sku === sku);
}
