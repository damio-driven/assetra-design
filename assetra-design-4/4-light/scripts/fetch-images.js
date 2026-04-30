// scripts/fetch-images.js
// Run with: node scripts/fetch-images.js
// Requires env var UNSPLASH_ACCESS_KEY or falls back to Picsum.
'use strict';

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY';
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'images');

const imagesToFetch = [
  { query: 'luxury office interior design',              filename: 'hero-main.jpg',               w: 1920, h: 1080 },
  { query: 'contemporary hospitality lounge light',      filename: 'hero-alt.jpg',                w: 1920, h: 1080 },
  { query: 'elegant interior design studio consultation',filename: 'about-main.jpg',              w: 1200, h: 800  },
  { query: 'modern retail store interior design',        filename: 'portfolio-retail-01.jpg',     w: 800,  h: 600  },
  { query: 'luxury hotel lobby boutique',                filename: 'portfolio-hospitality-01.jpg',w: 800,  h: 600  },
  { query: 'premium corporate office furniture',         filename: 'portfolio-office-01.jpg',     w: 800,  h: 600  },
  { query: 'high end furniture showroom',                filename: 'portfolio-retail-02.jpg',     w: 800,  h: 600  },
  { query: 'boutique hotel suite interior',              filename: 'portfolio-hospitality-02.jpg',w: 800,  h: 600  },
  { query: 'executive office design minimal',            filename: 'portfolio-office-02.jpg',     w: 800,  h: 600  },
  { query: 'high end furniture detail texture',          filename: 'services-bg.jpg',             w: 1200, h: 700  },
];

function downloadFile(fileUrl, dest) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new url.URL(fileUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    const file = fs.createWriteStream(dest);

    client.get(fileUrl, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${fileUrl}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => {
      file.close();
      try { fs.unlinkSync(dest); } catch (_) {}
      reject(err);
    });
  });
}

function getUnsplashUrl(query, w, h) {
  return `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=${w}&h=${h}&client_id=${ACCESS_KEY}`;
}

function getPicsumUrl(filename, w, h) {
  const seed = filename.replace('.jpg', '').replace(/[^a-z0-9]/gi, '');
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

async function fetchImage({ query, filename, w, h }) {
  const dest = path.join(OUTPUT_DIR, filename);
  if (fs.existsSync(dest)) {
    console.log(`  skip  ${filename} (already exists)`);
    return;
  }

  console.log(`  fetch ${filename}  (query: "${query}")`);

  try {
    if (!ACCESS_KEY) throw new Error('No access key');

    const apiUrl = getUnsplashUrl(query, w, h);
    const json = await new Promise((resolve, reject) => {
      https.get(apiUrl, { headers: { 'Accept-Version': 'v1' } }, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(e); }
        });
      }).on('error', reject);
    });

    if (json.errors) throw new Error(json.errors.join(', '));

    const imageUrl = json.urls.regular;
    await downloadFile(imageUrl, dest);
    console.log(`   ok   ${filename}`);

  } catch (err) {
    console.warn(`   warn  Unsplash failed (${err.message}), falling back to Picsum`);
    const fallback = getPicsumUrl(filename, w, h);
    try {
      await downloadFile(fallback, dest);
      console.log(`   ok   ${filename} (picsum)`);
    } catch (e2) {
      console.error(`  error ${filename}: ${e2.message}`);
    }
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('ASSETRA — Fetching images\n');
  for (const img of imagesToFetch) {
    await fetchImage(img);
  }
  console.log('\nDone.');
}

main().catch(console.error);
