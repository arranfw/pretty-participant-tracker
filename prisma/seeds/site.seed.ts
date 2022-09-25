import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export const seedSites = async (count: number) => {
  const siteCount = await prisma.site.count();

  if (siteCount > 0) {
    return console.log(`${siteCount} sites exist, seeding skipped`);
  }

  const seeded = await Promise.all(
    Array(count)
      .fill(1)
      .map(() => {
        return prisma.site.create({
          data: {
            name: faker.company.name(),
          },
        });
      })
  );

  console.log(`${seeded.length} sites seeded`);
  return seeded;
};
