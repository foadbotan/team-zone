import { useEffect, useState } from 'react';

type FetchState<T> = {
  data?: T;
  error?: Error;
  isLoading: boolean;
};

export default function useFetch<T>(url: string | null, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({ isLoading: true });

  useEffect(() => {
    if (!url) {
      setState({ isLoading: false, data: undefined, error: undefined });
      return;
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setState({ isLoading: false, data }))
      .catch((error) => setState({ isLoading: false, error }));
  }, [url, options]);

  return state;
}
