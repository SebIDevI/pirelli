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
      productVariants: {
        with: {
          variantImages: true,
          variantTags: true,
          product: true,
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
      : params.slug;

  data.forEach((product) => {
    product.productVariants.forEach((variant) => {
      let ect = 0;

      variant.variantTags.forEach((tag) => {
        if (tag.tag === trueSlug) ect = 1;
      });
      variant.variantTags.forEach((tag) => {
        if (ect)
          tag.tag === "ALL SEASON"
            ? tagCount.allSez++
            : tag.tag === "SUMMER"
            ? tagCount.summer++
            : tag.tag === "WINTER"
            ? tagCount.winter++
            : tag.tag === "SUV"
            ? tagCount.suv++
            : tag.tag === "CAR"
            ? tagCount.car++
            : tag.tag === "VAN"
            ? tagCount.van++
            : tag.tag === "elect"
            ? tagCount.elect++
            : tag.tag === "ncs"
            ? tagCount.ncs++
            : tag.tag === "rf"
            ? tagCount.rf++
            : tag.tag === "si"
            ? tagCount.si++
            : tag.tag === "POWERGY"
            ? tagCount.pwg++
            : tag.tag === "P ZERO"
            ? tagCount.pzero++
            : tag.tag === "CINTURATO"
            ? tagCount.cint++
            : tag.tag === "SCORPION"
            ? tagCount.scorp++
            : tag.tag === "CARRIER"
            ? tagCount.carrier++
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
      <div className="w-full h-auto text-primary-foreground relative overflow-hidden py-6">
        <div className="w-full h-full absolute top-0 left-0 bg-black">
          <Image src={tyre} alt="Tyre" className="absolute right-0 scale-90" />
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
                    Sezon
                  </Link>
                  {" > "}
                  <span className="font-gotham">{params.slug}</span>
                </p>
                <h1 className="text-5xl font-gothamBlack py-4 uppercase">
                  Anvelope de {params.slug}
                </h1>
                <p className="text-base">{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ProductTags tagCount={tagCount} avoid="Toate sezoanele" />
        <Products products={data} />
      </div>
    </div>
  );
}

export default Page;
