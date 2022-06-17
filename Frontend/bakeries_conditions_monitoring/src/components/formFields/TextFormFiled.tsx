import React from 'react';
import { Field } from 'formik';
import { ErrorMessage } from 'formik';
import { FormFieldErrorMessage } from './FormFieldErrorMessage';
import styles from './FormField.module.scss';

export const TextFormField: React.FC<{
  name: string;
  label: string;
  type: string;
  placeHolder: string;
  isDisabled?: boolean;
}> = ({ name, label, type, placeHolder, isDisabled = false }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className={styles.fieldInput}
        placeholder={placeHolder}
        disabled={isDisabled}
      />
      <ErrorMessage name={name}>{(msg) => <FormFieldErrorMessage message={msg} />}</ErrorMessage>
    </div>
  );
};
