'use client';
import CitySearch from '@/components/CitySearch';

export default function Home() {
  return (
    <main className="p-10 flex flex-col items-center gap-10">
      <h1 className="text-4xl font-bold text-center">Cities</h1>
      <CitySearch />
    </main>
  );
}
