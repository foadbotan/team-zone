'use client';
import { Team } from '@/components/Team';
import { Zones } from '@/components/Zones';
import { initialPeople } from '@/lib/data';
import { useState } from 'react';

export default function Home() {
  const [people, setPeople] = useState(initialPeople);
  const selectedPeople = people.filter(({ isSelected }) => isSelected);

  return (
    <main className="container space-y-12  py-12">
      <h1 className="text-center text-3xl font-bold tracking-tight">Team Zones</h1>
      <Team people={people} setPeople={setPeople} />
      <Zones people={selectedPeople} />
    </main>
  );
}
