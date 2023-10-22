import { Person } from '@/types';
import Avatar from './Avatar';
import NewPersonForm from './NewPersonForm';
import { cn } from '@/lib/utils';
import { CheckIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export default function Team({ people, setPeople }: Props) {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing((prev) => !prev);
  const toggleSelect = (person: Person) => {
    const selectedPerson = people.find((p) => p.name === person.name);
    if (!selectedPerson) return;

    selectedPerson.isSelected = !selectedPerson.isSelected;
    setPeople([...people]);
  };

  const deletePerson = (person: Person) => {
    setPeople(people.filter((p) => p.name !== person.name));
  };

  return (
    <section className="mt-20 space-y-6">
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
              'hover:bg-neutral-400 cursor-pointer opacity-20',
              person.isSelected && 'opacity-100',
              editing && 'opacity-100 hover:bg-neutral-200 cursor-default'
            )}
            onClick={() => !editing && toggleSelect(person)}
          >
            {editing && (
              <XIcon
                className="absolute -top-2 -right-2  w-6 h-6  bg-red-500 cursor-pointer text-white rounded-full p-1 hover:bg-red-600"
                onClick={() => deletePerson(person)}
              />
            )}
          </Avatar>
        ))}
        <li className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full cursor-pointer hover:bg-neutral-300 text-neutral-500">
          <PlusIcon className="w-6 h-6" />
        </li>
        <li
          className={cn(
            'flex items-center justify-center w-12 h-12 text-neutral-500 bg-neutral-200 rounded-full cursor-pointer hover:bg-neutral-300',
            editing && 'bg-green-500 text-white hover:bg-green-600'
          )}
          onClick={toggleEditing}
        >
          {editing ? (
            <CheckIcon className="w-6 h-6" />
          ) : (
            <Trash2Icon className="w-6 h-6" />
          )}
        </li>
      </ul>
      <NewPersonForm addPerson={(person: Person) => setPeople([...people, person])} />
    </section>
  );
}
