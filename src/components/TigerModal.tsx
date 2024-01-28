import type { NextPage } from 'next';
import { useGetUserInfo } from '~/hooks/useGetUserInfo';

interface TigerModalProps {
  userId: string;
  onClose: () => void;
}

const TigerModal: NextPage<TigerModalProps> = ({ userId, onClose }) => {
  const { userInfo, isLoading } = useGetUserInfo(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeUp">
      <div className="bg-black bg-opacity-93 rounded-lg p-6 lg:p-10 mx-auto max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          X
        </button>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
          {/* Profile Image */}
          <img
            className="w-3/4 lg:w-1/3 xl:w-1/4 h-auto object-cover rounded-lg"
            alt="Profile"
            src={userInfo.avatar ?? '/-privateavatarbase@2x.png'}
          />

          {/* Profile Details */}
          <div className="text-white font-outfit max-w-md w-full lg:w-auto">
            {/* Profile Name */}
            <h1 className="text-[40px] lg:text-[62px] font-title mb-4 bg-gradient-to-l from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent">
              {userInfo.username}
            </h1>

            {/* Tiger Points and Level */}
            <div className="flex flex-row justify-between mb-4">
              <div className="text-center">
                <div className="text-sm">TIGER POINTS</div>
                <div className="text-lg font-bold">{userInfo.totalPoints}</div>
              </div>
              <div className="text-center">
                <div className="text-sm">TP LEVEL</div>
                <div className="text-lg font-bold">{userInfo.level}</div>
              </div>
            </div>

            {/* Additional Profile Information */}
            <div className="flex flex-col gap-4 text-lg lg:text-[18.93px]">
              {/* Profile Details */}
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-light">Location: </span>
                  <b>{userInfo.location}</b>
                </div>
                <div>
                  <span className="font-light">Joined Date: </span>
                  <b>{userInfo.joinedDate}</b>
                </div>
                <div>
                  <span className="font-light">X Handle: </span>
                  <b>{userInfo.xHandle}</b>
                </div>
                <div>
                  <span className="font-light">Discord Handle: </span>
                  <b>{userInfo.discordID}</b>
                </div>
              </div>

              {/* Profile Bio */}
              {/* Include bio if available */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TigerModal;
