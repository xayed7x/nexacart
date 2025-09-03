import { getDashboardStats } from "./_actions/dashboard";
import { formatCurrency } from "@/lib/formatters";
import { format } from "date-fns";
import Link from "next/link";

// StatCard component remains the same
function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md font-montserrat text-charcoal">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold font-merriweather">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  // Destructure the new recentOrders data from our server action
  const { totalRevenue, totalSales, productCount, recentOrders } =
    await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold font-merriweather text-charcoal mb-8">
        Admin Dashboard
      </h1>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(typeof totalRevenue === 'number' ? totalRevenue : totalRevenue.toNumber())}
          description="All time gross revenue"
        />
        <StatCard
          title="Total Sales"
          value={totalSales.toLocaleString()}
          description="Total number of orders placed"
        />
        <StatCard
          title="Active Products"
          value={productCount.toLocaleString()}
          description="Number of products in the store"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="mt-12 bg-white p-4 sm:p-8 rounded-lg shadow-md font-montserrat text-charcoal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-merriweather">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm font-semibold text-mocha-mousse hover:underline"
          >
            View All Orders &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b-2 border-soft-grey font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                  Order ID
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-soft-grey">
                  <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4 font-semibold text-mocha-mousse">
                    #{order.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                    {order.customerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4">
                    {formatCurrency(order.totalPrice.toNumber())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}