import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 hidden sm:block md:right-8">
      <Button
        type="button"
        size="icon"
        className={cn(
          'rounded-full shadow-primary/35',
          'bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-700 transition-colors shadow-md'
        )}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }}
        aria-label="Scroll back to the top of the page"
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </div>
  );
}
