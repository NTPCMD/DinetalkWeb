import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageAnimations() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeElements = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
      document.querySelectorAll('[data-reveal-icon]').forEach((el) => io.observe(el));
    };

    const timeoutId = window.setTimeout(observeElements, 100);
    const mutationObserver = new MutationObserver(observeElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      io.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);
}
