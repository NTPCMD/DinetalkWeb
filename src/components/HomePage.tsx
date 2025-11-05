import { Phone, Calendar, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { visualEditing } from '@stackbit/sdk';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { usePageMetadata } from '../hooks/usePageMetadata';
import homeContent from '../content/pages/home.json';

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
  const page = homeContent;
  const ve = visualEditing({ objectId: 'src/content/pages/home.json' });
  const iconMap = {
    phone: Phone,
    calendar: Calendar,
    zap: Zap,
  } as const;

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

  const features = page.features.items.map((feature) => {
    const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Phone;
    return { ...feature, Icon };
  });

  const steps = page.steps.items;

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
              <h1
                className="text-4xl md:text-5xl mb-6 leading-relaxed md:leading-tight hero-heading"
                {...ve.field('hero.heading')}
              >
                {page.hero.heading}
              </h1>
              <p className="text-xl mb-6 text-foreground/90" {...ve.field('hero.description')}>
                {page.hero.description}
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                <span {...ve.field('hero.supporting')}>{page.hero.supporting}</span>{' '}
                <button
                  type="button"
                  onClick={() => onNavigate(page.hero.ctaPrimary.target)}
                  className="underline underline-offset-4 decoration-primary hover:text-primary transition-colors"
                  {...ve.field('hero.contextLinkText')}
                >
                  {page.hero.contextLinkText}
                </button>
                .
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 cta-fade ${showCTA ? 'show' : ''}`}>
                <Button
                  size="lg"
                  onClick={() => onNavigate(page.hero.ctaPrimary.target)}
                  aria-label="Book a demo with DineTalk"
                  {...ve.field('hero.ctaPrimary.label')}
                >
                  {page.hero.ctaPrimary.label}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => onNavigate(page.hero.ctaSecondary.target)}
                  aria-label="Contact the DineTalk team"
                  className="bg-muted text-foreground border border-transparent hover:bg-muted/90"
                  {...ve.field('hero.ctaSecondary.label')}
                >
                  {page.hero.ctaSecondary.label}
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
          <p
            className="mt-10 text-sm uppercase tracking-[0.3em] text-foreground/70 hero-trust"
            data-reveal
            {...ve.field('trustStatement')}
          >
            {page.trustStatement}
          </p>
        </div>
      </section>

  {/* Features Section */}
  <section className="py-20 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4" {...ve.field('features.heading')}>
              {page.features.heading}
            </h2>
            <p className="text-xl text-muted-foreground" {...ve.field('features.description')}>
              {page.features.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                data-reveal
                style={{ transitionDelay: `${index * 150}ms` }}
                {...ve.repeaterItem('features.items', index)}
              >
                <Card className="border-2 hover:border-primary transition-colors transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[250px]">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="mb-4 draw-icon" data-reveal-icon aria-hidden>
                      <feature.Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl" {...ve.field(`features.items[${index}].title`)}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground" {...ve.field(`features.items[${index}].description`)}>
                      {feature.description}
                    </p>
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
            <h2 className="text-3xl md:text-4xl mb-4" {...ve.field('steps.heading')}>
              {page.steps.heading}
            </h2>
            <p className="text-xl text-muted-foreground" {...ve.field('steps.description')}>
              {page.steps.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center" {...ve.repeaterItem('steps.items', index)}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold" {...ve.field(`steps.items[${index}].number`)}>
                  {step.number}
                </div>
                <h3 className="text-xl mb-3" {...ve.field(`steps.items[${index}].title`)}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" {...ve.field(`steps.items[${index}].description`)}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Testimonial Section */}
  <section className="py-20 bg-background" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4" {...ve.field('testimonial.heading')}>{page.testimonial.heading}</h2>
          <p className="text-muted-foreground mb-8" {...ve.field('testimonial.description')}>{page.testimonial.description}</p>
          <Card className="bg-card border-0">
            <CardContent className="p-8">
              <p className="text-xl mb-6 italic" {...ve.field('testimonial.quote')}>{page.testimonial.quote}</p>
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
                  <p {...ve.field('testimonial.author.name')}>{page.testimonial.author.name}</p>
                  <p className="text-muted-foreground" {...ve.field('testimonial.author.role')}>{page.testimonial.author.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {page.testimonial.badges.map((badge, index) => (
              <span
                key={badge}
                className="px-4 py-2 bg-secondary/60 rounded-full"
                {...ve.field(`testimonial.badges[${index}]`)}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

  {/* CTA Section */}
  <section className="py-20 bg-primary text-primary-foreground" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6" {...ve.field('cta.heading')}>
            {page.cta.heading}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80" {...ve.field('cta.description')}>
            {page.cta.description}
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onNavigate(page.cta.button.target)}
            {...ve.field('cta.button.label')}
          >
            {page.cta.button.label}
          </Button>
        </div>
      </section>
    </div>
  );
}
