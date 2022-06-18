interface BakeryTemperatureRecord {
  id: number;
  temperature: number;
  date: string;
}

export interface BakeryTemperatureRecordsType {
  bakeryTemperatureRecords: BakeryTemperatureRecord[];
}
