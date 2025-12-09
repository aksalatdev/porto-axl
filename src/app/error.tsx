'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold tracking-tighter mb-4">ERROR</h1>
      <p className="font-mono text-sm text-gray-500 mb-8">Something went wrong</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 border border-black font-mono text-sm hover:bg-black hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
