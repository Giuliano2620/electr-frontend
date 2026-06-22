'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, role, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-black tracking-tight">
        ElecTr
      </Link>
      <div className="flex gap-6 items-center text-sm text-gray-700">
        <Link href="/productos" className="hover:text-black transition">Productos</Link>
        <Link href="/carrito" className="hover:text-black transition">Carrito</Link>
        {role === 'ADMIN' && (
          <Link href="/admin" className="hover:text-black transition">Admin</Link>
        )}
        {token ? (
          <button onClick={logout} className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link href="/login" className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition">
              Iniciar sesión
            </Link>
            <Link href="/register" className="hover:text-black transition">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}