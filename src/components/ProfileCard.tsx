import React, { useState, useEffect } from 'react';

interface ProfileCardProps {
  name: string;
  src: string; // Image URL
  trait1: string; // First trait
  trait2: string; // Second trait
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  src,
  trait1,
  trait2,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setIsImageLoading(false);
    image.onerror = () => setIsImageLoading(false); // Handle error case
  }, [src]);

  return (
    <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[300px] h-[400px] text-left text-5xl text-white font-outfit">
      <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded bg-itsc-black shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] box-border border-[7px] border-solid border-linear" />
      <div className="absolute top-[28px] left-[25px] flex flex-col items-center justify-end gap-[8px]">
        {isImageLoading ? (
          <img
            className="relative rounded-3xs w-[150px] h-[150px] object-cover animate-rotateClockwiseFast"
            alt="Loading..."
            src="/flower.svg"
          />
        ) : (
          <img
            className="relative rounded-3xs w-[250px] h-[250px] object-cover"
            alt={name}
            src={src}
          />
        )}
        <div className="shrink-0 flex flex-col items-center justify-end">
          <div className="relative tracking-[-0.01em] leading-[3px] flex items-center w-[250px] h-7">
            {isImageLoading ? 'Loading...' : name}
          </div>
          <div className="relative text-base tracking-[-0.01em] font-light flex items-center w-[206px] h-7 mt-[-6px]">
            {isImageLoading ? '' : trait1}
          </div>
          <div className="relative text-base tracking-[-0.01em] font-light flex items-center w-[206px] h-7 mt-[-6px]">
            {isImageLoading ? '' : trait2}
          </div>
        </div>
      </div>
      {/* Optional Button or Other Elements */}
    </div>
  );
};

export default ProfileCard;
