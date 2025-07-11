'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // ✅ use lowercase "router"

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>

      <Link href="/todo">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Go to Todo Page
        </button>
      </Link>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        onClick={() => router.push('/todo/cart')} // ✅ lowercase router
      >
        Go to Cart Page
      </button>
    </div>
  );
}
