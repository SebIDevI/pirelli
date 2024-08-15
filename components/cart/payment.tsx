"use client";

import { useCartStore } from "@/lib/client-store";
import getStripe from "@/lib/get-stripe";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import PaymentForm from "./payment-form";
import { useTheme } from "next-themes";

const stripe = getStripe();

export default function Payment() {
  const { cart } = useCartStore();
  const totalRoundedPrice = cart.reduce((acc, item) => {
    return acc + Math.round(item.variant.price * 100) * item.variant.quantity;
  }, 0);

  console.log("totalRoundedPrice", totalRoundedPrice);

  const { theme } = useTheme();

  return (
    <motion.div className="max-w-3xl mx-auto">
      <Elements
        stripe={stripe}
        options={{
          amount: totalRoundedPrice,
          mode: "payment",
          currency: "ron",
          appearance: { theme: theme === "dark" ? "night" : "flat" },
        }}
      >
        <PaymentForm totalPrice={totalRoundedPrice / 100} />
      </Elements>
    </motion.div>
  );
}
