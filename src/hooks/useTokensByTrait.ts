import { useEffect, useState } from 'react';
import { trpc } from '~/utils/trpc';
import { TokenType } from '~/components/DesktopDirectory';

export const useTokensByTrait = (
  traitType: string,
  value: string,
  itemsPerPage = 12,
) => {
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [page, setPage] = useState(0);

  const { data, isLoading } = trpc.token.byTrait.useQuery({
    traitType,
    value,
    page,
    itemsPerPage,
  });

  useEffect(() => {
    setTokens([]);
    setPage(0);
  }, [traitType, value]);

  useEffect(() => {
    if (data && !isLoading) {
      // Append new data to existing tokens, ensuring each token has the selectedTraits property
      setTokens((prevTokens) => [
        ...prevTokens,
        ...data.map((token) => ({
          ...token,
          selectedTraits: [], // Initialize selectedTraits
        })),
      ]);
    }
  }, [data, isLoading]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { tokens, loadMore };
};
