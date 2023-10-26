import { MINUTES_IN_DAY } from '@/lib/constants';
import { Person } from '@/lib/types';
import { cn, groupPeopleByTimeZone, timeFromMinutes, withinWorkHours } from '@/lib/utils';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { DayProgressBar } from './DayProgressBar';
import { Slider } from './Slider';

export function Zones({ people }: { people: Person[] }) {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);
  const { hour, minute } = timeFromMinutes(selectedTime);
  const selectedDateTime = DateTime.fromObject({ hour, minute });
  const timeZoneGroups = groupPeopleByTimeZone(people);

  return (
    <section className="space-y-2">
      <h2 className="text-center text-2xl font-medium tracking-tight text-neutral-900">
        Zones
      </h2>
      <div className="relative -mx-8 select-none space-y-6 border bg-white p-6 sm:mx-0 sm:rounded-xl sm:shadow-md">
        <Slider selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        {timeZoneGroups.map(({ timeZone, people, city }) => (
          <Zone
            key={timeZone}
            timeZone={timeZone}
            people={people}
            city={city}
            selectedDateTime={selectedDateTime}
          />
        ))}
      </div>
    </section>
  );
}

type ZoneProps = {
  timeZone: string;
  people: Person[];
  city: string;
  selectedDateTime: DateTime;
};

function Zone({ timeZone, people, city, selectedDateTime }: ZoneProps) {
  const canWork = withinWorkHours(selectedDateTime, timeZone);

  return (
    <div key={timeZone}>
      <div className="mb-2 flex items-end justify-between">
        <div className="text-2xl font-semibold tabular-nums text-green-600 ">
          {selectedDateTime.setZone(timeZone).toFormat('T')}
          <p className="text-sm font-semibold text-neutral-900">{city}</p>
        </div>
        <div className="flex gap-2">
          {people.map((person) => (
            <Avatar
              key={person.name}
              person={person}
              className={cn({ 'bg-green-600': canWork })}
            />
          ))}
        </div>
      </div>
      <DayProgressBar timeZone={timeZone} selectedDateTime={selectedDateTime} />
    </div>
  );
}
