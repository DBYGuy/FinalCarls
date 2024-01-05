import axios from 'axios';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { TIGER_ADDRESS } from '~/contracts/tiger';
import { getOpenSeaCollectionBaseAddress } from '~/utils/wallet';

export interface Token {
  image: string;
  name: string;
  description: string;
  contract: string;
  tokenId: string;
}

export interface UserTokenResponse {
  tokens: { token: Token }[];
}

export const getTigerNfts = async (address: string) => {
  const instance = axios.create({
    headers: { 'x-api-key': process.env.RESERVOIR_API_KEY },
  });

  try {
    const response = await instance.get<UserTokenResponse>(
      `https://api.reservoir.tools/users/${address}/tokens/v7`,
      {
        params: { collection: TIGER_ADDRESS, limit: '200' },
      },
    );

    const tigers = response.data.tokens.map(({ token }) => ({
      src: token.image,
      name: token.name,
      description: 'The greatest NFTs in the world, Tigers.', // TODO: UPDATE
      href: `${getOpenSeaCollectionBaseAddress()}/assets/ethereum/${
        token.contract
      }/${token.tokenId}`,
    }));

    return tigers;
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to fetch tokens',
      cause: err,
    });
  }
};

export const tokensRouter = router({
  getTigers: procedure.input(z.string()).query(async ({ input: address }) => {
    return getTigerNfts(address);
  }),
});

export type TokensRouter = typeof tokensRouter;
