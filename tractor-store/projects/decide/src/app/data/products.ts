import database from './database.json';

export interface Variant {
  name: string;
  image: string;
  sku: string;
  color: string;
  price: number;
}

export interface Product {
  name: string;
  id: string;
  category: string;
  highlights?: string[];
  variants: Variant[];
}

interface Database {
  products: Product[];
}

export const DATABASE: Database = database as unknown as Database;
