import { trpc } from '../utils/trpc';

export const useLevelUp = () => {
  const utils = trpc.useContext();
  const mutation = trpc.level.levelUp.useMutation({
    onSuccess: () => {
      utils.level.getUserLevel.invalidate();
      utils.level.checkLevelEligibility.invalidate();
      utils.rewards.getUserReward.invalidate();
      utils.points.getUserPoints.invalidate();
    },
  });

  const levelUp = async (userId: string) => {
    try {
      const result = await mutation.mutateAsync(userId);
      return result;
    } catch (error) {
      console.error('Error leveling up:', error);
      throw error;
    }
  };

  return {
    levelUp,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
