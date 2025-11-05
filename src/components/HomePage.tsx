import { Phone, Calendar, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { usePageMetadata } from '../hooks/usePageMetadata';

const HERO_IMAGE_BASE =
  'https://images.unsplash.com/photo-1758216169108-d1b62d114582?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGhvbmUlMjBjYWxsfGVufDF8fHx8MTc2MTE4MjczNHww&ixlib=rb-4.1.0&q=80&utm_source=figma&utm_medium=referral';

const OWNER_IMAGE_BASE =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyZXN0YXVyYW50JTIwb3duZXJ8ZW58MXx8fHwxNzYxMTg3NDU0fDA&ixlib=rb-4.1.0&q=80';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showCTA, setShowCTA] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  usePageMetadata({
    title: 'DineTalk | AI-Powered Restaurant Receptionist & Booking System',
    description:
      'Automate every restaurant call with DineTalk — the AI receptionist for Australian venues that manages bookings, orders, and POS integrations 24/7.',
    keywords: [
      'AI Restaurant Receptionist Australia',
      'Restaurant Booking Automation',
      'POS System Integration',
      '24/7 AI Answering Service',
    ],
    robots: 'index, follow',
    author: 'DineTalk Australia',
    canonicalUrl: 'https://dinetalk.com.au/',
    openGraph: {
      title: 'DineTalk – AI Restaurant Receptionist & Ordering System',
      description:
        'Automate bookings, calls, and orders with DineTalk — your always-on AI receptionist for restaurants across Australia.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
      url: 'https://dinetalk.com.au/',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DineTalk | AI-Powered Restaurant Receptionist',
      description:
        'DineTalk answers calls, confirms bookings, and syncs with your POS so your team can focus on service.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DineTalk',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'AUD',
        },
        url: 'https://dinetalk.com.au',
        description:
          'DineTalk is an AI-powered receptionist and booking automation platform for hospitality venues in Australia.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'DineTalk',
        url: 'https://dinetalk.com.au',
        logo: 'https://dinetalk.com.au/assets/logo.png',
        sameAs: [
          'https://www.instagram.com/dinetalk_ai',
          'https://www.linkedin.com/company/dinetalk',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+61 403 982 811',
          contactType: 'Customer Support',
          areaServed: 'AU',
          availableLanguage: 'English',
        },
      },
    ],
  });

  // Parallax background for hero (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return; // disable on mobile
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY || window.pageYOffset;
      heroRef.current.style.backgroundPosition = `center calc(50% + ${y * 0.12}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fade in CTAs after 0.8s (independent small delay)
  useEffect(() => {
    const id = setTimeout(() => setShowCTA(true), 800);
    return () => clearTimeout(id);
  }, []);

  const features = [
    {
      icon: (
        <div className="draw-icon" data-reveal-icon aria-hidden>
          <Phone className="w-8 h-8 text-primary" />
        </div>
      ),
      title: '24/7 AI Answering Service',
      description:
        'Capture every booking with an AI receptionist that answers and routes calls instantly for your hospitality venue.',
    },
    {
      icon: (
        <div className="draw-icon" data-reveal-icon aria-hidden>
          <Calendar className="w-8 h-8 text-primary" />
        </div>
      ),
      title: 'Restaurant Booking Automation',
      description:
        'Synchronise reservations automatically and send confirmations without manual effort.',
    },
    {
      icon: (
        <div className="draw-icon" data-reveal-icon aria-hidden>
          <Zap className="w-8 h-8 text-primary" />
        </div>
      ),
      title: 'POS System Integration',
      description:
        'Connect DineTalk with Square, Lightspeed, and other POS platforms for seamless service updates.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Set Up',
      description: 'Connect DineTalk to your restaurant in minutes.',
    },
    {
      number: '2',
      title: 'Customize',
      description: 'Train the AI with your menu, hours, and policies.',
    },
    {
      number: '3',
      title: 'Go Live',
      description: 'Start taking calls automatically — around the clock.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-background to-secondary py-12 md:py-20 parallax"
        ref={heroRef as any}
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1758216169108-d1b62d114582?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGhvbmUlMjBjYWxsfGVufDF8fHx8MTc2MTE4MjczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hero-intro">
              <h1 className="text-4xl md:text-5xl mb-6 leading-relaxed md:leading-tight hero-heading">
                AI Restaurant Receptionist Australia trusts
              </h1>
              <p className="text-xl mb-6 text-foreground/90">
                Automate bookings, upsells, and customer updates with a conversational AI that knows your menu and integrates with your POS.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                Learn how our AI handles real customer calls —{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('demo')}
                  className="underline underline-offset-4 decoration-primary hover:text-primary transition-colors"
                >
                  book a demo in under 30 seconds
                </button>
                .
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 cta-fade ${showCTA ? 'show' : ''}`}>
                <Button size="lg" onClick={() => onNavigate('demo')} aria-label="Book a demo with DineTalk">
                  Book a Demo
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => onNavigate('contact')}
                  aria-label="Contact the DineTalk team"
                  className="bg-muted text-foreground border border-transparent hover:bg-muted/90"
                >
                  Contact Us
                </Button>
              </div>

              {/* small bounce scroll indicator */}
              <div className="scroll-indicator hidden md:flex" aria-hidden>
                <div className="dot" />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl md:bg-transparent hero-media md:max-w-[460px] md:mx-auto" data-reveal>
              <ImageWithFallback
                src={`${HERO_IMAGE_BASE}&w=1280`}
                srcSet={`${HERO_IMAGE_BASE}&w=640 640w, ${HERO_IMAGE_BASE}&w=960 960w, ${HERO_IMAGE_BASE}&w=1400 1400w`}
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 45vw, 100vw"
                alt="AI receptionist answering restaurant phone call"
                className="w-full h-auto max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[400px] object-cover"
                loading="eager"
                width={1280}
                height={853}
              />
            </div>
          </div>
          <p className="mt-10 text-sm uppercase tracking-[0.3em] text-foreground/70 hero-trust" data-reveal>
            Trusted by restaurants across Australia
          </p>
        </div>
      </section>

  {/* Features Section */}
  <section className="py-20 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why restaurants choose DineTalk</h2>
            <p className="text-xl text-muted-foreground">
              Built for hospitality venues that need smarter call handling and reservation support
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                data-reveal
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="border-2 hover:border-primary transition-colors transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[250px]">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* How It Works Section */}
  <section className="py-20 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Testimonial Section */}
  <section className="py-20 bg-background" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Trusted by restaurants across Australia</h2>
          <p className="text-muted-foreground mb-8">
            Hospitality leaders rely on DineTalk to deliver a consistent guest experience whether customers call, text, or book online.
          </p>
          <Card className="bg-card border-0">
            <CardContent className="p-8">
              <p className="text-xl mb-6 italic">
                "DineTalk has been a game-changer for our restaurant. We never miss a booking
                anymore, and our staff can focus on what they do best — serving great food."
              </p>
              <div className="flex items-center justify-center gap-4">
                <ImageWithFallback
                  src={`${OWNER_IMAGE_BASE}&w=240`}
                  srcSet={`${OWNER_IMAGE_BASE}&w=160 160w, ${OWNER_IMAGE_BASE}&w=240 240w, ${OWNER_IMAGE_BASE}&w=320 320w`}
                  sizes="64px"
                  alt="Portrait of an Australian restaurant owner smiling"
                  className="w-16 h-16 rounded-full object-cover"
                  width={240}
                  height={240}
                />
                <div className="text-left">
                  <p>Jashan</p>
                  <p className="text-muted-foreground">Owner, Jashan da Dhaba</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="px-4 py-2 bg-secondary/60 rounded-full">Square partner</span>
            <span className="px-4 py-2 bg-secondary/60 rounded-full">Lightspeed ready</span>
            <span className="px-4 py-2 bg-secondary/60 rounded-full">Australian-based support</span>
          </div>
        </div>
      </section>

  {/* CTA Section */}
  <section className="py-20 bg-primary text-primary-foreground" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Join hundreds of restaurants using DineTalk to handle their calls.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onNavigate('demo')}
          >
            Book Your Free Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
