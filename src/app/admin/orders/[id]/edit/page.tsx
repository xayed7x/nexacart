import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import UpdateOrderStatus from "../UpdateOrderStatus";

interface EditOrderPageProps {
  params: { id: string };
}

export default async function EditOrderPage({
  params,
}: EditOrderPageProps) {
  const orderId = parseInt(params.id);

  if (isNaN(orderId)) {
    return notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-merriweather text-charcoal mb-6">
        Edit Order #{order.id}
      </h1>
      <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
    </div>
  );
}