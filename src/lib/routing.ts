const pageToPathMap = {
  home: '/',
  about: '/about',
  faq: '/faq',
  contact: '/contact',
  demo: '/demo',
  privacy: '/privacy',
  terms: '/terms',
  perthLanding: '/perth-ai-receptionist',
  blog: '/blog',
} as const;

type PageKey = keyof typeof pageToPathMap;

type PageValue = (typeof pageToPathMap)[PageKey];

const normalizePath = (path: string): string => {
  const withoutTrailingSlash = path.replace(/\/+$/, '') || '/';
  return withoutTrailingSlash;
};

export function pageToPath(page: string): string {
  if (page in pageToPathMap) {
    return pageToPathMap[page as PageKey];
  }
  // Handle blog post pages
  if (page.startsWith('blogPost-')) {
    const slug = page.substring(9);
    return `/blog/${slug}`;
  }
  return pageToPathMap.home;
}

export function pathToPage(path: string): string {
  const normalized = normalizePath(path);
  
  // Handle blog post paths
  if (normalized.startsWith('/blog/')) {
    const slug = normalized.substring(6);
    return `blogPost-${slug}`;
  }
  
  const entry = Object.entries(pageToPathMap).find(([, value]) => value === normalized);
  return (entry ? entry[0] : 'home') as PageKey;
}

export function isKnownPage(page: string): boolean {
  return page in pageToPathMap || page.startsWith('blogPost-');
}

export function isKnownPath(path: string): boolean {
  const normalized = normalizePath(path);
  if (normalized.startsWith('/blog/') || normalized === '/blog') {
    return true;
  }
  return Object.values(pageToPathMap).includes(normalized as PageValue);
}

export function ensureValidPath(path: string): string {
  const normalized = normalizePath(path);
  if (normalized.startsWith('/blog/') || normalized === '/blog') {
    return normalized;
  }
  const page = pathToPage(path);
  return pageToPath(page);
}

export type { PageKey };
