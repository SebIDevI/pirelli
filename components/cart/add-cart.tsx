"use client";

import { useCartStore } from "@/lib/client-store";
import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";

export default function AddCart() {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const productID = Number(params.get("productID"));
  const title = params.get("title");
  const type = params.get("type");
  const price = Number(params.get("price"));
  const image = params.get("image");

  if (!id || !productID || !title || !type || !price || !image) {
    toast.error("Produsul nu a fost găsit");
    redirect("/");
  }
  return (
    <>
      <div className="flex items-center gap-4 justify-stretch my-4 w-1/2 min-w-20">
        <Button
          onClick={() => {
            if (quantity > 1) setQuantity(quantity - 1);
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button className="flex-1">Cantitate: {quantity}</Button>
        <Button variant={"secondary"} className="text-primary">
          <Plus
            onClick={() => {
              setQuantity(quantity + 1);
            }}
            size={18}
            strokeWidth={3}
          />
        </Button>
      </div>
      <Button
        onClick={() => {
          toast.success(
            `Ați adăugat ${title + " " + type} în coșul dumneavoastră`
          );
          addToCart({
            id: productID,
            variant: { variantID: id, quantity, price },
            name: title,
            type: type,
            image,
          });
        }}
        className="w-1/2 min-w-20"
      >
        Adăugați în coș
      </Button>
      <div className="h-80"></div>
    </>
  );
}
