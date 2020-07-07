import ChartPoint from "./chart-point";

export default interface ChartRange {
  lowRange: ChartPoint[];
  normalRange: ChartPoint[];
  upperRange: ChartPoint[];
  glucoseReading: ChartPoint[];
  start: number;
  end: number;
  min: number;
  max: number;
}
