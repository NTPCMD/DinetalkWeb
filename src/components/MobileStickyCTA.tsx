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
    <div className="md:hidden fixed inset-x-0 bottom-4 px-4 z-[60] pointer-events-none">
      <div className="bg-secondary/95 backdrop-blur-md rounded-full shadow-2xl border border-white/10 flex justify-center p-2 pointer-events-auto">
        <Button size="lg" className="w-full" onClick={() => onNavigate('demo')} aria-label="Quick book a DineTalk demo">
          Book a Demo
        </Button>
      </div>
    </div>
  );
}
