'use client';

import { initialPeople } from '@/data/people';
import { MINUTES_IN_DAY, MINUTES_IN_HOUR, QUARTER_HOUR } from '@/lib/constants';
import { cn, formatTime, groupPeopleByTimeZone } from '@/lib/utils';
import { TimeZoneGroup } from '@/types';
import Team from './Team';
import Avatar from './Avatar';
import { useState } from 'react';

function inWorkingHours(eventTime: number, offset: number): boolean {
  const workStart = offset;
  const workEnd = getWorkEnd(offset);

  return eventTime >= workStart && eventTime <= workEnd;
}

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
      <div className="w-full h-px bg-neutral-200" />
      <div className="relative">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-neutral-900">
          Zones
        </h2>
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
          className="absolute top-0 bottom-0 z-10 w-1 bg-red-500 select-none"
          style={{
            left: `${(selectedTime / MINUTES_IN_DAY) * 100}%`,
          }}
        >
          <p className="text-xl absolute transform -translate-x-1/2  text-white rounded-full w-20 h-20 bg-red-500 flex items-center justify-center">
            {formatTime(selectedTime)}
          </p>
        </div>

        <ul className="border rounded-xl p-6 pb-10 shadow-lg my-6 space-y-6">
          {timeZoneGroups.map((tzGroup) => {
            const offset = tzGroup.offset;
            let workEnd = getWorkEnd(offset);
            let workStart = offset < 0 ? 0 : offset;
            workEnd = workEnd > MINUTES_IN_DAY ? MINUTES_IN_DAY : workEnd;

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
                  <ul
                    className={cn('flex gap-2', {
                      '[&_img]:bg-green-500': inWorkingHours(selectedTime, offset),
                    })}
                  >
                    {tzGroup.people.map((person) => (
                      <Avatar person={person} key={person.name} asListItem />
                    ))}
                  </ul>
                </div>
                <div
                  className="grid w-full overflow-hidden rounded bg-neutral-200"
                  style={{
                    gridTemplateColumns: `repeat(${QUARTER_HOUR}, 1fr)`,
                  }}
                >
                  {Array.from({ length: QUARTER_HOUR }).map((_, index) => {
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
    </div>
  );
}
