import AppState from "./app-state";
import { PersistentState } from "./persistent-state";

export interface State extends PersistentState {
  appState: AppState;
}

const defaultState: State = {
  appState: AppState.notStarted,
  glucoseData: [],
  email: "",
  minimumGlucose: "60",
  maximumGlucose: "150",
  password: "",
};

export default defaultState;
