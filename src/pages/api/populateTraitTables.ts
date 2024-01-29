import { prisma } from '../../server/context/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function populateTraitTables(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Fetch distinct trait types and values
    const tokenTraits = await prisma.tokenTrait.findMany({
      select: {
        traitType: true,
        value: true,
      },
      distinct: ['traitType', 'value'],
    });

    // Process each trait type and value
    for (const { traitType, value } of tokenTraits) {
      // Check if the trait type already exists
      let traitTypeRecord = await prisma.traitType.findUnique({
        where: { name: traitType },
      });

      // If not, create it
      if (!traitTypeRecord) {
        traitTypeRecord = await prisma.traitType.create({
          data: { name: traitType },
        });
      }

      // Check if the trait value already exists for this type
      const existingTraitValue = await prisma.traitValue.findFirst({
        where: {
          value: value,
          traitTypeId: traitTypeRecord.id,
        },
      });

      // If not, create it
      if (!existingTraitValue) {
        await prisma.traitValue.create({
          data: {
            value: value,
            traitTypeId: traitTypeRecord.id,
          },
        });
      }
    }

    // Send a success response
    res.status(200).json({ message: 'Trait tables populated successfully' });
  } catch (error) {
    console.error('Error populating trait tables:', error);
    // Send an error response
    res.status(500).json({ error: 'Error populating trait tables' });
  } finally {
    await prisma.$disconnect();
  }
}
