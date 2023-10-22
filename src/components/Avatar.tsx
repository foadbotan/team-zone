import { cn, getAvatarSVGUrl } from '@/lib/utils';
import { Person } from '@/types';
import { XIcon } from 'lucide-react';

type Prop = {
  person: Person;
  asListItem?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Avatar({
  person,
  asListItem = false,
  className = '',
  onClick,
  children,
}: Prop) {
  if (!person || !person.name) return;

  const Container = asListItem ? 'li' : 'div';

  return (
    <Container className="flex flex-col items-center gap-1 relative" onClick={onClick}>
      <div
        className={cn('w-12 h-12 rounded-full bg-neutral-200 overflow-hidden', className)}
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
      <span className="max-w-[12ch] text-sm truncate text-neutral-600">
        {person.name}
      </span>
      {children}
    </Container>
  );
}
