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

  const generateSvgRows = (numItems: number, direction: string) => {
    const rowItems = [];
    for (let i = 0; i < numItems; i++) {
      // Determine the animation class based on direction
      const animationClass =
        direction === 'left'
          ? 'animate-rotateClockwise'
          : 'animate-rotateCounterClockwise';

      // Add the flower with animation
      rowItems.push(
        <img
          key={`flower-${i}`}
          src="/flower.svg"
          alt="Flower"
          className={`w-15 h-15 mr-3 ml-3 ${animationClass}`}
        />,
      );

      // Add the dot, but skip the last one if direction is 'left'
      if (!(i === numItems - 1)) {
        rowItems.push(
          <img
            key={`dot-${i}`}
            src="/dot.svg"
            alt="Dot"
            className="w-2 h-2 justify-center"
            style={{
              width: '8px',
              height: '8px',
              position: 'relative',
              top: '-25px',
            }}
          />,
        );
      }
    }
    return rowItems;
  };
  const latticeLeftRef = useRef<HTMLImageElement>(null);
  const latticeRightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            const target = entry.target as HTMLImageElement; // Type assertion
            if (target === latticeLeftRef.current) {
              target.classList.add('animate-moveInLeft');
            } else if (target === latticeRightRef.current) {
              target.classList.add('animate-moveInRight');
            }
          }
        });
      },
      { threshold: 1 },
    );

    const leftRef = latticeLeftRef.current;
    const rightRef = latticeRightRef.current;

    if (leftRef) {
      observer.observe(leftRef);
    }
    if (rightRef) {
      observer.observe(rightRef);
    }

    return () => {
      if (leftRef) {
        observer.unobserve(leftRef);
      }
      if (rightRef) {
        observer.unobserve(rightRef);
      }
    };
  }, []);
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
    <div className="relative bg-gray-100 w-full min-h-screen overflow-hidden text-left text-5xl text-white font-outfit">
      <div className="absolute top-32 left-0 right-0 flex justify-between items-center px-4">
        <img src="/lattice.svg" alt="Lattice Left" />
        <img src="/lattice.svg" alt="Lattice Right" />
      </div>

      <div className="absolute top-[572px] w-full flex flex-col items-center justify-center">
        <div className="shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[95%] mx-auto p-4">
          <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-auto"
            style={{ maxHeight: '1200px' }}
          >
            {!isLoading &&
              tokens.map((token, index) => (
                <ProfileCard
                  key={index}
                  name={token?.name}
                  src={token?.s3ImageUrl ?? token?.image}
                  trait1={token?.tokenTraits?.[0]?.value ?? 'N/A'}
                  trait2={token?.tokenTraits?.[1]?.value ?? 'N/A'}
                />
              ))}
          </div>
          <button onClick={handleLoadMore} className="mt-4">
            Load More
          </button>
        </div>
      </div>
      <img
        className="absolute h-[2.21%] w-[17.79%] top-[23.08%] right-[77.84%] bottom-[74.71%] left-[4.37%] max-w-full overflow-hidden max-h-full z-1 animate-marquee"
        alt=""
        src="/left-gallery-cloud.svg"
      />
      <img
        className="absolute h-[3.62%] w-[16.49%] top-[17.92%] right-[2.69%] bottom-[78.46%] left-[80.82%] max-w-full overflow-hidden max-h-full z-1 animate-marquee"
        alt=""
        src="/right-gallery-cloud.svg"
      />
      <div className="absolute top-[521px] left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4">
        <div className="relative w-screen max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[600px]">
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
          className="cursor-pointer z-10 w-[40px] h-[40px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]"
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
        <span className="[line-break:anywhere] w-full bg-gradient-to-l from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent">
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
      <div className="absolute top-[0.68px] left-[calc(50%_-_1917px)] w-[3250.29px] h-[209.26px] text-center text-24px font-title">
        <div className="absolute top-[0px] left-[calc(50%_-_31.15px)] tracking-[3.4px] leading-[64px] flex items-center w-[647px] h-[126.34px]">
          <span className="[line-break:anywhere] w-full bg-gradient-to-l 2xs:text-[24px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent animate-fadeUp">
            <p className="m-0">{`TIGER GALLERY `}</p>
            <p className="m-0">MEMBER DIRECTORY</p>
          </span>
        </div>
        <div className="absolute h-[68.79%] w-[52%] top-[31.21%] right-[0%] bottom-[0%] left-[51%] max-w-full overflow-hidden max-h-full">
          {generateSvgRows(8, 'right')}
        </div>
        <div className="absolute h-[68.79%] w-[48.07%] top-[31.21%] bottom-[0%] left-[16.72%] max-w-full overflow-hidden max-h-full">
          {generateSvgRows(8, 'left')}
        </div>
      </div>
    </div>
  );
};
export default DesktopDirectory;
