import { MINUTES_IN_DAY } from '@/lib/constants';
import { Person } from '@/lib/types';
import {
  cn,
  getLocalOffset,
  groupPeopleByTimeZone,
  timeFromMinutes,
  withinWorkHours,
} from '@/lib/utils';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { Slider } from './Slider';

export function Zone({ people }: { people: Person[] }) {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);

  const { hour, minute } = timeFromMinutes(selectedTime);
  const selectedDateTime = DateTime.fromObject({ hour, minute });

  const timeZoneGroups = groupPeopleByTimeZone(people);

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Zones</h2>
      <div className="relative -mx-8 select-none space-y-6 border bg-white p-6 sm:mx-0 sm:rounded-lg sm:shadow-md">
        <Slider selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        {timeZoneGroups.map(({ timeZone, people, city }) => {
          const canWork = withinWorkHours(selectedDateTime, timeZone);
          return (
            <div key={timeZone}>
              <div className="mb-2 flex items-end justify-between">
                <p className="text-2xl font-semibold tabular-nums text-green-600 ">
                  {selectedDateTime.setZone(timeZone).toFormat('T')}
                  <p className="text-sm font-semibold text-neutral-900">{city}</p>
                </p>
                <div className="flex gap-2">
                  {people.map(({ name }) => (
                    <Avatar
                      name={name}
                      key={name}
                      className={cn({ 'bg-green-600': canWork })}
                    />
                  ))}
                </div>
              </div>
              <DayProgressBar timeZone={timeZone} selectedDateTime={selectedDateTime} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DayProgressBar({
  timeZone,
  selectedDateTime,
}: {
  timeZone: string;
  selectedDateTime: DateTime;
}) {
  const offset = getLocalOffset(timeZone);
  const offsetPercentage = (offset / MINUTES_IN_DAY) * 100;

  return (
    <div className="flex h-6 w-full overflow-hidden rounded bg-neutral-200">
      <div
        className="flex w-[300%] justify-center"
        style={{
          transform: `translateX(${offsetPercentage}%)`,
        }}
      >
        <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
          <p className="col-span-8 col-start-10 flex items-center justify-center rounded bg-blue-400 text-xs font-bold text-white">
            {selectedDateTime.minus({ days: 1 }).toFormat('d LLL')}
          </p>
        </div>
        <Day selectedDateTime={selectedDateTime} timeZone={timeZone} daysOffset={-1} />
        <Day selectedDateTime={selectedDateTime} timeZone={timeZone} daysOffset={0} />
        <Day selectedDateTime={selectedDateTime} timeZone={timeZone} daysOffset={1} />
        <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
          <p className="col-span-8 col-start-10 flex items-center justify-center rounded bg-blue-400 text-xs font-bold text-white">
            {selectedDateTime.plus({ days: 1 }).toFormat('d LLL')}
          </p>
          dD
        </div>
      </div>
    </div>
  );
}

function Day({
  selectedDateTime,
  daysOffset,
  timeZone,
}: {
  selectedDateTime: DateTime;
  daysOffset: number;
  timeZone: string;
}) {
  const date = selectedDateTime.plus({ days: daysOffset });
  const isWorkTime = withinWorkHours(selectedDateTime, timeZone);
  const isSameDay = date.hasSame(selectedDateTime.setZone(timeZone), 'day');

  const canWork = isWorkTime && isSameDay;

  return (
    <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
      <p
        className={cn(
          'col-span-8 col-start-10 flex items-center justify-center rounded bg-blue-400 text-xs font-bold text-white',
          canWork && 'bg-blue-600',
        )}
      >
        {date.toFormat('d LLL')}
      </p>
    </div>
  );
}
