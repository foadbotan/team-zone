'use client';
import { Team } from '@/components/Team';
import { Zones } from '@/components/Zones';
import { initialPeople } from '@/lib/data';
import { Person } from '@/lib/types';
import { useQueryState, parseAsJson } from 'next-usequerystate';
import { z } from 'zod';

const isValidTimeZone = (timeZone: string) => {
  const timeZoneOptions = Intl.supportedValuesOf('timeZone');
  return timeZoneOptions.includes(timeZone);
};

const PersonSchema = z.object({
  name: z.string().min(1),
  timeZone: z.string().refine(isValidTimeZone),
  isSelected: z.boolean(),
});

const peopleSchema = z.array(PersonSchema);

function parsePeople(value: unknown): Person[] {
  try {
    return peopleSchema.parse(value);
  } catch {
    return initialPeople;
  }
}

export default function Home() {
  const [people, setPeople] = useQueryState(
    'people',
    parseAsJson<Person[]>(parsePeople).withDefault(initialPeople),
  );
  const selectedPeople = people.filter(({ isSelected }) => isSelected);

  return (
    <main className="container space-y-12  py-12">
      <h1 className="text-center text-3xl font-bold tracking-tight">Team Zones</h1>
      <Team people={people} setPeople={setPeople} />
      <Zones people={selectedPeople} />
    </main>
  );
}
