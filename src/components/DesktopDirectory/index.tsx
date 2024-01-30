import { useState, useEffect, useRef, useCallback } from 'react';
import ProfileCard from '../ProfileCard';
import { useTokensByTrait } from '~/hooks/useTokensByTrait';
import SearchBar from '../SearchBar';
import { SearchResult } from '~/components/SearchBar';
import { useTokenSearch } from '~/hooks/useTokenSearch';
import TigerModal from '../TigerModal';
import TraitDrawer from '../TraitDrawer';

export interface TokenTraitType {
  id: number;
  tokenID: number;
  traitType: string;
  value: string;
}

export interface TokenType {
  tokenID: number;
  image: string;
  name: string;
  lastUpdated: Date | null;
  s3ImageUrl: string | null;
  owner: OwnerType | null;
  tokenTraits: TokenTraitType[];
  selectedTraits: (TokenTraitType | undefined)[]; // Allow undefined
}

export interface OwnerType {
  walletAddress: string;
  id: string;
  username: string | null;
  ENSName: string | null;
}

const DesktopDirectory = () => {
  const [selectedTraitType, setSelectedTraitType] = useState<string>('');
  const [selectedTraitValue, setSelectedTraitValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTigerModalOpen, setIsTigerModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<TokenType | null>(null);
  const [searchResults, setSearchResults] = useState<TokenType[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [lastUpdated, setLastUpdated] = useState<
    'searchResult' | 'searchResults' | 'traits'
  >();
  const { results: randomTokens, loadMore: loadMoreRandomTokens } =
    useTokenSearch('69');
  const { tokens: traitTokens, loadMore: loadMoreTraitTokens } =
    useTokensByTrait(selectedTraitType, selectedTraitValue);
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prevState) => !prevState);
  }, []);
  useEffect(() => {
    // Format the initial tokens in the same way as in handleEnterPressInSearch
    const formattedInitialResults: TokenType[] = randomTokens.map((result) => ({
      tokenID: result.tokenID,
      image: result.s3ImageUrl ?? '',
      name: result.name,
      lastUpdated: null,
      s3ImageUrl: result.s3ImageUrl,
      owner: result.owner,
      tokenTraits: result.tokenTraits,
      selectedTraits: getRandomTraits(result.tokenTraits),
    }));
    if (formattedInitialResults.length > 0) {
      setSearchResults(formattedInitialResults);
      setLastUpdated('searchResults');
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [randomTokens]);

  const handleSearchSelect = (selectedResult: SearchResult) => {
    const convertedResult: TokenType = {
      tokenID: selectedResult.tokenID,
      image: selectedResult.s3ImageUrl ?? '',
      name: selectedResult.name,
      lastUpdated: null,
      s3ImageUrl: selectedResult.s3ImageUrl,
      owner: selectedResult.owner, // Use the owner object directly
      tokenTraits: selectedResult.tokenTraits,
      selectedTraits: getRandomTraits(selectedResult.tokenTraits),
    };
    setSearchResult(convertedResult);
    setSelectedTraitType('');
    setSelectedTraitValue('');
    setLastUpdated('searchResult');
  };
  const handleTraitSelect = (traitType: string, value: string) => {
    setSelectedTraitType(traitType);
    setSelectedTraitValue(value);
    setLastUpdated('traits');
    // Update the search results based on the selected trait
    // You might need to call a function to fetch or filter tokens based on the selected trait
  };
  const handleEnterPressInSearch = (results: SearchResult[]) => {
    const formattedResults: TokenType[] = results.map((result) => ({
      tokenID: result.tokenID,
      image: result.s3ImageUrl ?? '',
      name: result.name,
      lastUpdated: null,
      s3ImageUrl: result.s3ImageUrl,
      owner: result.owner, // Use the owner object directly
      tokenTraits: result.tokenTraits,
      selectedTraits: getRandomTraits(result.tokenTraits),
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

  useEffect(() => {
    // Check if tokens are loaded and update isLoading accordingly
    if (lastUpdated === 'searchResults' && searchResults.length > 0) {
      setIsLoading(false);
    } else if (lastUpdated === 'searchResult' && searchResult) {
      setIsLoading(false);
    } else if (lastUpdated === 'traits' && traitTokens.length > 0) {
      setIsLoading(false);
    } else if (!lastUpdated) {
      setIsLoading(randomTokens.length === 0);
    }
  }, [lastUpdated, searchResults, searchResult, traitTokens, randomTokens]);

  let tokensToShow = [];

  if (lastUpdated === 'searchResults') {
    tokensToShow = searchResults;
  } else if (lastUpdated === 'searchResult') {
    tokensToShow = [searchResult];
  } else if (lastUpdated === 'traits') {
    tokensToShow = traitTokens;
  } else {
    tokensToShow = randomTokens;
  }

  const handleLoadMore = () => {
    if (lastUpdated === 'traits') {
      loadMoreTraitTokens();
    } else if (lastUpdated === 'searchResults') {
      loadMoreRandomTokens();
    }
  };
  const openTigerModal = (userId: string) => {
    setCurrentUserId(userId);
    setIsTigerModalOpen(true);
  };

  // Function to close TigerModal
  const closeTigerModal = () => {
    setIsTigerModalOpen(false);
    setCurrentUserId('');
  };

  const getRandomTraits = (traits: TokenTraitType[]) => {
    if (traits.length <= 2) {
      return traits;
    } else {
      const randomIndex1 = Math.floor(Math.random() * traits.length);
      let randomIndex2 = Math.floor(Math.random() * traits.length);
      while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * traits.length);
      }
      return [traits[randomIndex1], traits[randomIndex2]];
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        toggleDrawer();
      }
    };

    // Adding event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Removing event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerRef, toggleDrawer]);

  return (
    <div className="relative bg-gray-100 w-full min-h-screen overflow-hidden text-left text-5xl text-white font-outfit">
      {isTigerModalOpen && (
        <TigerModal userId={currentUserId} onClose={closeTigerModal} />
      )}
      {/* Adjusted Lattice Images */}
      <div className="absolute top-[125.68px] left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center">
        <img
          src="/lattice.svg"
          alt="Lattice Left"
          className="h-[42.8px] w-auto"
          style={{ maxWidth: '3122.36px' }} // Half of the desired width
        />
        <img
          src="/lattice.svg"
          alt="Lattice Right"
          className="h-[42.8px] w-auto"
          style={{ maxWidth: '3122.36px' }} // Half of the desired width
        />
      </div>

      <div className="flex justify-center pt-[600px]">
        {/* NFT Grid Container */}
        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
            {/* Map through tokensToShow and render ProfileCard components */}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              tokensToShow.map((token) => {
                if (!token) return null; // Add this line to guard against null tokens

                const trait1 = token.selectedTraits?.[0]
                  ? `${token.selectedTraits[0].traitType}: ${token.selectedTraits[0].value}`
                  : '';
                const trait2 = token.selectedTraits?.[1]
                  ? `${token.selectedTraits[1].traitType}: ${token.selectedTraits[1].value}`
                  : '';
                return (
                  <ProfileCard
                    key={token.tokenID}
                    name={token.name}
                    src={token.s3ImageUrl ?? ''}
                    trait1={trait1}
                    trait2={trait2}
                    hasUser={!!token.owner}
                    userId={token.owner?.id ?? ''}
                    openTigerModal={() => openTigerModal(token.owner?.id ?? '')}
                  />
                );
              })
            )}
          </div>
          {/* Load More button */}
          {lastUpdated === 'traits' && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="relative inline-block tracking-[0.94px] leading-[31.33px] bg-transparent text-white rounded-[10.26px] shadow-[0px_2.9307847023010254px_8.79px_rgba(0,_0,_0,_0.1)] py-[5.861569404602051px] px-[11.723138809204102px] text-[14.2px] [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.17),_rgba(0,_0,_0,_0)_57.81%,_rgba(0,_0,_0,_0.2)),_#d15454]"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Trait Drawer */}
        {isDrawerOpen && (
          <div className="absolute left-0 top-[487px] w-[350px] h-[600px] shadow-md z-10">
            <TraitDrawer onTraitSelect={handleTraitSelect} />
          </div>
        )}
      </div>
      <img
        className="absolute h-[2.21%] w-[17.79%] top-[300px] right-[77.84%] bottom-[74.71%] left-[4.37%] max-w-full overflow-hidden max-h-full z-[0] animate-longMarquee"
        alt=""
        src="/left-gallery-cloud.svg"
      />
      <img
        className="absolute h-[3.62%] w-[16.49%] top-[200px] right-[2.69%] bottom-[78.46%] left-[80.82%] max-w-full overflow-hidden max-h-full z-[0] animate-longMarquee"
        alt=""
        src="/right-gallery-cloud.svg"
      />
      <div className="absolute top-[521px] left-[20%] transform -translate-x-[26%] flex items-center justify-center gap-4">
        {/* Button positioned to the left of the SearchBar */}
        <img
          className="cursor-pointer z-10 w-[40px] h-[40px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]"
          alt="Menu"
          src="/buttons.svg"
          onClick={toggleDrawer}
        />

        {/* SearchBar */}
        <div className="relative w-screen max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
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
      </div>
      <div className="absolute top-[376px] left-[15vw] transform -translate-x-[26%] w-full max-w-[475px] px-4 text-center animate-fadeUp">
        <span className="inline-block w-full bg-gradient-to-l from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent">
          <p className="text-[20px] sm:text-[20px] xs:text-[16px] m-0">{`Welcome to the Tiger Directory!`}</p>
          <ul className="text-[18px] sm:text-[16px] xs:text-[14px] m-0 pl-0 list-none">
            <li className="mb-0">{`Search and filter to find tigers`}</li>
            <li className="mb-0">{`and view community profiles`}</li>
          </ul>
        </span>
      </div>
      <div className="absolute top-[0.68px] left-[calc(50%_-_1917px)] w-[3250.29px] h-[209.26px] text-center text-24px font-title">
        <div className="absolute top-[0px] left-[calc(50%_-_31.15px)] tracking-[3.4px] leading-[64px] flex items-center w-[647px] h-[126.34px]">
          <span className="[line-break:anywhere] w-full bg-gradient-to-l text-[22px] 2xs:text-[24px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent animate-fadeUp">
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
