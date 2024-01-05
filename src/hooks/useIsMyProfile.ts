import { useRouter } from 'next/router';
import { isEthereumWalletAddress } from '../utils/wallet';
import { useIsAuthenticated } from './useIsAuthenticated';
import { useMe } from './useMe';

export default function useIsMyProfile() {
  const isAuthenticated = useIsAuthenticated();
  const usernameOrAddress = useRouter().query.user as string;
  const user = useMe();

  if (!user) {
    return undefined;
  }

  return (
    isAuthenticated &&
    usernameOrAddress ===
      user?.[
        isEthereumWalletAddress(usernameOrAddress)
          ? 'walletAddress'
          : 'username'
      ]
  );
}
