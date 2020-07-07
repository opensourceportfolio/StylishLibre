import { Attempt, Success, Failure } from "../model/response";

export async function json<T>(
  url: RequestInfo,
  init?: RequestInit
): Attempt<T> {
  const promise = await fetch(url, init);
  const data: Success<T> | Failure = await promise.json();

  return data;
}

export enum Status {
  notStarted,
  loading,
  success,
  failure,
}

export function success<T>(data: T): Success<T> {
  return {
    type: "success",
    data,
  };
}

export function failure<T>(reason: string, args: any, data: any): Failure {
  return {
    type: "failure",
    reason,
    args: JSON.stringify(args),
    data: JSON.stringify(data),
  };
}
