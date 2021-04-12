import { useDispatch, useSelector } from 'react-redux';

import { State } from '../model/state';
import { AppDispatch } from '../store';

export default function useAppState(): [State, AppDispatch] {
  const state: State = useSelector<State, State>((s) => s);
  const dispatch: AppDispatch = useDispatch();

  return [state, dispatch];
}
