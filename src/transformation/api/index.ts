import { DataPoint, GlucoseData } from "../../model/api/glucose-data";
import ChartDay from "../../model/chart/chart-day";
import ChartPoint from "../../model/chart/chart-point";
import ChartRange from "../../model/chart/chart-range";
import { countIf, max, min, sum } from "../collection";

export function toChartDays(
  minGlucose: number,
  maxGlucose: number
): (gs: GlucoseData[]) => ChartDay[] {
  return (glucoseData: GlucoseData[]) =>
    glucoseData.flatMap((g) => {
      const chartDay = toChartDay(minGlucose, maxGlucose)(g);

      return chartDay ? [chartDay] : [];
    });
}

function toChartDay(
  minGlucose: number,
  maxGlucose: number
): (g: GlucoseData) => ChartDay | null {
  return (glucoseData: GlucoseData): ChartDay | null => {
    const dateRanges = createDataRanges(minGlucose, maxGlucose);

    const glucosePoints: ChartPoint[][] = glucoseData.Glucose.map(toChartPoint);
    const sensorScans: ChartPoint[] = toChartPoint(glucoseData.SensorScans);

    const chartRanges: ChartRange[] = glucosePoints.flatMap((cps) => {
      if (cps.length > 0) {
        const [lowRange, normalRange, highRangeRange] = dateRanges(cps);
        const chartRange: ChartRange = {
          lowRange,
          normalRange,
          upperRange: highRangeRange,
          glucoseReading: cps,
          start: cps[0].timestamp,
          end: cps[cps.length - 1].timestamp,
          min: min((c) => c.glucose, cps),
          max: max((c) => c.glucose, cps),
        };

        return [chartRange];
      } else {
        return [];
      }
    });

    const inRangeChartPoints = sum(
      (c) => countIf((u) => u.glucose === 0, c.upperRange),
      chartRanges
    );

    const totalChartPoints = sum((c) => c.upperRange.length, chartRanges);

    return chartRanges.length > 0
      ? {
          chartRanges,
          start: chartRanges[0].start,
          end: chartRanges[chartRanges.length - 1].end,
          min: min((c) => c.min, chartRanges),
          max: max((c) => c.max, chartRanges),
          average: glucoseData.AverageGlucose,
          sensorScans,
          inRange:
            totalChartPoints === 0 ? 0 : inRangeChartPoints / totalChartPoints,
        }
      : null;
  };
}

function toChartPoint(dataPoints: DataPoint[]): ChartPoint[] {
  return dataPoints.map(
    (dataPoint): ChartPoint => ({
      glucose: dataPoint.Value,
      timestamp: dataPoint.Timestamp,
    })
  );
}

export function createDataRanges(minGlucose: number, maxGlucose: number) {
  return (chartPoints: ChartPoint[]) => {
    const lowRange: ChartPoint[] = chartPoints.map((c) => ({
      glucose: Math.min(minGlucose, c.glucose),
      timestamp: c.timestamp,
    }));

    const normalRange: ChartPoint[] = chartPoints.map((c) => ({
      glucose: Math.min(
        maxGlucose - minGlucose,
        c.glucose - Math.min(minGlucose, c.glucose)
      ),
      timestamp: c.timestamp,
    }));

    const upperRange: ChartPoint[] = chartPoints.map((c) => ({
      glucose: Math.max(0, c.glucose - maxGlucose),
      timestamp: c.timestamp,
    }));

    return [lowRange, normalRange, upperRange];
  };
}
