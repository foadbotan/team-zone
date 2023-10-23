import TimeZonesList from '@/components/TimeZonesList';

export default function Home() {
  return (
    <main className="container py-6">
      <h1 className="m-10 text-center text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Team Zones
      </h1>
      <TimeZonesList />
    </main>
  );
}
