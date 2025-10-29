import { Phone, Calendar, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: <Phone className="w-8 h-8 text-primary" />,
      title: 'Answers Calls Instantly',
      description: 'Never miss a call again. Our AI answers every call in seconds, 24/7.',
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: 'Takes Reservations',
      description: 'Seamlessly handle bookings and reservations without lifting a finger.',
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Integrates with POS',
      description: 'Works with your existing systems for a smooth workflow.',
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
      <section className="bg-gradient-to-br from-background to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl mb-6">
                We take your calls, so you can focus on the food.
              </h1>
              <p className="text-xl mb-8 text-foreground/90">
                DineTalk is an AI receptionist for restaurants that handles calls, bookings, and
                orders — 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onNavigate('demo')}>
                  Book a Demo
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('demo')}>
                  Try Live AI Demo
                </Button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758216169108-d1b62d114582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcGhvbmUlMjBjYWxsfGVufDF8fHx8MTc2MTE4MjczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Restaurant phone call"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose DineTalk?</h2>
            <p className="text-xl text-muted-foreground">
              Built for restaurants, cafés, and takeaways
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
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
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-8">Trusted by Local Restaurants</h2>
          <Card className="bg-card border-0">
            <CardContent className="p-8">
              <p className="text-xl mb-6 italic">
                "DineTalk has been a game-changer for our restaurant. We never miss a booking
                anymore, and our staff can focus on what they do best — serving great food."
              </p>
              <div className="flex items-center justify-center gap-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758518727077-ffb66ffccced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYxMTM5OTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Restaurant owner"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <p>Sarah Mitchell</p>
                  <p className="text-muted-foreground">Owner, The Rustic Table</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl mb-8 opacity-90">
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
