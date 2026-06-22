import { getProductById } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '../../components/AddToCartButton';

export default async function ProductoDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <p className="text-sm text-gray-400 mb-6">
        <Link href="/productos" className="hover:text-black transition">Productos</Link>
        {' / '}
        <span className="text-black">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative w-full h-[420px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-8"
          />
        </div>
        <div className="pt-2">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full inline-block mb-3">
            Apple
          </span>
          <h1 className="text-3xl font-bold text-black mb-3">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <p className="text-black font-bold text-4xl mb-2">${product.price.toLocaleString('es-AR')}</p>
          <p className="text-sm text-green-700 mb-8 flex items-center gap-1">
            {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}
          </p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}