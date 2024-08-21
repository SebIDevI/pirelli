"use server";

import { ProductSchema } from "@/types/product-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const createProduct = action(
  ProductSchema,
  async ({
    smalldesc,
    description,
    price,
    title,
    id,
    pirelliId,
    ean,
    eprellLink,
    fullSize,
    family,
    lssc,
    rr,
    wg,
    prestige,
    protectieRIM,
    season,
    size,
    type,
  }) => {
    try {
      // EDIT MODE
      if (id) {
        const currentProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!currentProduct) return { error: "Product not found" };
        const editedProduct = await db
          .update(products)
          .set({
            smalldesc,
            description,
            // price,
            title,
            // ean,
            // eprellLink,
            // family,
            // fullSize,
            // lssc,
            // pirelliId,
            // prestige,
            // protectieRIM,
            // rr,
            // season,
            // size,
            // wg,
          })
          .where(eq(products.id, id))
          .returning();
        revalidatePath("/dashboard/products");
        return {
          success: `Product ${editedProduct[0].title} has been edited`,
        };
      }
      if (!id) {
        const newProduct = await db
          .insert(products)
          .values({
            smalldesc,
            description,
            // price,
            title,
            // ean,
            // eprellLink,
            // family,
            // fullSize,
            // lssc,
            // pirelliId,
            // prestige,
            // protectieRIM,
            // rr,
            // season,
            // size,
            // wg,
          })
          .returning();
        revalidatePath("/dashboard/products");
        return { success: `Product ${newProduct[0].title} has been created` };
      }
    } catch (err) {
      console.log(err);
      return { error: "Failed to create product" };
    }
  }
);
