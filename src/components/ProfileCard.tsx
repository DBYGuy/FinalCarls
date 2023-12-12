import React from 'react';

interface RectangleCardProps {
  imageUrl: string;
  itscNumber: string;
  holderName: string;
  tagDetails1: string;
  tagDetails2: string;
  buttonText: string;
}

const ProfileCard: React.FC<RectangleCardProps> = ({
  imageUrl,
  itscNumber,
  holderName,
  tagDetails1,
  tagDetails2,
  buttonText,
}) => {
  return (
    <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[300px] h-[400px] border-8 border-double border-yellow-100">
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded bg-gray-100 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset]" />
      <div className="absolute top-[28px] left-[calc(50%_-_125px)] flex flex-col items-start justify-end gap-[8px]">
        <img
          className="relative rounded-3xs w-[250px] h-[250px] object-cover"
          alt=""
          src={imageUrl}
        />
        <div className="flex flex-col items-start justify-end">
          <div className="relative tracking-[-0.01em] leading-[3px] flex items-center w-[250px] h-7 shrink-0">
            {itscNumber}
          </div>
          <b className="relative tracking-[-0.01em] leading-[3px] flex items-center w-[250px] h-7 shrink-0 mt-[-6px]">
            {holderName}
          </b>
          <div className="relative text-base tracking-[-0.01em] font-light flex items-center w-[106px] h-7 shrink-0 mt-[-6px]">
            {tagDetails1}
          </div>
          <div className="relative text-base tracking-[-0.01em] font-light flex items-center w-[106px] h-7 shrink-0 mt-[-6px]">
            {tagDetails2}
          </div>
        </div>
        <div className="rounded-sm bg-lightslategray shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] h-10 hidden flex-row items-center justify-start py-2 px-4 box-border text-base text-silver font-bold">
          <b className="relative tracking-[0.6px] leading-[20px]">
            {buttonText}
          </b>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
