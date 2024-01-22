import React from 'react';
import CheckInButton from './CheckInButton';
import { useGetUserReward } from '~/hooks/useGetUserRewards';

type LargeCheckInProps = {
  day: number;
  tp: number;
  imageSrc: string;
  isClaimed: boolean;
};

const LargeCheckIn: React.FC<LargeCheckInProps> = ({
  day,
  tp,
  imageSrc,
  isClaimed,
}) => {
  const { data: userReward } = useGetUserReward();
  const dayToPass = (userReward?.currentDay ?? 0) + 1;
  const lastClaimed = userReward?.lastClaimed ?? null;

  return (
    <div className="w-[288px] relative rounded bg-mediumorchid shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] box-border h-[288px] border-[7px] border-solid border-linear">
      <div className="flex flex-col items-center justify-center h-full">
        <img className="w-[128px] h-[128px] mt-8" alt="" src={imageSrc} />
        <div className="text-2xl font-outfit">Day {day}</div>
        <b className="text-2xl font-outfit">{tp} TP</b>
        <CheckInButton
          currentDay={day}
          rewardDay={dayToPass}
          tp={tp}
          lastClaimedDate={lastClaimed}
          rewardImg={imageSrc}
        />
      </div>
      {isClaimed && (
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-[292.5px]">
          <img
            className="absolute h-[292.5px] w-[291.2px] top-[0%] right-[0%] bottom-[0.05%] left-[0%] rounded-2xl max-w-full overflow-hidden max-h-full"
            alt=""
            src="Vector 364.svg"
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 rotate-[-45deg] text-dusty-red text-[23px] font-omegle text-shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] w-[291.2px] text-center">
            CLAIMED FOR {tp} POINTS
          </span>
        </div>
      )}
    </div>
  );
};

export default LargeCheckIn;
