import { trpc } from '../utils/trpc'; // Adjust the import path as needed

export const useTokensByTrait = (traitType: string, value: string) => {
  const { data, isLoading, error } = trpc.token.byTrait.useQuery(
    { traitType, value },
    {
      // Only run the query if both traitType and value are provided
      enabled: !!traitType && !!value,
    },
  );

  const tokens = data ?? [];

  return {
    tokens,
    isLoading,
    error,
  };
};
