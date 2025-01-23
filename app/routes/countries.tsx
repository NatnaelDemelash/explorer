import { Link } from 'react-router';
import type { Route } from './+types/countries';
import { useState } from 'react';

export async function clientLoader() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  return data;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const [search, setSearch] = useState('');

  const filteredCountry = loaderData.filter((country: any) => {
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });
  return (
    <div>
      <h1 className="text-2xl mb-5 font-semibold">All Countries</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name..."
          className="border-2 border-gray-700 focus:outline-none px-2 py-1 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul>
        {filteredCountry.map((country: any, key: number) => (
          <li key={key}>
            <Link to={''} className="text-orange-500 font-semibold">
              {country.name.common}
            </Link>
            <div>
              Region: {country.region} | Subregion: {country.subregion}
            </div>
            <div>Capital: {country.capital}</div>
            <span className="text-sm">Population: {country.population}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
