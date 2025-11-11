import { useState } from 'react';
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import contactContent from '../content/pages/contact.json';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'submitting'>('idle');
  const page = contactContent;
  const ve = visualEditing({ objectId: 'src/content/pages/contact.json' });

  usePageMetadata({
    title: 'Contact DineTalk | Speak to Our AI Receptionist Team',
    description:
      'Get in touch with DineTalk to discuss AI restaurant receptionists, booking automation, and POS integrations. Based in Perth, supporting restaurants across Australia.',
    keywords: [
      'Contact DineTalk',
      'AI restaurant receptionist support',
      'Restaurant booking automation contact',
    ],
    robots: 'index, follow',
    canonicalUrl: 'https://dinetalk.com.au/contact',
    author: 'DineTalk Australia',
    openGraph: {
      title: 'Contact DineTalk – AI Restaurant Receptionist Australia',
      description:
        'Chat with the DineTalk team about automating restaurant bookings, answering services, and POS integrations.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
      url: 'https://dinetalk.com.au/contact',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact DineTalk | AI Receptionist for Restaurants',
      description:
        'Reach out to our Perth-based team to learn how DineTalk automates restaurant calls and bookings.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact DineTalk',
        description: 'Contact DineTalk to book an AI receptionist demo or request support.',
        url: 'https://dinetalk.com.au/contact',
        publisher: {
          '@type': 'Organization',
          name: 'DineTalk',
          url: 'https://dinetalk.com.au',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+61 403 982 811',
          contactType: 'Sales',
          areaServed: 'AU',
          availableLanguage: 'English',
        },
      },
    ],
  });

  // removed skyline image card and base URL as part of layout refactor

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      'form-name': 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };
    setStatus('submitting');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
    })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        form.reset();
      })
      .catch(() => setStatus('error'));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (status !== 'idle') setStatus('idle');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pt-36 sm:pt-44 md:pt-52 lg:pt-60 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl tracking-tight" {...ve.field('hero.heading')}>
            {page.hero.heading}
          </h1>
          <p className="text-xl text-muted-foreground" {...ve.field('hero.description')}>
            {page.hero.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact Form */}
            <Card data-reveal className="self-start">
              <CardContent className="p-6 md:p-8 flex flex-col gap-5">
                <h2 className="text-2xl tracking-tight mt-2" {...ve.field('hero.formTitle')}>
                  Get in Touch
                </h2>
              <div aria-live="polite" aria-atomic="true" className="space-y-3">
                {status === 'success' && (
                  <Alert variant="success" className="border border-emerald-400/40">
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                    <AlertTitle {...ve.field('hero.successTitle')}>{page.hero.successTitle}</AlertTitle>
                    <AlertDescription {...ve.field('hero.successBody')}>
                      {page.hero.successBody}
                    </AlertDescription>
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert className="border border-destructive/40 bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" aria-hidden />
                    <AlertTitle {...ve.field('hero.errorTitle')}>{page.hero.errorTitle}</AlertTitle>
                    <AlertDescription {...ve.field('hero.errorBody')}>
                      {page.hero.errorBody}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <div className="space-y-3">
                  <Label htmlFor="name" className="leading-relaxed">Name *</Label>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="leading-relaxed">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="leading-relaxed">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(optional)" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="message" className="leading-relaxed">Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="min-h-[150px]" placeholder="Tell us about your restaurant and how we can help..." />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#e58e23] text-white border border-[#e58e23] hover:bg-[#f29b3a] hover:border-[#f29b3a] shadow-md"
                  size="lg"
                  disabled={status === 'submitting'}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {status === 'submitting' ? (
                    <span {...ve.field('hero.submitPending')}>{page.hero.submitPending}</span>
                  ) : (
                    <span {...ve.field('hero.submitDefault')}>{page.hero.submitDefault}</span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* CTA: Prefer to talk block */}
          <Card data-reveal className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h3 className="text-xl tracking-tight" {...ve.field('cta.title')}>
                {page.cta.title}
              </h3>
              <p className="text-primary-foreground/90" {...ve.field('cta.description')}>
                {page.cta.description}
              </p>
              <Button
                className="w-full bg-white text-primary border border-white hover:bg-gray-100 hover:text-primary transition-colors shadow-md font-semibold"
                onClick={() => onNavigate?.(page.cta.button.target)}
                aria-label="Schedule a DineTalk demo call"
                {...ve.field('cta.button.label')}
              >
                {page.cta.button.label}
              </Button>
            </CardContent>
          </Card>
        </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Weekly Hours */}
            <Card data-reveal className="bg-secondary border-0">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div>
                  <h3 className="text-xl tracking-tight" {...ve.field('hours.title')}>
                    {page.hours.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1" {...ve.field('hours.subtitle')}>
                    {page.hours.subtitle}
                  </p>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  {page.hours.entries.map((entry, index) => (
                    <div
                      key={entry.label}
                      className="flex justify-between"
                      {...ve.repeaterItem('hours.entries', index)}
                    >
                      <span {...ve.field(`hours.entries[${index}].label`)}>{entry.label}</span>
                      <span {...ve.field(`hours.entries[${index}].value`)}>{entry.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground/80" {...ve.field('hours.note')}>
                  {page.hours.note}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card data-reveal className="h-full">
              <CardContent className="p-6 md:p-8 space-y-6">
                <h2 className="text-2xl tracking-tight" {...ve.field('contactInfo.title')}>
                  {page.contactInfo.title}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1" {...ve.field('contactInfo.location.heading')}>
                        {page.contactInfo.location.heading}
                      </h3>
                      <p className="text-muted-foreground" {...ve.field('contactInfo.location.body')}>
                        {page.contactInfo.location.body}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1" {...ve.field('contactInfo.phone.heading')}>
                        {page.contactInfo.phone.heading}
                      </h3>
                      <a href={page.contactInfo.phone.href} className="text-primary hover:underline" {...ve.field('contactInfo.phone.number')}>
                        {page.contactInfo.phone.number}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1" {...ve.field('contactInfo.phone.note')}>
                        {page.contactInfo.phone.note}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1" {...ve.field('contactInfo.demo.heading')}>
                        {page.contactInfo.demo.heading}
                      </h3>
                      <a href={page.contactInfo.demo.href} className="text-primary hover:underline" {...ve.field('contactInfo.demo.number')}>
                        {page.contactInfo.demo.number}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1" {...ve.field('contactInfo.demo.note')}>
                        {page.contactInfo.demo.note}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1" {...ve.field('contactInfo.email.heading')}>
                        {page.contactInfo.email.heading}
                      </h3>
                      <a href={page.contactInfo.email.href} className="text-primary hover:underline" {...ve.field('contactInfo.email.address')}>
                        {page.contactInfo.email.address}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
