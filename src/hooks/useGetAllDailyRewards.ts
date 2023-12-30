import { trpc } from '../utils/trpc';

export const useGetAllDailyRewards = () => {
  const query = trpc.rewards.getAllDailyRewards.useQuery();

  return query;
};
