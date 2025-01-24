import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('countries', 'routes/countries.tsx'),
  route('countries/:countryName', 'routes/country.tsx'), // Fixed typo here
  // Add more routes as needed...
] satisfies RouteConfig;
