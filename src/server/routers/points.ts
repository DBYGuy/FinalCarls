import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, protectedProcedure, router } from '../trpc';

export const userPointsRouter = router({
  // Procedure to get user's point total
  getUserPoints: procedure
    .input(z.string()) // Expecting a user ID as input
    .query(async ({ input: userId, ctx }) => {
      // Fetching user points from the database
      const userPoints = await ctx.prisma.userPoints.findUnique({
        where: { userId },
      });

      if (!userPoints) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User points not found.',
        });
      }

      return userPoints.totalPoints;
    }),
  // Procedure to add points to a user's total
  updateUserPoints: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        additionalPoints: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, additionalPoints } = input;

      // Fetch current user points
      const currentUserPoints = await ctx.prisma.userPoints.findUnique({
        where: { userId },
      });

      if (!currentUserPoints) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User points not found.',
        });
      }

      // Update total points and last updated time
      const updatedUserPoints = await ctx.prisma.userPoints.update({
        where: { userId },
        data: {
          totalPoints: currentUserPoints.totalPoints + additionalPoints,
          lastUpdated: new Date(),
        },
      });

      return updatedUserPoints.totalPoints;
    }),
});

export type UserPointsRouter = typeof userPointsRouter;
