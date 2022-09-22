import { PrismaClient } from '@prisma/client'
import { seedParticipants } from './seeds/participant.seed';
const prisma = new PrismaClient()

async function main() {
  await seedParticipants(1000);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })