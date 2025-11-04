import { Button } from './ui/button';

interface MobileStickyCTAProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function MobileStickyCTA({ onNavigate, currentPage }: MobileStickyCTAProps) {
  if (currentPage === 'demo') {
    return null;
  }

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 px-4 z-[60] pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      <div className="bg-secondary/95 backdrop-blur-md rounded-full shadow-2xl border border-white/10 flex justify-center p-2 pointer-events-auto mx-auto max-w-sm">
        <Button
          size="lg"
          className="w-full"
          onClick={() => onNavigate('demo')}
          aria-label="Quickly book a DineTalk demo"
        >
          Book a Demo
        </Button>
      </div>
    </div>
  );
}
