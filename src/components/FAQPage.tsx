import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const faqs = [
    {
      question: 'How does the AI receptionist work?',
      answer:
        'DineTalk uses advanced natural language processing to understand and respond to customer calls. The AI can handle bookings, answer menu questions, take orders, and provide information about your restaurant — all in real-time. It learns from your specific restaurant details, menu, and policies to provide accurate, personalized responses.',
    },
    {
      question: 'Can it integrate with my POS system?',
      answer:
        'Yes! DineTalk integrates with most major POS systems used in Australian restaurants. We support popular platforms and can sync reservations, orders, and customer data directly with your existing setup. Our team will work with you during onboarding to ensure seamless integration.',
    },
    {
      question: 'Is it available 24/7?',
      answer:
        'Absolutely. DineTalk operates 24 hours a day, 7 days a week. Whether a customer calls during peak dinner service, early morning, or late at night, your AI receptionist is always ready to answer. You can also configure specific hours when the AI should operate differently based on your restaurant\'s schedule.',
    },
    {
      question: 'What happens if the AI can\'t handle a call?',
      answer:
        'If DineTalk encounters a situation it cannot handle or if a customer requests to speak with a human, the call can be seamlessly transferred to your staff. You have full control over the escalation rules, and our AI is trained to recognize when human intervention is needed.',
    },
    {
      question: 'How long does setup take?',
      answer:
        'Most restaurants are up and running within 3-5 business days. The process involves: (1) Initial consultation to understand your needs, (2) System configuration with your menu, hours, and policies, (3) Integration with your POS if needed, and (4) Testing and training. Our team handles most of the heavy lifting.',
    },
    {
      question: 'Can the AI handle different accents and languages?',
      answer:
        'Yes! DineTalk is designed to understand various Australian accents and can also handle calls in multiple languages. This is particularly useful for restaurants in multicultural areas or those serving diverse customer bases.',
    },
  ];

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
          <h1 className="text-4xl md:text-5xl mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about DineTalk’s AI restaurant receptionist and booking automation
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8" data-reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground mt-3 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 text-center" data-reveal>
          <h2 className="text-2xl mb-4">Still have questions?</h2>
          <p className="mb-6 text-primary-foreground/80">
            Our team is here to help. Get in touch and we'll answer any questions you have.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => onNavigate?.('demo')}
              size="lg"
              variant="secondary"
              aria-label="Book a meeting with DineTalk"
            >
              Book a Meeting
            </Button>
            <Button
              onClick={() => onNavigate?.('contact')}
              size="lg"
              variant="outline"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Contact the DineTalk team"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
