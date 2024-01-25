import React, { useState, useRef, useEffect } from 'react';
import { useTokenSearch } from '~/hooks/useTokenSearch';

export interface SearchResult {
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

interface SearchBarProps {
  onSelect: (result: SearchResult) => void;
  onEnterPress: (results: SearchResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelect, onEnterPress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { results, isLoading, isError } = useTokenSearch(searchTerm);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchBarRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsResultsVisible(true);
  };

  const handleInputFocus = () => {
    if (results && results.length > 0) {
      setIsResultsVisible(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterPress(results);
    }
  };

  return (
    <div
      className="relative w-full max-w-[400px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-10 bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] rounded-full shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] flex items-center px-4"
      ref={searchBarRef}
    >
      <img className="mr-2.5 w-6 h-6" src="/icons20pxsearch.svg" alt="Search" />
      <input
        type="text"
        placeholder="Search for anything..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-transparent border-none outline-none text-sm text-black placeholder-gray-500"
      />
      {isLoading && searchTerm && <div>Loading...</div>}
      {isResultsVisible && results && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-black shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-b-md z-10">
          {results.slice(0, 6).map((result, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => onSelect(result)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
      {isError && <div>Error loading results.</div>}
    </div>
  );
};

export default SearchBar;
