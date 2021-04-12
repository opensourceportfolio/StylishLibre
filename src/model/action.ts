import { Action } from 'redux';

export interface PayloadAction<Type, Payload> extends Action {
  type: Type;
  payload: Payload;
}
