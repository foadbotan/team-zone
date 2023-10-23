'use client';

import { initialPeople } from '@/data/people';
import {
  MINUTES_IN_DAY,
  MINUTES_IN_HOUR,
  WORKING_HOURS_END,
  WORKING_HOURS_START,
} from '@/lib/constants';
import {
  cn,
  formatTime,
  getFormattedDate,
  getLocalOffset,
  groupPeopleByTimeZone,
} from '@/lib/utils';
import { Person, TimeZoneGroup } from '@/types';
import { useState } from 'react';
import Avatar from './Avatar';
import Team from './Team';

function getWorkEnd(offset: number): number {
  return MINUTES_IN_HOUR * 12 + offset;
}

export default function TimeZonesList() {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);
  const [people, setPeople] = useState(initialPeople);

  const selectedPeople = people.filter(({ isSelected }) => isSelected);
  const timeZoneGroups: TimeZoneGroup[] = groupPeopleByTimeZone(selectedPeople);

  return (
    <div className="space-y-10">
      <Team people={people} setPeople={setPeople} />
      <div className="h-px w-full bg-neutral-200" />
      <div className="relative">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-neutral-900">
          Zones
        </h2>
        <div className="absolute bottom-0 left-6 right-6 top-0 z-10">
          <div
            className="pointer-events-none absolute bottom-0 top-0 w-1 select-none bg-red-500"
            style={{
              left: `${(selectedTime / MINUTES_IN_DAY) * 100}%`,
            }}
          >
            <p className="flex h-20 w-20 -translate-x-1/2 transform  flex-col items-center justify-center rounded-full bg-red-500 text-xl font-medium text-white">
              {formatTime(selectedTime)}
              <span className="text-xs">Your time</span>
            </p>
          </div>
          <input
            type="range"
            className="h-full w-full cursor-pointer appearance-none bg-transparent focus:outline-none "
            min={0}
            max={MINUTES_IN_DAY}
            step={15}
            value={selectedTime}
            onChange={(event) => setSelectedTime(Number(event.target.value))}
          />
        </div>
        <ul className="my-6 space-y-6 rounded-xl border p-6 pb-10 shadow-lg">
          {timeZoneGroups.map((tzGroup) => {
            const offset = tzGroup.offset;

            const workStart = WORKING_HOURS_START * MINUTES_IN_HOUR + offset;
            const workEnd = WORKING_HOURS_END * MINUTES_IN_HOUR + offset;
            const isAvailable = selectedTime >= workStart && selectedTime <= workEnd;

            return (
              <li key={tzGroup.timeZone}>
                <div className="flex items-end justify-between pb-2">
                  <div className="">
                    <p className="text-sm font-semibold leading-6 text-neutral-900">
                      {tzGroup.city}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      {tzGroup.formattedOffset}
                    </p>
                  </div>
                  <ZoneAvatars people={tzGroup.people} isAvailable={isAvailable} />
                </div>
                <DayBar timeZone={tzGroup.timeZone} selectedTime={selectedTime} />
                {/* <div
                  className="grid w-full overflow-hidden rounded bg-neutral-200"
                  style={{
                    gridTemplateColumns: `repeat(${QUARTER_HOURS_IN_DAY}, 1fr)`,
                  }}
                >
                  {Array.from({ length: QUARTER_HOURS_IN_DAY }).map((_, index) => {
                    const time = (index + 1) * 15;
                    const isWorkTime = time >= workStart && time <= workEnd;
                    return (
                      <div
                        key={time}
                        className={cn('h-6 ', {
                          'bg-blue-400': isWorkTime,
                          'bg-blue-500': isWorkTime && isAvailable,
                        })}
                      ></div>
                    );
                  })}
                </div> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function ZoneAvatars({
  people,
  isAvailable,
}: {
  people: Person[];
  isAvailable: boolean;
}) {
  return (
    <div className="flex gap-2">
      {people.map((person) => (
        <Avatar
          person={person}
          key={person.name}
          className={cn(isAvailable && 'bg-green-500')}
        />
      ))}
    </div>
  );
}

function DayBar({ timeZone, selectedTime }: { timeZone: string; selectedTime: number }) {
  const offset = getLocalOffset(timeZone);
  const offsetPercentage = (offset / MINUTES_IN_DAY) * 100;

  return (
    <div className="flex h-6 w-full overflow-hidden rounded bg-neutral-200">
      <div
        className="grid h-full w-full flex-shrink-0 grid-cols-24"
        style={{
          marginLeft: `${offsetPercentage}%`,
        }}
      >
        <p className="col-span-8 col-start-10 rounded bg-blue-700 text-center font-bold text-white">
          {getFormattedDate(-1)}
        </p>
      </div>
      <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
        <p className="col-span-8 col-start-10 rounded bg-blue-700 text-center font-bold text-white">
          {getFormattedDate()}
        </p>
      </div>
      <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
        <p className="col-span-8 col-start-10 rounded bg-blue-700 text-center font-bold text-white">
          {getFormattedDate(1)}
        </p>
      </div>
    </div>
  );
}
