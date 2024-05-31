import { Prisma } from "@prisma/client";

export type OrderWithUser = Prisma.orderGetPayload<{
  include: {
    user: true;
    payment: true;
  };
}>;

export type OrderWithPaymentDetailUser = Prisma.orderGetPayload<{
  include: {
    user: true;
    orderlist: { select: { product: true; qty: true } };
    payment: true;
  };
}>;

export type OrderListWithQTY = Prisma.orderlistGetPayload<{
  include: {
    product: true;
  };
}>;
