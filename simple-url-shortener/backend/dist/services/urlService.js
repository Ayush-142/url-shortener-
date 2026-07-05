import { FRONTEND_BASE_URL } from '../config.js';
import { generateShortCode } from '../utils/url.js';
export class InMemoryUrlService {
    constructor() {
        this.urls = new Map();
    }
    shortenUrl(url) {
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
    getUrl(shortCode) {
        return this.urls.get(shortCode);
    }
    listUrls() {
        return Object.fromEntries(this.urls.entries());
    }
}
export function createUrlService() {
    return new InMemoryUrlService();
}
