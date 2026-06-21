'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCart, createOrder } from '../lib/api';
import Image from 'next/image';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function CarritoPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getCart(token).then((data) => {
      setItems(data.items || []);
      setLoading(false);
    });
  }, [token]);

  const handleCheckout = async () => {
    if (!token) return;
    try {
      await createOrder(token);
      setItems([]);
      setSuccess(true);
    } catch (err) {
      alert('Hubo un error al procesar la compra');
    }
  };

  if (loading) return <p className="text-center mt-12">Cargando...</p>;

  if (!token) return <p className="text-center mt-12">Iniciá sesión para ver tu carrito.</p>;

  if (success) return <p className="text-center mt-12 text-green-600 font-semibold">¡Compra realizada con éxito! 🎉</p>;

  if (items.length === 0) return <p className="text-center mt-12">Tu carrito está vacío.</p>;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
            <div className="relative w-20 h-20">
              <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-bold text-sky-600">${item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-2xl font-bold">Total: ${total}</p>
        <button onClick={handleCheckout} className="mt-4 bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}