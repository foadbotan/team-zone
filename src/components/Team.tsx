import { cn } from '@/lib/utils';
import { CheckIcon, SettingsIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { NewPersonForm } from './NewPersonForm';
import { People, Person } from '@/types/people';

type Props = {
  people: People;
  setPeople: (people: People) => void;
};

export function Team({ people, setPeople }: Props) {
  const [isEditing, setIsEditing] = useState(false);

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
    <section className="space-y-2" data-testid="team">
      <h2 className="text-center text-2xl font-medium tracking-tight text-neutral-900">
        Team
      </h2>

      <div className="-mx-8 flex flex-col items-center space-y-8 border border-neutral-300 bg-white p-6 sm:mx-auto sm:w-fit sm:rounded-xl sm:shadow-md">
        <ul className="flex flex-wrap justify-center gap-x-2 gap-y-4">
          {people.map((person) => (
            <li
              key={person.name}
              className={cn(
                'relative flex w-16 flex-col items-center justify-center',
                !person.isSelected && 'opacity-30',
                isEditing && 'opacity-100',
              )}
            >
              <Avatar
                person={person}
                className={cn(!isEditing && 'cursor-pointer hover:bg-neutral-400')}
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
            <EditButton
              isEditing={isEditing}
              toggleEditing={() => setIsEditing((prev) => !prev)}
            />
          </li>
        </ul>
        {isEditing && (
          <NewPersonForm data-testid="new-person-form" addPerson={addPerson} />
        )}
      </div>
    </section>
  );
}

function EditButton({
  isEditing,
  toggleEditing,
}: {
  isEditing: boolean;
  toggleEditing: () => void;
}) {
  const EditIcon = isEditing ? CheckIcon : SettingsIcon;

  return (
    <button
      data-testid="edit-button"
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-neutral-500 hover:bg-neutral-300 sm:h-12 sm:w-12',
        isEditing && 'bg-green-500 text-white hover:bg-green-600',
      )}
      onClick={toggleEditing}
    >
      <EditIcon className="h-6 w-6" />
    </button>
  );
}
