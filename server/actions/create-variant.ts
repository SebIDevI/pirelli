"use server";

import { VariantSchema } from "@/types/variant-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import {
  products,
  productVariants,
  productImages,
  variantTags,
} from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import algoliasearch from "algoliasearch";

const action = createSafeActionClient();

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN!
);

const algoliaIndex = client.initIndex("products");

export const createVariant = action(
  VariantSchema,
  async ({
    editMode,
    id,
    productID,
    productType,
    tags,
    price,
    pirelliId,
    ean,
    eprellLink,
    fullSize,
    lssc,
    rr,
    wg,
    prestige,
    protectieRIM,
    size,
    variantImages: newImgs,
  }) => {
    try {
      if (editMode && id) {
        const editVariant = await db
          .update(productVariants)
          .set({
            price,
            pirelliId,
            ean,
            eprellLink,
            fullSize,
            lssc,
            rr,
            wg,
            prestige,
            protectieRIM,
            size,
            productType,
            updated: new Date(),
          })
          .where(eq(productVariants.id, id))
          .returning();
        await db
          .delete(variantTags)
          .where(eq(variantTags.variantID, editVariant[0].id));
        await db.insert(variantTags).values(
          tags.map((tag: string) => ({
            tag,
            variantID: editVariant[0].id,
          }))
        );
        // await db
        //   .delete(variantImages)
        //   .where(eq(variantImages.variantID, editVariant[0].id));
        // await db.insert(variantImages).values(
        //   newImgs.map(
        //     (
        //       img: { name: string; size: number; url: string },
        //       idx: number
        //     ) => ({
        //       name: img.name,
        //       size: img.size,
        //       url: img.url,
        //       variantID: editVariant[0].id,
        //       order: idx,
        //     })
        //   )
        // );
        algoliaIndex.partialUpdateObject({
          objectID: editVariant[0].id.toString(),
          id: editVariant[0].productID.toString(),
          productType: editVariant[0].productType,
          variantImages: newImgs[0].url,
        });
        revalidatePath("/dashboard/products");
        return { success: `Edited ${productType}` };
      }
      if (!editMode) {
        const newVariant = await db
          .insert(productVariants)
          .values({
            price,
            pirelliId,
            ean,
            eprellLink,
            fullSize,
            lssc,
            rr,
            wg,
            prestige,
            protectieRIM,
            size,
            productType,
            productID,
          })
          .returning();
        const product = await db.query.products.findFirst({
          where: eq(products.id, productID),
        });
        await db.insert(variantTags).values(
          tags.map((tag: string) => ({
            tag,
            variantID: newVariant[0].id,
          }))
        );
        // await db.insert(variantImages).values(
        //   newImgs.map(
        //     (
        //       img: { name: string; size: number; url: string },
        //       idx: number
        //     ) => ({
        //       name: img.name,
        //       size: img.size,
        //       url: img.url,
        //       variantID: newVariant[0].id,
        //       order: idx,
        //     })
        //   )
        // );
        if (product) {
          algoliaIndex.saveObject({
            objectID: newVariant[0].id.toString(),
            id: newVariant[0].productID.toString(),
            title: product.title,
            price: newVariant[0].price,
            productType: newVariant[0].productType,
            variantImages: newImgs[0].url,
          });
        }
        revalidatePath("/dashboard/products");
        return { success: `Created ${productType}` };
      }
    } catch (error) {
      return { error: "Failed to create variant" };
    }
  }
);
