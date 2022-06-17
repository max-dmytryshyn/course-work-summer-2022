import React from 'react';
import { Field } from 'formik';
import { ErrorMessage } from 'formik';
import { FormFieldErrorMessage } from './FormFieldErrorMessage';
import styles from './FormField.module.scss';

export const TextAreaFormField: React.FC<{
  name: string;
  label: string;
  isDisabled: boolean;
}> = ({ name, label, isDisabled }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <Field as="textarea" name={name} className={styles.fieldInput} disabled={isDisabled} />
      <ErrorMessage name={name}>{(msg) => <FormFieldErrorMessage message={msg} />}</ErrorMessage>
    </div>
  );
};
