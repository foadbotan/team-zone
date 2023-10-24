import { clsx, type ClassValue } from 'clsx';
import { DateTime, Interval } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { MINUTES_IN_HOUR, WORKDAY_END_HOUR, WORKDAY_START_HOUR } from './constants';
import { Person, TimeZone, TimeZoneGroup } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarSVGUrl(seed: string): string {
  const url = new URL('https://api.dicebear.com/7.x/lorelei/svg');
  url.searchParams.set('seed', seed);
  return url.href;
}

export function getLocalOffset(timeZone: string): number {
  const localOffset = DateTime.now().offset;
  const otherOffset = DateTime.local({ zone: timeZone }).offset;
  return localOffset - otherOffset;
}

export function getUtcOffset(timeZone: string): number {
  return DateTime.now().setZone(timeZone).offset;
}

export function groupBy<T>(array: T[], getGroup: (item: T) => string) {
  return array.reduce(
    (groups, item) => {
      const group = getGroup(item);
      groups[group] ??= [];
      groups[group].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

export function groupPeopleByTimeZone(people: Person[]): TimeZoneGroup[] {
  const timeZoneGroups = groupBy(people, ({ timeZone }) => timeZone);

  return Object.entries(timeZoneGroups)
    .map(([timeZone, people]: [string, Person[]]) => ({
      people,
      ...getTimeZoneDetails(timeZone),
    }))
    .sort((a, b) => a.offset - b.offset);
}

export function getTimeZoneDetails(timeZone: string): TimeZone {
  const [region, city] = timeZone.split('/');
  const offset = getLocalOffset(timeZone);
  return {
    timeZone,
    region,
    city,
    offset,
    formattedOffset: formatUtcOffset(timeZone),
  };
}

export function formatUtcOffset(timeZone: string): string {
  const offset = getLocalOffset(timeZone);
  const hours = offset / MINUTES_IN_HOUR;
  const sign = hours < 0 ? '' : '+';
  return `(${sign}${hours})`;
}

export function formatTime(time: number, timeZone?: string): string {
  const { hour, minute } = timeFromMinutes(time);

  const date = DateTime.local().set({ hour, minute });
  if (timeZone) {
    return date.setZone(timeZone).toFormat('T');
  }
  return date.toFormat('T');
}

export function getFormattedDate(daysOffset = 0): string {
  return DateTime.now().plus({ days: daysOffset }).toFormat('d LLL');
}

export function timeFromMinutes(minutes: number) {
  return {
    hour: Math.floor(minutes / MINUTES_IN_HOUR),
    minute: minutes % MINUTES_IN_HOUR,
  };
}

export function withinWorkHours(selectedDateTime: DateTime, timeZone: string): boolean {
  const date = selectedDateTime
    .setZone(timeZone)
    .set({ minute: 0, second: 0, millisecond: 0 });

  const workTime = Interval.fromDateTimes(
    date.set({ hour: WORKDAY_START_HOUR }),
    date.set({ hour: WORKDAY_END_HOUR }),
  );

  return workTime.contains(selectedDateTime);
}

// handy func for later
// workRange.engulfs(selectedRange)
