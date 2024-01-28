import type { NextPage } from 'next';
import { useMe } from '~/hooks/useMe';
import { useGetPoints } from '~/hooks/useGetPoints';
import { useGetLevel } from '~/hooks/useGetLevel';
import { getTruncatedWalletAddress } from '~/utils/wallet';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import { useGetProfile } from '~/hooks/useGetProfile';
import { useEditProfileModal } from '~/context/EditProfileModalContext';
import { useGetAvatar } from '~/hooks/useGetAvatar';
import { signIn } from 'next-auth/react';

const TigerProfile: NextPage = () => {
  const { user, isLoading } = useMe();
  const truncatedWalletAddress = getTruncatedWalletAddress(
    user?.walletAddress ?? '',
  );
  const userId = user?.id ?? '';
  const { points = 0 } = useGetPoints();
  const { level = 0 } = useGetLevel();
  const { toNextLevel = 0 } = useCheckLevelEligibility(userId);
  const { profile } = useGetProfile(userId);
  const { openModal } = useEditProfileModal();
  const { avatarUrl } = useGetAvatar();
  const progressPercentage = (points / (points + toNextLevel)) * 100 ?? 0;
  const handleDiscordSignIn = async () => {
    const userId = user?.id ?? '';
    document.cookie = `userId=${userId}; path=/; max-age=300`; // 5 minutes expiry
    await signIn(
      'discord',
      {
        callbackUrl: `/api/auth/callback/discord`,
      },
      { userId: userId },
    );
  };

  return (
    <div className="relative bg-itsc-black w-full min-h-screen flex flex-col items-center justify-center pt-10 lg:pt-20">
      {/* Background Placeholder */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="/BG ELEMENTS STARS A.svg"
          alt="Background Stars"
          className="absolute top-0 left-0 w-full z-0 h-full object-cover animate-fadeInOut"
        />
        <img
          src="/stars b.svg"
          alt="Twinkling Stars"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 animate-twinkle"
        />
        <img
          src="/BG ELEMENTS CLOUDS.svg"
          alt="Clouds"
          className="absolute top-[-24px] left-0 w-screen h-auto min-h-[85%] z-1 animate-marquee"
        />
        <img
          className="absolute h-[2.21%] w-[17.79%] top-[33.08%] right-[77.84%] bottom-[74.71%] left-[1.37%] max-w-full overflow-hidden max-h-full z-1 animate-marquee"
          alt=""
          src="/right-gallery-cloud.svg"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-10 relative z-8">
        <div
          className="bg-black bg-opacity-50 rounded-lg p-6 lg:p-10 mx-auto"
          style={{ marginTop: '8vh', marginRight: 'auto' }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
            {/* Profile Image */}
            <img
              className="w-3/4 lg:w-1/3 xl:w-1/4 h-auto object-cover rounded-lg"
              alt="Profile"
              src={avatarUrl ?? '/-privateavatarbase@2x.png'}
            />

            {/* Profile Details */}
            <div className="text-white font-outfit max-w-md w-full lg:w-auto">
              {/* Profile Name */}
              <h1 className="text-[40px] lg:text-[62px] font-title mb-4 bg-gradient-to-l from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent">
                {profile?.username ??
                  profile?.ENSName ??
                  truncatedWalletAddress}
              </h1>

              {/* Tiger Points and Level */}
              <div className="flex flex-row justify-between mb-4">
                <div className="text-center">
                  <div className="text-sm">TIGER POINTS</div>
                  <div className="text-lg font-bold">{points}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm">TP LEVEL</div>
                  <div className="text-lg font-bold">{level}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-itsc-white rounded-full h-3 mb-4">
                <div
                  className="bg-dusty-red h-3 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-4">
                <button
                  className="bg-dusty-red text-white py-2 px-4 rounded shadow"
                  onClick={() => handleDiscordSignIn()} // Corrected
                >
                  Connect Discord
                </button>
                <button
                  className="bg-dusty-red text-white py-2 px-4 rounded shadow"
                  onClick={openModal}
                >
                  Edit Profile
                </button>
              </div>

              {/* Additional Profile Information */}
              <div className="flex flex-col gap-4 text-lg lg:text-[18.93px]">
                {/* Profile Details */}
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-light">Location: </span>
                    <b>{profile?.location ?? 'Not specified'}</b>
                  </div>
                  <div>
                    <span className="font-light text-white-gold-itsc">
                      Site Member Since:{' '}
                    </span>
                    <b>{profile?.joinedDate?.toDateString() ?? 'Unknown'}</b>
                  </div>
                  <div>
                    <span className="font-light">ENS: </span>
                    <b>{profile?.ENSName ?? 'Not available'}</b>
                  </div>
                  <div>
                    <span className="font-light">X Handle: </span>
                    <b>{profile?.xhandle ?? 'None'}</b>
                  </div>
                  <div>
                    <span className="font-light">Discord Handle: </span>
                    <b>{profile?.discordid ?? 'None'}</b>
                  </div>
                  <div>
                    <span className="font-light">Ethereum Wallet: </span>
                    <b>{profile?.walletAddress ?? 'Not provided'}</b>
                  </div>
                </div>

                {/* Profile Bio */}
                <div className="text-[20px] leading-[20px] font-light text-white overflow-hidden text-ellipsis [-webkit-line-clamp:10] [-webkit-box-orient:vertical] w-[700px]">
                  <p>{profile?.bio ?? 'No bio available.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TigerProfile;
