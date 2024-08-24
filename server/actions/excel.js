"use server";

import { db } from "@/server";
import {
  productImages,
  products,
  productVariants,
  variantTags,
} from "@/server/schema";
import { eq } from "drizzle-orm";

const imgs = [
  {
    url: "https://utfs.io/f/c0e86f0d-2ee0-4b23-90ba-62452c87b7a7-kkvwmz.jpg",
    size: "178657",
    name: "Scorpion-Zero-All-Season-3-4-1505470086399.jpg",
    order: 0,
  },
  {
    url: "https://utfs.io/f/999f5f3e-e0e2-4bb5-8144-997a67dd5056-8w9axq.jpg",
    size: "122265",
    name: "Scorpion-Zero-All-Season-front-1505470086380.jpg",
    order: 1,
  },
  {
    url: "https://utfs.io/f/0101d822-7e06-4a34-89fb-973d69a7c3f3-r3lv59.jpg",
    size: "194538",
    name: "Scorpion-Zero-All-Season-torta-1505470086418.jpg",
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
  imgs.forEach(async (img) => {
    const varImg = await db.insert(productImages).values({
      url: img.url,
      size: img.size,
      name: img.name,
      order: img.order,
      productID: newProd.id,
    });
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
  });
};
export const edit = async (date) => {
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
  });
};
