import { People } from '@/types/people';

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';

export const initialPeople: People = [
  { name: 'ME', timeZone: localTimeZone, isSelected: true },
  { name: 'Joey', timeZone: 'Europe/London', isSelected: true },
  { name: 'Rachel', timeZone: 'Europe/Moscow', isSelected: true },
  { name: 'Monica', timeZone: 'America/Los_Angeles', isSelected: false },
  { name: 'Chandler', timeZone: 'Australia/Sydney', isSelected: false },
  { name: 'Ross', timeZone: 'Australia/Sydney', isSelected: true },
  { name: 'Janice', timeZone: 'Asia/Tokyo', isSelected: true },
  { name: 'Phoebe', timeZone: 'Africa/Bamako', isSelected: false },
];
