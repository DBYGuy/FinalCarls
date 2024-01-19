import { useState, useEffect, useRef } from 'react';
import ProfileCard from '../ProfileCard';
import { usePaginatedTokens } from '~/hooks/usePaginatedTokens';
import { useTokensByTrait } from '~/hooks/useTokensByTrait';
import { useTraitTypesAndValues } from '~/hooks/useTraitTypesAndValues';
import SearchBar from '../SearchBar';
import { SearchResult } from '~/components/SearchBar';

interface TokenTraitType {
  id: number;
  tokenID: number;
  traitType: string;
  value: string;
}

interface TokenType {
  tokenID: number;
  image: string;
  name: string;
  lastUpdated: Date | null;
  s3ImageUrl: string | null;
  ownerID: string | null;
  tokenTraits: TokenTraitType[];
}

interface TokenTraitWithToken {
  token: TokenType;
}

const DesktopDirectory = () => {
  const [selectedTraitType, setSelectedTraitType] = useState<string>('');
  const [selectedTraitValue, setSelectedTraitValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<TokenType | null>(null);
  const [searchResults, setSearchResults] = useState<TokenType[]>([]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const drawerRef = useRef<HTMLDivElement>(null);
  const [lastUpdated, setLastUpdated] = useState<
    'searchResult' | 'searchResults' | 'traits'
  >();
  const {
    tokens: paginatedTokens,
    isLoading: isLoadingPaginated,
    loadMore,
  } = usePaginatedTokens();

  const { traitTypesAndValues } = useTraitTypesAndValues();
  const { tokens: traitTokens, isLoading: isLoadingTrait } = useTokensByTrait(
    selectedTraitType,
    selectedTraitValue,
  );

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleSearchSelect = (selectedResult: SearchResult) => {
    const convertedResult: TokenType = {
      tokenID: selectedResult.tokenID, // Assuming SearchResult has tokenID
      image: selectedResult.s3ImageUrl ?? '',
      name: selectedResult.name,
      lastUpdated: null, // Default value
      s3ImageUrl: selectedResult.s3ImageUrl,
      ownerID: selectedResult.owner?.walletAddress ?? null,
      tokenTraits: [], // Default value or fetch if needed
    };
    setSearchResult(convertedResult);
    setSelectedTraitType('');
    setSelectedTraitValue('');
    setLastUpdated('searchResult');
  };
  const handleEnterPressInSearch = (results: SearchResult[]) => {
    const formattedResults: TokenType[] = results.map((result) => ({
      tokenID: result.tokenID,
      image: result.s3ImageUrl ?? '',
      name: result.name,
      lastUpdated: null, // Default value
      s3ImageUrl: result.s3ImageUrl,
      ownerID: result.owner?.walletAddress ?? null,
      tokenTraits: [], // Default value or fetch if needed
    }));
    if (formattedResults.length > 0) {
      setSearchResults(formattedResults);
      setLastUpdated('searchResults');
    } else {
      setSearchResult(null);
      setSearchResults([]);
      setLastUpdated(undefined);
    }
  };
  const handleTraitCheckboxChange = (
    traitType: string,
    value: string,
    isChecked: boolean,
  ) => {
    if (isChecked) {
      setSelectedTraitType(traitType);
      setSelectedTraitValue(value);
      setLastUpdated('traits');
    } else {
      // Revert to paginated tokens when a trait box is unchecked
      setSelectedTraitType('');
      setSelectedTraitValue('');
      setLastUpdated(undefined);
    }
    setSearchResult(null);
    setSearchResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerRef]);

  const toggleCollapse = (traitType: string) => {
    setCollapsed((prev) => ({ ...prev, [traitType]: !prev[traitType] }));
  };
  useEffect(() => {
    const initialCollapsedState = Object.keys(traitTypesAndValues).reduce<
      Record<string, boolean>
    >((acc, traitType) => {
      acc[traitType] = false; // Start with all traits collapsed
      return acc;
    }, {});
    setCollapsed(initialCollapsedState);
  }, [traitTypesAndValues]);

  let tokens;
  let isLoading;
  if (lastUpdated === 'searchResults' && searchResults.length > 0) {
    tokens = searchResults;
    isLoading = false;
  } else if (lastUpdated === 'searchResult' && searchResult) {
    tokens = [searchResult];
    isLoading = false;
  } else if (lastUpdated === 'traits') {
    tokens = traitTokens;
    isLoading = isLoadingTrait;
  } else {
    tokens = paginatedTokens;
    isLoading = isLoadingPaginated;
  }
  const drawerStyle = {
    transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
  };
  const handleLoadMore = () => {
    // Logic to load more tokens
  };

  return (
    <div className="relative bg-gray-100 w-full h-[1930px] overflow-hidden text-left text-5xl text-white font-outfit">
      <img
        className="absolute top-[258.68px] left-[951.68px] rounded-sm w-[257.53px] h-[286.02px] object-cover"
        alt=""
        src="/snp-04-1@2x.png"
      />

      <div className="absolute top-[572px] left-[calc(50%_-_484px)] flex flex-row items-start justify-start gap-[16px]">
        <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[1092px] h-[400px]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded bg-gray-100 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset]" />
          <div className="absolute top-[0px] left-[calc(50%_-_724px)] grid grid-cols-4 gap-35 h-[80vh] overflow-y-auto">
            {!isLoading &&
              tokens.map((token, index) => {
                return (
                  <ProfileCard
                    key={index}
                    name={token?.name}
                    src={token?.s3ImageUrl ?? token?.image}
                    trait1={token?.tokenTraits?.[0]?.value ?? 'N/A'}
                    trait2={token?.tokenTraits?.[1]?.value ?? 'N/A'}
                  />
                );
              })}
          </div>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
      <img
        className="absolute h-[0.28%] w-[3.65%] top-[25.88%] right-[86.57%] bottom-[73.84%] left-[9.78%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/group.svg"
      />
      <img
        className="absolute h-[2.21%] w-[17.79%] top-[23.08%] right-[77.84%] bottom-[74.71%] left-[4.37%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/left-gallery-cloud.svg"
      />
      <img
        className="absolute h-[3.62%] w-[16.49%] top-[17.92%] right-[2.69%] bottom-[78.46%] left-[80.82%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/right-gallery-cloud.svg"
      />
      <div className="absolute top-[521px] left-[132px] flex flex-row items-start justify-start gap-[8px] text-xs text-dimgray font-caption-2">
        <div className="relative w-[400px] h-10">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-17xl [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)]" />
          <SearchBar
            onSelect={handleSearchSelect}
            onEnterPress={handleEnterPressInSearch}
          />
          <img
            className="absolute top-[9.71px] left-[16.3px] rounded-sm w-[25.62px] h-[23.51px]"
            alt=""
            src="/icons20pxsearch.svg"
          />
        </div>
        <img
          className="absolute cursor-pointer"
          alt="Menu"
          src="/buttons.svg"
          onClick={toggleDrawer}
        />

        {/* Drawer Menu */}
        {isDrawerOpen && (
          <div
            ref={drawerRef}
            style={drawerStyle}
            className="absolute left-0 top-0 w-[300px] h-full bg-white shadow-md z-10"
          >
            {Object.entries(traitTypesAndValues).map(([traitType, values]) => (
              <div key={traitType}>
                <button onClick={() => toggleCollapse(traitType)}>
                  {traitType}
                </button>
                {collapsed[traitType] && (
                  <div>
                    {values.map((value) => (
                      <label key={value}>
                        <input
                          type="checkbox"
                          checked={
                            selectedTraitType === traitType &&
                            selectedTraitValue === value
                          }
                          onChange={(e) =>
                            handleTraitCheckboxChange(
                              traitType,
                              value,
                              e.target.checked,
                            )
                          }
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute top-[276px] left-[367px] text-inherit tracking-[1.02px] leading-[26px] font-inherit flex items-center w-[475px]">
        <span className="[line-break:anywhere] w-full">
          <p className="m-0">{`Welcome to the Tiger Directory!`}</p>
          <ul className="m-0 pl-8">
            <li className="mb-0">{`Find your friends`}</li>
            <li className="mb-0">{`Have fun`}</li>
            <li>{`Learn about other tigers`}</li>
          </ul>
        </span>
      </div>
      <img
        className="absolute top-[278.12px] left-[766.77px] w-[141.47px] h-[165.77px] overflow-hidden"
        alt=""
        src="/isolation-mode.svg"
      />
      <div className="absolute top-[0.68px] left-[calc(50%_-_1917px)] w-[3250.29px] h-[209.26px] text-center text-45xl font-title">
        <div className="absolute top-[0px] left-[calc(50%_-_31.15px)] tracking-[3.4px] leading-[64px] flex items-center w-[647px] h-[126.34px] [text-shadow:6px_-5px_4px_rgba(0,_0,_0,_0.25)]">
          <span className="[line-break:anywhere] w-full">
            <p className="m-0">{`TIGER GALLERY `}</p>
            <p className="m-0">MEMBER DIRECTORY</p>
          </span>
        </div>
        <img
          className="absolute h-[68.79%] w-[52%] top-[31.21%] right-[0%] bottom-[0%] left-[38.75%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-1054.svg"
        />
        <img
          className="absolute h-[68.79%] w-[48.07%] top-[31.21%] right-[16.21%] bottom-[0%] left-[17.72%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-1055.svg"
        />
      </div>
    </div>
  );
};
export default DesktopDirectory;
