'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function RedirectPage() {
  const params = useParams();
  const shortCode = params.shortCode as string;

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/urls`);
        const urls = await response.json();
        const originalUrl = urls[shortCode];

        if (originalUrl) {
          window.location.href = originalUrl;
        } else {
          // Show 404 if not found
          window.location.href = '/?notfound=true';
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        window.location.href = '/';
      }
    };

    redirect();
  }, [shortCode]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
