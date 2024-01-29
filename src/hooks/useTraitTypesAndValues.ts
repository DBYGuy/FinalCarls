import { trpc } from '../utils/trpc';
import { useMe } from '~/hooks/useMe';

export const useTraitTypesAndValues = () => {
  const user = useMe();

  const { data, isLoading, error } = trpc.token.getTraitTypesAndValues.useQuery(
    undefined,
    {
      enabled: !!user,
      refetchOnMount: false,
    },
  );

  return {
    traitTypesAndValues: data ?? {},
    isLoading,
    error,
  };
};
