import { useState, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import type { SearchResult } from '~/components/SearchBar'; // Import SearchResult type
import useDebounce from '~/hooks/useDebounce'; // Import useDebounce hook

export const useTokenSearch = (searchTerm: string, itemsPerPage = 12) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = trpc.token.search.useQuery({
    query: debouncedSearchTerm || undefined,
    page,
    itemsPerPage,
  });

  useEffect(() => {
    // Reset results and page only when the actual search term changes
    if (searchTerm !== debouncedSearchTerm) {
      setResults([]);
      setPage(0);
    }
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      // Append new data to existing results
      setResults((prevResults) => {
        // Ensure no duplication of results
        const existingIDs = new Set(
          prevResults.map((result) => result.tokenID),
        );
        const newResults = data.filter(
          (result) => !existingIDs.has(result.tokenID),
        );
        return [...prevResults, ...newResults];
      });
    }
  }, [data, isLoading, isError, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { results, isLoading, isError, loadMore };
};
