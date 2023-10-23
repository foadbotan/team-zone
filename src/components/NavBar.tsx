import Link from 'next/link';
import { LiaGlobeAsiaSolid } from 'react-icons/lia';

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container flex items-center justify-between py-4 sm:py-6 lg:py-8">
        <Link href="/" className="flex items-center gap-2">
          <LiaGlobeAsiaSolid className="h-6 w-6" />
          <span>Team Zones</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="#">About</Link>
            </li>

            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
