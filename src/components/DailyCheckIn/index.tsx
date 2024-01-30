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
    <div className="relative w-screen text-center font-rainbow-buttons-1 py-12">
      <div className="text-[36px] m:text-[42px] l:text-[50px] xl:text-[60px] 2xl:text-[75px] font-title bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent animate-fadeUp">
        DAILY CHECK-IN
      </div>
      <div className="mt-4 w-[40vw] mx-auto text-[17px] m:text-[20px] l:text-[22px] xl:text-[28px] 2xl:text-[32px] font-sf-pro bg-gradient-to-l from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent animate-fadeUpDelayed">
        Come back every day to claim reward points! Reset is 48 hours after each
        claim
      </div>
      <div
        className="flex flex-col items-center justify-center mt-10 bg-gray-800 py-10 w-full"
        style={{
          backgroundImage: "url('/group-1022.svg')",
          backgroundSize: '100%',
          backgroundPosition: 'top',
        }}
      >
        {/* Thin Check-Ins */}
        <div className="grid s:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
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
    </div>
  );
};

export default DailyCheckIn;
