import React from 'react';
import { BakeryStatus } from 'components/statusPage/BakeryStatus';
import { useCurrentUserBakeries } from 'gql/hooks/useCurrentUserBakeries';
import styles from 'components/statusPage/StatusPage.module.scss';

export const StatusPage: React.FC = () => {
  const { loading, error, bakeries } = useCurrentUserBakeries();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.name}</p>;
  }

  const bakeryStatusItems = bakeries?.map((bakery) => {
    return (
      <BakeryStatus key={bakery.id} id={bakery.id} name={bakery.name} logoUri={bakery.logoUri} />
    );
  });
  return <div className={styles.container}>{bakeryStatusItems}</div>;
};
