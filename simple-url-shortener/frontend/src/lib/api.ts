const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export interface ShortenedUrl {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
}

export async function fetchUrls(): Promise<ShortenedUrl[]> {
  const response = await fetch(`${API_BASE_URL}/api/urls`);
  const data = await response.json();

  return Object.entries(data).map(([shortCode, originalUrl]) => ({
    shortCode,
    shortUrl: `${API_BASE_URL.replace(/\/$/, '')}/${shortCode}`,
    originalUrl: originalUrl as string,
  }));
}

export async function shortenUrl(url: string): Promise<ShortenedUrl> {
  const response = await fetch(`${API_BASE_URL}/api/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to shorten URL');
  }

  return {
    shortCode: data.shortCode,
    shortUrl: data.shortUrl,
    originalUrl: url,
  };
}
