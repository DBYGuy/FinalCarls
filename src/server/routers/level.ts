import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const levelRouter = router({
  // Procedure to get user's level
  getUserLevel: procedure
    .input(z.string()) // Expecting a user ID as input
    .query(async ({ input: userId, ctx }) => {
      // Fetching user level from the database
      const userPoints = await ctx.prisma.userPoints.findUnique({
        where: { userId },
      });

      if (!userPoints) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile not found.',
        });
      }

      return userPoints.level;
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
        where: { level: userPoints.level + 1 },
      });

      if (!nextLevel) {
        // Assuming this means they are at the highest level
        return { isEligible: false, toNextLevel: 0 };
      }

      const nextLevelPoints = nextLevel.points;

      const isEligible = userPoints.totalPoints >= nextLevelPoints;
      const toNextLevel = Math.max(0, nextLevelPoints - userPoints.totalPoints);

      return { isEligible, toNextLevel, nextLevelPoints };
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
        where: { level: userPoints.level + 1 },
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

      await ctx.prisma.userPoints.update({
        where: { userId },
        data: { level: userPoints.level + 1 },
      });

      return { success: true, newLevel: userPoints.level + 1 };
    }),
});

export type LevelRouter = typeof levelRouter;
