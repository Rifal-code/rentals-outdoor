import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const PORT = 9229;
const USER_DATA = path.join(process.env.TEMP || '.', 'chrome-verify-profile-2');
const OUT_DIR = path.resolve('C:\\Users\\THINKPAD\\.gemini\\antigravity-ide\\brain\\1fe9ed82-a344-40cf-81cf-fb84c68bd4a8\\screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log('Launching browser:', CHROME_PATH);
const browserProc = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${USER_DATA}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-background-networking',
  '--enable-features=NetworkService,NetworkServiceInProcess',
  'about:blank',
], { stdio: 'ignore' });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectCDP() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        const data = await res.json();
        return data.webSocketDebuggerUrl;
      }
    } catch (e) {
      // wait
    }
    await sleep(500);
  }
  throw new Error('Could not connect to Chrome debugging port');
}

class CDPClient {
  constructor(ws) {
    this.ws = ws;
    this.id = 1;
    this.callbacks = new Map();
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function run() {
  try {
    const wsUrl = await connectCDP();
    console.log('Connected to browser ws:', wsUrl);

    const browserWs = new WebSocket(wsUrl);
    await new Promise((r) => (browserWs.onopen = r));
    const browserClient = new CDPClient(browserWs);

    const { targetId } = await browserClient.send('Target.createTarget', {
      url: 'about:blank',
    });

    const pageWs = new WebSocket(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
    await new Promise((r) => (pageWs.onopen = r));
    const cdp = new CDPClient(pageWs);

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    const viewports = [
      { name: '1920x1080', width: 1920, height: 1080, mobile: false },
      { name: '1366x768', width: 1366, height: 768, mobile: false },
      { name: '390x844', width: 390, height: 844, mobile: true },
    ];

    const progresses = [0, 0.2, 0.5, 0.8, 1.0];

    for (const vp of viewports) {
      console.log(`\n=== Testing Viewport ${vp.name} ===`);
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });

      // Navigate to site
      await cdp.send('Page.navigate', { url: 'http://localhost:3000/?debug=1' });

      // Poll until window.__setStageProgress exists
      console.log('Waiting for stage initialization and 3D assets to load...');
      for (let i = 0; i < 30; i++) {
        const evalRes = await cdp.send('Runtime.evaluate', {
          expression: `typeof window.__setStageProgress === 'function'`,
          returnByValue: true,
        });
        if (evalRes?.result?.value === true) break;
        await sleep(500);
      }
      // Wait for GLB parse and shader compilation
      await sleep(4000);

      for (const prog of progresses) {
        const pct = Math.round(prog * 100);
        console.log(`Setting progress to ${pct}%...`);

        await cdp.send('Runtime.evaluate', {
          expression: `
            if (typeof window.__setStageProgress === 'function') {
              window.__setStageProgress(${prog});
            }
          `,
        });

        await sleep(600);

        // Capture screenshot
        const { data } = await cdp.send('Page.captureScreenshot', {
          format: 'png',
        });

        const filename = `screen_${vp.name}_p${pct}.png`;
        const filepath = path.join(OUT_DIR, filename);
        fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
        console.log(`Saved screenshot: ${filename}`);
      }
    }

    console.log('\nAll screenshots captured successfully!');
  } finally {
    browserProc.kill();
  }
}

run().catch((err) => {
  console.error('Error during verification:', err);
  browserProc.kill();
  process.exit(1);
});
