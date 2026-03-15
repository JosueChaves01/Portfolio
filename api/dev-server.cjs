/**
 * Local dev server for /api/copilot so Vite (port 5173) can proxy to it.
 * Run: node api/dev-server.cjs (or npm run dev to start API + Vite)
 */
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const express = require('express');

const app = express();
const PORT = Number(process.env.VITE_API_PORT) || 3001;

app.use(express.json());

async function start() {
  const { default: handler } = await import('./copilot.js');
  app.all('/api/copilot', async (req, res) => {
    const vercelReq = {
      method: req.method,
      body: req.body,
      headers: req.headers,
    };
    const vercelRes = {
      status(code) {
        res.status(code);
        return vercelRes;
      },
      setHeader(name, value) {
        res.setHeader(name, value);
        return vercelRes;
      },
      json(data) {
        res.json(data);
        return vercelRes;
      },
    };
    await handler(vercelReq, vercelRes);
  });

  app.listen(PORT, () => {
    console.log(`API dev server: http://localhost:${PORT}/api/copilot`);
  });
}

start();
