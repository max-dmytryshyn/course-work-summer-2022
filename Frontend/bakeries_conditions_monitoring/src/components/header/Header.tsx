import React from 'react';
import { HeaderItem } from 'components/header/HeaderItem';
import { Logo } from 'components/logo/Logo';
import styles from 'components/header/Header.module.scss';
import { LogOutItem } from 'components/header/LogOutItem';

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <Logo width={60} height={60} />
      <HeaderItem path={'/'} label={'Bakeries Status'} />
      <HeaderItem path={'/logs'} label={'Bakeries Logs'} />
      <LogOutItem />
    </header>
  );
};
