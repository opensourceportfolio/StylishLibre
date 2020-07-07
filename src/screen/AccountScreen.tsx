import { Entypo, Feather } from "@expo/vector-icons";
import { Button, Divider, Input, Text } from "@ui-kitten/components";
import * as React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { appLogoutAsyncAction, appUpdateAction } from "../action";
import ListItem from "../component/ListItem";
import useAppState from "../hook/useAppState";

export default function AccountScreen() {
  const [{ email, minimumGlucose, maximumGlucose }, dispatch] = useAppState();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.accountScreen}
    >
      <View>
        <ListItem
          accessoryLeft={<Entypo name="email" size={24} color="black" />}
        >
          <Text category="s2">{email}</Text>

          <Text category="c1" appearance="hint">
            Address used with LibreView
          </Text>
        </ListItem>
        <Divider></Divider>
        <ListItem
          accessoryLeft={<Feather name="maximize" size={24} color="black" />}
          accessoryRight={
            <Input
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={(v) =>
                dispatch(appUpdateAction({ maximumGlucose: v }))
              }
              placeholder="150"
              style={styles.numberInput}
              value={maximumGlucose}
            />
          }
        >
          <Text category="s2">Maximum</Text>

          <Text category="c1" appearance="hint">
            Maximum target glucose
          </Text>
        </ListItem>
        <Divider></Divider>
        <ListItem
          accessoryLeft={<Feather name="minimize" size={24} color="black" />}
          accessoryRight={
            <Input
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={(v) =>
                dispatch(appUpdateAction({ minimumGlucose: v }))
              }
              placeholder="60"
              style={styles.numberInput}
              value={minimumGlucose}
            />
          }
        >
          <Text category="s2">Minimum</Text>

          <Text category="c1" appearance="hint">
            Minimum target glucose
          </Text>
        </ListItem>
      </View>
      <Button
        style={styles.logoutButton}
        onPress={() => dispatch(appLogoutAsyncAction())}
      >
        Logout
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  accountScreen: {
    flex: 1,
    justifyContent: "space-between",
  },
  numberInput: {
    width: 80,
  },
  logoutButton: {
    margin: 20,
  },
});
