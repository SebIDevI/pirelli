"use client";

import { useCartStore } from "@/lib/client-store";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeElementLocale } from "@stripe/stripe-js";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { createPaymentIntent } from "@/server/actions/create-payment-intent";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/server/actions/create-order";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";

export default function PaymentForm({ totalPrice }: { totalPrice: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCheckoutProgress, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isJuridic, setIsJuridic] = useState(false);
  const [firmName, setFirmName] = useState("");
  const [cui, setCui] = useState("");

  // const totalRoundedPrice = Math.round(+(totalPrice * 100).toFixed(2)) / 100;

  const { execute } = useAction(createOrder, {
    onSuccess: (data) => {
      if (errorMessage) {
        console.log("errorMessage");
        console.log(errorMessage);
      }
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
      }
      if (data.success) {
        setIsLoading(false);
        toast.success(data.success);
        setCheckoutProgress("confirmation-page");
        clearCart();
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message!);
      setIsLoading(false);
      return;
    }
    const { data } = await createPaymentIntent({
      amount: totalPrice,
      currency: "ron",
      cart: cart.map((item) => ({
        quantity: item.variant.quantity,
        productID: item.id,
        title: item.name,
        price: item.variant.price,
        image: item.image,
      })),
    });
    if (data?.error) {
      setErrorMessage(data.error);
      setIsLoading(false);
      return;
    }
    if (data?.success) {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.success.clientSecretID!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: data.success.user as string,
        },
      });
      if (error) {
        setErrorMessage(error.message!);
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        execute({
          status: "pending",
          paymentIntentID: data.success.paymentIntentID,
          total: totalPrice,
          products: cart.map((item) => ({
            productID: item.id,
            variantID: item.variant.variantID,
            quantity: item.variant.quantity,
          })),
        });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsJuridic(e.target.value === "juridic");
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="py-4">
        <RadioGroup
          defaultValue="fizic"
          className="flex gap-4 items-center justify-start"
          onValueChange={(e) => setIsJuridic(e === "juridic")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fizic" id="option-one" />
            <Label htmlFor="option-one">Persoană fizică</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="juridic" id="option-two" />
            <Label htmlFor="option-two">Persoană juridică</Label>
          </div>
        </RadioGroup>
      </div>
      {isJuridic && (
        <div className="pb-2 space-y-1">
          <div>
            <label className="space-y-1">
              <span>Numele companiei</span>
              <Input
                className="bg-muted border-muted text-base p-4 h-auto py-3 ring-0 focus-visible:ring-0 focus-visible:"
                placeholder="Numele firmei"
                type="text"
                name="companyName"
                onChange={(e) => setFirmName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="space-y-1">
              <span>CUI</span>
              <Input
                className="bg-muted border-muted text-base p-4 h-auto py-3 ring-0 focus-visible:ring-0 focus-visible:"
                placeholder="CUI-ul firmei"
                type="text"
                name="cui"
                onChange={(e) => setCui(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
      )}
      <AddressElement
        options={{
          autocomplete: {
            mode: "automatic",
          },
          mode: "shipping",
          allowedCountries: ["RO"],
          fields: { phone: "always" },
        }}
      />
      <Button
        className="my-4 w-full"
        disabled={
          !stripe || !elements || isLoading || (isJuridic && !firmName && !cui)
        }
      >
        {isLoading ? "Procesăm comanda..." : "Plătiți acum"}
      </Button>
    </form>
  );
}
