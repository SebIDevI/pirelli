import ProductType from "@/components/products/product-type";
import { db } from "@/server";
import { productVariants, variantTags } from "@/server/schema";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export const revalidate = 60 * 60;

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
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
            with: { variantImages: true, variantTags: true },
          },
        },
      },
      variantImages: true,
      variantTags: true,
    },
  });
  if (variant) {
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
          <div className="w-full">
            <div className="w-full flex">
              <ProductShowcase variants={variant.product.productVariants} />
            </div>
            <div>
              <ul className="flex gap-2 pt-8 text-secondary-foreground">
                {/* <GiRaceCar className="text-4xl text-yellow-400" /> */}
                {/* CAR */}
                {variant.variantTags.map((tag, i) => {
                  return (
                    <>
                      {tag.tag === "CAR" ? (
                        <>
                          <li
                            key={i}
                            className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1"
                          >
                            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                              <GiRaceCar className="text-4xl" />
                              CAR
                            </div>
                          </li>
                        </>
                      ) : tag.tag === "VAN" ? (
                        <>
                          <li
                            key={i}
                            className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1"
                          >
                            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                              <PiVanFill className="text-xl" />
                              VAN
                            </div>
                          </li>
                        </>
                      ) : tag.tag === "SUV" ? (
                        <>
                          <li
                            key={i}
                            className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1"
                          >
                            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                              <PiCarProfileFill className="text-xl" />
                              SUV
                            </div>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {/* <BsFillSunFill className="text-xl text-black" />
                  SUMMER */}
                      {tag.tag.includes("SUMMER") ? (
                        <>
                          <li className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1">
                            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                              <BsFillSunFill className="text-xl" />
                              SUMMER
                            </div>
                          </li>
                        </>
                      ) : tag.tag.includes("WINTER") ? (
                        <>
                          <li
                            key={i}
                            className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1"
                          >
                            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                              <BsSnow className="text-xl" />
                              WINTER
                            </div>
                          </li>
                        </>
                      ) : tag.tag.includes("ALLSEASON") ||
                        tag.tag.includes("ALL SEASON") ? (
                        <>
                          <li
                            key={i}
                            className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1"
                          >
                            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                              <LuSunSnow className="text-xl" />
                              ALL SEASON
                            </div>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
                {variant.fullSize.split(" ")[1].includes("W") && (
                  <li className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-secondary rounded p-2 py-1">
                    <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                      <FaFlagCheckered className="text-xl" />
                      Sport
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <h1 className="text-secondary-foreground font-gothamBlack italic text-3xl py-4">
              {variant.product.title}
            </h1>
            <h3
              dangerouslySetInnerHTML={{ __html: variant.product.description }}
              className="text-secondary-foreground font-gotham text-lg pb-8"
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
                  <Progress value={50} />
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
                  <Progress value={50} />
                </div>
                <div className="py-2">
                  <span>COMFORT</span>
                  <Progress value={50} />
                </div>
              </div>
            </div>
          </div>
          <div className="font-medium w-full text-secondary-foreground sticky top-24 pb-14">
            <h1 className="text-4xl pb-2 font-gothamBlack">
              {variant.product.title}
            </h1>
            <div
              className="py-2 text-xl"
              dangerouslySetInnerHTML={{ __html: variant.product.description }}
            />
            {/* <p className="py-2">{searchParams.features}</p> */}
            {/* <div className="flex flex-wrap gap-6">
              <div>
                <p className="font-gothamBlack text-lg">SIZE:</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className="my-2" asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {variant.size} <FaCaretDown className="mb-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select the tyre size</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={variant.size}
                      // onValueChange={setPosition}
                    >
                      {variant.product.productVariants.filter((vari) => vari.productID === variant.productID).map((vari, i) => {
                          return (
                            <DropdownMenuRadioItem
                              value={vari.size}
                              key={i}
                              // defaultChecked={i === 0 && !position}
                            >
                              {vari.size}
                            </DropdownMenuRadioItem>
                          );
                        })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <p className="font-gothamBlack text-lg">LOAD SPEED INDEX:</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className="my-2" asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {positionLSI} <FaCaretDown className="mb-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                      Select the load speed index
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={positionLSI}
                      onValueChange={setPositionLSI}
                    >
                      {allProdsAfterFilter.prods
                        ?.filter(
                          (prod) =>
                            prod.name === searchParams.name &&
                            prod.size === position
                        )
                        .map((prod, i) => {
                          return (
                            <DropdownMenuRadioItem
                              key={i}
                              value={prod.descProd.split(" ")[1]}
                              defaultChecked={i === 0 && !positionLSI}
                            >
                              {prod.descProd.split(" ")[1]}
                            </DropdownMenuRadioItem>
                          );
                        })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <p className="font-gothamBlack text-lg">Marked:</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className="my-2" asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {positionOE} <FaCaretDown className="mb-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                      Select the car you want <br /> this tyre for
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={positionOE}
                      onValueChange={setpositionOE}
                    >
                      {allProdsAfterFilter.prods
                        ?.filter(
                          (prod) =>
                            prod.name === searchParams.name &&
                            prod.size === position &&
                            prod.descProd.split(" ")[1] === positionLSI
                        )
                        .map((prod, i) => {
                          return (
                            <DropdownMenuRadioItem
                              key={i}
                              value={prod.OE}
                              defaultChecked={i === 0 && !positionOE}
                            >
                              {prod.OE}
                            </DropdownMenuRadioItem>
                          );
                        })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div> */}
            <div className="flex gap-2">
              <p className="font-bold text-secondary-foreground font-gotham text-2xl">
                <span className="text-sm text-secondary-foreground font-gotham">
                  PRICE:{" "}
                </span>
                {/* {loading && " Loading..."} */}
                {variant.price && formatPrice(variant.price)}
              </p>
            </div>
            <p className="py-2">SIZES: </p>
            <div className="flex gap-4 ">
              {variant.product.productVariants.map((prodVariant, i) => (
                <ProductPick
                  key={i}
                  id={prodVariant.id}
                  size={prodVariant.size}
                  productType={prodVariant.productType}
                  title={variant.product.title}
                  price={prodVariant.price}
                  productID={prodVariant.productID}
                  image={variant.variantImages[0].url}
                />
              ))}
            </div>
            <AddCart />
          </div>
        </div>
      </div>
    );
  }
}
