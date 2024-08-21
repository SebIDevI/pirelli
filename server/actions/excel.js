"use server";

import { db } from "@/server";
import {
  products,
  productVariants,
  variantImages,
  variantTags,
} from "@/server/schema";
import { eq } from "drizzle-orm";

const imgs = [
  {
    url: "https://utfs.io/f/4b23f497-786b-47e3-b4d1-414b3439ee2a-ti9wh.jpg",
    size: "179471",
    name: "cinturato-p1-verde-3-4-1505470090255.jpg",
    order: 0,
  },
  {
    url: "https://utfs.io/f/4456d220-d910-49a8-bcd4-67b6dde6f9ff-pp1lfs.jpg",
    size: "109204",
    name: "cinturato-p1-verde-front-1505470079951.jpg",
    order: 1,
  },
  {
    url: "https://utfs.io/f/d4e41c14-37ee-4c72-b6ca-2dc2306ced06-9cambe.jpg",
    size: "239857",
    name: "cinturato-p1-verde-torta-1505470074399.jpg",
    order: 2,
  },
];

export const add = async (date) => {
  const product = await db.insert(products).values({
    title: date.title,
    description: date.description,
    smalldesc: date.smalldesc,
  });
  const newProd = await db.query.products.findFirst({
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  date.variants.forEach(async (variant) => {
    const prodVariant = await db.insert(productVariants).values({
      productType: variant.productType,
      productID: newProd.id,
      price: variant.price,
      pirelliId: variant.pirelliId,
      ean: variant.ean,
      eprellLink: variant.eprellLink,
      fullSize: variant.fullSize,
      lssc: variant.lssc,
      rr: variant.rr,
      wg: variant.wg,
      prestige: variant.prestige,
      protectieRIM: variant.protectieRIM,
      size: variant.size,
    });

    const newVar = await db.query.productVariants.findFirst({
      where: eq(productVariants.fullSize, variant.fullSize),
      orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
    });

    variant.variantTags.forEach(async (tag) => {
      const varTag = await db.insert(variantTags).values({
        variantID: newVar.id,
        tag: tag.tag,
      });
    });
    imgs.forEach(async (img) => {
      const varImg = await db.insert(variantImages).values({
        url: img.url,
        size: img.size,
        name: img.name,
        order: img.order,
        variantID: newVar.id,
      });
    });
  });
};
