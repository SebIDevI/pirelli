import { ProductVariantsWithImagesTags } from "@/lib/infer-type";

export type ProductTypes = {
  id: number;
  title: string;
  description: string;
  created: Date | null;
  productVariants: ProductVariantsWithImagesTags[];
};

export type ProductsTypes = {
  products: ProductTypes[];
};
