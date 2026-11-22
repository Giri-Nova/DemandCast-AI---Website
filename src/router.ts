export type PageRoute =
  | 'home'
  | 'features'
  | 'how-it-works'
  | 'get-started'
  | 'parameters'
  | 'outputs'
  | 'limits-faq'
  | 'download';

const ROUTE_TO_HASH: Record<PageRoute, string> = {
  home: '#/',
  features: '#/features',
  'how-it-works': '#/how-it-works',
  'get-started': '#/get-started',
  parameters: '#/parameters',
  outputs: '#/outputs',
  'limits-faq': '#/limits-faq',
  download: '#/download',
};

const HASH_TO_ROUTE: Record<string, PageRoute> = {
  '': 'home',
  '#': 'home',
  '#/': 'home',
  '#/home': 'home',
  '#/features': 'features',
  '#/how-it-works': 'how-it-works',
  '#/get-started': 'get-started',
  '#/parameters': 'parameters',
  '#/outputs': 'outputs',
  '#/limits-faq': 'limits-faq',
  '#/download': 'download',
};

export function getRouteFromHash(hash: string): PageRoute {
  const normalized = hash.trim().toLowerCase();
  return HASH_TO_ROUTE[normalized] ?? 'home';
}

export function getHashForRoute(route: PageRoute): string {
  return ROUTE_TO_HASH[route];
}
