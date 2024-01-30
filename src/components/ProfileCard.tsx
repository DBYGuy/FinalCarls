import React, { useState, useEffect } from 'react';
import { itscTigerContract } from '~/contracts/tiger';
import { getOpenSeaTokenBaseAddress } from '~/utils/wallet';

interface ProfileCardProps {
  name: string;
  src: string; // Image URL
  trait1: string; // First trait
  trait2: string; // Second trait
  hasUser?: boolean; // Indicates if there is a user associated with the token
  userId?: string; // User ID associated with the token
  openTigerModal: (userId: string) => void; // Function to open the Tiger modal
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  src,
  trait1,
  trait2,
  hasUser = false,
  userId,
  openTigerModal,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setIsImageLoading(false);
    image.onerror = () => setIsImageLoading(false); // Handle error case
  }, [src]);

  const handleTigerIconClick = () => {
    if (userId) {
      openTigerModal(userId);
    }
  };

  const getTraitClass = (trait: string) => {
    return trait.length > 20 ? 'text-xs' : 'text-[14px]';
  };

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
        <div className="shrink-0 flex flex-col items-center justify-end pt-2">
          <div className="relative tracking-[-0.01em] leading-[3px] flex items-center w-[250px] h-7">
            {isImageLoading ? 'Loading...' : name}
          </div>
          <div className={`text-left ${getTraitClass(trait1)} w-[250px]`}>
            {isImageLoading ? '' : trait1}
          </div>
          <div
            className={`text-left ${getTraitClass(trait2)} w-[250px] mt-[-3px]`}
          >
            {isImageLoading ? '' : trait2}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center">
        <div className="flex items-center justify-center mr-3">
          {hasUser && (
            <img
              src="/day-7-tiger.svg"
              alt="User"
              className="w-6 h-6 cursor-pointer"
              onClick={handleTigerIconClick}
            />
          )}
        </div>
        <div className="flex items-center justify-center mt-2 mr-4">
          <a
            href={`${getOpenSeaTokenBaseAddress()}/${
              itscTigerContract.address as `0x${string}`
            }/${Number(name.split('#')[1]?.match(/\d+/)?.[0] ?? '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/opensea-ship.svg" alt="OpenSea" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
