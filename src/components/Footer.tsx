import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#d4af37]/30 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3" data-reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">Danao Group</p>
          <p className="text-lg font-semibold">Premium multi-industry services across Australia.</p>
          <p className="text-sm text-white/70">
            From digital to logistics, we orchestrate seamless experiences with concierge-level care.
          </p>
        </div>
        <div className="space-y-3" data-reveal>
          <h3 className="text-lg font-semibold text-[#d4af37]">Quick Links</h3>
          <div className="flex flex-col gap-2 text-white/80">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
            <Link to="/services" className="hover:text-[#d4af37] transition-colors">Services</Link>
            <Link to="/concierge" className="hover:text-[#d4af37] transition-colors">Concierge</Link>
            <Link to="/contact" className="hover:text-[#d4af37] transition-colors">Contact</Link>
          </div>
        </div>
        <div className="space-y-3" data-reveal>
          <h3 className="text-lg font-semibold text-[#d4af37]">Get in touch</h3>
          <p className="text-white/80">info@danao.group</p>
          <p className="text-white/80">+61 403 982 811</p>
          <p className="text-white/60 text-sm">
            Brisbane &amp; nationwide support for premium hospitality, retail, logistics, digital and concierge needs.
          </p>
        </div>
      </div>
      <div className="border-t border-[#d4af37]/20 py-5 text-center text-white/60 text-sm">
        © {year} Danao Group. All rights reserved.
      </div>
    </footer>
  );
}
