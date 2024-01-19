import type { NextPage } from 'next';
import { useGetPoints } from '~/hooks/useGetPoints';
import { useGetLevel } from '~/hooks/useGetLevel';
import { useMe } from '~/hooks/useMe';
import { useGetAvatar } from '~/hooks/useGetAvatar';
import { getTruncatedWalletAddress } from '~/utils/wallet';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import LevelButton from '~/components/LevelButton';

const DesktopDropdown: NextPage = () => {
  const user = useMe();
  const { points } = useGetPoints();
  const { level } = useGetLevel();
  const { avatarUrl } = useGetAvatar();
  const truncatedWalletAddress = getTruncatedWalletAddress(
    user?.walletAddress ?? '',
  );
  const userId = user?.id ?? '';
  const { isEligible, toNextLevel } = useCheckLevelEligibility(userId);

  return (
    <div className="relative rounded-[5px] z-8 box-border w-full h-[964px] overflow-hidden text-left text-[25.51px] text-white-gold-itsc font-sfpro">
      <div className="absolute top-[16px] left-[16px] w-[351px] h-[932px]">
        <div className="absolute top-[0px] left-[0px] rounded-lg bg-itsc-black box-border w-[357px] h-[932px] border-t-[3px] border-solid border-linear border-b-[3px] border-l-[3px]" />
        <div className="absolute top-[223px] left-[32px] flex flex-col items-start justify-start gap-[24px]">
          <b className="relative tracking-[0.64px] leading-[21.26px]">
            View Full Profile
          </b>
          <b className="relative tracking-[0.64px] leading-[21.26px]">
            Daily Check-in
          </b>
          <b className="relative tracking-[0.64px] leading-[21.26px]">{`Member Directory `}</b>
        </div>
        <div className="absolute top-[49px] left-[53px] hidden flex-col items-center justify-start gap-[8px] text-base text-black">
          <div className="rounded-15xl [background:linear-gradient(180deg,_#efd891,_#ede2b2)] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 flex flex-row items-center justify-start py-2 px-4 box-border">
            <b className="relative tracking-[0.6px] leading-[20px]">
              Connect Wallet
            </b>
          </div>
          <b className="relative text-[14px] tracking-[0.6px] leading-[16px] flex text-white-gold-itsc whitespace-pre-wrap text-center items-center justify-center w-[239px]">{`Connect above  to check your level & view your profile `}</b>
        </div>
        <div className="absolute top-[66px] left-[229px] w-[88px] h-[88px]">
          <img
            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[73.33px] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={avatarUrl ?? '/-privateavatarbase@2x.png'}
          />
        </div>
        <div className="absolute top-[22px] left-[31px] flex flex-col items-start justify-start gap-[8px] text-17xl font-outfit">
          <div className="relative w-[195px] h-9 font-omegle">
            <div className="absolute top-[0%] left-[0%] tracking-[1.91px] leading-[36px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] overflow-hidden text-ellipsis whitespace-nowrap">
              {user?.ENSName ?? truncatedWalletAddress}
            </div>
          </div>
          <div className="shrink-0 flex flex-row items-start justify-start gap-[9px] text-center text-[6.75px]">
            <div className="rounded-[1.69px] box-border h-[30.38px] shrink-0 flex flex-col items-center justify-start p-[4.500000476837158px] gap-[4.5px] border-[1.1px] border-solid border-linear">
              <div className="relative tracking-[0.56px] leading-[12.38px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[55.69px] h-[11.19px] shrink-0">
                TIGER POINTS
              </div>
              <div className="relative tracking-[0.01em] leading-[40.5px] top-[-5px] font-omegle text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[61.31px] h-[14.25px] text-[15px] shrink-0">
                {points}
              </div>
            </div>
            <div className="rounded-[1.69px] box-border h-[30.38px] shrink-0 flex flex-col items-center justify-start p-[4.500000476837158px] gap-[4.5px] border-[1.1px] border-solid border-linear">
              <div className="relative tracking-[0.56px] leading-[12.38px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[55.69px] h-[11.19px] shrink-0">
                TP LEVEL
              </div>
              <div className="relative tracking-[0.01em] leading-[40.5px] top-[-5px] font-omegle text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[61.31px] h-[14.25px] text-[15px] shrink-0">
                {level}
              </div>
            </div>
          </div>
          <div className="relative w-[180px] h-[14.06px] text-7xs">
            <div className="absolute h-[12px] w-[66.04%] top-[-18%] left-[0%] tracking-[0.19px] leading-[6.75px] font-light flex items-center text-[8px]">
              {toNextLevel} Tiger points to next level!
            </div>
            <div className="absolute h-[48%] w-full top-[52%] right-[0%] bottom-[0%] left-[0%] rounded-[11.25px] overflow-hidden">
              <div className="absolute w-full top-[calc(50%_-_3.38px)] right-[0%] left-[0%] rounded-[3.94px] bg-white-gold-itsc h-[6.75px]" />
              <div className="absolute w-[57.19%] top-[0px] right-[42.81%] left-[0%] rounded-tl-[3.94px] rounded-tr-none rounded-br-none rounded-bl-[3.94px] bg-dusty-red flex flex-col items-start justify-start">
                <div className="w-[102.94px] h-[6.75px] overflow-hidden shrink-0 flex flex-row items-start justify-start relative opacity-[0.28]">
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[0]"
                    alt=""
                    src="/line-1@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[1] ml-[-9px]"
                    alt=""
                    src="/line-2@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[2] ml-[-9px]"
                    alt=""
                    src="/line-3@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[3] ml-[-9px]"
                    alt=""
                    src="/line-4@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[4] ml-[-9px]"
                    alt=""
                    src="/line-5@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[5] ml-[-9px]"
                    alt=""
                    src="/line-6@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[6] ml-[-9px]"
                    alt=""
                    src="/line-7@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[7] ml-[-9px]"
                    alt=""
                    src="/line-8@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[8] ml-[-9px]"
                    alt=""
                    src="/line-14@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[9] ml-[-9px]"
                    alt=""
                    src="/line-15@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[10] ml-[-9px]"
                    alt=""
                    src="/line-16@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[11] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[12] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[13] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[14] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[15] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[16] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[17] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[18] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[19] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[20] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[21] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[22] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[18.41px] h-[27px] object-contain z-[23] ml-[-9px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="absolute my-0 mx-[!important] top-[0px] left-[-10.12px] w-[18.41px] h-[27px] object-contain z-[24]"
                    alt=""
                    src="/line-25@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-start justify-start gap-[8px] text-[25.06px] text-itsc-black font-bold">
            <div className="shrink-0 flex flex-row items-start justify-start">
              <div className="shadow-[0px_1.7239909172058105px_1.72px_rgba(0,_0,_0,_0.25)] shrink-0 flex flex-row items-start justify-start">
                <div className="rounded-[10.26px] [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.17),_rgba(0,_0,_0,_0)_57.81%,_rgba(0,_0,_0,_0.2)),_#d15454] shadow-[0px_2.9307847023010254px_8.79px_rgba(0,_0,_0,_0.1)] h-[29.31px] flex flex-row items-center justify-start py-[5.861569404602051px] px-[11.723138809204102px] box-border text-[14.2px]">
                  <b className="relative tracking-[0.94px] leading-[31.33px]">
                    Edit Profile
                  </b>
                </div>
              </div>
            </div>
            {isEligible && (
              <div>
                {' '}
                <LevelButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDropdown;
