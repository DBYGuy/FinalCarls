import { trpc } from '../utils/trpc';
import { useUsernameOrAddress } from './useUsernameOrAddress';

export const useUser = () => {
  const { usernameOrAddress } = useUsernameOrAddress();
  const queryKey = usernameOrAddress ?? '';
  const { data: user } = trpc.users.byUsernameOrAddress.useQuery(queryKey, {
    enabled: !!usernameOrAddress,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return user;
};
