import React from 'react';
import { Logo } from 'components/logo/Logo';
import styles from 'components/footer/Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <Logo width={60} height={60} />
      <p className={styles.footerNameText}>Max Dmytryshyn 2022</p>
      <address className={styles.footerContactsText}>maksumus22@gmail.com</address>
    </footer>
  );
};
