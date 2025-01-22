import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between mx-auto py-5">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <h1 className="text-lg font-bold text-orange-500 select-none uppercase">
              {' '}
              Explorer
            </h1>
          </NavLink>

          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            <NavLink
              to="/"
              end
              className="inline-block px-3 py-2 text-sm font-semibold tracking-wider text-gray-800 hover:text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              end
              className="inline-block px-3 py-2 text-sm font-semibold tracking-wider text-gray-800 hover:text-gray-900 ml-4 md:ml-0"
            >
              About
            </NavLink>
            <NavLink
              to="/countries"
              end
              className="inline-block px-3 py-2 text-sm font-semibold tracking-wider text-gray-800 hover:text-gray-900 ml-4 md:ml-0"
            >
              Countries
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
