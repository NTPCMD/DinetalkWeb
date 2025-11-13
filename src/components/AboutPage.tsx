import { Target, Users, Heart, TrendingUp } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import aboutContent from '../content/pages/about.json';

const CHEF_IMAGE_BASE =
  'https://images.unsplash.com/photo-1698653223689-24b0bfd5150b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMTgyNzM1fDA&ixlib=rb-4.1.0&q=80&utm_source=figma&utm_medium=referral';

const INTERIOR_IMAGE_BASE =
  'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzYxMTE1NzQ3fDA&ixlib=rb-4.1.0&q=80&utm_source=figma&utm_medium=referral';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const page = aboutContent;
  const ve = visualEditing({ objectId: 'src/content/pages/about.json' });
  const iconMap = {
    heart: Heart,
    users: Users,
    'trending-up': TrendingUp,
  } as const;

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
  const values = page.values.items.map((value) => {
    const Icon = iconMap[value.icon as keyof typeof iconMap] ?? Heart;
    return { ...value, Icon };
  });

  return (
    <div className="min-h-screen">
  {/* Hero Section */}
  <section className="bg-gradient-to-br from-background to-secondary py-12 md:py-20" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6" {...ve.field('hero.heading')}>
            {page.hero.heading}
          </h1>
          <p className="text-xl text-foreground/90" {...ve.field('hero.description')}>
            {page.hero.description}
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
                <h2 className="text-3xl md:text-4xl" {...ve.field('mission.heading')}>
                  {page.mission.heading}
                </h2>
              </div>
              <p className="text-lg text-foreground/90 mb-4" {...ve.field('mission.lead')}>
                {page.mission.lead}
              </p>
              <div className="space-y-4">
                {page.mission.body.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground"
                    {...ve.field(`mission.body[${index}]`)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={`${CHEF_IMAGE_BASE}&w=1280`}
                srcSet={`${CHEF_IMAGE_BASE}&w=640 640w, ${CHEF_IMAGE_BASE}&w=960 960w, ${CHEF_IMAGE_BASE}&w=1280 1280w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Chef preparing food in a busy restaurant kitchen"
                className="w-full h-auto object-cover"
                width={1280}
                height={853}
              />
            </div>
          </div>
        </div>
      </section>

  {/* Values Section */}
  <section className="py-12 md:py-20 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl mb-4" {...ve.field('values.heading')}>
              {page.values.heading}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground" {...ve.field('values.description')}>
              {page.values.description}
            </p>
          </div>
          {/* Mobile: Horizontal scrollable carousel */}
          <div className="md:hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className="border-2 snap-start flex-shrink-0" 
                  style={{ width: '280px' }}
                  {...ve.repeaterItem('values.items', index)}
                >
                  <CardContent className="p-6 text-center h-full">
                    <div className="flex justify-center mb-4" aria-hidden>
                      <value.Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl mb-3" {...ve.field(`values.items[${index}].title`)}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground" {...ve.field(`values.items[${index}].description`)}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="border-2" {...ve.repeaterItem('values.items', index)}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4" aria-hidden>
                    <value.Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl mb-3" {...ve.field(`values.items[${index}].title`)}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground" {...ve.field(`values.items[${index}].description`)}>
                    {value.description}
                  </p>
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
                src={`${INTERIOR_IMAGE_BASE}&w=1280`}
                srcSet={`${INTERIOR_IMAGE_BASE}&w=640 640w, ${INTERIOR_IMAGE_BASE}&w=960 960w, ${INTERIOR_IMAGE_BASE}&w=1280 1280w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Warm restaurant interior with diners"
                className="w-full h-auto object-cover"
                width={1280}
                height={853}
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl mb-6" {...ve.field('story.heading')}>
                {page.story.heading}
              </h2>
              <div className="space-y-4">
                {page.story.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground"
                    {...ve.field(`story.paragraphs[${index}]`)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* CTA Section */}
  <section className="py-12 md:py-20 bg-primary text-primary-foreground" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl mb-4 md:mb-6" {...ve.field('cta.heading')}>
            {page.cta.heading}
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-primary-foreground/80" {...ve.field('cta.description')}>
            {page.cta.description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md md:max-w-none mx-auto">
            <Button
              size="lg"
              className="bg-white text-primary border border-white hover:bg-gray-100 hover:text-primary transition-colors shadow-md font-semibold w-full md:w-auto min-h-[48px]"
              onClick={() => onNavigate?.(page.cta.primary.target)}
              aria-label="Book a demo with DineTalk"
              {...ve.field('cta.primary.label')}
            >
              {page.cta.primary.label}
            </Button>
            <Button
              size="lg"
              onClick={() => onNavigate?.(page.cta.secondary.target)}
              className="bg-white text-primary border border-white hover:bg-gray-100 hover:text-primary shadow-md font-semibold w-full md:w-auto min-h-[48px]"
              aria-label="Contact the DineTalk team"
              {...ve.field('cta.secondary.label')}
            >
              {page.cta.secondary.label}
            </Button>


          </div>
        </div>
      </section>
    </div>
  );
}
