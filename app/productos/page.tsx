import { getProducts } from '../lib/api';
import { Producto } from '../types';
import ProductCard from '../components/ProductCard';

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todos los productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Producto) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}