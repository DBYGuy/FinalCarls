import { trpc } from '../utils/trpc';
import { useIsAuthenticated } from './useIsAuthenticated';

export const useMe = () => {
  const isAuthenticated = useIsAuthenticated();
  const { data: user } = trpc.users.me.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return user;
};
