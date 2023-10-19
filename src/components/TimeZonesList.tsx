'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { name } from 'assert';

type Person = {
  name: string;
  timeZone: string;
};

type TimeZone = {
  timeZone: string;
  people: Person[];
};

const initialPeople: Person[] = [
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
  const [people, setPeople] = useState(initialPeople);

  const timeZones = groupByTimeZone(people).toSorted(
    (a, b) => getOffset(a.timeZone) - getOffset(b.timeZone)
  );

  function addPerson(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { name, timeZone } = event.target as HTMLFormElement;
    const person = {
      name: name.value,
      timeZone: timeZone.value,
    };

    setPeople([...people, person]);
  }

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
                    {people
                      .filter(({ name }) => name)
                      .map(({ name }) => (
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
      <form onSubmit={addPerson} className="mt-20 space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Add a team member</h3>
        <div className="flex items-end gap-2">
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              id="name"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="timeZone">Time Zone</label>
            <select
              id="timeZone"
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
            >
              {Intl.supportedValuesOf('timeZone').map((timeZone) => (
                <option key={timeZone}>{timeZone}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
