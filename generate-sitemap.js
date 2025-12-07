const fs = require('fs');
const path = require('path');

const baseUrl = 'https://dinetalk.com.au';
const today = new Date().toISOString().split('T')[0];

// Get all HTML files from pages directory
const pagesDir = path.join(__dirname, 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

// Start building sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/demo</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

`;

// Categorize pages
const suburbPages = pageFiles.filter(f => 
  !f.startsWith('blog-') && 
  !f.includes('-restaurant-') && 
  !f.includes('-booking-') && 
  !f.includes('-system-') &&
  !f.includes('-management-') &&
  !f.includes('-platform') &&
  !f.includes('-service') &&
  !f.includes('-software') &&
  !f.includes('-solution') &&
  !f.includes('-tool') &&
  !f.includes('-dashboard') &&
  !f.includes('-marketing') &&
  !f.includes('-crm') &&
  !f.includes('cafe-') &&
  !f.includes('bar-') &&
  !f.includes('food-') &&
  !f.includes('catering-') &&
  !f.includes('table-') &&
  !f.includes('waitlist-') &&
  !f.includes('multi-') &&
  !f.includes('voice-') &&
  !f.includes('delivery-') &&
  !f.includes('quick-')
);

const blogPages = pageFiles.filter(f => f.startsWith('blog-'));

const productPages = pageFiles.filter(f => 
  !f.startsWith('blog-') && 
  !suburbPages.includes(f)
);

// Add Local SEO Suburb Pages
sitemap += `  <!-- Local SEO Suburb Pages (${suburbPages.length}) -->\n`;
suburbPages.forEach(file => {
  const slug = file.replace('.html', '');
  sitemap += `  <url>
    <loc>${baseUrl}/pages/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

// Add Blog Articles
sitemap += `\n  <!-- Blog Articles (${blogPages.length}) -->\n`;
blogPages.forEach(file => {
  const slug = file.replace('.html', '');
  sitemap += `  <url>
    <loc>${baseUrl}/pages/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
});

// Add Product Landing Pages
sitemap += `\n  <!-- Product Landing Pages (${productPages.length}) -->\n`;
productPages.forEach(file => {
  const slug = file.replace('.html', '');
  sitemap += `  <url>
    <loc>${baseUrl}/pages/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemap += `</urlset>`;

// Write sitemap
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generated successfully!');
console.log(`   Total URLs: ${7 + pageFiles.length}`);
console.log(`   - Main pages: 7`);
console.log(`   - Local SEO pages: ${suburbPages.length}`);
console.log(`   - Blog articles: ${blogPages.length}`);
console.log(`   - Product pages: ${productPages.length}`);
console.log();
console.log('   File saved: sitemap.xml');

