import { Person } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckIcon, SettingsIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { NewPersonForm } from './NewPersonForm';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export function Team({ people, setPeople }: Props) {
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
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Team</h2>

      <div className="-mx-8 space-y-8 rounded-lg border bg-white p-6 shadow-md sm:mx-0 sm:rounded-lg">
        <ul className="flex flex-wrap gap-x-2 gap-y-4">
          {people.map((person) => (
            <li
              key={person.name}
              className="relative flex w-16 flex-col items-center justify-center"
            >
              <Avatar
                name={person.name}
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
          <li className="flex w-16 justify-center">
            <div
              className={cn(
                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-neutral-500 hover:bg-neutral-300 sm:h-12 sm:w-12',
                isEditing && 'bg-green-500 text-white hover:bg-green-600',
              )}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <EditIcon className="h-6 w-6" />
            </div>
          </li>
        </ul>
        {isEditing && <NewPersonForm addPerson={addPerson} />}
      </div>
    </section>
  );
}
