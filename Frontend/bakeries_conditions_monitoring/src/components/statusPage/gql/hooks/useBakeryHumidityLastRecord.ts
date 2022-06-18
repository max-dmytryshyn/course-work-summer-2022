import { useQuery } from '@apollo/client';
import { BAKERY_HUMIDITY_LAST_RECORD } from 'components/statusPage/gql/Queries';
import { BakeryHumidityLastRecordType } from 'components/statusPage/gql/types/bakeryHumidityLastRecordType';

export const useBakeryHumidityLastRecord = (bakeryId: number) => {
  const { loading, error, data, refetch } = useQuery<BakeryHumidityLastRecordType | undefined>(
    BAKERY_HUMIDITY_LAST_RECORD,
    { variables: { bakeryId: bakeryId } }
  );
  return {
    loading,
    error,
    bakeryHumidityLastRecord: data?.bakeryHumidityLastRecord,
    refetch: refetch
  };
};
