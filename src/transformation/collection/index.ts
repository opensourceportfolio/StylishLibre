export const identity = <T>(t: T) => t;

export function min<T>(transform: (t: T) => number, collection: T[]) {
  return collection.reduce(
    (acc, item) => Math.min(acc, transform(item)),
    Number.POSITIVE_INFINITY
  );
}

export function max<T>(transform: (t: T) => number, collection: T[]) {
  return collection.reduce(
    (acc, item) => Math.max(acc, transform(item)),
    Number.NEGATIVE_INFINITY
  );
}

export function sum<T>(transform: (t: T) => number, collection: T[]) {
  return collection.reduce((acc, item) => acc + transform(item), 0);
}

export function countIf<T>(transform: (t: T) => boolean, collection: T[]) {
  return collection.reduce((acc, item) => acc + (transform(item) ? 1 : 0), 0);
}

export function last<T, R>(
  transform: (t: T) => R,
  collection: T[],
  defaultValue: R
): R {
  return collection.length > 0
    ? transform(collection[collection.length - 1])
    : defaultValue;
}

export function standardDeviation(average: number, list: number[]) {
  const sumOfSquares = sum(
    identity,
    list.map((item) => (item - average) ** 2)
  );
  const variance = sumOfSquares / (list.length - 1);

  return Math.sqrt(variance);
}
