import React from 'react';
import logOutIcon from 'components/header/log_out_icon.png';
import styles from 'components/header/LogOutItem.module.scss';

export const LogOutItem = () => {
  const onLogOut = () => {
    localStorage.removeItem('AuthToken');
    window.location.href = '/';
  };
  return (
    <button className={styles.logOutButton} onClick={onLogOut}>
      <img className={styles.logOutImage} src={logOutIcon} alt="exit" />
    </button>
  );
};
