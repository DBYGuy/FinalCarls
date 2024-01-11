import { trpc } from '../utils/trpc';
import { useMe } from './useMe'; // Import your useMe hook

export const useGetLeaderboard = (page: number) => {
  const user = useMe(); // Get the current user using your useMe hook
  const userId = user?.id;

  const query = trpc.leaderboard.getLeaderboard.useQuery(
    { page },
    {
      enabled: page > 0 && !!userId, // Ensure both conditions are met
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
