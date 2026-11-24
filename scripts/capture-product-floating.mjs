import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

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

  // 1. Mobile 390x844 - Top view
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await client.send('Page.navigate', { url: 'http://localhost:5173/product/prod-1' });
  await sleep(1500);

  const { data: pTop } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('product_mobile_top.png', Buffer.from(pTop, 'base64'));

  // Scroll main container to middle
  await client.send('Runtime.evaluate', {
    expression: 'document.querySelector("main").scrollTop = 250;',
  });
  await sleep(600);
  const { data: pMid } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('product_mobile_mid.png', Buffer.from(pMid, 'base64'));

  // Scroll main container to bottom
  await client.send('Runtime.evaluate', {
    expression: 'document.querySelector("main").scrollTop = 800;',
  });
  await sleep(600);
  const { data: pBottom } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('product_mobile_bottom.png', Buffer.from(pBottom, 'base64'));

  // 2. Desktop 1440x900 - Inside phone frame
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await client.send('Page.navigate', { url: 'http://localhost:5173/product/prod-1' });
  await sleep(1500);
  const { data: pDesk } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('product_desktop_frame.png', Buffer.from(pDesk, 'base64'));

  // 3. Tablet 768x1024
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await client.send('Page.navigate', { url: 'http://localhost:5173/product/prod-1' });
  await sleep(1500);
  const { data: pTab } = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('product_tablet.png', Buffer.from(pTab, 'base64'));

  client.close();
  chromeProc.kill();
  console.log('Product screenshots captured successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
