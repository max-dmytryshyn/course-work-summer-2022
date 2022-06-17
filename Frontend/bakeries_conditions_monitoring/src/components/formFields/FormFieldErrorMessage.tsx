import React from 'react';
import styles from './FormFiledErrorMessage.module.scss';

export const FormFieldErrorMessage: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <>
      <p className={styles.messageText}>{message}</p>
    </>
  );
};
