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
    '--remote-debugging-port=9223',
    '--no-sandbox',
  ]);

  let version;
  for (let i = 0; i < 20; i++) {
    try {
      version = await fetchJson('http://127.0.0.1:9223/json/version');
      break;
    } catch {
      await sleep(300);
    }
  }

  if (!version) {
    chromeProc.kill();
    throw new Error('Chrome did not start on port 9223');
  }

  const targets = await fetchJson('http://127.0.0.1:9223/json/list');
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.waitForOpen();

  await client.send('Page.enable');

  const htmlPath = path.resolve('frontline-coins-summary.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('Navigating to', fileUrl);
  await client.send('Page.navigate', { url: fileUrl });
  await sleep(1200);

  // Generate PDF via Page.printToPDF
  console.log('Generating PDF...');
  const { data } = await client.send('Page.printToPDF', {
    printBackground: true,
    paperWidth: 8.27, // A4 in inches
    paperHeight: 11.69,
    marginTop: 0.6,
    marginBottom: 0.6,
    marginLeft: 0.6,
    marginRight: 0.6,
  });

  const pdfBuffer = Buffer.from(data, 'base64');
  
  // Save in project root
  const rootPdf = path.resolve('Frontline-Coins-USA-Proposed-Experience.pdf');
  fs.writeFileSync(rootPdf, pdfBuffer);
  console.log('Saved to', rootPdf, `(${pdfBuffer.length} bytes)`);

  // Save in public folder
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  const publicPdf = path.join(publicDir, 'Frontline-Coins-USA-Proposed-Experience.pdf');
  fs.writeFileSync(publicPdf, pdfBuffer);
  console.log('Saved to', publicPdf);

  // Save directly to Downloads folder
  const downloadsPdf = 'C:\\Users\\UXDLab\\Downloads\\Frontline-Coins-USA-Proposed-Experience.pdf';
  try {
    fs.writeFileSync(downloadsPdf, pdfBuffer);
    console.log('Saved to', downloadsPdf);
  } catch (e) {
    console.log('Downloads folder write error:', e.message);
  }

  client.close();
  chromeProc.kill();
  console.log('PDF Generation completed successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

