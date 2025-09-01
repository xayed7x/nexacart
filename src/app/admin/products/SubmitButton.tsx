"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-charcoal px-4 py-2 text-sm font-semibold text-off-white shadow-sm hover:bg-mocha-mousse disabled:bg-gray-400"
    >
      {pending ? "Saving..." : "Save Product"}
    </button>
  );
}
