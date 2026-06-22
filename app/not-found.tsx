import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-4">
      <p className="text-6xl font-bold text-black mb-4">404</p>
      <p className="text-gray-600 mb-8">No pudimos encontrar lo que buscabas.</p>
      <Link href="/" className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition inline-block">
        Volver al inicio
      </Link>
    </div>
  );
}