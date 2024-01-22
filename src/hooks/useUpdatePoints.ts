import { trpc } from '../utils/trpc'; // Adjust the import path based on your project structure
import { useMe } from './useMe';

export function useUpdatePoints() {
  const { user, isLoading } = useMe();
  const updateUserPointsMutation = trpc.points.updateUserPoints.useMutation();

  const updatePoints = async (additionalPoints: number) => {
    if (!user?.id) {
      throw new Error('User ID is not available');
    }

    // Call the mutation function with the parameters
    const result = await updateUserPointsMutation.mutateAsync({
      userId: user.id,
      additionalPoints: additionalPoints,
    });

    return result;
  };

  return updatePoints;
}
