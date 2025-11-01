import { Mail, MapPin, Phone } from 'lucide-react';
import logo from 'figma:asset/1e9bf23945892e4a2dda067e920f48e46fbe1f39.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="mb-4 inline-block"
            >
              <img src={logo} alt="DineTalk" className="h-16 w-auto" />
            </button>
            <p className="text-muted-foreground">
              AI receptionist for restaurants that handles calls, bookings, and orders — 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => onNavigate('faq')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Contact
              </button>
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
