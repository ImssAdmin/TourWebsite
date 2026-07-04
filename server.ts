import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Import API routes
import contactHandler from './api/contact.ts';
import contactsHandler from './api/contacts.ts';
import dataHandler from './api/data.ts';
import loginHandler from './api/login.ts';
import logoutHandler from './api/logout.ts';
import meHandler from './api/me.ts';

// Handle __dirname properly for both ESM (dev) and CJS (prod/build)
const currentDir = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url || 'file://' + process.cwd() + '/server.ts'));
const isTest = process.env.VITEST;
const isProd = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  // Mount API Routes
  app.all('/api/contact', contactHandler);
  app.all('/api/contacts', contactsHandler);
  app.all('/api/data', dataHandler);
  app.all('/api/login', loginHandler);
  app.all('/api/logout', logoutHandler);
  app.all('/api/me', meHandler);

  let vite;
  if (!isProd) {
    // Development mode with Vite
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    app.use(express.static(path.resolve(currentDir, 'dist')));
  }

  app.use('*', async (req, res, next) => {
    // Skip API routes
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }

    try {
      const url = req.originalUrl;
      let template, render;

      if (!isProd && vite) {
        // Always read fresh index.html in dev
        template = fs.readFileSync(path.resolve(currentDir, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(currentDir, 'dist/index.html'), 'utf-8');
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      !isProd && vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

createServer();
