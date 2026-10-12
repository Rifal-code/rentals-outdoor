import fs from 'fs';
import path from 'path';
import https from 'https';

const FONTS_DIR = path.resolve('public/fonts');
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

// Google Fonts CSS URL
async function fetchCss(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    ).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching Google Fonts css for Manrope and Saira Semi Condensed...');
  const cssUrl =
    'https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&family=Saira+Semi+Condensed:wght@400;600&display=swap';
  
  const css = await fetchCss(cssUrl);

  // Extract woff2 urls
  // Find latin subsets or standard definitions
  const fontMatches = [...css.matchAll(/font-family:\s*'([^']+)';[\s\S]*?font-weight:\s*([^;]+);[\s\S]*?src:\s*url\((https:[^)]+\.woff2)\)/g)];

  console.log(`Found ${fontMatches.length} font definitions`);

  let manropeSaved = false;
  let saira400Saved = false;
  let saira600Saved = false;

  for (const match of fontMatches) {
    const family = match[1];
    const weight = match[2].trim();
    const url = match[3];

    if (family === 'Manrope' && !manropeSaved) {
      console.log('Downloading Manrope-Variable.woff2...');
      await downloadFile(url, path.join(FONTS_DIR, 'manrope-variable.woff2'));
      manropeSaved = true;
    } else if (family === 'Saira Semi Condensed' && weight.includes('400') && !saira400Saved) {
      console.log('Downloading SairaSemiCondensed-400.woff2...');
      await downloadFile(url, path.join(FONTS_DIR, 'saira-semi-condensed-400.woff2'));
      saira400Saved = true;
    } else if (family === 'Saira Semi Condensed' && weight.includes('600') && !saira600Saved) {
      console.log('Downloading SairaSemiCondensed-600.woff2...');
      await downloadFile(url, path.join(FONTS_DIR, 'saira-semi-condensed-600.woff2'));
      saira600Saved = true;
    }
  }

  console.log('Fonts download completed.');
}

main().catch((err) => {
  console.error('Error fetching fonts:', err);
  process.exit(1);
});
