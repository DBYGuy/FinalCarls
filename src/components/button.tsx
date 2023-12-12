import type { NextPage } from 'next';
import { useMemo, type CSSProperties } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
// import { open } from 'fs/promises';

type ButtonType = {
  /** Style props */
  buttonCursor?: CSSProperties['cursor'];
  buttonBorder?: CSSProperties['border'];
  buttonBackgroundColor?: CSSProperties['backgroundColor'];
  connectWalletDisplay?: CSSProperties['display'];
};

const Button: NextPage<ButtonType> = ({
  buttonCursor,
  buttonBorder,
  buttonBackgroundColor,
  connectWalletDisplay,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      cursor: buttonCursor,
      border: buttonBorder,
      backgroundColor: buttonBackgroundColor,
    };
  }, [buttonCursor, buttonBorder, buttonBackgroundColor]);

  const connectWallet1Style: CSSProperties = useMemo(() => {
    return {
      display: connectWalletDisplay,
    };
  }, [connectWalletDisplay]);

  const { openConnectModal } = useConnectModal();

  return (
    <div
      className="rounded-15xl [background:linear-gradient(180deg,_#efd891,_#ede2b2)] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-2 px-4 box-border text-left text-base text-black font-bold"
      style={buttonStyle}
    >
      <b
        className="relative tracking-[0.6px] leading-[20px]"
        style={connectWallet1Style}
      >
        <button onClick={openConnectModal} type="button">
          Connect Wallet
        </button>
      </b>
    </div>
  );
};

export default Button;
