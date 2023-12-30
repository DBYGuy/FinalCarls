import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  CSSProperties,
} from 'react';
import type { NextPage } from 'next';
import DesktopDropdown from './DesktopDropdown'; // Ensure this path is correct
import { getTruncatedWalletAddress } from '~/utils/wallet';
import { useGetPoints } from '~/hooks/useGetPoints';
import { useMe } from '~/hooks/useMe';
import { useGetLevel } from '~/hooks/useGetLevel';

type ConnectMenuType = {
  avatar?: string;
  icon?: string;
  iconsBurgerLine?: string;
  showButton?: boolean;
  showAccountButton?: boolean;
  showIconsBurgerLine?: boolean;
  connectWalletDisplay?: CSSProperties['display'];
};

const ConnectMenu: NextPage<ConnectMenuType> = ({
  avatar,
  icon,
  iconsBurgerLine,
  showButton,
  showAccountButton,
  showIconsBurgerLine,
  connectWalletDisplay,
}) => {
  const connectWalletStyle = useMemo(
    () => ({
      display: connectWalletDisplay,
    }),
    [connectWalletDisplay],
  );

  // CSS for slide-in and slide-out animations
  const slideInStyles = {
    transform: 'translateX(0%)',
    transition: 'transform 300ms ease-in-out',
  };

  const slideOutStyles = {
    transform: 'translateX(100%)', // Slide out to the right
    transition: 'transform 300ms ease-in-out',
  };
  const user = useMe();
  const { points } = useGetPoints();
  const { level } = useGetLevel();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex">
      <div className="rounded-50xl h-10 flex flex-row items-center justify-center gap-[8px] text-left text-base text-white-gold-itsc font-bold">
        {showButton && (
          <button className="cursor-pointer [border:none] py-2 px-4 bg-[transparent] rounded-15xl [background:linear-gradient(180deg,_#efd891,_#ede2b2)] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start box-border">
            <b
              className="relative text-base tracking-[0.6px] leading-[20px] font-bold text-black text-left"
              style={connectWalletStyle}
            >
              Connect Wallet
            </b>
          </button>
        )}
        {showAccountButton && (
          <div className="rounded-sm bg-dark-connectbuttonbackground shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-0 px-0.5 box-border gap-[8px]">
            <div className="rounded-smi bg-dark-actionbuttonsecondarybackground h-9 flex flex-row items-center justify-start p-2 box-border">
              <div className="flex flex-row items-center justify-start">
                <b className="relative tracking-[0.6px] leading-[20px]">
                  {points} TP
                </b>
              </div>
            </div>
            <div className="rounded-sm bg-dark-connectbuttonbackground shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-0 px-0.5 box-border gap-[8px]">
              <div className="rounded-sm bg-dark-connectbuttonbackground shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-0 px-0.5 box-border">
                <div className="rounded-smi bg-dark-actionbuttonsecondarybackground h-9 flex flex-row items-center justify-start p-2 box-border">
                  <div className="flex flex-row items-center justify-start">
                    <b className="relative tracking-[0.6px] leading-[20px]">
                      Level {level}
                    </b>
                  </div>
                </div>
              </div>
              <div className="rounded-smi bg-dark-actionbuttonsecondarybackground h-9 flex flex-row items-center justify-start p-2 box-border gap-[8px]">
                <div className="relative w-6 h-6">
                  <img
                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                    alt=""
                    src={avatar}
                  />
                </div>
                <div className="flex flex-row items-center justify-start gap-[2px]">
                  <b className="relative tracking-[0.6px] leading-[20px]">
                    {user?.ENSName ??
                      getTruncatedWalletAddress(user?.walletAddress ?? '')}
                  </b>
                  {icon && (
                    <img
                      className="relative w-6 h-6"
                      alt=""
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
          style={{
            position: 'absolute',
            top: '0%',
            right: 0,
            ...(showDropdown ? slideInStyles : slideOutStyles), // Toggle styles
          }}
        >
          <DesktopDropdown />
        </div>
      )}
    </div>
  );
};

export default ConnectMenu;
