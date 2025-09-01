import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md font-montserrat text-charcoal">
      <h1 className="text-3xl font-bold font-merriweather text-charcoal mb-6">
        Manage Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b-2 border-soft-grey font-semibold">
            <tr>
              <th scope="col" className="px-6 py-4">
                Order ID
              </th>
              <th scope="col" className="px-6 py-4">
                Customer
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Items
              </th>
              <th scope="col" className="px-6 py-4">
                Total
              </th>
              <th scope="col" className="px-6 py-4">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <Link
                  href={`/admin/orders/${order.id}`}
                  key={order.id}
                  legacyBehavior
                  passHref
                >
                  <tr className="border-b border-soft-grey transition-colors duration-200 hover:bg-off-white cursor-pointer">
                    <td className="whitespace-nowrap px-6 py-4 font-semibold text-mocha-mousse">
                      #{order.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {order.customerName}
                      <br />
                      <span className="text-xs text-gray-500">
                        {order.customerEmail}
                      </span>
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
                      {order.items.length}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      ${order.totalPrice.toString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {format(new Date(order.createdAt), "MMM d, yyyy")}
                    </td>
                  </tr>
                </Link>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
