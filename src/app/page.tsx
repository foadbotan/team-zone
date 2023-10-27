'use client';

import { Team } from '@/components/Team';
import { Zones } from '@/components/Zones';
import { initialPeople } from '@/lib/data';
import { People } from '@/lib/types';
import { PeopleSchema } from '@/lib/validation';
import { useQueryState, parseAsJson } from 'next-usequerystate';

function validatePeople(value: unknown): People {
  return PeopleSchema.parse(value);
}

export default function Home() {
  const [people, setPeople] = useQueryState(
    'people',
    parseAsJson<People>(validatePeople).withDefault(initialPeople),
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
