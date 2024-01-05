import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import LeaderboardContainer from '~/components/Leaderboard/leaderboard-container';
import SectionCard from '~/components/Leaderboard/section-card';
import { useGetLeaderboard } from '~/hooks/useGetLeaderboard';

const Leaderboard: NextPage = () => {
  const [page, setPage] = useState(1); // Manage current page
  const { leaderboard, isLoading, isError, error } = useGetLeaderboard(page);

  useEffect(() => {
    if (isError && error) {
      console.error('Error fetching leaderboard:', error);
    }
  }, [isError, error]);

  // Function to load more results
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="relative bg-itsc-black w-full flex flex-col items-center justify-start p-4 box-border gap-[58px] text-center text-17xl font-outfit">
      <LeaderboardContainer />
      <div className="shrink-0 flex flex-row items-start justify-start gap-[215px]">
        <b className="relative text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
          Rank
        </b>
        <b className="relative inline-block text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-[193px] shrink-0">
          Name
        </b>
        <b className="relative inline-block text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-[107px] shrink-0">
          Level
        </b>
        <b className="relative text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-right">
          Tiger Points
        </b>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="shrink-0 flex flex-col items-start justify-start gap-[15px]">
          {leaderboard?.map((entry, index) => (
            <SectionCard
              key={index}
              // Assuming SectionCard can take these props. Adjust according to your actual component.
              rank={entry.rank}
              username={entry.username}
              level={entry.level}
              points={entry.points}
              avatarBaseImageUrl="/-privateavatarbase@2x.png" // or dynamic if available
            />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {!isLoading && leaderboard && leaderboard.length > 0 && (
        <button
          className="mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Leaderboard;
