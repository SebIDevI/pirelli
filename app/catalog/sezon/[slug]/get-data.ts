import { db } from "@/server";

export const getData = async () => {
  const data = await db.query.products.findMany({
    with: {
      productVariants: {
        with: {
          variantImages: true,
          variantTags: true,
          product: true,
        },
      },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  return { data };
};
