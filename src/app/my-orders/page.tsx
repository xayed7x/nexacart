import prisma from "@/lib/prisma";
import { getCurrentUserId } from "../_actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/formatters";

export default async function MyOrdersPage() {
  const currentUserId = await getCurrentUserId();

  // 1. Protect the route: If no user is logged in, redirect away.
  if (!currentUserId) {
    redirect("/");
  }

  // 2. Fetch orders specifically for the logged-in user.
  const orders = await prisma.order.findMany({
    where: {
      userId: currentUserId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true, // Include item count if needed
    },
  });

  return (
    <div className="max-w-4xl mx-auto my-12 p-4 font-montserrat">
      <h1 className="text-3xl font-bold font-merriweather text-charcoal mb-8">
        My Order History
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md text-charcoal">
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              You haven't placed any orders yet.
            </p>
            <Link
              href="/"
              className="rounded-md bg-charcoal px-4 py-2 text-sm font-semibold text-off-white shadow-sm hover:bg-mocha-mousse"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b-2 border-soft-grey font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-soft-grey">
                    <td className="whitespace-nowrap px-6 py-4 font-semibold text-mocha-mousse">
                      #{order.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {format(new Date(order.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {formatCurrency(order.totalPrice.toNumber())}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Link
                        href={`/order-confirmation/${order.id}`}
                        className="text-mocha-mousse hover:underline font-semibold"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
