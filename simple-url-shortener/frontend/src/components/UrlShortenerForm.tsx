'use client';

import { useState } from 'react';

interface UrlShortenerFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  error: string;
}

export function UrlShortenerForm({ onSubmit, loading, error }: UrlShortenerFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
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

      {error ? (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : null}
    </form>
  );
}
