import Head from "@/components/index/Head";
import Section1 from "@/components/index/Section1";
import Section2 from "@/components/index/Section2";
import Section3 from "@/components/index/Section3";
import Algolia from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";
import Products from "@/components/index/Products";
import { Button } from "@/components/ui/button";
import { db } from "@/server";
import { productVariants } from "@/server/schema";

export const revalidate = 0;

export default async function Home() {
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
  return (
    <main>
      {/* <Algolia /> */}
      {/* <ProductTags />
      <Products products={data} /> */}
      <>
        <Head />

        <Section1 />
        <Section2 />
        <Products />
        <Section3 />
      </>
    </main>
  );
}
