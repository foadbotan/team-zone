import { TIME_ZONES, TIME_ZONE_REGIONS, formatUtcOffset } from '@/lib/utils';
import { Person } from '@/types';

type Props = {
  addPerson: (person: Person) => void;
};

export default function AddPersonForm({ addPerson }: Props) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const timeZone = formData.get('timeZone');
    const person: Person = {
      name: String(name),
      timeZone: String(timeZone),
      isSelected: true,
    };

    if (!timeZone) return;

    addPerson(person);
    form.reset();
  }
  return (
    <form
      onSubmit={onSubmit}
      className="mt-20 space-y-4 flex flex-col max-w-sm border rounded-xl p-6 shadow-md"
    >
      <h3 className="text-xl font-medium text-gray-900">Add a team member</h3>

      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="px-4 py-2 border rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="timeZone">Time Zone</label>
        <select
          id="timeZone"
          name="timeZone"
          className="px-4 py-2 border rounded-md shadow-sm focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm"
          required
        >
          <option value="">Select a time zone</option>

          {Object.keys(TIME_ZONE_REGIONS).map((region) => (
            <optgroup key={region} label={region}>
              {TIME_ZONE_REGIONS[region].map(({ timeZone, city, formattedOffset }) => (
                <option key={timeZone} value={timeZone}>
                  {city} — {formattedOffset}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add
      </button>
    </form>
  );
}
