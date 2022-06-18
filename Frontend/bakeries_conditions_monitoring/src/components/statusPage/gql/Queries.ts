import { gql } from '@apollo/client';

export const CURRENT_USER_BAKERIES = gql`
  query {
    currentUserBakeries {
      id
      name
      logoUri
      address
    }
  }
`;

export const BAKERY_TEMPERATURE_LAST_RECORD = gql`
  query BakeryTemperatureLastRecord($bakeryId: Int!) {
    bakeryTemperatureLastRecord(bakeryId: $bakeryId) {
      temperature
    }
  }
`;

export const BAKERY_HUMIDITY_LAST_RECORD = gql`
  query BakeryHumidityLastRecord($bakeryId: Int!) {
    bakeryHumidityLastRecord(bakeryId: $bakeryId) {
      humidity
    }
  }
`;
