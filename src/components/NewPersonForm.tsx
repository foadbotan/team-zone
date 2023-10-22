import { Person } from '@/types';

type Props = {
  addPerson: (person: Person) => void;
};

export default function NewPersonForm({ addPerson }: Props): React.ReactElement {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const timeZone = formData.get('timeZone');
    const person: Person = {
      name: String(name),
      timeZone: String(timeZone),
    };

    if (!timeZone) return;

    addPerson(person);
    form.reset();
  }
  return (
    <form onSubmit={onSubmit} className="mt-20 space-y-4">
      <h3 className="text-xl font-medium text-gray-900">Add a team member</h3>
      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="timeZone">Time Zone</label>
          <select
            id="timeZone"
            name="timeZone"
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
          >
            {Intl.supportedValuesOf('timeZone').map((timeZone) => (
              <option key={timeZone}>{timeZone}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}
