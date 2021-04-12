import defaultState from '../model/state';
import useAppState from './useAppState';

export default function useGlucoseRange(): [number, number] {
  const [state] = useAppState();
  const minGlucose =
    parseInt(state.minimumGlucose) || parseInt(defaultState.minimumGlucose);
  const maxGlucose =
    parseInt(state.maximumGlucose) || parseInt(defaultState.maximumGlucose);

  return [minGlucose, maxGlucose];
}
