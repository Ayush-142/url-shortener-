import express from 'express';
import cors from 'cors';
import { createUrlController } from './controllers/urlController.js';
import { createUrlService } from './services/urlService.js';
import { PORT } from './config.js';

export function createApp() {
  const app = express();
  const urlService = createUrlService();
  const urlController = createUrlController(urlService);

  app.use(cors());
  app.use(express.json());

  app.post('/api/shorten', urlController.shortenUrl);
  app.get('/api/urls', urlController.listUrls);
  app.get('/:shortCode', urlController.redirect);

  return app;
}

export function startServer() {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
  });
}
