import { useEffect, useState } from 'react';
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

  // scroll handler to toggle nav background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          >
            <img src={logo} alt="DineTalk" className="h-14 w-auto" />
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
            >
              Book a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-link text-left font-medium transition-colors duration-200 ${
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
                onClick={() => {
                  onNavigate('demo');
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
