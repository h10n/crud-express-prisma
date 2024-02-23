import { PrismaClient } from "@prisma/client";

export const profileSeeder = async (prisma: PrismaClient) => {
  enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE",
  }

  const data = [
    {
      id: 1,
      firstName: "Super",
      lastName: "Admin",
      birthDate: new Date("1996-01-01 00:00:00"),
      gender: "MALE",
      userId: 1,
    },
    {
      id: 2,
      firstName: "Hakim",
      lastName: "User",
      birthDate: new Date("1996-01-01 00:00:00"),
      gender: "MALE",
      userId: 2,
    },
  ];

  for (let i = 0; i < data.length; i++) {
    const profile = data[i];
    const profiles = await prisma.profile.upsert({
      where: { id: profile.id },
      update: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate,
        gender: GenderEnum.MALE,
        userId: profile.userId,
      },
      create: {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate,
        gender: GenderEnum.MALE,
        userId: profile.userId,
      },
    });
    console.log({ profiles });
  }
};
