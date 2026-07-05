import type { Request, Response } from 'express';
import type { UrlService } from '../services/urlService.js';
import type { ShortenRequest } from '../types.js';
import { isValidUrl } from '../utils/url.js';

export function createUrlController(urlService: UrlService) {
  return {
    shortenUrl: (req: Request<{}, {}, ShortenRequest>, res: Response) => {
      const { url } = req.body ?? {};

      if (typeof url !== 'string' || !isValidUrl(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
      }

      const result = urlService.shortenUrl(url);
      return res.json(result);
    },

    listUrls: (_req: Request, res: Response) => {
      return res.json(urlService.listUrls());
    },

    redirect: (req: Request<{ shortCode: string }>, res: Response) => {
      const originalUrl = urlService.getUrl(req.params.shortCode);

      if (originalUrl) {
        return res.redirect(originalUrl);
      }

      return res.status(404).json({ error: 'Not found' });
    },
  };
}
