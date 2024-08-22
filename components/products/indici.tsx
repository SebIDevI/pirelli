"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { ProductVariantsWithImagesTags } from "@/lib/infer-type";
import { ChevronDown } from "lucide-react";

export default function Indici({
  variants,
  fullSize,
}: {
  variants: ProductVariantsWithImagesTags[];
  fullSize: string;
}) {
  return (
    <div>
      Indice incarcare / viteza:{" "}
      <DropdownMenu>
        <DropdownMenuTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg p-1 px-3 flex items-center justify-center gap-2">
          {fullSize.split(" ")[1] +
            (fullSize.split(" ")[2].length <= 2
              ? " " + fullSize.split(" ")[2]
              : "")}{" "}
          <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {variants.map((variant, i) => (
            <DropdownMenuItem key={i}>
              <Link
                href={`/products/${variant.product.title}?id=${variant.id}&productID=${variant.productID}&price=${variant.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.product.productImages[0].url}`}
                scroll={false}
                className="w-full"
              >
                {variant.fullSize.split(" ")[1] +
                  (variant.fullSize.split(" ")[2].length <= 2
                    ? " " + variant.fullSize.split(" ")[2]
                    : "")}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
