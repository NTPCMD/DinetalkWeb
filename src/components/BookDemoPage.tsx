import { useEffect, useRef } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';

const CALENDLY_URL = 'https://calendly.com/newtownpunjabi/new-meeting?primaryColor=f97316&textColor=000000';
let calendlyIframe: HTMLIFrameElement | null = null;

export function BookDemoPage() {
  const embedRef = useRef<HTMLDivElement | null>(null);

  usePageMetadata({
    title: 'Book a Demo | DineTalk AI Restaurant Receptionist',
    description:
      'Schedule a live walkthrough of DineTalk’s AI restaurant receptionist. See how automated bookings, call handling, and POS integrations work for Australian venues.',
    keywords: [
      'Book DineTalk demo',
      'Schedule AI restaurant receptionist',
      'Restaurant booking automation demo',
    ],
    robots: 'index, follow',
    canonicalUrl: 'https://dinetalk.com.au/book-demo',
    author: 'DineTalk Australia',
    openGraph: {
      title: 'Book a DineTalk Demo – Restaurant AI Receptionist',
      description:
        'Reserve your DineTalk demo to experience AI-powered bookings, menu support, and call handling tailored for Australian restaurants.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
      url: 'https://dinetalk.com.au/book-demo',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Book a Demo | DineTalk AI Receptionist',
      description:
        'Pick a time that suits you and see DineTalk automate restaurant bookings and customer calls.',
      image: 'https://dinetalk.com.au/assets/og-image.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ReserveAction',
        name: 'Book a DineTalk Demo',
        target: 'https://dinetalk.com.au/book-demo',
        provider: {
          '@type': 'Organization',
          name: 'DineTalk',
          url: 'https://dinetalk.com.au',
        },
        result: {
          '@type': 'EventReservation',
          name: 'DineTalk Demo Session',
        },
      },
    ],
  });

  useEffect(() => {
    if (!embedRef.current) return;

    let frame = calendlyIframe;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.src = CALENDLY_URL;
      frame.width = '100%';
      frame.height = '720';
      frame.title = 'Calendly scheduling form';
      frame.setAttribute('loading', 'eager');
      frame.setAttribute('frameBorder', '0');
      frame.style.border = '0';
    }

    calendlyIframe = frame;
    const container = embedRef.current;
    container.appendChild(frame);

    return () => {
      if (container && frame && container.contains(frame)) {
        container.removeChild(frame);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-6">Schedule Your DineTalk Demo</h1>
          <p className="text-xl text-muted-foreground">
            Takes under 30 seconds to book — choose a time that suits you and see the AI restaurant receptionist in action.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section (Calendly) */}
          <Card data-reveal>
            <CardHeader>
              <CardTitle>Schedule Your Demo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className="rounded-2xl overflow-hidden shadow-xl fade-in-up"
                style={{ minHeight: '720px' }}
                ref={embedRef}
              />
            </CardContent>
            <CardContent>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">30-minute session</p>
                    <p className="text-muted-foreground text-sm">
                      Our team will walk you through DineTalk's features and answer all your
                      questions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What to Expect Section */}
          <div>
            <Card className="mb-6" data-reveal>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Live AI Demo</p>
                      <p className="text-muted-foreground text-sm">
                        See how DineTalk handles real restaurant calls
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Custom Setup Discussion</p>
                      <p className="text-muted-foreground text-sm">
                        We'll discuss your specific needs and restaurant type
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Integration Overview</p>
                      <p className="text-muted-foreground text-sm">
                        Learn how DineTalk works with your existing systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Pricing & Plans</p>
                      <p className="text-muted-foreground text-sm">
                        Get transparent pricing tailored to your restaurant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Q&A Session</p>
                      <p className="text-muted-foreground text-sm">
                        Ask anything about features, setup, or support
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-0">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">Try the AI Now</h3>
                <p className="text-muted-foreground mb-4">
                  Want to experience DineTalk immediately? Call our demo line and interact with our
                  AI receptionist: <strong>+61 8 6010 4462</strong>
                </p>
                <Button asChild variant="outline" className="w-full" aria-label="Call the DineTalk demo line">
                  <a href="tel:+61860104462">Call +61 8 6010 4462</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
