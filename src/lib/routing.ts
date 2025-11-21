const pageToPathMap = {
  home: '/',
  about: '/about',
  faq: '/faq',
  contact: '/contact',
  demo: '/demo',
  privacy: '/privacy',
  terms: '/terms',
  perthLanding: '/perth-ai-receptionist',
} as const;

type PageKey = keyof typeof pageToPathMap;

type PageValue = (typeof pageToPathMap)[PageKey];

const normalizePath = (path: string): string => {
  const withoutTrailingSlash = path.replace(/\/+$/, '') || '/';
  return withoutTrailingSlash;
};

export function pageToPath(page: string): PageValue {
  if (page in pageToPathMap) {
    return pageToPathMap[page as PageKey];
  }
  return pageToPathMap.home;
}

export function pathToPage(path: string): PageKey {
  const normalized = normalizePath(path);
  const entry = Object.entries(pageToPathMap).find(([, value]) => value === normalized);
  return (entry ? entry[0] : 'home') as PageKey;
}

export function isKnownPage(page: string): page is PageKey {
  return page in pageToPathMap;
}

export function isKnownPath(path: string): boolean {
  const normalized = normalizePath(path);
  return Object.values(pageToPathMap).includes(normalized as PageValue);
}

export function ensureValidPath(path: string): PageValue {
  const page = pathToPage(path);
  return pageToPath(page);
}

export type { PageKey };
