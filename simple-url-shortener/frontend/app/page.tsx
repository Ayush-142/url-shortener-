'use client';

import { useState, useEffect } from 'react';

interface ShortenedUrl {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/urls');
      const data = await response.json();
      const formattedUrls = Object.entries(data).map(([shortCode, originalUrl]) => ({
        shortCode,
        shortUrl: `http://localhost:3000/${shortCode}`,
        originalUrl: originalUrl as string,
      }));
      setUrls(formattedUrls);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to shorten URL');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setUrls([
        ...urls,
        {
          shortCode: data.shortCode,
          shortUrl: data.shortUrl,
          originalUrl: url,
        },
      ]);
      setUrl('');
    } catch (err) {
      setError('Error connecting to server. Make sure the backend is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600 mb-8">Quickly shorten your long URLs</p>

          <form onSubmit={handleShorten} className="mb-8">
            <div className="flex flex-col gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your URL (e.g., https://example.com)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Shortening...' : 'Shorten URL'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {urls.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Shortened URLs</h2>
              <div className="space-y-3">
                {urls.map((item) => (
                  <div key={item.shortCode} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600">Short URL:</p>
                        <p className="text-blue-600 font-mono text-sm truncate">{item.shortUrl}</p>
                        <p className="text-sm text-gray-600 mt-2">Original URL:</p>
                        <p className="text-gray-800 text-sm truncate">{item.originalUrl}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.shortUrl)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {urls.length === 0 && !error && (
            <div className="text-center py-8 text-gray-500">
              No shortened URLs yet. Create one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
