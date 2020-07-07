export interface DataPoint {
  Value: number;
  Timestamp: number;
}

export interface GlucoseData {
  AverageGlucose: number,
  Date: number;
  SensorScans: DataPoint[];
  Glucose: DataPoint[][];
}
