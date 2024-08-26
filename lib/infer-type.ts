import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import * as schema from "@/server/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelations<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelations<TableName> | undefined = undefined
> = BuildQueryResult<TSchema, TSchema[TableName], { with: With }>;

export type ProductImages = InferResultType<"productImages">;

export type VariantsWithImagesTags = InferResultType<
  "productVariants",
  { variantTags: true }
>;

export type VariantsWithProduct = InferResultType<
  "productVariants",
  { variantTags: true; product: true }
>;

export type ProductVariantsWithImagesTags = InferResultType<
  "productVariants",
  { variantTags: true; product: { with: { productImages: true } } }
>;

export type TotalOrders = InferResultType<
  "orderProduct",
  {
    order: { with: { user: true } };
    product: { with: { productImages: true } };
    productVariants: true;
  }
>;

export type AllOrders = InferResultType<
  "orders",
  {
    orderProduct: {
      with: {
        product: { with: { productImages: true } };
        productVariants: true;
      };
    };
  }
>;

export type TagsWithVariantsAndAll = InferResultType<
  "variantTags",
  {
    productVariants: {
      with: {
        product: {
          with: { productVariants: true };
        };
      };
    };
  }
>;
