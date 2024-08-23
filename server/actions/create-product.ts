"use server";

import { ProductSchema } from "@/types/product-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { productImages, products } from "../schema";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const createProduct = action(
  ProductSchema,
  async ({ smalldesc, description, title, id, variantImages: newImgs }) => {
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
            title,
          })
          .where(eq(products.id, id))
          .returning();
        await db
          .delete(productImages)
          .where(eq(productImages.productID, currentProduct.id));
        await db.insert(productImages).values(
          newImgs.map(
            (
              img: { name: string; size: number; url: string },
              idx: number
            ) => ({
              name: img.name,
              size: img.size,
              url: img.url,
              productID: currentProduct.id,
              order: idx,
            })
          )
        );
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
            title,
          })
          .returning();

        await db.insert(productImages).values(
          newImgs.map(
            (
              img: { name: string; size: number; url: string },
              idx: number
            ) => ({
              name: img.name,
              size: img.size,
              url: img.url,
              productID: newProduct[0].id,
              order: idx,
            })
          )
        );
        revalidatePath("/dashboard/products");
        return { success: `Product ${newProduct[0].title} has been created` };
      }
    } catch (err) {
      console.log("err==================================");
      console.log(err);
      return { error: "Failed to create product" };
    }
  }
);
