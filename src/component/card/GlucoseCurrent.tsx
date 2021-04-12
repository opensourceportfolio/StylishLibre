import { Card, Text } from '@ui-kitten/components';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import useGlucoseRange from '../../hook/useGlucoseRange';
import ChartDay from '../../model/chart/chart-day';
import { round } from '../../transformation/number';

interface Props {
  chartDay: ChartDay | null;
}

export default function GlucoseCurrent(props: Props) {
  const { chartDay } = props;
  const [minGlucose, maxGlucose] = useGlucoseRange();
  const status =
    chartDay === null
      ? 'basic'
      : chartDay.last > maxGlucose || chartDay.last < minGlucose
      ? 'danger'
      : 'success';

  return (
    <Card style={styles.card} status={status}>
      <View style={styles.cardLayout}>
        <View>
          <Text category="c2">Current glucose</Text>
          <Text category="h1">{chartDay ? round(chartDay.last) : '-'}</Text>
        </View>
        <View>
          <Text category="c2">Highest glucose</Text>
          <Text category="h5">{chartDay ? round(chartDay.max) : '-'}</Text>
        </View>
        <View>
          <Text category="c2">Lowest glucose</Text>
          <Text category="h5">{chartDay ? round(chartDay.min) : '-'}</Text>
        </View>
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
