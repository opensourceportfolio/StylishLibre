import { Text } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  title: string;
  content?: string | number;
}

export default function Cell({ title, content }: Props) {
  return (
    <View style={styles.cell}>
      <Text category="s2">{title}</Text>

      <Text category="c1" appearance="hint">
        {content ? content : "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: "50%",
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});
