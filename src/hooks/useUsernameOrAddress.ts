import { useRouter } from 'next/router';
import { isEthereumWalletAddress } from '../utils/wallet';

/**
 * Returns the current profile's username (or address, as a fallback)
 * by looking at the router path param
 */
export const useUsernameOrAddress = () => {
  const usernameOrAddress = useRouter().query.user as string;
  const isAddress = isEthereumWalletAddress(usernameOrAddress);
  const isUsername = !isAddress;

  return { usernameOrAddress, isAddress, isUsername };
};
