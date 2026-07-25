#!/bin/bash

# Define Colors for Output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== NT WebUX Search Algorithm Optimizer ===${NC}"

# Target folder
PUBLIC_DIR="artifacts/nt-web-design"
HTML_FILE="artifacts/nt-web-design/index.html"

if [ ! -d "$PUBLIC_DIR" ]; then
    echo -e "${RED}❌ Target folder '$PUBLIC_DIR' not found. Please verify folder paths.${NC}"
    exit 1
fi

# 1. Generate robots.txt
echo -e "${BLUE}Generating robots.txt...${NC}"
cat <<EOT > "${PUBLIC_DIR}/robots.txt"
User-agent: *
Allow: /

Sitemap: https://ntwebux.com/sitemap.xml
EOT
echo -e "${GREEN}✔ Created ${PUBLIC_DIR}/robots.txt${NC}"

# 2. Generate sitemap.xml
echo -e "${BLUE}Generating sitemap.xml...${NC}"
cat <<EOT > "${PUBLIC_DIR}/sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ntwebux.com/</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
EOT
echo -e "${GREEN}✔ Created ${PUBLIC_DIR}/sitemap.xml${NC}"

# 3. Check/Inject SEO Meta & Schema into index.html
if [ ! -f "$HTML_FILE" ]; then
    echo -e "${RED}❌ Could not find $HTML_FILE.${NC}"
    exit 1
fi

echo -e "${BLUE}Optimizing $HTML_FILE for SEO & Algorithms...${NC}"

# Write a temporary node script to safely inject JSON-LD & canonical meta tags
cat << 'NODE_EOF' > seo_inject.js
const fs = require('fs');

const filePath = process.argv[2];
let html = fs.readFileSync(filePath, 'utf8');

// Schema Markup (JSON-LD) for Search Snippets
const schemaMarkup = `
    <!-- JSON-LD Schema Markup for Search Algorithms -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "NT WebUX",
      "url": "https://ntwebux.com",
      "logo": "https://ntwebux.com/nt-favicon.png",
      "image": "https://ntwebux.com/opengraph.jpg",
      "description": "Custom web application architecture, user experience design, and automated business workflows for service-based businesses.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montreal",
        "addressRegion": "QC",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "45.5017",
        "longitude": "-73.5673"
      },
      "sameAs": [
        "https://www.linkedin.com/company/nt-digital-group"
      ],
      "priceRange": "$$"
    }
    </script>
`;

// Inject right after <head> if not already present
if (!html.includes('schema.org') && !html.includes('ProfessionalService')) {
    html = html.replace(/<head>/i, `<head>\n${schemaMarkup}`);
    console.log('✔ Injected JSON-LD Schema Markup.');
} else {
    console.log('ℹ Schema markup already exists.');
}

// Ensure Canonical URL is present
if (!html.includes('rel="canonical"')) {
    const canonical = '\n    <link rel="canonical" href="https://ntwebux.com/" />';
    html = html.replace(/<head>/i, `<head>${canonical}`);
    console.log('✔ Injected Canonical Link.');
}

fs.writeFileSync(filePath, html, 'utf8');
NODE_EOF

node seo_inject.js "$HTML_FILE"
rm seo_inject.js

echo -e "${GREEN}✔ $HTML_FILE has been optimized successfully!${NC}"
