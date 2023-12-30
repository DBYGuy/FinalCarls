import { trpc } from '../utils/trpc';

export const useResetUserDay = () => {
  const mutation = trpc.rewards.resetUserDay.useMutation();

  const resetUserDay = async (userId: string) => {
    try {
      const result = await mutation.mutateAsync(userId);
      return result;
    } catch (error) {
      console.error('Error resetting user day:', error);
      throw error;
    }
  };

  return {
    resetUserDay,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
