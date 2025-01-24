export default function About() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          About This App
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to the Country Explorer app! This application allows you to
          explore detailed information about countries around the world. Whether
          you’re looking for population data, regional details, or simply
          curious to see a country’s flag and map, this app has you covered.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Features
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Search for any country and view details like population, area,
            capital, and more.
          </li>
          <li>
            Browse all countries by region or filter them using a simple search
            bar.
          </li>
          <li>
            View country flags and get quick access to their locations on Google
            Maps.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Purpose
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          This app is built to provide users with quick and easy access to
          global information in an interactive way. It’s perfect for students,
          travelers, or anyone curious about the world.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Technologies Used
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Frontend:</span> React with
            TypeScript for a robust and interactive user interface.
          </li>
          <li>
            <span className="font-semibold">API:</span> Data fetched from the{' '}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              REST Countries API
            </a>
            .
          </li>
          <li>
            <span className="font-semibold">Styling:</span> Tailwind CSS for
            clean and responsive design.
          </li>
        </ul>
      </div>
    </div>
  );
}
