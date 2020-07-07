import * as React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
