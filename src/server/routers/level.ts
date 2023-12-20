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
});

export type LevelRouter = typeof levelRouter;
