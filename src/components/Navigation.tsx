import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';
import { PageKey, PAGE_PATHS } from '../routes';

interface NavigationProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
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

  const navItems: { name: string; page: PageKey }[] = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'FAQ', page: 'faq' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, page: PageKey) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    onNavigate(page);
  };

  return (
    <nav
      className={`nav-base border-b border-border sticky top-0 z-50 ${
        scrolled ? 'nav-solid' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href={PAGE_PATHS.home}
            onClick={(event) => handleLinkClick(event, 'home')}
            className="flex items-center"
            aria-label="Navigate to DineTalk home page"
          >
            <img src={logo} alt="DineTalk" className="h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.page}
                href={PAGE_PATHS[item.page]}
                onClick={(event) => handleLinkClick(event, item.page)}
                className={`nav-link relative font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary/90'
                }`}
                aria-current={currentPage === item.page ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
            <Button
              asChild
              variant={currentPage === 'demo' ? 'default' : 'secondary'}
              className={
                currentPage === 'demo'
                  ? 'shadow-button'
                  : 'hover:text-accent-foreground'
              }
              aria-current={currentPage === 'demo' ? 'page' : undefined}
              aria-label="Book a DineTalk demo"
            >
              <a
                href={PAGE_PATHS.demo}
                onClick={(event) => handleLinkClick(event, 'demo')}
              >
                Book a Demo
              </a>
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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.page}
                  href={PAGE_PATHS[item.page]}
                  onClick={(event) => {
                    handleLinkClick(event, item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-link text-left font-medium transition-colors duration-200 ${
                    currentPage === item.page
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary/90'
                  }`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
              <Button asChild className="w-full" aria-label="Book a DineTalk demo">
                <a
                  href={PAGE_PATHS.demo}
                  onClick={(event) => {
                    handleLinkClick(event, 'demo');
                    setMobileMenuOpen(false);
                  }}
                >
                  Book a Demo
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
