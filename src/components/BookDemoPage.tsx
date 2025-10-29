import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function BookDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-6">Book a Free Demo</h1>
          <p className="text-xl text-muted-foreground">
            See DineTalk in action and discover how we can transform your restaurant's call handling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section (Calendly) */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Your Demo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-2xl overflow-hidden shadow-xl fade-in-up" style={{ minHeight: "720px" }}>
                <iframe
                  src="https://calendly.com/newtownpunjabi/new-meeting?primaryColor=f97316&textColor=000000"
                  width="100%"
                  height="720"
                  frameBorder="0"
                ></iframe>
              </div>
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
            <Card className="mb-6">
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
                  AI receptionist.
                </p>
                <Button variant="outline" className="w-full">
                  Get Demo Phone Number
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
