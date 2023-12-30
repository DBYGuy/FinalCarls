import { useState, useEffect } from 'react';
import axios from 'axios';
import { NftProps, Attribute, TokenMetadata } from './useTigerNfts'; // Adjust paths as necessary

// Helper function to generate an array of random numbers
const generateRandomIds = (count: number, max: number): number[] => {
  const randomIds = new Set<number>();
  while (randomIds.size < count) {
    const id = Math.floor(Math.random() * max) + 1;
    randomIds.add(id);
  }
  return Array.from(randomIds);
};

export const useGalleryNfts = () => {
  const [nfts, setNfts] = useState<NftProps[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch NFTs based on an array of IDs
  const fetchNftsByIds = async (ids: number[]) => {
    const tokenMetadatas: TokenMetadata[] = [];
    for (const tokenId of ids) {
      try {
        const tokenMetadata = (
          await axios.get<TokenMetadata>(
            `https://example.com/path/to/metadata/${tokenId}.json`, // Adjust URL accordingly
          )
        ).data;
        tokenMetadatas.push(tokenMetadata);
      } catch (err) {
        console.error(`Failed to fetch token metadata for token ${tokenId}`);
        console.error(err);
      }
    }

    return tokenMetadatas.map(({ name, description, image, attributes }) => ({
      name,
      src: image,
      description,
      href: `https://example.com/path/to/nft/${name}`, // Adjust URL accordingly
      attributes,
    }));
  };

  // Load initial NFTs
  useEffect(() => {
    const loadInitialNfts = async () => {
      setLoading(true);
      const randomIds = generateRandomIds(12, 10000); // Get 12 random IDs from 1-10000
      const galleryNfts = await fetchNftsByIds(randomIds);
      setNfts(galleryNfts);
      setLoading(false);
    };

    loadInitialNfts();
  }, []); // Empty dependency array to run only once on mount

  // Function to load more NFTs
  const loadMoreNfts = async () => {
    setLoading(true);
    const moreIds = generateRandomIds(12, 10000); // Generate more random IDs
    const moreNfts = await fetchNftsByIds(moreIds);
    setNfts((prevNfts) => [...prevNfts, ...moreNfts]); // Append new NFTs
    setLoading(false);
  };

  return {
    nfts,
    loading,
    loadMoreNfts,
  };
};
