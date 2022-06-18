interface HumidityTemperatureRecord {
  id: number;
  humidity: number;
  date: string;
}

export interface BakeryHumidityRecordsType {
  bakeryHumidityRecords: HumidityTemperatureRecord[];
}
