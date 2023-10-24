import { Person } from '@/lib/types';
import { cn, withinWorkHours } from '@/lib/utils';
import { DateTime } from 'luxon';
import { Avatar } from './Avatar';
import { DayProgressBar } from './DayProgressBar';

type Props = {
  timeZone: string;
  people: Person[];
  city: string;
  selectedDateTime: DateTime;
};

export function Zone({ timeZone, people, city, selectedDateTime }: Props) {
  const canWork = withinWorkHours(selectedDateTime, timeZone);

  return (
    <div key={timeZone}>
      <div className="mb-2 flex items-end justify-between">
        <div className="text-2xl font-semibold tabular-nums text-green-600 ">
          {selectedDateTime.setZone(timeZone).toFormat('T')}
          <p className="text-sm font-semibold text-neutral-900">{city}</p>
        </div>
        <div className="flex gap-2">
          {people.map(({ name }) => (
            <Avatar name={name} key={name} className={cn({ 'bg-green-600': canWork })} />
          ))}
        </div>
      </div>
      <DayProgressBar timeZone={timeZone} selectedDateTime={selectedDateTime} />
    </div>
  );
}
