import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import mobileCtaContent from '../content/mobile-cta.json';
import { Button } from './ui/button';

const HIDE_ON_PAGES = new Set(['demo', 'contact']);
const DISMISSED_KEY = 'dinetalk-mobile-cta-dismissed';

interface MobileStickyCTAProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  twoButtonMode?: boolean;
}

export function MobileStickyCTA({ onNavigate, currentPage, twoButtonMode = false }: MobileStickyCTAProps) {
  const [footerVisible, setFooterVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const cta = mobileCtaContent;
  const ve = visualEditing({ objectId: 'src/content/mobile-cta.json' });

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
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
        className={`bg-secondary/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-3 mx-auto max-w-sm transition-all duration-300 ease-out ${
          isHidden ? 'translate-y-10 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
        aria-hidden={isHidden}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss call to action"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>

        {twoButtonMode ? (
          <div className="flex gap-2 mt-1">
            <Button
              variant="primary"
              size="default"
              className="flex-1 text-sm min-h-[48px]"
              onClick={() => onNavigate(cta.target)}
              aria-label="Book a DineTalk demo"
              {...ve.field('label')}
            >
              {cta.label}
            </Button>
            <Button
              variant="secondary"
              size="default"
              className="flex-1 text-sm min-h-[48px]"
              onClick={() => onNavigate('demo')}
              aria-label="Try live AI demo"
            >
              Try Demo
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="w-full min-h-[48px]"
            onClick={() => onNavigate(cta.target)}
            aria-label="Quickly book a DineTalk demo"
            {...ve.field('label')}
          >
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
