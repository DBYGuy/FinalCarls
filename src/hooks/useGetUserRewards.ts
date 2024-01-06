import { trpc } from '../utils/trpc';
import { useMe } from './useMe';

export const useGetUserReward = () => {
  const user = useMe();
  const userId = user?.id ?? '';
  const query = trpc.rewards.getUserReward.useQuery(userId, {
    enabled: !!user,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return query;
};
