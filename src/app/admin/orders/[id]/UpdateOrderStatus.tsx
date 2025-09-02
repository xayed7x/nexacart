"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateOrderStatus } from "@/app/admin/_actions/orders";

// We pass the order's current ID and status from the Server Component
interface UpdateOrderStatusProps {
  orderId: number;
  currentStatus: string;
}

interface FormState {
  error?: string;
  success?: string;
}

const initialState: FormState = {
  error: undefined,
  success: undefined,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="w-full bg-charcoal text-off-white font-bold py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse disabled:bg-gray-400"
            disabled={pending}
        >
            {pending ? "Updating..." : "Save Status"}
        </button>
    );
}

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: UpdateOrderStatusProps) {
  // useFormState handles the state changes based on the server action's response
  const [state, formAction] = useFormState(
    updateOrderStatus,
    initialState
  );

  return (
    <div className="bg-off-white p-6 rounded-md border border-soft-grey h-fit mt-8">
      <h2 className="text-xl font-bold font-merriweather mb-4">
        Update Status
      </h2>
      <form action={formAction}>
        {/* Hidden input to pass the orderId to the server action */}
        <input type="hidden" name="orderId" value={orderId} />

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Order Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={currentStatus}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-mocha-mousse focus:ring-mocha-mousse sm:text-sm p-2"
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <SubmitButton />
      </form>

      {/* Display success or error messages from the server action */}
      {state.success && (
        <p className="mt-4 text-sm text-green-700">{state.success}</p>
      )}
      {state.error && (
        <p className="mt-4 text-sm text-red-700">{state.error}</p>
      )}
    </div>
  );
}