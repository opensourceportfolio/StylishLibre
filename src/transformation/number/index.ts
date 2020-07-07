export function toPercent(fraction: number): string {
  return Math.trunc(fraction * 100).toString() + "%";
}

export function round(number: number): string {
  return Math.trunc(number).toString();
}
