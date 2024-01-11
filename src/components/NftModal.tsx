import React from 'react';
import NftSelector from './NftSelector';
import { NftProps } from '~/hooks/useTigerNfts'; // Adjust the import path as needed

export interface NftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (nft: NftProps) => void;
  nfts: NftProps[];
  selectedNft: NftProps | null;
}

const NftModal: React.FC<NftModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  nfts,
  selectedNft,
}) => {
  if (!isOpen) return null;

  return (
    <div className="nft-modal-backdrop">
      <div className="nft-modal">
        <button onClick={onClose}>Close</button>
        <NftSelector
          nfts={nfts}
          onSelect={onSelect}
          selectedNft={selectedNft}
        />
      </div>
    </div>
  );
};

export default NftModal;
