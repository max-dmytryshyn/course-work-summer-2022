import { useQuery } from '@apollo/client';
import { BAKERY_HUMIDITY_RECORDS } from 'gql/Queries';
import { BakeryHumidityRecordsType } from 'gql/types/bakeryHumidityRecordsType';

export const useBakeryHumidityRecords = (bakeryId: number, last?: number) => {
  const { loading, error, data, refetch } = useQuery<BakeryHumidityRecordsType | undefined>(
    BAKERY_HUMIDITY_RECORDS,
    { variables: { bakeryId: bakeryId, last: last } }
  );
  return {
    loading,
    error,
    bakeryHumidityRecords: data?.bakeryHumidityRecords,
    refetch: refetch
  };
};
