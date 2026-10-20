export interface Product {
  id: string;
  name: string;
  category: string;
  highlights: string[];
  variants: Variant[];
}

export interface Variant {
  sku: string;
  name: string;
  image: string;
  color: string;
  price: number;
}
