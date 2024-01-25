import type { NextPage } from 'next';

type FrameComponentType = {
  privateAvatarBase?: string;
  rank?: number;
  username?: string;
  level?: number;
  points?: number;
};

const FrameComponent: NextPage<FrameComponentType> = ({
  privateAvatarBase,
  rank,
  username,
  level,
  points,
}) => {
  return (
    <div className="grid grid-cols-12 items-center w-full max-w-[703px] mx-auto gap-2 p-2">
      {/* Rank and Avatar (span 3 columns) */}
      <div className="col-span-4 md:col-span-3 flex items-center space-x-1 md:space-x-2">
        <div
          className="flex items-center justify-center w-12 h-12 md:w-18 md:h-18 font-title text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start to-text-gold-end truncate text-3xl md:text-4xl"
          style={{ lineHeight: '48px' }}
        >
          {rank}
        </div>
        <img
          className="w-12 h-12 md:w-18 md:h-18 object-cover rounded-full"
          alt={username}
          src={privateAvatarBase}
          style={{ maxWidth: '48px', maxHeight: '48px' }}
        />
      </div>
      {/* Username (span 5 columns) */}
      <div className="col-span-4 md:col-span-5 text-center truncate text-sm md:text-base">
        <b>{username}</b>
      </div>
      {/* Level (span 2 columns) */}
      <div className="col-span-2 md:col-span-2 text-center truncate text-sm md:text-base">
        <b>{level}</b>
      </div>
      {/* Points (span 2 columns) */}
      <div className="col-span-2 md:col-span-2 text-right truncate text-sm md:text-base">
        <b>{points}</b>
      </div>
    </div>
  );
};

export default FrameComponent;
