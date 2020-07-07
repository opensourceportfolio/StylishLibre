export interface Success<T> {
  type: "success";
  data: T;
}

export interface Failure {
  type: "failure";
  reason?: string;
  args?: string;
  data?: string;
}

export type Maybe<T> = Success<T> | Failure;

export const Attempt = Promise;
export type Attempt<T> = Promise<Success<T> | Failure>;
