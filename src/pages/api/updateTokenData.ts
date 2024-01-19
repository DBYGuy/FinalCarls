import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ethers, InterfaceAbi } from 'ethers';
import { prisma } from '../../server/context/db';
import { itscTigerContract } from '~/contracts/tiger';

async function fetchTokenMetadata(tokenId: number): Promise<any> {
  try {
    let baseUrl;
    if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
      baseUrl = 'https://itsc.vercel.app';
    } else {
      baseUrl = 'http://localhost:3000'; // Default to localhost for development
    }

    const url = `${baseUrl}/api/nft?tokenId=${tokenId}`;
    console.log(`Fetching token metadata from: ${url}`); // Log the URL being used
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch token metadata for token ${tokenId}`, error);
    throw error;
  }
}

async function getTotalSupply(): Promise<number> {
  const provider = ethers.getDefaultProvider('mainnet', {
    infura: process.env.INFURA_API_KEY,
  });
  const contract = new ethers.Contract(
    itscTigerContract.address as `0x${string}`,
    itscTigerContract.abi as InterfaceAbi,
    provider,
  ) as ethers.Contract & { totalSupply: () => Promise<number> };

  try {
    const totalSupplyBigNumber = await contract.totalSupply();
    return 2400;
  } catch (error) {
    console.error('Error fetching total supply:', error);
    return 2400; // Fallback value if totalSupply is undefined or call fails
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ensure the Authorization header is a string or undefined
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
    // Fetch the last processed token ID
    const cronState = (await prisma.cronJobState.findFirst()) || {
      lastTokenId: 0,
    };
    let lastTokenId = cronState.lastTokenId;

    const totalSupply = await getTotalSupply();
    const provider = ethers.getDefaultProvider('mainnet', {
      infura: process.env.INFURA_API_KEY,
    });
    const contract = new ethers.Contract(
      itscTigerContract.address as `0x${string}`,
      itscTigerContract.abi as InterfaceAbi,
      provider,
    );

    // Process the next 10 tokens
    for (let i = 0; i < 10; i++) {
      const tokenId = ((lastTokenId + i) % totalSupply) + 1;
      try {
        const metadata = await fetchTokenMetadata(tokenId);
        console.log(`Processing token ID: ${tokenId}`);

        let ownerAddress = '';
        try {
          if (typeof contract.ownerOf === 'function') {
            ownerAddress = await contract.ownerOf(Number(tokenId));
          }
        } catch (error) {
          console.error(`Failed to fetch owner for token ${tokenId}:`, error);
        }

        let user = null;
        try {
          user = await prisma.user.findUnique({
            where: { walletAddress: ownerAddress },
          });
        } catch (error) {
          console.error(`Failed to find user for token ${tokenId}:`, error);
        }

        await prisma.token.upsert({
          where: { tokenID: tokenId },
          update: {
            ownerID: user?.id ?? null,
            ownerAddress: ownerAddress,
          },
          create: {
            tokenID: tokenId,
            image: metadata.image,
            name: metadata.name,
            ownerID: user?.id ?? null,
            ownerAddress: ownerAddress,
          },
        });

        await prisma.tokenTrait.deleteMany({ where: { tokenID: tokenId } });

        if (metadata.attributes && Array.isArray(metadata.attributes)) {
          await prisma.tokenTrait.createMany({
            data: metadata.attributes.map((attr: any) => ({
              tokenID: tokenId,
              traitType: attr.trait_type,
              value: attr.value,
            })),
          });
        } else {
          console.error(`No attributes found for token ${tokenId}`);
        }
      } catch (error) {
        console.error(`Failed to process token ${tokenId}:`, error);
      }
    }
    lastTokenId = (lastTokenId + 10) % totalSupply;
    if ('id' in cronState && cronState.id) {
      // Update the existing record
      await prisma.cronJobState.update({
        where: { id: cronState.id },
        data: { lastTokenId },
      });
    } else {
      // Create a new record
      await prisma.cronJobState.create({
        data: { lastTokenId },
      });
    }

    res.status(200).json({ message: 'Tokens updated successfully' });
  } catch (error) {
    console.error('Failed to update tokens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
