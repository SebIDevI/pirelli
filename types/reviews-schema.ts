import * as z from "zod";

export const reviewSchema = z.object({
  productID: z.number(),
  rating: z
    .number()
    .min(1, { message: "Vă rugăm introduceți cel puțin o stea" })
    .max(5, { message: "Vă rugăm nu introduceți mai mult de 5 stele" }),
  comment: z
    .string()
    .min(10, { message: "Vă rugăm lăsați un review de minim 10 caractere" }),
});
