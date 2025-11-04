import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflow = useRef<string>('');

  // scroll handler to toggle nav background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const body = document.body;
    if (!body) {
      return;
    }

    if (mobileMenuOpen) {
      previousOverflow.current = body.style.overflow;
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = previousOverflow.current;
    }

    return () => {
      body.style.overflow = previousOverflow.current;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      firstMobileLinkRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'FAQ', path: 'faq' },
    { name: 'Contact', path: 'contact' },
  ];

  return (
    <nav
      className={`nav-base border-b border-border sticky top-0 z-50 ${
        scrolled ? 'nav-solid' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center"
            aria-label="Navigate to DineTalk home page"
          >
            <img
              src={logo}
              alt="DineTalk"
              className="h-14 w-auto"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`nav-link relative font-medium transition-colors duration-200 ${
                  currentPage === item.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary/90'
                }`}
                aria-current={currentPage === item.path ? 'page' : undefined}
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={() => onNavigate('demo')}
              variant={currentPage === 'demo' ? 'default' : 'secondary'}
              className={
                currentPage === 'demo'
                  ? 'shadow-button'
                  : 'hover:text-accent-foreground'
              }
              aria-current={currentPage === 'demo' ? 'page' : undefined}
              aria-label="Book a DineTalk demo"
            >
              Book a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
              aria-hidden="true"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobile-menu"
              className="md:hidden fixed inset-x-0 top-20 z-40 border-t border-border bg-secondary text-secondary-foreground shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <button
                      key={item.path}
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      onClick={() => {
                        onNavigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`nav-link text-left font-medium transition-colors duration-200 ${
                        currentPage === item.path
                          ? 'text-primary'
                          : 'text-secondary-foreground hover:text-primary/90'
                      }`}
                      aria-current={currentPage === item.path ? 'page' : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      onNavigate('demo');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                    aria-label="Book a DineTalk demo"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
