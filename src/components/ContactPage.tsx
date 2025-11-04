import { useState } from 'react';
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

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

  const perthSkylineImageBase =
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwZXJ0aCUyMGF1c3RyYWxpYXxlbnwxfHx8fDE3NjExOTAyMDR8MA&ixlib=rb-4.1.0&q=80';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl md:text-5xl mb-5 sm:mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions about AI restaurant receptionists or booking automation? We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <Card data-reveal className="self-start h-full">
            <CardContent className="p-6 md:p-8 flex flex-col gap-6 sm:gap-7">
              <h2 className="text-2xl">Send us a Message</h2>
              <div aria-live="polite" aria-atomic="true" className="space-y-3">
                {status === 'success' && (
                  <Alert variant="success" className="border border-emerald-400/40">
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                    <AlertTitle>Message sent</AlertTitle>
                    <AlertDescription>
                      Thanks for reaching out! Our team will reply to your email shortly.
                    </AlertDescription>
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert className="border border-destructive/40 bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" aria-hidden />
                    <AlertTitle>Something went wrong</AlertTitle>
                    <AlertDescription>
                      Sorry, your message didn’t go through. Please try again in a moment.
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
                <div>
                  <Label htmlFor="name" className="mb-2">Name *</Label>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(optional)" />
                </div>
                <div>
                  <Label htmlFor="message" className="mb-2">Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="min-h-[150px]" placeholder="Tell us about your restaurant and how we can help..." />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>
                  <Send className="w-4 h-4 mr-2" />
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-10">
            <Card data-reveal className="h-full">
              <CardContent className="p-6 md:p-7 space-y-6">
                <h2 className="text-2xl">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">Perth, Western Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a href="tel:+61403982811" className="text-primary hover:underline">0403 982 811</a>
                      <p className="text-sm text-muted-foreground mt-1">Customer support &amp; sales</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Demo Line</h3>
                      <a href="tel:+61860104462" className="text-primary hover:underline">+61 8 6010 4462</a>
                      <p className="text-sm text-muted-foreground mt-1">Listen to the AI receptionist in action</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a href="mailto:hello@dinetalk.com.au" className="text-primary hover:underline">hello@dinetalk.com.au</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-reveal className="bg-secondary border-0">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl">Weekly Hours</h3>
                  <p className="text-sm text-muted-foreground mt-1">Australia/Perth time zone</p>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between"><span>Sunday</span><span>12:00 PM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Monday</span><span>5:00 PM - 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Tuesday</span><span>5:00 PM - 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Wednesday</span><span>5:00 PM - 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Thursday</span><span>5:00 PM - 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Friday</span><span>5:00 PM - 11:45 PM</span></div>
                  <div className="flex justify-between"><span>Saturday (early)</span><span>12:00 AM - 1:00 AM</span></div>
                  <div className="flex justify-between"><span>Saturday (day)</span><span>12:00 PM - 11:45 PM</span></div>
                </div>
                <p className="text-sm text-muted-foreground/80">* Our AI receptionist is available 24/7 for demos</p>
              </CardContent>
            </Card>

            <Card data-reveal className="overflow-hidden border-0 shadow-none">
              <CardContent className="p-0">
                <ImageWithFallback
                  src={`${perthSkylineImageBase}&w=1200`}
                  srcSet={`${perthSkylineImageBase}&w=640 640w, ${perthSkylineImageBase}&w=960 960w, ${perthSkylineImageBase}&w=1200 1200w`}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  alt="Perth, Western Australia skyline at sunset"
                  className="w-full h-48 object-cover"
                  width={1200}
                  height={600}
                />
              </CardContent>
            </Card>

            <Card data-reveal className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl">Prefer to talk?</h3>
                <p className="text-primary-foreground/90">
                  Book a free demo call and speak directly with our team.
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => onNavigate?.('demo')}
                  aria-label="Schedule a DineTalk demo call"
                >
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
