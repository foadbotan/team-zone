import { z } from 'zod';

const isValidTimeZone = (timeZone: string) => {
  const timeZoneOptions = Intl.supportedValuesOf('timeZone');
  return timeZoneOptions.includes(timeZone);
};

export const PersonSchema = z.object({
  name: z.string().min(1),
  timeZone: z.string().refine(isValidTimeZone),
  isSelected: z.boolean(),
});

export const PeopleSchema = z.array(PersonSchema);
