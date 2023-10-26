import { SquareGanttIcon } from 'lucide-react';
import Link from 'next/link';

export function NavBar() {
  return (
    <header className="border-b border-neutral-300  bg-white">
      <div className="container flex items-center justify-between  py-4 sm:py-6 lg:py-8">
        <SquareGanttIcon className="h-6 w-6" />
        <nav className="">
          <ul className="flex items-center justify-between gap-4">
            <li className="cursor-pointer rounded px-6 py-2 text-sm font-medium tracking-wider text-neutral-900 hover:bg-neutral-200">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
