import { Target, Users, Heart, TrendingUp } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import aboutContent from '../content/pages/about.json';

const CHEF_IMAGE_BASE =
  'https://images.unsplash.com/photo-1698653223689-24b0bfd5150b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMTU3OTc3fDA&ixlib=rb-4.1.0&q=80';

const INTERIOR_IMAGE_BASE =
  'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzYxMTE1NzQ3fDA&ixlib=rb-4.1.0&q=80';

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
                <p className="text-muted-foreground">
                  We also run a dedicated service hub for venues looking for an{' '}
                  <a
                    href="/pages/perth-ai-receptionist.html"
                    className="text-primary font-semibold underline-offset-4 hover:underline"
                  >
                    AI receptionist for restaurants in Perth
                  </a>{' '}
                  so local teams can rely on a responsive{' '}
                  <a
                    href="/pages/perth-ai-receptionist.html#phone-answering"
                    className="text-primary font-semibold underline-offset-4 hover:underline"
                  >
                    Perth restaurant phone answering system
                  </a>{' '}
                  tailored to Western Australian diners.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={`${CHEF_IMAGE_BASE}&w=1280`}
                srcSet={`${CHEF_IMAGE_BASE}&w=640 640w, ${CHEF_IMAGE_BASE}&w=960 960w, ${CHEF_IMAGE_BASE}&w=1280 1280w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Chef preparing food in a busy Perth restaurant kitchen"
                className="w-full h-auto object-cover"
                width={1280}
                height={853}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4" {...ve.field('values.heading')}>
              {page.values.heading}
            </h2>
            <p className="text-xl text-muted-foreground" {...ve.field('values.description')}>
              {page.values.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
                alt="Warm Perth restaurant interior with diners enjoying dinner"
                className="w-full h-auto object-cover"
                width={1280}
                height={853}
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                My name is Rav, and I'm a 15-year-old young entrepreneur based in Perth. I grew up
                around family who run Indian restaurants, cafes, and different hospitality
                businesses, so I've seen the industry from the inside.
              </p>
              <p className="text-muted-foreground mb-4">
                One thing I noticed early was how busy and stressful running a restaurant can be.
                During peak hours, phones wouldn't stop ringing. Customers were waiting, staff were
                rushing, and calls were being missed — which meant missed bookings, frustrated
                customers, and lost business. Sometimes customers tried calling after hours, but no
                one was available to answer. I saw this happening all the time in my uncles'
                restaurants.
              </p>
              <p className="text-muted-foreground mb-4">
                That's where everything clicked. Because I've always loved technology, coding,
                building websites, and creating AI workflows, I saw a problem that I could actually
                solve — even at my age. So I started working on an idea: an AI receptionist that
                answers calls instantly, handles bookings, and reduces pressure on staff.
              </p>
              <p className="text-muted-foreground mb-4">
                That idea became DineTalk. My goal isn't just to build another tech tool — it's to
                create something that genuinely helps restaurant owners breathe a little easier.
                Something that gives customers a smoother experience, reduces wait times, and helps
                small businesses operate like big ones.
              </p>
              <p className="text-muted-foreground">
                I'm still young, but I'm using everything I know — coding, AI automation, websites,
                problem-solving, and real business insight from my family — to build a system that
                makes a real difference. This is just the beginning, and I'm excited to grow
                DineTalk into a product that supports restaurants all over Australia… starting with
                the ones that inspired the idea in the first place.
              </p>
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary border border-white hover:bg-gray-100 hover:text-primary transition-colors shadow-md font-semibold"
              onClick={() => onNavigate?.(page.cta.primary.target)}
              aria-label="Book a demo with DineTalk"
              {...ve.field('cta.primary.label')}
            >
              {page.cta.primary.label}
            </Button>
            <Button
              size="lg"
              onClick={() => onNavigate?.(page.cta.secondary.target)}
              className="bg-white text-primary border border-white hover:bg-gray-100 hover:text-primary shadow-md font-semibold"
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