import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getUsers(where?: Prisma.userWhereInput) {
  const tryGetUser = await prisma.user.findMany({ where });
  return tryGetUser;
}

export async function createUser(data: Prisma.userCreateInput) {
  const tryCreateUser = await prisma.user.create({ data });
  return tryCreateUser;
}

export async function getUser(where: Prisma.userWhereUniqueInput) {
  const user = await prisma.user.findUnique({ where });
  return user;
}
