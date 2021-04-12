import { Reducer } from 'redux';

import { Actions } from '../action';
import AppState from '../model/app-state';
import defaultState, { State } from '../model/state';

const partialState = (state: State): Partial<State> => {
  const { glucoseData: _, ...rest } = state;

  return rest;
};

const reducer: Reducer<State, Actions> = (
  state: State | undefined = defaultState,
  action: Actions,
): State => {
  const newState: State = (() => {
    switch (action.type) {
      case 'app/loaded': {
        return {
          ...state,
          ...action.payload,
          appState: action.payload?.token ? AppState.main : AppState.login,
        };
      }
      case 'app/login': {
        return {
          ...state,
          token: action.payload,
          appState: AppState.main,
        };
      }
      case 'app/logout': {
        return {
          ...defaultState,
          appState: AppState.login,
        };
      }
      case 'app/update': {
        return {
          ...state,
          ...action.payload,
        };
      }
      default: {
        return state;
      }
    }
  })();

  console.log({
    action: action.type,
    oldState: partialState(state),
    newState: partialState(newState),
  });

  return newState;
};

export default reducer;
