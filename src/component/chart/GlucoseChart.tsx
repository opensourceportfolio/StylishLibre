import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryCursorContainer,
  VictoryLabel,
  VictoryStack,
} from "victory-native";
import useGlucoseRange from "../../hook/useGlucoseRange";
import ChartDay from "../../model/chart/chart-day";
import ChartPoint from "../../model/chart/chart-point";
import { formatHour, getHour, getHourRange } from "../../transformation/date";
import theme from "./theme";

interface ActivePointState {
  lastChartPoint: ChartPoint;
  index: number;
}

interface Props {
  chartDay: ChartDay;
  fullScreen: boolean;
  withCursor: boolean;
  onPress?: () => void;
}

function pointEstimator(chartDay: ChartDay) {
  const allGlucoseReadings = chartDay.chartRanges.flatMap(
    (crs) => crs.glucoseReading
  );
  return (approximateTime: number, lastActivePoint: ActivePointState) => {
    const step =
      approximateTime > lastActivePoint.lastChartPoint.timestamp ? 1 : -1;
    const calcDelta = (p: ChartPoint) =>
      Math.abs(p.timestamp - approximateTime);

    function go(delta: number, index: number): ActivePointState {
      const currentPoint = allGlucoseReadings[index];
      const currentDelta = calcDelta(currentPoint);

      if (index + step <= 0 || index + step >= allGlucoseReadings.length - 1) {
        return {
          index,
          lastChartPoint: currentPoint,
        };
      } else if (currentDelta > delta) {
        return {
          index: index - step,
          lastChartPoint: allGlucoseReadings[index - step],
        };
      } else {
        return go(currentDelta, index + step);
      }
    }

    return go(calcDelta(lastActivePoint.lastChartPoint), lastActivePoint.index);
  };
}

export default function GlucoseChart(props: Props) {
  const { chartDay, withCursor, fullScreen, onPress } = props;
  const { chartRanges } = chartDay;
  const [minimumGlucose, maximumGlucose] = useGlucoseRange();
  const height = fullScreen ? 500 : 200;
  const width = Dimensions.get("window").width;
  const estimatePoint = pointEstimator(chartDay);
  const [activePoint, setActivePoint] = useState<ActivePointState>({
    index: 0,
    lastChartPoint: {
      timestamp: 0,
      glucose: 0,
    },
  });
  const events = onPress
    ? [
        {
          childName: "all",
          target: "parent",
          eventHandlers: {
            onPress: () => {
              onPress();
              return [];
            },
          },
        },
      ]
    : [];

  const containerComponent = withCursor ? (
    <VictoryCursorContainer
      cursorDimension="x"
      onCursorChange={(e) => e && setActivePoint(estimatePoint(e, activePoint))}
      cursorLabel={() => `${activePoint.lastChartPoint.glucose}`}
      cursorLabelComponent={<VictoryLabel />}
      cursorLabelOffset={{ x: 5, y: -80 }}
      responsive={true}
    />
  ) : undefined;

  return (
    <VictoryChart
      domain={{
        x: [chartDay.start, chartDay.end],
        y: [40, chartDay.max],
      }}
      height={height}
      theme={theme}
      width={width}
      containerComponent={containerComponent}
      events={events}
    >
      {chartRanges.map((cr, i) => (
        <VictoryStack key={i}>
          <VictoryArea
            data={cr.lowRange}
            x="timestamp"
            y="glucose"
            animate={{
              duration: 1000,
            }}
          />
          <VictoryArea
            data={cr.normalRange}
            x="timestamp"
            y="glucose"
            animate={{
              duration: 1000,
            }}
          />
          <VictoryArea
            data={cr.upperRange}
            x="timestamp"
            y="glucose"
            animate={{
              duration: 1000,
            }}
          />
        </VictoryStack>
      ))}
      <VictoryAxis
        tickValues={getHourRange(chartDay.start, chartDay.end, 2).slice(1)}
        tickFormat={(t) => formatHour(getHour(t))}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[minimumGlucose, maximumGlucose]}
      />
    </VictoryChart>
  );
}
