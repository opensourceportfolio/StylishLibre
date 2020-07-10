import { Action } from "redux";
import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { success } from "../api/fetch";
import { getGlucoseData } from "../api/getGlucoseData";
import { login } from "../api/login";
import { PayloadAction } from "../model/action";
import { GlucoseData } from "../model/api/glucose-data";
import { PersistentState } from "../model/persistent-state";
import { Attempt } from "../model/response";
import { State } from "../model/state";
import { deleteState, readState } from "../store/persistent-state";

type ThunkAction<T extends Action, R> = ReduxThunkAction<
  Attempt<R>,
  State,
  unknown,
  T
>;

const appLoadedType = "app/loaded";
export type AppLoadedAction = PayloadAction<
  typeof appLoadedType,
  PersistentState | null
>;
function appLoadedAction(
  persistentState: PersistentState | null
): AppLoadedAction {
  return {
    type: appLoadedType,
    payload: persistentState,
  };
}

const appLoginType = "app/login";
export type AppLoginAction = PayloadAction<typeof appLoginType, string>;
function appLoginAction(token: string): AppLoginAction {
  return {
    type: appLoginType,
    payload: token,
  };
}

const appLogoutType = "app/logout";
export type AppLogoutAction = Action<typeof appLogoutType>;
function appLogoutAction(): AppLogoutAction {
  return {
    type: appLogoutType,
  };
}

export function persistenceStorageLoadingAsyncAction(): ThunkAction<
  AppLoadedAction,
  PersistentState | null
> {
  return async (dispatch) => {
    const savedState = await readState();

    dispatch(appLoadedAction(savedState));

    return success(savedState);
  };
}

const appUpdateType = "app/update";
export type AppUpdateAction = PayloadAction<
  typeof appUpdateType,
  Partial<State>
>;
export function appUpdateAction(payload: Partial<State>): AppUpdateAction {
  return {
    type: appUpdateType,
    payload,
  };
}

export function appLoginAsyncAction(
  email: string,
  password: string
): ThunkAction<AppLoginAction, string> {
  return async (dispatch) => {
    const res = await login(email, password);

    if (res.type === "success") {
      dispatch(appLoginAction(res.data));
    }

    return res;
  };
}

export function appLogoutAsyncAction(): ThunkAction<AppLogoutAction, void> {
  return async (dispatch) => {
    dispatch(appLogoutAction());
    await deleteState();

    return success(undefined);
  };
}

export function getGlucoseAsyncAction(
  token: string | undefined
): ThunkAction<AppUpdateAction, GlucoseData[]> {
  return async (dispatch, getState) => {
    const currentState = getState();
    const tokenAttempt = token
      ? success(token)
      : await login(currentState.email, currentState.password);

    if (tokenAttempt.type === "success") {
      const glucoseDataAttempt = await getGlucoseData(tokenAttempt.data);

      if (glucoseDataAttempt && glucoseDataAttempt.type === "success") {
        const successState = {
          glucoseData: glucoseDataAttempt.data,
        };
        console.log({ successState });

        dispatch(appUpdateAction({ ...successState }));

        return glucoseDataAttempt;
      } else {
        dispatch(appUpdateAction({ ...currentState, token: undefined }));
      }
    }

    return { type: "failure" };
  };
}

export type Actions =
  | AppLoadedAction
  | AppLoginAction
  | AppLogoutAction
  | AppUpdateAction;
