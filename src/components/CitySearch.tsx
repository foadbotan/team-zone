'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useDebounce from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import City from './City';

export type CityMatch = {
  matching_full_name: string;
  _links: {
    'city:item': {
      href: string;
    };
  };
};

type CitySearchResponse = {
  _embedded: {
    'city:search-results': CityMatch[];
  };
};

type SelectOption = {
  value: CityMatch;
  label: string;
};

export default function CitySearch() {
  const [selectedCity, setSelectedCity] = useState<CityMatch | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const url = `https://api.teleport.org/api/cities/?search=${debouncedSearch}`;
  const { data, error, isLoading } = useFetch<CitySearchResponse>(
    debouncedSearch ? url : null
  );

  const selectOptions = data?._embedded['city:search-results'].map((city) => ({
    value: city,
    label: city.matching_full_name,
  }));

  function selectCity(option: SelectOption | null) {
    const city = option?.value ?? null;
    setSelectedCity(city);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Select
        options={selectOptions}
        isLoading={isLoading}
        isClearable
        onChange={(option) => selectCity(option)}
        onInputChange={(value) => setSearch(value)}
        placeholder="Search for a city"
        className="w-96"
        noOptionsMessage={() => (selectOptions?.length ? 'No options' : null)}
      />
      {selectedCity && <City url={selectedCity._links['city:item'].href} />}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
