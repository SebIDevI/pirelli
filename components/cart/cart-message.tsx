"use client";

import { useCartStore } from "@/lib/client-store";
import { motion } from "framer-motion";
import { DrawerDescription, DrawerTitle } from "../ui/drawer";
import { ArrowLeft } from "lucide-react";

export default function CartMessage() {
  const { checkoutProgress, setCheckoutProgress } = useCartStore();
  return (
    <motion.div
      className="text-center"
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 10 }}
    >
      <DrawerTitle>
        {checkoutProgress === "cart-page" ? "Coșul dumneavoastă" : null}
        {checkoutProgress === "payment-page"
          ? "Alegeți o metodă de plată"
          : null}
        {checkoutProgress === "confirmation-page" ? "Comandă confirmată" : null}
      </DrawerTitle>
      <DrawerDescription className="py-1">
        {checkoutProgress === "cart-page"
          ? "Analizați și modificați coșul dumneavoastră"
          : null}
        {checkoutProgress === "payment-page" ? (
          <span
            onClick={() => setCheckoutProgress("cart-page")}
            className="flex items-center justify-center gap-1.5 cursor-pointer hover:text-primary transition duration-300 ease-in-out"
          >
            <ArrowLeft size={14} /> Înapoi la coș
          </span>
        ) : null}
        {checkoutProgress === "confirmation-page"
          ? "Veți primi un email cu factura în scurt timp!"
          : null}
      </DrawerDescription>
    </motion.div>
  );
}
