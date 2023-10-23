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
  formatUtcOffset,
  getFormattedDate,
  getLocalOffset,
  groupPeopleByTimeZone,
} from '@/lib/utils';
import { Person, TimeZoneGroup } from '@/types';
import { useState } from 'react';
import Avatar from './Avatar';
import Team from './Team';
import { DateTime } from 'luxon';

function getWorkEnd(offset: number): number {
  return MINUTES_IN_HOUR * 12 + offset;
}

export default function TimeZonesList() {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);
  const [people, setPeople] = useState(initialPeople);

  const selectedPeople = people.filter(({ isSelected }) => isSelected);
  const timeZoneGroups: TimeZoneGroup[] = groupPeopleByTimeZone(selectedPeople);

  const minute = selectedTime % MINUTES_IN_HOUR;
  const hour = (selectedTime - minute) / MINUTES_IN_HOUR;
  const date = DateTime.local().set({ hour, minute });

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
            className="pointer-events-none absolute bottom-0 top-0 w-1 select-none bg-orange-500"
            style={{
              left: `${(selectedTime / MINUTES_IN_DAY) * 100}%`,
            }}
          >
            <p className="flex h-20 w-20 -translate-x-1/2 transform  flex-col items-center justify-center rounded-full bg-orange-500 text-xl font-medium text-white">
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
        <ul className="relative my-6 select-none space-y-6 rounded-xl border p-6 pb-10 shadow-lg">
          {timeZoneGroups.map((tzGroup) => {
            const offset = tzGroup.offset;

            const workStart = WORKING_HOURS_START * MINUTES_IN_HOUR + offset;
            const workEnd = WORKING_HOURS_END * MINUTES_IN_HOUR + offset;
            const isAvailable = selectedTime >= workStart && selectedTime <= workEnd;

            return (
              <li key={tzGroup.timeZone}>
                <div className="mb-2 flex items-end justify-between">
                  <div className="">
                    <p className="text-2xl font-semibold tabular-nums text-orange-500 ">
                      {formatTime(selectedTime, tzGroup.timeZone)}
                    </p>
                    <p className="font-semibold text-neutral-900">{tzGroup.city}</p>
                  </div>
                  <ZoneAvatars people={tzGroup.people} isAvailable={isAvailable} />
                </div>
                <DayBar timeZone={tzGroup.timeZone} selectedTime={selectedTime} />
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
          className={cn(isAvailable && 'bg-orange-500')}
        />
      ))}
    </div>
  );
}

function DayBar({ timeZone, selectedTime }: { timeZone: string; selectedTime: number }) {
  const offset = getLocalOffset(timeZone);
  const offsetPercentage = (offset / MINUTES_IN_DAY) * 100;

  return (
    <div className="flex h-8 w-full justify-end overflow-hidden rounded bg-neutral-200">
      <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
        <p className="col-span-8 col-start-10 flex items-center justify-center rounded bg-emerald-600 font-bold text-white">
          {getFormattedDate(-1)}
        </p>
      </div>
      <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
        <p className="col-span-8 col-start-10 flex items-center justify-center rounded bg-emerald-600 font-bold text-white">
          {getFormattedDate()}
        </p>
      </div>
      <div
        className="grid h-full w-full flex-shrink-0 grid-cols-24"
        style={{
          marginRight: `${offsetPercentage}%`,
        }}
      >
        <p className="col-span-8 col-start-10 flex items-center justify-center rounded bg-emerald-600 font-bold text-white">
          {getFormattedDate(1)}
        </p>
      </div>
    </div>
  );
}
