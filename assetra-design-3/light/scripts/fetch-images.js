/**
 * ASSETRA — Unsplash Image Fetcher
 * Download stock images for the website
 *
 * Usage: node scripts/fetch-images.js
 *
 * Note: Requires UNSPLASH_ACCESS_KEY environment variable.
 * Falls back to Picsum if API key is not available.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY';
const OUTPUT_DIR = path.join(__dirname, '../assets/images');

// Images to fetch with contextualized queries for ASSETRA
const imagesToFetch = [
  { query: 'luxury office interior design',       filename: 'hero-main.jpg',              w: 1920, h: 1080 },
  { query: 'contemporary hospitality lounge',     filename: 'hero-alt.jpg',               w: 1920, h: 1080 },
  { query: 'elegant interior design consultation',filename: 'about-main.jpg',             w: 1200, h: 800  },
  { query: 'modern retail interior design',       filename: 'portfolio-retail-01.jpg',    w: 800,  h: 600  },
  { query: 'luxury hotel lobby interior',         filename: 'portfolio-hospitality-01.jpg',w: 800, h: 600  },
  { query: 'corporate office furniture premium',  filename: 'portfolio-office-01.jpg',    w: 800,  h: 600  },
  { query: 'high end furniture showroom',         filename: 'portfolio-retail-02.jpg',    w: 800,  h: 600  },
  { query: 'boutique hotel suite interior',       filename: 'portfolio-hospitality-02.jpg',w: 800, h: 600  },
  { query: 'executive office design minimal',     filename: 'portfolio-office-02.jpg',    w: 800,  h: 600  },
  { query: 'luxury interior design detail',       filename: 'services-bg.jpg',            w: 1200, h: 700  },
];

/**
 * Fetch a single image from Unsplash
 */
async function fetchImage({ query, filename, w, h }) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching: ${filename} (query: "${query}")`);

    // Use Unsplash API
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=${w}&h=${h}&client_id=${ACCESS_KEY}`;

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`  ⚠ API error (${res.statusCode}), using Picsum fallback`);
        downloadPicsumFallback(filename, w, h, resolve, reject);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const imageUrl = parsed.urls?.regular || parsed.urls?.full;

          if (!imageUrl) {
            console.warn(`  ⚠ No image URL in response, using Picsum fallback`);
            downloadPicsumFallback(filename, w, h, resolve, reject);
            return;
          }

          // Download the actual image
          downloadFile(imageUrl, path.join(OUTPUT_DIR, filename), (err) => {
            if (err) {
              console.error(`  ✗ Error downloading image: ${err.message}`);
              downloadPicsumFallback(filename, w, h, resolve, reject);
            } else {
              console.log(`  ✓ Downloaded: ${filename}`);
              resolve(filename);
            }
          });
        } catch (e) {
          console.warn(`  ⚠ Parse error, using Picsum fallback`);
          downloadPicsumFallback(filename, w, h, resolve, reject);
        }
      });
    }).on('error', (e) => {
      console.warn(`  ⚠ Request error: ${e.message}, using Picsum fallback`);
      downloadPicsumFallback(filename, w, h, resolve, reject);
    });
  });
}

/**
 * Download fallback image from Picsum
 */
function downloadPicsumFallback(filename, w, h, resolve, reject) {
  const seed = filename.replace('.jpg', '').replace(/-/g, '');
  const url = `https://picsum.photos/seed/${seed}/${w}/${h}`;

  console.log(`  → Using Picsum fallback: ${filename}`);
  downloadFile(url, path.join(OUTPUT_DIR, filename), (err) => {
    if (err) {
      console.error(`  ✗ Error downloading fallback: ${err.message}`);
      reject(err);
    } else {
      console.log(`  ✓ Downloaded fallback: ${filename}`);
      resolve(filename);
    }
  });
}

/**
 * Download a file from URL
 */
function downloadFile(url, dest, callback) {
  const file = fs.createWriteStream(dest);

  https.get(url, (res) => {
    // Handle redirects
    if (res.statusCode === 301 || res.statusCode === 302) {
      file.close();
      fs.unlink(dest, () => {});
      downloadFile(res.headers.location, dest, callback);
      return;
    }

    res.pipe(file);
    file.on('finish', () => {
      file.close();
      callback(null);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    callback(err);
  });
}

/**
 * Main execution
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  ASSETRA — Image Fetcher');
  console.log('═══════════════════════════════════════════════════════\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('✓ Created images directory\n');
  }

  // Fetch all images sequentially
  for (const image of imagesToFetch) {
    try {
      await fetchImage(image);
    } catch (e) {
      console.error(`Failed to fetch ${image.filename}: ${e.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  Image fetch complete!');
  console.log('═══════════════════════════════════════════════════════\n');
}

// Run
main().catch(console.error);
