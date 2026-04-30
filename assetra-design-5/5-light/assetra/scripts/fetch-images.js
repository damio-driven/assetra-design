const https = require('https');
const fs = require('fs');
const path = require('path');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY';
const OUTPUT_DIR = path.join(__dirname, '../assets/images');

const imagesToFetch = [
  { query: 'luxury office interior design', filename: 'hero-main.jpg', w: 1920, h: 1080 },
  { query: 'contemporary hospitality lounge', filename: 'hero-alt.jpg', w: 1920, h: 1080 },
  { query: 'elegant interior design studio consultation', filename: 'about-main.jpg', w: 1200, h: 800 },
  { query: 'modern retail store interior design', filename: 'portfolio-retail-01.jpg', w: 800, h: 600 },
  { query: 'luxury hotel lobby interior', filename: 'portfolio-hospitality-01.jpg', w: 800, h: 600 },
  { query: 'corporate office furniture premium', filename: 'portfolio-office-01.jpg', w: 800, h: 600 },
  { query: 'high end furniture showroom', filename: 'portfolio-retail-02.jpg', w: 800, h: 600 },
  { query: 'boutique hotel suite interior', filename: 'portfolio-hospitality-02.jpg', w: 800, h: 600 },
  { query: 'executive office design minimal', filename: 'portfolio-office-02.jpg', w: 800, h: 600 },
  { query: 'luxury interior design detail', filename: 'services-bg.jpg', w: 1200, h: 700 },
];

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function fetchImage({ query, filename, w, h }) {
  const filepath = path.join(OUTPUT_DIR, filename);
  if (fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} (already exists)`);
    return;
  }
  
  try {
    if (ACCESS_KEY) {
      const photoUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${ACCESS_KEY}&w=${w}&h=${h}`;
      const photo = await fetchJSON(photoUrl);
      await downloadImage(photo.urls.regular, filepath);
      console.log(`Downloaded: ${filename}`);
    } else {
      const fallbackUrl = `https://picsum.photos/seed/${filename.replace('.jpg','')}/${w}/${h}`;
      await downloadImage(fallbackUrl, filepath);
      console.log(`Downloaded (fallback): ${filename}`);
    }
  } catch (err) {
    console.error(`Failed ${filename}:`, err.message);
  }
}

async function main() {
  for (const img of imagesToFetch) {
    await fetchImage(img);
  }
  console.log('Done!');
}

main();