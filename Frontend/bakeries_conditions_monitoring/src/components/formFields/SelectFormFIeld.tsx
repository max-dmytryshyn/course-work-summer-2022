import React from 'react';
import { Field } from 'formik';
import styles from './FormField.module.scss';

export const SelectFormField: React.FC<{
  name: string;
  label: string;
  options: {
    value: string | number;
    name: string;
  }[];
  isDisabled: boolean;
}> = ({ options, name, label, isDisabled }) => {
  const optionsList = options.map((option) => {
    return (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    );
  });
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
      </label>
      <Field as="select" name={name} className={styles.fieldInput} disabled={isDisabled}>
        {optionsList}
      </Field>
      <label />
    </div>
  );
};
