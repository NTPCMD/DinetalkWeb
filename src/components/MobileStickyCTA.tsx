import { useEffect, useState } from 'react';
import { visualEditing } from '../lib/stackbit-sdk';
import mobileCtaContent from '../content/mobile-cta.json';
import { Button } from './ui/button';
import { PRIMARY_BUTTON_CLASSES } from '../lib/buttonStyles';

const HIDE_ON_PAGES = new Set(['demo', 'contact']);

interface MobileStickyCTAProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function MobileStickyCTA({ onNavigate, currentPage }: MobileStickyCTAProps) {
  const [footerVisible, setFooterVisible] = useState(false);
  const cta = mobileCtaContent;
  const ve = visualEditing({ objectId: 'src/content/mobile-cta.json' });

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

  if (HIDE_ON_PAGES.has(currentPage)) {
    return null;
  }

  const isHidden = footerVisible;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 px-4 z-[60] pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      <div
        className={`bg-secondary/95 backdrop-blur-md rounded-full shadow-2xl border border-white/10 flex justify-center p-2 mx-auto max-w-sm transition-all duration-300 ease-out ${
          isHidden ? 'translate-y-10 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
        aria-hidden={isHidden}
      >
        <Button
          size="lg"
          className={`w-full ${PRIMARY_BUTTON_CLASSES}`}
          onClick={() => onNavigate(cta.target)}
          aria-label="Quickly book a DineTalk demo"
          {...ve.field('label')}
        >
          {cta.label}
        </Button>
      </div>
    </div>
  );
}
