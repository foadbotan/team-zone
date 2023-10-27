import { MINUTES_IN_DAY } from '@/lib/constants';
import { cn, getDateTimeFromMinutes, getOffset, withinWorkHours } from '@/lib/utils';

type DayProgressBarProps = {
  timeZone: string;
  selectedTime: number;
};

export function DayProgressBar({ timeZone, selectedTime }: DayProgressBarProps) {
  const offset = getOffset(timeZone);
  const offsetPercentage = (offset / MINUTES_IN_DAY) * 100;

  return (
    <div className="flex h-6 w-full overflow-hidden rounded bg-neutral-200">
      <div
        className="flex w-[300%] justify-center"
        style={{
          transform: `translateX(${offsetPercentage}%)`,
        }}
      >
        <DayBlock selectedTime={selectedTime} timeZone={timeZone} offset={-1} />
        <DayBlock selectedTime={selectedTime} timeZone={timeZone} offset={0} />
        <DayBlock selectedTime={selectedTime} timeZone={timeZone} offset={1} />
      </div>
    </div>
  );
}

type DayBlockProps = {
  selectedTime: number;
  offset: number;
  timeZone: string;
};

function DayBlock({ selectedTime, offset, timeZone }: DayBlockProps) {
  const selectedDateTime = getDateTimeFromMinutes(selectedTime);
  const dayBlock = selectedDateTime.plus({ days: offset });

  const isWorkTime = withinWorkHours(selectedDateTime, timeZone);
  const isToday = dayBlock.day === selectedDateTime.setZone(timeZone).day;

  const canWork = isWorkTime && isToday;
  return (
    <div className="grid h-full w-full flex-shrink-0 grid-cols-24">
      <p
        className={cn(
          'col-span-8 col-start-10 flex items-center justify-center rounded bg-blue-400 text-xs font-bold text-white',
          canWork && 'bg-blue-600',
        )}
      >
        {dayBlock.toFormat('d LLL')}
      </p>
    </div>
  );
}
