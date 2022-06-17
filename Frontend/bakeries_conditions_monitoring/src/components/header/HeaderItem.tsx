import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/header/HeaderItem.module.scss';

export const HeaderItem: React.FC<{
  path: string;
  label: string;
}> = ({ path, label }) => {
  return (
    <li className={styles.headerItem}>
      <Link to={path}>{label}</Link>
    </li>
  );
};
