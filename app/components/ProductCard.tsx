import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/productos/${product.id}`} className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <div className="relative w-full h-48 mb-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-500 text-sm flex-1">{product.description}</p>
      <p className="text-sky-600 font-bold text-xl mt-2">${product.price}</p>
    </Link>
  );
}