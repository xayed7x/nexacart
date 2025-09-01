'use server';

import prisma from '@/lib/prisma';

export async function getDashboardStats() {
  const [orderStats, productCount, recentOrders] = await Promise.all([
    prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
      _count: true,
    }),
    prisma.product.count(),
    prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      select: {
        id: true,
        totalPrice: true,
        customerName: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalRevenue: orderStats._sum.totalPrice || 0,
    totalSales: orderStats._count,
    productCount: productCount,
    recentOrders: recentOrders,
  };
}