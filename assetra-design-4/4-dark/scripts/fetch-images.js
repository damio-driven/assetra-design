/**
 * ASSETRA — Fetch Images Script
 * Run once: node scripts/fetch-images.js
 * Set UNSPLASH_ACCESS_KEY env var, or falls back to Picsum placeholders.
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY';
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'images');

const imagesToFetch = [
  { query: 'dark luxury interior architecture dramatic',      filename: 'hero-main.jpg',                w: 1920, h: 1080 },
  { query: 'dramatic hospitality lounge dark moody night',   filename: 'hero-alt.jpg',                 w: 1920, h: 1080 },
  { query: 'premium furniture showroom dark elegant',        filename: 'about-main.jpg',               w: 1200, h: 800  },
  { query: 'dark moody retail store interior luxury',        filename: 'portfolio-retail-01.jpg',      w: 800,  h: 600  },
  { query: 'upscale hotel lobby dark atmosphere',            filename: 'portfolio-hospitality-01.jpg', w: 800,  h: 600  },
  { query: 'executive office dark minimal premium',          filename: 'portfolio-office-01.jpg',      w: 800,  h: 600  },
  { query: 'luxury boutique retail interior night',          filename: 'portfolio-retail-02.jpg',      w: 800,  h: 600  },
  { query: 'five star hotel suite dramatic lighting',        filename: 'portfolio-hospitality-02.jpg', w: 800,  h: 600  },
  { query: 'corporate office design dark sophisticated',     filename: 'portfolio-office-02.jpg',      w: 800,  h: 600  },
  { query: 'interior design detail texture dark gold',       filename: 'services-bg.jpg',              w: 1200, h: 700  },
];

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(fileUrl);
    const protocol  = parsedUrl.protocol === 'https:' ? https : http;
    const file      = fs.createWriteStream(destPath);

    protocol.get(fileUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(destPath, () => {});
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${fileUrl}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function fetchViaUnsplash({ query, filename, w, h }) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${ACCESS_KEY}`;
    https.get(apiUrl, { headers: { 'Accept-Version': 'v1' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json     = JSON.parse(data);
          const imageUrl = json.urls?.regular || json.urls?.full;
          if (!imageUrl) throw new Error('No URL in Unsplash response');
          const destPath = path.join(OUTPUT_DIR, filename);
          await downloadFile(imageUrl, destPath);
          console.log(`✓ ${filename} (Unsplash: "${query}")`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function fetchViaPicsum({ filename, w, h }) {
  const seed    = filename.replace('.jpg', '');
  const fileUrl = `https://picsum.photos/seed/${seed}/${w}/${h}`;
  const destPath = path.join(OUTPUT_DIR, filename);
  return downloadFile(fileUrl, destPath)
    .then(() => console.log(`✓ ${filename} (Picsum fallback)`));
}

async function fetchImage(spec) {
  const destPath = path.join(OUTPUT_DIR, spec.filename);
  if (fs.existsSync(destPath)) {
    console.log(`– ${spec.filename} already exists, skipping`);
    return;
  }
  try {
    await fetchViaUnsplash(spec);
  } catch (err) {
    console.warn(`  Unsplash failed for ${spec.filename}: ${err.message}. Trying Picsum...`);
    try {
      await fetchViaPicsum(spec);
    } catch (fallbackErr) {
      console.error(`  Picsum also failed for ${spec.filename}: ${fallbackErr.message}`);
    }
  }
}

// Main
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`\nASERA — Fetching ${imagesToFetch.length} images...\n`);

(async () => {
  for (const spec of imagesToFetch) {
    await fetchImage(spec);
  }
  console.log('\nDone.\n');
})();
