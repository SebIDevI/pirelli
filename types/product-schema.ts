import * as z from "zod";

export const ProductSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  smalldesc: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  variantImages: z
    .array(
      z.object({
        url: z.string().refine((url) => url.search("blob:") !== 0, {
          message: "Așteptați până când se încarcă imaginea",
        }),
        size: z.number(),
        key: z.string().optional(),
        id: z.number().optional(),
        name: z.string(),
      })
    )
    .min(1, { message: "Te rog pune măcar o poză" }),
});

export type zProductSchema = z.infer<typeof ProductSchema>;
