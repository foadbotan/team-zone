'use client';

import { useState } from 'react';

const timeZones = [
  {
    name: 'London',
    offset: 1,
    people: ['Joey', 'Rachel'],
  },
  {
    name: 'Los Angeles',
    offset: -7,
    people: ['Monica'],
  },
  {
    name: 'Sydney',
    offset: 10,
    people: ['Chandler', 'Ross'],
  },
];

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY;

const avatarURL = (seed: string): string =>
  `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}`;

const formatTime = (time: number): string => {
  const hours = Math.floor(time / MINUTES_IN_HOUR);
  const minutes = time % MINUTES_IN_HOUR;

  const hoursString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');

  return `${hoursString}:${minutesString}`;
};

export default function TimeZonesList() {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);

  return (
    <div className="relative py-6">
      <p className="text-xl">{formatTime(selectedTime)}</p>
      <input
        type="range"
        className="absolute inset-0 z-20 bg-transparent appearance-none cursor-pointer "
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
      <ul>
        {timeZones.map((timeZone) => (
          <li key={timeZone.name} className="pb-6">
            <div className="flex items-end justify-between pb-2">
              <div className="">
                <p className="text-sm font-semibold leading-6 text-neutral-900">
                  {timeZone.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  {`UTC ${timeZone.offset < 0 ? '' : '+'}${timeZone.offset}`}
                </p>
              </div>
              <div className="flex gap-2">
                {timeZone.people.map((person) => (
                  <div key={person} className="flex flex-col items-center ">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="inline-block w-12 h-12 rounded-full bg-neutral-200"
                      src={avatarURL(person)}
                      alt={person}
                      width="48"
                      height="48"
                    />
                    <span className="max-w-[12ch] text-xs truncate text-neutral-600">
                      {person}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full overflow-hidden rounded bg-neutral-200">
              <div
                className="flex w-1/2 overflow-hidden rounded"
                style={{
                  transform: `translateX(${(timeZone.offset / 24) * 100}%)`,
                }}
              >
                <div className="w-1/12 bg-blue-300 " />
                <div className="flex items-center justify-center w-full h-6 bg-blue-400"></div>
                <div className="w-2/12 bg-blue-300 " />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
