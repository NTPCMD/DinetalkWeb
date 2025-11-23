import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 pt-4" data-reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Contact</p>
        <h1 className="text-4xl font-semibold">Speak with the Danao concierge team.</h1>
        <p className="text-white/70 max-w-3xl">
          Tell us about your project, venue, or logistics challenge. We respond quickly with a clear plan and a single point of contact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal>
        <div className="lux-card">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37] mb-2">Call</p>
          <div className="flex items-center gap-3 text-white/80">
            <Phone className="text-[#d4af37]" />
            <div>
              <p className="font-semibold text-white">+61 403 982 811</p>
              <p className="text-sm text-white/70">24/7 concierge line</p>
            </div>
          </div>
        </div>
        <div className="lux-card">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37] mb-2">Email</p>
          <div className="flex items-center gap-3 text-white/80">
            <Mail className="text-[#d4af37]" />
            <div>
              <p className="font-semibold text-white">info@danao.group</p>
              <p className="text-sm text-white/70">Share your requirements and timelines</p>
            </div>
          </div>
        </div>
        <div className="lux-card">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37] mb-2">HQ</p>
          <div className="flex items-center gap-3 text-white/80">
            <MapPin className="text-[#d4af37]" />
            <div>
              <p className="font-semibold text-white">Brisbane, Australia</p>
              <p className="text-sm text-white/70">Deploying teams nationally</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lux-card" data-reveal>
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Project brief</p>
          <h2 className="text-2xl font-semibold">Ready to move fast?</h2>
          <p className="text-white/70 max-w-3xl">
            Email us your objectives, timelines, locations, and budget signals. We will assemble the right Danao leads and respond with a step-by-step action plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:info@danao.group" className="lux-button lux-button-primary">
              Email the team
            </a>
            <Link to="/services" className="lux-button lux-button-ghost">
              Review services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
