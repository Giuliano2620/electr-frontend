'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function AddToCartButton({ productId }: { productId: number }) {
  const { token } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    await addToCart(productId, 1, token);
    setMessage('¡Producto agregado al carrito!');
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700"
      >
        Agregar al carrito
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
}