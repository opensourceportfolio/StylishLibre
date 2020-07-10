import { DataPoint, GlucoseData } from "../../model/api/glucose-data";
import ChartDay from "../../model/chart/chart-day";
import ChartPoint from "../../model/chart/chart-point";
import ChartRange from "../../model/chart/chart-range";
import ChartStream from "../../model/chart/chart-stream";
import { countIf, last, max, min, sum, standardDeviation } from "../collection";

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

export function toChartStream(
  minGlucose: number,
  maxGlucose: number
): (gs: GlucoseData[]) => ChartStream {
  return (glucoseData: GlucoseData[]) => {
    const chartDays = toChartDays(minGlucose, maxGlucose)(glucoseData);
    const emptyChartStream: ChartStream = {
      chartRanges: [],
      start: Number.POSITIVE_INFINITY,
      end: 0,
      min: Number.POSITIVE_INFINITY,
      max: 0,
    };

    return chartDays.reduce((chartStream, day) => {
      return {
        chartRanges: [...chartStream.chartRanges, ...day.chartRanges],
        start: Math.min(chartStream.start, day.start),
        end: Math.max(chartStream.end, day.end),
        min: Math.min(chartStream.min, day.min),
        max: Math.max(chartStream.max, day.max),
      };
    }, emptyChartStream);
  };
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
        average: glucoseData.AverageGlucose,
        chartRanges,
        end: chartRanges[chartRanges.length - 1].end,
        min: min((c) => c.min, chartRanges),
        max: max((c) => c.max, chartRanges),
        last: last(
          (c) => last((g) => g.glucose, c.glucoseReading, 0),
          chartRanges,
          0
        ),
        standardDeviation: standardDeviation(glucoseData.AverageGlucose, glucosePoints.flatMap(gps => gps.map(gp => gp.glucose))),
        start: chartRanges[0].start,
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
