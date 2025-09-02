'use server';

import prisma from '@/lib/prisma';

export async function searchProducts(query: string) {
  if (!query) {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        imageSrc: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      take: 10, // Limit to the top 10 results for performance
    });
    return products;
  } catch (error) {
    console.error('Search Error:', error);
    return [];
  }
}