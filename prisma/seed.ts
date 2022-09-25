import { PrismaClient } from '@prisma/client';
import { seedParticipants } from './seeds/participant.seed';
import { seedParticipantStatuses } from './seeds/participantStatus.seed';
import { seedParticipantStatusMap } from './seeds/participantStatusMap.seed';
import { seedSites } from './seeds/site.seed';
const prisma = new PrismaClient();

async function main() {
  await seedParticipants(1000);
  await seedSites(10);
  await seedParticipantStatuses();

  await seedParticipantStatusMap();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
