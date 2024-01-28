import { trpc } from '../utils/trpc';

export const useGetLeaderboard = (page: number) => {
  const query = trpc.leaderboard.getLeaderboard.useQuery(
    { page },
    {
      enabled: page > 0, // Ensure both conditions are met
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  );

  return {
    leaderboard: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
