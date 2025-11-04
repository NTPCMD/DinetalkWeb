import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BookDemoPage } from './components/BookDemoPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { getPageFromPath, PAGE_PATHS, PageKey } from './routes';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>(() => {
    if (typeof window === 'undefined') return 'home';
    return getPageFromPath(window.location.pathname);
  });

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const normalizedPath = PAGE_PATHS[getPageFromPath(window.location.pathname)];
    if (window.location.pathname !== normalizedPath) {
      window.history.replaceState({}, '', normalizedPath);
      setCurrentPage(getPageFromPath(normalizedPath));
    }

    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const scriptId = 'dinetalk-organization-ld-json';
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DineTalk',
      url: 'https://dinetalk.com.au',
      logo: 'https://dinetalk.com.au/assets/logo.png',
      sameAs: [
        'https://www.instagram.com/dinetalk_ai',
        'https://www.linkedin.com/company/dinetalk',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+61403982811',
        contactType: 'Customer Support',
        areaServed: 'AU',
        availableLanguage: 'English',
      },
    } as const;

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.text = JSON.stringify(schema);
  }, []);

  const handleNavigate = (page: PageKey, options?: { replace?: boolean }) => {
    setCurrentPage(page);

    if (typeof window === 'undefined') return;

    const path = PAGE_PATHS[page];
    const method: 'pushState' | 'replaceState' = options?.replace ? 'replaceState' : 'pushState';

    if (window.location.pathname !== path) {
      window.history[method]({}, '', path);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'demo':
        return <BookDemoPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <MobileStickyCTA currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

// Reveal-on-scroll: observe elements with [data-reveal] and add 'in-view' when visible
// This runs once when the app mounts.
// Note: we attach to window since pages are client-rendered inside the single-page app.
if (typeof window !== 'undefined') {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
        }
      });
    },
    { threshold: 0.12 }
  );

  // Observe existing elements with data-reveal
  setTimeout(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    // also observe icon draw elements by observing their parent containers
    document.querySelectorAll('[data-reveal-icon]').forEach((el) => io.observe(el));
  }, 500);
}
