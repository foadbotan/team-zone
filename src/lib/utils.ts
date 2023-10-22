import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MINUTES_IN_HOUR } from './constants';
import { DateTime } from 'luxon';
import { url } from 'inspector';
import { Person, TimeZone } from '@/types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatTime(timeInMinutes: number): string {
  const minutes = timeInMinutes % MINUTES_IN_HOUR;
  const hours = (timeInMinutes - minutes) / MINUTES_IN_HOUR;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

function getAvatarSVGUrl(seed: string): string {
  const url = new URL('https://api.dicebear.com/7.x/lorelei/svg');
  url.searchParams.set('seed', seed);
  return url.href;
}

function getTimeZoneOffset(timeZone: string): number {
  return DateTime.fromObject({}, { zone: timeZone }).offset;
}

function groupPeopleByTimeZone(people: Person[]): TimeZone[] {
  const timeZonesTable = people.reduce((timeZones, person) => {
    timeZones[person.timeZone] = timeZones[person.timeZone] || [];
    timeZones[person.timeZone].push(person);
    return timeZones;
  }, {} as Record<string, Person[]>);

  return Object.entries(timeZonesTable)
    .map(([timeZone, people]: [string, Person[]]) => ({
      timeZone,
      people,
      offset: getTimeZoneOffset(timeZone),
    }))
    .sort((a, b) => a.offset - b.offset);
}

export { cn, formatTime, getAvatarSVGUrl, getTimeZoneOffset, groupPeopleByTimeZone };
