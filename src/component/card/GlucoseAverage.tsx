import { Card, Text } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import useGlucoseRange from "../../hook/useGlucoseRange";
import ChartDay from "../../model/chart/chart-day";
import LineChart from "../chart/LineChart";

interface Props {
  chartDay: ChartDay | null;
  chartDays: ChartDay[] | null;
}

export default function GlucoseAverage(props: Props) {
  const { chartDay, chartDays } = props;
  const [minGlucose, maxGlucose] = useGlucoseRange();
  const data = chartDays?.map((c) => ({ x: c.start, y: c.average }));

  const status =
    chartDay === null
      ? "basic"
      : chartDay.average > maxGlucose || chartDay.average < minGlucose
      ? "danger"
      : "success";

  return (
    <Card style={styles.card} status={status}>
      <View style={styles.cardLayout}>
        <View>
          <Text category="c2">Average glucose</Text>
          <Text category="h1">{chartDay ? chartDay.average : "-"}</Text>
        </View>
        <View>{data && <LineChart data={data}></LineChart>}</View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 10,
  },
});
