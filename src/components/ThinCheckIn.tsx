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
  const {
    data: userReward,
    isLoading: isLoadingUserReward,
    error: errorUserReward,
  } = useGetUserReward();

  const dayToPass = (userReward?.currentDay ?? 0) + 1;
  const lastClaimed = userReward?.lastClaimed ?? null;
  return (
    <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[200px] h-[265px] border-8 border-double border-yellow-100">
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded bg-mediumorchid shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset]" />
      <div className="absolute top-[28px] left-[calc(50%_-_63.75px)] flex flex-col items-center justify-start gap-[8px]">
        <img
          className="relative w-[127.5px] h-[128.11px]"
          alt=""
          src={imageSrc}
        />
        <div className="relative text-5xl tracking-[-0.01em] leading-[3px] font-outfit text-center flex items-center justify-center w-[106px] h-7 shrink-0">
          Day {day}
        </div>
        <b className="relative text-5xl tracking-[-0.01em] leading-[3px] flex font-outfit text-center items-center justify-center w-[106px] h-7 shrink-0">
          {tp} TP
        </b>
        <CheckInButton
          currentDay={day}
          rewardDay={dayToPass}
          tp={tp}
          lastClaimedDate={lastClaimed}
          rewardImg={imageSrc}
        />
      </div>
      {isClaimed && (
        <div className="absolute top-[114.57px] left-[-38px] bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] w-[140%] h-[38px] transform rotate-[-53.47deg]">
          <span
            className="inline-block tracking-[-0.01em] leading-[18px] font-bold text-dusty-red text-shadow-[6px_6px_6px_rgba(0,_0,_0,_0.25)] text-center"
            style={{ height: '20px', lineHeight: '30px' }}
          >
            CLAIMED FOR {tp} TIGER POINTS
          </span>
        </div>
      )}
    </div>
  );
};

export default ThinCheckIn;
