import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getProducts(where?: Prisma.productsWhereInput) {
  const tryGetproducts = await prisma.products.findMany({
    where,
  });
  return tryGetproducts;
}

export async function createProduct(data: Prisma.productsCreateInput) {
  const tryCreateproduct = await prisma.products.create({
    data,
  });
  return tryCreateproduct;
}

export async function getProduct(
  where: Prisma.productsWhereUniqueInput,
  select?: Prisma.productsSelect
) {
  const product = await prisma.products.findUnique({
    where,
    select,
  });
  return product;
}

export async function deleteProduct(where: Prisma.productsWhereUniqueInput) {
  const deleteproduct = await prisma.products.delete({ where });
  return deleteproduct;
}

export async function updateProduct(
  where: Prisma.productsWhereUniqueInput,
  data: Prisma.productsUpdateInput
) {
  const update = await prisma.products.update({ where: where, data: data });

  return update;
}
