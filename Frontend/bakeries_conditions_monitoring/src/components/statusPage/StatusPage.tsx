import React from 'react';
import { BakeryStatus } from 'components/statusPage/BakeryStatus';
import { useCurrentUserBakeries } from 'components/statusPage/gql/hooks/useCurrentUserBakeries';

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
  return <>{bakeryStatusItems}</>;
};
