import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageKey } from '../routes';

interface ContactPageProps {
  onNavigate?: (page: PageKey) => void;
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
          telephone: '+61403982811',
          contactType: 'Customer Support',
          areaServed: 'AU',
          availableLanguage: 'English',
        },
      },
    ],
  });

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'submitting') return;

    const form = e.currentTarget;
    const data = {
      'form-name': 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    setStatus('submitting');

    try {
      const response = await fetch('/?no-cache=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encode(data),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      form.reset();
    } catch (error) {
      console.error('Unable to submit contact form', error);
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (status !== 'idle') {
      setStatus('idle');
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions about AI restaurant receptionists or booking automation? We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 items-start">
          {/* Contact Form */}
          <Card data-reveal className="self-start">
            <CardContent className="p-6 md:p-8 flex flex-col gap-6">
              <h2 className="text-2xl">Send us a Message</h2>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/contact"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <div>
                  <Label htmlFor="name" className="mb-2">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-2">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px]"
                    placeholder="Tell us about your restaurant and how we can help..."
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'} aria-label="Submit your contact request">
                    <Send className="w-4 h-4 mr-2" />
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                  {status === 'success' && (
                    <p className="text-sm text-emerald-500" role="status" aria-live="polite">
                      Thanks! We’ll be in touch by email.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-destructive" role="status" aria-live="assertive">
                      Sorry, something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card data-reveal>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6">Contact Information</h2>
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
                      <a href="tel:+61403982811" className="text-primary hover:underline">
                        0403 982 811
                      </a>
                      <p className="text-sm text-muted-foreground">Customer support (Australia)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a
                        href="mailto:hello@dinetalk.com.au"
                        className="text-primary hover:underline"
                      >
                        hello@dinetalk.com.au
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl mb-4">Weekly Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>12:00 PM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monday</span>
                      <span>5:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday</span>
                      <span>5:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday</span>
                      <span>5:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thursday</span>
                      <span>5:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span>5:00 PM - 11:45 PM</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span>Saturday (early)</span>
                        <span>12:00 AM - 1:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday (day)</span>
                        <span>12:00 PM - 11:45 PM</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/80 mt-4">
                    Australia/Perth
                  </p>
                  <p className="text-sm text-muted-foreground/80 mt-2">
                    * Our AI receptionist is available 24/7 for demos
                  </p>
                </CardContent>
            </Card>

            <Card data-reveal className="overflow-hidden border-0 shadow-none">
              <CardContent className="p-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwZXJ0aCUyMGF1c3RyYWxpYXxlbnwxfHx8fDE3NjExOTAyMDR8MA&ixlib=rb-4.1.0&q=80&w=1200"
                  alt="Perth, Western Australia skyline at sunset"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </CardContent>
            </Card>

            <Card className="bg-primary text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">Prefer to talk?</h3>
                <p className="mb-4 opacity-90">
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

            <Card data-reveal className="border-0 shadow-none bg-muted/60">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3 text-foreground">Try the AI demo line</h3>
                <p className="text-muted-foreground mb-4">
                  Hear DineTalk in action anytime by calling our dedicated AI receptionist demo line.
                </p>
                <a
                  href="tel:+61860104462"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="w-5 h-5" /> +61 8 6010 4462
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
