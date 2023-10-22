import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MINUTES_IN_HOUR } from './constants';
import { DateTime } from 'luxon';
import { url } from 'inspector';
import { Person, TimeZone, TimeZoneGroup } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(timeInMinutes: number): string {
  const minutes = timeInMinutes % MINUTES_IN_HOUR;
  const hours = (timeInMinutes - minutes) / MINUTES_IN_HOUR;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

export function getAvatarSVGUrl(seed: string): string {
  const url = new URL('https://api.dicebear.com/7.x/lorelei/svg');
  url.searchParams.set('seed', seed);
  return url.href;
}

export function getTimeZoneOffset(timeZone: string): number {
  return DateTime.fromObject({}, { zone: timeZone }).offset;
}

export function groupBy<T>(array: T[], getGroup: (item: T) => string) {
  return array.reduce((groups, item) => {
    const group = getGroup(item);
    groups[group] ??= [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
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
  const offset = getTimeZoneOffset(timeZone);
  return {
    timeZone,
    region,
    city,
    offset,
    formattedOffset: formatUtcOffset(offset),
  };
}

export function formatUtcOffset(offset: number): string {
  const hours = offset / MINUTES_IN_HOUR;
  const sign = hours < 0 ? '' : '+';
  return `UTC${sign}${hours}`;
}

export const TIME_ZONES = Intl.supportedValuesOf('timeZone').map(getTimeZoneDetails);

export const TIME_ZONE_REGIONS = groupBy(TIME_ZONES, ({ region }) => region);
