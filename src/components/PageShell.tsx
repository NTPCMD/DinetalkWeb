import { Outlet } from 'react-router-dom';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { Footer } from './Footer';

export function PageShell() {
  usePageAnimations();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <main className="flex-1 pt-20 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
