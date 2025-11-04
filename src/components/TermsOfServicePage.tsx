import { usePageMetadata } from '../hooks/usePageMetadata';

export function TermsOfServicePage() {
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

  const sections = [
    {
      title: '1. Agreement Overview',
      content: [
        'These terms apply to demos, trials, and services supplied by DineTalk to hospitality venues in Australia.',
        'By requesting a demo, engaging with our AI receptionist, or signing a subscription agreement you accept these terms.',
      ],
    },
    {
      title: '2. Demo & Trial Use',
      content: [
        'Demo access is provided solely for evaluation purposes and may be withdrawn or modified at any time.',
        'You must not share access credentials or use the demo to process real customer data without written approval.',
      ],
    },
    {
      title: '3. Subscriptions & Billing',
      content: [
        'Subscription plans, pricing, and included features are outlined in your proposal or order form.',
        'Invoices are payable within 14 days unless otherwise agreed. Late payments may incur suspension of access.',
        'All fees are quoted in Australian dollars and exclude GST unless stated.',
      ],
    },
    {
      title: '4. Customer Responsibilities',
      content: [
        'Provide accurate business information and notify us of changes to your menu, opening hours, or policies.',
        'Ensure your staff understand how the AI receptionist integrates with your booking and POS systems.',
        'Maintain the security of login credentials and contact us immediately if you suspect unauthorised use.',
      ],
    },
    {
      title: '5. Data & Privacy',
      content: [
        'Personal information is handled in accordance with the DineTalk Privacy Policy.',
        'You are responsible for ensuring you have the authority to share customer information with DineTalk.',
      ],
    },
    {
      title: '6. Service Availability',
      content: [
        'We aim to provide high availability but do not guarantee uninterrupted service. Planned maintenance will be communicated in advance where possible.',
        'DineTalk is not liable for outages caused by third-party providers, telecommunications networks, or events outside our control.',
      ],
    },
    {
      title: '7. Limitation of Liability',
      content: [
        'To the extent permitted by law, DineTalk is not liable for indirect, incidental, or consequential damages.',
        'Our total aggregate liability is limited to the fees paid in the 12 months preceding the claim.',
      ],
    },
    {
      title: '8. Termination',
      content: [
        'Either party may terminate a subscription for convenience with 30 days written notice after the initial term.',
        'We may suspend or terminate access immediately if you breach these terms or misuse the service.',
      ],
    },
    {
      title: '9. Contact',
      content: [
        'Phone: 0403 982 811',
        'Email: hello@dinetalk.com.au',
        'Address: DineTalk, Perth, Western Australia',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center" data-reveal>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Updated 1 September 2024</p>
          <h1 className="text-4xl md:text-5xl">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully to understand your obligations when using the DineTalk platform.
          </p>
        </header>

        <div className="space-y-8" data-reveal>
          {sections.map((section) => (
            <section key={section.title} className="bg-background/80 backdrop-blur rounded-xl shadow-lg border border-white/10 p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <ul className="space-y-3 text-muted-foreground">
                {section.content.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="text-sm text-muted-foreground" data-reveal>
          <p>
            Questions about these terms? Call 0403 982 811 or email{' '}
            <a className="text-primary hover:underline" href="mailto:hello@dinetalk.com.au">
              hello@dinetalk.com.au
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
