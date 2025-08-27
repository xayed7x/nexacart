// src/components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import { CartItem } from "../app/contexts/CartContext"; // Import CartItem type

// Zod validation schema (remains the same)
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

// 1. Update component props to accept cartItems
export default function CheckoutForm({ cartItems }: { cartItems: CartItem[] }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const {
    register,
    handleSubmit: handleShippingSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const processCheckout = async (shippingData: ShippingFormData) => {
    setIsLoading(true);
    setMessage(null);

    if (paymentMethod === "stripe") {
      // --- Stripe Payment Logic (no changes here) ---
      if (!stripe || !elements) {
        setMessage("Stripe is not ready. Please refresh the page.");
        setIsLoading(false);
        return;
      }
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation/stripe-success`,
          shipping: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            address: {
              line1: shippingData.address,
              city: shippingData.city,
              postal_code: shippingData.postalCode,
              country: shippingData.country,
            },
          },
          payment_method_data: {
            billing_details: {
              name: `${shippingData.firstName} ${shippingData.lastName}`,
              email: shippingData.email,
              address: {
                line1: shippingData.address,
                city: shippingData.city,
                postal_code: shippingData.postalCode,
                country: shippingData.country,
              },
            },
          },
        },
      });
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } else if (paymentMethod === "sslcommerz") {
      // --- SSLCOMMERZ Logic (This is the updated part) ---
      try {
        const subtotal = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        // Prepare the data to send to our API endpoint
        const orderDetails = {
          total_amount: subtotal,
          currency: "BDT", // Or your desired currency
          cartItems: cartItems,
          customer_info: shippingData,
        };

        // Call our new API endpoint
        const response = await fetch("/api/initiate-ssl-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
        });

        const data = await response.json();

        if (data.status === "SUCCESS" && data.GatewayPageURL) {
          // If the API call is successful, redirect the user to the payment gateway
          window.location.href = data.GatewayPageURL;
        } else {
          // If the API call fails, show an error message
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

  // --- The rest of the return statement (UI) remains the same ---
  return (
    <form id="payment-form" onSubmit={handleShippingSubmit(processCheckout)}>
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

        <button
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
        {message && (
          <div id="payment-message" className="mt-2 text-sm text-red-600">
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
