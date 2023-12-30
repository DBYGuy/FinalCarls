import { trpc } from '../utils/trpc';

export const useClaimReward = () => {
  const utils = trpc.useContext();
  const mutation = trpc.rewards.claimReward.useMutation();

  const claimReward = async (userId: string, tp: number) => {
    try {
      const result = await mutation.mutateAsync({ userId, tp });
      utils.rewards.getUserReward.invalidate();
      utils.points.getUserPoints.invalidate();
      return result;
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  };

  return {
    claimReward,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
