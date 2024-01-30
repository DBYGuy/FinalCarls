import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import LeaderboardContainer from '~/components/Leaderboard/leaderboard-container';
import SectionCard from '~/components/Leaderboard/section-card';
import { useGetLeaderboard } from '~/hooks/useGetLeaderboard';

const Leaderboard: NextPage = () => {
  const [page, setPage] = useState(1); // Manage current page
  const [isClientReady, setIsClientReady] = useState(false); // State to track client readiness

  useEffect(() => {
    // Check if the client is ready (e.g., window object is available)
    if (typeof window !== 'undefined') {
      setIsClientReady(true);
    }
  }, []);

  const { leaderboard, isLoading, isError, error } = useGetLeaderboard(
    page,
    isClientReady,
  );

  useEffect(() => {
    if (isError && error) {
      console.error('Error fetching leaderboard:', error);
    }
  }, [isError, error]);

  // Function to load more results
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (leaderboard && leaderboard.length === 0 && page > 1) {
      // If no results are returned and it's not the first page, reset to the first page
      setPage(1);
    }
  }, [leaderboard, page]);

  return (
    <div className="relative bg-itsc-black pt-[120px] w-full flex flex-col items-center justify-start p-4 box-border gap-4 text-center text-lg font-outfit">
      <LeaderboardContainer />
      <div className="max-w-[703px] w-full mx-auto">
        <div className="grid grid-cols-12 gap-4 px-2">
          <b className="col-span-3 text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end">
            Rank
          </b>
          <b className="col-span-5 text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end">
            Name
          </b>
          <b className="col-span-2 text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end">
            Level
          </b>
          <b className="col-span-2 text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end text-right">
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
                avatarBaseImageUrl={
                  entry?.avatar ?? '/-privateavatarbase@2x.png'
                }
              />
            ))}
          </div>
        )}
        {/* Load More Button */}
        {!isLoading && leaderboard && (
          <button
            className="mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
