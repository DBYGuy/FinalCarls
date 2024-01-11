import { trpc } from '../utils/trpc';

export const useCheckLevelEligibility = (userId: string) => {
  // Use the query and pass the userId as the argument
  const { data, isLoading, error } = trpc.level.checkLevelEligibility.useQuery(
    userId,
    {
      enabled: !!userId,
    },
  );

  return {
    isEligible: data?.isEligible,
    toNextLevel: data?.toNextLevel,
    nextLevelPoints: data?.nextLevelPoints,
    isLoading,
    error,
  };
};
