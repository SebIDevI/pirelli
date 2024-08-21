import ProductType from "@/components/products/product-type";
import { db } from "@/server";
import { productImages, productVariants, variantTags } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Separator } from "@/components/ui/separator";
import formatPrice from "@/lib/format-price";
import ProductPick from "@/components/products/product-pick";
import ProductShowcase from "@/components/products/product-showcase";
import AddCart from "@/components/cart/add-cart";
import Link from "next/link";
import Image from "next/image";
import { GiRaceCar } from "react-icons/gi";
import { PiCarProfileFill, PiVanFill } from "react-icons/pi";
import { BsFillSunFill, BsSnow } from "react-icons/bs";
import { LuSunSnow } from "react-icons/lu";
import { FaCaretDown, FaFlagCheckered } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ProductVariantsWithImagesTags,
  VariantsWithImagesTags,
  VariantsWithProduct,
} from "@/lib/infer-type";
import TransformedRims from "@/components/products/transformed-rims";
import Tagz from "@/components/products/tags";

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
  const variant = await db.query.productVariants.findFirst({
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
  const images = await db.query.productImages.findMany({
    where: eq(productImages.productID, Number(searchParams.productID)),
    orderBy: (productImages, { asc }) => [asc(productImages.order)],
  });

  if (variant) {
    const classes = variant.product.productVariants.map((variant) => ({
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
    console.log(transformedRims);
    const seenRims = new Set<string>();
    return (
      <div className="bg-white dark:bg-black mt-10">
        <h2 className="w-full max-w-[1400px] mx-auto pt-20 mb-6 text-secondary-foreground font-gothamXLight text-xl">
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
            / <span className="font-gothamBlack">{variant.product.title}</span>
          </div>
        </h2>
        <div className="flex flex-col gap-16 w-full max-w-[1400px] 2xl:flex-row items-start justify-between mx-auto font-gothamLight">
          <div className="w-full flex-1">
            <div className="w-full flex">
              <ProductShowcase
                variants={variant.product.productVariants}
                images={images}
              />
            </div>
            <div className="pt-4">
              <Tagz variantTags={variant} />
            </div>
            <h1 className="text-secondary-foreground font-gothamBlack italic text-3xl py-4">
              {variant.product.title}
            </h1>
            <h3
              dangerouslySetInnerHTML={{ __html: variant.product.description }}
              className="text-secondary-foreground text-lg pb-8"
            />
            <p className="text-secondary-foreground font-gothamLight text-lg">
              <span className="font-gotham">{searchParams.name}</span>{" "}
              {searchParams.features}
            </p>

            <div className="py-16">
              <h3 className="text-secondary-foreground font-gothamBlack italic text-2xl pb-8">
                Performance
              </h3>
              <div className="text-secondary-foreground font-gothamBlack">
                <div className="py-2">
                  <span>DRY</span>
                  <Progress
                    value={
                      variant.variantTags
                        .filter((tag) => tag.tag.includes("DRY"))
                        .map((tag) => parseInt(tag.tag.replace("DRY-", "")))[0]
                    }
                  />
                </div>
                <div className="py-2">
                  <span>WET</span>
                  <Progress
                    value={
                      variant.wg === "A"
                        ? 100
                        : variant.wg === "B"
                        ? 80
                        : variant.wg === "C"
                        ? 60
                        : variant.wg === "D"
                        ? 40
                        : variant.wg === "E"
                        ? 20
                        : 0
                    }
                  />
                </div>
                <div className="py-2">
                  <span>SPORT</span>
                  <Progress
                    value={
                      variant.fullSize.split(" ")[1].includes("(Y)")
                        ? 100
                        : variant.fullSize.split(" ")[1].includes("Y")
                        ? 95
                        : variant.fullSize.split(" ")[1].includes("W")
                        ? 88
                        : variant.fullSize.split(" ")[1].includes("Z")
                        ? 81
                        : variant.fullSize.split(" ")[1].includes("V")
                        ? 74
                        : variant.fullSize.split(" ")[1].includes("H")
                        ? 67
                        : variant.fullSize.split(" ")[1].includes("U")
                        ? 60
                        : variant.fullSize.split(" ")[1].includes("T")
                        ? 53
                        : variant.fullSize.split(" ")[1].includes("S")
                        ? 46
                        : variant.fullSize.split(" ")[1].includes("R")
                        ? 39
                        : variant.fullSize.split(" ")[1].includes("Q")
                        ? 32
                        : variant.fullSize.split(" ")[1].includes("N")
                        ? 25
                        : variant.fullSize.split(" ")[1].includes("M")
                        ? 18
                        : variant.fullSize.split(" ")[1].includes("L")
                        ? 11
                        : 0
                    }
                  />
                </div>
                <div className="py-2">
                  <span>MILEAGE</span>
                  <Progress
                    value={
                      variant.variantTags
                        .filter((tag) => tag.tag.includes("MILEAGE"))
                        .map((tag) =>
                          parseInt(tag.tag.replace("MILEAGE-", ""))
                        )[0]
                    }
                  />
                </div>
                <div className="py-2">
                  <span>COMFORT</span>
                  <Progress
                    value={
                      variant.variantTags
                        .filter((tag) => tag.tag.includes("COMFORT"))
                        .map((tag) =>
                          parseInt(tag.tag.replace("COMFORT-", ""))
                        )[0]
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="font-medium w-full flex-1 text-secondary-foreground sticky top-24 pb-14">
            <h1 className="text-4xl pb-2 font-gothamBlack">
              {variant.product.title}
            </h1>
            <div
              className="py-2 text-xl"
              dangerouslySetInnerHTML={{ __html: variant.product.smalldesc }}
            />
            <p className="my-2">
              Mărime selectată:{" "}
              <span className="bg-secondary-foreground/10 px-3 py-0.5 rounded-full">
                {variant.size}
              </span>
            </p>
            <p className="">Alegeți altă mărime: </p>
            <div className="flex gap-2 pb-4">
              <TransformedRims
                transformedRims={transformedRims}
                title={variant.product.title}
                imageUrl={images[0].url}
              />
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-secondary-foreground font-gotham text-2xl">
                <span className="text-sm text-secondary-foreground font-gotham">
                  PREȚ:{" "}
                </span>
                {/* {loading && " Loading..."} */}
                {variant.price && formatPrice(variant.price)}
              </p>
            </div>
            <AddCart />
          </div>
        </div>
      </div>
    );
  }
}
