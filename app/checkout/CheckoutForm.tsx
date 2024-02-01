"use client";

import Heading from "@/components/Heading";
import Button from "@/components/Product/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

interface Props {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm = ({ clientSecret, handleSetPaymentSuccess }: Props) => {
  const { cartTotalAmount, handleSetPaymentIntent, handleClearCart } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;

    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          alert("Checkout success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "KE", "VN"] }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
