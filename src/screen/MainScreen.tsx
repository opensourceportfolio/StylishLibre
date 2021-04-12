import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';

import { getGlucoseAsyncAction } from '../action';
import { Status } from '../api/fetch';
import GlucoseAverage from '../component/card/GlucoseAverage';
import GlucoseCurrent from '../component/card/GlucoseCurrent';
import GlucoseRange from '../component/card/GlucoseRange';
import GlucoseStandardDeviation from '../component/card/GlucoseStandardDeviation';
import GlucoseChart from '../component/chart/GlucoseChart';
import DayLabel from '../component/DayLabel';
import Refreshable from '../component/Refreshable';
import useAppState from '../hook/useAppState';
import useGlucoseRange from '../hook/useGlucoseRange';
import { GlucoseData } from '../model/api/glucose-data';
import { Attempt } from '../model/response';
import { toChartDays } from '../transformation/api';
import AsyncScreen from './AsyncScreen';
import { RootStackParamList } from './Navigation';

type ChartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chart'
>;

type Props = {
  navigation: ChartScreenNavigationProp;
};

export default function MainScreen(props: Props) {
  const [state, dispatch] = useAppState();
  const [minGlucose, maxGlucose] = useGlucoseRange();

  const api: () => Attempt<GlucoseData[]> = () =>
    dispatch(getGlucoseAsyncAction(state.token));

  const chartDays = React.useMemo(
    () => toChartDays(minGlucose, maxGlucose)(state.glucoseData),
    [state.glucoseData, minGlucose, maxGlucose],
  );

  const [dayOffset, setDayOffset] = React.useState(1);

  const today = chartDays.length > 0 ? chartDays[chartDays.length - 1] : null;

  const chartDay =
    chartDays.length > 0 ? chartDays[chartDays.length - dayOffset] : null;

  const updateDayOffset = (offset: number) =>
    dayOffset + offset > chartDays.length - 1
      ? setDayOffset(chartDays.length - 1)
      : dayOffset + offset === 0
      ? setDayOffset(1)
      : setDayOffset(dayOffset + offset);

  return (
    <AsyncScreen initialState={Status.loading} api={api}>
      {(screenStatus, resetScreenStatus) => (
        <Refreshable
          refreshing={screenStatus == Status.loading}
          onRefresh={resetScreenStatus}
        >
          <ScrollView>
            <GlucoseCurrent chartDay={today}></GlucoseCurrent>
            <GestureRecognizer
              onSwipeLeft={() => updateDayOffset(-1)}
              onSwipeRight={() => updateDayOffset(1)}
            >
              {chartDay && (
                <React.Fragment>
                  <DayLabel offset={dayOffset}></DayLabel>
                  <GlucoseChart
                    chartDay={chartDay}
                    fullScreen={false}
                    onPress={() => {
                      props.navigation.navigate('Chart');
                    }}
                    withCursor={false}
                  ></GlucoseChart>
                </React.Fragment>
              )}
            </GestureRecognizer>
            <GlucoseStandardDeviation
              chartDay={chartDay}
              chartDays={chartDays}
            ></GlucoseStandardDeviation>
            <GlucoseAverage
              chartDay={chartDay}
              chartDays={chartDays}
            ></GlucoseAverage>
            <GlucoseRange
              chartDay={chartDay}
              chartDays={chartDays}
            ></GlucoseRange>
          </ScrollView>
        </Refreshable>
      )}
    </AsyncScreen>
  );
}
