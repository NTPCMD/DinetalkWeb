import { visualEditing } from '../lib/stackbit-sdk';
import { usePageMetadata } from '../hooks/usePageMetadata';
import termsContent from '../content/pages/terms.json';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function TermsOfServicePage() {
  const [tocOpen, setTocOpen] = useState(false);
  const page = termsContent;
  const ve = visualEditing({ objectId: 'src/content/pages/terms.json' });
  usePageMetadata({
    title: 'Terms of Service | DineTalk',
    description: 'Review the terms and conditions that govern the use of the DineTalk AI receptionist platform.',
    canonicalUrl: 'https://dinetalk.com.au/terms',
    keywords: ['DineTalk terms', 'service agreement', 'restaurant AI terms'],
    openGraph: {
      title: 'DineTalk Terms of Service',
      description: 'Understand the conditions of use for DineTalk products and services.',
      url: 'https://dinetalk.com.au/terms',
    },
    twitter: {
      card: 'summary',
      title: 'Terms of Service | DineTalk',
      description: 'Key legal terms for restaurants using DineTalk demos and services.',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'TermsOfService',
        name: 'DineTalk Terms of Service',
        url: 'https://dinetalk.com.au/terms',
        dateModified: '2024-09-01',
        publisher: {
          '@type': 'Organization',
          name: 'DineTalk',
          url: 'https://dinetalk.com.au',
        },
      },
    ],
  });

  const sections = page.sections;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center" data-reveal>
          <p className="text-sm uppercase tracking-widest text-muted-foreground" {...ve.field('updated')}>
            {page.updated}
          </p>
          <h1 className="text-4xl md:text-5xl" {...ve.field('hero.heading')}>
            {page.hero.heading}
          </h1>
          <p className="text-lg text-muted-foreground" {...ve.field('hero.description')}>
            {page.hero.description}
          </p>
        </header>

        {/* Mobile Table of Contents */}
        <div className="md:hidden bg-card rounded-xl shadow-md border border-white/10 overflow-hidden" data-reveal>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            aria-expanded={tocOpen}
            aria-controls="terms-toc"
          >
            <span className="font-semibold">Table of Contents</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
          </button>
          <div
            id="terms-toc"
            className={`transition-all duration-300 ease-in-out ${
              tocOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-y-auto`}
          >
            <nav className="p-4 pt-0 space-y-2">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index}`}
                  onClick={() => setTocOpen(false)}
                  className="block py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-white/5 rounded-md transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="space-y-8" data-reveal>
          {sections.map((section, index) => (
            <section
              key={section.title}
              id={`section-${index}`}
              className="bg-background/80 backdrop-blur rounded-xl shadow-lg border border-white/10 p-5 md:p-8 space-y-4 scroll-mt-20"
              {...ve.repeaterItem('sections', index)}
            >
              <h2 className="text-xl md:text-2xl font-semibold" {...ve.field(`sections[${index}].title`)}>
                {section.title}
              </h2>
              <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="leading-relaxed"
                    {...ve.field(`sections[${index}].items[${itemIndex}]`)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="text-sm text-muted-foreground" data-reveal>
          <p>
            <span {...ve.field('footer.text')}>{page.footer.text}</span>{' '}
            Call <span {...ve.field('footer.phone')}>{page.footer.phone}</span> or email{' '}
            <a className="text-primary hover:underline" href={page.footer.email.href} {...ve.field('footer.email.label')}>
              {page.footer.email.label}
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
