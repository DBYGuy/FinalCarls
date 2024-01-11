import React from 'react';

export interface NftProps {
  readonly name: string;
  readonly src: string;
  readonly description: string;
  readonly href: string;
}

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
    <div className="nft-selector">
      {nfts.map((nft, index) => (
        <div
          key={index}
          className={`nft-item ${
            selectedNft?.name === nft.name ? 'selected' : ''
          }`}
          onClick={() => onSelect(nft)}
        >
          <img src={nft.src} alt={nft.name} className="nft-image" />
          <p className="nft-name">{nft.name}</p>
        </div>
      ))}
      {nfts.length === 0 && <p>No NFTs found.</p>}
    </div>
  );
};

export default NftSelector;
