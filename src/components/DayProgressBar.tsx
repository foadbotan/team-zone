import { MINUTES_IN_DAY } from '@/lib/constants';
import { getLocalOffset } from '@/lib/utils';
import { DateTime } from 'luxon';
import { Day } from './Day';

export function DayProgressBar({
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
        </div>
      </div>
    </div>
  );
}
