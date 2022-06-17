import React from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { TextFormField } from 'components/formFields/TextFormFiled';
import { login } from 'services/loginApi';
import styles from 'components/login/LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  const onSubmit = () => {};
  const validateForm = async (values: FormikValues) => {
    let errors: {
      username: string | undefined;
      password: string | undefined;
    } = { username: undefined, password: undefined };
    if (values.username === '') {
      errors.username = 'Username not provided';
    }
    if (values.password === '') {
      errors.password = 'Password not provided';
    }
    if (values.username !== '' && values.password !== '') {
      await login(values.username, values.password)
        .then((response) => {
          localStorage.AuthToken = response.data.token;
          window.location.href = '/';
        })
        .catch((error) => (errors.password = 'Wrong email or password'));
    }

    return errors;
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Log in</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={validateForm}
        onSubmit={onSubmit}>
        <Form className={styles.form} id="login_form">
          <TextFormField name="username" label="Username" type="text" placeHolder="username" />
          <TextFormField name="password" label="Password" type="password" placeHolder="password" />
        </Form>
      </Formik>
      <button className={styles.logInButton} form="login_form" type="submit">
        Log in
      </button>
    </main>
  );
};
