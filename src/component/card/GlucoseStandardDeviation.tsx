import { Card, Text } from '@ui-kitten/components';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import ChartDay from '../../model/chart/chart-day';
import { round } from '../../transformation/number';
import LineChart from '../chart/LineChart';

interface Props {
  chartDay: ChartDay | null;
  chartDays: ChartDay[] | null;
}

export default function GlucoseStandardDeviation(props: Props) {
  const { chartDay, chartDays } = props;
  const data = chartDays?.map((c) => ({ x: c.start, y: c.standardDeviation }));

  return (
    <Card style={styles.card}>
      <View style={styles.cardLayout}>
        <View>
          <Text category="c2">Standard Deviation</Text>
          <Text category="h1">
            {chartDay ? round(chartDay.standardDeviation) : '-'}
          </Text>
        </View>
        <View>{data && <LineChart data={data}></LineChart>}</View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 10,
  },
});
