import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Toaster } from './components/ui/sonner';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BookDemoPage } from './components/BookDemoPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { PerthLandingPage } from './components/PerthLandingPage';
import { ensureValidPath, pageToPath, pathToPage } from './lib/routing';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    return pathToPage(window.location.pathname);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const normalized = ensureValidPath(window.location.pathname);
    if (normalized !== window.location.pathname) {
      window.history.replaceState({}, '', normalized);
    }
    setCurrentPage(pathToPage(normalized));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setCurrentPage(pathToPage(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Reveal-on-scroll: observe elements with [data-reveal] and add 'in-view' when visible
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    // Function to observe all reveal elements
    const observeElements = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
      document.querySelectorAll('[data-reveal-icon]').forEach((el) => io.observe(el));
    };

    // Initial observation after a short delay
    const timeoutId = setTimeout(observeElements, 100);

    // Set up MutationObserver to detect when new elements are added to the DOM
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    // Observe the entire document for child list changes
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      io.disconnect();
      mutationObserver.disconnect();
    };
  }, [currentPage]); // Re-run when page changes

  const handleNavigate = (page: string) => {
    if (typeof window === 'undefined') {
      setCurrentPage(pathToPage(pageToPath(page)));
      return;
    }

    const targetPath = pageToPath(page);
    const nextPage = pathToPage(targetPath);

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    setCurrentPage(nextPage);
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
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'perthLanding':
        return <PerthLandingPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
  {/* global toast container */}
  <Toaster position="bottom-center" />
      {/* add top padding so fixed header doesn't cover page content, and bottom padding on mobile for sticky CTA */}
      <main className="flex-grow pt-16 pb-0 md:pb-0">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <ScrollToTopButton />
    </div>
  );
}
