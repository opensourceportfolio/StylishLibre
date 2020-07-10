import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import Navigation from "./src/screen/Navigation";
import store from "./src/store";
import { StoreProvider } from "./src/store/StoreProvider";

export default function App(): JSX.Element {
  return (
      <StoreProvider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Navigation />
        </ApplicationProvider>
      </StoreProvider>
  );
}
