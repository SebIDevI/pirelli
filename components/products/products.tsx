/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ProductVariantsWithImagesTags } from "@/lib/infer-type";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import formatPrice from "@/lib/format-price";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductsTypes, ProductTypes } from "@/types/filtering-types";
import NoProduct from "./no-product";

export const revalidate = 10;

type VariantTagsIncludingType = {
  id: number;
  variantID: number;
  tag: string;
};
function includesAllTags(
  variantTags: VariantTagsIncludingType[],
  tags: string[]
): boolean {
  return tags.every((tag) =>
    variantTags.some((variantTag) => variantTag.tag === tag)
  );
}

export default function Products({ products }: ProductsTypes) {
  let filtered = [] as ProductTypes[];
  let paramTags: [string[]] = [[]];
  const tagz: string[] = [];
  paramTags.splice(0, 1);

  const { slug } = useParams();

  const searchParams = useSearchParams();
  if (searchParams.size > 0) {
    const params = searchParams
      .toString()
      .replaceAll("+", " ")
      .replaceAll("%2C", ",");

    params.split("&").forEach((value) => {
      paramTags.push(value.split("=")[1].split(", "));
    });
  }

  let trueSlug =
    slug == "p zero" ||
    slug == "pzero" ||
    slug == "p-zero" ||
    slug == "P ZERO" ||
    slug == "PZERO" ||
    slug == "P-ZERO"
      ? "P ZERO"
      : slug === "all-season"
      ? "ALL SEASON"
      : slug === "vara"
      ? "SUMMER"
      : slug;
  if (trueSlug[0] <= "9" && trueSlug[0] >= "0") trueSlug = "";
  else
    paramTags.push([
      (trueSlug as string).replaceAll("%20", "").replaceAll("_", "/"),
    ]);

  console.log(products);
  products
    .filter((product) => product.productVariants.length > 0)
    .forEach((product) => {
      let badProductVariantID: number[] = [];
      let unProdMin = false;

      badProductVariantID.splice(0, 1);
      product.productVariants.forEach((productVariant) => {
        tagz.splice(0, tagz.length);
        let ok = true;
        productVariant.variantTags.forEach((tag) => {
          tagz.push(tag.tag);
        });
        paramTags.forEach((row) => {
          if (row[0][0] < "0" || row[0][0] > "9") {
            let orIndex = 0;
            row.forEach((ptag) => {
              if (tagz.includes(ptag)) orIndex++;
            });
            if (!orIndex) ok = false;
          }
        });
        console.log(productVariant.size);
        if (
          (!tagz.includes(trueSlug as string) && trueSlug !== "") ||
          !(!filtered[0] || filtered[filtered.length - 1].id !== product.id)
        ) {
          ok = false;
        }
        if (!ok) {
          badProductVariantID.push(productVariant.id);
        } else {
          unProdMin = true;
        }
      });
      if (unProdMin) {
        filtered.push(product);
        if (badProductVariantID.length > 0) {
          filtered[filtered.length - 1].productVariants =
            product.productVariants.filter(
              (variant) => !badProductVariantID.includes(variant.id)
            );
        }
      }
    });
  console.log(paramTags);
  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
      {filtered.length > 0 ? (
        filtered.map((product) => (
          <div key={product.id}>
            <Link
              className="pt-2"
              href={`/products/${product.title}?id=${product.productVariants[0].id}&productID=${product.id}&price=${product.productVariants[0].price}&title=${product.title}&type=${product.productVariants[0].productType}&image=${product.productVariants[0].variantImages[0].url}`}
            >
              <Image
                className="rounded-md mb-2 aspect-square"
                src={product.productVariants[0].variantImages[0].url}
                width={720}
                height={480}
                alt={product.productVariants[0].product.title}
                loading="lazy"
              />
              <div className="flex justify-between">
                <div className="font-medium">
                  <h2>{product.productVariants[0].product.title}</h2>
                </div>
                <div>
                  <Badge className="text-sm" variant={"secondary"}>
                    {formatPrice(product.productVariants[0].price)}
                  </Badge>
                </div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              {product.productVariants.map((variant, idx) => (
                <Link
                  href={`/products/${product.title}?id=${product.productVariants[idx].id}&productID=${product.id}&price=${product.productVariants[idx].price}&title=${product.title}&type=${product.productVariants[idx].productType}&image=${product.productVariants[idx].variantImages[0].url}`}
                  key={variant.id}
                >
                  {idx !== product.productVariants.length - 1
                    ? variant.productType + ", "
                    : variant.productType}{" "}
                </Link>
              ))}
            </p>
          </div>
        ))
      ) : (
        <NoProduct />
      )}
    </main>
  );
}
