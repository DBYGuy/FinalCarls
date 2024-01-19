import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/context/db'; // Adjust the import path
import { uploadImageToS3 } from '~/utils/s3'; // Adjust the import path

export default async function updateTokenImagesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Fetch all tokens from the database
    const tokens = await prisma.token.findMany();

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
      } else {
        console.warn(`Token ${token.tokenID} does not have an image URL.`);
      }
    }

    res.status(200).json({ message: 'Token images updated successfully' });
  } catch (error) {
    console.error('Failed to update token images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
