import prisma from "@/config/prisma";

export const findUsers = async () => {
  return await prisma.user.findMany();
};
export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      password: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          birthDate: true,
          website: true,
          avatarUrl: true,
          gender: true,
        },
      },
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
