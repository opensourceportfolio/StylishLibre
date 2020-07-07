import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { AppDispatch } from ".";
import { Actions, persistenceStorageLoadingAsyncAction } from "../action";
import { State } from "../model/state";
import { writeState } from "./persistent-state";

interface Props {
  store: Store<State, Actions>;
  children: JSX.Element | JSX.Element[];
}

function throttle(fn: () => void, delay: number): () => void {
  let timetoutId: number;

  return () => {
    clearTimeout(timetoutId);
    timetoutId = setTimeout(fn, delay);
  };
}

export const StoreProvider = (props: Props) => {
  const { store, children } = props;
  const dispatch: AppDispatch = store.dispatch;
  const writeStateThrottled = throttle(
    () => writeState(store.getState()),
    1000
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(writeStateThrottled);
    dispatch(persistenceStorageLoadingAsyncAction());

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
