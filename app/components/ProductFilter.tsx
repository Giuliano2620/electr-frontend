'use client';

import { useState } from 'react';
import { Producto } from '../types';
import ProductCard from './ProductCard';

export default function ProductFilter({ products }: { products: Producto[] }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOrder === 'asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
          className="border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
        >
          <option value="none">Ordenar por</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}