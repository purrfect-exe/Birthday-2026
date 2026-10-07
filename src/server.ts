import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const distPath = path.join(__dirname, 'dist');
  const indexHtmlPath = path.join(distPath, 'index.html');

  // Health check endpoint for Cloud Run deployment probes
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  if (fs.existsSync(indexHtmlPath)) {
    app.use(
      '/src/assets/images',
      express.static(path.join(__dirname, 'src/assets/images'))
    );
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
