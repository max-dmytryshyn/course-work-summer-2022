import { useQuery } from '@apollo/client';
import { BAKERY_TEMPERATURE_LAST_RECORD } from 'gql/Queries';
import { BakeryTemperatureLastRecordType } from 'gql/types/bakeryTemperatureLastRecordType';

export const useBakeryTemperatureLastRecord = (bakeryId: number) => {
  const { loading, error, data, refetch } = useQuery<BakeryTemperatureLastRecordType | undefined>(
    BAKERY_TEMPERATURE_LAST_RECORD,
    { variables: { bakeryId: bakeryId } }
  );
  return {
    loading,
    error,
    bakeryTemperatureLastRecord: data?.bakeryTemperatureLastRecord,
    refetch: refetch
  };
};
