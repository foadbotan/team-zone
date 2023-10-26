export type Person = {
  name: string;
  timeZone: string;
  isSelected?: boolean;
};

export type People = Person[];

export type TimeZone = {
  timeZone: string;
  region: string;
  city: string;
  offset: number;
  formattedOffset: string;
};

export type TimeZoneGroup = TimeZone & {
  people: People;
};
