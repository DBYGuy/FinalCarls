import { trpc } from '~/utils/trpc';

export const useUpdateAvatar = () => {
  const utils = trpc.useContext();
  const updateAvatarMutation = trpc.users.updateAvatar.useMutation();

  const updateAvatar = async (avatarUrl: string) => {
    try {
      await updateAvatarMutation.mutateAsync({ avatarUrl });
      utils.users.me.invalidate();
    } catch (error) {
      console.error('Failed to update avatar:', error);
      throw error; // Re-throw the error for handling by the calling component
    }
  };

  return {
    updateAvatar,
    isLoading: updateAvatarMutation.isLoading,
    error: updateAvatarMutation.error,
  };
};
