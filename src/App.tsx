import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BookDemoPage } from './components/BookDemoPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Set up reveal-on-scroll observer once on mount
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

    observerRef.current = io;

    const initialTimer = window.setTimeout(() => {
      document
        .querySelectorAll('[data-reveal], [data-reveal-icon]')
        .forEach((el) => io.observe(el));
    }, 200);

    return () => {
      window.clearTimeout(initialTimer);
      io.disconnect();
      observerRef.current = null;
    };
  }, []);

  // Re-bind reveal observer after navigation so newly rendered sections animate
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = window.setTimeout(() => {
      const observer = observerRef.current;
      if (!observer) return;

      document
        .querySelectorAll('[data-reveal], [data-reveal-icon]')
        .forEach((el) => observer.observe(el));
    }, 200);

    return () => window.clearTimeout(timer);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <ScrollToTopButton />
      <MobileStickyCTA currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

