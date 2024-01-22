import React from 'react';
import CheckInButton from './CheckInButton';
import { useGetUserReward } from '~/hooks/useGetUserRewards';
import VectorComponent from './VectorComponent'; // Import VectorComponent

type ThinCheckInProps = {
  day: number;
  tp: number;
  imageSrc: string;
  isClaimed: boolean;
};

const ThinCheckIn: React.FC<ThinCheckInProps> = ({
  day,
  tp,
  imageSrc,
  isClaimed,
}) => {
  const { data: userReward } = useGetUserReward();
  const dayToPass = (userReward?.currentDay ?? 0) + 1;
  const lastClaimed = userReward?.lastClaimed ?? null;

  return (
    <div className="w-[190px] relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] h-[245px]">
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded bg-mediumorchid shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] box-border border-[7px] border-solid border-linear">
        <div className="flex flex-col items-center justify-center h-full">
          <img className="w-[128px] h-[128px] mt-7" alt="" src={imageSrc} />
          <div className="text-2xl font-outfit mt-3">Day {day}</div>
          <b className="text-2xl font-outfit mt-5">{tp} TP</b>
          <CheckInButton
            currentDay={day}
            rewardDay={dayToPass}
            tp={tp}
            lastClaimedDate={lastClaimed}
            rewardImg={imageSrc}
          />
        </div>
        {isClaimed && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-[315px]">
            <VectorComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThinCheckIn;
