import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getorders(where?: Prisma.orderWhereInput) {
  const tryGetorder = await prisma.order.findMany({
    where,
    include: { user: true, payment: true },
  });
  return tryGetorder;
}

export async function createorder(data: Prisma.orderCreateInput) {
  const tryCreateorder = await prisma.order.create({
    data,
  });
  return tryCreateorder;
}

export async function getorder(where: Prisma.orderWhereUniqueInput) {
  const order = await prisma.order.findUnique({
    where,
    include: {
      orderlist: {
        select: { product: true, qty: true, orderId: true, productId: true },
      },
      payment: true,
      user: true,
    },
  });
  return order;
}

export async function deleteorder(where: Prisma.orderWhereUniqueInput) {
  const deleteOrder = await prisma.order.delete({ where });
  return deleteOrder;
}
