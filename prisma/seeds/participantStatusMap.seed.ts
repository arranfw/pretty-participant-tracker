import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedParticipantStatusMap = async () => {
  const participantStatusMapCount = await prisma.participantStatusMap.count();

  if (participantStatusMapCount > 0) {
    return console.log(
      `${participantStatusMapCount} participant status maps exist, seeding skipped`
    );
  }

  const participants = await prisma.participant.findMany();
  const sites = await prisma.site.findMany();
  const participantStatus = await prisma.participantStatus.findMany();

  const seeded = await Promise.all(
    participants.map((participant) => {
      const hasStatus = Math.random() > 0.5;
      if (!hasStatus) {
        return null;
      }
      return prisma.participantStatusMap.create({
        data: {
          participantId: participant.id,
          siteId: sites[Math.floor(Math.random() * sites.length)].id,
          statusId: participantStatus[Math.floor(Math.random() * participantStatus.length)].id,
          date: new Date(),
          effectiveDate: new Date(),
        },
      });
    })
  );

  console.log(`${seeded.filter(Boolean).length} participant status maps seeded`);
  return seeded;
};
