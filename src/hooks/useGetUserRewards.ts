import { trpc } from '../utils/trpc';

export const useGetUserReward = (userId: string) => {
  const query = trpc.rewards.getUserReward.useQuery(userId, {
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  return query;
};
