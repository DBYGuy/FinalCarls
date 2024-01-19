import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, procedure } from '../trpc';
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient();

export const leaderboardRouter = router({
  // Procedure: Get a paginated leaderboard of users by their points and levels, including their ranks
  getLeaderboard: procedure
    .input(z.object({ page: z.number().default(1) })) // Accepting page number as input
    .query(async ({ input: { page }, ctx }) => {
      const pageSize = 5; // Define number of users per page
      const skip = (page - 1) * pageSize; // Calculate the offset

      try {
        // Query the leaderboard with pagination and ordering
        const leaderboard = await ctx.prisma.userPoints.findMany({
          take: pageSize,
          skip: skip,
          orderBy: {
            totalPoints: 'desc', // Ordering by points in descending order
          },
          select: {
            user: {
              select: {
                id: true,
                walletAddress: true,
                avatar: true,
              },
            },
            totalPoints: true,
            level: true,
          },
        });

        // Transforming the data for the response, including the rank
        return leaderboard.map((entry, index) => ({
          rank: skip + index + 1,
          userId: entry.user.id,
          username: entry.user.walletAddress,
          points: entry.totalPoints,
          level: entry.level,
          avatar: entry.user.avatar,
        }));
      } catch (error) {
        // Handling potential errors
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to load leaderboard',
        });
      }
    }),
});

export type LeaderboardRouter = typeof leaderboardRouter;
