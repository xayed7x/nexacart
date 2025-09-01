'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-6 bg-mocha-mousse text-off-white font-montserrat font-bold py-3 px-6 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300 disabled:bg-gray-400"
    >
      {pending ? "Placing Order..." : "Place Order"}
    </button>
  );
}
