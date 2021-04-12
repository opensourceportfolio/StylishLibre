import { Card, Text } from '@ui-kitten/components';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import ChartDay from '../../model/chart/chart-day';
import { toPercent } from '../../transformation/number';
import LineChart from '../chart/LineChart';

interface Props {
  chartDay: ChartDay | null;
  chartDays: ChartDay[] | null;
}

export default function GlucoseRange(props: Props) {
  const { chartDay, chartDays } = props;
  const data = chartDays?.map((c) => ({ x: c.start, y: c.inRange }));

  const status =
    chartDay === null
      ? 'basic'
      : chartDay.inRange < 0.3
      ? 'danger'
      : chartDay.inRange < 0.7
      ? 'warning'
      : 'success';

  return (
    <Card style={styles.card} status={status}>
      <View style={styles.cardLayout}>
        <View>
          <Text category="c2">Glucose in range</Text>
          <Text category="h1">
            {chartDay ? toPercent(chartDay.inRange) : '-'}
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
    width: Dimensions.get('window').width,
  },
});
