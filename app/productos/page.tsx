import { getProducts } from '../lib/api';
import { Producto } from '../types';
import ProductFilter from '../components/ProductFilter';

export default async function ProductosPage() {
  const products: Producto[] = await getProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-black mb-6">Todos los productos</h1>
      <ProductFilter products={products} />
    </div>
  );
}