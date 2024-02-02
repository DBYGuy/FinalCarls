import type { NextPage } from 'next';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const ConnectButton: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <button
      onClick={openConnectModal}
      type="button"
      className="self-stretch flex flex-row items-start justify-start text-left text-lg text-white rounded-md bg-purple-400 py-0 px-[23px] gap-[8px] border-[1px] border-solid border-purp-carl"
    >
      <img
        className="h-4 w-4 relative overflow-hidden shrink-0 hidden z-8"
        alt=""
        src="/lefticon.svg"
      />
      <div className="relative leading-[28px] font-semibold whitespace-nowrap">
        Sign-in/Connect
      </div>
      <img
        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
        alt=""
        src="/lefticon.svg"
      />
    </button>
  );
};

export default ConnectButton;
