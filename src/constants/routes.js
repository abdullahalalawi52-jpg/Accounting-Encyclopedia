/**
 * Application Route Paths Constants
 */
export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categories',
  CATEGORY: (id = ':id') => `/category/${id}`,
  ARTICLE: (id = ':id') => `/article/${id}`,
  TEMPLATES: '/templates',
  STANDARDS: '/standards',
  GLOSSARY: '/glossary',
  CALCULATORS: '/calculators',
  CHART_OF_ACCOUNTS: '/chart-of-accounts',
  JOURNAL_ENTRIES: '/journal-entries',
  COURSES: '/courses',
  CERTIFICATIONS: '/certifications',
  TOOLS: '/tools',
  BOOKMARKS: '/bookmarks',
  SEARCH: '/search',
  ABOUT: '/about',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '*',
};

export default ROUTES;
