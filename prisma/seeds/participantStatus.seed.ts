import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedParticipantStatuses = async () => {
  const participantStatusCount = await prisma.participantStatus.count();

  if (participantStatusCount > 0) {
    return console.log(`${participantStatusCount} participants statuses exist, seeding skipped`);
  }

  const seedStatuses = ['hired', 'prospecting'];

  const seeded = await Promise.all(
    seedStatuses.map((status) =>
      prisma.participantStatus.create({
        data: {
          description: status,
        },
      })
    )
  );

  console.log(`${seeded.length} participant statuses seeded`);
  return seeded;
};
