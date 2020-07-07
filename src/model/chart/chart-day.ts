import ChartPoint from "./chart-point";
import ChartRange from "./chart-range";

export default interface ChartDay {
  average: number;
  chartRanges: ChartRange[],
  end: number;
  inRange: number;
  max: number;
  min: number;
  sensorScans: ChartPoint[];
  start: number;
}
