import { useState } from 'react';
import { trpc } from '../utils/trpc';

export const usePaginatedTokens = () => {
  const [page, setPage] = useState(0);
  const pageSize = 50;
  const { data, isLoading, error, refetch } =
    trpc.token.getPaginatedTokens.useQuery({
      page,
      pageSize,
    });

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    refetch();
  };

  return {
    tokens: data ?? [],
    isLoading,
    error,
    loadMore,
  };
};
