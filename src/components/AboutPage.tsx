import { Target, Users, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { PageKey } from '../routes';

interface AboutPageProps {
  onNavigate?: (page: PageKey) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  usePageMetadata({
    title: 'About DineTalk | AI Restaurant Receptionist Australia',
    description:
      'Discover the DineTalk story and meet the hospitality experts behind Australia’s leading AI restaurant receptionist and booking automation platform.',
    keywords: [
      'AI Restaurant Receptionist Australia',
      'Hospitality AI team',
      'Restaurant technology Australia',
    ],
    robots: 'index, follow',
    canonicalUrl: 'https://dinetalk.com.au/about',
    author: 'DineTalk Australia',
    openGraph: {
      title: 'About DineTalk – Hospitality-first AI Receptionist',
      description:
        'Learn how the DineTalk team combines hospitality and AI expertise to power 24/7 restaurant booking automation.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
      url: 'https://dinetalk.com.au/about',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About DineTalk | Restaurant Booking Automation',
      description:
        'Meet the Perth-based team helping Australian venues answer calls, take bookings, and integrate with POS using AI.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About DineTalk',
        description:
          'DineTalk is an Australian-built AI receptionist helping restaurants automate bookings, customer enquiries, and POS integrations.',
        url: 'https://dinetalk.com.au/about',
        publisher: {
          '@type': 'Organization',
          name: 'DineTalk',
          url: 'https://dinetalk.com.au',
          logo: 'https://dinetalk.com.au/assets/logo.png',
        },
      },
    ],
  });
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'Hospitality First',
      description: 'We understand restaurants because we love the industry.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Customer-Centric',
      description: 'Every feature is built with restaurant owners and diners in mind.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: 'Innovation',
      description: 'Using cutting-edge AI to solve real-world restaurant challenges.',
    },
  ];

  return (
    <div className="min-h-screen">
  {/* Hero Section */}
  <section className="bg-gradient-to-br from-background to-secondary py-12 md:py-20" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">About DineTalk</h1>
          <p className="text-xl text-foreground/90">
            We are hospitality specialists building Australia’s most trusted AI restaurant receptionist and
            booking automation platform.
          </p>
        </div>
      </section>

  {/* Mission Section */}
  <section className="py-20 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-primary" />
                <h2 className="text-3xl md:text-4xl">Our Mission</h2>
              </div>
              <p className="text-lg text-foreground/90 mb-4">
                To help restaurants focus on food and customers while our AI handles every call.
              </p>
              <p className="text-muted-foreground mb-4">
                Running a restaurant is demanding. Between managing staff, perfecting dishes, and
                creating memorable dining experiences, answering phones can be overwhelming. That's
                where DineTalk comes in.
              </p>
              <p className="text-muted-foreground">
                We believe restaurant owners and staff should spend their time doing what they love
                — not being tied to a ringing phone. Our AI receptionist ensures every call is
                answered professionally, every booking is captured, and every customer receives
                exceptional service.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1698653223689-24b0bfd5150b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMTgyNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chef preparing food in a busy restaurant kitchen"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

  {/* Values Section */}
  <section className="py-20 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

  {/* Story Section */}
  <section className="py-20 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzYxMTE1NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Warm restaurant interior with diners"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                DineTalk was born from a simple observation: restaurant owners were stretched too
                thin. During peak hours, phones would ring off the hook while staff juggled
                customers, orders, and bookings.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founder, after years of working in hospitality and technology, recognized that
                AI could solve this problem. Not by replacing the human touch that makes restaurants
                special, but by handling the routine tasks that take time away from customers.
              </p>
              <p className="text-muted-foreground mb-4">
                Today, DineTalk serves restaurants across Australia, from bustling city cafés to
                coastal fine dining establishments. We're proud to be part of the hospitality
                community, helping businesses thrive in an increasingly competitive landscape.
              </p>
              <p className="text-muted-foreground">
                Based in Perth, Western Australia, we're passionate about supporting local
                restaurants and contributing to the vibrant food scene that makes Australia special.
              </p>
            </div>
          </div>
        </div>
      </section>

  {/* CTA Section */}
  <section className="py-20 bg-primary text-white" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Join Us on Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover how DineTalk can transform your restaurant's operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate?.('demo')} aria-label="Book a demo with DineTalk">
              Book a Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate?.('contact')}
              className="text-primary bg-white hover:bg-white/90"
              aria-label="Contact the DineTalk team"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
