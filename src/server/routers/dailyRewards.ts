import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, protectedProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient();

export const dailyRewardRouter = router({
  // Procedure 1: Get an array of the entire daily reward table
  getAllDailyRewards: procedure.query(async ({ ctx }) => {
    const rewards = await ctx.prisma.dailyReward.findMany();
    return rewards;
  }),

  // Procedure 2: Query the user's reward day and last claimed date
  getUserReward: procedure
    .input(z.string()) // Expecting a user ID as input
    .query(async ({ input: userId, ctx }) => {
      const userReward = await ctx.prisma.userDailyReward.findUnique({
        where: { userId },
      });
      if (!userReward) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User reward not found',
        });
      }
      return userReward;
    }),

  // Procedure 3: Protected claim reward procedure

  claimReward: protectedProcedure
    .input(
      z.object({
        userId: z.string(), // User ID as input
        tp: z.number(), // tp amount as input
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, tp } = input; // Destructure the input to get userId and tp

      const userReward = await ctx.prisma.userDailyReward.findUnique({
        where: { userId },
      });
      if (!userReward) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User reward not found',
        });
      }

      const now = new Date();
      const lastClaimed = userReward.lastClaimed ?? new Date(0);
      const timeDiff = now.getTime() - lastClaimed.getTime();

      if (userReward.currentDay !== 0) {
        if (timeDiff < 24 * 60 * 60 * 1000 || timeDiff > 48 * 60 * 60 * 1000) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Claim not within the allowed time frame',
          });
        }
      }
      const nextDay =
        userReward.currentDay === 6 ? 0 : userReward.currentDay + 1;

      // Update user points with the provided tp amount
      await ctx.prisma.userPoints.update({
        where: { userId },
        data: {
          totalPoints: { increment: tp },
          lastUpdated: now,
        },
      });

      await ctx.prisma.userDailyReward.update({
        where: { userId },
        data: {
          currentDay: nextDay,
          lastClaimed: now,
        },
      });

      return { success: true, newPointsTotal: tp }; // Return the tp amount as newPointsTotal
    }),

  // Procedure 4: Protected procedure which resets the user day to 0
  resetUserDay: protectedProcedure
    .input(z.string()) // Expecting a user ID as input
    .mutation(async ({ input: userId, ctx }) => {
      await ctx.prisma.userDailyReward.update({
        where: { userId },
        data: {
          currentDay: 0,
          lastClaimed: new Date(),
        },
      });

      return { success: true };
    }),
});

export type DailyRewardRouter = typeof dailyRewardRouter;
