/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Levels
  const levels = [
    0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
    1400, 1566, 1635, 1864, 2176, 2600, 3177, 3713, 4287, 4903, 5563, 6270,
    7028, 7840, 8711, 9644, 10644, 11716, 12865, 14096, 15416, 16830, 18346,
    19971, 21712, 23578, 25578, 27722, 30019, 32481, 35120, 37948, 40979, 44228,
    47710, 51442, 55442,
  ];

  for (let i = 1; i < levels.length; i++) {
    const points = levels[i]! - levels[i - 1]!;
    await prisma.level.upsert({
      where: { level: i },
      create: { level: i, points: points },
      update: {},
    });
  }

  // Seed DailyRewards
  const dailyRewards = [
    { day: 1, bonusAmount: 10 },
    { day: 2, bonusAmount: 15 },
    { day: 3, bonusAmount: 20 },
    { day: 4, bonusAmount: 20 },
    { day: 5, bonusAmount: 25 },
    { day: 6, bonusAmount: 30 },
    { day: 7, bonusAmount: 40 },
  ];

  for (const reward of dailyRewards) {
    await prisma.dailyReward.upsert({
      where: { day: reward.day },
      create: reward,
      update: {},
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
