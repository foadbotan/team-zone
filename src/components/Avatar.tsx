import { cn, getAvatarSVGUrl } from '@/lib/utils';

type Prop = {
  name: string;
  className?: string;
  onClick?: () => void;
};

export function Avatar({ name, className = '', onClick }: Prop) {
  if (!name) return;

  return (
    <div className="relative flex flex-col items-center" onClick={onClick}>
      <div
        className={cn(
          'h-10 w-10 overflow-hidden rounded-full bg-neutral-200 sm:h-12 sm:w-12',
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full object-cover"
          src={getAvatarSVGUrl(name)}
          alt="avatar"
          width="48"
          height="48"
        />
      </div>
      <span className="max-w-[12ch] truncate text-sm font-medium capitalize text-neutral-900">
        {name}
      </span>
    </div>
  );
}
