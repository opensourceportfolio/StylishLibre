export function getTime(epoch: number): string {
  const date = new Date(epoch * 1000);

  return new Intl.DateTimeFormat("en-US").format(date);
}

export function getHour(epoch: number): number {
  const date = new Date(epoch * 1000);

  return date.getUTCHours();
}

export function formatHour(hour24: number): string {
  return hour24 > 12 ? hour24 - 12 + "pm" : hour24 + "am";
}

export function getHourRange(from: number, to: number, skip: number): number[] {
  const secondsInHour = 60 * 60;

  if (from > to) {
    return [];
  } else {
    return [from, ...getHourRange(from + secondsInHour * skip, to, skip)];
  }
}
