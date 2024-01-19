import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/context/db'; // Adjust the import path
import { uploadImageToS3 } from '~/utils/s3'; // Adjust the import path

export default async function updateTokenImagesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Security check for production environment
  const authHeader = Array.isArray(req.headers.authorization)
    ? req.headers.authorization[0]
    : req.headers.authorization;

  if (
    process.env.NEXT_PUBLIC_APP_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end('Unauthorized');
  }

  try {
    // Fetch the last processed image token ID
    const cronState = await prisma.cronJobState.findFirst();
    let lastImageTokenId = cronState?.lastImageTokenId || 0;

    // Fetch next 5 tokens starting from the last processed token
    const tokens = await prisma.token.findMany({
      where: {
        tokenID: {
          gt: lastImageTokenId,
        },
      },
      take: 5,
      orderBy: {
        tokenID: 'asc',
      },
    });

    for (const token of tokens) {
      if (token.image) {
        const s3Key = `tokens/${token.tokenID}.jpg`;
        const s3ImageUrl = await uploadImageToS3(
          token.image,
          'itsctigers',
          s3Key,
        );

        // Update the database with the S3 image URL
        await prisma.token.update({
          where: { tokenID: token.tokenID },
          data: { s3ImageUrl: s3ImageUrl },
        });

        // Update the last processed image token ID
        lastImageTokenId = token.tokenID;
      } else {
        console.warn(`Token ${token.tokenID} does not have an image URL.`);
      }
    }

    // Update the cron job state with the new last processed image token ID
    await prisma.cronJobState.update({
      where: { id: cronState?.id },
      data: { lastImageTokenId },
    });

    res.status(200).json({ message: 'Token images updated successfully' });
  } catch (error) {
    console.error('Failed to update token images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
