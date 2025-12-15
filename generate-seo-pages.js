const fs = require('fs');
const path = require('path');

// Helper function to create HTML page with SEO structure
function generateSEOPage(data) {
  const {
    title,
    description,
    keywords,
    canonical,
    h1,
    h2Items = [],
    h3Items = [],
    content,
    localArea = 'Perth, Western Australia',
    ctaText = 'Book Your Free Demo Today',
    ctaLink = '/demo',
    internalLinks = [],
    images = []
  } = data;

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="DineTalk Australia" />
  <meta name="geo.region" content="AU-WA" />
  <meta name="geo.placename" content="${localArea}" />
  <link rel="canonical" href="${canonical}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://dinetalk.com.au/assets/og-image.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonical}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://dinetalk.com.au/assets/og-image.jpg" />
  
  <meta name="theme-color" content="#ff9936" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Inter:wght@400;500&display=swap" />
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  </script>
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DineTalk",
    "description": "${description}",
    "url": "${canonical}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Perth",
      "addressRegion": "WA",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-31.9505",
      "longitude": "115.8605"
    },
    "areaServed": {
      "@type": "City",
      "name": "${localArea}"
    }
  }
  </script>
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; background: #fff; padding-top: 70px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { position: fixed; top: 0; left: 0; right: 0; width: 100%; background: #2b2d35; color: white; padding: 0; box-shadow: 0 6px 28px rgba(0, 0, 0, 0.2); z-index: 1000; border-bottom: 1px solid rgba(0, 0, 0, 0.35); }
    nav { display: flex; justify-content: space-between; align-items: center; height: 64px; }
    .logo { font-size: 24px; font-weight: 700; font-family: 'Poppins', sans-serif; color: white; text-decoration: none; }
    .nav-links { display: flex; gap: 30px; list-style: none; align-items: center; }
    .nav-links a { color: rgba(255,255,255,0.8); text-decoration: none; font-weight: 500; transition: color 0.3s; }
    .nav-links a:hover { color: white; }
    .demo-button { background: #e58e23 !important; color: white !important; padding: 10px 24px; border-radius: 6px; font-weight: 600; border: 1px solid #e58e23; transition: background 0.3s, border-color 0.3s; box-shadow: 0 2px 8px rgba(229, 142, 35, 0.3); }
    .demo-button:hover { background: #f29b3a !important; border-color: #f29b3a; }
    .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 80px 0; text-align: center; }
    h1 { font-family: 'Poppins', sans-serif; font-size: 48px; font-weight: 700; margin-bottom: 20px; line-height: 1.2; }
    h2 { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 700; margin: 40px 0 20px; color: #1a1a2e; }
    h3 { font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 600; margin: 30px 0 15px; color: #16213e; }
    .hero p { font-size: 20px; margin-bottom: 30px; opacity: 0.9; }
    .cta-button { display: inline-block; background: #ff9936; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 15px rgba(255, 153, 54, 0.3); }
    .cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 153, 54, 0.4); }
    .content { padding: 60px 0; }
    .content-section { margin-bottom: 50px; }
    .content-section p { margin-bottom: 15px; font-size: 18px; color: #555; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 40px 0; }
    .feature-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transition: transform 0.3s; }
    .feature-card:hover { transform: translateY(-5px); }
    .feature-card h3 { margin-top: 0; color: #ff9936; }
    .internal-links { background: #f8f9fa; padding: 40px; border-radius: 12px; margin: 40px 0; }
    .internal-links h3 { margin-top: 0; }
    .internal-links ul { list-style: none; padding: 0; }
    .internal-links li { margin: 10px 0; }
    .internal-links a { color: #ff6b35; text-decoration: none; font-weight: 500; transition: color 0.3s; }
    .internal-links a:hover { color: #ff9936; }
    .cta-section { background: linear-gradient(135deg, #ff9936 0%, #ff6b35 100%); color: white; padding: 80px 0; text-align: center; margin: 60px 0 0; }
    .cta-section h2 { color: white; font-size: 42px; }
    .cta-section p { font-size: 20px; margin-bottom: 35px; }
    .cta-section .cta-button { background: white; color: #ff6b35; font-size: 20px; padding: 18px 50px; font-weight: 700; }
    .cta-section .cta-button:hover { background: #f8f8f8; color: #ff9936; transform: translateY(-3px); }
    .cta-section p { font-size: 20px; margin-bottom: 30px; }
    footer { background: #1a1a2e; color: white; padding: 40px 0; text-align: center; }
    .footer-links { display: flex; justify-content: center; gap: 30px; list-style: none; margin-bottom: 20px; flex-wrap: wrap; }
    .footer-links a { color: white; text-decoration: none; opacity: 0.8; transition: opacity 0.3s; }
    .footer-links a:hover { opacity: 1; }
    img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
    @media (max-width: 768px) {
      h1 { font-size: 32px; }
      h2 { font-size: 28px; }
      .hero { padding: 60px 0; }
      .features-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <a href="/" class="logo">DineTalk</a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/demo" class="demo-button">Book Demo</a></li>
        </ul>
      </nav>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h1>${h1}</h1>
      <p>${description}</p>
      <a href="${ctaLink}" class="cta-button">${ctaText}</a>
    </div>
  </section>
  
  <main class="content">
    <div class="container">
      ${content}
    </div>
  </main>
  
  ${internalLinks.length > 0 ? `
  <section class="internal-links">
    <div class="container">
      <h3>Related Pages</h3>
      <ul>
        ${internalLinks.map(link => `<li><a href="${link.url}">${link.text}</a></li>`).join('')}
      </ul>
    </div>
  </section>
  ` : ''}
  
  <section class="cta-section">
    <div class="container">
      <h2>Ready to Transform Your Restaurant?</h2>
      <p>Join hundreds of Perth restaurants using DineTalk to handle their calls and bookings.</p>
      <a href="/demo" class="cta-button">Schedule Your Free Demo</a>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <ul class="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
      <p>&copy; ${new Date().getFullYear()} DineTalk Australia. All rights reserved.</p>
      <p>Serving restaurants across Perth and Western Australia</p>
    </div>
  </footer>
</body>
</html>`;
}

// Perth suburbs for local SEO
const perthSuburbs = [
  'Northbridge', 'Fremantle', 'Subiaco', 'Mount Lawley', 'Victoria Park',
  'Leederville', 'West Perth', 'East Perth', 'South Perth', 'Nedlands',
  'Claremont', 'Cottesloe', 'Scarborough', 'Perth CBD', 'Inglewood',
  'Maylands', 'Bayswater', 'Morley', 'Osborne Park', 'Balcatta',
  'Karrinyup', 'Dianella', 'Joondanna', 'Yokine', 'Tuart Hill',
  'Innaloo', 'Floreat', 'Wembley', 'City Beach', 'Mosman Park',
  'Peppermint Grove', 'Dalkeith', 'Applecross', 'Booragoon', 'Melville',
  'Willetton', 'Bull Creek', 'Canning Vale', 'Bentley', 'Riverton'
];

// Additional WA suburbs and regional hubs to expand local coverage
const expandedWARegions = [
  'Rockingham', 'Mandurah', 'Joondalup', 'Ellenbrook', 'Kwinana',
  'Armadale', 'Gosnells', 'Kelmscott', 'Beckenham', 'Belmont',
  'Guildford', 'Midland', 'Bassendean', 'Forrestfield', 'Belmont Park',
  'Hillarys', 'Whitfords', 'Duncraig', 'Kingsley', 'Woodvale',
  'Swan Valley', 'Scarborough Beachfront', 'Cannington', 'Welshpool', 'Bibra Lake',
  'Cockburn Central', 'Success', 'Atwell', 'Harrisdale', 'Piara Waters',
  'Byford', 'Serpentine', 'Mundaring', 'Kalamunda', 'Roleystone',
  'Champion Lakes', 'South Fremantle', 'Halls Head', 'Dawesville', 'Shoalwater'
];

// Blog article topics
const blogTopics = [
  { title: 'How AI is Revolutionising Perth Restaurants in 2024', slug: 'ai-revolutionising-perth-restaurants-2024' },
  { title: '10 Ways to Reduce No-Shows at Your Restaurant', slug: 'reduce-restaurant-no-shows' },
  { title: 'The Complete Guide to Restaurant Booking Systems', slug: 'restaurant-booking-systems-guide' },
  { title: 'Why Perth Restaurants Are Switching to AI Receptionists', slug: 'perth-restaurants-ai-receptionists' },
  { title: 'Maximising Revenue During Perth Peak Dining Hours', slug: 'maximise-revenue-peak-dining-hours' },
  { title: 'Customer Service Excellence in Perth Hospitality', slug: 'customer-service-excellence-perth' },
  { title: 'Integrating Your POS System with AI Technology', slug: 'pos-system-ai-integration' },
  { title: 'The Future of Restaurant Automation in Australia', slug: 'future-restaurant-automation-australia' },
  { title: 'Managing High Call Volumes During Busy Periods', slug: 'managing-high-call-volumes' },
  { title: 'Top Restaurant Trends in Western Australia 2024', slug: 'restaurant-trends-wa-2024' },
  { title: 'How to Handle Online Reservations Effectively', slug: 'handle-online-reservations-effectively' },
  { title: 'Building Customer Loyalty in Perth Restaurants', slug: 'building-customer-loyalty-perth' },
  { title: 'The ROI of Restaurant Automation Technology', slug: 'roi-restaurant-automation' },
  { title: 'Menu Engineering Tips for Perth Restaurants', slug: 'menu-engineering-tips-perth' },
  { title: 'Streamlining Table Turnover Without Rushing Guests', slug: 'streamlining-table-turnover' },
  { title: 'Voice AI vs Traditional Phone Systems for Restaurants', slug: 'voice-ai-vs-traditional-phone-systems' },
  { title: 'Reducing Staff Burnout in Busy Perth Venues', slug: 'reducing-staff-burnout-perth' },
  { title: 'The Importance of 24/7 Booking Availability', slug: 'importance-24-7-booking-availability' },
  { title: 'Data-Driven Decision Making for Restaurant Owners', slug: 'data-driven-restaurant-decisions' },
  { title: 'Creating Memorable Dining Experiences in Perth', slug: 'memorable-dining-experiences-perth' },
  { title: 'Restaurant Marketing Strategies That Work in WA', slug: 'restaurant-marketing-strategies-wa' },
  { title: 'Managing Dietary Requirements with AI Assistance', slug: 'managing-dietary-requirements-ai' },
  { title: 'Cost-Effective Solutions for Small Perth Restaurants', slug: 'cost-effective-solutions-small-restaurants' },
  { title: 'Handling Last-Minute Reservations and Cancellations', slug: 'handling-last-minute-reservations' },
  { title: 'The Benefits of Automated Customer Communication', slug: 'benefits-automated-customer-communication' },
  { title: 'Perth Restaurant Industry Insights and Statistics', slug: 'perth-restaurant-industry-insights' },
  { title: 'Improving Online Reputation for Perth Venues', slug: 'improving-online-reputation-perth' },
  { title: 'Training Staff to Work Alongside AI Technology', slug: 'training-staff-ai-technology' },
  { title: 'Seasonal Menu Planning for WA Restaurants', slug: 'seasonal-menu-planning-wa' },
  { title: 'Maximising Weekend Bookings in Perth', slug: 'maximising-weekend-bookings-perth' },
  { title: 'The Impact of COVID-19 on Perth Dining Habits', slug: 'covid-impact-perth-dining-habits' },
  { title: 'Sustainability Practices for Perth Restaurants', slug: 'sustainability-practices-perth-restaurants' },
  { title: 'Group Booking Management Made Easy', slug: 'group-booking-management' },
  { title: 'Understanding Perth Diner Preferences and Behaviours', slug: 'perth-diner-preferences-behaviours' },
  { title: 'Restaurant Technology Stack Essentials for 2024', slug: 'restaurant-technology-stack-2024' },
  { title: 'Creating Instagram-Worthy Moments in Your Restaurant', slug: 'instagram-worthy-restaurant-moments' },
  { title: 'The Science Behind Optimal Table Layouts', slug: 'optimal-table-layouts-science' },
  { title: 'Local Sourcing Benefits for Perth Restaurants', slug: 'local-sourcing-benefits-perth' },
  { title: 'Upselling Techniques That Don\'t Feel Pushy', slug: 'upselling-techniques-not-pushy' },
  { title: 'Why Restaurant Websites Need Built-in Booking', slug: 'restaurant-websites-built-in-booking' }
];

// Additional Perth-focused long-form articles
const expandedBlogTopics = [
  { title: 'How Perth Restaurants Can Automate After-Hours Calls', slug: 'automate-after-hours-calls-perth' },
  { title: 'AI Upselling Playbook for Perth Venues', slug: 'ai-upselling-playbook-perth' },
  { title: 'Reducing Wait Times in Busy WA Restaurants', slug: 'reducing-wait-times-wa-restaurants' },
  { title: 'Data Privacy Considerations for Hospitality AI in Australia', slug: 'hospitality-ai-data-privacy-australia' },
  { title: 'How to Launch a New Venue in Perth with AI Support', slug: 'launch-new-venue-perth-ai-support' },
  { title: 'Voice AI Scripts That Convert Perth Callers', slug: 'voice-ai-scripts-perth-callers' },
  { title: 'Seasonal Campaign Ideas for WA Restaurants', slug: 'seasonal-campaign-ideas-wa-restaurants' },
  { title: 'Building Multilingual Phone Flows for Perth Diners', slug: 'multilingual-phone-flows-perth' },
  { title: 'How to Handle Large Group Bookings Automatically', slug: 'handle-large-group-bookings-automatically' },
  { title: 'Preventing Missed Functions and Event Enquiries', slug: 'preventing-missed-event-enquiries' },
  { title: 'Boosting Takeaway Orders with AI Phone Assistants', slug: 'boosting-takeaway-orders-ai-assistants' },
  { title: 'Designing Accessibility-Friendly Phone Menus', slug: 'accessibility-friendly-phone-menus' },
  { title: 'Leveraging Caller Data to Improve Menu Engineering', slug: 'caller-data-menu-engineering' },
  { title: 'Hospitality AI ROI Benchmarks for Perth Operators', slug: 'hospitality-ai-roi-perth' },
  { title: 'Crisis Communication Playbooks for WA Venues', slug: 'crisis-communication-playbooks-wa' },
  { title: '24/7 Support Expectations from Perth Diners', slug: '24-7-support-expectations-perth' },
  { title: 'How AI Protects Revenue During Staff Shortages', slug: 'ai-protects-revenue-staff-shortages' },
  { title: 'Improving Function Space Utilisation with AI', slug: 'function-space-utilisation-ai' },
  { title: 'AI Reception for Winery Restaurants in Swan Valley', slug: 'ai-reception-winery-restaurants-swan-valley' },
  { title: 'WA Tourism Season Readiness Checklist for Restaurants', slug: 'wa-tourism-season-readiness' }
];

// Product landing pages
const productPages = [
  { title: 'AI Restaurant Receptionist', slug: 'ai-restaurant-receptionist', feature: 'AI Receptionist' },
  { title: 'Automated Booking System', slug: 'automated-booking-system', feature: 'Booking Automation' },
  { title: 'POS System Integration', slug: 'pos-system-integration', feature: 'POS Integration' },
  { title: 'Menu Management Software', slug: 'menu-management-software', feature: 'Menu Management' },
  { title: 'Customer Communication Platform', slug: 'customer-communication-platform', feature: 'Customer Updates' },
  { title: 'AI for Fine Dining Restaurants', slug: 'ai-fine-dining-restaurants', feature: 'Fine Dining Solution' },
  { title: 'Cafe Booking System', slug: 'cafe-booking-system', feature: 'Cafe Management' },
  { title: 'Bar Reservation Management', slug: 'bar-reservation-management', feature: 'Bar Bookings' },
  { title: 'Quick Service Restaurant AI', slug: 'quick-service-restaurant-ai', feature: 'QSR Automation' },
  { title: 'Food Truck Booking Solution', slug: 'food-truck-booking-solution', feature: 'Food Truck Orders' },
  { title: 'Catering Order Management', slug: 'catering-order-management', feature: 'Catering Management' },
  { title: 'Restaurant Call Answering Service', slug: 'restaurant-call-answering-service', feature: 'Call Handling' },
  { title: 'Table Reservation System', slug: 'table-reservation-system', feature: 'Table Management' },
  { title: 'Restaurant CRM Software', slug: 'restaurant-crm-software', feature: 'Customer Relationships' },
  { title: 'Waitlist Management Tool', slug: 'waitlist-management-tool', feature: 'Waitlist System' },
  { title: 'Multi-Location Restaurant Solution', slug: 'multi-location-restaurant-solution', feature: 'Multi-Location' },
  { title: 'Restaurant Analytics Dashboard', slug: 'restaurant-analytics-dashboard', feature: 'Analytics' },
  { title: 'Voice Ordering System', slug: 'voice-ordering-system', feature: 'Voice Orders' },
  { title: 'Restaurant SMS Marketing', slug: 'restaurant-sms-marketing', feature: 'SMS Marketing' },
  { title: 'Delivery Integration Platform', slug: 'delivery-integration-platform', feature: 'Delivery Management' }
];

// Additional feature landing pages for deeper coverage
const expandedProductPages = [
  { title: 'Multilingual AI Receptionist', slug: 'multilingual-ai-receptionist', feature: 'Multilingual Reception' },
  { title: 'AI Reservation Waitlist Assistant', slug: 'ai-reservation-waitlist-assistant', feature: 'Smart Waitlists' },
  { title: 'Restaurant Event Booking Assistant', slug: 'restaurant-event-booking-assistant', feature: 'Event Booking' },
  { title: 'Hospitality AI Compliance Toolkit', slug: 'hospitality-ai-compliance-toolkit', feature: 'Compliance Tools' },
  { title: 'AI Caller Sentiment Detection', slug: 'ai-caller-sentiment-detection', feature: 'Sentiment Analysis' },
  { title: 'AI Shift-Handover Notes for Restaurants', slug: 'ai-shift-handover-notes', feature: 'Shift Handover' },
  { title: 'Restaurant VIP Caller Recognition', slug: 'restaurant-vip-caller-recognition', feature: 'VIP Recognition' },
  { title: 'AI Function Enquiry Routing', slug: 'ai-function-enquiry-routing', feature: 'Event Routing' },
  { title: 'Swan Valley Winery Phone Automation', slug: 'swan-valley-winery-phone-automation', feature: 'Winery Automation' },
  { title: 'AI Allergy-Safe Ordering Assistant', slug: 'ai-allergy-safe-ordering-assistant', feature: 'Allergy Safety' }
];

// Generate suburb pages
console.log('Generating 40 Local SEO Suburb Pages...');
perthSuburbs.forEach((suburb, index) => {
  const data = {
    title: `AI Restaurant Receptionist ${suburb} Perth | DineTalk`,
    description: `DineTalk provides AI-powered restaurant receptionist services in ${suburb}, Perth. Automate your bookings, answer calls 24/7, and never miss a customer in ${suburb}, WA.`,
    keywords: `AI receptionist ${suburb}, restaurant booking ${suburb}, hospitality automation Perth, restaurant technology ${suburb}, DineTalk ${suburb}`,
    canonical: `https://dinetalk.com.au/pages/${suburb.toLowerCase().replace(/ /g, '-')}`,
    h1: `AI Restaurant Receptionist for ${suburb} Venues`,
    localArea: `${suburb}, Perth, Western Australia`,
    content: `
      <div class="content-section">
        <h2>Transform Your ${suburb} Restaurant with AI Technology</h2>
        <p>Are you running a busy restaurant, cafe, or bar in ${suburb}? DineTalk's AI-powered receptionist is designed specifically for Perth hospitality venues like yours. Our intelligent system handles calls, takes bookings, and manages customer enquiries 24/7, so you can focus on delivering exceptional dining experiences.</p>
        <p>Restaurants across ${suburb} and greater Perth are discovering the benefits of AI automation. Whether you're in ${suburb}'s bustling dining precinct or operating a neighbourhood gem, DineTalk integrates seamlessly with your existing systems.</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <h3>Never Miss a Booking</h3>
          <p>Your ${suburb} customers can make reservations any time of day or night. Our AI answers instantly, even during Perth's peak dining hours.</p>
        </div>
        <div class="feature-card">
          <h3>Local Perth Knowledge</h3>
          <p>Our system understands Perth dining culture and can provide information about your ${suburb} location, parking, and local recommendations.</p>
        </div>
        <div class="feature-card">
          <h3>Seamless Integration</h3>
          <p>Works with popular POS systems used by ${suburb} restaurants including Square, Lightspeed, and more.</p>
        </div>
      </div>
      
      <div class="content-section">
        <h2>Why ${suburb} Restaurants Choose DineTalk</h2>
        <p>Running a hospitality venue in ${suburb} comes with unique challenges. From managing weekend rushes to handling last-minute bookings, your team needs support. DineTalk's AI receptionist is specifically designed for Australian restaurants and understands the needs of Perth venues.</p>
        
        <h3>Perfect for All ${suburb} Venue Types</h3>
        <p>Whether you operate a fine dining restaurant, casual cafe, trendy bar, or local eatery in ${suburb}, DineTalk scales to your needs. Our technology serves venues of all sizes across Perth and Western Australia.</p>
        
        <h3>Built for Perth Hospitality</h3>
        <p>We understand the ${suburb} dining scene. From understanding local dining preferences to managing bookings during Fringe Festival or other Perth events, DineTalk adapts to your operational needs.</p>
        
        <h3>Reduce No-Shows in ${suburb}</h3>
        <p>Our automated reminder system sends SMS confirmations to customers booking at your ${suburb} venue, significantly reducing no-shows and last-minute cancellations.</p>
      </div>
      
      <div class="content-section">
        <h2>How DineTalk Works for ${suburb} Venues</h2>
        <p>Getting started with DineTalk at your ${suburb} restaurant is simple:</p>
        
        <h3>Step 1: Quick Setup</h3>
        <p>Connect DineTalk to your ${suburb} venue in under 30 minutes. Our team handles the technical setup while you focus on your service.</p>
        
        <h3>Step 2: Customise Your AI</h3>
        <p>We train the AI with your menu, opening hours, booking policies, and special requirements specific to your ${suburb} location.</p>
        
        <h3>Step 3: Go Live</h3>
        <p>Start taking calls and bookings automatically. Your ${suburb} customers will experience professional service every time they contact you.</p>
      </div>
      
      <div class="content-section">
        <h2>Serving ${suburb} and All Perth Suburbs</h2>
        <p>While we specialise in serving ${suburb} venues, DineTalk proudly supports restaurants, cafes, and bars throughout Perth and Western Australia. Our local team understands the unique characteristics of each Perth suburb and can customise our service to match your specific needs.</p>
        <p>Join leading hospitality venues across Perth who trust DineTalk to handle their customer communications professionally and efficiently.</p>
      </div>
    `,
    internalLinks: [
      { url: '/', text: 'DineTalk Home' },
      { url: '/demo', text: 'Book a Free Demo' },
      { url: '/about', text: 'About DineTalk' },
      { url: '/pages/ai-restaurant-receptionist', text: 'AI Restaurant Receptionist Features' },
      { url: '/pages/automated-booking-system', text: 'Automated Booking System' }
    ]
  };
  
  const filename = `${suburb.toLowerCase().replace(/ /g, '-')}.html`;
  const filepath = path.join(__dirname, 'pages', filename);
  fs.writeFileSync(filepath, generateSEOPage(data));
  console.log(`Created: ${filename}`);
});

console.log('\nGenerating 40 Additional WA Local SEO Pages...');
expandedWARegions.forEach((suburb) => {
  const slug = suburb.toLowerCase().replace(/ /g, '-');
  const data = {
    title: `AI Receptionist for ${suburb} Restaurants | DineTalk Perth & WA`,
    description: `DineTalk provides AI-powered call answering and booking automation for restaurants in ${suburb}, Perth and WA. Reduce missed calls, capture every reservation, and deliver 24/7 hospitality.` ,
    keywords: `AI receptionist ${suburb}, restaurant phone answering ${suburb}, Perth hospitality automation, booking AI ${suburb}, DineTalk ${suburb}`,
    canonical: `https://dinetalk.com.au/pages/${slug}`,
    h1: `AI Restaurant Receptionist Serving ${suburb} Venues`,
    localArea: `${suburb}, Perth, Western Australia`,
    content: `
      <div class="content-section">
        <h2>Always-On Phone Support for ${suburb} Venues</h2>
        <p>${suburb} restaurants, cafes, and pubs deserve reliable phone coverage. DineTalk answers calls instantly, captures bookings, and routes enquiries without placing pressure on your front-of-house team.</p>
        <p>Our Perth-based AI receptionist understands local dining expectations, from weekend rushes to regional tourism seasons across Western Australia.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <h3>24/7 Answering</h3>
          <p>Never miss a booking, even during peak service or after hours in ${suburb}.</p>
        </div>
        <div class="feature-card">
          <h3>Local Knowledge</h3>
          <p>Shares parking tips, directions, and venue details tailored to ${suburb} diners.</p>
        </div>
        <div class="feature-card">
          <h3>Smart Routing</h3>
          <p>Sends urgent calls to managers while handling routine questions automatically.</p>
        </div>
      </div>

      <div class="content-section">
        <h2>Why ${suburb} Operators Choose DineTalk</h2>
        <p>Hospitality teams across ${suburb} and greater Perth trust DineTalk to reduce no-shows, improve caller experience, and keep staff focused on guests in venue.</p>

        <h3>Quick Setup</h3>
        <p>Launch in under a week with menu training, booking rules, and custom scripts for ${suburb} locals.</p>

        <h3>Compliant and Secure</h3>
        <p>Australian-hosted, privacy-conscious AI that protects guest data while delivering consistent service.</p>

        <h3>Proven ROI</h3>
        <p>Venues across Western Australia recover lost revenue from missed calls and secure more repeat guests.</p>
      </div>
    `,
    internalLinks: [
      { url: '/', text: 'DineTalk Home' },
      { url: '/pages/perth-ai-receptionist', text: 'Perth AI Receptionist' },
      { url: '/pages/ai-restaurant-receptionist', text: 'AI Receptionist Features' },
      { url: '/pages/automated-booking-system', text: 'Booking Automation' },
      { url: '/pages/restaurant-call-answering-service', text: 'Call Answering Service' }
    ]
  };

  const filename = `${slug}.html`;
  const filepath = path.join(__dirname, 'pages', filename);
  fs.writeFileSync(filepath, generateSEOPage(data));
  console.log(`Created: ${filename}`);
});

// Generate blog articles
console.log('\nGenerating 40 Blog Articles...');
blogTopics.forEach((topic, index) => {
  const data = {
    title: `${topic.title} | DineTalk Blog`,
    description: `${topic.title} - Expert insights and tips for Perth restaurant owners from DineTalk, Australia's leading AI restaurant receptionist service.`,
    keywords: `restaurant management, Perth hospitality, restaurant tips, AI technology, dining industry, ${topic.slug}`,
    canonical: `https://dinetalk.com.au/pages/blog/${topic.slug}`,
    h1: topic.title,
    content: `
      <div class="content-section">
        <p><em>Published on ${new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        
        <h2>Introduction</h2>
        <p>The restaurant industry in Perth and across Australia is evolving rapidly. ${topic.title.toLowerCase()} represents a crucial aspect of modern hospitality management that every venue owner should understand.</p>
        <p>At DineTalk, we work with hundreds of restaurants across Perth and Western Australia, giving us unique insights into what works in today's competitive dining landscape.</p>
        
        <h2>Understanding the Challenge</h2>
        <p>Perth restaurant owners face numerous challenges in today's market. From managing peak dining periods to handling customer expectations, the hospitality industry demands excellence at every touchpoint. This is particularly true when it comes to customer communication and reservation management.</p>
        
        <h3>The Perth Dining Landscape</h3>
        <p>Western Australia's capital boasts a vibrant dining scene with diverse cuisines and venue styles. Understanding local preferences and adapting to seasonal changes is essential for success in Perth's hospitality sector.</p>
        
        <h3>Technology's Role in Modern Restaurants</h3>
        <p>Automation and AI technology are transforming how Perth restaurants operate. From booking systems to customer communication, smart technology enables venues to deliver better service while reducing operational overhead.</p>
        
        <h2>Best Practices and Solutions</h2>
        <p>Implementing effective strategies requires understanding both technology and hospitality fundamentals. Here are key considerations for Perth restaurant owners:</p>
        
        <h3>Streamlining Operations</h3>
        <p>Efficient operations are the backbone of any successful restaurant. By automating routine tasks like call answering and booking confirmation, your team can focus on delivering exceptional dining experiences.</p>
        
        <h3>Customer Experience First</h3>
        <p>Perth diners expect seamless service from the moment they decide to book a table. Ensuring your restaurant is available and responsive 24/7 builds trust and captures bookings that might otherwise go to competitors.</p>
        
        <h3>Data-Driven Decisions</h3>
        <p>Modern restaurant technology provides valuable insights into customer behaviour, booking patterns, and peak periods. Use this data to optimise staffing, menu offerings, and marketing efforts.</p>
        
        <h2>Implementation Guide</h2>
        <p>Ready to implement these strategies at your Perth venue? Here's how to get started:</p>
        
        <h3>Assess Your Current Systems</h3>
        <p>Evaluate your existing booking and communication processes. Identify bottlenecks and areas where automation could improve efficiency and customer satisfaction.</p>
        
        <h3>Choose the Right Technology</h3>
        <p>Select tools that integrate with your existing POS and reservation systems. Look for solutions designed specifically for Australian restaurants with local support teams.</p>
        
        <h3>Train Your Team</h3>
        <p>Ensure staff understand how new technology enhances their role rather than replacing them. Proper training leads to smooth adoption and better outcomes.</p>
        
        <h2>Real Results from Perth Restaurants</h2>
        <p>Venues across Perth implementing these strategies report increased booking rates, reduced no-shows, and improved customer satisfaction scores. The key is choosing solutions that align with your specific operational needs and customer base.</p>
        
        <h2>Looking Ahead</h2>
        <p>The future of Perth's restaurant industry is bright for venues that embrace innovation while maintaining exceptional service standards. As technology continues to evolve, early adopters gain competitive advantages in attracting and retaining customers.</p>
        
        <h2>Conclusion</h2>
        <p>Success in Perth's competitive hospitality market requires combining excellent food and service with smart operational practices. Whether you're running a fine dining establishment in the CBD or a neighbourhood cafe in the suburbs, the right technology and strategies can transform your business.</p>
        <p>DineTalk helps Perth restaurants capture every opportunity by ensuring no call goes unanswered and no booking is missed. Our AI-powered receptionist integrates seamlessly with your existing systems while providing the local knowledge and cultural understanding that Perth venues need.</p>
      </div>
    `,
    ctaText: 'Learn How DineTalk Can Help Your Restaurant',
    internalLinks: [
      { url: '/', text: 'DineTalk Home' },
      { url: '/demo', text: 'Book a Free Demo' },
      { url: '/pages/ai-restaurant-receptionist', text: 'AI Receptionist Features' },
      { url: '/pages/perth-cbd', text: 'Perth CBD Restaurant Solutions' },
      { url: '/pages/automated-booking-system', text: 'Booking System Information' }
    ]
  };
  
  const filename = `blog-${topic.slug}.html`;
  const filepath = path.join(__dirname, 'pages', filename);
  fs.writeFileSync(filepath, generateSEOPage(data));
  console.log(`Created: ${filename}`);
});

console.log('\nGenerating 20 Additional Blog Articles...');
expandedBlogTopics.forEach((topic) => {
  const data = {
    title: `${topic.title} | DineTalk Blog`,
    description: `${topic.title} - Practical guidance for Perth and WA restaurant teams looking to modernise phone answering and reservations with AI-backed workflows.`,
    keywords: `Perth restaurant tips, WA hospitality automation, ${topic.slug}, ai receptionist guidance, perth bookings`,
    canonical: `https://dinetalk.com.au/pages/blog/${topic.slug}`,
    h1: topic.title,
    content: `
      <div class="content-section">
        <p><em>Published on ${new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

        <h2>Why This Matters to Perth Hospitality</h2>
        <p>${topic.title} is becoming a high-priority topic for venues competing for bookings across Perth and Western Australia. Operators need practical answers that account for local diner expectations and WA's tourism calendar.</p>

        <h3>Common Challenges</h3>
        <p>Missed calls, slow responses, and limited after-hours coverage cost Perth venues real revenue. AI reception creates a dependable safety net that protects every opportunity.</p>

        <h3>Action Plan for WA Venues</h3>
        <p>Audit your current phone flows, define scripts that match your brand voice, and connect DineTalk to your booking system so every enquiry receives a timely, accurate response.</p>

        <h2>Local Success Indicators</h2>
        <p>Track reductions in missed calls, improvements in booking conversion rate, and guest feedback mentioning fast answers. These metrics show whether your AI receptionist is delivering Perth-ready service.</p>
      </div>
    `,
    ctaText: 'Talk to the DineTalk Perth Team',
    internalLinks: [
      { url: '/', text: 'DineTalk Home' },
      { url: '/demo', text: 'Book a Demo' },
      { url: '/pages/ai-restaurant-receptionist', text: 'AI Receptionist Features' },
      { url: '/pages/perth-ai-receptionist', text: 'Perth AI Receptionist' },
      { url: '/pages/restaurant-call-answering-service', text: 'Restaurant Phone Answering' }
    ]
  };

  const filename = `blog-${topic.slug}.html`;
  const filepath = path.join(__dirname, 'pages', filename);
  fs.writeFileSync(filepath, generateSEOPage(data));
  console.log(`Created: ${filename}`);
});

// Generate product landing pages
console.log('\nGenerating 20 Product Landing Pages...');
productPages.forEach((product, index) => {
  const data = {
    title: `${product.title} for Perth Restaurants | DineTalk`,
    description: `${product.title} designed for Australian restaurants. DineTalk's ${product.feature} helps Perth venues automate operations and improve customer service.`,
    keywords: `${product.title.toLowerCase()}, restaurant automation, Perth hospitality, ${product.slug}, DineTalk features`,
    canonical: `https://dinetalk.com.au/pages/${product.slug}`,
    h1: `${product.title} for Perth Restaurants`,
    content: `
      <div class="content-section">
        <h2>Introducing ${product.title}</h2>
        <p>DineTalk's ${product.feature} is specifically designed for Perth and Australian restaurants. Our solution combines cutting-edge AI technology with deep understanding of local hospitality needs to deliver exceptional results.</p>
        <p>Whether you're operating in Perth CBD, Fremantle, or any other WA location, our ${product.feature.toLowerCase()} adapts to your venue's unique requirements.</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <h3>Easy Integration</h3>
          <p>Connects seamlessly with your existing restaurant systems including POS, booking platforms, and communication tools.</p>
        </div>
        <div class="feature-card">
          <h3>24/7 Availability</h3>
          <p>Your ${product.feature.toLowerCase()} works around the clock, capturing opportunities even when your restaurant is closed.</p>
        </div>
        <div class="feature-card">
          <h3>Perth-Specific Features</h3>
          <p>Built with Australian restaurants in mind, understanding local dining culture and customer expectations.</p>
        </div>
      </div>
      
      <div class="content-section">
        <h2>Key Features of Our ${product.feature}</h2>
        
        <h3>Intelligent Automation</h3>
        <p>Our ${product.feature.toLowerCase()} uses advanced AI to handle complex tasks that traditionally required human intervention. From understanding customer requests to managing special requirements, the system thinks like an experienced hospitality professional.</p>
        
        <h3>Customisation for Your Venue</h3>
        <p>Every Perth restaurant is unique. We configure our ${product.feature.toLowerCase()} to match your specific menu, policies, and service style. Whether you're fine dining, casual, or quick service, the system adapts to your needs.</p>
        
        <h3>Real-Time Updates</h3>
        <p>Stay informed about bookings, customer enquiries, and system activity through real-time notifications and comprehensive dashboards. Make data-driven decisions to optimise your Perth venue's performance.</p>
        
        <h3>Seamless Customer Experience</h3>
        <p>Your customers in Perth and across WA will enjoy smooth, professional interactions every time they engage with your restaurant. From initial enquiry to booking confirmation, every touchpoint is optimised for satisfaction.</p>
      </div>
      
      <div class="content-section">
        <h2>Benefits for Perth Restaurants</h2>
        
        <h3>Increased Revenue</h3>
        <p>Capture more bookings by being available 24/7. Our ${product.feature.toLowerCase()} ensures no opportunity is missed, even during busy Perth dining periods or after hours.</p>
        
        <h3>Reduced Operating Costs</h3>
        <p>Automate routine tasks and reduce the burden on your front-of-house team. Focus your staff on delivering exceptional table service rather than answering phones.</p>
        
        <h3>Better Customer Insights</h3>
        <p>Gain valuable data about your Perth customers' preferences, booking patterns, and behaviour. Use these insights to refine your marketing and operations.</p>
        
        <h3>Improved Staff Satisfaction</h3>
        <p>Your team will appreciate technology that handles repetitive tasks, allowing them to focus on the creative and interpersonal aspects of hospitality they love.</p>
      </div>
      
      <div class="content-section">
        <h2>Perfect for All Perth Venue Types</h2>
        
        <h3>Fine Dining Restaurants</h3>
        <p>Deliver the premium service your discerning Perth clientele expects with sophisticated booking management and customer communication.</p>
        
        <h3>Casual Dining and Cafes</h3>
        <p>Handle high volumes of enquiries and bookings efficiently while maintaining the friendly, approachable service style your customers love.</p>
        
        <h3>Bars and Pubs</h3>
        <p>Manage group bookings, event enquiries, and general questions without interrupting your bar service during busy Perth nights.</p>
        
        <h3>Multi-Location Groups</h3>
        <p>Coordinate across multiple Perth venues with centralised management and location-specific customisation.</p>
      </div>
      
      <div class="content-section">
        <h2>How to Get Started</h2>
        <p>Implementing ${product.title} at your Perth restaurant is straightforward:</p>
        
        <h3>1. Free Consultation</h3>
        <p>Book a demo to discuss your specific needs. Our Perth-based team will assess your requirements and design a customised solution.</p>
        
        <h3>2. Quick Setup</h3>
        <p>We handle the technical configuration and integration with your existing systems. Most Perth venues are live within a week.</p>
        
        <h3>3. Training and Support</h3>
        <p>Receive comprehensive training for your team and ongoing support from our Australian customer success team.</p>
        
        <h3>4. Continuous Optimisation</h3>
        <p>We monitor performance and suggest improvements to ensure you're getting maximum value from your ${product.feature.toLowerCase()}.</p>
      </div>
      
      <div class="content-section">
        <h2>Trusted by Perth Hospitality Leaders</h2>
        <p>Leading restaurants across Perth and Western Australia rely on DineTalk's ${product.feature} to power their operations. Our technology serves venues ranging from intimate neighbourhood eateries to high-volume city establishments.</p>
        <p>Join the growing number of Perth restaurant owners who are transforming their business with smart automation while maintaining the personal touch that makes Australian hospitality special.</p>
      </div>
      
      <div class="content-section">
        <h2>Ready to Transform Your Perth Restaurant?</h2>
        <p>Discover how ${product.title} can help your venue capture more bookings, deliver better service, and operate more efficiently. Book a free demo with our Perth team today and see the difference intelligent automation can make.</p>
      </div>
    `,
    ctaText: 'Book Your Free Demo',
    internalLinks: [
      { url: '/', text: 'DineTalk Home' },
      { url: '/demo', text: 'Book a Demo' },
      { url: '/about', text: 'About Us' },
      { url: '/pages/perth-cbd', text: 'Perth CBD Solutions' },
      { url: '/pages/fremantle', text: 'Fremantle Restaurant Services' }
    ]
  };
  
  const filename = `${product.slug}.html`;
  const filepath = path.join(__dirname, 'pages', filename);
  fs.writeFileSync(filepath, generateSEOPage(data));
  console.log(`Created: ${filename}`);
});

console.log('\nGenerating 10 Additional Feature Landing Pages...');
expandedProductPages.forEach((product) => {
  const data = {
    title: `${product.title} for Perth Restaurants | DineTalk`,
    description: `${product.title} designed for Perth and WA venues. DineTalk's ${product.feature} keeps phones covered, bookings accurate, and guest experiences seamless.`,
    keywords: `${product.title.toLowerCase()}, perth restaurant automation, wa hospitality technology, ${product.slug}, dinetalk features`,
    canonical: `https://dinetalk.com.au/pages/${product.slug}`,
    h1: `${product.title} for Perth Hospitality`,
    content: `
      <div class="content-section">
        <h2>${product.feature} Built for WA Venues</h2>
        <p>DineTalk's ${product.feature.toLowerCase()} is tuned for Australian hospitality, including Perth's diverse dining scene and regional tourism hubs.</p>

        <h3>Rapid Deployment</h3>
        <p>Launch in days with scripts, booking rules, and escalation paths tailored to your brand.</p>

        <h3>Operational Consistency</h3>
        <p>Give every caller the same accurate answers, no matter when they reach out or who is on shift.</p>

        <h3>Data You Can Act On</h3>
        <p>Track call reasons, booking intent, and frequent questions to refine service and staffing plans.</p>
      </div>

      <div class="content-section">
        <h2>Benefits for Perth Restaurants</h2>
        <p>Keep your team focused on guests in venue while DineTalk manages the phones with reliable, brand-safe automation.</p>

        <h3>Reduce No-Shows</h3>
        <p>Automatic confirmations and reminders cut costly gaps in your book.</p>

        <h3>Convert More Enquiries</h3>
        <p>Immediate, knowledgeable answers help callers choose your venue over competing Perth restaurants.</p>

        <h3>Protect Brand Voice</h3>
        <p>Scripts reflect your hospitality style, specials, and menu notes so every guest feels understood.</p>
      </div>
    `,
    ctaText: 'See How This Feature Works',
    internalLinks: [
      { url: '/', text: 'DineTalk Home' },
      { url: '/demo', text: 'Book a Demo' },
      { url: '/pages/perth-ai-receptionist', text: 'Perth AI Receptionist' },
      { url: '/pages/automated-booking-system', text: 'Automated Booking System' },
      { url: '/pages/restaurant-analytics-dashboard', text: 'Restaurant Analytics' }
    ]
  };

  const filename = `${product.slug}.html`;
  const filepath = path.join(__dirname, 'pages', filename);
  fs.writeFileSync(filepath, generateSEOPage(data));
  console.log(`Created: ${filename}`);
});

console.log('\n✅ Successfully generated 150 SEO pages!');
console.log('- 80 Local SEO suburb/regional pages');
console.log('- 60 Blog articles');
console.log('- 30 Product landing pages');
console.log('\nAll pages include:');
console.log('✓ Complete SEO metadata (title, description, keywords)');
console.log('✓ Open Graph and Twitter card tags');
console.log('✓ Structured data (Schema.org)');
console.log('✓ Proper H1/H2/H3 heading structure');
console.log('✓ Perth/WA local language and references');
console.log('✓ Internal linking structure');
console.log('✓ Clear CTAs');
console.log('✓ Mobile-responsive design');
console.log('✓ Google Analytics integration ready');

