import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import { Button } from './ui/button';
import navigationContent from '../content/navigation.json';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstMobileLinkRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflow = useRef({
    bodyOverflow: '',
    htmlOverflow: '',
    bodyPaddingRight: '',
  });
  const touchStartY = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navData = navigationContent;
  const ve = visualEditing({ objectId: 'src/content/navigation.json' });
  const navItems = navData.links;
  const cta = navData.cta;

  // scroll handler to toggle nav background after 100px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
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
    const html = document.documentElement;
    if (!body || !html) {
      return;
    }

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (mobileMenuOpen && isDesktop) {
      previousOverflow.current = {
        bodyOverflow: body.style.overflow,
        htmlOverflow: html.style.overflow,
        bodyPaddingRight: body.style.paddingRight,
      };
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      body.style.overflow = previousOverflow.current.bodyOverflow;
      html.style.overflow = previousOverflow.current.htmlOverflow;
      body.style.paddingRight = previousOverflow.current.bodyPaddingRight;
    }

    return () => {
      body.style.overflow = previousOverflow.current.bodyOverflow;
      html.style.overflow = previousOverflow.current.htmlOverflow;
      body.style.paddingRight = previousOverflow.current.bodyPaddingRight;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      touchStartY.current = null;
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      firstMobileLinkRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <nav
<<<<<<< HEAD
      className={`border-b border-border fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'nav-solid' : 'nav-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
=======
      className={`nav-base border-b border-border sticky top-0 z-50 ${
        scrolled ? 'nav-solid' : ''
      }`}
>>>>>>> c51369b09f471c582ae56759b7df62d080221c89
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center"
            aria-label="Navigate to DineTalk home page"
          >
<<<<<<< HEAD
            <img src={logo} alt="DineTalk" className="h-10 md:h-14 w-auto" />
=======
            <img
              src={logo}
              alt="DineTalk"
              className="h-14 w-auto"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
>>>>>>> c51369b09f471c582ae56759b7df62d080221c89
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
<<<<<<< HEAD
                className={`transition-colors nav-link px-2 py-1 ${
                  currentPage === item.path
                    ? 'text-primary' // active
                    : 'text-foreground'
=======
                className={`nav-link relative font-medium transition-colors duration-200 ${
                  currentPage === item.path
                    ? 'text-primary'
                    : 'text-secondary-foreground hover:text-primary/90'
>>>>>>> c51369b09f471c582ae56759b7df62d080221c89
                }`}
                aria-current={currentPage === item.path ? 'page' : undefined}
                {...ve.field(`links[${index}].label`)}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => onNavigate(cta.path)}
              variant={currentPage === cta.path ? 'default' : 'secondary'}
              className={
                currentPage === cta.path
                  ? 'shadow-button'
                  : 'hover:text-accent-foreground'
              }
              aria-current={currentPage === cta.path ? 'page' : undefined}
              aria-label="Book a DineTalk demo"
              {...ve.field('cta.label')}
            >
              {cta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
<<<<<<< HEAD
            aria-label="Toggle menu"
=======
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
>>>>>>> c51369b09f471c582ae56759b7df62d080221c89
          >
            {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
<<<<<<< HEAD
          <div className="md:hidden py-4 border-t border-border bg-background z-40">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors nav-link px-2 py-2 ${
                    currentPage === item.path
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => {
                  onNavigate('demo');
=======
          <>
            <div
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
              aria-hidden="true"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobile-menu"
              ref={menuRef}
              className="md:hidden fixed inset-x-0 top-20 bottom-0 z-40 border-t border-border bg-secondary text-secondary-foreground shadow-xl overflow-y-auto touch-pan-y"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              style={{
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
                WebkitOverflowScrolling: 'touch',
              }}
              onTouchStart={(event) => {
                touchStartY.current = event.touches[0]?.clientY ?? null;
              }}
              onTouchMove={(event) => {
                if (touchStartY.current === null) {
                  return;
                }
                const currentY = event.touches[0]?.clientY ?? 0;
                const deltaY = currentY - touchStartY.current;
                const menu = menuRef.current;
                if (deltaY > 60 && (menu?.scrollTop ?? 0) <= 0) {
>>>>>>> c51369b09f471c582ae56759b7df62d080221c89
                  setMobileMenuOpen(false);
                  touchStartY.current = null;
                }
              }}
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
                      {...ve.field(`links[${index}].label`)}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      onNavigate(cta.path);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                    aria-label="Book a DineTalk demo"
                    {...ve.field('cta.label')}
                  >
                    {cta.label}
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
