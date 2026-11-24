import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();

    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
  }

  waitForOpen() {
    if (this.ws.readyState === 1) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--no-sandbox',
  ]);

  console.log('Waiting for Chrome CDP to be ready...');
  let version;
  for (let i = 0; i < 20; i++) {
    try {
      version = await fetchJson('http://127.0.0.1:9222/json/version');
      break;
    } catch {
      await sleep(300);
    }
  }

  if (!version) {
    chromeProc.kill();
    throw new Error('Chrome did not start on port 9222');
  }

  const targets = await fetchJson('http://127.0.0.1:9222/json/list');
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.waitForOpen();

  await client.send('Page.enable');
  await client.send('Network.enable');

  const mobileScreens = [
    { route: '', name: 'final_home_390.png' },
    { route: 'shop', name: 'final_shop_390.png' },
    { route: 'quote', name: 'final_quote_390.png' },
    { route: 'orders', name: 'final_orders_390.png' },
  ];

  // 1. Mobile 390x844 with exact device scale factor 2
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  for (const s of mobileScreens) {
    const url = `http://localhost:5173/${s.route}`;
    console.log(`Navigating to ${url}...`);
    await client.send('Page.navigate', { url });
    await sleep(1500); // Allow render & fonts to settle
    const { data } = await client.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.resolve(s.name), Buffer.from(data, 'base64'));
    console.log(`Saved ${s.name} (${fs.statSync(s.name).size} bytes)`);
  }

  // 2. Desktop 1440x900 (Samsung Galaxy S26 frame centered)
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  console.log('Navigating to http://localhost:5173/ for desktop...');
  await client.send('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(1500);
  const { data: deskData } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.resolve('final_desktop_1440.png'), Buffer.from(deskData, 'base64'));
  console.log(`Saved final_desktop_1440.png (${fs.statSync('final_desktop_1440.png').size} bytes)`);

  // 3. Tablet 768x1024
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  });
  console.log('Navigating to http://localhost:5173/ for tablet...');
  await client.send('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(1500);
  const { data: tabData } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.resolve('final_tablet_768.png'), Buffer.from(tabData, 'base64'));
  console.log(`Saved final_tablet_768.png (${fs.statSync('final_tablet_768.png').size} bytes)`);

  client.close();
  chromeProc.kill();
  console.log('Finished capturing all final screenshots!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
