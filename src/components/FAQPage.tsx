import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about DineTalk
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 bg-primary text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl mb-4">Still have questions?</h2>
          <p className="mb-6 opacity-90">
            Our team is here to help. Get in touch and we'll answer any questions you have.
          </p>
          <div className="flex items-center justify-center">
            <button
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-md font-medium hover:opacity-95"
              onClick={() => onNavigate?.('demo')}
            >
              Book a Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
