import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { Actions } from '../action';
import defaultState, { State } from '../model/state';
import reducer from '../reducer';

export type AppDispatch = ThunkDispatch<State, unknown, Actions>;

const store = createStore(reducer, defaultState, applyMiddleware(thunk));

export default store;
