import { Person, TimeZone, TimeZoneGroup } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { MINUTES_IN_HOUR } from './constants';

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
  // const otherOffset = DateTime.now().setZone(timeZone).offset;
  const otherOffset = DateTime.local({ zone: timeZone }).offset;
  return otherOffset - localOffset;
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

export const TIME_ZONES = Intl.supportedValuesOf('timeZone').map(getTimeZoneDetails);

export const TIME_ZONE_REGIONS = groupBy(TIME_ZONES, ({ region }) => region);

export function formatTime(time: number, timeZone?: string): string {
  const minute = time % MINUTES_IN_HOUR;
  const hour = (time - minute) / MINUTES_IN_HOUR;
  const date = DateTime.now().set({ hour, minute });
  if (timeZone) {
    return date.setZone(timeZone).toFormat('T');
  }
  return date.toFormat('T');
}

export function getFormattedDate(daysOffset = 0): string {
  return DateTime.now().plus({ days: daysOffset }).toFormat('d LLL');
}
