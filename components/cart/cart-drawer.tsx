"use client";

import { useCartStore } from "@/lib/client-store";
import { ShoppingBag } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import CartItems from "./cart-items";
import CartMessage from "./cart-message";
import Payment from "./payment";
import OrderConfirmed from "./order-confirmed";
import CartProgress from "./cart-progress";

export default function CartDrawer() {
  const { cart, checkoutProgress, cartOpen, setCartOpen } = useCartStore();
  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen}>
      <DrawerTrigger className="p-1.5 rounded-lg overflow-hidden text-secondary-foreground hover:bg-secondary-foreground/20 transition">
        <div className="relative">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex items-center justify-center -top-1.5 -right-0.5 w-4 h-4 dark:bg-primary bg-primary text-xs font-bold rounded-full"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag />
        </div>
      </DrawerTrigger>
      <DrawerContent className="fixed bottom-0 left-0 md:max-h-[70vh] h-[90vh] md:h-auto min-h-[50vh]">
        <DrawerHeader>
          <CartMessage />
        </DrawerHeader>
        <CartProgress />
        <div className="overflow-auto p-4">
          {checkoutProgress === "cart-page" && <CartItems />}
          {checkoutProgress === "payment-page" && (
            <>
              <Payment />
              <div className="h-[50vh] md:hidden"></div>
            </>
          )}
          {checkoutProgress === "confirmation-page" && <OrderConfirmed />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
