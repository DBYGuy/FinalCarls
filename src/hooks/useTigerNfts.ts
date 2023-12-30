import { itscTigerContract } from '~/contracts/tiger';
import { useEffect, useState } from 'react';
import { useItscTigerTokensOfOwner } from '../generated';
import { useUser } from './useUser';
import axios from 'axios';
import { getOpenSeaTokenBaseAddress } from '~/utils/wallet';

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface TokenMetadata {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly attributes: Attribute[];
}

export interface NftProps {
  readonly name: string;
  readonly src: string;
  readonly description: string;
  readonly href: string;
  readonly attributes: Attribute[];
}

export const useTigerNfts = () => {
  const [nfts, setNfts] = useState<NftProps[] | undefined>();
  const user = useUser();
  const { data: tokenIds } = useItscTigerTokensOfOwner({
    enabled: !!user,
    args: [user?.walletAddress as `0x${string}`],
  });
  useEffect(() => {
    const fetchTigerNfts = async () => {
      // Early exit if unable to fetch token ids for user
      if (!tokenIds) {
        return undefined;
      }

      // Fetch all token ids for user
      const tokenMetadatas: TokenMetadata[] = [];
      for (const tokenId of tokenIds) {
        try {
          const tokenMetadata = (
            await axios.get<TokenMetadata>(
              `https://cdn.nftmania.io/pfp/itscrv/json/${tokenId}.json`,
            )
          ).data;
          console.log(tokenMetadata);
          tokenMetadatas.push(tokenMetadata);
        } catch (err) {
          console.error(`Failed to fetch token metadata for token ${tokenId}`);
          console.error(err);
        }
      }

      const tigerNfts: NftProps[] = tokenMetadatas.map(
        ({ name, description, image, attributes }) => ({
          name,
          src: image,
          description,
          href: `${getOpenSeaTokenBaseAddress()}/${
            itscTigerContract.address as `0x${string}`
          }/${Number(name.split('#')[1]) - 1}`,
          attributes,
        }),
      );

      setNfts(tigerNfts);
    };

    fetchTigerNfts();
  }, [tokenIds]);

  return nfts;
};
