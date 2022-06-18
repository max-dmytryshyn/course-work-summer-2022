import React from 'react';
import styles from 'components/logsPage/HumidityLog.module.scss';
import { parseDate } from 'utils/parseDate';

interface TemperatureLogProps {
  humidity: number;
  recordDate: string;
}

export const HumidityLog: React.FC<TemperatureLogProps> = ({ humidity, recordDate }) => {
  const { date, time } = parseDate(recordDate);
  const containerClass = () => {
    if (humidity < 40) {
      return styles.lowHumidityContainer;
    } else if (humidity < 60) {
      return styles.container;
    } else {
      return styles.highHumidityContainer;
    }
  };
  return (
    <div className={containerClass()}>
      <p className={styles.dateTimeText}>{date} </p>
      <p className={styles.dateTimeText}>{time} </p>
      <p className={styles.humidityText}>{humidity}%</p>
    </div>
  );
};
