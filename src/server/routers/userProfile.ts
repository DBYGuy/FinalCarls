// src/server/trpc/router/userProfileRouter.ts
import { router, procedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

export const userProfileRouter = router({
  // Procedure to get user profile information
  getUserProfile: procedure
    .input(z.string()) // Expecting a user ID as input
    .query(async ({ input: userId }) => {
      // Fetch user and related userProfile data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          userProfile: true, // include all information from userProfile
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Construct the response object with the desired fields
      const userProfileData = {
        walletAddress: user.walletAddress,
        ENSName: user.ENSName,
        displayName: user.displayName,
        username: user.username,
        xhandle: user.Xhandle,
        discordid: user.discordID,
        ...user.userProfile, // Spread all fields from userProfile
      };

      return userProfileData;
    }),
  // Procedure to update user profile information
  update: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        location: z.string().optional(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, location, bio } = input;

      // Check for user existence
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Update the userProfile with new data
      const updatedUserProfile = await prisma.userProfile.update({
        where: { userId },
        data: { location, bio },
      });

      return updatedUserProfile;
    }),
});

export type UserProfileRouter = typeof userProfileRouter;
