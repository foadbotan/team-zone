import { MINUTES_IN_DAY } from '@/lib/constants';
import { People, TimeZoneGroup } from '@/lib/types';
import {
  cn,
  getDateTimeFromMinutes,
  groupPeopleByTimeZone,
  withinWorkHours,
} from '@/lib/utils';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { DayProgressBar } from './DayProgressBar';
import { Slider } from './Slider';

export function Zones({ people }: { people: People }) {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);
  const zones = groupPeopleByTimeZone(people);

  return (
    <section className="space-y-2">
      <h2 className="text-center text-2xl font-medium tracking-tight text-neutral-900">
        Zones
      </h2>
      <div className="relative -mx-8 select-none space-y-6 border border-neutral-300 bg-white p-6 sm:mx-0 sm:rounded-xl sm:shadow-md">
        <Slider selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        {zones.map((zone) => (
          <Zone key={zone.timeZone} zone={zone} selectedTime={selectedTime} />
        ))}
      </div>
    </section>
  );
}

type ZoneProps = {
  zone: TimeZoneGroup;
  selectedTime: number;
};

function Zone({ zone, selectedTime }: ZoneProps) {
  const { timeZone, people } = zone;

  const selectedDateTime = getDateTimeFromMinutes(selectedTime);
  const canWork = withinWorkHours(selectedDateTime, timeZone);
  const city = timeZone.split('/')[1];
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
      <DayProgressBar timeZone={timeZone} selectedTime={selectedTime} />
    </div>
  );
}
