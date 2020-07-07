import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { getGlucoseAsyncAction } from "../action";
import { Status } from "../api/fetch";
import GlucoseChart from "../component/chart/GlucoseChart";
import Cell from "../component/grid/Cell";
import Refreshable from "../component/Refreshable";
import useAppState from "../hook/useAppState";
import useGlucoseRange from "../hook/useGlucoseRange";
import { GlucoseData } from "../model/api/glucose-data";
import { Attempt } from "../model/response";
import { toChartDays } from "../transformation/api";
import { toPercent } from "../transformation/number";
import AsyncScreen from "./AsyncScreen";

export default function MainScreen() {
  const [state, dispatch] = useAppState();
  const [minGlucose, maxGlucose] = useGlucoseRange();
  const api: () => Attempt<GlucoseData[]> = () =>
    dispatch(getGlucoseAsyncAction(minGlucose, maxGlucose, state.token));
  const chartDays = React.useMemo(
    () => toChartDays(minGlucose, maxGlucose)(state.glucoseData),
    [state.glucoseData, minGlucose, maxGlucose]
  );

  const today = chartDays.length > 0 ? chartDays[chartDays.length - 1] : null;

  return (
    <AsyncScreen initialState={Status.loading} api={api}>
      {(screenStatus, resetScreenStatus) => (
        <Refreshable
          refreshing={screenStatus == Status.loading}
          onRefresh={resetScreenStatus}
        >
          <View style={styles.centeredView}>
            <View style={styles.grid}>
              <Cell title="Average Glucose" content={today?.average}></Cell>
              <Cell
                title="Percent in range"
                content={today?.inRange ? toPercent(today?.inRange) : undefined}
              ></Cell>
            </View>
            <View style={styles.grid}>
              <Cell title="Minimum Glucose" content={today?.min}></Cell>
              <Cell title="Maximum Glucose" content={today?.max}></Cell>
            </View>
            {today && <GlucoseChart chartDay={today}></GlucoseChart>}
          </View>
        </Refreshable>
      )}
    </AsyncScreen>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("window").width,
  },
});
