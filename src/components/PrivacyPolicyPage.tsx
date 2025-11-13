import { visualEditing } from '../lib/stackbit-sdk';
import { usePageMetadata } from '../hooks/usePageMetadata';
import privacyContent from '../content/pages/privacy.json';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function PrivacyPolicyPage() {
  const [tocOpen, setTocOpen] = useState(false);
  const page = privacyContent;
  const ve = visualEditing({ objectId: 'src/content/pages/privacy.json' });
  usePageMetadata({
    title: 'Privacy Policy | DineTalk',
    description:
      'Learn how DineTalk collects, uses, and protects personal information for our AI receptionist platform.',
    canonicalUrl: 'https://dinetalk.com.au/privacy',
    keywords: ['DineTalk privacy', 'data protection', 'restaurant AI privacy'],
    openGraph: {
      title: 'DineTalk Privacy Policy',
      description: 'Details on how DineTalk handles customer and caller information securely.',
      url: 'https://dinetalk.com.au/privacy',
    },
    twitter: {
      card: 'summary',
      title: 'Privacy Policy | DineTalk',
      description: 'Understand how we safeguard the information collected through our AI receptionist.',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'PrivacyPolicy',
        name: 'DineTalk Privacy Policy',
        url: 'https://dinetalk.com.au/privacy',
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
            aria-controls="privacy-toc"
          >
            <span className="font-semibold">Table of Contents</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
          </button>
          <div
            id="privacy-toc"
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
            <a className="text-primary hover:underline" href={page.footer.email.href} {...ve.field('footer.email.label')}>
              {page.footer.email.label}
            </a>{' '}
            or call{' '}
            <span {...ve.field('footer.phone')}>{page.footer.phone}</span>.
          </p>
        </footer>
      </div>
    </div>
  );
}
