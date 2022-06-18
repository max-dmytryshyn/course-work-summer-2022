import { useQuery } from '@apollo/client';
import { BAKERY_TEMPERATURE_RECORDS } from 'gql/Queries';
import { BakeryTemperatureRecordsType } from 'gql/types/bakeryTemperatureRecordsType';

export const useBakeryTemperatureRecords = (bakeryId: number, last?: number) => {
  const { loading, error, data, refetch } = useQuery<BakeryTemperatureRecordsType | undefined>(
    BAKERY_TEMPERATURE_RECORDS,
    { variables: { bakeryId: bakeryId, last: last } }
  );
  return {
    loading,
    error,
    bakeryTemperatureRecords: data?.bakeryTemperatureRecords,
    refetch: refetch
  };
};
