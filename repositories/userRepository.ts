import prisma from "../config/prisma";

export const findUsers = async () => {
  return await prisma.user.findMany();
};
