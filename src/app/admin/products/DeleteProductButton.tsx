"use client";

import { useFormStatus } from "react-dom";
import { deleteProduct } from "@/app/admin/_actions/products";

interface DeleteProductButtonProps {
  productId: number;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const { pending } = useFormStatus();

  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:bg-gray-400"
      >
        {pending ? "Deleting..." : "Delete Product"}
      </button>
    </form>
  );
}