import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { formatCurrency } from '@/lib/formatters';

interface OrderConfirmationPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(params.orderId) },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-3">
            Thank you, {order.customerName}!
          </h1>
          <p className="text-lg text-charcoal/80 dark:text-off-white/80">
            Your order has been placed successfully.
          </p>
          <p className="text-lg text-charcoal/80 dark:text-off-white/80">
            Order ID: <span className="font-bold text-mocha-mousse">#{order.id}</span>
          </p>
        </div>

        <div className="bg-off-white dark:bg-charcoal rounded-sm shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white mb-6 border-b border-soft-grey dark:border-gray-700 pb-4">
            Order Summary
          </h2>
          <ul className="divide-y divide-soft-grey dark:divide-gray-700">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center py-4">
                <img
                  src={item.product.imageSrc}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-sm mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-bold text-charcoal dark:text-off-white">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-charcoal/80 dark:text-off-white/80">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-charcoal dark:text-off-white">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-soft-grey dark:border-gray-700 text-right">
            <p className="text-xl font-bold text-charcoal dark:text-off-white">
              Total: {formatCurrency(order.totalPrice)}
            </p>
          </div>
        </div>

        <div className="bg-off-white dark:bg-charcoal rounded-sm shadow-md p-6">
            <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white mb-4">
                Shipping Address
            </h2>
            <address className="not-italic text-charcoal/80 dark:text-off-white/80">
                {order.shippingAddress}
            </address>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="text-mocha-mousse hover:underline font-bold uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}