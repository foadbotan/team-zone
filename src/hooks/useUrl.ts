import { Options, UrlRead, UrlWrite } from '@/types/url';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useUrl<T>(
  key: string,
  { defaultValue, validate, history = 'push' }: Options<T>,
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlValue = urlRead({ key, validate, searchParams });
  const [value, setValue] = useState<T>(urlValue ?? defaultValue);

  useEffect(() => {
    const newValue = urlRead({ key, validate, searchParams });
    if (newValue) setValue(newValue);
  }, [key, validate, searchParams]);

  function updateValue(value?: T) {
    urlWrite({ key, value, history, searchParams, pathname, router });
  }

  return [value, updateValue] as const;
}

function urlRead<T>({ key, validate, searchParams }: UrlRead<T>) {
  try {
    const param = searchParams.get(key);
    if (param === null) throw new Error();
    const value = JSON.parse(param);
    return validate(value);
  } catch (error) {
    return null;
  }
}

function urlWrite<T>({
  key,
  value,
  history = 'push',
  searchParams,
  pathname,
  router,
  scroll = false,
}: UrlWrite<T>) {
  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set(key, JSON.stringify(value));
  } else {
    params.delete(key);
  }

  const url = `${pathname}?${params.toString()}`;
  router[history](url, { scroll });
}
