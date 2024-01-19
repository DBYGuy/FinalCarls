import type { NextPage } from 'next';
import { useMemo, type CSSProperties } from 'react';

type FrameComponentType = {
  privateAvatarBase?: string;
  rank?: number;
  username?: string;
  level?: number;
  points?: number;

  /** Style props */
  frameDivPosition?: CSSProperties['position'];
};

const FrameComponent: NextPage<FrameComponentType> = ({
  privateAvatarBase,
  rank,
  username,
  level,
  points,
  frameDivPosition,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      position: frameDivPosition,
    };
  }, [frameDivPosition]);

  return (
    <div
      className="w-[1267px] h-[72px] text-left text-17xl text-white-gold-itsc font-roboto"
      style={frameDivStyle}
    >
      {/* Rank */}
      <div className="absolute top-[4px] left-[0px] w-[126px] h-16 text-45xl font-title">
        <div className="absolute w-full top-[0%] left-[0%] tracking-[3.4px] leading-[64px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
          {rank}
        </div>
      </div>
      {/* Avatar */}
      <img
        className="absolute top-[0px] left-[134px] w-[72px] h-[72px] object-cover rounded-[77px]"
        alt=""
        src={privateAvatarBase}
      />
      {/* Username */}
      <div className="absolute top-[15px] left-[270px] w-[411px] h-[42px]">
        <b className="absolute w-full top-[0%] left-[0%] inline-block">
          {username}
        </b>
      </div>
      {/* Level */}
      <div className="absolute top-[15px] left-[796px] w-[113px] h-[42px] text-center">
        <b className="absolute w-full top-[0%] left-[0%] inline-block">
          {level}
        </b>
      </div>
      {/* Points */}
      <div className="absolute top-[12px] left-[1012px] w-[193px] h-[42px] text-right">
        <b className="absolute w-full top-[0%] left-[0%] inline-block">
          {points}
        </b>
      </div>
    </div>
  );
};

export default FrameComponent;
