import { trpc } from '../utils/trpc';
import { useMe } from './useMe';

export const useGetUserReward = () => {
  const { user, isLoading } = useMe();
  const userId = user?.id ?? '';
  const query = trpc.rewards.getUserReward.useQuery(userId, {
    enabled: !!user?.id,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  return query;
};
