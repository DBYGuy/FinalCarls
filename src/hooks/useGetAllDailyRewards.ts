import { trpc } from '../utils/trpc';
import { useMe } from './useMe';

export const useGetAllDailyRewards = () => {
  const user = useMe();
  const userId = user?.id;

  const query = trpc.rewards.getAllDailyRewards.useQuery(undefined, {
    enabled: !!userId,
  });

  return query;
};
