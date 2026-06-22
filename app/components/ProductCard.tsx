import Image from 'next/image';
import Link from 'next/link';
import { Producto } from '../types';

export default function ProductCard({ product }: { product: Producto }) {
  return (
    <Link href={`/productos/${product.id}`} className="group block bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition">
      <div className="relative w-full h-48 mb-4 bg-gray-50 rounded-xl overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition duration-300"
        />
      </div>
      <h3 className="font-bold text-base text-black">{product.name}</h3>
      <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">{product.description}</p>
      <p className="text-black font-bold text-lg">${product.price.toLocaleString('es-AR')}</p>
    </Link>
  );
}