import React from 'react';
import styles from 'components/logsPage/TemperatureLog.module.scss';
import { parseDate } from 'utils/parseDate';

interface TemperatureLogProps {
  temperature: number;
  recordDate: string;
}

export const TemperatureLog: React.FC<TemperatureLogProps> = ({ temperature, recordDate }) => {
  const { date, time } = parseDate(recordDate);
  const containerClass = () => {
    if (temperature < 20) {
      return styles.coldTemperatureContainer;
    } else if (temperature < 30) {
      return styles.container;
    } else {
      return styles.hotTemperatureContainer;
    }
  };
  return (
    <div className={containerClass()}>
      <p className={styles.dateTimeText}>{date} </p>
      <p className={styles.dateTimeText}>{time} </p>
      <p className={styles.temperatureText}>{temperature.toFixed(1)}°C</p>
    </div>
  );
};
