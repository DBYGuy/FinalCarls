import { router, procedure } from '../trpc'; // Adjust with your actual tRPC setup import paths
import { z } from 'zod';

export const tokenRouter = router({
  byTrait: procedure
    .input(z.object({ traitType: z.string(), value: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.token.findMany({
        where: {
          tokenTraits: {
            some: {
              traitType: input.traitType,
              value: input.value,
            },
          },
        },
        include: {
          tokenTraits: true,
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
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { query } = input;
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
        include: {
          owner: true,
          tokenTraits: true,
        },
      });
    }),

  byMetadata: procedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .query(async ({ input, ctx }) => {
      // This is a placeholder - actual implementation will depend on how metadata is stored and structured
      return ctx.prisma.token.findMany({
        where: {
          // Your metadata query logic here
        },
      });
    }),
  getTokenDetails: procedure
    .input(z.number()) // Assuming tokenID is a number
    .query(async ({ input, ctx }) => {
      const tokenID = input;
      return ctx.prisma.token.findUnique({
        where: { tokenID },
        include: {
          tokenTraits: true, // Include related traits if necessary
          // Include other relations if needed
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

      // This assumes a "replace all traits" strategy. Adjust as needed.
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
  getPaginatedTokens: procedure
    .input(
      z.object({
        page: z.number().min(0).default(0),
        pageSize: z.number().min(1).default(50),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize } = input;
      const skip = page * pageSize;
      return ctx.prisma.token.findMany({
        skip,
        take: pageSize,
        orderBy: {
          tokenID: 'asc', // Order by tokenID in descending order
        },
        include: {
          tokenTraits: true,
        },
      });
    }),
});
