import React from 'react';
import { useBakeryTemperatureRecords } from 'gql/hooks/useBakeryTemperatureRecords';
import { TemperatureLog } from 'components/logsPage/TemperatureLog';
import styles from 'components/logsPage/LogsContainer.module.scss';
import { useBakeryHumidityRecords } from 'gql/hooks/useBakeryHumidityRecords';
import { HumidityLog } from 'components/logsPage/HumidityLog';

interface LogsContainerProps {
  bakeryId: number;
}

export const LogsContainer: React.FC<LogsContainerProps> = ({ bakeryId }) => {
  const temperatureQueryResult = useBakeryTemperatureRecords(bakeryId, 10);
  const humidityQueryResult = useBakeryHumidityRecords(bakeryId, 10);
  const refetchInteval: number = 10000;
  setInterval(temperatureQueryResult.refetch, refetchInteval);
  setInterval(humidityQueryResult.refetch, refetchInteval);

  let temperatureLogs;
  if (temperatureQueryResult.loading) {
    temperatureLogs = <p>Loading...</p>;
  }
  if (temperatureQueryResult.error) {
    temperatureLogs = <p>Error</p>;
  }
  if (temperatureQueryResult.bakeryTemperatureRecords) {
    temperatureLogs = temperatureQueryResult.bakeryTemperatureRecords.map((temperatureRecord) => {
      return (
        <TemperatureLog
          key={temperatureRecord.id}
          temperature={temperatureRecord.temperature}
          recordDate={temperatureRecord.date}
        />
      );
    });
  }

  let humidityLogs;
  if (humidityQueryResult.loading) {
    humidityLogs = <p>Loading...</p>;
  }
  if (humidityQueryResult.error) {
    humidityLogs = <p>Error</p>;
  }
  if (humidityQueryResult.bakeryHumidityRecords) {
    humidityLogs = humidityQueryResult.bakeryHumidityRecords.map((humidityRecord) => {
      return (
        <HumidityLog
          key={humidityRecord.id}
          humidity={humidityRecord.humidity}
          recordDate={humidityRecord.date}
        />
      );
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h4 className={styles.leftHeaderColumn}>Temperature</h4>
        <h4 className={styles.headerColumn}>Humidity</h4>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.leftDataColumn}>{temperatureLogs}</div>
        <div className={styles.dataColumn}>{humidityLogs}</div>
      </div>
    </div>
  );
};
