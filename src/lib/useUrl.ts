import { useQueryState, parseAsString } from 'next-usequerystate';
import urltron from 'urltron';

export function useUrl<T>(key: string, initialValue: T) {
  const initialValueString = urltron.stringify(initialValue);
  const [value, setValue] = useQueryState(key, { history: 'push' });

  let parsedValue: T = urltron.parse(value ?? initialValueString);
  const updateValue = (newValue: T) => setValue(urltron.stringify(newValue));

  return [parsedValue, updateValue] as const;
}
