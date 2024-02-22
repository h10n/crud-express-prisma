import { PrismaClient } from "@prisma/client";

export const roleSeeder = async (prisma: PrismaClient) => {
  const data = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    },
  ];

  data.forEach(async (role) => {
    const roles = await prisma.role.upsert({
      where: { name: role.name },
      update: {
        name: role.name,
      },
      create: {
        id: role.id,
        name: role.name,
      },
    });
    console.log({ roles });
  });
};
