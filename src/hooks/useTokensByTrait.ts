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
    // Reset tokens and page when traitType or value changes
    setTokens([]);
    setPage(0);
  }, [traitType, value]);

  useEffect(() => {
    if (data && !isLoading) {
      // Append new data to existing tokens
      setTokens((prevTokens) => [...prevTokens, ...data]);
    }
  }, [data, isLoading]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { tokens, loadMore };
};
