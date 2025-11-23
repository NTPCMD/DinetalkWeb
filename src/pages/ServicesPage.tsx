import { services } from '../content/services';

export function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4 pt-4" data-reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Services</p>
        <h1 className="text-4xl font-semibold">Every Danao division, one luxury standard.</h1>
        <p className="text-white/70 max-w-3xl">
          Explore our nine specialist lines. Each service operates with the same concierge mindset and a single command centre so delivery feels seamless end to end.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="lux-card feature-card"
            data-reveal
            style={{ transitionDelay: `${idx * 60}ms` }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37] mb-2">{String(idx + 1).padStart(2, '0')}</p>
            <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
            <p className="text-white/70 mb-4">{service.summary}</p>
            <ul className="space-y-2 text-white/80 list-disc pl-5">
              {service.bullets.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
