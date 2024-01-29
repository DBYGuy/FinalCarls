import React, { useState, useEffect } from 'react';
import { useClaimReward } from '~/hooks/useClaimReward';
import { useMe } from '~/hooks/useMe';
import { usePopup } from '~/components/PopUp/popupContext';

type CheckInButtonProps = {
  currentDay: number;
  rewardDay: number;
  tp: number; // Points to be claimed
  lastClaimedDate: Date | null;
  rewardImg: string; // Image to be displayed when the reward is claimed
};

const CheckInButton: React.FC<CheckInButtonProps> = ({
  currentDay,
  rewardDay,
  tp,
  lastClaimedDate,
  rewardImg,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { claimReward } = useClaimReward();
  const { user } = useMe();
  const userId = user?.id ?? '';
  const { showPopup } = usePopup();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate the time difference from the last claimed date
  const timeSinceLastClaim = lastClaimedDate
    ? currentTime.getTime() - new Date(lastClaimedDate).getTime()
    : null;

  // Determine if it's time to claim based on the last claimed date
  const isTimeToClaim = () => {
    if (rewardDay === 1) return true; // Day 1 is always claimable
    return (
      timeSinceLastClaim &&
      timeSinceLastClaim >= 24 * 60 * 60 * 1000 && // More than 24 hours
      timeSinceLastClaim < 48 * 60 * 60 * 1000 // Less than 48 hours
    );
  };

  // Determine if the reward is expired
  const isExpired = () => {
    if (rewardDay === 1) return false; // Day 1 never expires
    return (
      timeSinceLastClaim && timeSinceLastClaim >= 48 * 60 * 60 * 1000 // More than 48 hours
    );
  };

  // Handle claiming the reward
  const handleClaimReward = async () => {
    try {
      await claimReward(userId, tp);
      showPopup(
        'Congratulations!',
        `Successfully claimed ${tp} TP!`,
        rewardImg,
      );
    } catch (error) {
      console.error('Error claiming reward:', error);
      alert('Failed to claim reward.'); // Replace with a more appropriate error handling
    }
  };

  // Calculate the countdown time
  const calculateCountdown = () => {
    const countdownTime = 24 * 60 * 60 * 1000 - (timeSinceLastClaim ?? 0); // 24 hours minus the time since last claim
    const hours = Math.floor((countdownTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((countdownTime / 1000 / 60) % 60);
    const seconds = Math.floor((countdownTime / 1000) % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Render the button based on the state
  if (currentDay < rewardDay) {
    return (
      <div className="rounded-3xl bg-lightslategray shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex items-center justify-center py-2 px-4 box-border text-silver mt-2">
        <b className="tracking-[0.6px] leading-[30px]">Claimed</b>
      </div>
    );
  } else if (currentDay === rewardDay) {
    if (isExpired()) {
      return (
        <div className="rounded-3xl bg-lightslategray shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex items-center justify-center py-2 px-4 box-border text-silver mt-2">
          <b className="tracking-[0.6px] leading-[30px]">Expired</b>
        </div>
      );
    } else if (isTimeToClaim()) {
      return (
        <button
          className="rounded-3xl bg-gradient-to-r from-gold-start via-gold-end to-gold-start shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex items-center justify-center py-2 px-4 box-border text-black mt-2"
          onClick={handleClaimReward}
        >
          <b className="tracking-[0.6px] leading-[30px]">Claim {tp} TP</b>
        </button>
      );
    } else {
      // Show countdown until claimable
      return (
        <div className="rounded-3xl bg-lightslategray shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex items-center justify-center py-2 px-4 box-border text-silver mt-2">
          <b className="tracking-[0.6px] leading-[30px]">
            {calculateCountdown()}
          </b>
        </div>
      );
    }
  } else {
    return (
      <div className="rounded-3xl bg-lightslategray shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex items-center justify-center py-2 px-4 box-border text-silver mt-2">
        <b className="tracking-[0.6px] leading-[30px]">Wait...</b>
      </div>
    );
  }
};

export default CheckInButton;
