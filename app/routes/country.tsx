import type { Route } from './+types/country';

import googleMapIcon from '../../public/google-map.png';

// Define the type for loaderData (the country data object)
interface CountryData {
  name: {
    common: string;
    official: string;
  };
  region: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  area?: number;
  flags: {
    svg: string;
    png: string;
  };
  maps?: {
    googleMaps: string;
  };
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  timezones?: string[];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const countryName = params.countryName;

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        countryName
      )}?fullText=true`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch country details. Status: ${res.status}`);
    }
    const data = await res.json();
    return data[0]; // Return the first match
  } catch (error) {
    console.error('Error fetching country details:', error);
    throw error;
  }
}

export default function Country({ loaderData }: { loaderData: CountryData }) {
  const { name, region, subregion, capital, population, area, flags, maps } =
    loaderData;

  const googleMapsUrl = maps?.googleMaps || '';
  const flagUrl = flags?.svg || flags?.png;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Country Flag */}
          <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
            <img
              src={flagUrl}
              alt={`${name?.common} flag`}
              className="w-48 h-auto rounded-md border object-contain"
            />
          </div>

          {/* Country Info */}
          <div className="w-full md:w-2/3 md:pl-6">
            <h1 className="text-3xl font-bold text-gray-800">{name?.common}</h1>
            <p className="text-lg text-gray-600">
              Official Name: {name?.official}
            </p>
            <div className="mt-4 text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Region:</span> {region}
              </p>
              <p>
                <span className="font-semibold">Subregion:</span>{' '}
                {subregion || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {capital?.[0] || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {population?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Area:</span>{' '}
                {area?.toLocaleString()} km²
              </p>
            </div>
          </div>
        </div>

        {/* Additional Country Info Section */}
        <div className="mt-6 text-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            More Information
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Currency: </span>
              {loaderData.currencies
                ? Object.values(loaderData.currencies)[0].name
                : 'N/A'}
            </li>
            <li>
              <span className="font-semibold">Languages: </span>
              {Object.values(loaderData.languages || {}).join(', ') || 'N/A'}
            </li>
            <li>
              <span className="font-semibold">Timezone: </span>
              {loaderData.timezones ? loaderData.timezones[0] : 'N/A'}
            </li>
          </ul>
        </div>

        {/* Google Maps Section with Link and Icon */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Location on the Map
          </h2>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:underline"
          >
            <img src={googleMapIcon} alt="Google Maps" className="w-6 h-6" />

            <span>View on Google Maps</span>
          </a>
          <p className="text-gray-500 mt-2 text-sm">
            Click the icon to view the country on Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
}
