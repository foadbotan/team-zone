import { Person } from '@/lib/types';
import { cn, getAvatarSVGUrl } from '@/lib/utils';

type Prop = {
  person: Person;
  className?: string;
  onClick?: () => void;
};

function isMe(person: Person) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return person.timeZone === localTimeZone && person.name === 'ME';
}

export function Avatar({ person, className = '', onClick }: Prop) {
  if (!person || !person.name) return;

  return (
    <div className="relative flex flex-col items-center" onClick={onClick}>
      <div
        className={cn(
          'h-10 w-10 overflow-hidden rounded-full bg-neutral-200 sm:h-12 sm:w-12',
          className,
          isMe(person) && 'border border-b-4 border-current',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full object-cover"
          src={getAvatarSVGUrl(person.name)}
          alt="avatar"
          width="48"
          height="48"
        />
      </div>
      <span className=" max-w-[12ch] truncate text-sm font-medium capitalize  text-neutral-900">
        {person.name}
      </span>
    </div>
  );
}
