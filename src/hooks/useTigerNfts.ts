import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMe } from './useMe';
import { useItscTigerTokensOfOwner } from '../generated';
import { itscTigerContract } from '~/contracts/tiger';
import { getOpenSeaTokenBaseAddress } from '~/utils/wallet';

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface TokenMetadata {
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

export interface NftProps {
  readonly name: string;
  readonly src: string;
  readonly description: string;
  readonly href: string;
}

export const useTigerNfts = () => {
  const [nfts, setNfts] = useState<NftProps[] | undefined>();
  const user = useMe();
  const {
    data: tokenIds,
    isError,
    isLoading,
  } = useItscTigerTokensOfOwner({
    enabled: !!user,
    args: [user?.walletAddress as `0x${string}`],
  });

  console.log(tokenIds);
  console.log(isError);

  useEffect(() => {
    const fetchTigerNfts = async () => {
      if (!tokenIds) {
        return;
      }
      const tokenMetadatas: TokenMetadata[] = [];
      for (const tokenId of tokenIds) {
        try {
          const response = await axios.get(`/api/nft?tokenId=${tokenId}`);
          tokenMetadatas.push(response.data);
        } catch (err) {
          console.error(
            `Failed to fetch token metadata for token ${tokenId}:`,
            err,
          );
        }
      }

      const tigerNfts: NftProps[] = tokenMetadatas.map(
        ({ name, description, image }) => ({
          name,
          src: image,
          description,
          href: `${getOpenSeaTokenBaseAddress()}/${
            itscTigerContract.address as `0x${string}`
          }/${Number(name.split('#')[1]?.match(/\d+/)?.[0] ?? '')}`,
        }),
      );

      setNfts(tigerNfts);
    };

    fetchTigerNfts();
  }, [tokenIds, isError, isLoading]);

  return nfts;
};
