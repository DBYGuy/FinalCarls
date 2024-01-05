import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMe } from './useMe';

export const useGoToProfile = () => {
  const { push } = useRouter();
  const user = useMe();

  const goToProfile = useCallback(
    (fragment = '') => {
      if (user) {
        push(`/u/${user.username ?? user.walletAddress}${fragment}`);
      }
    },
    [push, user],
  );

  return { goToProfile };
};
