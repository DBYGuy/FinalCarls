import React from 'react';
import type { NextPage } from 'next';
import LargeCheckIn from '../LargeCheckIn';
import ThinCheckIn from '../ThinCheckIn';
import { useGetAllDailyRewards } from '~/hooks/useGetAllDailyRewards'; // Adjust the import path based on your project structure
import { useGetUserReward } from '~/hooks/useGetUserRewards';

type DailyReward = {
  day: number;
  bonusAmount: number;
};

const DailyCheckIn: NextPage = () => {
  const {
    data: rewards,
    isLoading: isLoadingRewards,
    error: errorRewards,
  } = useGetAllDailyRewards();
  const {
    data: userReward,
    isLoading: isLoadingUserReward,
    error: errorUserReward,
  } = useGetUserReward();
  if (isLoadingRewards || isLoadingUserReward) return <div>Loading...</div>;
  if (errorRewards ?? errorUserReward) return <div>Error loading rewards</div>;

  // Define the image sources for each day
  const imageSources = [
    '/day-1-fan.svg',
    '/day-2-mask.svg',
    '/day-3-flower.svg',
    '/day-4-shoes.svg',
    '/day-5-bag.svg',
    '/day-6-ship.svg',
    '/day-7-tiger.svg',
  ];

  return (
    <div className="relative w-full h-[1000px] mx-4 text-center text-base text-white font-rainbow-buttons-1">
      <div className="relative top-0 left-0 w-full h-full ">
        <div className="bg-gray w-full h-full" />
        <img
          className="absolute top-[10%] left-0  min-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-1022.svg"
        />
        <div className="absolute top-[26%] left-[20%] w-[60%] h-[50%] text-center">
          {/* Thin Check-Ins */}
          <div className="flex flex-row items-start justify-center gap-4">
            {rewards?.slice(0, 4).map((reward: DailyReward, index: number) => (
              <ThinCheckIn
                key={reward.day}
                day={reward.day}
                tp={reward.bonusAmount}
                imageSrc={imageSources[index] ?? ''}
                isClaimed={userReward?.currentDay >= reward.day}
              />
            ))}
          </div>
          {/* Large Check-Ins */}

          <div className="flex flex-row items-start justify-center gap-3 mt-10">
            {rewards?.slice(4, 7).map((reward: DailyReward, index: number) => (
              <LargeCheckIn
                key={reward.day}
                day={reward.day}
                tp={reward.bonusAmount}
                imageSrc={imageSources[index + 4] ?? ''}
                isClaimed={userReward?.currentDay >= reward.day}
              />
            ))}
          </div>
        </div>
        <div className="absolute top-[2%] left-[50%] translate-x-[-50%] text-[4vw] leading-[5vw] font-title bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] bg-clip-text text-transparent">
          DAILY CHECK-IN
        </div>
        <div className="absolute top-[12%] left-[50%] translate-x-[-50%] text-[2vw] leading-[2.5vw] font-outfit bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] bg-clip-text text-transparent">
          Come back every day to claim reward points! Streak resets 48 hours
          after claim
        </div>
      </div>
    </div>
  );
};

export default DailyCheckIn;
