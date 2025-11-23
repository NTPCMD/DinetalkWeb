export interface DanaoService {
  id: string;
  name: string;
  summary: string;
  bullets: string[];
}

export const services: DanaoService[] = [
  {
    id: 'website-building',
    name: 'Danao Website Building',
    summary: 'Luxury-grade web experiences, landing pages and eCommerce builds with concierge support.',
    bullets: [
      'Premium UI/UX with conversion-focused flows',
      'Launch management, hosting, and analytics setup',
      'Ongoing optimisation with VIP-level support',
    ],
  },
  {
    id: 'digital-creative',
    name: 'Danao Digital & Creative',
    summary: 'Branding, campaigns and content designed to move audiences and uplift premium offers.',
    bullets: [
      'Brand systems, identity refresh, and launch kits',
      'High-end creative production across photo, video, and copy',
      'Omni-channel campaign orchestration and reporting',
    ],
  },
  {
    id: 'logistics-transport',
    name: 'Danao Logistics & Transport',
    summary: 'White-glove logistics, freight, and last-mile solutions across Australia.',
    bullets: [
      'National freight coordination and express turnarounds',
      'Special handling for luxury goods and fragile items',
      'Route optimisation with live tracking and communication',
    ],
  },
  {
    id: 'property-facilities',
    name: 'Danao Property & Facilities',
    summary: 'Property services that keep premium assets pristine and guest-ready.',
    bullets: [
      'Facilities management with proactive maintenance',
      'On-demand trade coordination and refurb teams',
      'Guest-ready standards for luxury hospitality spaces',
    ],
  },
  {
    id: 'business-support',
    name: 'Danao Business Support',
    summary: 'Operational support pods that act like your in-house chief of staff.',
    bullets: [
      'Executive assistance, scheduling, and triage',
      'Document creation, SOPs, and process automation',
      'Vendor, partner, and stakeholder coordination',
    ],
  },
  {
    id: 'hospitality-services',
    name: 'Danao Hospitality Services',
    summary: 'Elevated hospitality teams and systems for venues, events, and VIP guests.',
    bullets: [
      'Staffing, training, and guest experience playbooks',
      'Reservations, bookings, and waitlist management',
      'Premium service recovery and loyalty programs',
    ],
  },
  {
    id: 'events-experiences',
    name: 'Danao Events & Experiences',
    summary: 'End-to-end event direction with a luxury, detail-obsessed mindset.',
    bullets: [
      'Concept, creative direction, and production schedules',
      'Vendor sourcing, contracts, and onsite show-calling',
      'Concierge guest management and post-event wrap',
    ],
  },
  {
    id: 'concierge-services',
    name: 'Danao Concierge Services',
    summary: 'Discreet lifestyle and corporate concierge care for executives and VIP travellers.',
    bullets: [
      'Travel, transfers, and premium accommodation coordination',
      'Private bookings, reservations, and personalised itineraries',
      'On-call assistance for time-sensitive requests',
    ],
  },
  {
    id: 'store-setup-retail',
    name: 'Danao Store Setup & Retail Ops',
    summary: 'Retail launch and operations support to open, refine, and scale flagship experiences.',
    bullets: [
      'Store design coordination and fit-out oversight',
      'POS, inventory, and staffing readiness',
      'Ongoing ops audits with sales coaching',
    ],
  },
];
