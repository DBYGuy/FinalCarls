import { trpc } from '../utils/trpc';
import { useMe } from '~/hooks/useMe'; // Adjust the import path as needed

export const useTraitTypesAndValues = () => {
  const user = useMe();
  const isEnabled = !!user; // The query is enabled only if the user exists

  const { data, isLoading, error } = trpc.token.getTraitTypesAndValues.useQuery(
    undefined,
    {
      enabled: isEnabled,
    },
  );

  return {
    traitTypesAndValues: data ?? {},
    isLoading,
    error,
  };
};
