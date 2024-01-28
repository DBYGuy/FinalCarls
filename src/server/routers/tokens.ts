import { router, procedure } from '../trpc'; // Adjust with your actual tRPC setup import paths
import { z } from 'zod';

export const tokenRouter = router({
  byTrait: procedure
    .input(
      z.object({
        traitType: z.string(),
        value: z.string(),
        page: z.number().min(0).default(0),
        itemsPerPage: z.number().min(1).default(12),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { traitType, value, page, itemsPerPage } = input;
      const skip = page * itemsPerPage;

      return ctx.prisma.token.findMany({
        where: {
          tokenTraits: {
            some: {
              traitType: traitType,
              value: value,
            },
          },
        },
        skip,
        take: itemsPerPage,
        include: {
          owner: true,
          tokenTraits: {
            where: {
              value: {
                not: 'none', // Exclude traits with value 'none'
              },
            },
          },
        },
      });
    }),

  byOwner: procedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.prisma.token.findMany({
      where: {
        ownerID: input,
      },
    });
  }),

  search: procedure
    .input(
      z.object({
        query: z.string().optional(),
        page: z.number().min(0).default(0),
        itemsPerPage: z.number().min(1).default(12),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { query, page, itemsPerPage } = input;
      const skip = page * itemsPerPage;

      if (!query) {
        // Logic to fetch default tokens when the search term is empty
        // This could be fetching popular or random tokens, for example
        return ctx.prisma.token.findMany({
          skip,
          take: itemsPerPage,
          include: {
            owner: true,
            tokenTraits: {
              where: {
                value: {
                  not: 'none', // Exclude traits with value 'none'
                },
              },
            },
          },
          // Additional logic to determine which tokens to fetch by default
        });
      } else {
        // Regular search logic
        return ctx.prisma.token.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              {
                tokenTraits: {
                  some: { value: { contains: query, mode: 'insensitive' } },
                },
              },
              {
                owner: {
                  OR: [
                    { walletAddress: { contains: query, mode: 'insensitive' } },
                    { username: { contains: query, mode: 'insensitive' } },
                    { ENSName: { contains: query, mode: 'insensitive' } },
                  ],
                },
              },
              { ownerAddress: { contains: query, mode: 'insensitive' } }, // Added condition for ownerAddress
              // Add other searchable fields as necessary
            ],
          },
          skip,
          take: itemsPerPage,
          include: {
            owner: true,
            tokenTraits: {
              where: {
                value: {
                  not: 'none', // Exclude traits with value 'none'
                },
              },
            },
          },
        });
      }
    }),

  getTokenDetails: procedure.input(z.number()).query(async ({ input, ctx }) => {
    const tokenID = input;
    return ctx.prisma.token.findUnique({
      where: { tokenID },
      include: {
        tokenTraits: true,
      },
    });
  }),
  updateTokenMetadata: procedure
    .input(
      z.object({
        tokenID: z.number(),
        newMetadata: z.object({
          image: z.string(),
          name: z.string(),
          // Include other metadata fields as needed
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { tokenID, newMetadata } = input;
      return ctx.prisma.token.update({
        where: { tokenID },
        data: newMetadata,
      });
    }),

  updateTokenTraits: procedure
    .input(
      z.object({
        tokenID: z.number(),
        traits: z.array(
          z.object({
            traitType: z.string(),
            value: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { tokenID, traits } = input;

      await ctx.prisma.tokenTrait.deleteMany({ where: { tokenID } });

      const newTraits = traits.map((trait) => ({
        ...trait,
        tokenID,
      }));

      return ctx.prisma.tokenTrait.createMany({
        data: newTraits,
      });
    }),
  getTraitTypesAndValues: procedure.query(async ({ ctx }) => {
    const traitTypes = await ctx.prisma.tokenTrait.findMany({
      select: {
        traitType: true,
        value: true,
      },
      distinct: ['traitType', 'value'],
    });

    // Group values by trait types
    const groupedTraits = traitTypes.reduce((acc, trait) => {
      if (acc && trait.traitType && trait.value) {
        acc[trait.traitType] = acc[trait.traitType] ?? [];
        acc[trait.traitType]?.push(trait.value);
      }
      return acc;
    }, {} as Record<string, string[]>);

    return groupedTraits;
  }),
});
