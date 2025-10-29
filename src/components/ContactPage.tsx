import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = {
    "form-name": "contact",
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  };
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(data),
  })
    .then(() => {
      alert("Thanks! We’ll be in touch by email.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    })
    .catch(() => alert("Sorry, something went wrong. Please try again."));
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl mb-8">Send us a Message</h2>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <div>
                  <Label htmlFor="name" className="mb-2">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-2">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px]"
                    placeholder="Tell us about your restaurant and how we can help..."
                  />
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">Perth, Western Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a
                        href="mailto:hello@dinetalk.com.au"
                        className="text-primary hover:underline"
                      >
                        hello@dinetalk.com.au
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-0">
              <CardContent className="p-6">
                <h3 className="text-xl mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground/80 mt-4">
                  * Our AI receptionist is available 24/7 for demos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3">Prefer to talk?</h3>
                <p className="mb-4 opacity-90">
                  Book a free demo call and speak directly with our team.
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => onNavigate?.('demo')}
                >
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
