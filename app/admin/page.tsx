'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, createProduct, deleteProduct, uploadImage, updateProduct } from '../lib/api';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export default function AdminPage() {
  const { token, role } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  if (role !== 'ADMIN') {
    return <p className="text-center mt-20 text-gray-500">No tenés permisos para ver esta página.</p>;
  }

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setFile(null);
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      let imageUrl: string | undefined;
      if (file) {
        const uploaded = await uploadImage(file, token);
        imageUrl = uploaded.imageUrl;
      }

      if (editingId) {
        const updated = await updateProduct(
          editingId,
          {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            ...(imageUrl ? { imageUrl } : {}),
          },
          token
        );
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        if (!imageUrl) {
          alert('Seleccioná una imagen');
          setLoading(false);
          return;
        }
        const newProduct = await createProduct(
          { name, description, price: Number(price), stock: Number(stock), imageUrl, categoryId: 1 },
          token
        );
        setProducts((prev) => [...prev, newProduct]);
      }

      resetForm();
    } catch (err) {
      alert('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    await deleteProduct(id, token);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-black mb-8">Panel de Administración</h1>

      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-2xl p-6 mb-12 flex flex-col gap-4">
        <h2 className="font-semibold text-lg mb-2">
          {editingId ? 'Editar producto' : 'Nuevo producto'}
        </h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2.5"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-2.5"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-lg p-2.5"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-gray-300 rounded-lg p-2.5"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border border-gray-300 rounded-lg p-2.5"
        />
        {editingId && (
          <p className="text-xs text-gray-400">Dejá la imagen vacía si no querés cambiarla.</p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear producto'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="font-semibold text-lg mb-4">Productos existentes</h2>
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
            <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <p className="text-gray-400 text-xs">${product.price.toLocaleString('es-AR')}</p>
            </div>
            <button
              onClick={() => handleEditClick(product)}
              className="text-gray-500 hover:text-black transition text-sm font-medium"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="text-gray-400 hover:text-red-500 transition text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}