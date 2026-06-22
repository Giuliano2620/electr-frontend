'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';

export default function AddToCartButton({ productId }: { productId: number }) {
  const { token } = useAuth();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleClick = async () => {
    if (!token) {
      router.push('/login');
      return;
    }
    await addToCart(productId, quantity, token);
    setShowToast(true);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-9 h-9 border border-gray-300 rounded-full text-lg hover:bg-gray-50 transition"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-9 h-9 border border-gray-300 rounded-full text-lg hover:bg-gray-50 transition"
        >
          +
        </button>
      </div>
      <button
        onClick={handleClick}
        className="bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition w-full md:w-auto"
      >
        Agregar al carrito
      </button>
      {showToast && (
        <Toast message="¡Producto agregado al carrito!" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}