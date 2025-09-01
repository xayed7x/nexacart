'use server';

import prisma from "@/lib/prisma";
import { z } from "zod";


// Define the shape for a single cart item
const cartItemSchema = z.object({
  id: z.coerce.number(),
  quantity: z.number().min(1),
  price: z.number(), // Price at the time of checkout
});

// Define the schema for the entire checkout form
const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  // We expect the cart items to be a JSON string
  cartItems: z
    .string()
    .transform((str) => JSON.parse(str))
    .pipe(z.array(cartItemSchema)),
});

export async function createOrder(prevState: unknown, formData: FormData) {
  const validatedFields = checkoutSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    cartItems: formData.get("cartItems"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data. Please check your inputs.",
      orderId: null,
    };
  }

  const { firstName, lastName, email, address, city, postalCode, country, cartItems } =
    validatedFields.data;

  const customerName = `${firstName} ${lastName}`;
  const shippingAddress = `${address}, ${city}, ${postalCode}, ${country}`;

  // Calculate total price on the server to prevent manipulation
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let newOrder;
  try {
    // Use a transaction to ensure both Order and OrderItems are created, or neither are.
    newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerName,
          customerEmail: email,
          shippingAddress,
          totalPrice,
          status: "Pending", // Default status for Cash on Delivery
        },
      });

      // Create an OrderItem for each item in the cart
      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      return order;
    });
  } catch (e) {
    console.error(e);
    return {
      error: "Database Error: Failed to create order.",
      orderId: null,
    };
  }

  // On success, return the orderId
  return {
    error: null,
    orderId: newOrder.id,
  }
}