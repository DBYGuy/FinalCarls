import { useState, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import useDebounce from './useDebounce';

interface SearchResult {
  tokenID: number;
  name: string;
  s3ImageUrl: string | null;
  owner: {
    walletAddress: string;
    username: string | null;
    ENSName: string | null;
  } | null;
  // Add other fields as necessary
}

export const useTokenSearch = (searchTerm: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = trpc.token.search.useQuery(
    { query: debouncedSearchTerm },
    {
      enabled: debouncedSearchTerm.length > 0,
    },
  );

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setResults(data);
    }
  }, [data, isLoading, isError]);

  return { results, isLoading, isError };
};
