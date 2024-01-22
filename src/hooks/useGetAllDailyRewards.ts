import { trpc } from '../utils/trpc';
import { useMe } from './useMe';

export const useGetAllDailyRewards = () => {
  const { user, isLoading } = useMe();
  const userId = user?.id;

  const query = trpc.rewards.getAllDailyRewards.useQuery(undefined, {
    enabled: !!userId,
  });

  return query;
};
