import { trpc } from '../utils/trpc'; // Adjust the import path as needed

export const useTraitTypesAndValues = () => {
  const { data, isLoading, error } =
    trpc.token.getTraitTypesAndValues.useQuery();

  return {
    traitTypesAndValues: data ?? {},
    isLoading,
    error,
  };
};
