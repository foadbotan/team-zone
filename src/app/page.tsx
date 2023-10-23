import TimeZonesList from '@/components/TimeZonesList';

export default function Home() {
  return (
    <main className="container py-6">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 text-center m-10">
        Team Zones
      </h1>
      <TimeZonesList />
    </main>
  );
}
