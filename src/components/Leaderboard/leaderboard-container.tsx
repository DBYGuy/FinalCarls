import type { NextPage } from 'next';

const LeaderboardContainer: NextPage = () => {
  return (
    <div className="relative w-full h-auto text-center text-45xl font-title mb-4">
      <div className="tracking-[3.4px] leading-[64px] text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start to-text-gold-end via-text-gold-middle">
        Leaderboard Rankings
      </div>
    </div>
  );
};

export default LeaderboardContainer;
