import { cn } from '@/lib/utils';

export function Divider({ className }: { className?: string }) {
  return <div className={cn('mx-auto h-px w-2/3 bg-neutral-200', className)} />;
}
