import { People } from '@/types/people';
import { TimeZoneGroup } from '@/types/timeZones';
import { clsx, type ClassValue } from 'clsx';
import { DateTime, Interval } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { MINUTES_IN_HOUR, WORKDAY_END_HOUR, WORKDAY_START_HOUR } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarSVGUrl(seed: string): string {
  const url = new URL('https://api.dicebear.com/7.x/lorelei/svg');
  url.searchParams.set('seed', seed);
  return url.href;
}

export function getOffset(timeZone: string): number {
  const localOffset = DateTime.now().offset;
  const otherOffset = DateTime.local({ zone: timeZone }).offset;
  return localOffset - otherOffset;
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

export function groupPeopleByTimeZone(people: People): TimeZoneGroup[] {
  const timeZoneGroups = groupBy(people, ({ timeZone }) => timeZone);
  return Object.entries(timeZoneGroups)
    .map(([timeZone, people]: [string, People]) => ({
      timeZone,
      people,
    }))
    .sort((a, b) => getOffset(a.timeZone) - getOffset(b.timeZone));
}

export function getDateTimeFromMinutes(minutes: number, timeZone?: string): DateTime {
  const { hour, minute } = timeFromMinutes(minutes);
  const dateTime = DateTime.local().set({ hour, minute });

  return timeZone ? dateTime.setZone(timeZone) : dateTime;
}

export function timeFromMinutes(minutes: number) {
  return {
    hour: Math.floor(minutes / MINUTES_IN_HOUR),
    minute: minutes % MINUTES_IN_HOUR,
  };
}

export function withinWorkHours(selectedDateTime: DateTime, timeZone: string): boolean {
  const workDay = selectedDateTime.setZone(timeZone);

  const workingHours = Interval.fromDateTimes(
    workDay.set({ hour: WORKDAY_START_HOUR }),
    workDay.set({ hour: WORKDAY_END_HOUR }),
  );

  return workingHours.contains(selectedDateTime);
}

export function formatTime(minutes: number, timeZone?: string): string {
  const dateTime = getDateTimeFromMinutes(minutes, timeZone);
  return dateTime.toFormat('T');
}
