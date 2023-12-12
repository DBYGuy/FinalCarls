import { CHAIN } from '../constants';

/** Determines if the passed in string is a valid Ethereum wallet address (naive) */
export const isEthereumWalletAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/** Get truncated wallet address, e.g. 0xc4Da...46a1 */
export const getTruncatedWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/** Get truncated wallet address, e.g. 0xc4Da...46a1 */
export const isUUID = (id: string) => {
  return id?.length === 36 && id?.includes('-');
};

export const getEtherscanBaseAddress = () =>
  `https://${CHAIN.id === 1 ? '' : 'sepolia.'}etherscan.io`;

export const getOpenSeaTokenBaseAddress = () =>
  `https://${CHAIN.id === 1 ? '' : 'testnets.'}opensea.io/assets/${
    CHAIN.id === 1 ? 'ethereum' : 'sepolia'
  }`;

export const getOpenSeaCollectionBaseAddress = () =>
  `https://${CHAIN.id === 1 ? '' : 'testnets.'}opensea.io`;
