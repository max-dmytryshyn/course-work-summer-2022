import React, { useEffect } from 'react';
import { useCurrentUserBakeries } from 'gql/hooks/useCurrentUserBakeries';
import { LogsContainer } from 'components/logsPage/LogsContainer';
import styles from 'components/logsPage/LogsPage.module.scss';
import { Form, Formik } from 'formik';
import { SelectFormField } from 'components/formFields/SelectFormFIeld';

export const LogsPage: React.FC = () => {
  const { loading, error, bakeries } = useCurrentUserBakeries();
  const [bakeryId, setBakeryId] = React.useState<number | undefined>(undefined);
  useEffect(() => {
    console.log(bakeryId);
  }, [bakeryId]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.name}</p>;
  }

  if (bakeries && bakeries.length !== 0)
    return (
      <div className={styles.container}>
        <Formik
          initialValues={{ currentBakeryId: bakeries[0].id }}
          onSubmit={(values) => {
            setBakeryId(values.currentBakeryId);
          }}>
          <Form className={styles.form} id="bakery_logs_form">
            <SelectFormField
              name={'currentBakeryId'}
              label={''}
              isDisabled={false}
              options={bakeries.map((bakery) => ({
                value: bakery.id as number,
                name: bakery.name as string
              }))}
            />
            <button className={styles.formSubmitButton} type="submit">
              Submit
            </button>
          </Form>
        </Formik>
        {bakeryId && <LogsContainer bakeryId={bakeryId as number} />}
      </div>
    );
  return <p className={styles.noBakeryText}>No bakeries available</p>;
};
