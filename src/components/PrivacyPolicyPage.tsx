import { usePageMetadata } from '../hooks/usePageMetadata';

export function PrivacyPolicyPage() {
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

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'Contact details such as your name, email address, and phone number when you request a demo or contact our team.',
        'Business information about your venue that you provide so we can tailor the demo experience.',
        'Call recordings and transcripts generated when you interact with our demo line, used to improve accuracy and support.',
      ],
    },
    {
      title: '2. How We Use Information',
      content: [
        'To respond to enquiries, provide product demos, and manage ongoing customer relationships.',
        'To analyse usage patterns and enhance the quality, security, and reliability of the DineTalk platform.',
        'To meet legal obligations, including record keeping and compliance with Australian privacy legislation.',
      ],
    },
    {
      title: '3. Sharing & Disclosure',
      content: [
        'We do not sell personal information. Data is only shared with trusted service providers who assist with hosting, communications, and analytics.',
        'These providers are bound by contractual obligations to keep your information confidential and secure.',
        'We may disclose information if required by law or to protect the rights, property, or safety of DineTalk and our customers.',
      ],
    },
    {
      title: '4. Data Retention & Security',
      content: [
        'Information is retained only for as long as needed to deliver services or meet regulatory requirements.',
        'We employ encryption, access controls, and regular monitoring to protect against unauthorised access or misuse.',
        'If you would like us to delete your information, contact 0403 982 811 or email privacy@dinetalk.com.au.',
      ],
    },
    {
      title: '5. Your Rights',
      content: [
        'Request access to the personal information we hold about you.',
        'Ask us to correct inaccuracies or update your contact details.',
        'Withdraw consent for marketing communications by following the unsubscribe link or contacting our team.',
      ],
    },
    {
      title: '6. Contact Us',
      content: [
        'Phone: 0403 982 811',
        'Email: privacy@dinetalk.com.au',
        'Postal: DineTalk, Perth, Western Australia',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 text-center" data-reveal>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Updated 1 September 2024</p>
          <h1 className="text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            We are committed to protecting the privacy of restaurants and diners who interact with the DineTalk platform.
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
            If you have questions about this policy or how we handle information, please contact us at{' '}
            <a className="text-primary hover:underline" href="mailto:privacy@dinetalk.com.au">
              privacy@dinetalk.com.au
            </a>{' '}
            or call 0403 982 811.
          </p>
        </footer>
      </div>
    </div>
  );
}
