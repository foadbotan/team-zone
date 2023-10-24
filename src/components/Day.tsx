import { cn, withinWorkHours } from '@/lib/utils';
import { DateTime } from 'luxon';

export function Day({
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
