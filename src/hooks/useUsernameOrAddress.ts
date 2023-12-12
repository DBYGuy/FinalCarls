import { useSearchParams } from 'next/navigation';
import { isEthereumWalletAddress } from '../utils/wallet';

/**
 * Returns the current profile's username (or address, as a fallback)
 * by looking at the router path param
 */
export const useUsernameOrAddress = () => {
  const searchParams = useSearchParams();
  const usernameOrAddress = searchParams?.get('user');
  const isAddress = isEthereumWalletAddress(usernameOrAddress!);
  const isUsername = !isAddress;

  return { usernameOrAddress, isAddress, isUsername };
};
