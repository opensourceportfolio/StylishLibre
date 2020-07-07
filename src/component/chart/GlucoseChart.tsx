import React from "react";
import { Dimensions } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryStack,
  VictoryZoomContainer,
} from "victory-native";
import useGlucoseRange from "../../hook/useGlucoseRange";
import ChartDay from "../../model/chart/chart-day";
import { formatHour, getHour, getHourRange } from "../../transformation/date";
import theme from "./theme";

interface Props {
  chartDay: ChartDay;
}

export default function GlucoseChart(props: Props) {
  const { chartDay } = props;
  const chartRanges = chartDay.chartRanges;
  const [minimumGlucose, maximumGlucose] = useGlucoseRange();
  const width = Dimensions.get("window").width;

  console.log([chartDay.start, chartDay.end]);

  return (
    <VictoryChart
      containerComponent={
        <VictoryZoomContainer zoomDomain={{ x: [chartDay.start, chartDay.start + 60 * 60 * 12], y: [40, chartDay.max] }} />
      }
      domain={{
        x: [chartDay.start, chartDay.end],
        y: [40, chartDay.max],
      }}
      height={300}
      theme={theme}
      width={width}
    >
      {chartRanges.map((cr, i) => (
        <VictoryStack key={i}>
          <VictoryArea data={cr.lowRange} x="timestamp" y="glucose" />
          <VictoryArea data={cr.normalRange} x="timestamp" y="glucose" />
          <VictoryArea data={cr.upperRange} x="timestamp" y="glucose" />
        </VictoryStack>
      ))}
      <VictoryAxis
        tickValues={getHourRange(chartDay.start, chartDay.end, 2).slice(1)}
        tickFormat={(t) => formatHour(getHour(t))}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[minimumGlucose, maximumGlucose]}
        offsetX={width}
      />
    </VictoryChart>
  );
}
