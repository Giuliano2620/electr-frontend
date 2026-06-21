import { getProductById } from '../../lib/api';
import Image from 'next/image';

export default async function ProductoDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-96">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-sky-600 font-bold text-3xl mb-6">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">Stock disponible: {product.stock}</p>
        <button className="bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}