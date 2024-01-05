import { trpc } from '../utils/trpc';

export const useCheckLevelEligibility = (userId: string) => {
  // Use the query and pass the userId as the argument
  const { data, isLoading, error } =
    trpc.level.checkLevelEligibility.useQuery(userId);

  // You can return the data directly or destructure it for more explicit usage
  return {
    isEligible: data?.isEligible,
    toNextLevel: data?.toNextLevel,
    nextLevelPoints: data?.nextLevelPoints,
    isLoading,
    error,
  };
};
