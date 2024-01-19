import React from 'react';
import { NftProps } from '~/hooks/useTigerNfts';

interface NftSelectorProps {
  nfts: NftProps[];
  onSelect: (nft: NftProps) => void;
  selectedNft: NftProps | null;
}

const NftSelector: React.FC<NftSelectorProps> = ({
  nfts,
  onSelect,
  selectedNft,
}) => {
  return (
    <div className="text-black font-omegle">
      {nfts.map((nft, index) => (
        <div
          key={index}
          className={`nft-item ${
            selectedNft?.name === nft.name ? 'selected' : ''
          }`}
          onClick={() => onSelect(nft)}
        >
          <img src={nft.s3ImageUrl} alt={nft.name} className="nft-image" />
          <p className="nft-name">{nft.name}</p>
        </div>
      ))}
      {nfts.length === 0 && <p>No NFTs found.</p>}
    </div>
  );
};

export default NftSelector;
