import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import DesktopDropdown from './DesktopDropdown'; // Ensure this path is correct
import { useMe } from '~/hooks/useMe';
import { useGetPoints } from '~/hooks/useGetPoints';
import { useGetLevel } from '~/hooks/useGetLevel';
import { useGetAvatar } from '~/hooks/useGetAvatar';
import { getTruncatedWalletAddress } from '~/utils/wallet';
import FlipScroll from '~/components/FlipScroll';
import Button from '~/components/button';
import LevelButton from '~/components/LevelButton'; // Import LevelButton
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility'; // Import useCheckLevelEligibility

type ConnectMenuType = {
  avatar?: string;
  icon?: string;
  iconsBurgerLine?: string;
  showAccountButton?: boolean;
  showIconsBurgerLine?: boolean;
};

const ConnectMenu: NextPage<ConnectMenuType> = ({
  icon,
  iconsBurgerLine,
  showAccountButton,
  showIconsBurgerLine,
}) => {
  const { user, isLoading } = useMe();
  const { points } = useGetPoints();
  const { level } = useGetLevel();
  const { avatarUrl } = useGetAvatar();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const userId = user?.id ?? '';
  const { isEligible } = useCheckLevelEligibility(userId); // Check if the user is eligible for leveling up

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return <Button />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-end">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-end pr-14">
      {/* Conditionally render the LevelButton if the user is eligible */}
      {isEligible && (
        <div className="mr-2 hidden sm:block">
          {' '}
          {/* Add margin to separate from other elements */}
          <LevelButton />
        </div>
      )}
      <div className="rounded-50xl padding-r[16px] h-10 flex flex-row items-center justify-center gap-[8px] text-left text-base text-white-gold-itsc font-bold">
        {showAccountButton && (
          <div className="rounded-sm bg-dark-connectbuttonbackground shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-0 px-0.5 box-border gap-[8px]">
            <div className="rounded-smi bg-dark-actionbuttonsecondarybackground h-9 flex flex-row items-center justify-start p-2 box-border">
              <div className="flex flex-row items-center justify-start">
                <b className="relative tracking-[0.6px] leading-[20px]">
                  <FlipScroll value={points} /> TP
                </b>
              </div>
            </div>
            <div className="rounded-sm bg-dark-connectbuttonbackground shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-0 px-0.5 box-border gap-[8px]">
              <div className="rounded-sm bg-dark-connectbuttonbackground shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-0 px-0.5 box-border">
                <div className="rounded-smi bg-dark-actionbuttonsecondarybackground h-9 flex flex-row items-center justify-start p-2 box-border">
                  <div className="flex flex-row items-center justify-start">
                    <b className="relative tracking-[0.6px] leading-[20px]">
                      Level <FlipScroll value={level} />
                    </b>
                  </div>
                </div>
              </div>
              <div className="rounded-smi bg-dark-actionbuttonsecondarybackground h-9 flex flex-row items-center justify-start p-2 box-border gap-[8px]">
                <div className="relative w-6 h-6">
                  <img
                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50px] max-w-full overflow-hidden max-h-full object-cover"
                    alt=""
                    src={avatarUrl ?? '/-privateavatarbase@2x.png'}
                  />
                </div>
                <div className="flex flex-row items-center justify-start gap-[2px]">
                  <b className="relative tracking-[0.6px] leading-[20px]">
                    {user?.ENSName ??
                      getTruncatedWalletAddress(user?.walletAddress ?? '')}
                  </b>
                  {icon && (
                    <img
                      ref={iconRef}
                      className={`cursor-pointer w-6 h-6 transition-transform ${
                        showDropdown ? 'rotate-90' : ''
                      }`}
                      alt="Menu"
                      src={icon}
                      onClick={toggleDropdown}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showIconsBurgerLine && (
        <img
          className="relative w-8 h-8 cursor-pointer"
          alt="Menu"
          src={iconsBurgerLine}
        />
      )}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`fixed top-[80px] right-0 h-full z-20 w-[360px] opacity-95 ${
            showDropdown ? 'animate-slideIn' : 'animate-slideOut'
          }`}
        >
          <DesktopDropdown />
        </div>
      )}
    </div>
  );
};

export default ConnectMenu;
