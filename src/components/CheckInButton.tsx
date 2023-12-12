import React, { useState, useEffect } from 'react';

type CheckInButtonProps = {
  currentDay: number;
  rewardDay: number;
  rewardTime: string; // Assuming this is a string like "23:59:59"
};

const CheckInButton: React.FC<CheckInButtonProps> = ({
  currentDay,
  rewardDay,
  rewardTime,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isTimeToClaim = () => {
    const rewardDate = new Date();
    rewardDate.setHours(parseInt(rewardTime.split(':')[0]));
    rewardDate.setMinutes(parseInt(rewardTime.split(':')[1]));
    rewardDate.setSeconds(parseInt(rewardTime.split(':')[2]));

    return currentTime < rewardDate;
  };

  const formatTimeLeft = () => {
    const rewardDate = new Date();
    rewardDate.setHours(parseInt(rewardTime.split(':')[0]));
    rewardDate.setMinutes(parseInt(rewardTime.split(':')[1]));
    rewardDate.setSeconds(parseInt(rewardTime.split(':')[2]));

    const timeLeft = rewardDate.getTime() - currentTime.getTime();
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (currentDay < rewardDay) {
    return (
      <div className="rounded-3xl [background:lightslategray] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-2 px-4 box-border text-silver mt-2">
        <b className="relative tracking-[0.6px] leading-[30px]">Claimed</b>
      </div>
    );
  } else if (currentDay === rewardDay) {
    if (isTimeToClaim()) {
      return (
        <div className="rounded-3xl [background:linear-gradient(180deg,_#efd891,_#ede2b2)] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-2 px-4 box-border text-black mt-2">
          <b className="relative tracking-[0.6px] leading-[30px]">
            {formatTimeLeft()}
          </b>
        </div>
      );
    } else {
      return (
        <button className="rounded-3xl [background:linear-gradient(180deg,_#efd891,_#ede2b2)] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-2 px-4 box-border text-black mt-2">
          <b className="relative tracking-[0.6px] leading-[30px]">Claim</b>
        </button>
      );
    }
  } else {
    return (
      <div className="rounded-3xl [background:lightslategray] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-2 px-4 box-border text-silver mt-1">
        <b className="relative tracking-[0.6px] leading-[30px]">Wait...</b>
      </div>
    );
  }
};

export default CheckInButton;
