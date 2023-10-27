import { Person } from '@/lib/types';
import { useState } from 'react';
import Select from 'react-select';

type Props = {
  addPerson: (person: Person) => void;
};

type TimeZoneOption = {
  value: string;
  label: string;
};

const timeZoneOptions = Intl.supportedValuesOf('timeZone').map((timeZone) => ({
  value: timeZone,
  label: timeZone,
}));

export function NewPersonForm({ addPerson }: Props) {
  const [name, setName] = useState('');
  const [timeZone, setTimeZone] = useState<TimeZoneOption | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!timeZone || !name) return;

    const person: Person = {
      name: name.trim(),
      timeZone: timeZone.value,
      isSelected: true,
    };

    addPerson(person);

    setName('');
    setTimeZone(null);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-w-full flex-col space-y-4 border-t border-neutral-300 pt-6 sm:min-w-[20rem]"
    >
      <h3 className="text-xl font-medium text-gray-900">New team member</h3>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="rounded-sm border border-neutral-300 px-3 py-1.5 placeholder:text-neutral-500"
          placeholder="John Doe"
          required
          minLength={1}
          maxLength={50}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="timeZone">Time Zone</label>

        <Select
          options={timeZoneOptions}
          onChange={(option) => setTimeZone(option)}
          value={timeZone}
          className="z-30"
          isClearable
          placeholder="Select a time zone"
          required
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium leading-5 text-white shadow-sm  hover:bg-blue-600 "
      >
        Add
      </button>
    </form>
  );
}
