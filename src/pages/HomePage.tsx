import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../content/services';

export function HomePage() {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18),transparent_25%),radial-gradient(circle_at_80%_0,rgba(212,175,55,0.2),transparent_20%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-3xl space-y-6" data-reveal>
            <p className="uppercase tracking-[0.3em] text-[#d4af37] text-sm">Luxury multi-industry collective</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Danao Group
              <span className="block text-2xl md:text-3xl text-white/80 mt-3">
                Premium Multi-Industry Services Across Australia.
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Concierge-led teams delivering digital, logistics, property, hospitality, events, concierge and retail ops with one gold-standard standard of care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/services" className="lux-button lux-button-primary">
                Explore Services <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/contact" className="lux-button lux-button-ghost">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Service lines</p>
            <h2 className="text-3xl font-semibold">A gold-standard grid of capability</h2>
            <p className="text-white/70 mt-2 max-w-2xl">
              Nine luxury-calibre divisions, one concierge team. Tap a tile to deep dive on the Services page.
            </p>
          </div>
          <Sparkles className="text-[#d4af37]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              className="lux-card feature-card"
              data-reveal
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <ArrowRight size={18} className="text-[#d4af37]" />
              </div>
              <p className="text-white/70 text-sm">{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#0a0a0a] border-y border-[#d4af37]/20" data-reveal>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row md:items-center gap-10">
          <div className="flex-1 space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">About Danao</p>
            <h3 className="text-3xl font-semibold">Black-card thinking, end-to-end delivery.</h3>
            <p className="text-white/70 max-w-2xl">
              Danao Group brings together elite operators, strategists, and coordinators who deliver on the details. We orchestrate every division to feel like one cohesive, concierge-led partner.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="lux-card text-left" data-reveal>
              <p className="text-[#d4af37] text-sm mb-2">Hospitality heritage</p>
              <p className="text-white/80">Teams trained to anticipate needs and manage VIP expectations.</p>
            </div>
            <div className="lux-card text-left" data-reveal>
              <p className="text-[#d4af37] text-sm mb-2">National reach</p>
              <p className="text-white/80">On-the-ground support across Brisbane and Australia-wide projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-[#d4af37]" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Why choose Danao</p>
            <h3 className="text-3xl font-semibold">Luxury detail, operational discipline</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Concierge-led project control',
              desc: 'Single point of contact who manages every moving part with proactive communication.',
            },
            {
              title: 'Cross-division muscle',
              desc: 'Digital, logistics, property, hospitality and events teams that already know how to work together.',
            },
            {
              title: 'Gold-standard polish',
              desc: 'Black-card attention to detail, quality, and privacy across every engagement.',
            },
          ].map((item, idx) => (
            <div key={item.title} className="lux-card feature-card" data-reveal style={{ transitionDelay: `${idx * 80}ms` }}>
              <p className="text-lg font-semibold mb-2">{item.title}</p>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <div className="lux-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(212,175,55,0.12),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(212,175,55,0.1),transparent_30%)]" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Next step</p>
              <h3 className="text-2xl font-semibold">Let us orchestrate your next move.</h3>
              <p className="text-white/70 mt-2 max-w-2xl">
                Tell us what you need solved. We will assemble the right mix of digital, logistics, property, hospitality or concierge specialists and move immediately.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="lux-button lux-button-primary">
                Talk to Danao <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/services" className="lux-button lux-button-ghost">
                View full services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
