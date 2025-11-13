import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import mobileCtaContent from '../content/mobile-cta.json';
import { Button } from './ui/button';

const HIDE_ON_PAGES = new Set(['demo', 'contact']);
const DISMISSED_KEY = 'mobileCTADismissed';

interface MobileStickyCTAProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function MobileStickyCTA({ onNavigate, currentPage }: MobileStickyCTAProps) {
  const [footerVisible, setFooterVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const cta = mobileCtaContent;
  const ve = visualEditing({ objectId: 'src/content/mobile-cta.json' });

  // Check sessionStorage for dismissal state on mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY) === 'true';
    setIsDismissed(dismissed);
  }, []);

  useEffect(() => {
    if (HIDE_ON_PAGES.has(currentPage)) {
      setFooterVisible(false);
      return;
    }

    const footer = document.querySelector('footer');
    if (!footer) {
      setFooterVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setFooterVisible(entries[0].isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [currentPage]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  };

  if (HIDE_ON_PAGES.has(currentPage) || isDismissed) {
    return null;
  }

  const isHidden = footerVisible;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 px-3 z-[60] pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
    >
      <div
        className={`bg-card/98 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 flex flex-col gap-2 p-3 mx-auto max-w-md transition-all duration-300 ease-out ${
          isHidden ? 'translate-y-10 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
        aria-hidden={isHidden}
        style={{ minHeight: '60px' }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss mobile call-to-action"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Button container */}
        <div className="flex gap-2 pt-1">
          <Button
            size="lg"
            className="flex-1 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 font-semibold"
            onClick={() => onNavigate('demo')}
            aria-label="Book a demo with DineTalk"
          >
            Book Demo
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="flex-1 shadow-sm"
            onClick={() => onNavigate('demo')}
            aria-label="Try live AI demo"
          >
            Try AI Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
