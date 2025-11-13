import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { visualEditing } from '../lib/stackbit-sdk';
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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl mb-4 md:mb-6" {...ve.field('hero.heading')}>
            {page.hero.heading}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground" {...ve.field('hero.description')}>
            {page.hero.description}
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8" data-reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                {...ve.repeaterItem('faqs', index)}
              >
                <AccordionTrigger 
                  className="text-left text-base md:text-lg py-4 hover:no-underline" 
                  {...ve.field(`faqs[${index}].question`)}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-muted-foreground mt-2 md:mt-3 leading-relaxed text-sm md:text-base pb-4"
                  {...ve.field(`faqs[${index}].answer`)}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 md:mt-10 text-center" data-reveal>
          <h2 className="text-xl md:text-2xl mb-3 md:mb-4">Still have questions?</h2>
          <p className="mb-6 text-sm md:text-base text-muted-foreground">
            Our team is here to help. Get in touch and we'll answer any questions you have.
          </p>
          <div className="flex items-center justify-center">
            <Button
              variant="primary"
              size="lg"
              className="gap-3 min-h-[48px]"
              onClick={() => onNavigate?.('contact')}
            >
              <Mail size={18} />
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
