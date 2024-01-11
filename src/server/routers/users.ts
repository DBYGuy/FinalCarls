import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { isEthereumWalletAddress, isUUID } from '../../utils/wallet';
import { procedure, protectedProcedure, router } from '../trpc';

export interface Ens {
  address: string;
  name: string;
}

export interface SearchResults {
  itscUsers: User[];
  ens?: Ens;
  walletAddress?: string;
}

export const usersRouter = router({
  /** Retrieves PUBLIC info for a user */
  byUsernameOrAddress: procedure
    .input(z.string())
    .query(async ({ input: usernameOrAddress, ctx }) => {
      const isAddress = isEthereumWalletAddress(usernameOrAddress);
      const isAddressUUID = isUUID(usernameOrAddress);

      const user = await ctx.prisma.user.findFirst({
        where:
          isAddress || isAddressUUID
            ? { walletAddress: usernameOrAddress }
            : { username: usernameOrAddress },
        include: { accounts: true },
      });

      if (!user) {
        return null;
      }

      // Sanitize user (IMPORTANT)
      user.associatedEmail = null;

      return user;
    }),
  updateAvatar: protectedProcedure
    .input(
      z.object({
        avatarUrl: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Ensure the user is authenticated
      if (!ctx.session?.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to update your avatar',
        });
      }

      try {
        const updatedUser = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: { avatar: input.avatarUrl },
        });

        return updatedUser;
      } catch (error) {
        // Handle potential errors, such as database errors
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update avatar',
        });
      }
    }),

  createFromEns: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: walletAddress, ctx }) => {
      const user = await ctx.prisma.user.upsert({
        where: {
          walletAddress,
        },
        update: {},
        create: {
          walletAddress,
        },
      });

      return user;
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      include: {
        accounts: {
          select: {
            type: true,
          },
        },
      },
    });

    return user;
  }),
  /** Create a user from a wallet address */
  createUserFromWalletAddress: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: walletInput, ctx }) => {
      const user = await ctx.prisma.user.upsert({
        where: {
          walletAddress: walletInput,
        },
        update: {},
        create: {
          walletAddress: walletInput,
        },
      });

      return user;
    }),

  update: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        username: z.string().min(3).max(20).nullish(),
        Xhandle: z.string().min(3).max(20).nullish(),
        discordID: z.string().min(3).max(20).nullish(),
      }),
    )
    .mutation(async ({ input: { userId: id, ...data }, ctx }) => {
      let user: User | undefined;

      // Early exit if passed-in id is different from session (TODO, just use session id, no need to pass in an id)
      if (ctx.session?.user.id !== id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot update other user.',
        });
      }

      try {
        user = await ctx.prisma.user.update({
          where: { id },
          data,
        });
      } catch (err) {
        const error = err as PrismaClientKnownRequestError;
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Username already taken.',
          });
        } else {
          throw err;
        }
      }

      return user;
    }),
});

export type UserRouter = typeof usersRouter;
