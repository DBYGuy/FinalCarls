import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const levelRouter = router({
  // Procedure to get user's level
  getUserLevel: procedure
    .input(z.string()) // Expecting a user ID as input
    .query(async ({ input: userId, ctx }) => {
      // Fetching user level from the database
      const userProfile = await ctx.prisma.userProfile.findUnique({
        where: { userId },
      });

      if (!userProfile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile not found.',
        });
      }

      return userProfile.level;
    }),
  checkLevelEligibility: procedure
    .input(z.string()) // Expecting a user ID as input
    .query(async ({ input: userId, ctx }) => {
      const userProfile = await ctx.prisma.userProfile.findUnique({
        where: { userId },
      });
      const userPoints = await ctx.prisma.userPoints.findUnique({
        where: { userId },
      });

      if (!userProfile || !userPoints) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile or points not found.',
        });
      }

      const nextLevel = await ctx.prisma.level.findUnique({
        where: { level: userProfile.level + 1 },
      });

      if (!nextLevel) {
        // Assuming this means they are at the highest level
        return { isEligible: false, toNextLevel: 0 };
      }

      const isEligible = userPoints.totalPoints >= nextLevel.points;
      const toNextLevel = Math.max(
        0,
        nextLevel.points - userPoints.totalPoints,
      );

      return { isEligible, toNextLevel };
    }),
  // Procedure to level up the user
  levelUp: procedure
    .input(z.string()) // Expecting a user ID as input
    .mutation(async ({ input: userId, ctx }) => {
      const userProfile = await ctx.prisma.userProfile.findUnique({
        where: { userId },
      });
      const userPoints = await ctx.prisma.userPoints.findUnique({
        where: { userId },
      });

      if (!userProfile || !userPoints) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile or points not found.',
        });
      }

      const nextLevel = await ctx.prisma.level.findUnique({
        where: { level: userProfile.level + 1 },
      });

      if (!nextLevel) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Next level not found.',
        });
      }

      if (userPoints.totalPoints < nextLevel.points) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Not enough points to level up.',
        });
      }

      // Deduct points and increment level
      await ctx.prisma.userPoints.update({
        where: { userId },
        data: {
          totalPoints: userPoints.totalPoints - nextLevel.points,
        },
      });

      await ctx.prisma.userProfile.update({
        where: { userId },
        data: { level: userProfile.level + 1 },
      });

      return { success: true, newLevel: userProfile.level + 1 };
    }),
});

export type LevelRouter = typeof levelRouter;
