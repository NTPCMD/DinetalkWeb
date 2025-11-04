import { Mail, MapPin, Phone } from 'lucide-react';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';
import { PageKey, PAGE_PATHS } from '../routes';
import type { MouseEvent } from 'react';

interface FooterProps {
  onNavigate: (page: PageKey) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleInternalLink = (event: MouseEvent<HTMLAnchorElement>, page: PageKey) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a
              href={PAGE_PATHS.home}
              onClick={(event) => handleInternalLink(event, 'home')}
              className="mb-4 inline-block"
            >
              <img src={logo} alt="DineTalk" className="h-16 w-auto" />
            </a>
            <p className="text-muted-foreground">
              AI receptionist for restaurants that handles calls, bookings, and orders — 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a
                href={PAGE_PATHS.home}
                onClick={(event) => handleInternalLink(event, 'home')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Home
              </a>
              <a
                href={PAGE_PATHS.about}
                onClick={(event) => handleInternalLink(event, 'about')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                About
              </a>
              <a
                href={PAGE_PATHS.faq}
                onClick={(event) => handleInternalLink(event, 'faq')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                FAQ
              </a>
              <a
                href={PAGE_PATHS.contact}
                onClick={(event) => handleInternalLink(event, 'contact')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Contact
              </a>
              <a
                href="https://dinetalk.com.au/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://dinetalk.com.au/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                <span>Perth, Western Australia</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={20} className="flex-shrink-0" />
                <a
                  href="tel:+61403982811"
                  className="hover:text-primary transition-colors"
                >
                  0403 982 811
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={20} className="flex-shrink-0" />
                <a
                  href="mailto:hello@dinetalk.com.au"
                  className="hover:text-primary transition-colors"
                >
                  hello@dinetalk.com.au
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
  );
}
