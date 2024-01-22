import React from 'react';
import CheckInButton from './CheckInButton';
import { useGetUserReward } from '~/hooks/useGetUserRewards';

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
          <div className="text-2xl font-outfit mt-2">Day {day}</div>
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
            <img
              className="absolute h-[270px] w-[204px] top-[8%] right-[0%] bottom-[0.05%] left-[0%] rounded-2xl max-w-full overflow-hidden max-h-full"
              alt=""
              src="Vector 363.svg"
            />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-53.1deg] text-dusty-red font-omegle text-shadow-[2px_2px_2px_rgba(0,_0,_0,_0.25)] w-[204px] text-center">
              CLAIMED FOR {tp} POINTS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThinCheckIn;
