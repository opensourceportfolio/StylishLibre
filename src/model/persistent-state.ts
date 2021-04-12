import { GlucoseData } from './api/glucose-data';

export interface PersistentState {
  glucoseData: GlucoseData[];
  email: string;
  minimumGlucose: string;
  maximumGlucose: string;
  password: string;
  token?: string;
}
