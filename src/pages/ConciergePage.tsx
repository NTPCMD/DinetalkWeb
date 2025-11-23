import { CheckCircle2, Plane, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ConciergePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 pt-4" data-reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Concierge Division</p>
        <h1 className="text-4xl font-semibold">Danao Concierge Services</h1>
        <p className="text-white/70 max-w-3xl">
          A specialist division within the Danao Group providing discreet, high-touch support for executives, founders, and travelling teams. It is one pillar of our nine-service grid—not the whole story.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal>
        <div className="lux-card feature-card">
          <Plane className="text-[#d4af37] mb-3" />
          <p className="text-lg font-semibold">Travel &amp; transfers</p>
          <p className="text-white/70 text-sm">Flights, ground transport, and premium accommodation arranged with VIP briefings.</p>
        </div>
        <div className="lux-card feature-card">
          <CheckCircle2 className="text-[#d4af37] mb-3" />
          <p className="text-lg font-semibold">Private bookings</p>
          <p className="text-white/70 text-sm">Dining, events, access, and bespoke itineraries handled with total discretion.</p>
        </div>
        <div className="lux-card feature-card">
          <Shield className="text-[#d4af37] mb-3" />
          <p className="text-lg font-semibold">On-call assurance</p>
          <p className="text-white/70 text-sm">Rapid-response assistance for time-sensitive requests and guest care.</p>
        </div>
      </div>

      <div className="lux-card" data-reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37] mb-2">Part of the Danao ecosystem</p>
        <p className="text-white/80 mb-4">
          Concierge ties into our logistics, digital, hospitality, and property teams. When you need more than reservations—like launch support, VIP events, or relocation logistics—we mobilise the wider group instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/services" className="lux-button lux-button-primary">See all services</Link>
          <Link to="/contact" className="lux-button lux-button-ghost">Talk to concierge</Link>
        </div>
      </div>
    </div>
  );
}
