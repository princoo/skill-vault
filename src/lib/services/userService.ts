import { prisma } from "../db";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
export async function createUser(email: string, password: string, fullName: string) {
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password,
    },
  });
  return user;
}
