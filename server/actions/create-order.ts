"use server";

import { createOrderSchema } from "@/types/order-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";
import { generateOrderXML } from "./xml-generate/generate-order-xml";
import { eq } from "drizzle-orm";
import { uploadXml } from "@/app/api/xml/upload-xml";

const action = createSafeActionClient();

export const createOrder = action(
  createOrderSchema,
  async ({ products, status, total, paymentIntentID }) => {
    const user = await auth();
    if (!user) return { error: "User-ul nu a fost găsit" };

    const order = await db
      .insert(orders)
      .values({
        status,
        paymentIntentID,
        total,
        userID: user.user.id,
      })
      .returning();

    const orderProducts = products.map(
      async ({
        productID,
        quantity,
        variantID,
      }: {
        productID: number;
        quantity: number;
        variantID: number;
      }) => {
        const newOrderProduct = await db.insert(orderProduct).values({
          quantity,
          orderID: order[0].id,
          productID: productID,
          productVariantID: variantID,
        });
      }
    );

    const theOrder = await db.query.orders.findFirst({
      where: eq(orders.id, order[0].id),
      with: {
        orderProduct: {
          with: {
            product: { with: { productImages: true } },
            productVariants: true,
          },
        },
      },
    });

    const generatedXML = generateOrderXML({ order: theOrder! });
    await uploadXml(generatedXML);

    return { success: "Comanda a fost plasată!" };
  }
);
