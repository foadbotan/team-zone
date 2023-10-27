export type Person = {
  name: string;
  timeZone: string;
  isSelected?: boolean;
};

export type People = Person[];

export type TimeZoneGroup = {
  timeZone: string;
  people: People;
};
