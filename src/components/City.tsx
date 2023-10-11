import useFetch from '@/hooks/useFetch';
import { CityMatch } from './CitySearch';

type Props = {
  url: string;
};

type CityDetails = {
  full_name: string;
  geoname_id: number;
  location: {
    latlon: {
      latitude: number;
      longitude: number;
    };
  };
};

export default function City({ url }: Props) {
  const { data, error, isLoading } = useFetch<CityDetails>(url);

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold">{data?.full_name}</h2>
    </div>
  );
}
