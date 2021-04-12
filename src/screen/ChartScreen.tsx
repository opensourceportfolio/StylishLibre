import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlucoseChart from '../component/chart/GlucoseChart';
import useAppState from '../hook/useAppState';
import useGlucoseRange from '../hook/useGlucoseRange';
import { toChartDays } from '../transformation/api';

export default function ChartScreen() {
  const [state] = useAppState();
  const [minGlucose, maxGlucose] = useGlucoseRange();
  const chartDays = React.useMemo(
    () => toChartDays(minGlucose, maxGlucose)(state.glucoseData),
    [state.glucoseData, minGlucose, maxGlucose],
  );

  const today = chartDays.length > 0 ? chartDays[chartDays.length - 1] : null;

  return today ? (
    <SafeAreaView style={styles.centeredView}>
      <GlucoseChart chartDay={today} fullScreen withCursor></GlucoseChart>
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
