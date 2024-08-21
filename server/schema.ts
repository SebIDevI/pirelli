import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  pgEnum,
  serial,
  real,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const RoleEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false),
  role: RoleEnum("roles").default("user"),
  customerID: text("customerID"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const emailTokens = pgTable(
  "email_tokens",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

export const twoFactorTokens = pgTable(
  "two_factor_tokens",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
    userID: text("userID").references(() => users.id, { onDelete: "cascade" }),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  smalldesc: text("smalldesc").notNull(),
  description: text("description").notNull(),
  title: text("title").notNull(),
  created: timestamp("created").defaultNow(),
});

export const productVariants = pgTable("productVariants", {
  id: serial("id").primaryKey(),
  productType: text("productType").notNull(),
  updated: timestamp("updated").defaultNow(),
  price: real("price").notNull(),

  // pirelli values

  pirelliId: text("pirelliId").notNull(),
  ean: text("ean").notNull(),
  eprellLink: text("eprellLink").notNull(),
  fullSize: text("fullSize").notNull(),
  lssc: text("lssc").notNull(),
  rr: text("rr").notNull(),
  wg: text("wg").notNull(),
  prestige: boolean("prestige").notNull().default(false),
  protectieRIM: boolean("protectieRIM").notNull().default(false),
  size: text("size").notNull(),
  productID: serial("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productImages = pgTable("productImages", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  size: real("size").notNull(),
  name: text("name").notNull(),
  order: real("order").notNull(),
  productID: serial("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const variantTags = pgTable("variantTags", {
  id: serial("id").primaryKey(),
  tag: text("tag").notNull(),
  variantID: serial("variantID")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userID: text("userID")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  total: real("total").notNull(),
  status: text("status").notNull(),
  created: timestamp("created").defaultNow(),
  receiptURL: text("receiptURL"),
  paymentIntentID: text("paymentIntentID"),
});

export const orderProduct = pgTable("orderProduct", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  productVariantID: integer("productVariantID")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  orderID: integer("orderID")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productID: integer("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const productRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariants),
  productImages: many(productImages),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ many, one }) => ({
    product: one(products, {
      fields: [productVariants.productID],
      references: [products.id],
    }),
    productImages: many(productImages),
    variantTags: many(variantTags),
  })
);

export const productImagesRelations = relations(productImages, ({ one }) => ({
  products: one(products, {
    fields: [productImages.productID],
    references: [products.id],
  }),
}));

export const variantTagsRelations = relations(variantTags, ({ one }) => ({
  productVariants: one(productVariants, {
    fields: [variantTags.variantID],
    references: [productVariants.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userID],
    references: [users.id],
  }),
  orderProduct: many(orderProduct),
}));

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
  order: one(orders, {
    fields: [orderProduct.orderID],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderProduct.productID],
    references: [products.id],
  }),
  productVariants: one(productVariants, {
    fields: [orderProduct.productVariantID],
    references: [productVariants.id],
  }),
}));
