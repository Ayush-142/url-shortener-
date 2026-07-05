'use client';

import { useEffect, useState } from 'react';
import { UrlShortenerForm } from './UrlShortenerForm';
import { UrlList } from './UrlList';
import { fetchUrls, shortenUrl, type ShortenedUrl } from '../lib/api';

export function HomePage() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    void loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const data = await fetchUrls();
      setUrls(data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  const handleShorten = async (url: string) => {
    setError('');
    setLoading(true);

    try {
      const result = await shortenUrl(url);
      setUrls((current) => [result, ...current]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600 mb-8">Quickly shorten your long URLs</p>

          <UrlShortenerForm onSubmit={handleShorten} loading={loading} error={error} />
          <UrlList urls={urls} onCopy={copyToClipboard} />
        </div>
      </div>
    </div>
  );
}
