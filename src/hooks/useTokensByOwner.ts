import { trpc } from '../utils/trpc';

export const useTokensByOwner = (ownerId: string) => {
  const { data, isLoading, error } = trpc.token.byOwner.useQuery(ownerId);

  return {
    tokens: data ?? [],
    isLoading,
    error,
  };
};
