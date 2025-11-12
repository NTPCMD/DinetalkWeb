import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import { Button } from './ui/button';
import navigationContent from '../content/navigation.json';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';
import { pageToPath } from '../lib/routing';

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
      className={`border-b border-transparent fixed top-0 left-0 w-full z-50 text-white transition-colors duration-300 ${
        scrolled ? 'nav-solid' : 'nav-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href={pageToPath('home')}
            onClick={(event) => {
              event.preventDefault();
              onNavigate('home');
            }}
            className="flex items-center"
            aria-label="Navigate to DineTalk home page"
          >
            <img src={logo} alt="DineTalk" className="h-10 md:h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.path}
                href={pageToPath(item.path)}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.path);
                }}
                className={`transition-colors nav-link px-2 py-1 ${
                  currentPage === item.path
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-current={currentPage === item.path ? 'page' : undefined}
                {...ve.field(`links[${index}].label`)}
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              className={`bg-[#e58e23] text-white border border-[#e58e23] hover:bg-[#f29b3a] hover:border-[#f29b3a] shadow-md ${
                currentPage === cta.path ? 'shadow-button' : ''
              }`}
              aria-current={currentPage === cta.path ? 'page' : undefined}
              aria-label="Book a DineTalk demo"
              {...ve.field('cta.label')}
            >
              <a
                href={pageToPath(cta.path)}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(cta.path);
                }}
              >
                {cta.label}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#363640] text-white z-40">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={pageToPath(item.path)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors nav-link px-2 py-2 ${
                    currentPage === item.path
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                asChild
                className="shadow-button bg-[#e58e23] text-white border border-[#e58e23] hover:bg-[#f29b3a] hover:border-[#f29b3a] shadow-md"
              >
                <a
                  href={pageToPath(cta.path)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(cta.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {cta.label}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
