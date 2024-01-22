import { trpc } from '../utils/trpc';
import { useMe } from './useMe'; // Import your useMe hook

export const useGetAvatar = () => {
  const { user, isLoading } = useMe();
  const userId = user?.id ?? '';
  const {
    data,
    isLoading: loadingAvatar,
    error,
  } = trpc.users.getAvatar.useQuery(
    { userId },
    {
      enabled: !!user?.id, // Enable the query only if userId is provided
    },
  );

  return {
    avatarUrl: data,
    isLoading: loadingAvatar,
    error,
  };
};
