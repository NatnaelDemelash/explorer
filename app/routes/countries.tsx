import { Link } from 'react-router';
import type { Route } from './+types/countries';
import { useState } from 'react';

export async function clientLoader() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Provide fallback to handle errors gracefully
    return { error: 'Failed to fetch countries. Please try again later.' };
  }
}

export default function Countries({ loaderData }: Route.ComponentProps) {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const filteredCountry = loaderData.filter((country: any) => {
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());

    const matchesRegion =
      !regionFilter ||
      country.region.toLowerCase() === regionFilter.toLowerCase();

    return matchesSearch && matchesRegion;
  });
  return (
    <div>
      <h1 className="text-2xl mb-5 font-semibold">All Countries</h1>

      <div className="mb-3 flex justify-between items-center px-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border-2 border-gray-700 focus:outline-none px-2 py-1 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border-2 border-gray-700 focus:outline-none px-2 py-1 rounded-md w-1/6"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="africa">Africa</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="americas">Americas</option>
          <option value="oceania">Oceania</option>
          <option value="middle-east">Middle East</option>
        </select>
      </div>

      {filteredCountry.length === 0 ? (
        <div className="text-center text-xl mt-12">
          No Countries Match Your Filtering!
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredCountry.map((country: any, key: number) => (
            <li
              key={key}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-200"
            >
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-16 h-auto object-cover"
              />
              <Link
                to={`/countries/${country.name.common}`}
                className="text-orange-600 font-semibold text-lg hover:underline"
              >
                {country.name.common}
              </Link>
              <div className="text-gray-600 mt-2">
                <p className="font-medium">
                  Region: <span className="font-normal">{country.region}</span>
                </p>
                <p className="font-medium">
                  Subregion:{' '}
                  <span className="font-normal">
                    {country.subregion || 'N/A'}
                  </span>
                </p>
              </div>
              <div className="text-gray-600 mt-2">
                <p className="font-medium">
                  Capital:{' '}
                  <span className="font-normal">
                    {country.capital || 'N/A'}
                  </span>
                </p>
              </div>
              <span className="block mt-3 text-sm text-gray-500">
                Population: {country.population.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
