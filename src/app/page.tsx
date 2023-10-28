'use client';

import { Team } from '@/components/Team';
import { Zones } from '@/components/Zones';
import { useUrl } from '@/hooks/useUrl';
import { initialPeople } from '@/lib/data';
import { PeopleSchema } from '@/lib/validation';
import { People } from '@/types/people';

function validatePeople(value: unknown): People {
  return PeopleSchema.parse(value);
}

export default function Home() {
  const [people, setPeople] = useUrl<People>('people', {
    defaultValue: initialPeople,
    validate: validatePeople,
  });
  const selectedPeople = people.filter(({ isSelected }) => isSelected);

  return (
    <main className="container space-y-12  py-12">
      <h1 className="text-center text-3xl font-bold tracking-tight">Team Zones</h1>
      <Team people={people} setPeople={setPeople} />
      <Zones people={selectedPeople} />
    </main>
  );
}
