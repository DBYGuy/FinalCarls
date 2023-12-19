import { trpc } from '../utils/trpc';
import { useUsernameOrAddress } from './useUsernameOrAddress';

export const useUser = () => {
  const { usernameOrAddress } = useUsernameOrAddress();
  const { data: user } = trpc.users.byUsernameOrAddress.useQuery(
    usernameOrAddress,
    {
      enabled: !!usernameOrAddress,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  return user;
};
