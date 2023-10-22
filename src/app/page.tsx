import TimeZonesList from '@/components/TimeZonesList';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 text-center m-4">
        Team Zones
      </h1>
      <TimeZonesList />
    </main>
  );
}
