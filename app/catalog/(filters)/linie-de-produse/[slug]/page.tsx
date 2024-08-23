import Link from "next/link";
import React from "react";
import tyre from "@/public/index/pzero_tyre.png";
import Image from "next/image";
import ProductTags from "@/components/products/product-tags";
import Products from "@/components/products/products";
import { db } from "@/server";

export const revalidate = 0;

async function Page({ params }: { params: { slug: string } }) {
  const data = await db.query.products.findMany({
    with: {
      productImages: true,
      productVariants: {
        with: {
          variantTags: true,
          product: { with: { productImages: true } },
        },
      },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  let tagCount = {
    allSez: 0,
    summer: 0,
    winter: 0,
    suv: 0,
    car: 0,
    van: 0,
    elect: 0,
    ncs: 0,
    rf: 0,
    si: 0,
    pwg: 0,
    pzero: 0,
    cint: 0,
    scorp: 0,
    carrier: 0,
  };
  const trueSlug =
    params.slug == "p zero" ||
    params.slug == "pzero" ||
    params.slug == "p-zero" ||
    params.slug == "P ZERO" ||
    params.slug == "PZERO" ||
    params.slug == "P-ZERO"
      ? "P ZERO"
      : params.slug == "all-season"
      ? "ALL SEASON"
      : params.slug === "vara"
      ? "SUMMER"
      : params.slug === "carrier"
      ? "CARRIER"
      : params.slug.toUpperCase();

  data.forEach((product) => {
    let tagV = {
      allSez: 0,
      summer: 0,
      winter: 0,
      suv: 0,
      car: 0,
      van: 0,
      elect: 0,
      ncs: 0,
      rf: 0,
      si: 0,
      pwg: 0,
      pzero: 0,
      cint: 0,
      scorp: 0,
      carrier: 0,
    };
    product.productVariants.forEach((variant) => {
      let ect = 0;

      variant.variantTags.forEach((tag) => {
        if (tag.tag === trueSlug) ect = 1;
      });
      variant.variantTags.forEach((tag) => {
        if (ect)
          tag.tag === "ALL SEASON" && !tagV.allSez
            ? tagCount.allSez++
            : tag.tag === "SUMMER" && !tagV.summer
            ? tagCount.summer++
            : tag.tag === "WINTER" && !tagV.winter
            ? tagCount.winter++
            : tag.tag === "SUV" && !tagV.suv
            ? tagCount.suv++
            : tag.tag === "CAR" && !tagV.car
            ? tagCount.car++
            : tag.tag === "VAN" && !tagV.van
            ? tagCount.van++
            : tag.tag === "elect" && !tagV.elect
            ? tagCount.elect++
            : tag.tag === "ncs" && !tagV.ncs
            ? tagCount.ncs++
            : tag.tag === "r-f" && !tagV.rf
            ? tagCount.rf++
            : tag.tag === "s-i" && !tagV.si
            ? tagCount.si++
            : tag.tag === "POWERGY" && !tagV.pwg
            ? tagCount.pwg++
            : tag.tag === "P ZERO" && !tagV.pzero
            ? tagCount.pzero++
            : tag.tag === "CINTURATO" && !tagV.cint
            ? tagCount.cint++
            : tag.tag === "SCORPION" && !tagV.scorp
            ? tagCount.scorp++
            : tag.tag.includes("CARRIER") && !tagV.carrier
            ? tagCount.carrier++
            : null;
        tag.tag === "ALL SEASON"
          ? (tagV.allSez = 1)
          : tag.tag === "SUMMER"
          ? (tagV.summer = 1)
          : tag.tag === "WINTER"
          ? (tagV.winter = 1)
          : tag.tag === "SUV"
          ? (tagV.suv = 1)
          : tag.tag === "CAR"
          ? (tagV.car = 1)
          : tag.tag === "VAN"
          ? (tagV.van = 1)
          : tag.tag === "elect"
          ? (tagV.elect = 1)
          : tag.tag === "ncs"
          ? (tagV.ncs = 1)
          : tag.tag === "r-f"
          ? (tagV.rf = 1)
          : tag.tag === "s-i"
          ? (tagV.si = 1)
          : tag.tag === "POWERGY"
          ? (tagV.pwg = 1)
          : tag.tag === "P ZERO"
          ? (tagV.pzero = 1)
          : tag.tag === "CINTURATO"
          ? (tagV.cint = 1)
          : tag.tag === "SCORPION"
          ? (tagV.scorp = 1)
          : tag.tag.includes("CARRIER")
          ? (tagV.carrier = 1)
          : null;
      });
    });
  });

  params.slug = params.slug.includes("-")
    ? params.slug.replaceAll("-", " ")
    : params.slug;
  const desc =
    params.slug == "p zero" ||
    params.slug == "pzero" ||
    params.slug == "p-zero" ||
    params.slug == "P ZERO" ||
    params.slug == "PZERO" ||
    params.slug == "P-ZERO"
      ? "Gama P Zero™ combină experiența și colaborările Pirelli cu cei mai mari producători pentru a asigura performanțe de vârf pentru conducător în orice moment."
      : params.slug == "cinturato"
      ? "O gamă de produse pentru conducătorii care preferă anvelopele cu o rezistență scăzută la rulare, care combină standardele tradiționale înalte de performanță și siguranță Pirelli."
      : params.slug == "scorpion"
      ? "Ești în căutarea celor mai potrivite anvelope pentru automobilul tău? Pirelli îți oferă o gamă largă de anvelope auto concepute pentru nevoile tale."
      : params.slug == "sottozero"
      ? "Gama extinsă Pirelli, rezultatul anilor de cercetare și inovație continuă, include gama de anvelope Pirelli Sottozero™ dedicată în mod special iernii și celor mai nefavorabile condiții meteorologice."
      : "";

  return (
    <div className="bg-gradient-to-b to-[#ffffff] from-[#e0e0e0] bg-fixed font-gotham pb-10">
      <div className="w-full h-auto min-h-[50vh] text-secondary-foreground relative overflow-hidden py-6">
        <div className="w-full h-full absolute top-0 left-0 bg-secondary">
          <Image
            src={tyre}
            alt="Tyre"
            className="absolute right-0 scale-[.8]"
          />
        </div>
        <div className="w-full h-full relative mt-10 container">
          <div className="w-full h-full flex items-center py-14 gap-2">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="md:w-1/2">
                <p className="font-gothamLight uppercase text-sm">
                  <Link
                    href={"/"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-500"
                  >
                    Homepage
                  </Link>{" "}
                  /{" "}
                  <Link
                    href={"/catalog"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-500"
                  >
                    Catalog anvelope
                  </Link>{" "}
                  /{" "}
                  <Link
                    href={"/catalog"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-500"
                  >
                    Familie
                  </Link>
                  {" > "}
                  <span className="font-gotham">{params.slug}™️</span>
                </p>
                <h1 className="text-5xl font-gothamBlack py-4 uppercase">
                  Gama {params.slug}™️
                </h1>
                <p className="text-base">{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ProductTags tagCount={tagCount} avoid="Toate familiile" />
        <Products products={data} />
      </div>
    </div>
  );
}

export default Page;
