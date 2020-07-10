import * as React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Status } from "../api/fetch";
import ErrorModal from "../component/ErrorModal";
import useAsyncScreen, { ResetStatusFn } from "../hook/useAsyncScreen";
import { Attempt } from "../model/response";

interface Props<T> {
  initialState: Status;
  api: () => Attempt<T>;
  children: (screenStatus: Status, resetStatus: ResetStatusFn) => JSX.Element;
}

export default function AsyncScreen<T>(props: Props<T>) {
  const [screenStatus, resetScreenStatus] = useAsyncScreen(
    props.initialState,
    props.api
  );

  return (
    <SafeAreaView style={styles.centeredView}>
      {props.children(screenStatus, resetScreenStatus)}
      {screenStatus == Status.failure && (
        <ErrorModal onDismiss={resetScreenStatus}></ErrorModal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
