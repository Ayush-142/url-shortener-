import { isValidUrl } from '../utils/url.js';
export function createUrlController(urlService) {
    return {
        shortenUrl: (req, res) => {
            const { url } = req.body ?? {};
            if (typeof url !== 'string' || !isValidUrl(url)) {
                return res.status(400).json({ error: 'Invalid URL' });
            }
            const result = urlService.shortenUrl(url);
            return res.json(result);
        },
        listUrls: (_req, res) => {
            return res.json(urlService.listUrls());
        },
        redirect: (req, res) => {
            const originalUrl = urlService.getUrl(req.params.shortCode);
            if (originalUrl) {
                return res.redirect(originalUrl);
            }
            return res.status(404).json({ error: 'Not found' });
        },
    };
}
