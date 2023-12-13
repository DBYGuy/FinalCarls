import React from 'react';
import CheckInButton from './CheckInButton';

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
  return (
    <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-72 h-[257px] border-8 border-double border-yellow-100">
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded bg-mediumorchid shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset]" />
      <div className="absolute top-[28px] left-[calc(50%_-_65.01px)] flex flex-col items-center justify-start gap-[8px]">
        <img
          className="relative w-[132.16px] h-[127.69px]"
          alt=""
          src={imageSrc}
        />
        <div className="relative text-5xl tracking-[-0.01em] leading-[3px] font-outfit text-center flex items-center justify-center w-[106px] h-7 shrink-0">
          Day {day}
        </div>
        <b className="relative text-5xl tracking-[-0.01em] leading-[3px] flex font-outfit text-center items-center justify-center w-[106px] h-7 shrink-0">
          {tp} TP
        </b>
        <CheckInButton currentDay={day} rewardDay={4} />
      </div>
      {isClaimed && (
        <div className="absolute top-[108.57px] left-[-31px] bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[326px] h-[38px] transform rotate-[-53.47deg] text-center">
          <span className="tracking-[-0.01em] leading-[18px] font-bold text-dusty-red text-shadow-[2px_2px_2px_rgba(0,_0,_0,_0.25)]">
            CLAIMED FOR {tp} TIGER POINTS
          </span>
        </div>
      )}
    </div>
  );
};

export default LargeCheckIn;
