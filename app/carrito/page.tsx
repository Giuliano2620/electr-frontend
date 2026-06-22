'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCart, createOrder, updateCartItem } from '../lib/api';
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

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (!token) return;
    if (newQuantity <= 0) {
      await updateCartItem(itemId, 0, token);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }
    await updateCartItem(itemId, newQuantity, token);
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Cargando...</p>;

  if (!token) return <p className="text-center mt-20 text-gray-500">Iniciá sesión para ver tu carrito.</p>;

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <p className="text-2xl font-bold text-black mb-2">¡Compra realizada!</p>
        <p className="text-gray-500">Tu pedido fue procesado con éxito.</p>
      </div>
    );
  }

  if (items.length === 0) return <p className="text-center mt-20 text-gray-500">Tu carrito está vacío.</p>;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-black mb-8">Tu carrito</h1>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
            <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-contain p-2" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-black text-sm">{item.product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="w-6 h-6 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition"
                >
                  −
                </button>
                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="w-6 h-6 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition"
                >
                  +
                </button>
              </div>
            </div>
            <p className="font-bold text-black">${(item.product.price * item.quantity).toLocaleString('es-AR')}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 border-t border-gray-200 pt-6">
        <p className="text-xl font-bold text-black">Total: ${total.toLocaleString('es-AR')}</p>
        <button onClick={handleCheckout} className="bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}