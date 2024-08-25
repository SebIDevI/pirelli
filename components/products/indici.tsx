"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { InferResultType } from "@/lib/infer-type";

type ProductVariantsWithImagesTags = InferResultType<
  "productVariants",
  { variantTags: true; product: { with: { productImages: true } } }
>;

export default function Indici({
  variants,
  fullSize,
  omologare,
  tech,
}: {
  variants: ProductVariantsWithImagesTags[];
  fullSize: string;
  omologare: string;
  tech: string;
}) {
  const sortedVariants = variants.sort((a, b) => {
    const rimA = a.fullSize.split(" ")[1];
    const rimB = b.fullSize.split(" ")[1];

    return rimA.localeCompare(rimB);
  });
  const noDupsVariants = variants.filter((variant, index, arr) => {
    if (index === 0) return true; // Keep the first element
    const previousVariant = arr[index - 1];

    const rimCurrent = variant.fullSize
      .split(" ")[1]
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("XL", "");

    const rimPrevious = previousVariant.fullSize
      .split(" ")[1]
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("XL", "");

    // Return true if the current rim is different from the previous one
    return rimCurrent !== rimPrevious;
  });
  const noDupsIndiceViteza = sortedVariants
    .filter((variant, index, arr) => {
      if (
        (index === 0 || !arr[index - 1]) &&
        variant.fullSize.split(" ")[1] === fullSize.split(" ")[1]
      )
        return true; // Keep the first element
      if (!arr[index - 1]) return false;

      // Return true if the current rim is different from the previous one
      return variant.fullSize.split(" ")[1] === fullSize.split(" ")[1];
    })
    .filter((variant, index, arr) => {
      if (
        (index === 0 || !arr[index - 1]) &&
        variant.fullSize.split(" ")[1] === fullSize.split(" ")[1]
      )
        return true; // Keep the first element
      if (!arr[index - 1]) return false;
      const previousVariant = arr[index - 1];

      const rimCurrent = variant.fullSize.split(" ")[0].includes("CP")
        ? "CP"
        : variant.fullSize.split(" ")[0].includes("C")
        ? "C"
        : variant.fullSize.includes("XL")
        ? "XL"
        : "-";

      const rimPrevious = previousVariant.fullSize.split(" ")[0].includes("CP")
        ? "CP"
        : previousVariant.fullSize.split(" ")[0].includes("C")
        ? "C"
        : previousVariant.fullSize.includes("XL")
        ? "XL"
        : "-";

      // Return true if the current rim is different from the previous one
      return rimCurrent !== rimPrevious;
    });
  const noDupsOmologare = sortedVariants
    .filter((variant, index, arr) => {
      if (
        (index === 0 || !arr[index - 1]) &&
        variant.fullSize.split(" ")[1] === fullSize.split(" ")[1] &&
        variant.fullSize.includes("XL") === fullSize.includes("XL") &&
        variant.fullSize.split(" ")[0].includes("CP") ===
          fullSize.split(" ")[0].includes("CP") &&
        variant.fullSize.split(" ")[0].includes("C") ===
          fullSize.split(" ")[0].includes("C")
      )
        return true; // Keep the first element
      if (!arr[index - 1]) return false;

      // Return true if the current rim is different from the previous one
      return (
        variant.fullSize.split(" ")[1] === fullSize.split(" ")[1] &&
        variant.fullSize.includes("XL") === fullSize.includes("XL") &&
        variant.fullSize.split(" ")[0].includes("CP") ===
          fullSize.split(" ")[0].includes("CP") &&
        variant.fullSize.split(" ")[0].includes("C") ===
          fullSize.split(" ")[0].includes("C")
      );
    })
    .filter((variant, index, arr) => {
      if (index === 0) return true; // Keep the first element
      const previousVariant = arr[index - 1];

      const rimCurrent = variant.variantTags.filter(
        (v) =>
          v.tag.includes("Omologare: ") &&
          v.variantID === variant.id &&
          variant.productID === variants[0].product.id
      ).length
        ? variant.variantTags
            .filter((v) => v.tag.includes("Omologare: "))[0]
            .tag.replace("Omologare: ", "")
        : "-";

      const rimPrevious = previousVariant.variantTags.filter((v) =>
        v.tag.includes("Omologare: ")
      ).length
        ? previousVariant.variantTags
            .filter((v) => v.tag.includes("Omologare: "))[0]
            .tag.replace("Omologare: ", "")
        : "-";

      // Return true if the current rim is different from the previous one
      return rimCurrent !== rimPrevious;
    });
  const noDupsTech = sortedVariants
    .filter((variant, index, arr) => {
      if (
        (index === 0 || !arr[index - 1]) &&
        variant.fullSize.split(" ")[1] === fullSize.split(" ")[1] &&
        variant.fullSize.includes("XL") === fullSize.includes("XL") &&
        variant.fullSize.split(" ")[0].includes("CP") ===
          fullSize.split(" ")[0].includes("CP") &&
        variant.fullSize.split(" ")[0].includes("C") ===
          fullSize.split(" ")[0].includes("C") &&
        ((omologare !== "-" &&
          variant.variantTags.filter(
            (v) =>
              v.tag.includes("Omologare: ") &&
              v.tag.replace("Omologare: ", "") === omologare
          ).length) ||
          (omologare === "-" &&
            variant.variantTags.filter((v) => v.tag.includes("Omologare: "))
              .length === 0))
      )
        return true; // Keep the first element
      if (!arr[index - 1]) return false;
      // Return true if the current rim is different from the previous one
      return (
        variant.fullSize.split(" ")[1] === fullSize.split(" ")[1] &&
        variant.fullSize.includes("XL") === fullSize.includes("XL") &&
        variant.fullSize.split(" ")[0].includes("CP") ===
          fullSize.split(" ")[0].includes("CP") &&
        variant.fullSize.split(" ")[0].includes("C") ===
          fullSize.split(" ")[0].includes("C") &&
        ((omologare !== "-" &&
          variant.variantTags.filter(
            (v) =>
              v.tag.includes("Omologare: ") &&
              v.tag.replace("Omologare: ", "") === omologare
          ).length) ||
          (omologare === "-" &&
            variant.variantTags.filter((v) => v.tag.includes("Omologare: "))
              .length === 0))
      );
    })
    .filter((variant, index, arr) => {
      if (index === 0) return true; // Keep the first element
      const previousVariant = arr[index - 1];

      const rimCurrent = variant.variantTags.filter(
        (v) =>
          (v.tag === "s-i" ||
            v.tag === "r-f" ||
            v.tag === "ncs" ||
            v.tag === "elect") &&
          v.variantID === variant.id &&
          variant.productID === variants[0].product.id
      ).length
        ? variant.variantTags.filter(
            (v) =>
              (v.tag === "s-i" ||
                v.tag === "r-f" ||
                v.tag === "ncs" ||
                v.tag === "elect") &&
              v.variantID === variant.id &&
              variant.productID === variants[0].product.id
          )[0].tag
        : "-";

      const rimPrevious = previousVariant.variantTags.filter(
        (v) =>
          (v.tag === "s-i" ||
            v.tag === "r-f" ||
            v.tag === "ncs" ||
            v.tag === "elect") &&
          v.variantID === variant.id &&
          variant.productID === variants[0].product.id
      ).length
        ? previousVariant.variantTags.filter(
            (v) =>
              (v.tag === "s-i" ||
                v.tag === "r-f" ||
                v.tag === "ncs" ||
                v.tag === "elect") &&
              v.variantID === previousVariant.id &&
              previousVariant.productID === variants[0].product.id
          )[0].tag
        : "-";

      // Return true if the current rim is different from the previous one
      return rimCurrent !== rimPrevious;
    });
  return (
    <div className="flex flex-wrap justify-start items-center gap-x-12 gap-y-4">
      <div className="space-y-2">
        <span>Indice încărcare / viteză: </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg p-1 px-3 flex items-center justify-center gap-2">
            {fullSize.split(" ")[1].replaceAll("XL", "")}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {noDupsVariants.map((variant, i) => (
              <DropdownMenuItem key={i}>
                <Link
                  href={`/products/${variant.product.title}?id=${variant.id}&productID=${variant.productID}&price=${variant.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.product.productImages[0].url}`}
                  scroll={false}
                  className="w-full"
                >
                  {variant.fullSize.split(" ")[1].replaceAll("XL", "")}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2">
        <span>Extra Load: </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg p-1 px-3 flex items-center justify-center gap-2">
            {fullSize.split(" ")[0].includes("C")
              ? "C"
              : fullSize.split(" ")[0].includes("CP")
              ? "CP"
              : fullSize.includes("XL")
              ? "XL"
              : "-"}{" "}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {noDupsIndiceViteza.map((variant, i) => (
              <DropdownMenuItem key={i}>
                <Link
                  href={`/products/${variant.product.title}?id=${variant.id}&productID=${variant.productID}&price=${variant.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.product.productImages[0].url}`}
                  scroll={false}
                  className="w-full"
                >
                  {variant.fullSize.split(" ")[0].includes("C")
                    ? "C"
                    : variant.fullSize.split(" ")[0].includes("CP")
                    ? "CP"
                    : variant.fullSize.includes("XL")
                    ? "XL"
                    : "-"}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2">
        <span>Omologare: </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg p-1 px-3 flex items-center justify-center gap-2">
            {omologare}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {noDupsOmologare.map((variant, i) => (
              <DropdownMenuItem key={i}>
                <Link
                  href={`/products/${variant.product.title}?id=${variant.id}&productID=${variant.productID}&price=${variant.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.product.productImages[0].url}`}
                  scroll={false}
                  className="w-full"
                >
                  {variant.variantTags.filter((v) =>
                    v.tag.includes("Omologare: ")
                  )[0]
                    ? variant.variantTags
                        .filter((v) => v.tag.includes("Omologare: "))[0]
                        .tag.replace("Omologare: ", "")
                    : "-"}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2">
        <span>Tehnologie: </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg p-1 px-3 flex items-center justify-center gap-2">
            {tech
              .replaceAll("elect", "ELECT™")
              .replaceAll("ncs", "PNCS™")
              .replaceAll("s-i", "SEAL INSIDE™")
              .replaceAll("r-f", "RUN FLAT")}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {noDupsTech.map((variant, i) => (
              <DropdownMenuItem key={i}>
                <Link
                  href={`/products/${variant.product.title}?id=${variant.id}&productID=${variant.productID}&price=${variant.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.product.productImages[0].url}`}
                  scroll={false}
                  className="w-full"
                >
                  {variant.variantTags.filter(
                    (v) =>
                      (v.tag === "s-i" ||
                        v.tag === "r-f" ||
                        v.tag === "ncs" ||
                        v.tag === "elect") &&
                      v.variantID === variant.id
                  ).length
                    ? variant.variantTags
                        .filter(
                          (v) =>
                            (v.tag === "s-i" ||
                              v.tag === "r-f" ||
                              v.tag === "ncs" ||
                              v.tag === "elect") &&
                            v.variantID === variant.id
                        )[0]
                        .tag.replaceAll("elect", "ELECT™")
                        .replaceAll("ncs", "PNCS™")
                        .replaceAll("s-i", "SEAL INSIDE™")
                        .replaceAll("r-f", "RUN FLAT")
                    : "-"}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
