import ChartRange from './chart-range';

export default interface ChartStream {
  chartRanges: ChartRange[];
  end: number;
  max: number;
  min: number;
  start: number;
}
