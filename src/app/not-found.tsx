import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold tracking-tighter mb-4">404</h1>
      <p className="font-mono text-sm text-gray-500 mb-8">Page not found</p>
      <Link
        href="/"
        className="px-4 py-2 border border-black font-mono text-sm hover:bg-black hover:text-white transition-colors"
      >
        Return home
      </Link>
    </div>
  );
}
