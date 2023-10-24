import { MINUTES_IN_DAY } from '@/lib/constants';
import { Person } from '@/lib/types';
import { groupPeopleByTimeZone, timeFromMinutes } from '@/lib/utils';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Slider } from './Slider';
import { Zone } from './Zone';

export function Zones({ people }: { people: Person[] }) {
  const [selectedTime, setSelectedTime] = useState(MINUTES_IN_DAY / 2);

  const { hour, minute } = timeFromMinutes(selectedTime);
  const selectedDateTime = DateTime.fromObject({ hour, minute });

  const timeZoneGroups = groupPeopleByTimeZone(people);

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Zones</h2>
      <div className="relative -mx-8 select-none space-y-6 border bg-white p-6 sm:mx-0 sm:rounded-lg sm:shadow-md">
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
