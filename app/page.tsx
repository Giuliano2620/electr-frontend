import { getProducts } from './lib/api';
import { Producto } from './types';
import ProductCard from './components/ProductCard';
import Carousel from './components/Carousel';
import Link from 'next/link';

export default async function Home() {
  const products = await getProducts();
  const destacados = products.slice(0, 4);

  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
            Tecnología Apple, al alcance de tu mano
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10">
            Descubrí nuestra selección de productos originales, con garantía y entrega en todo el país.
          </p>
          <Carousel />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Productos destacados</h2>
          <Link href="/productos" className="text-sm font-semibold text-black hover:underline">
            Ver todo el catálogo →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destacados.map((product: Producto) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-bold text-black mb-1">Envío a todo el país</p>
            <p className="text-sm text-gray-500">Recibí tu pedido en la puerta de tu casa</p>
          </div>
          <div>
            <p className="font-bold text-black mb-1">Garantía oficial</p>
            <p className="text-sm text-gray-500">Productos 100% originales y garantizados</p>
          </div>
          <div>
            <p className="font-bold text-black mb-1">Soporte dedicado</p>
            <p className="text-sm text-gray-500">Estamos para ayudarte antes y después de tu compra</p>
          </div>
        </div>
      </section>
    </div>
  );
}