import { Person } from '@/types';
import Avatar from './Avatar';
import AddPersonForm from './AddPersonForm';
import { cn } from '@/lib/utils';
import { CheckIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export default function Team({ people, setPeople }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const EditIcon = isEditing ? CheckIcon : PlusIcon;

  function toggleIsSelected(person: Person) {
    if (isEditing) return;

    setPeople(
      people.map((p) => {
        if (p.name === person.name) p.isSelected = !p.isSelected;
        return p;
      })
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
          <Avatar
            key={person.name}
            person={person}
            asListItem
            className={cn(
              'cursor-pointer opacity-20 hover:bg-neutral-400 ',
              person.isSelected && 'opacity-100',
              isEditing && 'opacity-100 hover:bg-neutral-200 cursor-default'
            )}
            onClick={() => toggleIsSelected(person)}
          >
            {isEditing && (
              <XIcon
                className="absolute -top-2 -right-2  w-6 h-6  bg-red-500 cursor-pointer text-white rounded-full p-1 hover:bg-red-600"
                onClick={() => deletePerson(person)}
              />
            )}
            <span className="max-w-[12ch] truncate capitalize text-xs leading-5 text-neutral-500">
              {person.timeZone.split('/')[1]}
            </span>
          </Avatar>
        ))}
        <li
          className={cn(
            'flex items-center justify-center w-12 h-12 text-neutral-500 bg-neutral-200 rounded-full cursor-pointer hover:bg-neutral-300',
            isEditing && 'bg-green-500 text-white hover:bg-green-600'
          )}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <EditIcon className="w-6 h-6" />
        </li>
      </ul>
      {isEditing && <AddPersonForm addPerson={addPerson} />}
    </section>
  );
}
