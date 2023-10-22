export type Person = {
  name: string;
  timeZone: string;
  isSelected?: boolean;
};

export type TimeZone = {
  timeZone: string;
  people: Person[];
  offset: number;
};
