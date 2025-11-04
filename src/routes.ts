export type PageKey = 'home' | 'about' | 'faq' | 'contact' | 'demo';

export const PAGE_PATHS: Record<PageKey, string> = {
  home: '/',
  about: '/about',
  faq: '/faq',
  contact: '/contact',
  demo: '/book-demo',
};

export function getPageFromPath(pathname: string): PageKey {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  const match = (Object.entries(PAGE_PATHS) as [PageKey, string][])
    .find(([, path]) => path === normalized);

  if (match) {
    return match[0];
  }

  return 'home';
}
