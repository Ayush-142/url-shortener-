'use client';

import type { ShortenedUrl } from '../lib/api';

interface UrlListProps {
  urls: ShortenedUrl[];
  onCopy: (value: string) => void;
}

export function UrlList({ urls, onCopy }: UrlListProps) {
  if (!urls.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No shortened URLs yet. Create one above!
      </div>
    );
  }

  return (
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
                onClick={() => onCopy(item.shortUrl)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
