import { Phone, Calendar, Zap, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [typed, setTyped] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Typewriter effect for headline
  useEffect(() => {
    const full = 'We take your calls, so you can focus on the food.';
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i += 1;
      if (i >= full.length) {
        clearInterval(t);
        // after a short pause, fade title and show tagline
        setTimeout(() => {
          setShowTagline(true);
        }, 600);
      }
    }, 40);
    return () => clearInterval(t);
  }, []);

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
      icon: <div className="draw-icon" data-reveal-icon><Phone className="w-8 h-8 text-primary" /></div>,
      title: 'Answers Calls Instantly',
      description: 'Never miss a call again. Our AI answers every call in seconds, 24/7.',
    },
    {
      icon: <div className="draw-icon" data-reveal-icon><Calendar className="w-8 h-8 text-primary" /></div>,
      title: 'Takes Reservations',
      description: 'Seamlessly handle bookings and reservations without lifting a finger.',
    },
    {
      icon: <div className="draw-icon" data-reveal-icon><Zap className="w-8 h-8 text-primary" /></div>,
      title: 'Integrates with POS',
      description: 'Works with your existing systems for a smooth workflow.',
    },
  ];

  function TypewriterText({ text }: { text: string }) {
    return <>{typed}</>;
  }

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
            <div>
              {/* Ensure hero text is visible immediately and not hidden by reveal animation */}
              <h1 className={`text-3xl md:text-5xl mb-4 md:mb-6 leading-tight md:leading-loose hero-heading hero-text`}>
                <span className="block md:hidden">AI Receptionist for Restaurants</span>
                <span className="hidden md:block">AI Restaurant Receptionist &amp; Ordering System</span>
              </h1>
              <p className={`text-base md:text-xl mb-6 md:mb-8 text-foreground/90 ${showTagline ? 'in-view' : 'title-fade'} hero-text`}>
                DineTalk answers restaurant calls, manages bookings, and takes orders 24 / 7 using natural-sounding AI.
              </p>
              <div className={`flex flex-col gap-3 md:gap-4 cta-fade ${showCTA ? 'show' : ''}`}>
                <Button
                  size="lg"
                  className="bg-[#e58e23] text-white border border-[#e58e23] hover:bg-[#f29b3a] hover:border-[#f29b3a] shadow-md text-base md:text-lg py-6 md:py-4 font-semibold"
                  onClick={() => onNavigate('demo')}
                >
                  Book a Demo
                </Button>
                <Button
                  size="lg"
                  className="bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-700 transition-colors shadow-md font-medium text-base md:text-lg py-6 md:py-4"
                  onClick={() => onNavigate('demo')}
                >
                  Try Live AI Demo
                </Button>
                
                {/* Click to call button - mobile only */}
                <a 
                  href="tel:+61123456789" 
                  className="md:hidden flex items-center justify-center gap-2 bg-green-600 text-white border border-green-600 hover:bg-green-700 px-6 py-6 rounded-lg shadow-md font-semibold text-base transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </div>

              {/* small bounce scroll indicator */}
              <div className="scroll-indicator hidden md:flex" aria-hidden>
                <div className="dot" />
              </div>
            </div>
            <div className="hidden md:block rounded-2xl overflow-hidden shadow-xl md:bg-transparent">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758216169108-d1b62d114582?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGhvbmUlMjBjYWxsfGVufDF8fHx8MTc2MTE4MjczNHww&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
                alt="AI receptionist taking restaurant booking over phone"
                className="w-full max-h-[80vh] h-auto object-cover"
                loading="lazy"
              />
              {/* subtle overlay to ensure text legibility */}
              <div className="absolute inset-0 pointer-events-none hero-overlay" />
            </div>
          </div>
        </div>
      </section>

  {/* Features Section */}
  <section className="py-12 md:py-20 bg-background" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl mb-3 md:mb-4">Why Choose DineTalk?</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Built for restaurants, cafés, and takeaways
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                data-reveal
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* How It Works Section */}
  <section className="py-12 md:py-20 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl mb-3 md:mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-xl md:text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg md:text-xl mb-2 md:mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Testimonial Section */}
  <section className="py-12 md:py-20 bg-background" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl mb-6 md:mb-8">Trusted by Local Restaurants</h2>
          <Card className="bg-card border-0">
            <CardContent className="p-6 md:p-8">
              <p className="text-base md:text-xl mb-4 md:mb-6 italic">
                "DineTalk has been a game-changer for our restaurant. We never miss a booking
                anymore, and our staff can focus on what they do best — serving great food."
              </p>
              <div className="flex items-center justify-center gap-4">
                <ImageWithFallback
                  src="https://dogswampsc.com.au/assets/content/images/IMG-20241126-WA0016256821.jpeg"
                  alt="Jashan"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm md:text-base">Jashan</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Owner, Jashan da Dhaba</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

  {/* CTA Section */}
  <section className="py-12 md:py-20 bg-primary text-white" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
            Join hundreds of restaurants using DineTalk to handle their calls.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary border border-white hover:bg-gray-100 hover:text-primary shadow-md font-semibold text-base md:text-lg py-6 md:py-4"
            onClick={() => onNavigate('demo')}
          >
            Book Your Free Demo
          </Button>
        </div>
      </section>
      
      {/* Sticky Bottom CTA Bar - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2b2d35] border-t border-white/10 p-3 shadow-lg flex gap-2">
        <Button
          size="lg"
          className="flex-1 bg-[#e58e23] text-white border border-[#e58e23] hover:bg-[#f29b3a] hover:border-[#f29b3a] shadow-md font-semibold text-sm py-5"
          onClick={() => onNavigate('demo')}
        >
          Book Demo
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-700 shadow-md font-medium text-sm py-5"
          onClick={() => onNavigate('demo')}
        >
          Try AI Demo
        </Button>
      </div>
    </div>
  );
}
