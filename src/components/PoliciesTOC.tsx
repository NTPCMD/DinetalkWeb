import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
  title: string;
  id: string;
}

interface PoliciesTOCProps {
  sections: Section[];
}

export function PoliciesTOC({ sections }: PoliciesTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close TOC on mobile after navigation
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="md:sticky md:top-20 bg-card rounded-xl shadow-lg border border-white/10 overflow-hidden mb-8">
      {/* Mobile: Collapsible header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between p-4 text-left font-semibold hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
        aria-controls="toc-content"
      >
        <span>Table of Contents</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" aria-hidden />
        ) : (
          <ChevronDown className="w-5 h-5" aria-hidden />
        )}
      </button>

      {/* Desktop: Always visible header */}
      <div className="hidden md:block p-4 font-semibold border-b border-white/10">
        Table of Contents
      </div>

      {/* TOC Content */}
      <nav
        id="toc-content"
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block p-4 md:p-0`}
        aria-label="Table of contents navigation"
      >
        <ul className="space-y-1 md:py-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-md md:rounded-none"
              >
                {index + 1}. {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
