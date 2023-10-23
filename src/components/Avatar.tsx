import { cn, getAvatarSVGUrl } from '@/lib/utils';
import { Person } from '@/types';
import { XIcon } from 'lucide-react';

type Prop = {
  person: Person;
  className?: string;
  onClick?: () => void;
};

export default function Avatar({ person, className = '', onClick }: Prop) {
  if (!person || !person.name) return;

  return (
    <div className="relative flex flex-col items-center" onClick={onClick}>
      <div
        className={cn('h-12 w-12 overflow-hidden rounded-full bg-neutral-200', className)}
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
      <span className="max-w-[12ch] truncate text-sm font-medium capitalize text-neutral-900">
        {person.name}
      </span>
    </div>
  );
}
