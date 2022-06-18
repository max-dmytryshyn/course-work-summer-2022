import { useQuery } from '@apollo/client';
import { CURRENT_USER_BAKERIES } from 'gql/Queries';
import { currenUserBakeriesType } from 'gql/types/currenUserBakeriesType';

export const useCurrentUserBakeries = () => {
  const { loading, error, data } = useQuery<currenUserBakeriesType | undefined>(
    CURRENT_USER_BAKERIES
  );

  const bakeries = data?.currentUserBakeries;

  return {
    loading,
    error,
    bakeries: bakeries
  };
};
