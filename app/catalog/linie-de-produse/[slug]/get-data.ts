import { db } from "@/server";

export const getData = async () => {
  const data = await db.query.products.findMany({
    with: {
      productImages: true,
      productVariants: {
        with: {
          variantTags: true,
          product: true,
        },
      },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  return { data };
};
