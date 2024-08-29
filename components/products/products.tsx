/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import formatPrice from "@/lib/format-price";
import { useParams, useSearchParams } from "next/navigation";
import { ProductsTypes } from "@/types/filtering-types";
import NoProduct from "./no-product";
import Tagz from "./tags";
import { useFilterStore } from "@/lib/filter-store";
import { useEffect } from "react";
import { useLoadingStore } from "@/lib/search-store";
import { Skeleton } from "../ui/skeleton";

export const revalidate = 10;

export default function Products({ products }: ProductsTypes) {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useLoadingStore();
  const { filteredProducts, initializeParamTags, filterProducts } =
    useFilterStore();

  useEffect(() => {
    const params = searchParams.toString();
    initializeParamTags(params, slug as string);
  }, [searchParams, slug, initializeParamTags]);

  useEffect(() => {
    filterProducts(products);
    setIsLoading(false);
  }, [products, filterProducts]);

  if (isLoading)
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3 mt-16">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton
              key={index}
              className="w-full rounded-xl aspect-square bg-[#e6e6e6]"
            />
            <div className="flex gap-4">
              <Skeleton
                key={index}
                className="w-full rounded-full h-6 bg-[#e6e6e6]"
              />
              <Skeleton
                key={index}
                className="w-[30%] rounded-full h-6 bg-[#e6e6e6]"
              />
            </div>
            <Skeleton
              key={index}
              className="w-full rounded-full h-6 bg-[#e6e6e6]"
            />
          </div>
        ))}
      </div>
    );

  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id}>
            <Link
              className="pt-2 text-secondary-foreground dark:text-secondary"
              href={`/products/${product.title}?id=${product.productVariants[0].id}&productID=${product.id}&price=${product.productVariants[0].price}&title=${product.title}&type=${product.productVariants[0].productType}&image=${product.productImages[0].url}`}
            >
              <Image
                className="rounded-md aspect-square bg-white"
                src={
                  product.productImages.filter((img) => img.order === 0)[0].url
                }
                width={720}
                height={480}
                alt={product.productVariants[0].product.title}
                loading="lazy"
              />
              <Tagz
                variantTags={product.productVariants[0]}
                page="choosing"
                title={product.title}
              />
              <div className="flex justify-between gap-2">
                <div className="font-medium">
                  <h2 className="text-2xl font-gothamBlack">
                    <span className="hoverAnim">
                      {product.productVariants[0].product.title} -{" "}
                      {product.productVariants[0].size}
                    </span>
                  </h2>
                </div>
                <div>
                  <Badge className="text-base" variant={"default"}>
                    {formatPrice(product.productVariants[0].price)}
                  </Badge>
                </div>
              </div>
              <p className="font-gothamLight">{product.smalldesc}</p>
            </Link>

            <Link
              href={`/products/${product.title}?id=${product.productVariants[0].id}&productID=${product.id}&price=${product.productVariants[0].price}&title=${product.title}&type=${product.productVariants[0].productType}&image=${product.productImages[0].url}`}
              className="text-sm text-muted-foreground underline"
            >
              Vedeți toate mărimile aici
            </Link>
          </div>
        ))
      ) : (
        <NoProduct />
      )}
    </main>
  );
}
