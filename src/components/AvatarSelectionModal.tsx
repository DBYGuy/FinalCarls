import React from 'react';
import { useTigerNfts, NftProps } from '~/hooks/useTigerNfts';
import { useConfirmationModal } from '~/context/ConfirmationModalContext';
import { useUpdateAvatar } from '~/hooks/useUpdateAvatar';

interface AvatarSelectionModalProps {
  onClose: () => void;
}

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({
  onClose,
}) => {
  const nfts = useTigerNfts();
  const { showConfirmation } = useConfirmationModal();
  const { updateAvatar } = useUpdateAvatar();

  const handleAvatarSelection = (nft: NftProps) => {
    showConfirmation(
      `Are you sure you want to set this image as your avatar?`,
      () => handleAvatarUpdate(nft?.s3ImageUrl ?? ''),
    );
  };

  const handleAvatarUpdate = async (avatarUrl: string) => {
    await updateAvatar(avatarUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-itsc-black rounded w-[360px] max-w-lg w-full overflow-hidden p-8">
        <h2 className="text-[42px] font-omegle mb-4 text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end">
          Select Your Avatar
        </h2>
        <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-96">
          {nfts?.map((nft, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 border border-gray-300 rounded-lg flex flex-col items-center"
              onClick={() => handleAvatarSelection(nft)}
            >
              <img
                src={nft.src}
                alt={nft.name}
                className="rounded-md mb-2 object-cover h-24 w-24"
              />
              <p className="text-sm truncate text-center">{nft.name}</p>
            </div>
          ))}
          {!nfts ||
            (nfts.length === 0 && (
              <p className="text-center col-span-3">No NFTs available.</p>
            ))}
        </div>
        <button
          className="mt-4 text-white bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AvatarSelectionModal;
