import { RouteObject } from 'react-router';
import Layout from '@/components/Layout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Translate from '@/pages/Translate';
import GenerateSentences from '@/pages/GenerateSentences'
import NotFound from '@/pages/NotFound';

// Define your route structure
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'translate',
        element: <Translate />
      },
      {
        path: 'sentences',
        element: <GenerateSentences />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
];

// Nav items for the layout
export const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/translate', label: 'Translate'},
  { path: '/sentences', label: 'Sentences'},
];
