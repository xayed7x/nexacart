'use server';

import prisma from '@/lib/prisma';

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
  });
  return users.filter((user) => user.name) as { id: number; name: string }[];
}
