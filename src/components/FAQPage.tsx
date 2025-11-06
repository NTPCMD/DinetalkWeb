import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { visualEditing } from '../lib/stackbit-sdk';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import faqContent from '../content/pages/faq.json';

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const page = faqContent;
  const ve = visualEditing({ objectId: 'src/content/pages/faq.json' });
  const faqs = page.faqs;

  usePageMetadata({
    title: 'DineTalk FAQ | AI Restaurant Receptionist Questions',
    description:
      'Find answers to common questions about DineTalk’s AI restaurant receptionist, booking automation, POS integrations, and 24/7 call handling.',
    keywords: [
      'AI restaurant FAQ',
      'Restaurant booking automation support',
      'AI receptionist questions',
    ],
    robots: 'index, follow',
    canonicalUrl: 'https://dinetalk.com.au/faq',
    author: 'DineTalk Australia',
    openGraph: {
      title: 'Frequently Asked Questions | DineTalk AI Receptionist',
      description:
        'Learn how DineTalk automates bookings, integrates with POS systems, and supports Australian restaurants 24/7.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
      url: 'https://dinetalk.com.au/faq',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DineTalk FAQ | Restaurant Booking Automation',
      description:
        'Explore answers about AI call handling, integrations, and onboarding for Australian restaurants.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-6" {...ve.field('hero.heading')}>
            {page.hero.heading}
          </h1>
          <p className="text-xl text-muted-foreground" {...ve.field('hero.description')}>
            {page.hero.description}
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8" data-reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                {...ve.repeaterItem('faqs', index)}
              >
                <AccordionTrigger className="text-left" {...ve.field(`faqs[${index}].question`)}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-muted-foreground mt-3 leading-relaxed"
                  {...ve.field(`faqs[${index}].answer`)}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 text-center" data-reveal>
          <h2 className="text-2xl mb-4" {...ve.field('cta.heading')}>
            {page.cta.heading}
          </h2>
          <p className="mb-6 text-primary-foreground/80" {...ve.field('cta.description')}>
            {page.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => onNavigate?.(page.cta.primary.target)}
              size="lg"
              variant="secondary"
              aria-label="Book a meeting with DineTalk"
              {...ve.field('cta.primary.label')}
            >
              {page.cta.primary.label}
            </Button>
            <Button
              onClick={() => onNavigate?.(page.cta.secondary.target)}
              size="lg"
              variant="outline"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Contact the DineTalk team"
              {...ve.field('cta.secondary.label')}
            >
              {page.cta.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
