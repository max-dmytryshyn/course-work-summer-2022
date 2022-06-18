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

export const BAKERY_TEMPERATURE_RECORDS = gql`
  query BakeryTemperatureRecords($bakeryId: Int!, $last: Int) {
    bakeryTemperatureRecords(bakeryId: $bakeryId, last: $last) {
      id
      temperature
      date
    }
  }
`;

export const BAKERY_HUMIDITY_RECORDS = gql`
  query BakeryHumidityRecords($bakeryId: Int!, $last: Int) {
    bakeryHumidityRecords(bakeryId: $bakeryId, last: $last) {
      id
      humidity
      date
    }
  }
`;
