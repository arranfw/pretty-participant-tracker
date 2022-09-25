import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export const seedParticipants = async (count: number) => {
  const participantCount = await prisma.participant.count();

  if (participantCount > 0) {
    return console.log(`${participantCount} participants exist, seeding skipped`);
  }

  const seeded = await Promise.all(
    Array(count)
      .fill(1)
      .map(() => {
        return prisma.participant.create({
          data: {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
          },
        });
      })
  );

  console.log(`${seeded.length} participants seeded`);
  return seeded;
};
