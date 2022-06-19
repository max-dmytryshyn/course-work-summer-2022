import React from 'react';
import styles from 'components/statusPage/BakeryStatus.module.scss';
import { useBakeryTemperatureLastRecord } from 'gql/hooks/useBakeryTemperatureLastRecord';
import { useBakeryHumidityLastRecord } from 'gql/hooks/useBakeryHumidityLastRecord';

interface BakeryStatusProps {
  id: number;
  name: string;
  logoUri: string;
}

export const BakeryStatus: React.FC<BakeryStatusProps> = ({ id, name, logoUri }) => {
  const temperatureQueryResult = useBakeryTemperatureLastRecord(id);
  const humidityQueryResult = useBakeryHumidityLastRecord(id);
  const refetchInteval: number = 10000;
  setInterval(temperatureQueryResult.refetch, refetchInteval);
  setInterval(humidityQueryResult.refetch, refetchInteval);
  let temperature: number | string = '';
  if (temperatureQueryResult.loading) {
    temperature = 'Loading...';
  }
  if (temperatureQueryResult.error) {
    temperature = 'Error';
  }
  if (temperatureQueryResult.bakeryTemperatureLastRecord) {
    temperature = temperatureQueryResult.bakeryTemperatureLastRecord.temperature;
  }

  let humidity: number | string = '';
  if (humidityQueryResult.loading) {
    humidity = 'Loading...';
  }
  if (humidityQueryResult.error) {
    humidity = 'Error';
  }
  if (humidityQueryResult.bakeryHumidityLastRecord) {
    humidity = humidityQueryResult.bakeryHumidityLastRecord.humidity;
  }

  const temperatureClass = () => {
    if (typeof temperature === 'number') {
      if (temperature < 20) {
        return styles.coldTemperatureText;
      } else if (temperature < 30) {
        return styles.normalTemperatureText;
      } else {
        return styles.hotTemperatureText;
      }
    }
    return styles.infoText;
  };

  const humidityClass = () => {
    if (typeof humidity === 'number') {
      if (humidity < 40) {
        return styles.lowHumidityText;
      } else if (humidity < 60) {
        return styles.normalHumidityText;
      } else {
        return styles.highHumidityText;
      }
    }
    return styles.infoText;
  };

  if (typeof temperature === 'number') {
    temperature = temperature.toFixed(1);
  }

  return (
    <div className={styles.container}>
      <img src={logoUri} alt={'logo'} className={styles.logo} />
      <div className={styles.infoContainer}>
        <h4 className={styles.bakeryName}>{name}</h4>
        <p className={temperatureClass()}> Temperature: {temperature}°C</p>
        <p className={humidityClass()}>Humidity: {humidity}%</p>
      </div>
    </div>
  );
};
