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
import Technology from "@/components/products/technology";
import Reviews from "@/components/reviews/reviews";
import { getReviewAverage } from "@/lib/review-average";
import Stars from "@/components/reviews/stars";

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
          reviews: true,
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
    title: variantWID!.product.title,
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

  if (variantWID) {
    const reviewAvg = getReviewAverage(
      variantWID.product.reviews.map((r) => r.rating)
    );
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
                {variantWID.product.title}
              </span>
            </div>
          </h2>
          <div className="flex flex-col gap-16 w-full lg:flex-row items-start justify-between font-gothamLight">
            <div className="w-full flex-1">
              <div className="w-full flex">
                <ProductShowcase images={images} />
              </div>
              <div className="pt-4">
                <Tagz
                  variantTags={variantWID!}
                  title={variantWID.product.title}
                />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-secondary-foreground font-gothamBlack italic text-5xl py-4">
                  {variantWID.product.title}
                </h1>
                <h3
                  dangerouslySetInnerHTML={{
                    __html: variantWID.product.description,
                  }}
                  className="text-secondary-foreground text-lg font-gothamBook pb-8"
                />
                <p className="text-secondary-foreground font-gothamLight text-lg">
                  <span className="font-gotham">{searchParams.name}</span>{" "}
                  {searchParams.features}
                </p>
                <Performance variantWID={variantWID} />
              </div>
            </div>
            <div className="font-medium w-full flex-1 text-secondary-foreground lg:sticky top-24">
              <h1 className="text-5xl pb-2 font-gothamBlack">
                {variantWID.product.title}
              </h1>
              <div
                className="py-2 text-xl"
                dangerouslySetInnerHTML={{
                  __html: variantWID!.product.smalldesc,
                }}
              />
              <Stars
                rating={reviewAvg}
                totalReviews={variantWID.product.reviews.length}
              />
              <p className="my-2">
                Mărime selectată:{" "}
                <span className="bg-secondary-foreground/10 px-3 py-0.5 rounded-full">
                  {variantWID.size}
                </span>
              </p>
              <div className="space-y-4 my-6">
                <div className="space-y-2">
                  <p className="">Alegeți altă mărime: </p>
                  <div className="flex gap-2">
                    <TransformedRims
                      transformedRims={transformedRims}
                      title={variantWID.product.title}
                      imageUrl={images[0].url}
                    />
                  </div>
                </div>
                <Indici
                  variants={variants}
                  fullSize={variantWID.fullSize}
                  omologare={
                    variantWID!.variantTags.filter((v) =>
                      v.tag.includes("Omologare: ")
                    ).length
                      ? variantWID.variantTags
                          .filter((v) => v.tag.includes("Omologare: "))[0]
                          .tag.replace("Omologare: ", "")
                      : "-"
                  }
                  tech={
                    variantWID.variantTags.filter(
                      (v) =>
                        v.tag === "s-i" ||
                        v.tag === "r-f" ||
                        v.tag === "ncs" ||
                        v.tag === "elect"
                    ).length
                      ? variantWID.variantTags.filter(
                          (v) =>
                            v.tag === "s-i" ||
                            v.tag === "r-f" ||
                            v.tag === "ncs" ||
                            v.tag === "elect"
                        )[0].tag
                      : "-"
                  }
                />
              </div>
              <div className="flex gap-2 pt-4">
                <p className="font-bold text-secondary-foreground font-gotham text-2xl">
                  <span className="text-sm text-secondary-foreground font-gotham">
                    PREȚ:{" "}
                  </span>
                  {/* {loading && " Loading..."} */}
                  {variantWID.price && formatPrice(variantWID!.price)}
                </p>
              </div>
              <AddCart />
            </div>
            <div className="lg:hidden block">
              <h1 className="text-secondary-foreground font-gothamBlack italic text-5xl py-4">
                {variantWID.product.title}
              </h1>
              <h3
                dangerouslySetInnerHTML={{
                  __html: variantWID.product.description,
                }}
                className="text-secondary-foreground text-lg font-gothamBook pb-8"
              />
              <p className="text-secondary-foreground font-gothamLight text-lg">
                <span className="font-gotham">{searchParams.name}</span>{" "}
                {searchParams.features}
              </p>
              <Performance variantWID={variantWID} />
            </div>
          </div>
          <Technology variantWID={variantWID} />
          <Reviews productID={variantWID.productID} />
        </div>
      </div>
    );
  }
}
