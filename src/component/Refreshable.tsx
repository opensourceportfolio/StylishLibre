import React from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";

interface Props {
  children: JSX.Element,
  refreshing: boolean,
  onRefresh: () => void
}

export default function Refreshable(props: Props) {
  const { children, refreshing, onRefresh } = props;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
