import { useState, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import type { SearchResult } from '~/components/SearchBar';
import useDebounce from '~/hooks/useDebounce';
import { useMe } from '~/hooks/useMe';

export const useTokenSearch = (searchTerm: string, itemsPerPage = 12) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { user } = useMe();

  const { data, isLoading, isError } = trpc.token.search.useQuery(
    {
      query: debouncedSearchTerm || undefined, // Handle empty search term
      page,
      itemsPerPage,
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: !!user,
    },
  );

  useEffect(() => {
    // Fetch default tokens when search term is empty
    if (!searchTerm) {
      // Logic to fetch default tokens
      // This could be a separate API call or a modification of the existing one
      // Example: Fetch popular or random tokens
    } else if (searchTerm !== debouncedSearchTerm) {
      setResults([]);
      setPage(0);
    }
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => {
    if (data && !isError) {
      setResults((prevResults) => {
        const existingIDs = new Set(
          prevResults.map((result) => result.tokenID),
        );
        const newResults = data
          .filter((result) => !existingIDs.has(result.tokenID))
          .map((result) => {
            // Add the selectedTraits property to each result
            return {
              ...result,
              selectedTraits: [], // Initialize selectedTraits as an empty array
            };
          });
        return [...prevResults, ...newResults];
      });
    }
  }, [data, isLoading, isError, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { results, isLoading, isError, loadMore };
};
