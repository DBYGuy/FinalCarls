import { trpc } from '../utils/trpc'; // Adjust the import path based on your project structure
import { useMe } from './useMe';

export function useGetPoints() {
  const user = useMe();

  // Using tRPC's useQuery hook to fetch user points
  const {
    data: points,
    isLoading,
    isError,
    error,
  } = trpc.points.getUserPoints.useQuery(
    user?.id ?? '', // Pass user ID directly as a string, or an empty string if undefined
    {
      enabled: !!user?.id, // Only run the query if the user ID is available
    },
  );

  return {
    points,
    isLoading,
    isError,
    error,
  };
}
