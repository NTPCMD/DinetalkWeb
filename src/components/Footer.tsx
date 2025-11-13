import { Mail, MapPin, Phone } from 'lucide-react';
import { visualEditing } from '../lib/stackbit-sdk';
import footerContent from '../content/footer.json';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';
import { pageToPath } from '../lib/routing';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const content = footerContent;
  const ve = visualEditing({ objectId: 'src/content/footer.json' });

  return (
    <>
      {/* Bottom CTA Section - Above Footer */}
      <section className="bg-background py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">
            Transform your restaurant's call handling with DineTalk's AI receptionist.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md md:max-w-none mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full md:w-auto min-h-[48px]"
              onClick={() => onNavigate('demo')}
            >
              Book a Demo
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full md:w-auto min-h-[48px]"
              onClick={() => onNavigate('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a
              href={pageToPath('home')}
              onClick={(event) => {
                event.preventDefault();
                onNavigate('home');
              }}
              className="mb-4 inline-block"
            >
              <img
                src={logo}
                alt="DineTalk"
                className="h-16 w-auto"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="text-muted-foreground" {...ve.field('brand.description')}>
              {content.brand.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {content.quickLinks.map((link, index) => (
                <a
                  key={link.path}
                  href={pageToPath(link.path)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.path);
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                  {...ve.field(`quickLinks[${index}].label`)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                <span {...ve.field('contact.location')}>{content.contact.location}</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Phone size={20} className="mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={content.contact.phone.href} className="hover:text-primary transition-colors" {...ve.field('contact.phone.label')}>
                    {content.contact.phone.label}
                  </a>
                  <a href={content.contact.demo.href} className="hover:text-primary transition-colors text-sm" {...ve.field('contact.demo.label')}>
                    {content.contact.demo.label}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={20} className="flex-shrink-0" />
                <a
                  href={content.contact.email.href}
                  className="hover:text-primary transition-colors"
                  {...ve.field('contact.email.label')}
                >
                  {content.contact.email.label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} DineTalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
