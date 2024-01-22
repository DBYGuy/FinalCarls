import type { NextPage } from 'next';
import { useMe } from '~/hooks/useMe';
import { useGetPoints } from '~/hooks/useGetPoints';
import { useGetLevel } from '~/hooks/useGetLevel';
import { getTruncatedWalletAddress } from '~/utils/wallet';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import { useGetProfile } from '~/hooks/useGetProfile';
import { useEditProfileModal } from '~/context/EditProfileModalContext';
import { useGetAvatar } from '~/hooks/useGetAvatar';

const TigerProfile: NextPage = () => {
  const { user, isLoading } = useMe();
  const truncatedWalletAddress = getTruncatedWalletAddress(
    user?.walletAddress ?? '',
  );
  const userId = user?.id ?? '';
  const { points } = useGetPoints();
  const { level } = useGetLevel();
  const { toNextLevel } = useCheckLevelEligibility(userId);
  const { profile } = useGetProfile(userId);
  const { openModal } = useEditProfileModal();
  const { avatarUrl } = useGetAvatar();

  return (
    <div className="relative bg-itsc-black w-full flex flex-row items-start justify-start gap-[164px] text-left text-45xl text-white-gold-itsc font-outfit">
      <div className="shrink-0 flex flex-col items-start justify-start gap-[32px]">
        <div className="self-stretch shrink-0 flex flex-row items-center justify-between font-title">
          <div className="relative tracking-[3.4px] leading-[64px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] overflow-hidden text-ellipsis whitespace-nowrap">
            {profile?.username ?? profile?.ENSName ?? truncatedWalletAddress}
          </div>
          <div className="shrink-0 flex flex-row items-center justify-start gap-[16px] text-center text-xs">
            <div className="rounded-10xs box-border h-[54px] shrink-0 flex flex-col items-center justify-start p-2 gap-[8px] border-[2px] border-solid border-navajowhite">
              <div className="relative tracking-[1px] leading-[22px] text-transparent  font-outfit !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[99px] h-[11px] shrink-0">
                TIGER POINTS
              </div>
              <div className="relative text-[22px] tracking-[0.01em] leading-[72px] font-title text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[109px] h-5 shrink-0">
                {points}
              </div>
            </div>
            <div className="rounded-10xs box-border h-[54px] shrink-0 flex flex-col items-center justify-start p-2 gap-[8px] border-[2px] border-solid border-navajowhite">
              <div className="relative tracking-[1px] leading-[22px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[68px] h-[11px] shrink-0">
                TP LEVEL
              </div>
              <div className="relative text-[22px] tracking-[1px] leading-[72px] font-title text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center justify-center w-[63px] h-5 shrink-0">
                {level}
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch shrink-0 flex flex-row items-center justify-between text-[10.67px]">
          <div className="relative w-80 h-[25px]">
            <div className="absolute top-[0px] left-[0px] tracking-[0.33px] leading-[12px] font-light flex items-center w-[211.33px] h-2">
              {toNextLevel} Tiger points to next level!
            </div>
            <div className="absolute top-[13px] left-[0px] rounded-[20px] w-80 h-3 overflow-hidden">
              <div className="absolute w-full top-[calc(50%_-_6px)] right-[0%] left-[0%] rounded-6xs bg-white-gold-itsc h-3" />
              <div className="absolute w-[57.19%] top-[0px] right-[42.81%] left-[0%] rounded-tl-6xs rounded-tr-none rounded-br-none rounded-bl-6xs bg-dusty-red flex flex-col items-start justify-start">
                <div className="self-stretch h-3 overflow-hidden shrink-0 flex flex-row items-start justify-start relative opacity-[0.28]">
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[0]"
                    alt=""
                    src="/line-1@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[1] ml-[-16px]"
                    alt=""
                    src="/line-2@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[2] ml-[-16px]"
                    alt=""
                    src="/line-3@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[3] ml-[-16px]"
                    alt=""
                    src="/line-4@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[4] ml-[-16px]"
                    alt=""
                    src="/line-5@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[5] ml-[-16px]"
                    alt=""
                    src="/line-6@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[6] ml-[-16px]"
                    alt=""
                    src="/line-7@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[7] ml-[-16px]"
                    alt=""
                    src="/line-8@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[8] ml-[-16px]"
                    alt=""
                    src="/line-14@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[9] ml-[-16px]"
                    alt=""
                    src="/line-15@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[10] ml-[-16px]"
                    alt=""
                    src="/line-16@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[11] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[12] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[13] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[14] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[15] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[16] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[17] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[18] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[19] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[20] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[21] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[22] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="relative w-[32.74px] h-12 object-contain z-[23] ml-[-16px]"
                    alt=""
                    src="/line-17@2x.png"
                  />
                  <img
                    className="absolute my-0 mx-[!important] top-[0px] left-[-18px] w-[32.74px] h-12 object-contain z-[24]"
                    alt=""
                    src="/line-25@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex flex-row items-center justify-end gap-[16px] text-base text-itsc-black font-bold">
            <div className="shadow-[0px_1.9565668106079102px_1.96px_rgba(0,_0,_0,_0.25)] shrink-0 flex flex-row items-start justify-start">
              <div className="rounded-[11.64px] [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.17),_rgba(0,_0,_0,_0)_57.81%,_rgba(0,_0,_0,_0.2)),_#d15454] shadow-[0px_3.3261637687683105px_9.98px_rgba(0,_0,_0,_0.1)] h-[33.26px] flex flex-row items-center justify-start py-[6.652327537536621px] px-[13.304655075073242px] box-border">
                <b className="relative tracking-[0.6px] leading-[20px]">
                  Connect Discord
                </b>
              </div>
            </div>
            <div className="shadow-[0px_1.9565668106079102px_1.96px_rgba(0,_0,_0,_0.25)] shrink-0 flex flex-row items-start justify-start">
              <div className="rounded-[11.64px] [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.17),_rgba(0,_0,_0,_0)_57.81%,_rgba(0,_0,_0,_0.2)),_#d15454] shadow-[0px_3.3261637687683105px_9.98px_rgba(0,_0,_0,_0.1)] h-[33.26px] flex flex-row items-center justify-start py-[6.652327537536621px] px-[13.304655075073242px] box-border">
                <button
                  className="relative tracking-[0.6px] leading-[20px] font-outfit text-itsc-black"
                  onClick={openModal}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="[filter:drop-shadow(0px_4px_4px_rgba(0,_0,_0,_0.25)_inset)] shrink-0 flex flex-col items-start justify-start gap-[33px] text-[18.93px]">
          <b className="relative tracking-[2px] leading-[21.3px] flex text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center w-[351px]">
            {profile?.username ?? user?.ENSName ?? user?.walletAddress ?? ''}
          </b>
          <div className="shrink-0 flex flex-row items-start justify-start gap-[8px] text-base">
            <div className="relative w-[351px] h-[70px]">
              <div className="absolute top-[0px] left-[0px] tracking-[0.5px] leading-[18px] flex items-center w-[351px]">
                <span className="w-full">
                  <span>
                    <span className="font-light">Location</span>
                  </span>
                  <b className="text-white">
                    <span>{` `}</span>
                    <span>{profile?.location ?? ''}</span>
                  </b>
                </span>
              </div>
              <div className="absolute top-[26px] left-[0px] tracking-[0.5px] leading-[18px] flex items-center w-[351px] text-white">
                <span className="w-full">
                  <span className="font-light">
                    <span className="text-white-gold-itsc">
                      Site Member Since
                    </span>
                    <span>{` `}</span>
                  </span>
                  <span>
                    <b>{profile?.joinedDate?.toDateString() ?? ''}</b>
                  </span>
                </span>
              </div>
              <div className="absolute top-[52px] left-[0px] tracking-[0.5px] leading-[18px] flex items-center w-[351px]">
                <span className="w-full">
                  <span className="font-light">
                    <span>ENS</span>
                  </span>
                  <span className="text-white">
                    <span className="font-light">{` `}</span>
                    <b>{profile?.ENSName ?? ''}</b>
                  </span>
                </span>
              </div>
            </div>
            <div className="relative w-[351px] h-[70px]">
              <div className="absolute top-[0px] left-[0px] tracking-[0.5px] leading-[18px] flex items-center w-[351px]">
                <span className="w-full">
                  <span className="font-light">{`X Handle `}</span>
                  <b className="text-white">{profile?.xhandle ?? 'None'}</b>
                </span>
              </div>
              <div className="absolute top-[26px] left-[0px] tracking-[0.5px] leading-[18px] flex items-center w-[351px]">
                <span className="w-full">
                  <span className="font-light">Discord Handle</span>
                  <b className="text-white"> {profile?.discordid ?? 'None'}</b>
                </span>
              </div>
              <div className="absolute top-[52px] left-[0px] tracking-[0.5px] leading-[18px] flex items-center w-[351px]">
                <span className="w-full">
                  <span className="font-light">Ethereum Wallet</span>
                  <b className="text-white"> {profile?.walletAddress ?? ''}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="relative text-[20px] leading-[20px] font-light text-white [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:10] [-webkit-box-orient:vertical] w-[700px]">
            <p className="[margin-block-start:0] [margin-block-end:15px]">
              {profile?.bio ?? ''}
            </p>
          </div>
        </div>
      </div>
      <img
        className="relative w-[395px] h-[680.6px] object-cover"
        alt=""
        src={avatarUrl ?? '/-privateavatarbase@2x.png'}
      />
    </div>
  );
};

export default TigerProfile;
