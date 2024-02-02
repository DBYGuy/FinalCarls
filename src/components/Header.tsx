import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';

const Header: NextPage = () => {
  return (
    <header className="self-stretch flex-1 flex flex-row items-center justify-between py-4 px-40 box-border gap-[20px] max-w-full text-center text-base text-carl-frost-white font-text-md-lineheight-6-font-semibold mq750:pl-10 mq750:pr-10 mq750:box-border mq1050:pl-20 mq1050:pr-20 mq1050:box-border">
      <img
        className="self-stretch w-[62px] relative max-h-full object-contain min-h-[89px]"
        loading="eager"
        alt=""
        src="/ccc-logo-white-1@2x.png"
      />
      <div className="self-stretch flex flex-row items-center justify-center py-5 px-0 box-border gap-[16px] max-w-full mq750:hidden">
        <div className="flex flex-row items-center justify-center p-2">
          <div className="relative leading-[24px] font-semibold">ABOUT</div>
        </div>
        <div className="flex flex-row items-center justify-center p-2">
          <div className="relative leading-[24px] font-semibold">RELEASES</div>
        </div>
        <div className="flex flex-row items-center justify-center py-2 px-1.5">
          <div className="relative leading-[24px] font-semibold whitespace-nowrap">
            CARL POINTS
          </div>
        </div>
        <div className="flex flex-row items-center justify-center p-2">
          <div className="relative leading-[24px] font-semibold">MORE</div>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
