"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductPick({
  id,
  size,
  productType,
  title,
  price,
  productID,
  image,
}: {
  id: number;
  size: string;
  productType: string;
  title: string;
  price: number;
  productID: number;
  image: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("type" || productType);
  return (
    <div
      //   style={{ backgroundColor: color }}
      className={cn(
        "py-3 px-6 cursor-pointer transition-all duration-300 ease-in-out hover:bg-secondary-foreground/10",
        selectedColor === productType ? "bg-secondary-foreground/10" : ""
      )}
      onClick={() =>
        router.push(
          `/products/${title}?id=${id}&productID=${productID}&price=${price}&title=${title}&type=${productType}&image=${image}`,
          { scroll: false }
        )
      }
    >
      <p>{size}</p>
    </div>
  );
}
