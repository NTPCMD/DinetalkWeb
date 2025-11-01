import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BookDemoPage } from './components/BookDemoPage';
import { AboutPage } from './components/AboutPage';
import { FAQPage } from './components/FAQPage';
import { ContactPage } from './components/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
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
