import { getProducts } from './lib/api';
import { Producto } from './types';
import ProductCard from './components/ProductCard';

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
            Tecnología Apple, al alcance de tu mano
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Descubrí nuestra selección de productos originales, con garantía y entrega en todo el país.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-black mb-6">Catálogo ElecTr</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Producto) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}