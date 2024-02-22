import { PrismaClient } from "@prisma/client";

export const userSeeder = async (prisma: PrismaClient) => {
  const data = [
    {
      id: 1,
      email: "admin@kimhakim.my.id",
      password: "admin123",
      roleId: 1,
    },
    {
      id: 2,
      email: "hakim@kimhakim.my.id",
      password: "admin123",
      roleId: 2,
    },
  ];

  data.forEach(async (user) => {
    const users = await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      },
      create: {
        id: user.id,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
      },
    });
    console.log({ users });
  });
};
