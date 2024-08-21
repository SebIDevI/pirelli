import { ProductImages, ProductVariantsWithImagesTags } from "@/lib/infer-type";

export type ProductTypes = {
  id: number;
  title: string;
  description: string;
  smalldesc: string;
  created: Date | null;
  productVariants: ProductVariantsWithImagesTags[];
  productImages: ProductImages[];
};

export type ProductsTypes = {
  products: ProductTypes[];
};
