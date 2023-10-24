import { MINUTES_IN_DAY } from '@/lib/constants';
import { cn, getLocalOffset, withinWorkHours } from '@/lib/utils';
import { DateTime } from 'luxon';

type DayProgressBarProps = {
  timeZone: string;
  selectedDateTime: DateTime;
};

type DayProps = {
  selectedDateTime: DateTime;
  daysOffset: number;
  timeZone: string;
};

export function DayProgressBar({ timeZone, selectedDateTime }: DayProgressBarProps) {
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
        </div>
      </div>
    </div>
  );
}

function Day({ selectedDateTime, daysOffset, timeZone }: DayProps) {
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
