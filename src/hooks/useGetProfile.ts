// useGetProfile.ts
import { trpc } from '../utils/trpc'; // Adjust the import path based on your project structure

/**
 * Hook to fetch a user profile by user ID.
 * @param {string} userId - The user ID to fetch profile for.
 */
export function useGetProfile(userId: string) {
  // Using tRPC's useQuery hook to fetch user profile
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = trpc.profile.getUserProfile.useQuery(userId, {
    enabled: !!userId, // Only run the query if the user ID is not empty
  });

  return {
    profile,
    isLoading,
    isError,
    error,
  };
}
