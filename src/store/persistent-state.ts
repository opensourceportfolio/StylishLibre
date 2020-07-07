import AsyncStorage from "@react-native-community/async-storage";
import { PersistentState } from "../model/persistent-state";

function safeJsonParse<T>(input: string | null): T | null {
  try {
    return input ? JSON.parse(input) : input;
  } catch {
    return null;
  }
}

export const key = "@StylishLibre/appConfig";

export function readState(): Promise<PersistentState | null> {
  return AsyncStorage.getItem("@StylishLibre/appConfig").then((res) => {
    return safeJsonParse<PersistentState>(res);
  });
}

export async function writeState(state: Partial<PersistentState>) {
  const currentState = await readState();
  const newState = {
    ...currentState,
    ...state,
  };


  return AsyncStorage.setItem(key, JSON.stringify(newState));
}

export async function deleteState() {
  return AsyncStorage.removeItem(key);
}