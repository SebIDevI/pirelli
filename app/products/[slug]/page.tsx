import { db } from "@/server";
import { productImages, productVariants, variantTags } from "@/server/schema";
import { and, eq } from "drizzle-orm";
import formatPrice from "@/lib/format-price";
import ProductShowcase from "@/components/products/product-showcase";
import AddCart from "@/components/cart/add-cart";
import Link from "next/link";
import { VariantsWithImagesTags } from "@/lib/infer-type";
import TransformedRims from "@/components/products/transformed-rims";
import Tagz from "@/components/products/tags";
import Indici from "@/components/products/indici";
import Performance from "@/components/products/performance";

export const revalidate = 60 * 60;

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  if (data) {
    const slugID = data.map((variant) => ({ slug: variant.id.toString() }));
    return slugID;
  }
  return [];
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const variantWID = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, Number(searchParams.id)),
    with: {
      product: {
        with: {
          productVariants: {
            with: { variantTags: true },
          },
        },
      },
      variantTags: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.size)],
  });
  const variants = await db.query.productVariants.findMany({
    where: and(
      eq(productVariants.size, variantWID!.size),
      eq(productVariants.productID, variantWID!.productID)
    ),
    with: {
      product: {
        with: {
          productVariants: {
            with: { variantTags: true },
          },
          productImages: true,
        },
      },
      variantTags: true,
    },
  });
  const images = await db.query.productImages.findMany({
    where: eq(productImages.productID, Number(searchParams.productID)),
    orderBy: (productImages, { asc }) => [asc(productImages.order)],
  });
  const classes = variantWID!.product.productVariants.map((variant) => ({
    rim: variant.size.slice(-3),
    ...variant,
  }));
  classes.sort((a, b) => {
    const rimA = parseInt(a.rim.slice(1));
    const rimB = parseInt(b.rim.slice(1));

    return rimA - rimB;
  });
  const transformedRims = classes.reduce((acc, item) => {
    if (!acc[item.rim]) {
      acc[item.rim] = []; // Initialize an array if it doesn't exist
    }
    acc[item.rim].push(item); // Push the item into the corresponding array
    return acc;
  }, {} as Record<string, VariantsWithImagesTags[]>);
  return (
    <div className="bg-white dark:bg-black pt-10">
      <div className="container">
        <h2 className="w-full pt-20 mb-6 text-secondary-foreground font-gothamXLight text-xl">
          <div className="font-gothamBook uppercase text-sm">
            <Link
              href={"/"}
              className="uppercase font-normal relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-primary hover:after:w-full after:transition-all after:duration-500"
            >
              Homepage
            </Link>{" "}
            /{" "}
            <Link
              href={"/catalog"}
              className="uppercase font-normal relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-primary hover:after:w-full after:transition-all after:duration-500"
            >
              Catalog anvelope
            </Link>{" "}
            /{" "}
            <span className="font-gothamBlack">
              {variantWID!.product.title}
            </span>
          </div>
        </h2>
        <div className="flex flex-col gap-16 w-full 2xl:flex-row items-start justify-between font-gothamLight">
          <div className="w-full flex-1">
            <div className="w-full flex">
              <ProductShowcase images={images} />
            </div>
            <div className="pt-4">
              <Tagz variantTags={variantWID!} />
            </div>
            <h1 className="text-secondary-foreground font-gothamBlack italic text-3xl py-4">
              {variantWID!.product.title}
            </h1>
            <h3
              dangerouslySetInnerHTML={{
                __html: variantWID!.product.description,
              }}
              className="text-secondary-foreground text-lg pb-8"
            />
            <p className="text-secondary-foreground font-gothamLight text-lg">
              <span className="font-gotham">{searchParams.name}</span>{" "}
              {searchParams.features}
            </p>
            <Performance variantWID={variantWID!} />
          </div>
          <div className="font-medium w-full flex-1 text-secondary-foreground sticky top-24 pb-14">
            <h1 className="text-4xl pb-2 font-gothamBlack">
              {variantWID!.product.title}
            </h1>
            <div
              className="py-2 text-xl"
              dangerouslySetInnerHTML={{
                __html: variantWID!.product.smalldesc,
              }}
            />
            <p className="my-2">
              Mărime selectată:{" "}
              <span className="bg-secondary-foreground/10 px-3 py-0.5 rounded-full">
                {variantWID!.size}
              </span>
            </p>
            <div className="flex items-start gap-10 flex-wrap">
              <div>
                <p className="">Alegeți altă mărime: </p>
                <div className="flex gap-2">
                  <TransformedRims
                    transformedRims={transformedRims}
                    title={variantWID!.product.title}
                    imageUrl={images[0].url}
                  />
                </div>
              </div>
              <Indici variants={variants} fullSize={variantWID!.fullSize} />
            </div>
            <p className="py-2">
              Omologare:{" "}
              {variantWID!.variantTags.filter((v) =>
                v.tag.includes("Omologare: ")
              ).length
                ? variantWID!.variantTags
                    .filter((v) => v.tag.includes("Omologare: "))[0]
                    .tag.replace("Omologare: ", "")
                : "-"}
            </p>
            <div className="flex gap-2">
              <p className="font-bold text-secondary-foreground font-gotham text-2xl">
                <span className="text-sm text-secondary-foreground font-gotham">
                  PREȚ:{" "}
                </span>
                {/* {loading && " Loading..."} */}
                {variantWID!.price && formatPrice(variantWID!.price)}
              </p>
            </div>
            <AddCart />
          </div>
        </div>
      </div>
    </div>
  );
}
