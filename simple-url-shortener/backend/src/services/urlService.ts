import { FRONTEND_BASE_URL } from '../config.js';
import type { ShortenedUrl, UrlMap } from '../types.js';
import { generateShortCode } from '../utils/url.js';

export interface UrlService {
  shortenUrl(url: string): ShortenedUrl;
  getUrl(shortCode: string): string | undefined;
  listUrls(): UrlMap;
}

export class InMemoryUrlService implements UrlService {
  private readonly urls = new Map<string, string>();

  shortenUrl(url: string): ShortenedUrl {
    let shortCode = generateShortCode();

    while (this.urls.has(shortCode)) {
      shortCode = generateShortCode();
    }

    this.urls.set(shortCode, url);

    return {
      shortCode,
      shortUrl: `${FRONTEND_BASE_URL.replace(/\/$/, '')}/${shortCode}`,
    };
  }

  getUrl(shortCode: string): string | undefined {
    return this.urls.get(shortCode);
  }

  listUrls(): UrlMap {
    return Object.fromEntries(this.urls.entries());
  }
}

export function createUrlService(): UrlService {
  return new InMemoryUrlService();
}
