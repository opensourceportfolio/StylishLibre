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
