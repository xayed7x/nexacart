// src/components/PaymentForm.tsx
"use client";

import { PaymentElement } from "@stripe/react-stripe-js";

// 1. The component now accepts an `isDisabled` prop.
export default function PaymentForm({ isDisabled }: { isDisabled: boolean }) {
  return (
    // 2. Wrap the PaymentElement in a fieldset that is disabled based on the prop.
    //    Stripe's PaymentElement will automatically adopt the disabled state.
    <fieldset disabled={isDisabled}>
      <PaymentElement id="payment-element" />
    </fieldset>
  );
}
