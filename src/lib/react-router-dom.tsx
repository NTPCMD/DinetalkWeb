import React, {
  AnchorHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface LocationLike {
  pathname: string;
  search: string;
  hash: string;
}

interface RouterContextValue {
  location: LocationLike;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

interface RouteProps {
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: ReactNode;
}

interface NavLinkClassProps {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}

const RouterContext = createContext<RouterContextValue | null>(null);
const OutletContext = createContext<ReactNode>(null);

function getLocation(): LocationLike {
  if (typeof window === 'undefined') {
    return {
      pathname: '/',
      search: '',
      hash: '',
    };
  }

  const { pathname, search, hash } = window.location;
  return { pathname, search, hash };
}

function normalizePath(path: string): string {
  const url = path || '/';
  return url === '/' ? '/' : url.replace(/\/+$/, '') || '/';
}

function scrollToHash(hash: string) {
  if (typeof window === 'undefined' || !hash) return;
  const id = hash.replace('#', '');
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationLike>(() => getLocation());

  useEffect(() => {
    const onPopState = () => setLocation(getLocation());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;
    const url = new URL(to, window.location.origin);
    if (options?.replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
    setLocation(getLocation());
    if (url.hash) {
      setTimeout(() => scrollToHash(url.hash), 10);
    }
  };

  const value = useMemo(() => ({ location, navigate }), [location]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation(): LocationLike {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useLocation must be used within a BrowserRouter');
  return ctx.location;
}

export function useNavigate(): RouterContextValue['navigate'] {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useNavigate must be used within a BrowserRouter');
  return ctx.navigate;
}

export function Outlet() {
  const outlet = useContext(OutletContext);
  return <>{outlet}</>;
}

function isEventModified(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0);
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented || isEventModified(event)) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

interface NavLinkProps extends Omit<LinkProps, 'children'> {
  children: ReactNode | ((props: NavLinkClassProps) => ReactNode);
  className?: string | ((props: NavLinkClassProps) => string | undefined);
}

export function NavLink({ to, children, className, ...rest }: NavLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const normalizedCurrent = normalizePath(location.pathname);
  const targetUrl = new URL(to, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  const isActive = normalizedCurrent === normalizePath(targetUrl.pathname);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isEventModified(event)) return;
    event.preventDefault();
    navigate(to);
  };

  const renderProps: NavLinkClassProps = {
    isActive,
    isPending: false,
    isTransitioning: false,
  };

  const computedClass =
    typeof className === 'function' ? className(renderProps) : className;

  const content = typeof children === 'function' ? children(renderProps) : children;

  return (
    <a href={to} onClick={handleClick} className={computedClass} {...rest}>
      {content}
    </a>
  );
}

export function Route(_props: RouteProps) {
  return null;
}

export function Routes({ children }: { children: ReactNode }) {
  const location = useLocation();

  const matchRoute = (nodes: ReactNode): ReactNode | null => {
    let matched: ReactNode | null = null;
    React.Children.forEach(nodes, (child) => {
      if (matched || !React.isValidElement<RouteProps>(child)) return;
      const { path, element, children: nestedChildren, index } = child.props as RouteProps;
      const targetPath = normalizePath(location.pathname);
      const routePath = path ? normalizePath(path) : undefined;

      const nestedMatch = nestedChildren ? matchRoute(nestedChildren) : null;
      const isMatch = index ? targetPath === '/' : routePath ? routePath === targetPath || routePath === '/*' : false;

      if (nestedMatch) {
        matched = (
          <OutletContext.Provider value={nestedMatch}>
            {element ?? <Outlet />}
          </OutletContext.Provider>
        );
      } else if (isMatch) {
        matched = element ?? null;
      }
    });
    return matched;
  };

  return <>{matchRoute(children)}</>;
}
