"use server";

import { reviewSchema } from "@/types/reviews-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { and, eq } from "drizzle-orm";
import { products, reviews } from "../schema";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const addReview = action(
  reviewSchema,
  async ({ productID, rating, comment }) => {
    try {
      const session = await auth();
      if (!session) return { error: "Vă rugăm intrați în cont" };

      const reviewExists = await db.query.reviews.findFirst({
        where: and(
          eq(reviews.productID, productID),
          eq(reviews.userID, session.user.id)
        ),
      });

      const product = await db.query.products.findFirst({
        where: eq(products.id, productID),
      });

      if (reviewExists)
        return { error: "Ați lăsat deja un review pentru acest produs." };

      const newReview = await db
        .insert(reviews)
        .values({
          productID,
          rating,
          comment,
          userID: session.user.id,
        })
        .returning();
      revalidatePath(`/products/${product!.title}`);
      return { success: newReview[0] };
    } catch (err) {
      return { error: JSON.stringify(err) };
    }
  }
);
