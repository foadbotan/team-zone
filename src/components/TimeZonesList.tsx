'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { DateTime } from 'luxon';

type Person = {
  name: string;
  timeZone: string;
};

type TimeZone = {
  timeZone: string;
  people: Person[];
};

const people: Person[] = [
  { name: 'Joey', timeZone: 'Europe/London' },
  { name: 'Rachel', timeZone: 'Europe/London' },
  { name: 'Monica', timeZone: 'America/Los_Angeles' },
  { name: 'Chandler', timeZone: 'Australia/Sydney' },
  { name: 'Ross', timeZone: 'Australia/Sydney' },
  { name: 'Gunther', timeZone: 'Asia/Tokyo' },
  { name: 'Janice', timeZone: 'Asia/Tokyo' },
  { name: 'Phoebe', timeZone: 'Asia/Bangkok' },
];

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY;
const TIME_BLOCK = MINUTES_IN_DAY / 15;

const avatarURL = (seed: string): string =>
  `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}`;

function formatTime(time: number): string {
  const minutes = time % MINUTES_IN_HOUR;
  const hours = (time - minutes) / MINUTES_IN_HOUR;

  const hoursString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');

  return `${hoursString}:${minutesString}`;
}

function inWorkingHours(eventTime: number, offset: number): boolean {
  const workStart = getWorkStart(offset);
  const workEnd = getWorkEnd(offset);

  return eventTime >= workStart && eventTime <= workEnd;
}

function getWorkStart(offset: number): number {
  return offset;
}

function getWorkEnd(offset: number): number {
  return MINUTES_IN_HOUR * 12 + getWorkStart(offset);
}

function getOffset(timeZone: string): number {
  return DateTime.fromObject({}, { zone: timeZone }).offset;
}

function groupByTimeZone(people: Person[]): TimeZone[] {
  const timeZonesTable = people.reduce((timeZones, person) => {
    timeZones[person.timeZone] = timeZones[person.timeZone] || [];
    timeZones[person.timeZone].push(person);
    return timeZones;
  }, {} as Record<string, Person[]>);

  return Object.entries(timeZonesTable).map(([timeZone, people]) => ({
    timeZone,
    people,
  }));
}

export default function TimeZonesList() {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);

  const timeZones = groupByTimeZone(people);
  console.log(timeZones);

  return (
    <>
      <p className="text-xl">{formatTime(selectedTime)}</p>
      <div className="relative">
        <input
          type="range"
          className="absolute inset-0 z-20 bg-transparent appearance-none cursor-pointer h-full w-full"
          min={0}
          max={MINUTES_IN_DAY}
          step={15}
          value={selectedTime}
          onChange={(event) => setSelectedTime(Number(event.target.value))}
        />
        <div
          className="absolute top-0 bottom-0 z-10 w-1 bg-red-500"
          style={{
            left: `${(selectedTime / MINUTES_IN_DAY) * 100}%`,
          }}
        />
        <ul className="border rounded-xl p-4 pb-10 shadow-lg my-6 space-y-6">
          {timeZones.map(({ timeZone, people }) => {
            const offset = getOffset(timeZone);
            let workStart = getWorkStart(offset);
            let workEnd = getWorkEnd(offset);
            workStart = workStart < 0 ? 0 : workStart;
            workEnd = workEnd > MINUTES_IN_DAY ? MINUTES_IN_DAY : workEnd;
            return (
              <li key={timeZone}>
                <div className="flex items-end justify-between pb-2">
                  <div className="">
                    <p className="text-sm font-semibold leading-6 text-neutral-900">
                      {timeZone}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      {`UTC ${offset < 0 ? '' : '+'}${offset / MINUTES_IN_HOUR}`}
                    </p>
                  </div>
                  <div
                    className={cn('flex gap-2', {
                      '[&_img]:bg-green-500': inWorkingHours(selectedTime, offset),
                    })}
                  >
                    {people.map(({ name }) => (
                      <div key={name} className="flex flex-col items-center ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={cn(
                            'inline-block w-12 h-12 rounded-full bg-neutral-200'
                          )}
                          src={avatarURL(name)}
                          alt={name}
                          width="48"
                          height="48"
                        />
                        <span className="max-w-[12ch] text-xs truncate text-neutral-600">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="grid w-full overflow-hidden rounded bg-neutral-200"
                  style={{
                    gridTemplateColumns: `repeat(${TIME_BLOCK}, 1fr)`,
                  }}
                >
                  {Array.from({ length: TIME_BLOCK }).map((_, index) => {
                    const time = index * 15;
                    const isWorkTime = time >= workStart && time <= workEnd;
                    return (
                      <div
                        key={time}
                        className={cn('h-6', {
                          'bg-blue-400': isWorkTime,
                          'bg-blue-500':
                            isWorkTime && inWorkingHours(selectedTime, offset),
                        })}
                      ></div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
