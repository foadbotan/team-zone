import { cn } from '@/lib/utils';
import { Person } from '@/types';
import { CheckIcon, SettingsIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import AddPersonForm from './AddPersonForm';
import Avatar from './Avatar';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export default function Team({ people, setPeople }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = isEditing ? CheckIcon : SettingsIcon;

  function toggleIsSelected(person: Person) {
    if (isEditing) return;

    setPeople(
      people.map((p) => {
        if (p.name === person.name) p.isSelected = !p.isSelected;
        return p;
      }),
    );
  }

  function deletePerson(person: Person) {
    setPeople(people.filter(({ name }) => name !== person.name));
  }

  function addPerson(person: Person) {
    setPeople([...people, person]);
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold leading-tight tracking-tight text-neutral-900">
        Team
      </h2>
      <ul className="flex flex-wrap gap-4">
        {people.map((person) => (
          <li key={person.name} className="relative flex flex-col items-center">
            <Avatar
              person={person}
              className={cn(
                'cursor-pointer opacity-20 hover:bg-neutral-400 ',
                person.isSelected && 'opacity-100',
                isEditing && 'cursor-default opacity-100 hover:bg-neutral-200',
              )}
              onClick={() => toggleIsSelected(person)}
            />
            {isEditing && (
              <XIcon
                className="absolute -right-2 -top-2  h-6 w-6  cursor-pointer rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                onClick={() => deletePerson(person)}
              />
            )}
            <span className="max-w-[12ch] truncate text-xs capitalize text-neutral-500">
              {person.timeZone.split('/')[1]}
            </span>
          </li>
        ))}
        <li
          className={cn(
            'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-neutral-500 hover:bg-neutral-300',
            isEditing && 'bg-green-500 text-white hover:bg-green-600',
          )}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <EditIcon className="h-6 w-6" />
        </li>
      </ul>
      {isEditing && <AddPersonForm addPerson={addPerson} />}
    </section>
  );
}
