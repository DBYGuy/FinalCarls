import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the structure of the NFT data based on the JSON response
type NftAttribute = {
  trait_type: string;
  value: string;
};

type NftData = {
  name: string;
  description: string;
  image: string;
  attributes: NftAttribute[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftData | { message: string }>,
) {
  const { tokenId } = req.query;
  try {
    // Ensure tokenId is a string or has a default value, as req.query can be string | string[] | undefined
    const response = await axios.get<NftData>(
      `https://cdn.nftmania.io/pfp/itscrv/json/${
        typeof tokenId === 'string' ? tokenId : ''
      }.json`,
    );
    // Directly pass the JSON data to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors, possibly logging them and sending a user-friendly message
    console.error('Error fetching NFT data:', error);
    res.status(500).json({ message: 'Error fetching NFT data' });
  }
}
