import { trpc } from '../utils/trpc';

export const useGetUserReward = (userId: string) => {
  const query = trpc.rewards.getUserReward.useQuery(userId, {
    enabled: !!userId,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  return query;
};
