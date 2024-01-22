import { useEffect, useState } from 'react';
import { useMe } from './useMe';
import { itscTigerContract } from '~/contracts/tiger';
import { getOpenSeaTokenBaseAddress } from '~/utils/wallet';
import { trpc } from '~/utils/trpc';

export interface TokenMetadata {
  readonly name: string;
  readonly description: string;
  readonly image: string;
}
export interface NftProps {
  readonly tokenID: number;
  readonly name: string;
  readonly src: string; // Assuming this is the image URL
  readonly s3ImageUrl?: string;
  readonly ownerID: string | null;
  readonly lastUpdated: Date | null;
  readonly href: string;
}

export interface Attribute {
  trait_type: string;
  value: string;
}
export const useTigerNfts = () => {
  const [nfts, setNfts] = useState<NftProps[] | undefined>();
  const { user, isLoading } = useMe();
  const ownerid = user?.id ?? '';
  const { data: userNfts, isLoading: isLoadingTokens } =
    trpc.token.byOwner.useQuery(ownerid);

  useEffect(() => {
    if (!isLoading && userNfts) {
      const formattedNfts = userNfts.map((nft) => ({
        tokenID: nft.tokenID,
        name: nft.name,
        src: nft.s3ImageUrl ?? nft.image, // Use s3ImageUrl if available, otherwise use image
        s3ImageUrl: nft.s3ImageUrl ?? '',
        ownerID: nft.ownerID,
        lastUpdated: nft.lastUpdated,
        href: `${getOpenSeaTokenBaseAddress()}/${
          itscTigerContract.address as `0x${string}`
        }/${Number(nft.name.split('#')[1]?.match(/\d+/)?.[0] ?? '')}`,
      }));
      setNfts(formattedNfts);
    }
  }, [userNfts, isLoading]);

  return nfts;
};
