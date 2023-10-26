import { MINUTES_IN_DAY } from '@/lib/constants';
import { formatTime } from '@/lib/utils';

type SliderProps = {
  selectedTime: number;
  setSelectedTime: (time: number) => void;
};

export function Slider({ selectedTime, setSelectedTime }: SliderProps) {
  const offsetPercentage = (selectedTime / MINUTES_IN_DAY) * 100;
  return (
    <div className="absolute bottom-0 left-6 right-6 top-0 z-10 overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 top-0 z-10 w-1 select-none bg-green-600"
        style={{
          left: `${offsetPercentage}%`,
        }}
      >
        <p
          className="flex w-fit flex-col items-center justify-center rounded bg-green-600 px-3 py-1"
          style={{
            transform: `translateX(${-offsetPercentage}%)`,
          }}
        >
          <span className="text-center  font-bold text-white">
            {formatTime(selectedTime)}
          </span>
          <span className="whitespace-nowrap text-xs text-white">Your time</span>
        </p>
      </div>
      <input
        type="range"
        className="relative h-full w-full cursor-pointer appearance-none bg-transparent focus:outline-none "
        min={0}
        max={MINUTES_IN_DAY - 1}
        step={15}
        value={selectedTime}
        onChange={(event) => setSelectedTime(Number(event.target.value))}
      />
    </div>
  );
}
