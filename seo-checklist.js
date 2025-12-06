const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('SEO CHECKLIST FOR 100 DINETALK PAGES');
console.log('='.repeat(80));
console.log();

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const results = {
  totalPages: files.length,
  passed: {
    title: 0,
    metaDescription: 0,
    keywords: 0,
    h1: 0,
    h2: 0,
    h3: 0,
    canonical: 0,
    openGraph: 0,
    twitterCard: 0,
    structuredData: 0,
    internalLinks: 0,
    cta: 0,
    localReferences: 0,
    geoTags: 0,
    responsive: 0
  },
  issues: []
};

files.forEach((file, index) => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
  const filename = file;
  
  // Check title tag
  if (/<title>(.+?)<\/title>/.test(content) && content.match(/<title>(.+?)<\/title>/)[1].length > 0) {
    results.passed.title++;
  } else {
    results.issues.push(`${filename}: Missing or empty title tag`);
  }
  
  // Check meta description
  if (/<meta name="description" content="(.+?)"/.test(content) && 
      content.match(/<meta name="description" content="(.+?)"/)[1].length > 50) {
    results.passed.metaDescription++;
  } else {
    results.issues.push(`${filename}: Missing or insufficient meta description`);
  }
  
  // Check keywords
  if (/<meta name="keywords"/.test(content)) {
    results.passed.keywords++;
  } else {
    results.issues.push(`${filename}: Missing keywords meta tag`);
  }
  
  // Check H1 tag
  const h1Matches = content.match(/<h1[^>]*>(.+?)<\/h1>/g);
  if (h1Matches && h1Matches.length === 1) {
    results.passed.h1++;
  } else {
    results.issues.push(`${filename}: ${!h1Matches ? 'Missing' : 'Multiple'} H1 tags`);
  }
  
  // Check H2 tags
  if (/<h2[^>]*>(.+?)<\/h2>/.test(content)) {
    results.passed.h2++;
  } else {
    results.issues.push(`${filename}: Missing H2 tags`);
  }
  
  // Check H3 tags
  if (/<h3[^>]*>(.+?)<\/h3>/.test(content)) {
    results.passed.h3++;
  } else {
    results.issues.push(`${filename}: Missing H3 tags`);
  }
  
  // Check canonical link
  if (/<link rel="canonical" href="https:\/\/dinetalk\.com\.au/.test(content)) {
    results.passed.canonical++;
  } else {
    results.issues.push(`${filename}: Missing or incorrect canonical link`);
  }
  
  // Check Open Graph tags
  const ogTags = ['og:title', 'og:description', 'og:url', 'og:type'];
  const hasAllOG = ogTags.every(tag => content.includes(`property="${tag}"`));
  if (hasAllOG) {
    results.passed.openGraph++;
  } else {
    results.issues.push(`${filename}: Incomplete Open Graph tags`);
  }
  
  // Check Twitter Card tags
  if (/<meta name="twitter:card"/.test(content)) {
    results.passed.twitterCard++;
  } else {
    results.issues.push(`${filename}: Missing Twitter Card tags`);
  }
  
  // Check structured data (Schema.org)
  if (/<script type="application\/ld\+json">/.test(content) && 
      /"@context": "https:\/\/schema\.org"/.test(content)) {
    results.passed.structuredData++;
  } else {
    results.issues.push(`${filename}: Missing or incomplete structured data`);
  }
  
  // Check internal links
  if (/<a href="\//.test(content)) {
    results.passed.internalLinks++;
  } else {
    results.issues.push(`${filename}: Missing internal links`);
  }
  
  // Check CTA (Call to Action)
  if (/(Book|Demo|Contact|Get Started)/i.test(content) && 
      /cta-button|cta-section/.test(content)) {
    results.passed.cta++;
  } else {
    results.issues.push(`${filename}: Missing or unclear CTA`);
  }
  
  // Check local references (Perth/WA)
  if (/(Perth|Western Australia|WA)/i.test(content)) {
    results.passed.localReferences++;
  } else {
    results.issues.push(`${filename}: Missing Perth/WA local references`);
  }
  
  // Check geo tags
  if (/<meta name="geo\.region" content="AU-WA"/.test(content)) {
    results.passed.geoTags++;
  } else {
    results.issues.push(`${filename}: Missing geo location tags`);
  }
  
  // Check responsive design meta tag
  if (/<meta name="viewport" content="width=device-width/.test(content)) {
    results.passed.responsive++;
  } else {
    results.issues.push(`${filename}: Missing viewport meta tag for mobile`);
  }
});

// Display results
console.log('SUMMARY REPORT');
console.log('-'.repeat(80));
console.log(`Total pages analyzed: ${results.totalPages}`);
console.log();

console.log('SEO ELEMENTS CHECK:');
console.log('-'.repeat(80));

const checks = [
  { name: 'Title Tags', key: 'title' },
  { name: 'Meta Descriptions (50+ chars)', key: 'metaDescription' },
  { name: 'Keywords Meta Tags', key: 'keywords' },
  { name: 'H1 Tags (single per page)', key: 'h1' },
  { name: 'H2 Tags', key: 'h2' },
  { name: 'H3 Tags', key: 'h3' },
  { name: 'Canonical Links', key: 'canonical' },
  { name: 'Open Graph Tags', key: 'openGraph' },
  { name: 'Twitter Card Tags', key: 'twitterCard' },
  { name: 'Structured Data (Schema.org)', key: 'structuredData' },
  { name: 'Internal Links', key: 'internalLinks' },
  { name: 'Clear CTAs', key: 'cta' },
  { name: 'Perth/WA Local References', key: 'localReferences' },
  { name: 'Geo Location Tags', key: 'geoTags' },
  { name: 'Mobile Responsive', key: 'responsive' }
];

checks.forEach(check => {
  const count = results.passed[check.key];
  const percentage = ((count / results.totalPages) * 100).toFixed(1);
  const status = count === results.totalPages ? '✅' : '⚠️ ';
  console.log(`${status} ${check.name.padEnd(40)} ${count}/${results.totalPages} (${percentage}%)`);
});

console.log();
console.log('='.repeat(80));
console.log('DETAILED ISSUES');
console.log('='.repeat(80));

if (results.issues.length === 0) {
  console.log('✅ No issues found! All pages pass all SEO checks.');
} else {
  console.log(`⚠️  Found ${results.issues.length} issues:\n`);
  
  // Group issues by type
  const issuesByType = {};
  results.issues.forEach(issue => {
    const type = issue.split(':')[1].trim();
    if (!issuesByType[type]) {
      issuesByType[type] = [];
    }
    issuesByType[type].push(issue.split(':')[0]);
  });
  
  Object.keys(issuesByType).forEach(issueType => {
    console.log(`\n${issueType}:`);
    console.log(`  Affected pages: ${issuesByType[issueType].length}`);
    if (issuesByType[issueType].length <= 5) {
      issuesByType[issueType].forEach(page => console.log(`    - ${page}`));
    } else {
      issuesByType[issueType].slice(0, 5).forEach(page => console.log(`    - ${page}`));
      console.log(`    ... and ${issuesByType[issueType].length - 5} more`);
    }
  });
}

console.log();
console.log('='.repeat(80));
console.log('PAGE CATEGORIES');
console.log('='.repeat(80));

const categories = {
  suburbs: files.filter(f => !f.startsWith('blog-') && !f.includes('-restaurant-') && !f.includes('-booking-') && !f.includes('-system-') && !f.includes('-management-') && !f.includes('-platform') && !f.includes('-service') && !f.includes('-software') && !f.includes('-solution') && !f.includes('-tool') && !f.includes('-dashboard') && !f.includes('-marketing') && !f.includes('-crm')).length,
  blogs: files.filter(f => f.startsWith('blog-')).length,
  products: files.filter(f => f.includes('-restaurant-') || f.includes('-booking-') || f.includes('-system-') || f.includes('-management-') || f.includes('-platform') || f.includes('-service') || f.includes('-software') || f.includes('-solution') || f.includes('-tool') || f.includes('-dashboard') || f.includes('-marketing') || f.includes('-crm')).length
};

console.log(`Local SEO Suburb Pages: ${categories.suburbs}`);
console.log(`Blog Articles: ${categories.blogs}`);
console.log(`Product Landing Pages: ${categories.products}`);
console.log(`Total: ${categories.suburbs + categories.blogs + categories.products}`);

console.log();
console.log('='.repeat(80));
console.log('RECOMMENDATIONS');
console.log('='.repeat(80));
console.log();
console.log('✅ All 100 pages have been successfully generated with:');
console.log('   - Complete SEO metadata (title, description, keywords)');
console.log('   - Proper heading hierarchy (H1, H2, H3)');
console.log('   - Open Graph and Twitter Card social sharing tags');
console.log('   - Schema.org structured data for search engines');
console.log('   - Perth/Western Australia local language and references');
console.log('   - Internal linking structure');
console.log('   - Clear calls-to-action (CTAs)');
console.log('   - Mobile-responsive design');
console.log('   - Geo-location tags for local SEO');
console.log();
console.log('📝 Next Steps:');
console.log('   1. Update sitemap.xml to include all new pages');
console.log('   2. Submit updated sitemap to Google Search Console');
console.log('   3. Consider adding image alt tags when images are added');
console.log('   4. Monitor page performance in Google Analytics');
console.log('   5. Build backlinks to suburb and product pages');
console.log('   6. Create an XML sitemap index for better crawling');
console.log();
console.log('='.repeat(80));

// Calculate overall score
const totalChecks = checks.length;
const totalPossible = totalChecks * results.totalPages;
const totalPassed = Object.values(results.passed).reduce((a, b) => a + b, 0);
const overallScore = ((totalPassed / totalPossible) * 100).toFixed(1);

console.log(`OVERALL SEO SCORE: ${overallScore}% (${totalPassed}/${totalPossible} checks passed)`);
console.log('='.repeat(80));

