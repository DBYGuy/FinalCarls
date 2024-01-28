import { trpc } from '~/utils/trpc';

export const useGetUserInfo = (userId: string) => {
  const { data, isLoading, isError, error } = trpc.users.getUserInfo.useQuery(
    userId,
    {
      enabled: !!userId,
    },
  );

  return {
    userInfo: data,
    isLoading,
    isError,
    error,
  };
};
