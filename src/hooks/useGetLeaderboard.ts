import { trpc } from '../utils/trpc';

export const useGetLeaderboard = (page: number, isEnabled = true) => {
  const query = trpc.leaderboard.getLeaderboard.useQuery(
    { page },
    {
      enabled: isEnabled,
    },
  );

  return {
    leaderboard: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
