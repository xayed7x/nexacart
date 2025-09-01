import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

// 1. Import the new client component
import UpdateOrderStatus from "./UpdateOrderStatus";

interface OrderDetailPageProps {
  params: { id: string };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const orderId = parseInt(params.id);

  if (isNaN(orderId)) {
    return notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="font-montserrat">
      <div className="mb-6">
        <Link
          href="/admin/orders"
          className="text-mocha-mousse hover:underline font-semibold"
        >
          &larr; Back to All Orders
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md text-charcoal">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-merriweather">
              Order #{order.id}
            </h1>
            <p className="text-gray-500 mt-1">
              Placed on{" "}
              {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          <span
            className={`mt-4 md:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${
              order.status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : order.status === "Shipped"
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Customer and Items */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold font-merriweather mb-4">
              Customer Details
            </h2>
            <div className="bg-off-white p-4 rounded-md border border-soft-grey mb-8">
              <p>
                <strong>Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Email:</strong> {order.customerEmail}
              </p>
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>
            </div>

            <h2 className="text-xl font-bold font-merriweather mb-4">
              Items in Order
            </h2>
            <ul
              role="list"
              className="divide-y divide-soft-grey border-t border-soft-grey"
            >
              {order.items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-soft-grey">
                    <img
                      src={item.product.imageSrc}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <h3 className="font-semibold text-charcoal">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="mt-auto text-sm font-medium">
                      Unit Price: ${item.price.toString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Order Summary & Status Update */}
          <div>
            <div className="bg-off-white p-6 rounded-md border border-soft-grey h-fit">
              <h2 className="text-xl font-bold font-merriweather mb-4">
                Order Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.totalPrice.toString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-soft-grey pt-2 mt-2">
                  <span>Total</span>
                  <span>${order.totalPrice.toString()}</span>
                </div>
              </div>
            </div>

            {/* 2. Place the new component here, passing props from the server */}
            <UpdateOrderStatus
              orderId={order.id}
              currentStatus={order.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
