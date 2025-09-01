"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define a schema for input validation
const updateStatusSchema = z.object({
  orderId: z.number(),
  status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
});

export async function updateOrderStatus(
  prevState: unknown,
  formData: FormData
) {
  const validatedFields = updateStatusSchema.safeParse({
    orderId: parseInt(formData.get("orderId") as string),
    status: formData.get("status"),
  });

  // If validation fails, return an error message
  if (!validatedFields.success) {
    return {
      error: "Invalid input. Please check the values and try again.",
    };
  }

  const { orderId, status } = validatedFields.data;

  try {
    // Update the order in the database
    await prisma.order.update({
      where: { id: orderId },
      data: { status: status },
    });

    // Invalidate the cache for the order detail page to show the updated status
    revalidatePath(`/admin/orders/${orderId}`);

    return {
      success: `Order status successfully updated to ${status}.`,
    };
  } catch (e) {
    console.error(e);
    return {
      error: "An unexpected error occurred. Could not update the order.",
    };
  }
}
