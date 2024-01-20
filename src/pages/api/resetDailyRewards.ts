import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/context/db'; // Adjust the import path as needed

export default async function resetDailyRewardsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    process.env.NEXT_PUBLIC_APP_ENV === 'production' &&
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end('Unauthorized');
  }

  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);

    // Find users who haven't claimed their daily reward in over 48 hours
    const usersToReset = await prisma.userDailyReward.findMany({
      where: {
        OR: [{ lastClaimed: null }, { lastClaimed: { lt: twoDaysAgo } }],
      },
    });

    // Reset currentDay for these users
    for (const user of usersToReset) {
      await prisma.userDailyReward.update({
        where: { userId: user.userId },
        data: { currentDay: 0 },
      });
    }

    res.status(200).json({ message: 'Daily rewards reset successfully' });
  } catch (error) {
    console.error('Failed to reset daily rewards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
