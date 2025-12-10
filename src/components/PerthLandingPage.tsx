import { Phone, Calendar, Clock, CheckCircle, TrendingUp, MapPin, Award, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { visualEditing } from '../lib/stackbit-sdk';
import { usePageMetadata } from '../hooks/usePageMetadata';
import perthContent from '../content/pages/perth-landing.json';

interface PerthLandingPageProps {
  onNavigate?: (page: string) => void;
}

export function PerthLandingPage({ onNavigate }: PerthLandingPageProps) {
  const page = perthContent;
  const ve = visualEditing({ objectId: 'src/content/pages/perth-landing.json' });

  usePageMetadata({
    title: 'AI Receptionist Perth | Restaurant Phone Answering System WA | DineTalk',
    description:
      "Perth's #1 AI restaurant receptionist. Never miss a call or booking. 24/7 automated phone answering with POS integration. Trusted by WA hospitality venues. Book your free demo today.",
    keywords: [
      'AI receptionist Perth',
      'restaurant phone answering Perth',
      'Perth restaurant automation',
      'AI booking system Perth',
      'restaurant call handling Perth',
      'hospitality AI Perth WA',
      'Perth restaurant technology',
      'automated receptionist Western Australia',
      'restaurant phone system Perth',
      'AI phone answering Perth restaurants',
    ],
    robots: 'index, follow',
    canonicalUrl: 'https://dinetalk.com.au/perth-ai-receptionist',
    author: 'DineTalk Australia',
    openGraph: {
      title: "Perth's #1 AI Restaurant Receptionist | DineTalk",
      description:
        'Never miss another call or booking. 24/7 AI phone answering for Perth restaurants with seamless POS integration. Trusted by WA hospitality venues.',
      image: 'https://dinetalk.com.au/assets/og-image-perth.jpg',
      url: 'https://dinetalk.com.au/perth-ai-receptionist',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Restaurant Receptionist Perth | DineTalk',
      description:
        '24/7 automated phone answering for Perth restaurants. Never miss a call or booking again. Free demo available.',
      image: 'https://dinetalk.com.au/assets/og-image-perth.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'DineTalk AI Receptionist for Perth Restaurants',
        description:
          "Perth's leading AI-powered restaurant receptionist and phone answering system. 24/7 call handling, automated bookings, and POS integration for WA restaurants.",
        provider: {
          '@type': 'LocalBusiness',
          name: 'DineTalk',
          areaServed: {
            '@type': 'City',
            name: 'Perth',
            containedIn: {
              '@type': 'State',
              name: 'Western Australia',
            },
          },
        },
        areaServed: {
          '@type': 'City',
          name: 'Perth',
        },
        url: 'https://dinetalk.com.au/perth-ai-receptionist',
      },
    ],
  });

  const scrollToDemo = () => {
    const demoSection = document.getElementById('perth-cta-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-secondary py-16 md:py-24" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold">Proudly Serving Perth, WA</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6" {...ve.field('hero.heading')}>
                {page.hero.heading}
              </h1>
              <h2 className="text-2xl md:text-3xl text-foreground/80 mb-4" {...ve.field('hero.subheading')}>
                {page.hero.subheading}
              </h2>
              <p className="text-xl text-muted-foreground mb-8" {...ve.field('hero.description')}>
                {page.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={scrollToDemo} className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Book Free Demo
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                  <a href="tel:+61403982811">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 0403 982 811
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1758216169108-d1b62d114582?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGhvbmUlMjBjYWxsfGVufDF8fHx8MTc2MTE4MjczNHww&ixlib=rb-4.1.0&q=80&w=800"
                alt="Perth restaurant staff using AI receptionist phone system for automated bookings and call handling"
                className="rounded-2xl shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12" {...ve.field('problem.heading')}>
            {page.problem.heading}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.problem.items.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground" {...ve.field(`problem.items[${index}]`)}>
                    {item}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-6" {...ve.field('solution.heading')}>
              {page.solution.heading}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto" {...ve.field('solution.description')}>
              {page.solution.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {page.solution.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-3" {...ve.field(`solution.benefits[${index}].title`)}>
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground" {...ve.field(`solution.benefits[${index}].description`)}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Keywords Section */}
      <section className="py-16 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6" {...ve.field('keywords.heading')}>
            {page.keywords.heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto" {...ve.field('keywords.description')}>
            {page.keywords.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              AI receptionist Perth
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Restaurant phone answering Perth
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Perth restaurant automation
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              WA hospitality technology
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Perth booking system
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Restaurant call handling WA
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12" {...ve.field('stats.heading')}>
            {page.stats.heading}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {page.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2" {...ve.field(`stats.items[${index}].value`)}>
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1" {...ve.field(`stats.items[${index}].label`)}>
                  {stat.label}
                </div>
                <p className="text-sm opacity-90" {...ve.field(`stats.items[${index}].description`)}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12" {...ve.field('features.heading')}>
            {page.features.heading}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {page.features.items.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3" {...ve.field(`features.items[${index}].title`)}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" {...ve.field(`features.items[${index}].description`)}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Section */}
      <section className="py-16 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6" {...ve.field('local.heading')}>
                {page.local.heading}
              </h2>
              <p className="text-lg text-muted-foreground mb-6" {...ve.field('local.description')}>
                {page.local.description}
              </p>
              <ul className="space-y-3">
                {page.local.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span {...ve.field(`local.points[${index}]`)}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwZXJ0aCUyMGNpdHl8ZW58MXx8fHwxNzYxMTg0NDgyfDA&ixlib=rb-4.1.0&q=80&w=800"
                alt="Perth city skyline and restaurant district showcasing Western Australia hospitality venues using AI phone systems"
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12" {...ve.field('howItWorks.heading')}>
            {page.howItWorks.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {page.howItWorks.steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6">
                  <div className="absolute -top-6 left-6 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4" {...ve.field(`howItWorks.steps[${index}].title`)}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground" {...ve.field(`howItWorks.steps[${index}].description`)}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12" {...ve.field('faq.heading')}>
            {page.faq.heading}
          </h2>
          <div className="space-y-6">
            {page.faq.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3" {...ve.field(`faq.items[${index}].question`)}>
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground" {...ve.field(`faq.items[${index}].answer`)}>
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Have more questions? Check our{' '}
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('faq');
                }}
                className="text-primary hover:underline font-medium"
              >
                full FAQ page
              </a>{' '}
              or{' '}
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('contact');
                }}
                className="text-primary hover:underline font-medium"
              >
                contact our Perth team
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="perth-cta-section" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl mb-6" {...ve.field('cta.heading')}>
            {page.cta.heading}
          </h2>
          <p className="text-xl mb-10 opacity-95" {...ve.field('cta.description')}>
            {page.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate?.('demo')}
              className="text-lg px-8"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {page.cta.primaryButton}
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white">
              <a href="tel:+61403982811">
                <Phone className="mr-2 h-5 w-5" />
                {page.cta.secondaryButton}
              </a>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-80">
            Also serving Fremantle, Northbridge, Subiaco, Cottesloe, Scarborough, and all Perth metro suburbs
          </p>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-12 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Learn more about DineTalk:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('home');
                }}
                className="text-primary hover:underline font-medium"
              >
                Home
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('about');
                }}
                className="text-primary hover:underline font-medium"
              >
                About Us
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('faq');
                }}
                className="text-primary hover:underline font-medium"
              >
                FAQ
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('contact');
                }}
                className="text-primary hover:underline font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
