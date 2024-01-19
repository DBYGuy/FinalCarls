import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ethers, InterfaceAbi } from 'ethers';
import { prisma } from '../../server/context/db';
import { itscTigerContract } from '~/contracts/tiger';

async function fetchTokenMetadata(tokenId: number): Promise<any> {
  try {
    // Use full URL for server-side requests
    const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
    const response = await axios.get(`${baseUrl}/api/nft?tokenId=${tokenId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch token metadata for token ${tokenId}:`,
      error,
    );
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
  try {
    const totalSupply = await getTotalSupply();
    const provider = ethers.getDefaultProvider('mainnet', {
      infura: process.env.INFURA_API_KEY,
    });
    const contract = new ethers.Contract(
      itscTigerContract.address as `0x${string}`,
      itscTigerContract.abi as InterfaceAbi,
      provider,
    );

    for (let tokenId = 1; tokenId <= totalSupply; tokenId++) {
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

    res.status(200).json({ message: 'Tokens updated successfully' });
  } catch (error) {
    console.error('Failed to update tokens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
