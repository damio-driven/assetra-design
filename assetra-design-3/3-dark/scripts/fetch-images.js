/**
 * ASSETRA — Unsplash Image Fetcher
 * DARK Variant
 *
 * Run with: node scripts/fetch-images.js
 *
 * Requires UNSPLASH_ACCESS_KEY environment variable or uses the embedded key.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API credentials
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY';

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../assets/images');

// Images to fetch - contextualized for DARK variant
const imagesToFetch = [
  {
    query: 'dark luxury interior architecture dramatic',
    filename: 'hero-main.jpg',
    w: 1920,
    h: 1080
  },
  {
    query: 'dramatic hospitality lounge dark moody night',
    filename: 'hero-alt.jpg',
    w: 1920,
    h: 1080
  },
  {
    query: 'premium furniture showroom dark elegant',
    filename: 'about-main.jpg',
    w: 1200,
    h: 800
  },
  {
    query: 'dark moody retail store interior luxury',
    filename: 'portfolio-retail-01.jpg',
    w: 800,
    h: 600
  },
  {
    query: 'upscale hotel lobby dark atmosphere',
    filename: 'portfolio-hospitality-01.jpg',
    w: 800,
    h: 600
  },
  {
    query: 'dark office interior',
    filename: 'portfolio-office-01.jpg',
    w: 800,
    h: 600
  },
  {
    query: 'luxury boutique retail interior night',
    filename: 'portfolio-retail-02.jpg',
    w: 800,
    h: 600
  },
  {
    query: 'five star hotel suite dramatic lighting',
    filename: 'portfolio-hospitality-02.jpg',
    w: 800,
    h: 600
  },
  {
    query: 'corporate office design dark sophisticated',
    filename: 'portfolio-office-02.jpg',
    w: 800,
    h: 600
  },
  {
    query: 'interior design detail texture dark gold',
    filename: 'services-bg.jpg',
    w: 1200,
    h: 700
  }
];

/**
 * Fetch a single image from Unsplash
 */
async function fetchImage({ query, filename, w, h }) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching: ${filename} (query: "${query}")`);

    // Build Unsplash API URL
    const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=${w}&h=${h}&client_id=${ACCESS_KEY}`;

    https.get(apiUrl, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.urls && response.urls.regular) {
            // Download the actual image
            downloadImage(response.urls.regular, filename, w, h)
              .then(() => {
                console.log(`✓ Successfully downloaded: ${filename}`);
                resolve();
              })
              .catch(reject);
          } else if (response.error) {
            console.error(`✗ API Error for ${filename}: ${response.error}`);
            reject(new Error(response.error));
          } else {
            console.error(`✗ Unexpected response for ${filename}`);
            reject(new Error('Unexpected API response'));
          }
        } catch (e) {
          console.error(`✗ Parse error for ${filename}: ${e.message}`);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.error(`✗ Request error for ${filename}: ${e.message}`);
      reject(e);
    });
  });
}

/**
 * Download image from URL
 */
function downloadImage(url, filename, w, h) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(OUTPUT_DIR, filename);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        // Fallback to Picsum if Unsplash fails
        console.log(`  → Unsplash failed (${res.statusCode}), using Picsum fallback...`);
        const picsumUrl = `https://picsum.photos/seed/${filename.replace('.jpg', '')}/${w}/${h}`;

        https.get(picsumUrl, (fallbackRes) => {
          const file = fs.createWriteStream(filePath);
          fallbackRes.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
        return;
      }

      const file = fs.createWriteStream(filePath);
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (e) => {
      // Fallback to Picsum
      console.log(`  → Using Picsum fallback for ${filename}...`);
      const picsumUrl = `https://picsum.photos/seed/${filename.replace('.jpg', '')}/${w}/${h}`;

      https.get(picsumUrl, (fallbackRes) => {
        const file = fs.createWriteStream(filePath);
        fallbackRes.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', reject);
    });
  });
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('ASSETRA — Image Fetcher (DARK Variant)');
  console.log('='.repeat(60));
  console.log('');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log(`Creating directory: ${OUTPUT_DIR}`);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Images to fetch: ${imagesToFetch.length}`);
  console.log('');

  // Fetch images sequentially to avoid rate limiting
  let successCount = 0;
  let failCount = 0;

  for (const image of imagesToFetch) {
    try {
      await fetchImage(image);
      successCount++;
    } catch (e) {
      console.error(`Failed to fetch ${image.filename}: ${e.message}`);
      failCount++;
    }

    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('Summary:');
  console.log(`  ✓ Successful: ${successCount}`);
  console.log(`  ✗ Failed: ${failCount}`);
  console.log('='.repeat(60));

  if (failCount > 0) {
    console.log('');
    console.log('Note: Some images may have failed due to API rate limits.');
    console.log('You can re-run the script to fetch remaining images.');
  }
}

// Run the script
main().catch(console.error);
