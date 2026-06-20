import { getProducts } from './lib/api';
import { Producto } from './types';

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1>ElecTr</h1>
      <ul>
        {products.map((producto: Producto) => (
          <li key={producto.id}>{producto.name} - ${producto.price}</li>
        ))}
      </ul>
    </div>
  );
}