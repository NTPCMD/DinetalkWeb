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
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; background: #fff; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #ff9936 0%, #ff6b35 100%); color: white; padding: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 28px; font-weight: 700; font-family: 'Poppins', sans-serif; }
    .nav-links { display: flex; gap: 30px; list-style: none; }
    .nav-links a { color: white; text-decoration: none; font-weight: 500; transition: opacity 0.3s; }
    .nav-links a:hover { opacity: 0.8; }
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
    .cta-section h2 { color: white; }
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
        <div class="logo">DineTalk</div>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/demo">Book Demo</a></li>
          <li><a href="/contact">Contact</a></li>
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
      <a href="${ctaLink}" class="cta-button">${ctaText}</a>
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

console.log('\n✅ Successfully generated all 100 SEO pages!');
console.log('- 40 Local SEO suburb pages');
console.log('- 40 Blog articles');
console.log('- 20 Product landing pages');
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

