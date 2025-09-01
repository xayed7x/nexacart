// src/components/CheckoutForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFormState } from "react-dom";

import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import { CartItem, useCart } from "../app/contexts/CartContext";
import { createOrder } from "@/app/admin/_actions/checkout";
import { SubmitButton } from "./SubmitButton";

const shippingSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function CheckoutForm({ cartItems }: { cartItems: CartItem[] }) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();

  const [state, formAction] = useFormState(createOrder, { error: null, orderId: null });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const {
    register,
    handleSubmit: handleShippingSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  useEffect(() => {
    if (state.orderId) {
      clearCart();
      window.location.href = `/order-confirmation/${state.orderId}`;
    }
    if(state.error){
      setMessage(state.error);
      setIsLoading(false);
    }
  }, [state, clearCart]);

  const processCheckout = async (shippingData: ShippingFormData) => {
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    Object.entries(shippingData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("cartItems", JSON.stringify(cartItems));


    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        setMessage("Stripe is not ready. Please refresh the page.");
        setIsLoading(false);
        return;
      }
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation/stripe-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message || "An unexpected error occurred.");
        setIsLoading(false);
      } else {
        // Payment successful, now create order in DB
        formAction(formData);
      }
    } else if (paymentMethod === "sslcommerz") {
      try {
        const subtotal = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        const orderDetails = {
          total_amount: subtotal,
          currency: "BDT",
          cartItems: cartItems,
          customer_info: shippingData,
        };

        const response = await fetch("/api/initiate-ssl-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        });

        const data = await response.json();

        if (data.status === "SUCCESS" && data.GatewayPageURL) {
          // This will redirect to sslcommerz, and the redirect from our server action will be handled by the browser
          window.location.href = data.GatewayPageURL;
          // We need to create the order before redirecting
          formAction(formData);
        } else {
          setMessage(data.message || "Failed to start payment session.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to call SSL initiation API:", error);
        setMessage("An unexpected error occurred. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <form action={paymentMethod === 'cod' ? formAction : undefined} onSubmit={paymentMethod !== 'cod' ? handleShippingSubmit(processCheckout) : undefined}>
      <div className="bg-off-white dark:bg-charcoal rounded-sm shadow-sm p-6">
        <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white mb-6">
          Shipping Information
        </h2>
        <ShippingForm
          register={register}
          errors={errors}
          isDisabled={isLoading}
        />

        <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white mt-8 mb-6">
          Payment Method
        </h2>
        <fieldset disabled={isLoading} className="space-y-3">
          <div
            onClick={() => setPaymentMethod("cod")}
            className={`p-4 border rounded-sm cursor-pointer transition-all ${
              paymentMethod === "cod"
                ? "border-mocha-mousse ring-2 ring-mocha-mousse"
                : "border-soft-grey dark:border-gray-600"
            }`}
          >
            <label
              htmlFor="cod"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="h-4 w-4 text-mocha-mousse focus:ring-mocha-mousse"
              />
              <span className="ml-3 font-medium text-charcoal dark:text-off-white">
                Cash on Delivery
              </span>
            </label>
          </div>
          <div
            onClick={() => setPaymentMethod("stripe")}
            className={`p-4 border rounded-sm cursor-pointer transition-all ${
              paymentMethod === "stripe"
                ? "border-mocha-mousse ring-2 ring-mocha-mousse"
                : "border-soft-grey dark:border-gray-600"
            }`}
          >
            <label
              htmlFor="stripe"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="stripe"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
                className="h-4 w-4 text-mocha-mousse focus:ring-mocha-mousse"
              />
              <span className="ml-3 font-medium text-charcoal dark:text-off-white">
                Credit/Debit Card
              </span>
            </label>
          </div>
          <div
            onClick={() => setPaymentMethod("sslcommerz")}
            className={`p-4 border rounded-sm cursor-pointer transition-all ${
              paymentMethod === "sslcommerz"
                ? "border-mocha-mousse ring-2 ring-mocha-mousse"
                : "border-soft-grey dark:border-gray-600"
            }`}
          >
            <label
              htmlFor="sslcommerz"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id="sslcommerz"
                name="paymentMethod"
                value="sslcommerz"
                checked={paymentMethod === "sslcommerz"}
                onChange={() => setPaymentMethod("sslcommerz")}
                className="h-4 w-4 text-mocha-mousse focus:ring-mocha-mousse"
              />
              <span className="ml-3 font-medium text-charcoal dark:text-off-white">
                bKash, Nagad, Rocket, & more
              </span>
            </label>
          </div>
        </fieldset>

        {paymentMethod === "stripe" && (
          <>
            <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white mt-8 mb-6">
              Card Details
            </h2>
            <PaymentForm isDisabled={isLoading} />
          </>
        )}
        {paymentMethod === "sslcommerz" && (
          <div className="mt-6 p-4 bg-soft-grey/20 dark:bg-charcoal/50 rounded-sm text-center">
            <p className="text-sm text-charcoal dark:text-off-white">
              You will be redirected to a secure gateway to complete your
              payment.
            </p>
          </div>
        )}

        <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />

        {paymentMethod === 'cod' ? <SubmitButton /> : (
          <button
            type="submit"
            disabled={
              isLoading || (paymentMethod === "stripe" && (!stripe || !elements))
            }
            id="submit"
            className="w-full mt-6 bg-mocha-mousse text-off-white font-montserrat font-bold py-3 px-6 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300 disabled:bg-gray-400"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" role="status"></div>
              ) : (
                "Place Order"
              )}
            </span>
          </button>
        )}
        
        {message && (
          <div id="payment-message" className="mt-2 text-sm text-red-600">
            {message}
          </div>
        )}
      </div>
    </form>
  );
}